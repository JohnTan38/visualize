'use client'

import { useState } from 'react'
import { Key, FileText, Info, Eye, EyeOff, Check } from 'lucide-react'

interface SidebarProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
  onSaveApiKey?: (key: string) => Promise<void> | void
  csvFile: File | null
}

export function Sidebar({ apiKey, onApiKeyChange, onSaveApiKey, csvFile }: SidebarProps) {
  const [showKey, setShowKey] = useState(false)
  const [keySaved, setKeySaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const trimmedKey = apiKey.trim()
  const hasApiKey = Boolean(trimmedKey)

  const handleSaveKey = async () => {
    if (!trimmedKey) {
      setSaveError('Please enter your API key before saving')
      return
    }

    setSaveError(null)

    try {
      setIsSaving(true)
      await onSaveApiKey?.(trimmedKey)
      setKeySaved(true)
      setTimeout(() => setKeySaved(false), 2000)
    } catch (error) {
      console.error('Failed to save API key:', error)
      setSaveError('Failed to save API key. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-[#151b3d] to-[#0a0e27] border-r border-slate-800/50 backdrop-blur-xl z-50">
      <div className="h-full flex flex-col p-6 space-y-6 custom-scrollbar overflow-y-auto">
        {/* Logo Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Configuration</h2>
              <p className="text-xs text-slate-400">Setup & Settings</p>
            </div>
          </div>
        </div>

        {/* API Key Section */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-white text-sm">Anthropic API Key</h3>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setSaveError(null)
                  onApiKeyChange(e.target.value)
                }}
                placeholder="sk-ant-api..."
                autoComplete="off"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 text-sm font-mono"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              onClick={handleSaveKey}
              disabled={!hasApiKey || isSaving}
              className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                hasApiKey && !isSaving
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {keySaved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : isSaving ? (
                'Saving...'
              ) : (
                'Save API Key'
              )}
            </button>

            {saveError && (
              <p className="text-xs text-red-400">{saveError}</p>
            )}

            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-300 leading-relaxed">
                Get your API key from{' '}
                <a
                  href="https://console.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-200 transition-colors"
                >
                  console.anthropic.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* File Info Section */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white text-sm">Current File</h3>
          </div>

          {csvFile ? (
            <div className="space-y-2">
              <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm font-medium text-green-300 truncate">
                  {csvFile.name}
                </p>
                <p className="text-xs text-green-400/70 mt-1">
                  {(csvFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-900/30 border border-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-400">No file uploaded</p>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Status</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
              <span className={`text-sm font-medium ${hasApiKey ? 'text-green-400' : 'text-slate-500'}`}>
                {hasApiKey ? 'Ready' : 'Setup Required'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-slate-800/50">
          <p className="text-xs text-slate-500 text-center">
            Built with Claude AI & Next.js
          </p>
        </div>
      </div>
    </aside>
  )
}
