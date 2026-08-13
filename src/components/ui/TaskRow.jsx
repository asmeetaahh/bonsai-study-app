import { CheckIcon, CloseIcon } from '../icons'

export function TaskRow({
  title,
  subtitle,
  meta,
  completed = false,
  onToggle,
  badge,
  onDelete,
  className = '',
}) {
  return (
    <div
      className={[
        'group flex items-center gap-3 rounded-lg p-3 transition-colors duration-150',
        'hover:bg-surface',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={completed}
        aria-label={completed ? 'Mark task incomplete' : 'Mark task complete'}
        className={[
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150',
          completed
            ? 'bg-primary border-primary text-text-inverse'
            : 'border-border-strong text-transparent hover:border-primary',
        ].join(' ')}
      >
        <CheckIcon size={13} strokeWidth={2.5} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={[
            'truncate font-medium transition-colors duration-150',
            completed ? 'text-text-faint line-through' : 'text-text',
          ].join(' ')}
        >
          {title}
        </p>
        {subtitle && (
          <p className="truncate text-sm text-text-muted">{subtitle}</p>
        )}
      </div>

      {badge && <div className="shrink-0">{badge}</div>}
      {meta && (
        <span className="shrink-0 text-sm text-text-muted whitespace-nowrap">
          {meta}
        </span>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete task"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-faint transition-colors duration-150 hover:bg-danger/10 hover:text-danger"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  )
}
