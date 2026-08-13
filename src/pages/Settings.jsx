import { useEffect, useState } from 'react'
import { Card, CardHeader, ThemeToggle } from '../components/ui'
import { useTheme } from '../theme/useTheme'
import { SunIcon, TomatoIcon, BellIcon, UserIcon, LeafIcon, InfoIcon } from '../components/icons'
import { PetalShape } from '../components/effects/SakuraPetals'

const STUDY_PREFS_KEY = 'bonsai-study-prefs'
const NOTIF_PREFS_KEY = 'bonsai-notif-prefs'
const DISPLAY_NAME_KEY = 'bonsai-display-name'

const DEFAULT_STUDY_PREFS = { focus: 25, shortBreak: 5, longBreak: 15 }
const DEFAULT_NOTIF_PREFS = { studyReminders: true, dailyGoalReminder: true }

function loadJSON(key, fallback) {
  const stored = window.localStorage.getItem(key)
  if (!stored) return fallback
  try {
    return { ...fallback, ...JSON.parse(stored) }
  } catch {
    return fallback
  }
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300',
        checked ? 'bg-primary' : 'border border-border bg-surface',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-5 w-5 transform rounded-full bg-bg-elevated shadow-sm transition-transform duration-300',
          checked ? 'translate-x-6' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}

function DurationStepper({ label, value, onChange, min, max, step = 5 }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-text">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-muted transition-colors duration-150 hover:bg-surface hover:text-text disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-text-muted"
        >
          −
        </button>
        <span className="w-14 text-center font-display font-semibold text-text">{value} min</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-muted transition-colors duration-150 hover:bg-surface hover:text-text disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-text-muted"
        >
          +
        </button>
      </div>
    </div>
  )
}

function Row({ title, subtitle, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-text">{title}</p>
        {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function Settings({ sakuraEnabled, onSakuraEnabledChange, reducedMotion, onReducedMotionChange }) {
  const { isDark } = useTheme()

  const [studyPrefs, setStudyPrefs] = useState(() => loadJSON(STUDY_PREFS_KEY, DEFAULT_STUDY_PREFS))
  const [notifPrefs, setNotifPrefs] = useState(() => loadJSON(NOTIF_PREFS_KEY, DEFAULT_NOTIF_PREFS))
  const [displayName, setDisplayName] = useState(
    () => window.localStorage.getItem(DISPLAY_NAME_KEY) ?? 'Asmita',
  )

  useEffect(() => {
    window.localStorage.setItem(STUDY_PREFS_KEY, JSON.stringify(studyPrefs))
  }, [studyPrefs])

  useEffect(() => {
    window.localStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(notifPrefs))
  }, [notifPrefs])

  useEffect(() => {
    window.localStorage.setItem(DISPLAY_NAME_KEY, displayName)
  }, [displayName])

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
          <p className="relative text-sm font-semibold text-primary-strong">Make it feel like yours</p>
          <h1 className="relative mt-1 font-display text-3xl font-bold text-text sm:text-4xl">Settings ⚙️</h1>
          <p className="relative mt-1 max-w-md text-text-muted">
            Tune your Bonsai experience to fit the way you study.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* appearance */}
        <Card>
          <CardHeader title="Appearance" subtitle="Light or dark, your call" icon={SunIcon} />
          <Row title="Theme" subtitle={`${isDark ? 'Dark' : 'Light'} mode is active`}>
            <ThemeToggle />
          </Row>
        </Card>

        {/* study preferences */}
        <Card>
          <CardHeader title="Study preferences" subtitle="Default Pomodoro durations" icon={TomatoIcon} />
          <div className="flex flex-col divide-y divide-border">
            <DurationStepper
              label="Focus duration"
              value={studyPrefs.focus}
              onChange={(v) => setStudyPrefs((p) => ({ ...p, focus: v }))}
              min={5}
              max={60}
            />
            <DurationStepper
              label="Short break"
              value={studyPrefs.shortBreak}
              onChange={(v) => setStudyPrefs((p) => ({ ...p, shortBreak: v }))}
              min={1}
              max={30}
            />
            <DurationStepper
              label="Long break"
              value={studyPrefs.longBreak}
              onChange={(v) => setStudyPrefs((p) => ({ ...p, longBreak: v }))}
              min={5}
              max={45}
            />
          </div>
        </Card>

        {/* notifications */}
        <Card>
          <CardHeader title="Notifications" subtitle="Gentle nudges to stay on track" icon={BellIcon} />
          <div className="flex flex-col divide-y divide-border">
            <Row title="Study reminders" subtitle="Get nudged when it's time to focus">
              <Switch
                checked={notifPrefs.studyReminders}
                onChange={(v) => setNotifPrefs((p) => ({ ...p, studyReminders: v }))}
                label="Toggle study reminders"
              />
            </Row>
            <Row title="Daily goal reminder" subtitle="A nudge if you haven't hit today's goal">
              <Switch
                checked={notifPrefs.dailyGoalReminder}
                onChange={(v) => setNotifPrefs((p) => ({ ...p, dailyGoalReminder: v }))}
                label="Toggle daily goal reminder"
              />
            </Row>
          </div>
        </Card>

        {/* profile */}
        <Card>
          <CardHeader title="Profile" icon={UserIcon} />
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse shadow-md">
              <LeafIcon size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <label className="sr-only" htmlFor="display-name">
                Display name
              </label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm font-medium text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="mt-1.5 text-xs text-text-muted">🌸 Level 6 · Growing strong</p>
            </div>
          </div>
        </Card>

        {/* app preferences */}
        <Card>
          <CardHeader title="App preferences" subtitle="Ambience & accessibility" icon={LeafIcon} />
          <div className="flex flex-col divide-y divide-border">
            <Row title="Sakura petals animation" subtitle="Falling petals across the app">
              <Switch checked={sakuraEnabled} onChange={onSakuraEnabledChange} label="Toggle sakura petals" />
            </Row>
            <Row title="Reduce motion" subtitle="Minimize animations app-wide">
              <Switch checked={reducedMotion} onChange={onReducedMotionChange} label="Toggle reduced motion" />
            </Row>
          </div>
        </Card>

        {/* about */}
        <Card variant="outline" className="relative overflow-hidden border-primary-soft">
          <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 rotate-45 text-primary/15" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
              <InfoIcon size={18} />
            </span>
            <div>
              <p className="font-display font-semibold text-text">About Bonsai 🌱</p>
              <p className="text-sm text-text-muted">Version 1.0.0 · Made with 🌸 for mindful studying.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
