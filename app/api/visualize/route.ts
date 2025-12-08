import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const MAX_DATA_ROWS = 200
const CLAUDE_MODEL = 'claude-sonnet-4-5-20250929'

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

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    })

    // Create the prompt for Claude
    const systemPrompt = `You are a data visualization expert. You will receive CSV data and a user's visualization request.

Your task is to analyze the data and return a JSON configuration for creating a chart using Recharts (a React charting library).

Return a JSON object with this exact structure:
{
  "chartType": "bar" | "line" | "area" | "pie" | "scatter" | "composed",
  "title": "Chart title",
  "description": "Brief description of insights",
  "data": [...transformed data array...],
  "config": {
    "xKey": "field name for x-axis",
    "yKeys": ["field1", "field2", ...],
    "colors": ["#3b82f6", "#8b5cf6", ...],
    "labels": {"field1": "Display Name", ...}
  },
  "pythonCode": "# Python equivalent code for reference"
}

Guidelines:
- Transform the CSV data into the format needed for the chart
- Choose appropriate colors (use blue-purple gradient theme)
- Create meaningful axis labels and legends
- Include Python code equivalent in the pythonCode field for reference
- Return ONLY valid JSON, no markdown or explanations
- For bar charts with multiple series, use "composed" type with bars
- Ensure data is properly aggregated/grouped as needed`

    const userPrompt = `CSV Data (${safeFileName}):
${csvString}

Visualization Request:
${sanitizedPrompt}

Generate a JSON chart configuration for Recharts.${rowNotice}`

    // Call Claude API
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
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

    return NextResponse.json({
      chartConfig,
      prompt: sanitizedPrompt,
      timestamp: new Date().toISOString(),
      model: message.model,
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
