import { useMemo, useState } from 'react'
import { Button, Card, CardHeader, CardFooter, Badge, ProgressBar, TaskRow } from '../components/ui'
import {
  BookIcon,
  ChartIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CloseIcon,
  LeafIcon,
} from '../components/icons'
import { PetalShape } from '../components/effects/SakuraPetals'
import { CATEGORIES, PRIORITIES, usePlannerTasks } from '../data/plannerStore'

const PRIORITY_BADGE = {
  high: { variant: 'danger', label: 'High' },
  medium: { variant: 'warning', label: 'Medium' },
  low: { variant: 'neutral', label: 'Low' },
}

const SESSIONS = [
  { id: 1, subject: 'Calculus review', date: '2026-08-13', time: '4:30 PM', duration: '45 min' },
  { id: 2, subject: 'Biology recap', date: '2026-08-13', time: '7:00 PM', duration: '30 min' },
  { id: 3, subject: 'Chemistry lab prep', date: '2026-08-14', time: '10:00 AM', duration: '60 min' },
  { id: 4, subject: 'Math mock test', date: '2026-08-15', time: '2:00 PM', duration: '90 min' },
]

const STUDY_HOURS = { logged: 5.1, goal: 7.5 }

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function startOfWeek(date) {
  const d = new Date(date)
  const day = (d.getDay() + 6) % 7 // 0 = Monday
  return addDays(d, -day)
}

function isSameDay(a, b) {
  return toKey(a) === toKey(b)
}

export function Planner() {
  const realToday = useMemo(() => new Date(), [])
  const [viewMode, setViewMode] = useState('today')
  const [selectedDate, setSelectedDate] = useState(realToday)
  const { tasks, addTask, toggleTask, deleteTask } = usePlannerTasks()
  const [showAddForm, setShowAddForm] = useState(false)
  const [draft, setDraft] = useState({ title: '', category: CATEGORIES[0], priority: 'medium' })

  const weekStart = useMemo(() => startOfWeek(selectedDate), [selectedDate])
  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  )
  const weekKeys = useMemo(() => weekDates.map(toKey), [weekDates])

  const dayKey = toKey(selectedDate)
  const dayTasks = tasks.filter((t) => t.date === dayKey)
  const weekTasks = tasks.filter((t) => weekKeys.includes(t.date))
  const visibleTasks = viewMode === 'today' ? dayTasks : weekTasks

  const daySessions = SESSIONS.filter((s) => s.date === dayKey)
  const weekSessions = SESSIONS.filter((s) => weekKeys.includes(s.date))
  const visibleSessions = viewMode === 'today' ? daySessions : weekSessions

  const remaining = visibleTasks.filter((t) => !t.done).length
  const weekCompleted = weekTasks.filter((t) => t.done).length
  const taskPercent = weekTasks.length ? (weekCompleted / weekTasks.length) * 100 : 0
  const hoursPercent = (STUDY_HOURS.logged / STUDY_HOURS.goal) * 100

  const dateLabel =
    viewMode === 'today'
      ? selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
      : `${weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${addDays(
          weekStart,
          6,
        ).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`

  const stepDate = (dir) => {
    setSelectedDate((prev) => addDays(prev, viewMode === 'today' ? dir : dir * 7))
  }

  const submitTask = (e) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    addTask({
      title: draft.title.trim(),
      category: draft.category,
      priority: draft.priority,
      date: dayKey,
    })
    setDraft({ title: '', category: CATEGORIES[0], priority: 'medium' })
    setShowAddForm(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-primary/20 blur-3xl"
        />
        <Card
          variant="elevated"
          padding="lg"
          className="relative overflow-hidden border-primary-soft/60 bg-gradient-to-br from-primary-softer via-bg-elevated to-primary-soft"
        >
          <PetalShape className="pointer-events-none absolute -top-2 right-12 h-12 w-12 rotate-12 text-primary/25" />
          <PetalShape className="pointer-events-none absolute bottom-3 left-8 hidden h-8 w-8 -rotate-12 text-primary-strong/20 sm:block" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-strong">Plan your week</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">Planner 🌸</h1>
              <p className="mt-1 text-text-muted">Organize tasks and study sessions around your goals.</p>
            </div>
            <Button icon={PlusIcon} onClick={() => setShowAddForm((v) => !v)} className="self-start sm:self-auto">
              Add task
            </Button>
          </div>

          <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex w-fit rounded-full bg-surface p-1">
              {['today', 'week'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={[
                    'rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors duration-150',
                    viewMode === mode
                      ? 'bg-primary text-text-inverse shadow-sm'
                      : 'text-text-muted hover:text-text',
                  ].join(' ')}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepDate(-1)}
                aria-label={viewMode === 'today' ? 'Previous day' : 'Previous week'}
                className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-surface hover:text-text"
              >
                <ChevronLeftIcon size={18} />
              </button>
              <span className="min-w-[10rem] text-center font-medium text-text sm:min-w-0">{dateLabel}</span>
              <button
                type="button"
                onClick={() => stepDate(1)}
                aria-label={viewMode === 'today' ? 'Next day' : 'Next week'}
                className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-surface hover:text-text"
              >
                <ChevronRightIcon size={18} />
              </button>
              {!isSameDay(selectedDate, realToday) && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedDate(realToday)}>
                  Jump to today
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* task list */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={viewMode === 'today' ? "Today's tasks" : "This week's tasks"}
            subtitle={`${remaining} remaining`}
            icon={BookIcon}
          />

          {showAddForm && (
            <form
              onSubmit={submitTask}
              className="mb-4 flex flex-col gap-3 rounded-lg border border-border bg-surface p-3.5 sm:flex-row sm:items-center"
            >
              <input
                autoFocus
                type="text"
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="Task title"
                className="min-w-0 flex-1 rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                className="rounded-lg border border-border bg-bg-elevated px-2.5 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={draft.priority}
                onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}
                className="rounded-lg border border-border bg-bg-elevated px-2.5 py-2 text-sm capitalize text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <Button type="submit" size="sm">
                  Add
                </Button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  aria-label="Cancel"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-bg-elevated hover:text-text"
                >
                  <CloseIcon size={16} />
                </button>
              </div>
            </form>
          )}

          {viewMode === 'today' ? (
            <div className="flex flex-col">
              {dayTasks.length === 0 && (
                <p className="py-8 text-center text-sm text-text-faint">
                  No tasks for this day — add one to get started 🌱
                </p>
              )}
              {dayTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  title={task.title}
                  subtitle={task.category}
                  completed={task.done}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  meta={task.time || undefined}
                  badge={
                    <Badge variant={PRIORITY_BADGE[task.priority].variant} size="sm">
                      {PRIORITY_BADGE[task.priority].label}
                    </Badge>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {weekDates.map((date) => {
                const key = toKey(date)
                const dayItems = tasks.filter((t) => t.date === key)
                return (
                  <div key={key}>
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">
                        {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      {isSameDay(date, realToday) && (
                        <Badge variant="primary" size="sm">
                          Today
                        </Badge>
                      )}
                    </div>
                    {dayItems.length === 0 ? (
                      <p className="px-1 py-1.5 text-sm text-text-faint">No tasks</p>
                    ) : (
                      <div className="flex flex-col divide-y divide-border/60">
                        {dayItems.map((task) => (
                          <TaskRow
                            key={task.id}
                            title={task.title}
                            subtitle={task.category}
                            completed={task.done}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                            meta={task.time || undefined}
                            badge={
                              <Badge variant={PRIORITY_BADGE[task.priority].variant} size="sm">
                                {PRIORITY_BADGE[task.priority].label}
                              </Badge>
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <CardFooter>
            <Button variant="ghost" size="sm" onClick={() => setShowAddForm((v) => !v)}>
              + Add task
            </Button>
            <span className="text-sm text-text-muted">
              {visibleTasks.length - remaining}/{visibleTasks.length} done
            </span>
          </CardFooter>
        </Card>

        {/* sidebar */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Weekly progress" icon={ChartIcon} />
            <ProgressBar
              value={taskPercent}
              label="Tasks completed"
              showValue
              variant="gradient"
            />
            <p className="mt-1 text-sm text-text-muted">
              {weekCompleted}/{weekTasks.length} tasks this week
            </p>
            <ProgressBar
              className="mt-4"
              value={hoursPercent}
              label="Study hours"
              showValue
              variant="green"
            />
            <p className="mt-1 text-sm text-text-muted">
              {STUDY_HOURS.logged} of {STUDY_HOURS.goal} hours studied
            </p>
          </Card>

          <Card>
            <CardHeader
              title="Study sessions"
              subtitle={viewMode === 'today' ? 'Today' : 'This week'}
              icon={CalendarIcon}
            />
            <div className="flex flex-col gap-2">
              {visibleSessions.length === 0 && (
                <p className="py-4 text-center text-sm text-text-faint">No sessions scheduled</p>
              )}
              {visibleSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium text-text">{session.subject}</p>
                    <p className="text-sm text-text-muted">
                      {viewMode === 'week' &&
                        `${new Date(session.date).toLocaleDateString(undefined, { weekday: 'short' })} · `}
                      {session.time} · {session.duration}
                    </p>
                  </div>
                  <ChevronRightIcon size={18} className="text-text-muted" />
                </div>
              ))}
            </div>
          </Card>

          <Card variant="outline" className="relative overflow-hidden border-primary-soft">
            <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 rotate-45 text-primary/15" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-accent-green-strong">
                <LeafIcon size={18} />
              </span>
              <div>
                <p className="font-display font-semibold text-text">Gentle reminder</p>
                <p className="text-sm text-text-muted">
                  Tackle your hardest task first — you&apos;ve got this. 🌱
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
