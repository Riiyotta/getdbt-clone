import { useEffect, useRef, useState } from 'react'
import SiteLink from '../SiteLink'
import { Btn } from '../sections/parts'
import { ChevronDown, SocialIcon } from '../icons'
import { slug } from './Inline'

// article.sticky-rail (specs/T5-T8.md A-18).

// Reading progress bar (blog posts): fixed 6px track at the top, #632ff5 fill whose width is the
// scroll fraction of the page. (The original's 150ms width transition is left to the animation pass.)
export function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="fixed left-0 top-0 z-50 h-[6px] w-full" aria-hidden="true">
      <div className="h-full bg-purple-600" style={{ width: `${pct}%` }} />
    </div>
  )
}

// Rail promo block: heading-3 (!mb-4), 18/28 600 paragraph, one primary large button
export function RailPromo({ title, body, cta }) {
  return (
    <div className="mb-12 lg:mb-16 lg:mt-12 lg:last-of-type:mb-30">
      <h3 className="heading-3 !mb-4 text-ink-950">{title}</h3>
      <p className="text-lg font-semibold text-ink-950">{body}</p>
      <div className="mt-6 flex gap-2">
        <Btn cta={cta} variant="primary" size="large" />
      </div>
    </div>
  )
}

function LinkGlyph() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" aria-hidden="true">
      <path
        d="M8.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-.8.8M11.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l.8-.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Share bar: copy-link secondary medium button + two neutral share icon links (#6a7282, hover
// #364153). Sticks to the viewport bottom at >=1024; static and left-aligned below.
// Shown in its visible state; the original's hidden-until-first-scroll fade (opacity 0 /
// translateY 20px -> visible, 200ms ease-in) is left to the animation pass.
export function ShareBar({ label = 'Copy post link', copied = 'Link copied' }) {
  const [done, setDone] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setDone(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDone(false), 2000)
  }
  return (
    <div className="bg-white lg:sticky lg:bottom-0 lg:pb-8 lg:pt-4">
      <div className="flex items-center justify-start gap-3 lg:justify-center">
        <button type="button" onClick={copy} className="button secondary medium !w-auto">
          <LinkGlyph />
          <span aria-live="polite">{done ? copied : label}</span>
        </button>
        {[
          ['Share to a social feed', 4],
          ['Share with your professional network', 1],
        ].map(([name, icon]) => (
          <SiteLink key={name} to="#" aria-label={name} className="px-2 py-4 text-ink-500 transition-colors duration-150 ease-standard hover:text-ink-700">
            <SocialIcon index={icon} />
          </SiteLink>
        ))}
      </div>
    </div>
  )
}

// Blog-post rail (A-18a): right column (3/12, 80 gap) holding the sticky promo stack (top 0) and
// the share bar (sticky bottom 0). Below 1024 it drops under the prose.
export function BlogRail({ promos }) {
  return (
    <aside className="mt-8 flex flex-col justify-between lg:mt-0 lg:w-3/12">
      <div className="top-0 lg:sticky">
        {promos.map((p) => (
          <RailPromo key={p.title} {...p} />
        ))}
      </div>
      <ShareBar />
    </aside>
  )
}

// ---------------------------------------------------------------- TOC (A-18b)
const ZONE = 180 // a heading is current once its top is within 180px of the viewport top
const LAND = 96 // click target: heading 96px below the viewport top (scroll-margin-top 96)
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function smoothScrollTo(y, ms = 1500) {
  const start = window.scrollY
  const dist = y - start
  const t0 = performance.now()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || Math.abs(dist) < 2) {
    window.scrollTo(0, y)
    return
  }
  const step = (now) => {
    const t = Math.min(1, (now - t0) / ms)
    window.scrollTo(0, start + dist * ease(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Scroll-spy: the active link is the last heading whose top has passed the zone line; none before
// the first. Recomputed on every scroll frame, so programmatic jumps always resolve correctly.
function useActiveHeading(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      let cur = null
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= ZONE) cur = id
      })
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ids])
  return active
}

function TocList({ items, active, onPick, mobile = false }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={(e) => onPick(e, it.id)}
            aria-current={active === it.id ? 'location' : undefined}
            className={`relative block text-ink-950 transition-colors duration-150 hover:underline ${mobile ? 'text-base' : 'text-sm'} ${
              active === it.id && !mobile ? 'before:absolute before:-left-6 before:top-0 before:h-full before:w-0.5 before:bg-ink-950' : ''
            }`}
          >
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

// Guide/report rail: sticky top 32. TOC (>=1024) or a dropdown (<1024), then one promo.
export function GuideRail({ title, headings, promo }) {
  const items = useRef(headings.map((h) => ({ id: slug(h), label: h }))).current
  const ids = useRef(items.map((i) => i.id)).current
  const active = useActiveHeading(ids)
  const [open, setOpen] = useState(false)
  const onPick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    setOpen(false)
    smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - LAND)
    window.history.replaceState(window.history.state, '', `#${id}`)
  }
  return (
    <div className="sticky top-8">
      <div className="relative lg:my-12">
        <nav aria-label={title} className="hidden max-w-[300px] bg-white lg:mb-20 lg:block">
          <h5 className="heading-5 mb-6 text-ink-950">{title}</h5>
          <TocList items={items} active={active} onPick={onPick} />
        </nav>
        <div className="sticky top-2 lg:hidden">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex w-full justify-between rounded-2xl border border-ink-200 bg-white p-4 text-left"
          >
            <h5 className="heading-5 text-ink-950">{title}</h5>
            <ChevronDown size={20} className={`shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <nav aria-label={title} className="absolute top-[45px] z-50 w-full rounded-2xl rounded-t-none border border-t-0 border-ink-200 bg-white p-4">
              <TocList items={items} active={active} onPick={onPick} mobile />
            </nav>
          )}
        </div>
      </div>
      {promo && (
        <div className="hidden lg:block">
          <RailPromo {...promo} />
        </div>
      )}
    </div>
  )
}
