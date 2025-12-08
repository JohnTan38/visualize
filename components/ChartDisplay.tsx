'use client'

import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, 
  PieChart, Pie, ScatterChart, Scatter, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts'
import { Download } from 'lucide-react'
import { useRef } from 'react'
import html2canvas from 'html2canvas'

interface ChartDisplayProps {
  config: any
  onDownload?: (imageData: string) => void
}

export function ChartDisplay({ config, onDownload }: ChartDisplayProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!chartRef.current) return

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#1a2142',
        scale: 2,
      })
      
      const imageData = canvas.toDataURL('image/png')
      
      // Trigger download
      const link = document.createElement('a')
      link.download = `visualization-${Date.now()}.png`
      link.href = imageData
      link.click()
      
      if (onDownload) {
        onDownload(imageData)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  if (!config) return null

  const { chartType, title, description, data, config: chartConfig } = config
  const { xKey, yKeys, colors, labels } = chartConfig

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    }

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={xKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc'
              }} 
            />
            <Legend wrapperStyle={{ color: '#94a3b8' }} />
            {yKeys.map((key: string, index: number) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={colors[index % colors.length]}
                name={labels?.[key] || key}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </BarChart>
        )

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={xKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc'
              }} 
            />
            <Legend wrapperStyle={{ color: '#94a3b8' }} />
            {yKeys.map((key: string, index: number) => (
              <Line 
                key={key} 
                type="monotone"
                dataKey={key} 
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                name={labels?.[key] || key}
                dot={{ fill: colors[index % colors.length], r: 5 }}
              />
            ))}
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={xKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc'
              }} 
            />
            <Legend wrapperStyle={{ color: '#94a3b8' }} />
            {yKeys.map((key: string, index: number) => (
              <Area 
                key={key} 
                type="monotone"
                dataKey={key} 
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
                name={labels?.[key] || key}
              />
            ))}
          </AreaChart>
        )

      case 'pie':
        const pieData = data.map((item: any, index: number) => ({
          ...item,
          fill: colors[index % colors.length]
        }))
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              dataKey={yKeys[0]}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={(entry) => `${entry[xKey]}: ${entry[yKeys[0]]}`}
              labelLine={{ stroke: '#94a3b8' }}
            >
              {pieData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc'
              }} 
            />
            <Legend wrapperStyle={{ color: '#94a3b8' }} />
          </PieChart>
        )

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={xKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc'
              }} 
            />
            <Legend wrapperStyle={{ color: '#94a3b8' }} />
            {yKeys.map((key: string, index: number) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={colors[index % colors.length]}
                name={labels?.[key] || key}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </ComposedChart>
        )

      default:
        return <div className="text-red-400">Unsupported chart type: {chartType}</div>
    }
  }

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-slate-400">{description}</p>
          )}
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
      </div>

      {/* Chart */}
      <div 
        ref={chartRef} 
        className="w-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
