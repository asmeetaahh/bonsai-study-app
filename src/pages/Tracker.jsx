import { useMemo } from 'react'
import { Card, CardHeader, ProgressBar, StatTile } from '../components/ui'
import { BookIcon, ChartIcon, FlameIcon, LeafIcon, CalendarIcon, CheckIcon } from '../components/icons'
import { PetalShape } from '../components/effects/SakuraPetals'

const WEEKLY_ACTIVITY = [
  { day: 'Mon', hours: 0.8 },
  { day: 'Tue', hours: 1.3 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 1.5 },
  { day: 'Fri', hours: 0 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
]

const SUBJECTS = [
  { name: 'Mathematics', percent: 38, variant: 'gradient' },
  { name: 'Biology', percent: 25, variant: 'green' },
  { name: 'English', percent: 20, variant: 'primary' },
  { name: 'History', percent: 10, variant: 'primary' },
  { name: 'Chemistry', percent: 7, variant: 'green' },
]

const RECENT_SESSIONS = [
  { id: 1, subject: 'Calculus practice', date: 'Aug 12', time: '4:00 PM', duration: '50 min' },
  { id: 2, subject: 'Biology recap', date: 'Aug 11', time: '6:30 PM', duration: '40 min' },
  { id: 3, subject: 'Essay outline', date: 'Aug 10', time: '9:00 AM', duration: '35 min' },
  { id: 4, subject: 'Chemistry review', date: 'Aug 9', time: '3:00 PM', duration: '55 min' },
]

const STUDY_HOURS = { logged: 5.1, goal: 7.5 }

export function Tracker() {
  const maxHours = useMemo(() => Math.max(...WEEKLY_ACTIVITY.map((d) => d.hours), 1), [])
  const todayIndex = useMemo(() => (new Date().getDay() + 6) % 7, [])
  const weeklyGoalPercent = Math.round((STUDY_HOURS.logged / STUDY_HOURS.goal) * 100)

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

          <p className="relative text-sm font-semibold text-primary-strong">Your growth, visualized</p>
          <h1 className="relative mt-1 font-display text-3xl font-bold text-text sm:text-4xl">Tracker 🌱</h1>
          <p className="relative mt-1 max-w-md text-text-muted">
            Every session helps your bonsai grow a little taller.
          </p>
        </Card>
      </div>

      {/* overview stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={BookIcon}
          label="Study hours"
          value={`${STUDY_HOURS.logged} hrs`}
          trend={{ direction: 'up', value: '12%' }}
        />
        <StatTile icon={ChartIcon} label="Sessions" value="6" trend={{ direction: 'up', value: '2' }} />
        <StatTile icon={FlameIcon} label="Streak" value="12 days" trend={{ direction: 'up', value: '1' }} />
        <StatTile icon={LeafIcon} label="Weekly goal" value={`${weeklyGoalPercent}%`} variant="green" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* weekly activity chart */}
          <Card>
            <CardHeader
              title="Weekly activity"
              subtitle={`${STUDY_HOURS.logged} hrs logged this week`}
              icon={ChartIcon}
            />
            <div className="flex items-end justify-between gap-2 sm:gap-4">
              {WEEKLY_ACTIVITY.map((d, i) => {
                const isToday = i === todayIndex
                const pct = d.hours > 0 ? Math.max((d.hours / maxHours) * 100, 8) : 0
                return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative mx-auto h-32 w-full max-w-8 overflow-hidden rounded-full bg-surface">
                      <div
                        className={[
                          'absolute inset-x-0 bottom-0 rounded-full transition-all duration-500',
                          isToday
                            ? 'bg-gradient-to-t from-primary-strong to-primary'
                            : 'bg-primary/60',
                        ].join(' ')}
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={[
                        'text-xs font-medium',
                        isToday ? 'font-bold text-primary-strong' : 'text-text-muted',
                      ].join(' ')}
                    >
                      {d.day}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* subject breakdown */}
          <Card>
            <CardHeader title="Subject breakdown" subtitle="This week" icon={BookIcon} />
            <div className="flex flex-col gap-4">
              {SUBJECTS.map((s) => (
                <ProgressBar key={s.name} value={s.percent} label={s.name} showValue variant={s.variant} />
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          {/* recent sessions */}
          <Card>
            <CardHeader title="Recent sessions" icon={CalendarIcon} />
            <div className="flex flex-col gap-2">
              {RECENT_SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-accent-green-strong">
                    <CheckIcon size={13} strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-text">{session.subject}</p>
                    <p className="text-sm text-text-muted">
                      {session.date} · {session.time} · {session.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* insight */}
          <Card variant="outline" className="relative overflow-hidden border-primary-soft">
            <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 rotate-45 text-primary/15" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
                <FlameIcon size={18} />
              </span>
              <div>
                <p className="font-display font-semibold text-text">Great pace!</p>
                <p className="text-sm text-text-muted">
                  You&apos;ve studied 18% more this week than last — your bonsai is loving it. 🌸
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
