/// <reference types="vitest" />

import { describe, expect, it } from 'vitest'
import { MAX_FILE_SIZE_BYTES, validateCsvFile } from '@/lib/fileValidation'

const buildFile = (overrides?: Partial<{ name: string; size: number }>) => ({
  name: 'data.csv',
  size: 1024,
  ...overrides,
})

describe('validateCsvFile', () => {
  it('accepts valid CSV files', () => {
    const result = validateCsvFile(buildFile())
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('rejects non-CSV extensions regardless of casing', () => {
    const result = validateCsvFile(buildFile({ name: 'report.JSON' }))
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/csv/i)
  })

  it('rejects files over the size limit', () => {
    const result = validateCsvFile(buildFile({ size: MAX_FILE_SIZE_BYTES + 1 }))
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/10mb/i)
  })
})
