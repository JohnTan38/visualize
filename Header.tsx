'use client'

import { BarChart3, Sparkles, Sun, Moon } from 'lucide-react'

type HeaderProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const toggleClasses =
    theme === 'dark'
      ? 'border-slate-700/40 bg-slate-800/50 hover:bg-slate-800 text-slate-100'
      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm'

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

        <button
          type="button"
          onClick={onToggleTheme}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${toggleClasses}`}
          aria-label="Toggle light and dark mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
          <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  )
}
