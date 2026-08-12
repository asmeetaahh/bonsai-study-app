import { useState } from 'react'
import { AppShell } from './components/layout'
import { Card } from './components/ui'
import { HomeIcon, BookIcon, ChartIcon, SettingsIcon, LeafIcon } from './components/icons'
import { Dashboard } from './pages/Dashboard'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'study', label: 'Study', icon: BookIcon },
  { id: 'progress', label: 'Progress', icon: ChartIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

function ComingSoon({ label }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
        <LeafIcon size={22} />
      </span>
      <div>
        <p className="font-display text-lg font-semibold text-text">{label} is still growing</p>
        <p className="text-sm text-text-muted">This page is coming soon.</p>
      </div>
    </Card>
  )
}

function App() {
  const [activeId, setActiveId] = useState('dashboard')
  const activeLabel = NAV_ITEMS.find((item) => item.id === activeId)?.label

  return (
    <AppShell navItems={NAV_ITEMS} activeId={activeId} onNavigate={setActiveId} brand="Bonsai">
      {activeId === 'dashboard' ? <Dashboard /> : <ComingSoon label={activeLabel} />}
    </AppShell>
  )
}

export default App
