import { TrendDownIcon, TrendUpIcon } from '../icons'

export function StatTile({
  icon: Icon,
  label,
  value,
  trend,
  variant = 'primary',
  className = '',
}) {
  const trendUp = trend?.direction === 'up'
  const TrendIcon = trendUp ? TrendUpIcon : TrendDownIcon

  return (
    <div
      className={[
        'flex flex-col gap-3 rounded-xl border border-border bg-bg-elevated p-4 shadow-sm',
        className,
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        {Icon && (
          <span
            className={[
              'flex h-9 w-9 items-center justify-center rounded-full',
              variant === 'green'
                ? 'bg-accent-green-soft text-accent-green-strong'
                : 'bg-primary-soft text-primary-strong',
            ].join(' ')}
          >
            <Icon size={18} />
          </span>
        )}
        {trend && (
          <span
            className={[
              'flex items-center gap-1 text-xs font-semibold',
              trendUp ? 'text-success' : 'text-danger',
            ].join(' ')}
          >
            <TrendIcon size={13} />
            {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="font-display text-2xl font-bold text-text">{value}</p>
        <p className="text-sm text-text-muted">{label}</p>
      </div>
    </div>
  )
}
