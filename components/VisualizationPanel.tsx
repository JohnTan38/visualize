'use client'

import { useState } from 'react'
import { Send, Loader2, AlertCircle, X, Sparkles, Code, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { ChartDisplay } from './ChartDisplay'

interface VisualizationPanelProps {
  csvData: any[]
  visualizations: any[]
  isProcessing: boolean
  error: string | null
  onVisualize: (prompt: string) => void
  onClearError: () => void
}

export function VisualizationPanel({
  csvData,
  visualizations,
  isProcessing,
  error,
  onVisualize,
  onClearError,
}: VisualizationPanelProps) {
  const [prompt, setPrompt] = useState('')
  const [expandedCode, setExpandedCode] = useState<{ [key: number]: boolean }>({})

  const toggleCode = (index: number) => {
    setExpandedCode(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !isProcessing) {
      onVisualize(prompt)
      setPrompt('')
    }
  }

  const examplePrompts = [
    'Create a clustered bar chart showing quarterly operating income for each product line with blue gradient colors',
    'Plot a line chart comparing net income trends across all quarters',
    'Generate a stacked area chart of total revenue by product line over time',
    'Create a pie chart showing revenue distribution by product line',
  ]

  return (
    <div className="space-y-6">
      {/* Data Preview */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-400" />
          Data Preview
        </h3>
        <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/50">
                  {csvData.length > 0 &&
                    Object.keys(csvData[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-3 text-left font-semibold text-slate-300 border-b border-slate-700"
                      >
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    {Object.values(row).map((value: any, vidx) => (
                      <td
                        key={vidx}
                        className="px-4 py-3 text-slate-400 border-b border-slate-800"
                      >
                        {value?.toString() || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-700 text-xs text-slate-500">
            Showing 5 of {csvData.length} rows
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Create Visualization</h3>
        </div>

        {/* Example Prompts */}
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Try these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {examplePrompts.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(example)}
                className="text-left px-4 py-3 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 rounded-lg text-sm text-slate-300 hover:text-white transition-all group"
              >
                <span className="text-blue-400 group-hover:text-blue-300 mr-2">→</span>
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the visualization you want... (e.g., 'Create a clustered bar chart of quarterly operating income for each product line with a blue color gradient')"
              className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none custom-scrollbar"
              rows={4}
              disabled={isProcessing}
            />
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() || isProcessing}
            className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-3 ${
              prompt.trim() && !isProcessing
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-slate-800 cursor-not-allowed opacity-50'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Visualization...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Generate Visualization
              </>
            )}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-300">{error}</p>
            </div>
            <button
              onClick={onClearError}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Visualizations Display */}
      {visualizations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Generated Visualizations ({visualizations.length})
          </h3>
          
          {visualizations.map((viz, idx) => {
            const vizIndex = visualizations.length - idx - 1
            const isCodeExpanded = expandedCode[idx] || false
            
            return (
              <div key={idx} className="space-y-4">
                {/* Visualization Info Header */}
                <div className="glass-card p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        Visualization #{vizIndex + 1}
                      </h4>
                      <p className="text-sm text-slate-400 italic">"{viz.prompt}"</p>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(viz.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Chart Display */}
                {viz.chartConfig && (
                  <ChartDisplay config={viz.chartConfig} />
                )}

                {/* Collapsible Python Code Section */}
                {viz.chartConfig?.pythonCode && (
                  <div className="glass-card overflow-hidden">
                    <button
                      onClick={() => toggleCode(idx)}
                      className="w-full px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-slate-300">
                          Python Code (for reference)
                        </span>
                      </div>
                      {isCodeExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isCodeExpanded && (
                      <div className="bg-slate-900">
                        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">Python</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(viz.chartConfig.pythonCode)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                          >
                            Copy Code
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto custom-scrollbar text-sm max-h-96">
                          <code className="text-green-400 font-mono">
                            {viz.chartConfig.pythonCode}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Info Box */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-xs text-blue-300">
                    💡 Chart is displayed above. Click "Download PNG" to save the visualization. 
                    Python code is provided for reference if you want to recreate it locally.
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
