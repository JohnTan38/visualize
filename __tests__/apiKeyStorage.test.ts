/// <reference types="vitest" />

import { describe, expect, it, beforeEach } from 'vitest'
import { loadPersistedApiKey, persistApiKey } from '@/lib/apiKeyStorage'

class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  clear(): void {
    this.store.clear()
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }

  get length(): number {
    return this.store.size
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }
}

describe('apiKeyStorage', () => {
  let storage: MemoryStorage

  beforeEach(() => {
    storage = new MemoryStorage()
  })

  it('persists trimmed keys', () => {
    persistApiKey('  sk-test  ', storage)
    expect(storage.getItem('anthropicApiKey')).toBe('sk-test')
  })

  it('removes key when provided empty value', () => {
    persistApiKey('sk-test', storage)
    persistApiKey('', storage)
    expect(storage.getItem('anthropicApiKey')).toBeNull()
  })

  it('loads persisted key safely', () => {
    storage.setItem('anthropicApiKey', 'sk-test')
    expect(loadPersistedApiKey(storage)).toBe('sk-test')
  })

  it('returns empty string when no key is persisted', () => {
    expect(loadPersistedApiKey(storage)).toBe('')
  })
})
