import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import SiteLink from '../../SiteLink'

// T14 check icon (shared by plan cards and add-ons): 24 box, r10 circle stroked #030711 1.5, tick
// M7.5 12 L10.5 15 L16.5 9 stroked #fe6703 1.5 with a square linecap, no fill.
export function PlanCheck({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="10" stroke="#030711" strokeWidth="1.5" />
      <path d="M7.5 12L10.5 15L16.5 9" stroke="#FE6703" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

// Matrix value check: 21x21 filled #632ff5 circle with the tick knocked out (evenodd).
export function MatrixCheck() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" aria-label="Included" role="img" className="mx-auto block">
      <path
        fill="#632ff5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 21C16.299 21 21 16.299 21 10.5S16.299 0 10.5 0 0 4.701 0 10.5 4.701 21 10.5 21Zm4.53-12.97a.75.75 0 0 0-1.06-1.06L9.25 11.69 7.03 9.47a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l5.25-5.25Z"
      />
    </svg>
  )
}

// Inline runs: strings and { a, to } links (#632ff5). `underline` = .link-styles.
export function Runs({ runs, underline = false }) {
  if (typeof runs === 'string') return runs
  return runs.map((r, i) =>
    typeof r === 'string' ? (
      <span key={i}>{r}</span>
    ) : (
      <SiteLink key={i} to={r.to} className={underline ? 'link-styles' : 'text-purple-600 hover:underline'}>
        {r.a}
      </SiteLink>
    ),
  )
}

// Info tooltip (T14-2): click toggles a dark panel (bg #030711, white 14/20, r8, p 8 / 12 at lg,
// w 200 / 300 at lg) anchored 8px above the icon and centred on it. Opens and closes instantly; an
// outside click closes it, pointer-leave does not. The panel is portalled to <body> with page
// coordinates so the table's overflow-x wrapper and the mobile slider track cannot clip it; it is
// clamped 8px inside the viewport horizontally.
export function InfoTip({ text, label }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(null)
  const btn = useRef(null)
  const panel = useRef(null)

  useLayoutEffect(() => {
    if (!open) return undefined
    const place = () => {
      const b = btn.current.getBoundingClientRect()
      const p = panel.current
      const w = p.offsetWidth
      const h = p.offsetHeight
      let left = b.left + b.width / 2 - w / 2
      left = Math.max(8, Math.min(left, document.documentElement.clientWidth - w - 8))
      setPos({ left: left + window.scrollX, top: b.top + window.scrollY - 8 - h })
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (btn.current?.contains(e.target) || panel.current?.contains(e.target)) return
      setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-label={`About ${label}`}
        onClick={() => {
          setPos(null)
          setOpen((o) => !o)
        }}
        className="ml-1 inline-flex align-[-2px] text-ink-950 hover:text-purple-600"
      >
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8.5 7.2V11.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8.5" cy="5" r=".8" fill="currentColor" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            ref={panel}
            role="tooltip"
            className="absolute z-10 w-[200px] max-w-max rounded-lg bg-ink-950 p-2 text-sm font-normal text-white lg:w-[300px] lg:p-3"
            style={pos ? { left: pos.left, top: pos.top } : { left: 0, top: 0, visibility: 'hidden' }}
          >
            {text}
          </div>,
          document.body,
        )}
    </>
  )
}
