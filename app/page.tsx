'use client'
//app/page.tsx

import { useEffect, useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { Sidebar } from '@/components/Sidebar'
import { VisualizationPanel } from '@/components/VisualizationPanel'
import { Header } from '@/components/Header'
import { Sparkles, BarChart3 } from 'lucide-react'
import { loadPersistedApiKey, persistApiKey } from '@/lib/apiKeyStorage'

const THEME_STORAGE_KEY = 'visualize-theme'

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[] | null>(null)
  const [visualizations, setVisualizations] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedApiKey = loadPersistedApiKey()
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.classList.toggle('theme-light', theme === 'light')
    document.body.classList.toggle('theme-dark', theme === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleSaveApiKey = (key: string) => {
    const normalizedKey = key.trim()
    setApiKey(normalizedKey)
    persistApiKey(normalizedKey)
  }

  const handleFileUpload = (file: File, data: any[]) => {
    setCsvFile(file)
    setCsvData(data)
    setError(null)
  }

  const handleVisualize = async (prompt: string) => {
    if (!apiKey) {
      setError('Please enter your Anthropic API key in the sidebar')
      return
    }

    if (!csvFile || !csvData) {
      setError('Please upload a CSV file first')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/visualize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          csvData,
          prompt,
          fileName: csvFile.name,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate visualization')
      }

      const result = await response.json()
      setVisualizations(prev => [...prev, result])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Visualization error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const isDark = theme === 'dark'
  const pageBackground = isDark
    ? 'bg-gradient-to-br from-[#0a0e27] via-[#151b3d] to-[#0a0e27]'
    : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${pageBackground}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-300/20'
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-300/20'
          }`}
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar 
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        onSaveApiKey={handleSaveApiKey}
        csvFile={csvFile}
      />

      {/* Main Content */}
      <main className="flex-1 ml-80 relative">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header */}
          <Header theme={theme} onToggleTheme={toggleTheme} />

          {/* Hero Section */}
          {!csvFile && (
            <div className="glass-card p-12 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-6">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">AI-Powered Analytics</span>
                </div>
                
                <h1 className="text-5xl font-bold mb-4">
                  <span className="gradient-text">Transform Your Data</span>
                  <br />
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>Into Business Insights</span>
                </h1>
                
                <p className={`text-xl max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Upload your CSV files and create stunning, customized visualizations with natural language prompts
                </p>

                <div className={`flex items-center justify-center gap-6 text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Real-time Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    <span>Multiple Chart Types</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>AI-Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <FileUpload onFileUpload={handleFileUpload} />

          {/* Visualization Panel */}
          {csvData && (
            <VisualizationPanel
              csvData={csvData}
              visualizations={visualizations}
              isProcessing={isProcessing}
              error={error}
              onVisualize={handleVisualize}
              onClearError={() => setError(null)}
            />
          )}
        </div>
      </main>
    </div>
  )
}
