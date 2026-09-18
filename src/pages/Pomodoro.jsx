import { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, Button, StatTile } from '../components/ui'
import { PlayIcon, PauseIcon, ResetIcon, FlameIcon, ChartIcon, CalendarIcon, CheckIcon } from '../components/icons'
import { PetalShape } from '../components/effects/SakuraPetals'
import { recordSession } from '../data/studySessionStore'

const MODES = {
  focus: { label: 'Focus', minutes: 25 },
  short: { label: 'Short Break', minutes: 5 },
  long: { label: 'Long Break', minutes: 15 },
}
const SESSIONS_PER_CYCLE = 4

const INITIAL_RECENT_SESSIONS = [
  { id: 1, mode: 'focus', minutes: 25, time: '2:15 PM' },
  { id: 2, mode: 'focus', minutes: 25, time: '1:40 PM' },
  { id: 3, mode: 'short', minutes: 5, time: '1:35 PM' },
]

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (totalSeconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function TimerRing({ percent, isBreak, size = 240 }) {
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-surface)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={isBreak ? 'var(--color-accent-green-strong)' : 'var(--color-primary-strong)'}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
    </svg>
  )
}

export function Pomodoro() {
  const [mode, setMode] = useState('focus')
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [cyclesCompleted, setCyclesCompleted] = useState(2)
  const [todayFocusCount, setTodayFocusCount] = useState(2)
  const [todayFocusMinutes, setTodayFocusMinutes] = useState(50)
  const [recentSessions, setRecentSessions] = useState(INITIAL_RECENT_SESSIONS)

  // mirror the latest values in refs so the interval callback (a stable
  // external-timer subscription) can read them without going stale
  const secondsRef = useRef(secondsLeft)
  const modeRef = useRef(mode)
  const cyclesRef = useRef(cyclesCompleted)
  useEffect(() => {
    secondsRef.current = secondsLeft
  }, [secondsLeft])
  useEffect(() => {
    modeRef.current = mode
  }, [mode])
  useEffect(() => {
    cyclesRef.current = cyclesCompleted
  }, [cyclesCompleted])

  const completeSession = (finishedMode, cyclesSoFar) => {
    const minutes = MODES[finishedMode].minutes
    setRecentSessions((prev) =>
      [
        {
          id: Date.now(),
          mode: finishedMode,
          minutes,
          time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        },
        ...prev,
      ].slice(0, 6),
    )

    if (finishedMode === 'focus') {
      recordSession({ type: 'focus', minutes })
      setTodayFocusCount((c) => c + 1)
      setTodayFocusMinutes((m) => m + minutes)
      const nextCycles = cyclesSoFar + 1
      const nextMode = nextCycles % SESSIONS_PER_CYCLE === 0 ? 'long' : 'short'
      setCyclesCompleted(nextCycles)
      setMode(nextMode)
      setSecondsLeft(MODES[nextMode].minutes * 60)
    } else {
      setMode('focus')
      setSecondsLeft(MODES.focus.minutes * 60)
    }
  }

  // tick every second while running; completion side effects run inside
  // this timer callback rather than synchronously in the effect body
  useEffect(() => {
    if (!isRunning) return undefined
    const id = setInterval(() => {
      const next = secondsRef.current - 1
      if (next <= 0) {
        setSecondsLeft(0)
        setIsRunning(false)
        completeSession(modeRef.current, cyclesRef.current)
      } else {
        setSecondsLeft(next)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  const switchMode = (nextMode) => {
    if (isRunning || nextMode === mode) return
    setMode(nextMode)
    setSecondsLeft(MODES[nextMode].minutes * 60)
  }

  const reset = () => {
    setIsRunning(false)
    setSecondsLeft(MODES[mode].minutes * 60)
  }

  const totalSeconds = MODES[mode].minutes * 60
  const percent = ((totalSeconds - secondsLeft) / totalSeconds) * 100
  const isBreak = mode !== 'focus'
  const sessionInCycle = (cyclesCompleted % SESSIONS_PER_CYCLE) + 1

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
          <p className="relative text-sm font-semibold text-primary-strong">Focus in gentle bursts</p>
          <h1 className="relative mt-1 font-display text-3xl font-bold text-text sm:text-4xl">Pomodoro 🌸</h1>
          <p className="relative mt-1 max-w-md text-text-muted">
            Breathe in, focus, then rest — your bonsai grows with every calm session.
          </p>
        </Card>
      </div>

      {/* timer */}
      <Card variant="elevated" padding="lg" className="relative overflow-hidden">
        <PetalShape className="pointer-events-none absolute -right-3 top-3 h-10 w-10 rotate-45 text-primary/10" />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-surface p-1">
            {Object.entries(MODES).map(([key, m]) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key)}
                disabled={isRunning && key !== mode}
                className={[
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 sm:text-sm',
                  key === mode
                    ? 'bg-primary text-text-inverse shadow-sm'
                    : 'text-text-muted hover:text-text disabled:opacity-40 disabled:hover:text-text-muted',
                ].join(' ')}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
            <TimerRing percent={percent} isBreak={isBreak} size={240} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="font-display text-5xl font-bold tabular-nums text-text">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-sm font-medium text-text-muted">{MODES[mode].label}</span>
            </div>
          </div>

          <p className="text-sm text-text-muted">
            Focus session {sessionInCycle} of {SESSIONS_PER_CYCLE} this cycle
            {sessionInCycle === SESSIONS_PER_CYCLE ? ' · long break after' : ''}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              aria-label="Reset timer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:bg-surface hover:text-text"
            >
              <ResetIcon size={20} />
            </button>
            <Button
              size="lg"
              icon={isRunning ? PauseIcon : PlayIcon}
              onClick={() => setIsRunning((r) => !r)}
              className="min-w-[9.5rem]"
            >
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <div className="h-11 w-11" aria-hidden="true" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* today's focus summary */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <StatTile
            icon={FlameIcon}
            label="Focus sessions today"
            value={todayFocusCount}
            trend={{ direction: 'up', value: '1' }}
          />
          <StatTile icon={ChartIcon} label="Minutes focused today" value={todayFocusMinutes} variant="green" />
        </div>

        {/* recent sessions */}
        <Card className="lg:col-span-2">
          <CardHeader title="Recent sessions" icon={CalendarIcon} />
          <div className="flex flex-col gap-2">
            {recentSessions.length === 0 && (
              <p className="py-4 text-center text-sm text-text-faint">No sessions yet — press start!</p>
            )}
            {recentSessions.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5">
                <span
                  className={[
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                    s.mode === 'focus'
                      ? 'bg-primary-soft text-primary-strong'
                      : 'bg-accent-green-soft text-accent-green-strong',
                  ].join(' ')}
                >
                  <CheckIcon size={13} strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-text">{MODES[s.mode].label}</p>
                  <p className="text-sm text-text-muted">
                    {s.minutes} min · {s.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
