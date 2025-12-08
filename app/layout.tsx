import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Data Visualizations Pro | AI-Powered Data Insights',
  description: 'Transform your CSV data into stunning AI optimized visualizations',
  keywords: ['CSV', 'data visualization', 'Claude AI', 'analytics', 'AI optimized charts'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
