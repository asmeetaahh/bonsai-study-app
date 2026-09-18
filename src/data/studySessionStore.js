import { useSyncExternalStore } from 'react'
import { readJSON, writeJSON } from '../lib/storage'
import { toKey } from '../lib/date'

/**
 * Shared study-session log. Same external-store pattern as plannerStore —
 * completed Pomodoro sessions are recorded here so Tracker (and anything
 * else) can read the same history later via `useStudySessions()`, without
 * this page needing to know about those consumers yet.
 */

const STORAGE_KEY = 'bonsai-study-sessions'

let sessions = readJSON(STORAGE_KEY, [])
const listeners = new Set()

function setSessions(next) {
  sessions = next
  writeJSON(STORAGE_KEY, sessions)
  listeners.forEach((listener) => listener())
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot() {
  return sessions
}

/**
 * Record a completed study session.
 * @param {{ type: string, minutes: number }} params - session type (e.g. 'focus') and duration in minutes
 */
export function recordSession({ type, minutes }) {
  const now = new Date()
  const session = {
    id: Date.now(),
    type,
    duration: minutes,
    date: toKey(now),
    timestamp: now.toISOString(),
  }
  setSessions([...sessions, session])
  return session
}

export function useStudySessions() {
  const currentSessions = useSyncExternalStore(subscribe, getSnapshot)
  return { sessions: currentSessions, recordSession }
}
