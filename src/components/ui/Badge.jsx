const VARIANT_CLASSES = {
  primary: 'bg-primary-soft text-primary-strong',
  green: 'bg-accent-green-soft text-accent-green-strong',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  neutral: 'bg-surface text-text-muted',
  streak: 'bg-gradient-to-r from-primary to-primary-strong text-text-inverse',
}

const SIZE_CLASSES = {
  sm: 'text-[11px] px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
}

export function Badge({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex items-center rounded-full font-semibold whitespace-nowrap',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  )
}
