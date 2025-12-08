'use client'

import { BarChart3, Sparkles } from 'lucide-react'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 rounded-2xl" />
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Data Visualization Pro
          </h1>
          <p className="text-slate-400 text-sm">
            AI Optimized Visuals
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-300">
              AI Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
