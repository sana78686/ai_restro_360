/**
 * Persists which settings sub-sections were saved (client-side until APIs wire up).
 * Dots in website / business sidebars read from this store.
 */
const STORAGE_KEY = 'td_settings_progress_v1'

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function write(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* ignore */ }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('td-settings-progress'))
  }
}

let cache = typeof localStorage !== 'undefined' ? read() : {}

export function getProgressState() {
  return cache
}

export function markSectionComplete(scope, key) {
  if (!scope || !key) return
  cache = {
    ...cache,
    [scope]: {
      ...(cache[scope] || {}),
      [key]: true
    }
  }
  write(cache)
}

export function isSectionComplete(scope, key) {
  return !!(cache[scope] && cache[scope][key])
}

export function subscribeProgress(callback) {
  if (typeof window === 'undefined') return () => {}
  const handler = () => {
    cache = read()
    callback()
  }
  window.addEventListener('td-settings-progress', handler)
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) handler()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener('td-settings-progress', handler)
    window.removeEventListener('storage', onStorage)
  }
}
