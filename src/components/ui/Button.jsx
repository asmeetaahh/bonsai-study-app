const VARIANT_CLASSES = {
  primary:
    'bg-primary text-text-inverse shadow-md hover:bg-primary-strong hover:shadow-lg',
  secondary:
    'bg-primary-soft text-primary-strong hover:bg-primary-soft/70',
  outline:
    'bg-transparent border-2 border-primary text-primary hover:bg-primary-soft',
  ghost: 'bg-transparent text-text-muted hover:bg-surface hover:text-text',
  danger: 'bg-danger text-text-inverse shadow-md hover:brightness-95',
}

const SIZE_CLASSES = {
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
}

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center font-display font-semibold rounded-full',
    'transition-all duration-200 active:scale-[0.97]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...rest}>
      {Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 20 : 16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 20 : 16} />}
    </Component>
  )
}
