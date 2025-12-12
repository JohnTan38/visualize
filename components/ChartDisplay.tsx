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
  const { xKey, yKeys, colors, labels, dualAxis } = chartConfig

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    }

    // DUAL-AXIS CHART (Bar + Line with two Y-axes)
    if (chartType === 'dual-axis' && dualAxis) {
      const { leftYAxis, rightYAxis } = dualAxis
      
      return (
        <ComposedChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey={xKey} stroke="#94a3b8" />
          
          {/* Left Y-Axis */}
          <YAxis 
            yAxisId="left"
            stroke={leftYAxis.color || '#3b82f6'} 
            label={{ 
              value: leftYAxis.label || '', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: leftYAxis.color || '#3b82f6' }
            }}
          />
          
          {/* Right Y-Axis */}
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke={rightYAxis.color || '#10b981'}
            label={{ 
              value: rightYAxis.label || '', 
              angle: 90, 
              position: 'insideRight',
              style: { fill: rightYAxis.color || '#10b981' }
            }}
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f8fafc'
            }} 
          />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          
          {/* Left Axis Component (typically Bar) */}
          {leftYAxis.type === 'bar' ? (
            <Bar 
              yAxisId="left"
              dataKey={leftYAxis.dataKey} 
              fill={leftYAxis.color || '#3b82f6'}
              name={leftYAxis.label || leftYAxis.dataKey}
              radius={[8, 8, 0, 0]}
            />
          ) : leftYAxis.type === 'line' ? (
            <Line 
              yAxisId="left"
              type="monotone"
              dataKey={leftYAxis.dataKey} 
              stroke={leftYAxis.color || '#3b82f6'}
              strokeWidth={3}
              name={leftYAxis.label || leftYAxis.dataKey}
              dot={{ fill: leftYAxis.color || '#3b82f6', r: 5 }}
            />
          ) : leftYAxis.type === 'area' ? (
            <Area 
              yAxisId="left"
              type="monotone"
              dataKey={leftYAxis.dataKey} 
              stroke={leftYAxis.color || '#3b82f6'}
              fill={leftYAxis.color || '#3b82f6'}
              fillOpacity={0.6}
              name={leftYAxis.label || leftYAxis.dataKey}
            />
          ) : null}
          
          {/* Right Axis Component (typically Line) */}
          {rightYAxis.type === 'line' ? (
            <Line 
              yAxisId="right"
              type="monotone"
              dataKey={rightYAxis.dataKey} 
              stroke={rightYAxis.color || '#10b981'}
              strokeWidth={4}
              name={rightYAxis.label || rightYAxis.dataKey}
              dot={{ 
                fill: rightYAxis.color || '#10b981', 
                r: 6,
                strokeWidth: 3,
                stroke: '#fff'
              }}
            />
          ) : rightYAxis.type === 'bar' ? (
            <Bar 
              yAxisId="right"
              dataKey={rightYAxis.dataKey} 
              fill={rightYAxis.color || '#10b981'}
              name={rightYAxis.label || rightYAxis.dataKey}
              radius={[8, 8, 0, 0]}
            />
          ) : rightYAxis.type === 'area' ? (
            <Area 
              yAxisId="right"
              type="monotone"
              dataKey={rightYAxis.dataKey} 
              stroke={rightYAxis.color || '#10b981'}
              fill={rightYAxis.color || '#10b981'}
              fillOpacity={0.6}
              name={rightYAxis.label || rightYAxis.dataKey}
            />
          ) : null}
        </ComposedChart>
      )
    }

    // STANDARD CHART TYPES
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

  // Badge to indicate dual-axis chart
  const isDualAxis = chartType === 'dual-axis'

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {isDualAxis && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-300">
                Dual-Axis Chart
              </span>
            )}
          </div>
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

      {/* Dual-Axis Info */}
      {isDualAxis && dualAxis && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: dualAxis.leftYAxis.color || '#3b82f6' }}
                  />
                  <span className="font-semibold text-blue-300">Left Y-Axis</span>
                </div>
                <p className="text-slate-400 text-xs">
                  {dualAxis.leftYAxis.label} ({dualAxis.leftYAxis.type})
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: dualAxis.rightYAxis.color || '#10b981' }}
                  />
                  <span className="font-semibold text-green-300">Right Y-Axis</span>
                </div>
                <p className="text-slate-400 text-xs">
                  {dualAxis.rightYAxis.label} ({dualAxis.rightYAxis.type})
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}