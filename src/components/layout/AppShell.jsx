import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MenuIcon } from '../icons'
import { SakuraPetals } from '../effects/SakuraPetals'

export function AppShell({
  navItems = [],
  activeId,
  onNavigate,
  brand,
  sidebarFooter,
  topBarActions,
  showPetals = true,
  petalCount,
  children,
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="relative flex min-h-screen bg-bg text-text">
      {showPetals && <SakuraPetals count={petalCount} />}

      <Sidebar
        items={navItems}
        activeId={activeId}
        onSelect={(id) => {
          onNavigate?.(id)
          setSidebarOpen(false)
        }}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        footer={sidebarFooter}
        brand={brand}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-bg-elevated/80 px-4 py-3 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-text"
          >
            <MenuIcon size={20} />
          </button>
          <span className="font-display font-semibold text-text">{brand}</span>
          <div className="w-9">{topBarActions}</div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
