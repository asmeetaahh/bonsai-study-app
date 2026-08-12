import { useTheme } from '../../theme/useTheme'
import { MoonIcon, SunIcon } from '../icons'

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={[
        'group relative inline-flex h-9 w-16 shrink-0 items-center rounded-full',
        'bg-surface border border-border transition-colors duration-300',
        'hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full',
          'bg-primary text-text-inverse shadow-md transition-transform duration-300 ease-out',
          isDark ? 'translate-x-7' : 'translate-x-0',
        ].join(' ')}
      >
        {isDark ? <MoonIcon size={15} /> : <SunIcon size={15} />}
      </span>
    </button>
  )
}
