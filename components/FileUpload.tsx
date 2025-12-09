'use client'

import { useState, useCallback, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import Papa from 'papaparse'
import { validateCsvFile } from '@/lib/fileValidation'

type CsvParseResult = {
  data: any[]
  errors: Array<{ message: string }>
}

interface FileUploadProps {
  onFileUpload: (file: File, data: any[]) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const reuploadInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    setErrorMessage('')
    setFileName(file.name)
    setUploadStatus('idle')

    const validation = validateCsvFile(file)
    if (!validation.valid) {
      setUploadStatus('error')
      setErrorMessage(validation.error || 'Invalid file selected')
      return
    }

    // Parse CSV
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: CsvParseResult) => {
        if (results.errors.length > 0) {
          setUploadStatus('error')
          setErrorMessage('Error parsing CSV file')
          console.error('CSV Parse Errors:', results.errors)
          return
        }

        if (results.data.length === 0) {
          setUploadStatus('error')
          setErrorMessage('CSV file is empty')
          return
        }

        setUploadStatus('success')
        onFileUpload(file, results.data)
      },
      error: (error: Error) => {
        setUploadStatus('error')
        setErrorMessage(`Error: ${error.message}`)
        console.error('CSV Parse Error:', error)
      },
    })
  }, [onFileUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
    e.target.value = ''
  }, [handleFile])

  const handleDropAreaClick = useCallback(() => {
    if (uploadStatus === 'success') {
      reuploadInputRef.current?.click()
      return
    }
    fileInputRef.current?.click()
  }, [uploadStatus])

  const handleDropAreaKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleDropAreaClick()
    }
  }, [handleDropAreaClick])

  return (
    <div className="glass-card p-8">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleDropAreaClick}
        onKeyDown={handleDropAreaKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Upload CSV file"
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
            : uploadStatus === 'success'
            ? 'border-green-500/50 bg-green-500/5'
            : uploadStatus === 'error'
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-slate-700 hover:border-slate-600 bg-slate-900/20'
        }`}
      >
        {/* Upload Icon */}
        <div className="mb-6 flex justify-center">
          {uploadStatus === 'success' ? (
            <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          ) : (
            <div className={`w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 rounded-full flex items-center justify-center transition-all ${
              isDragging ? 'border-blue-500 scale-110' : 'border-blue-500/50'
            }`}>
              <Upload className={`w-8 h-8 text-blue-400 ${isDragging ? 'animate-bounce' : ''}`} />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-3 mb-6">
          {uploadStatus === 'success' ? (
            <>
              <h3 className="text-xl font-bold text-green-400">File Uploaded Successfully!</h3>
              <p className="text-slate-400 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                {fileName}
              </p>
              <p className="text-sm text-slate-500">Ready to create visualizations</p>
            </>
          ) : uploadStatus === 'error' ? (
            <>
              <h3 className="text-xl font-bold text-red-400">Upload Failed</h3>
              <p className="text-red-300">{errorMessage}</p>
              <p className="text-sm text-slate-500">Please try again</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white">
                {isDragging ? 'Drop your CSV file here' : 'Upload your CSV file'}
              </h3>
              <p className="text-slate-400">
                Drag and drop or click to browse
              </p>
              <p className="text-sm text-slate-500">
                Supports .csv files up to 10MB
              </p>
            </>
          )}
        </div>

        {/* Upload Button */}
        {uploadStatus !== 'success' && (
          <div>
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all cursor-pointer shadow-lg hover:shadow-xl"
            >
              <Upload className="w-5 h-5" />
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        )}

        {/* Re-upload Button */}
        {uploadStatus === 'success' && (
          <div>
            <label
              htmlFor="file-reupload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-all cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              Upload Different File
            </label>
            <input
              id="file-reupload"
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              ref={reuploadInputRef}
            />
          </div>
        )}
      </div>

      {/* File Type Info */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span>CSV Format</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          <span>Headers Required</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>UTF-8 Encoding</span>
        </div>
      </div>
    </div>
  )
}
