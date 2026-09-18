const TRACK_SIZE = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const FILL_VARIANT = {
  primary: 'bg-primary',
  green: 'bg-accent-green',
  gradient: 'bg-gradient-to-r from-primary to-primary-strong',
}

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  label,
  showValue = false,
  className = '',
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-text-muted">{label}</span>}
          {showValue && (
            <span className="font-display font-semibold text-text">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={[
          'w-full overflow-hidden rounded-full bg-surface',
          TRACK_SIZE[size],
        ].join(' ')}
      >
        <div
          className={[
            'h-full rounded-full transition-[width] duration-500 ease-out',
            FILL_VARIANT[variant],
          ].join(' ')}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
