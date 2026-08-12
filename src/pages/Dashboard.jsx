import { useMemo, useState } from 'react'
import { Button, Card, CardHeader, CardFooter, Badge, ProgressBar, TaskRow, StatTile } from '../components/ui'
import { BookIcon, ChartIcon, FlameIcon, LeafIcon, ChevronRightIcon } from '../components/icons'

const INITIAL_TASKS = [
  { id: 1, title: 'Review flashcards', subtitle: 'Biology · Ch. 4', done: true },
  { id: 2, title: 'Practice essay outline', subtitle: 'English', done: false },
  { id: 3, title: 'Solve 10 calculus problems', subtitle: 'Math', done: false },
  { id: 4, title: 'Read chapter 7 notes', subtitle: 'History', done: false },
]

export function Dashboard({ userName = 'Asmita' }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const today = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
    [],
  )
  const remaining = tasks.filter((t) => !t.done).length

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-strong">{today}</p>
          <h1 className="font-display text-3xl font-bold text-text">
            Welcome back, {userName} 🌸
          </h1>
          <p className="mt-1 text-text-muted">
            You&apos;re doing great — keep your streak alive today.
          </p>
        </div>
        <Button icon={BookIcon} className="self-start sm:self-auto">
          Start study session
        </Button>
      </div>

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
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                title={task.title}
                subtitle={task.subtitle}
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
              {tasks.length - remaining}/{tasks.length} done
            </span>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <ProgressBar
              value={68}
              label="Weekly goal"
              showValue
              variant="gradient"
            />
            <p className="mt-3 text-sm text-text-muted">
              5.1 of 7.5 hours studied this week
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

          <Card variant="outline" className="border-primary-soft">
            <div className="flex items-start gap-3">
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
