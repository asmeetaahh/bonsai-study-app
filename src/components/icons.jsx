/*
  Small hand-rolled icon set so the foundation has no external icon
  dependency. Every icon takes `size` (px) and forwards the rest of
  its props (className, etc). Stroke uses currentColor so icons pick
  up text color utilities.
*/

function base(props) {
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    width: props.size ?? 20,
    height: props.size ?? 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: props.strokeWidth ?? 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
}

export function HomeIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function BookIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  )
}

export function ChartIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M4 20V10" />
      <path d="M11 20V4" />
      <path d="M18 20v-7" />
      <path d="M3 20h18" />
    </svg>
  )
}

export function SettingsIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <circle cx="12" cy="12" r="3.25" />
      <path d="M19.4 13.5a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19.5a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4.5a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 6.1 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10.5a1.65 1.65 0 0 0 1-1.51V2.5a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V8.6a1.65 1.65 0 0 0 1.51 1H21.5a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function SunIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.25" />
      <path d="M12 19.25v2.25" />
      <path d="M4.5 4.5l1.6 1.6" />
      <path d="M17.9 17.9l1.6 1.6" />
      <path d="M2.5 12h2.25" />
      <path d="M19.25 12h2.25" />
      <path d="M4.5 19.5l1.6-1.6" />
      <path d="M17.9 6.1l1.6-1.6" />
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.65 6.65 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export function ChevronRightIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

export function FlameIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M12 2.5s5 4.2 5 9.2a5 5 0 1 1-10 0c0-1.3.6-2.2 1.2-3 .1 1.2.9 1.8 1.5 1.8-.4-2.6.7-4.9 2.3-6Z" />
    </svg>
  )
}

export function LeafIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M5 19c9 0 14-5 14-14 0 0-9.5-1-13 4.5S5 19 5 19Z" />
      <path d="M5 19c0-4 2-8 6-10.5" />
    </svg>
  )
}

export function TrendUpIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M4 16l5.5-6 4 3.5L20 6" />
      <path d="M15 6h5v5" />
    </svg>
  )
}

export function TrendDownIcon(props) {
  return (
    <svg {...base(props)} className={props.className}>
      <path d="M4 8l5.5 6 4-3.5L20 18" />
      <path d="M15 18h5v-5" />
    </svg>
  )
}
