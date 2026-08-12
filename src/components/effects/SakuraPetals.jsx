import { useState } from 'react'
import './SakuraPetals.css'

function PetalShape() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M12 2c-1.6 0-2.2 1.1-2.2 1.1S5 5 3.2 9.4C1.9 12.6 2.6 16 5 18.4 7 20.4 9.4 21.5 12 21.5s5-1.1 7-3.1c2.4-2.4 3.1-5.8 1.8-9C19 5 14.2 3.1 14.2 3.1S13.6 2 12 2Z"
        opacity="0.95"
      />
      <path
        d="M12 4.4c1.8 1.6 3 4.6 3 7.6 0 3.6-1.7 6.6-3 8.3-1.3-1.7-3-4.7-3-8.3 0-3 1.2-6 3-7.6Z"
        fill="rgb(255 255 255 / 25%)"
      />
    </svg>
  )
}

function generatePetals(count) {
  return Array.from({ length: count }, (_, i) => {
    const size = 14 + Math.random() * 16
    const duration = 9 + Math.random() * 9
    const delay = -(Math.random() * duration)
    const spinDuration = 3 + Math.random() * 4
    const spinDir = Math.random() > 0.5 ? '360deg' : '-360deg'
    const drift = (Math.random() * 2 - 1) * 140
    const opacity = 0.45 + Math.random() * 0.4
    const useAccent = Math.random() < 0.15

    return {
      id: i,
      style: {
        '--sakura-left': `${Math.random() * 100}%`,
        '--sakura-size': `${size}px`,
        '--sakura-duration': `${duration}s`,
        '--sakura-delay': `${delay}s`,
        '--sakura-spin-duration': `${spinDuration}s`,
        '--sakura-spin-dir': spinDir,
        '--sakura-drift': `${drift}px`,
        '--sakura-opacity': opacity,
        '--sakura-tint': useAccent
          ? 'var(--color-primary-strong)'
          : 'var(--color-primary)',
      },
    }
  })
}

/**
 * Reusable falling sakura petal overlay. Fixed, full-viewport,
 * pointer-events-none, so it can sit behind or above any page content.
 * Petal count/positions/timing randomize once per mount (generated in
 * an effect, not during render, to stay a pure component).
 */
export function SakuraPetals({ count = 18, className = '' }) {
  const [petals] = useState(() => generatePetals(count))

  return (
    <div className={['sakura-container', className].join(' ')} aria-hidden="true">
      {petals.map((petal) => (
        <span key={petal.id} className="sakura-petal" style={petal.style}>
          <PetalShape />
        </span>
      ))}
    </div>
  )
}
