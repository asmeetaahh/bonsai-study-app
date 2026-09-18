import { useMemo } from 'react'
import { Button, Card, CardHeader, CardFooter, Badge, ProgressBar, TaskRow, StatTile } from '../components/ui'
import { BookIcon, ChartIcon, FlameIcon, LeafIcon, ChevronRightIcon } from '../components/icons'
import { BonsaiMascot, LevelRing } from '../components/illustrations'
import { PetalShape } from '../components/effects/SakuraPetals'
import { usePlannerTasks } from '../data/plannerStore'
import { toKey, addDays, startOfWeek } from '../lib/date'

export function Dashboard({ userName = 'Asmita' }) {
  const now = useMemo(() => new Date(), [])
  const { tasks, toggleTask } = usePlannerTasks()

  const today = useMemo(
    () => now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
    [now],
  )

  const todayKey = useMemo(() => toKey(now), [now])
  const todayTasks = useMemo(() => tasks.filter((t) => t.date === todayKey), [tasks, todayKey])
  const remaining = todayTasks.filter((t) => !t.done).length

  const weekKeys = useMemo(() => {
    const start = startOfWeek(now)
    return Array.from({ length: 7 }, (_, i) => toKey(addDays(start, i)))
  }, [now])
  const weekTasks = useMemo(() => tasks.filter((t) => weekKeys.includes(t.date)), [tasks, weekKeys])
  const weekCompleted = weekTasks.filter((t) => t.done).length
  const weekPercent = weekTasks.length ? (weekCompleted / weekTasks.length) * 100 : 0

  return (
    <div className="flex flex-col gap-6">
      {/* hero */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-primary/25 blur-3xl"
        />
        <Card
          variant="elevated"
          padding="lg"
          className="relative overflow-hidden border-primary-soft/60 bg-gradient-to-br from-primary-softer via-bg-elevated to-primary-soft"
        >
          <PetalShape className="pointer-events-none absolute -top-2 right-12 h-12 w-12 rotate-12 text-primary/25" />
          <PetalShape className="pointer-events-none absolute bottom-3 left-8 hidden h-8 w-8 -rotate-12 text-primary-strong/20 sm:block" />

          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="relative shrink-0">
              <BonsaiMascot size={112} />
              <LevelRing level={6} percent={64} size={42} className="absolute -bottom-1 -right-1" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-strong">{today}</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">
                Welcome back, {userName} 🌸
              </h1>
              <p className="mt-2 max-w-md text-text-muted">
                Small steps, steady growth — let&apos;s make today count.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <Button icon={BookIcon}>Start study session</Button>
                <Badge variant="streak" icon={FlameIcon}>
                  12 day streak
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile icon={FlameIcon} label="Day streak" value="12" trend={{ direction: 'up', value: '3' }} />
        <StatTile icon={ChartIcon} label="Sessions this week" value="6" trend={{ direction: 'up', value: '18%' }} />
        <StatTile icon={LeafIcon} label="Bonsai growth" value="Level 6" variant="green" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Today's tasks"
            subtitle={`${remaining} remaining`}
            icon={BookIcon}
            actions={
              <Badge variant="streak" icon={FlameIcon}>
                12
              </Badge>
            }
          />
          <div className="flex flex-col">
            {todayTasks.map((task) => (
              <TaskRow
                key={task.id}
                title={task.title}
                subtitle={task.category}
                completed={task.done}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>
          <CardFooter>
            <Button variant="ghost" size="sm">
              + Add task
            </Button>
            <span className="text-sm text-text-muted">
              {todayTasks.length - remaining}/{todayTasks.length} done
            </span>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <ProgressBar value={weekPercent} label="Weekly goal" showValue variant="gradient" />
            <p className="mt-3 text-sm text-text-muted">
              {weekCompleted}/{weekTasks.length} tasks completed this week
            </p>
          </Card>

          <Card>
            <CardHeader title="Up next" subtitle="In 45 minutes" icon={ChartIcon} />
            <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5">
              <div>
                <p className="font-medium text-text">Calculus review</p>
                <p className="text-sm text-text-muted">4:30 PM · 45 min</p>
              </div>
              <ChevronRightIcon size={18} className="text-text-muted" />
            </div>
          </Card>

          <Card variant="outline" className="relative overflow-hidden border-primary-soft">
            <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 rotate-45 text-primary/15" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-accent-green-strong">
                <LeafIcon size={18} />
              </span>
              <div>
                <p className="font-display font-semibold text-text">Your bonsai is thriving</p>
                <p className="text-sm text-text-muted">
                  320 XP to level 7 — one more session today will get you there.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
