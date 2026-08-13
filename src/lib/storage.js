/**
 * Small localStorage JSON helpers so persistence logic isn't scattered
 * across components. Fails soft (keeps the app working in-memory) if
 * storage is unavailable, disabled, full, or the stored value can't be
 * parsed — e.g. private browsing modes that throw on write.
 */

export function readJSON(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key)
    if (!stored) return fallback
    return JSON.parse(stored)
  } catch (error) {
    console.warn(`[storage] Failed to read "${key}" from localStorage`, error)
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`[storage] Failed to write "${key}" to localStorage`, error)
    return false
  }
}
