import { Card, Badge, ProgressBar } from '../components/ui'
import {
  BookIcon,
  FlameIcon,
  LeafIcon,
  CalendarIcon,
  ChartIcon,
  WandSparkleIcon,
  TomatoIcon,
  TrophyIcon,
  LockIcon,
} from '../components/icons'
import { BonsaiMascot, LevelRing } from '../components/illustrations'
import { PetalShape } from '../components/effects/SakuraPetals'

const LEVEL = 6
const XP = { current: 680, next: 1000 }

const ACHIEVEMENTS = [
  {
    id: 1,
    icon: BookIcon,
    title: 'First Steps',
    description: 'Completed your first study session',
    unlocked: true,
    xp: 25,
    dateLabel: 'Jul 28',
  },
  {
    id: 2,
    icon: FlameIcon,
    title: '7-Day Streak',
    description: 'Studied 7 days in a row',
    unlocked: true,
    xp: 50,
    dateLabel: 'Aug 3',
  },
  {
    id: 3,
    icon: LeafIcon,
    title: 'Bonsai Bloom',
    description: 'Reached Level 5',
    unlocked: true,
    xp: 100,
    dateLabel: 'Aug 8',
  },
  {
    id: 4,
    icon: CalendarIcon,
    title: 'Planner Pro',
    description: 'Completed 25 planned tasks',
    unlocked: true,
    xp: 75,
    dateLabel: 'Aug 11',
  },
  {
    id: 5,
    icon: FlameIcon,
    title: '30-Day Streak',
    description: 'Study 30 days in a row',
    unlocked: false,
    xp: 150,
    progress: 40,
    progressLabel: '12 / 30 days',
  },
  {
    id: 6,
    icon: ChartIcon,
    title: 'Deep Diver',
    description: 'Log 50 total study hours',
    unlocked: false,
    xp: 120,
    progress: 64,
    progressLabel: '32 / 50 hrs',
  },
  {
    id: 7,
    icon: WandSparkleIcon,
    title: "Sensei's Student",
    description: 'Chat with AI Sensei 10 times',
    unlocked: false,
    xp: 60,
    progress: 30,
    progressLabel: '3 / 10 chats',
  },
  {
    id: 8,
    icon: TomatoIcon,
    title: 'Focus Master',
    description: 'Complete 20 focus sessions',
    unlocked: false,
    xp: 100,
    progress: 0,
    progressLabel: '0 / 20 sessions',
  },
]

const RECENT = ACHIEVEMENTS.filter((a) => a.unlocked).slice(-1)[0]
const UNLOCKED_COUNT = ACHIEVEMENTS.filter((a) => a.unlocked).length
const TOTAL_XP_EARNED = ACHIEVEMENTS.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0)

function AchievementCard({ icon: Icon, title, description, unlocked, xp, progress, progressLabel, dateLabel }) {
  return (
    <Card
      variant={unlocked ? 'default' : 'outline'}
      className={['relative overflow-hidden', unlocked ? 'border-primary-soft/70' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {unlocked && (
        <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-9 w-9 rotate-45 text-primary/10" />
      )}
      <div className="relative flex items-start gap-3">
        <span
          className={[
            'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
            unlocked
              ? 'bg-gradient-to-br from-primary to-primary-strong text-text-inverse shadow-md'
              : 'bg-surface text-text-faint',
          ].join(' ')}
        >
          <Icon size={20} />
          {!unlocked && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-faint">
              <LockIcon size={11} />
            </span>
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className={['font-display font-semibold', unlocked ? 'text-text' : 'text-text-muted'].join(' ')}>
              {title}
            </p>
            <Badge variant={unlocked ? 'streak' : 'neutral'} size="sm">
              +{xp} XP
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-text-muted">{description}</p>

          {unlocked ? (
            <p className="mt-2 text-xs font-semibold text-accent-green-strong">✓ Unlocked {dateLabel}</p>
          ) : (
            <div className="mt-2.5">
              <ProgressBar value={progress} size="sm" variant="primary" />
              <p className="mt-1 text-xs text-text-faint">{progressLabel}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export function Milestones() {
  const percent = Math.round((XP.current / XP.next) * 100)
  const xpToGo = XP.next - XP.current

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
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
              <BonsaiMascot size={100} />
              <LevelRing level={LEVEL} percent={percent} size={38} className="absolute -bottom-1 -right-1" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-strong">Every step forward counts</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">Milestones 🏆</h1>
              <p className="mt-1 text-text-muted">Celebrate your growth, one badge at a time.</p>
            </div>
          </div>

          <div className="relative mt-6">
            <ProgressBar
              value={percent}
              label={`Level ${LEVEL} → Level ${LEVEL + 1}`}
              showValue
              variant="gradient"
              size="lg"
            />
            <p className="mt-2 text-sm text-text-muted">
              {XP.current.toLocaleString()} / {XP.next.toLocaleString()} XP · {xpToGo} XP to go
            </p>
          </div>
        </Card>
      </div>

      {/* recent celebration */}
      {RECENT && (
        <Card
          variant="elevated"
          className="relative overflow-hidden border-primary-soft/60 bg-gradient-to-r from-primary-soft via-bg-elevated to-primary-softer"
        >
          <PetalShape className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rotate-12 text-primary/20" />
          <PetalShape className="pointer-events-none absolute -bottom-2 left-10 hidden h-8 w-8 -rotate-12 text-primary-strong/15 sm:block" />
          <div className="relative flex flex-wrap items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse shadow-md">
              <TrophyIcon size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display font-semibold text-text">🎉 New milestone unlocked!</p>
              <p className="text-sm text-text-muted">
                {RECENT.title} — {RECENT.description.toLowerCase()}. Keep it up!
              </p>
            </div>
            <Badge variant="streak" icon={FlameIcon}>
              +{RECENT.xp} XP
            </Badge>
          </div>
        </Card>
      )}

      {/* achievements grid */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-text">Achievements</h2>
          <span className="text-sm text-text-muted">
            {UNLOCKED_COUNT}/{ACHIEVEMENTS.length} unlocked · {TOTAL_XP_EARNED} XP earned
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <AchievementCard key={a.id} {...a} />
          ))}
        </div>
      </div>
    </div>
  )
}
