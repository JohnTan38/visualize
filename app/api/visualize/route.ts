//app/api/visualize/route.tsx
//app/api/visualize/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const MAX_DATA_ROWS = 200
const CLAUDE_MODEL = 'claude-sonnet-4-20250514'

// Helper function to detect if prompt requires dual-axis chart
function requiresDualAxis(prompt: string): boolean {
  const dualAxisKeywords = [
    'dual axis',
    'dual-axis',
    'two axes',
    'two y-axes',
    'bar and line',
    'line and bar',
    'bar + line',
    'combined chart',
    'overlay',
    'compare.*metrics',
    'versus',
    'vs',
    'against',
  ]
  
  const lowerPrompt = prompt.toLowerCase()
  return dualAxisKeywords.some(keyword => 
    new RegExp(keyword, 'i').test(lowerPrompt)
  )
}

export async function POST(req: NextRequest) {
  try {
    const { apiKey, csvData, prompt, fileName } = await req.json()

    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    if (!Array.isArray(csvData) || csvData.length === 0) {
      return NextResponse.json(
        { error: 'CSV data is required' },
        { status: 400 }
      )
    }

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'A visualization prompt is required' },
        { status: 400 }
      )
    }

    const sanitizedPrompt = prompt.trim()
    const limitedData =
      csvData.length > MAX_DATA_ROWS ? csvData.slice(0, MAX_DATA_ROWS) : csvData
    const csvString = JSON.stringify(limitedData, null, 2)
    const safeFileName =
      typeof fileName === 'string' && fileName.trim() ? fileName.trim() : 'uploaded.csv'
    const rowNotice =
      csvData.length > MAX_DATA_ROWS
        ? `\nNOTE: Only the first ${MAX_DATA_ROWS} rows were provided to the model to keep the prompt size manageable.`
        : ''

    // Detect if dual-axis is needed
    const needsDualAxis = requiresDualAxis(sanitizedPrompt)

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    })

    // Enhanced system prompt with dual-axis support
    const systemPrompt = `You are a data visualization expert. You will receive CSV data and a user's visualization request.

Your task is to analyze the data and return a JSON configuration for creating a chart using Recharts (a React charting library).

Return a JSON object with this exact structure:
{
  "chartType": "bar" | "line" | "area" | "pie" | "scatter" | "composed" | "dual-axis",
  "title": "Chart title",
  "description": "Brief description of insights",
  "data": [...transformed data array...],
  "config": {
    "xKey": "field name for x-axis",
    "yKeys": ["field1", "field2", ...],
    "colors": ["#3b82f6", "#8b5cf6", ...],
    "labels": {"field1": "Display Name", ...},
    ${needsDualAxis ? `"dualAxis": {
      "leftYAxis": {
        "dataKey": "field for left axis",
        "label": "Left Y-Axis Label",
        "color": "#3b82f6",
        "type": "bar" | "line" | "area"
      },
      "rightYAxis": {
        "dataKey": "field for right axis", 
        "label": "Right Y-Axis Label",
        "color": "#10b981",
        "type": "bar" | "line" | "area"
      }
    },` : ''}
  },
  "pythonCode": "# Python matplotlib equivalent code with dual-axis using twinx()"
}

CRITICAL DUAL-AXIS REQUIREMENTS:
When the user requests comparing TWO DIFFERENT METRICS (like "turnover ratio vs holding cost", "revenue vs profit margin", "sales vs growth rate"):
1. Set chartType to "dual-axis"
2. Include the "dualAxis" configuration in config object
3. Left axis (leftYAxis) typically uses BARS for the primary metric
4. Right axis (rightYAxis) typically uses LINE with markers for the secondary metric
5. Use different colors for left (#3b82f6 blue) and right (#10b981 green) axes
6. Generate Python code that uses matplotlib's twinx() for dual y-axes

DUAL-AXIS EXAMPLE:
For "compare turnover ratio and holding cost by category":
{
  "chartType": "dual-axis",
  "title": "Turnover Ratio vs Holding Cost by Category",
  "data": [
    {"category": "Electronics", "turnover": 8.2, "cost": 1.05},
    {"category": "Apparel", "turnover": 7.9, "cost": 1.08}
  ],
  "config": {
    "xKey": "category",
    "yKeys": ["turnover", "cost"],
    "colors": ["#3b82f6", "#10b981"],
    "labels": {"turnover": "Turnover Ratio", "cost": "Holding Cost ($)"},
    "dualAxis": {
      "leftYAxis": {
        "dataKey": "turnover",
        "label": "Average Turnover Ratio",
        "color": "#3b82f6",
        "type": "bar"
      },
      "rightYAxis": {
        "dataKey": "cost",
        "label": "Holding Cost per Unit/Day ($)",
        "color": "#10b981",
        "type": "line"
      }
    }
  },
  "pythonCode": "fig, ax1 = plt.subplots()\\nax1.bar(x_pos, turnover_data, color='#3b82f6')\\nax1.set_ylabel('Turnover Ratio', color='#3b82f6')\\nax2 = ax1.twinx()\\nax2.plot(x_pos, cost_data, color='#10b981', marker='o')\\nax2.set_ylabel('Holding Cost', color='#10b981')"
}

Guidelines:
- Transform the CSV data into the format needed for the chart
- Choose appropriate colors (use blue-purple gradient theme)
- For dual-axis charts, use blue (#3b82f6) for left axis and green (#10b981) for right axis
- Create meaningful axis labels and legends
- Include Python matplotlib code with twinx() in the pythonCode field
- Return ONLY valid JSON, no markdown or explanations
- For bar charts with multiple series of SAME metric type, use "composed" type
- For comparing TWO DIFFERENT metrics, use "dual-axis" type
- Ensure data is properly aggregated/grouped as needed`

    const userPrompt = `CSV Data (${safeFileName}):
${csvString}

Visualization Request:
${sanitizedPrompt}

${needsDualAxis ? 'IMPORTANT: This appears to require a DUAL-AXIS chart comparing two different metrics. Use chartType "dual-axis" with dualAxis configuration.' : ''}

Generate a JSON chart configuration for Recharts.${rowNotice}`

    // Call Claude API
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      temperature: 0.2, // Lower temperature for more consistent output
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    })

    const contentBlocks = Array.isArray(message.content) ? message.content : []
    const textResponse = contentBlocks
      .filter(
        (block): block is { type: 'text'; text: string } =>
          block.type === 'text' && typeof block.text === 'string'
      )
      .map((block) => block.text)
      .join('\n')
      .replace(/```json\n?|```\n?/g, '')
      .trim()

    if (!textResponse) {
      return NextResponse.json(
        { error: 'Claude did not return a text response with chart instructions' },
        { status: 500 }
      )
    }

    let chartConfig = null

    try {
      chartConfig = JSON.parse(textResponse)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        {
          error: 'Failed to parse chart configuration',
          rawResponse: textResponse,
        },
        { status: 500 }
      )
    }

    // Validate dual-axis configuration
    if (chartConfig.chartType === 'dual-axis') {
      if (!chartConfig.config?.dualAxis) {
        console.warn('dual-axis type specified but dualAxis config missing')
        // Add fallback dual-axis config
        const yKeys = chartConfig.config.yKeys || []
        if (yKeys.length >= 2) {
          chartConfig.config.dualAxis = {
            leftYAxis: {
              dataKey: yKeys[0],
              label: chartConfig.config.labels?.[yKeys[0]] || yKeys[0],
              color: '#3b82f6',
              type: 'bar'
            },
            rightYAxis: {
              dataKey: yKeys[1],
              label: chartConfig.config.labels?.[yKeys[1]] || yKeys[1],
              color: '#10b981',
              type: 'line'
            }
          }
        }
      }
    }

    return NextResponse.json({
      chartConfig,
      prompt: sanitizedPrompt,
      timestamp: new Date().toISOString(),
      model: message.model,
      isDualAxis: chartConfig.chartType === 'dual-axis',
    })
  } catch (error) {
    console.error('API Error:', error)
    
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Anthropic API Error: ${error.message}` },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const runtime = 'edge'