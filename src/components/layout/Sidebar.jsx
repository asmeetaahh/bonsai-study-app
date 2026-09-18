import { CloseIcon, LeafIcon } from '../icons'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Sidebar({
  items = [],
  activeId,
  onSelect,
  isOpen = false,
  onClose,
  footer,
  brand = 'Bonsai',
}) {
  return (
    <>
      {/* mobile scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={[
          'fixed inset-0 z-30 bg-[color:var(--bonsai-overlay)] transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-border',
          'bg-bg-elevated transition-transform duration-300 ease-out',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-strong text-text-inverse shadow-md">
              <LeafIcon size={18} />
            </span>
            <span className="font-display text-lg font-bold text-text">{brand}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-1.5 text-text-muted hover:bg-surface hover:text-text lg:hidden"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = item.id === activeId
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect?.(item.id)}
                    className={[
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-primary-soft text-primary-strong'
                        : 'text-text-muted hover:bg-surface hover:text-text',
                    ].join(' ')}
                  >
                    {Icon && <Icon size={18} />}
                    <span className="truncate">{item.label}</span>
                    {item.badge && <span className="ml-auto">{item.badge}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-border px-4 py-4">
          {footer}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-text-muted">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  )
}
