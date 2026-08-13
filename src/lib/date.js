/**
 * Small date helpers shared by Planner and anything else that needs to
 * key tasks/sessions by day (e.g. Dashboard's "today" view).
 */

export function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function startOfWeek(date) {
  const d = new Date(date)
  const day = (d.getDay() + 6) % 7 // 0 = Monday
  return addDays(d, -day)
}

export function isSameDay(a, b) {
  return toKey(a) === toKey(b)
}
