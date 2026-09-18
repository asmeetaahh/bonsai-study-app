import { useSyncExternalStore } from 'react'
import { readJSON, writeJSON } from '../lib/storage'

/**
 * Shared planner task store. A tiny external store (not React state) so
 * any page — Planner today, Dashboard/Tracker/Milestones/Pomodoro later —
 * can read and mutate the same task list via `usePlannerTasks()` without
 * prop-drilling. Persisted to localStorage on every change.
 */

const STORAGE_KEY = 'bonsai-planner-tasks'

export const CATEGORIES = ['Math', 'Biology', 'English', 'History', 'Chemistry', 'Personal']
export const PRIORITIES = ['low', 'medium', 'high']

const INITIAL_TASKS = [
  { id: 1, title: 'Read chapter 5', category: 'Biology', priority: 'low', done: true, date: '2026-08-10', time: '' },
  {
    id: 2,
    title: 'Practice vocab set',
    category: 'English',
    priority: 'medium',
    done: true,
    date: '2026-08-11',
    time: '',
  },
  { id: 3, title: 'Algebra worksheet', category: 'Math', priority: 'high', done: true, date: '2026-08-12', time: '' },
  {
    id: 4,
    title: 'Review flashcards',
    category: 'Biology',
    priority: 'medium',
    done: true,
    date: '2026-08-13',
    time: '',
  },
  {
    id: 5,
    title: 'Practice essay outline',
    category: 'English',
    priority: 'high',
    done: false,
    date: '2026-08-13',
    time: '3:00 PM',
  },
  {
    id: 6,
    title: 'Solve 10 calculus problems',
    category: 'Math',
    priority: 'high',
    done: false,
    date: '2026-08-13',
    time: '',
  },
  {
    id: 7,
    title: 'Read chapter 7 notes',
    category: 'History',
    priority: 'low',
    done: false,
    date: '2026-08-13',
    time: '',
  },
  {
    id: 8,
    title: 'Chemistry lab prep',
    category: 'Chemistry',
    priority: 'medium',
    done: false,
    date: '2026-08-14',
    time: '',
  },
  {
    id: 9,
    title: 'Mock test review',
    category: 'Math',
    priority: 'high',
    done: false,
    date: '2026-08-15',
    time: '10:00 AM',
  },
  {
    id: 10,
    title: 'Weekly reflection journal',
    category: 'Personal',
    priority: 'low',
    done: false,
    date: '2026-08-16',
    time: '',
  },
]

let tasks = readJSON(STORAGE_KEY, INITIAL_TASKS)
const listeners = new Set()

function setTasks(next) {
  tasks = next
  writeJSON(STORAGE_KEY, tasks)
  listeners.forEach((listener) => listener())
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot() {
  return tasks
}

export function addTask({ title, category, priority, date, time = '' }) {
  const task = {
    id: Date.now(),
    title,
    category,
    priority,
    date,
    time,
    done: false,
  }
  setTasks([...tasks, task])
  return task
}

export function toggleTask(id) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
}

export function deleteTask(id) {
  setTasks(tasks.filter((t) => t.id !== id))
}

export function updateTask(id, patch) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)))
}

export function usePlannerTasks() {
  const currentTasks = useSyncExternalStore(subscribe, getSnapshot)
  return { tasks: currentTasks, addTask, toggleTask, deleteTask, updateTask }
}
