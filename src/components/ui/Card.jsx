const VARIANT_CLASSES = {
  default: 'bg-bg-elevated border border-border shadow-sm',
  elevated: 'bg-bg-elevated border border-border/60 shadow-lg',
  outline: 'bg-transparent border-2 border-border',
  glass: 'bg-bg-elevated/70 border border-border/50 shadow-md backdrop-blur-md',
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-3.5',
  md: 'p-5',
  lg: 'p-7',
}

export function Card({
  as: Component = 'div',
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'rounded-xl transition-colors duration-200',
    VARIANT_CLASSES[variant],
    PADDING_CLASSES[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}

export function CardHeader({ title, subtitle, icon: Icon, actions, className = '' }) {
  return (
    <div className={['flex items-start justify-between gap-3 mb-4', className].join(' ')}>
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
            <Icon size={18} />
          </span>
        )}
        <div className="min-w-0">
          {title && (
            <h3 className="font-display font-semibold text-text truncate">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-text-muted truncate">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}

export function CardBody({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function CardFooter({ className = '', children }) {
  return (
    <div
      className={[
        'mt-4 pt-4 border-t border-border flex items-center justify-between gap-3',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
