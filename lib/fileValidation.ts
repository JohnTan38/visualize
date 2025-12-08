const CSV_EXTENSION = '.csv'
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

interface CsvFileLike {
  name: string
  size: number
}

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateCsvFile(file: CsvFileLike): ValidationResult {
  const normalizedName = file.name.trim().toLowerCase()

  if (!normalizedName.endsWith(CSV_EXTENSION)) {
    return { valid: false, error: 'Please upload a CSV file' }
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File is too large. Max size is 10MB' }
  }

  return { valid: true }
}
