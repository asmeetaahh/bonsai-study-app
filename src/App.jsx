import { useState } from 'react'
import { AppShell } from './components/layout'
import { Card } from './components/ui'
import {
  HomeIcon,
  CalendarIcon,
  ChartIcon,
  WandSparkleIcon,
  TrophyIcon,
  TomatoIcon,
  GameControllerIcon,
  SettingsIcon,
  LeafIcon,
} from './components/icons'
import { Dashboard } from './pages/Dashboard'
import { Planner } from './pages/Planner'
import { Tracker } from './pages/Tracker'
import { AiSensei } from './pages/AiSensei'
import { Milestones } from './pages/Milestones'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'planner', label: 'Planner', icon: CalendarIcon },
  { id: 'tracker', label: 'Tracker', icon: ChartIcon },
  { id: 'ai-sensei', label: 'AI Sensei', icon: WandSparkleIcon },
  { id: 'milestones', label: 'Milestones', icon: TrophyIcon },
  { id: 'pomodoro', label: 'Pomodoro', icon: TomatoIcon },
  { id: 'game', label: 'Game', icon: GameControllerIcon },
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
      {activeId === 'dashboard' && <Dashboard />}
      {activeId === 'planner' && <Planner />}
      {activeId === 'tracker' && <Tracker />}
      {activeId === 'ai-sensei' && <AiSensei />}
      {activeId === 'milestones' && <Milestones />}
      {!['dashboard', 'planner', 'tracker', 'ai-sensei', 'milestones'].includes(activeId) && (
        <ComingSoon label={activeLabel} />
      )}
    </AppShell>
  )
}

export default App
