// Generic inline UI icons (ASSET_MANIFEST "Inline SVG icons"). All use currentColor.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function ChevronDown({ className = '', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M4 6l4 4 4-4" {...stroke} />
    </svg>
  )
}

// 24px chevron-down rotated -90deg (reads as a right chevron)
export function ChevronRight24({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={`-rotate-90 ${className}`} aria-hidden="true">
      <path d="M6 9l6 6 6-6" {...stroke} />
    </svg>
  )
}

export function ChevronRight16({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M6 4l4 4-4 4" {...stroke} />
    </svg>
  )
}

// stroke 1.5, square caps, viewBox 0 0 21 21
export function ArrowLeft({ className = '', width = 20, height = 21 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 21 21" className={className} aria-hidden="true">
      <path d="M17 10.5H4.5M9.5 5.5l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export function ArrowRight({ className = '', width = 20, height = 21 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 21 21" className={className} aria-hidden="true">
      <path d="M4 10.5h12.5M11.5 5.5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export function SearchIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" {...stroke} />
      <path d="M16.5 16.5L21 21" {...stroke} />
    </svg>
  )
}

export function UserIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" {...stroke} />
      <path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" {...stroke} />
    </svg>
  )
}

export function MenuIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" {...stroke} />
    </svg>
  )
}

export function CloseIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" {...stroke} />
    </svg>
  )
}

export function LoginIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M14 4h5v16h-5M3 12h11M10 8l4 4-4 4" {...stroke} />
    </svg>
  )
}

export function AddUserIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="10" cy="8" r="4" {...stroke} />
      <path d="M3 20.5c.8-3.6 3.6-5.5 7-5.5 1.6 0 3 .4 4.2 1.2M18 13v7M14.5 16.5h7" {...stroke} />
    </svg>
  )
}

export function QuoteIcon({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M3 18v-5.5C3 8.5 5 6 9 5.5v2.6C7 8.6 6.2 9.8 6.2 12H10v6H3zm11 0v-5.5c0-4 2-6.5 6-7v2.6c-2 .5-2.8 1.7-2.8 3.9H21v6h-7z"
        fill="currentColor"
      />
    </svg>
  )
}

export function GlobeIcon({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" {...stroke} />
      <path d="M1.75 8h12.5M8 1.75c1.8 1.8 2.6 3.9 2.6 6.25S9.8 12.45 8 14.25C6.2 12.45 5.4 10.35 5.4 8S6.2 3.55 8 1.75z" {...stroke} />
    </svg>
  )
}

// Footer social icons: simple neutral geometric marks, 24x24
export function SocialIcon({ index }) {
  const shapes = [
    <circle key="a" cx="12" cy="12" r="9" {...stroke} />,
    <rect key="b" x="3.5" y="3.5" width="17" height="17" rx="3" {...stroke} />,
    <path key="c" d="M3 7.5C3 6 4 5 5.5 5h13C20 5 21 6 21 7.5v9c0 1.5-1 2.5-2.5 2.5h-13C4 19 3 18 3 16.5zM10 9v6l5-3z" {...stroke} />,
    <g key="d">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
    </g>,
    <path key="e" d="M4 4l16 16M20 4L4 20" {...stroke} />,
    <path key="f" d="M12 11C10 7 7 4.5 4 4.5c0 4 1.5 8 8 8.5 6.5-.5 8-4.5 8-8.5-3 0-6 2.5-8 6.5z" {...stroke} />,
    <g key="g">
      <circle cx="6" cy="18" r="1.5" fill="currentColor" />
      <path d="M4.5 11a8.5 8.5 0 0 1 8.5 8.5M4.5 4.5a15 15 0 0 1 15 15" {...stroke} />
    </g>,
  ]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      {shapes[index % shapes.length]}
    </svg>
  )
}

// ---- T1-T4 additions ----

// 22x18 quote mark in a 24px box (customer tabs)
export function QuoteSmall({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M1 21v-6.6C1 9.6 3.4 6.6 8.2 6v3.1c-2.4.6-3.4 2-3.4 4.7h4.6V21H1zm13.2 0v-6.6c0-4.8 2.4-7.8 7.2-8.4v3.1c-2.4.6-3.4 2-3.4 4.7H23V21h-8.8z"
        fill="currentColor"
      />
    </svg>
  )
}

// 24x24 circled check (checklists, "after" column)
export function CheckCircle({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" {...stroke} />
      <path d="M8 12.3l2.7 2.7L16 9.6" {...stroke} />
    </svg>
  )
}

// 24x24 circled x ("before" column)
export function XCircle({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" {...stroke} />
      <path d="M9 9l6 6M15 9l-6 6" {...stroke} />
    </svg>
  )
}

// 22x24 sparkle-in-shield glyph (build-trust 5-item grid)
export function ShieldCheck({ className = '' }) {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" className={className} aria-hidden="true">
      <path d="M11 1.75l8.25 3.1v6.4c0 5.2-3.5 9.2-8.25 11-4.75-1.8-8.25-5.8-8.25-11v-6.4z" {...stroke} />
      <path d="M7.2 11.8l2.6 2.6 5-5" {...stroke} />
    </svg>
  )
}

// video poster play button
export function PlayIcon({ className = '' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M9 5.5v17l14-8.5z" fill="currentColor" />
    </svg>
  )
}

// ---------------------------------------------------------------- T12-T13 (specs/T12-T13.md F)

// job location pin, 20x21
export function PinIcon({ className = '' }) {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" className={className} aria-hidden="true">
      <path d="M10 18.5s-5.5-5-5.5-9.25a5.5 5.5 0 0 1 11 0C15.5 13.5 10 18.5 10 18.5z" {...stroke} />
      <circle cx="10" cy="9.25" r="2" {...stroke} />
    </svg>
  )
}

// FAQ plus / minus glyphs, 18x18
export function PlusIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path d="M9 3v12M3 9h12" {...stroke} />
    </svg>
  )
}
export function MinusIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path d="M3 9h12" {...stroke} />
    </svg>
  )
}

// plain check mark; size 24 (CTA checklist aside, 24x25 box), 16 (journey lists)
export function CheckMark({ className = '', size = 24, style }) {
  return (
    <svg width={size} height={size === 24 ? 25 : size} viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" {...stroke} strokeWidth={2} />
    </svg>
  )
}

// 16px x (journey "missing" items)
export function XMark({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" {...stroke} strokeWidth={2} />
    </svg>
  )
}

// 21x21 filled check (comparison tables): violet circle, white tick
export function CheckFilled({ className = '' }) {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="10.5" fill="currentColor" />
      <path d="M6.2 10.8l2.9 2.9 5.7-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 19x19 info glyph (comparison table notes)
export function InfoIcon({ className = '' }) {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" className={className} aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="8" {...stroke} />
      <path d="M9.5 8.75v4.5" {...stroke} />
      <circle cx="9.5" cy="6" r=".9" fill="currentColor" />
    </svg>
  )
}

// 15x15 copy glyph (install command)
export function CopyIcon({ className = '' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" className={className} aria-hidden="true">
      <rect x="4.75" y="4.75" width="8.5" height="8.5" rx="1.5" {...stroke} />
      <path d="M10.25 4.75v-2a1.25 1.25 0 0 0-1.25-1.25H3A1.25 1.25 0 0 0 1.75 2.75V9A1.25 1.25 0 0 0 3 10.25h1.75" {...stroke} />
    </svg>
  )
}

// 80x80 play glyph for the framed hero poster (56 below 768)
export function PlayCircle({ className = '' }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="40" fill="currentColor" />
      <path d="M33 26v28l22-14z" fill="white" />
    </svg>
  )
}
