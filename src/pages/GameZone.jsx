import { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, Button, ProgressBar } from '../components/ui'
import { GameControllerIcon, TrophyIcon, FlameIcon, LeafIcon, PlayIcon, ResetIcon } from '../components/icons'
import { PetalShape } from '../components/effects/SakuraPetals'
import './GameZone.css'

const ROUND_SECONDS = 30
const SPAWN_INTERVAL_MS = 650
const NORMAL_XP = 10
const RARE_XP = 25
const RARE_CHANCE = 0.18
const DAILY_CAP = 50

function createPetal(id) {
  const isRare = Math.random() < RARE_CHANCE
  const size = isRare ? 32 + Math.random() * 10 : 24 + Math.random() * 12
  return {
    id,
    isRare,
    value: isRare ? RARE_XP : NORMAL_XP,
    style: {
      '--petal-left': `${Math.random() * 85}%`,
      '--petal-size': `${size}px`,
      '--petal-duration': `${(2.2 + Math.random() * 1.4).toFixed(2)}s`,
      '--petal-drift': `${Math.round((Math.random() * 2 - 1) * 50)}px`,
    },
  }
}

function formatSeconds(total) {
  return `0:${Math.max(0, total).toString().padStart(2, '0')}`
}

export function GameZone() {
  const [status, setStatus] = useState('idle') // 'idle' | 'playing' | 'finished'
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [roundXP, setRoundXP] = useState(0)
  const [petals, setPetals] = useState([])
  const [dailyXPEarned, setDailyXPEarned] = useState(0)

  const timeLeftRef = useRef(ROUND_SECONDS)
  const spawnIntervalRef = useRef(null)
  const petalIdRef = useRef(0)
  // authoritative running totals, read/written synchronously so a burst of
  // catches within the same React batch can't each see a stale XP total
  const dailyXPRef = useRef(0)
  const roundXPRef = useRef(0)

  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  const endRound = () => {
    clearInterval(spawnIntervalRef.current)
    setStatus('finished')
    setPetals([])
  }

  useEffect(() => {
    if (status !== 'playing') return undefined

    const countdownId = setInterval(() => {
      const next = timeLeftRef.current - 1
      if (next <= 0) {
        setTimeLeft(0)
        endRound()
      } else {
        setTimeLeft(next)
      }
    }, 1000)

    const spawnId = setInterval(() => {
      const id = petalIdRef.current++
      setPetals((prev) => [...prev, createPetal(id)])
    }, SPAWN_INTERVAL_MS)
    spawnIntervalRef.current = spawnId

    return () => {
      clearInterval(countdownId)
      clearInterval(spawnId)
    }
  }, [status])

  const startRound = () => {
    roundXPRef.current = 0
    setStatus('playing')
    setTimeLeft(ROUND_SECONDS)
    setRoundXP(0)
    setPetals([])
  }

  const catchPetal = (petal) => {
    setPetals((prev) => prev.filter((p) => p.id !== petal.id))
    const remaining = DAILY_CAP - dailyXPRef.current
    if (remaining <= 0) return
    const award = Math.min(petal.value, remaining)
    dailyXPRef.current += award
    roundXPRef.current += award
    setDailyXPEarned(dailyXPRef.current)
    setRoundXP(roundXPRef.current)
  }

  const missPetal = (id) => {
    setPetals((prev) => prev.filter((p) => p.id !== id))
  }

  const dailyPercent = (dailyXPEarned / DAILY_CAP) * 100
  const capReached = dailyXPEarned >= DAILY_CAP

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
          <p className="relative text-sm font-semibold text-primary-strong">A playful study break</p>
          <h1 className="relative mt-1 font-display text-3xl font-bold text-text sm:text-4xl">
            Game Zone 🎮🌸
          </h1>
          <p className="relative mt-1 max-w-md text-text-muted">
            Catch a few sakura petals, earn a little XP, then get back to it refreshed.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* game */}
        <Card padding="lg" className="lg:col-span-2">
          <CardHeader title="Sakura Catch" subtitle="Catch falling petals before time runs out" icon={GameControllerIcon} />

          <div className="mb-4 flex items-center justify-between rounded-full bg-surface px-4 py-2">
            <span className="font-display font-semibold text-text">✨ {roundXP} XP</span>
            <span className="font-display font-semibold tabular-nums text-text">⏱ {formatSeconds(timeLeft)}</span>
          </div>

          <div className="relative h-80 overflow-hidden rounded-2xl border border-border bg-surface/50 sm:h-96">
            {status === 'playing' &&
              petals.map((petal) => (
                <button
                  key={petal.id}
                  type="button"
                  className={['game-petal', petal.isRare ? 'is-rare' : ''].filter(Boolean).join(' ')}
                  style={petal.style}
                  onClick={() => catchPetal(petal)}
                  onAnimationEnd={() => missPetal(petal.id)}
                  aria-label={petal.isRare ? 'Catch rare petal, plus 25 XP' : 'Catch petal, plus 10 XP'}
                >
                  <PetalShape />
                </button>
              ))}

            {status === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
                  <GameControllerIcon size={26} />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-text">Ready to play?</p>
                  <p className="mx-auto mt-1 max-w-xs text-sm text-text-muted">
                    Tap the falling petals before they disappear. Glowing petals are rare and worth more!
                  </p>
                </div>
                <Button size="lg" icon={PlayIcon} onClick={startRound}>
                  Start round
                </Button>
                {capReached && (
                  <p className="text-xs text-text-faint">
                    You&apos;ve reached today&apos;s XP cap — feel free to keep playing for fun!
                  </p>
                )}
              </div>
            )}

            {status === 'finished' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse shadow-md">
                  <TrophyIcon size={26} />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-text">Round complete!</p>
                  <p className="mt-1 text-text-muted">
                    You caught <span className="font-semibold text-primary-strong">{roundXP} XP</span> this round 🌸
                  </p>
                  {capReached && (
                    <p className="mt-1 text-xs text-text-faint">Daily XP cap reached — great work today!</p>
                  )}
                </div>
                <Button icon={ResetIcon} onClick={startRound}>
                  Play again
                </Button>
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-xs text-text-muted">
            🌸 Normal petal +{NORMAL_XP} XP &nbsp;·&nbsp; ✨ Rare glowing petal +{RARE_XP} XP
          </p>
        </Card>

        {/* sidebar */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Today's game XP" icon={FlameIcon} />
            <ProgressBar value={dailyPercent} showValue variant="gradient" />
            <p className="mt-2 text-sm text-text-muted">
              {dailyXPEarned}/{DAILY_CAP} XP earned today
            </p>
          </Card>

          <Card variant="outline" className="relative overflow-hidden border-primary-soft">
            <PetalShape className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 rotate-45 text-primary/15" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-accent-green-strong">
                <LeafIcon size={18} />
              </span>
              <div>
                <p className="font-display font-semibold text-text">Little breaks help big growth</p>
                <p className="text-sm text-text-muted">
                  A quick round of Sakura Catch is the perfect pause between study sessions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
