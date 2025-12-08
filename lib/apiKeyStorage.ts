const STORAGE_KEY = 'anthropicApiKey'

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

const getStorage = (storage?: StorageLike) => {
  if (storage) return storage
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage
  }
  return null
}

export function persistApiKey(key: string, storage?: StorageLike) {
  const target = getStorage(storage)
  if (!target) return

  const normalizedKey = key.trim()
  if (!normalizedKey) {
    target.removeItem(STORAGE_KEY)
    return
  }

  target.setItem(STORAGE_KEY, normalizedKey)
}

export function loadPersistedApiKey(storage?: Pick<Storage, 'getItem'>): string {
  const target = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined)
  return (target?.getItem(STORAGE_KEY) ?? '').trim()
}
