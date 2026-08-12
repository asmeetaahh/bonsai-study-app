/**
 * Small circular XP-progress badge, meant to overlap a mascot/avatar corner.
 */
export function LevelRing({ level, percent = 0, size = 56, className = '' }) {
  const stroke = 4.5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference

  return (
    <div
      className={['relative flex items-center justify-center', className].join(' ')}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-primary-strong)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-bg-elevated shadow-sm" style={{ inset: stroke + 3 }}>
        <span className="font-display text-[11px] font-bold leading-none text-text">
          Lv{level}
        </span>
      </div>
    </div>
  )
}
