/**
 * Kawaii bonsai-in-a-pot mascot. Purely decorative, theme-aware via
 * CSS custom properties so it recolors automatically in light/dark.
 */
export function BonsaiMascot({ size = 128, className = '' }) {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bonsai-pot-grad" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary-strong)" />
        </radialGradient>
        <radialGradient id="bonsai-canopy-grad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--color-primary-soft)" />
          <stop offset="100%" stopColor="var(--color-primary)" />
        </radialGradient>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="80" cy="140" rx="38" ry="7" fill="var(--color-text)" opacity="0.08" />

      {/* pot */}
      <path
        d="M52 112h56l-6 26a6 6 0 0 1-5.9 5H63.9a6 6 0 0 1-5.9-5l-6-26Z"
        fill="url(#bonsai-pot-grad)"
      />
      <rect x="47" y="103" width="66" height="13" rx="6.5" fill="var(--color-primary-strong)" />
      <rect x="47" y="103" width="66" height="5" rx="2.5" fill="var(--color-primary-softer)" opacity="0.5" />

      {/* trunk */}
      <path
        d="M80 103c-2-10 6-14 3-24-2-7 4-12 2-19"
        stroke="#a9714f"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M83 92c4-4 10-3 12-8"
        stroke="#a9714f"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* canopy clusters */}
      <circle cx="80" cy="52" r="30" fill="url(#bonsai-canopy-grad)" />
      <circle cx="52" cy="66" r="19" fill="var(--color-primary)" />
      <circle cx="110" cy="64" r="20" fill="var(--color-primary)" />
      <circle cx="97" cy="82" r="15" fill="var(--color-primary-strong)" opacity="0.85" />

      {/* blossom flecks */}
      <g fill="var(--color-primary-softer)" opacity="0.9">
        <circle cx="66" cy="40" r="2.4" />
        <circle cx="95" cy="35" r="2" />
        <circle cx="108" cy="55" r="2.2" />
        <circle cx="58" cy="60" r="1.8" />
        <circle cx="100" cy="70" r="1.8" />
      </g>

      {/* tiny green sprigs peeking out either side of the pot */}
      <path
        d="M50 108c-6 1-10-2-11-8 6-1 10 2 11 8Z"
        fill="var(--color-accent-green)"
      />
      <path
        d="M110 108c6 1 10-2 11-8-6-1-10 2-11 8Z"
        fill="var(--color-accent-green)"
      />

      {/* kawaii face on the pot */}
      <path d="M66 122q3 4 6 0" stroke="var(--color-text-inverse)" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M88 122q3 4 6 0" stroke="var(--color-text-inverse)" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M74 129q6 4 12 0" stroke="var(--color-text-inverse)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85" />
      <circle cx="63" cy="128" r="3.2" fill="var(--color-primary-strong)" opacity="0.55" />
      <circle cx="97" cy="128" r="3.2" fill="var(--color-primary-strong)" opacity="0.55" />

      {/* sparkles */}
      <g fill="var(--color-primary-strong)">
        <path d="M124 40l1.6 3.6 3.6 1.6-3.6 1.6-1.6 3.6-1.6-3.6-3.6-1.6 3.6-1.6 1.6-3.6Z" />
        <path d="M34 44l1.1 2.5 2.5 1.1-2.5 1.1-1.1 2.5-1.1-2.5-2.5-1.1 2.5-1.1 1.1-2.5Z" opacity="0.8" />
      </g>
    </svg>
  )
}
