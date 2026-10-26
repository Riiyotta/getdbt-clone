import { useEffect, useRef, useState } from 'react'
import useMedia from '../../../hooks/useMedia'
import { ArrowLeft, ArrowRight, ChevronDown, PlusIcon } from '../../icons'
import SiteLink from '../../SiteLink'
import { Btn, Img } from '../../sections/parts'
import { Runs } from '../pricing/parts'

// T15 (specs/T14-T17.md T15): dark-theme community program page. The dark surface is #030711
// (ink-950); accent #fe6703 (orange-600). Member and story cards are square-cornered.

// ---------------------------------------------------------------- T15-0 hero.champions-dark
// Scroll-linked scale: scale = 1 + 0.45 * easeOutQuad(min(scrollY / 700, 1)), written per frame to
// the outlines' inner wrapper and the photo wrapper (no CSS transition). Off under reduced motion.
function useScrollScale(refs) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let raf = 0
    const apply = () => {
      raf = 0
      const t = Math.min(window.scrollY / 700, 1)
      const s = 1 + 0.45 * (1 - (1 - t) * (1 - t))
      refs.forEach((r) => {
        if (r.current) r.current.style.transform = `scale(${s})`
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [refs])
}

// 5 concentric chamfered octagons (original geometry), centred behind the photo.
const oct = (cx, cy, hw, hh, c) =>
  `M${cx - hw + c} ${cy - hh}H${cx + hw - c}L${cx + hw} ${cy - hh + c}V${cy + hh - c}L${cx + hw - c} ${cy + hh}H${cx - hw + c}L${cx - hw} ${cy + hh - c}V${cy - hh + c}Z`
const OUTLINES = [
  [360, 330, 90],
  [450, 420, 115],
  [540, 510, 140],
  [630, 600, 165],
  [740, 700, 195],
]

const OCTAGON = 'polygon(60px 0, calc(100% - 60px) 0, 100% 60px, 100% calc(100% - 60px), calc(100% - 60px) 100%, 60px 100%, 0 calc(100% - 60px), 0 60px)'

export function ChampHero({ wordmark, title, primary, tertiary, photo }) {
  const outlines = useRef(null)
  const pic = useRef(null)
  const [refs] = useState(() => [outlines, pic])
  useScrollScale(refs)
  return (
    <header className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1440px]" style={{ transform: 'translateY(86.28px)' }} aria-hidden="true">
        <div ref={outlines} className="will-change-transform">
          <svg width="1440" height="1438" viewBox="0 0 1440 1438" fill="none" className="mx-auto block h-auto w-full max-w-[1440px]">
            {OUTLINES.map(([hw, hh, c]) => (
              <path key={hw} d={oct(720, 760, hw, hh, c)} stroke="#FE6703" strokeWidth="1" opacity=".7" />
            ))}
          </svg>
        </div>
      </div>
      <div className="container relative z-10">
        <div className="flex flex-col items-center pt-14 text-center md:pt-28 lg:pt-20">
          <Img a={wordmark} eager className="mb-8 h-auto max-w-full" />
          <h1 className="heading-1 mb-8 max-w-3xl text-white lg:text-h1-xl">{title}</h1>
          <div className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row">
            <Btn cta={primary} variant="primary dark" />
            <Btn cta={tertiary} variant="tertiary dark" />
          </div>
          <div className="mx-auto mt-12 hidden w-full max-w-[590px] lg:block" style={{ transform: 'translateY(104.29px)' }}>
            <div ref={pic} className="will-change-transform">
              <Img a={photo} eager className="block h-[521px] w-[590px] object-cover" style={{ clipPath: OCTAGON }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------- T15-1 community.about-band
export function ChampAbout({ title, body, primary, tertiary }) {
  return (
    <section className="relative z-5 bg-ink-950 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="heading-2 text-white">{title}</h2>
          <div className="flex flex-col gap-8">
            <p className="text-base text-white [&_a]:text-white [&_a]:underline [&_a:hover]:no-underline">
              <Runs runs={body} underline />
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              <Btn cta={primary} variant="primary dark" />
              <Btn cta={tertiary} variant="tertiary dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T15-2 community.member-grid
function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5L11.5 4.5M5.5 4.5H11.5V10.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
// chamfered portrait: diagonal cuts top-left and bottom-right
const PORTRAIT = 'polygon(48px 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%, 0 48px)'

export function ChampMembers({ id, title, body, primary, secondary, members, cta }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="flex flex-col gap-6">
          <h2 className="heading-2 text-ink-950">{title}</h2>
          <p className="text-base text-ink-950">{body}</p>
          <div className="flex flex-col gap-3 md:flex-row">
            <Btn cta={primary} />
            <Btn cta={secondary} variant="secondary" />
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div
              key={m.name}
              className="flex flex-col overflow-hidden border border-ink-200 bg-white p-10 shadow-[0_8px_16px_rgba(16,24,40,0),0_16px_32px_rgba(16,24,40,0)] transition-[transform,box-shadow] duration-300 ease-standard hover:-translate-y-2 hover:shadow-[0_8px_16px_rgba(16,24,40,.08),0_16px_32px_rgba(16,24,40,.06)]"
            >
              <div className="relative aspect-[318/194] w-full">
                <Img a={m.photo} className="absolute inset-0 h-full w-full object-cover object-top" style={{ clipPath: PORTRAIT }} />
              </div>
              <div className="flex flex-1 flex-col gap-4 pt-10">
                <h3 className="heading-3 text-ink-950">{m.name}</h3>
                <div className="flex flex-col gap-2">
                  <p className="text-base text-ink-950">{m.role}</p>
                  <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-base text-orange-600 hover:underline">
                    {m.link}
                    <ArrowUpRight />
                  </a>
                </div>
                <div className="mt-auto pt-4">
                  <SiteLink to="#" className="button tertiary medium w-full justify-between px-0 hover:!bg-transparent">
                    {cta}
                    <PlusIcon />
                  </SiteLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T15-3 / T15-6 icon items
// Same item shape on light (5 columns, 32 icons) and dark (4 columns, 28 icons) bands.
export function ChampItems({ eyebrow, title, body, items, cols = 5, dark = false }) {
  return (
    <section className={`relative z-5 py-12 md:py-16 ${dark ? 'bg-ink-950 text-white' : 'bg-white text-ink-950'}`}>
      <div className="container">
        <div className="mb-20 flex flex-col gap-3">
          {eyebrow && <p className="font-mono text-base font-normal text-white">{eyebrow}</p>}
          <h2 className="heading-2">{title}</h2>
          {body && <p className="text-base">{body}</p>}
        </div>
        <div className={`grid grid-cols-1 gap-y-20 lg:gap-6 ${cols === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
          {items.map((it) => (
            <div key={it.title} className="flex flex-col gap-3">
              <Img a={it.icon} className={`mb-10 ${dark ? 'size-7' : 'size-8'}`} />
              <h3 className="heading-4">{it.title}</h3>
              <p className="text-base">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T15-4 community.dark-quote
// 9 stepped orange bars (703x515), left ends forming a diagonal; hidden below 1024.
function Stripes() {
  return (
    <svg width="703" height="515" viewBox="0 0 703 515" fill="none" aria-hidden="true" className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
      {Array.from({ length: 9 }, (_, i) => {
        const y = i * 60.9
        const x = 553 - i * 61.5
        return <path key={i} d={`M${x + 30} ${y}H703V${y + 28}H${x}Z`} fill="#FE6703" />
      })}
    </svg>
  )
}

export function ChampQuote({ quote, name, role, avatar }) {
  const hl = 'rounded-md bg-ink-950 px-2 py-1 xl:bg-transparent xl:p-0'
  return (
    <section className="relative z-5 overflow-hidden bg-ink-950">
      <Stripes />
      <div className="container">
        <div className="relative z-10 px-8 py-12 md:px-16 md:py-[72px] lg:w-2/3">
          <blockquote className="mb-8 font-sans text-3xl font-medium text-white md:text-4xl lg:text-5xl xl:leading-[1.2]">
            <span className="rounded-md bg-ink-950 box-decoration-clone xl:bg-transparent">{quote}</span>
          </blockquote>
          <div className="flex items-center gap-3">
            <span role="img" aria-label="" className="size-10 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${avatar.src})` }} />
            <div className="flex flex-col items-start text-sm text-white">
              <span className={`font-semibold ${hl}`}>{name}</span>
              <span className={hl}>{role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T15-5 story slider
// 12 slides, no loop; 3 per page at >=1280 (2 at >=768, 1 below), gap 24, right padding 64 / 48 / 32
// so the next card peeks in; one page per click, 400ms cubic-bezier(.25,1,.5,1); draggable. Both
// arrows stay enabled (they clamp at the ends), as on the original.
export function ChampStories({ eyebrow, title, body, cards }) {
  const xl = useMedia('(min-width: 1280px)')
  const md = useMedia('(min-width: 768px)')
  const per = xl ? 3 : md ? 2 : 1
  const pad = xl ? 64 : md ? 48 : 32
  const max = cards.length - per
  const [index, setIndex] = useState(0)
  const [dx, setDx] = useState(0)
  const [drag, setDrag] = useState(false)
  const start = useRef(0)
  useEffect(() => setIndex((i) => Math.min(i, max)), [max])
  const go = (i) => setIndex(Math.max(0, Math.min(max, i)))
  const end = () => {
    if (!drag) return
    if (dx < -50) go(index + per)
    else if (dx > 50) go(index - per)
    setDrag(false)
    setDx(0)
  }
  const slideW = `((100% - ${pad + (per - 1) * 24}px) / ${per})`
  return (
    <section className="section overflow-hidden">
      <div className="container">
        <p className="mb-4 font-mono text-base font-medium text-ink-950">{eyebrow}</p>
        <h2 className="heading-2 mb-4 text-ink-950">{title}</h2>
        <p className="text-base text-ink-800">{body}</p>
        <div className="mt-10 overflow-hidden">
          <ul
            className={`flex touch-pan-y select-none ${drag ? '' : 'transition-transform duration-400 ease-slider'}`}
            style={{ transform: `translateX(calc(${-index} * (${slideW} + 24px) + ${dx}px))` }}
            onPointerDown={(e) => {
              if (e.button !== 0 || e.target.closest('a,button')) return
              start.current = e.clientX
              setDrag(true)
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => drag && setDx(e.clientX - start.current)}
            onPointerUp={end}
            onPointerCancel={end}
          >
            {cards.map((c, i) => (
              <li key={c.title} className="mr-6 shrink-0" style={{ width: `calc${slideW}` }} aria-hidden={i < index || i >= index + per}>
                <div className="flex h-full flex-col border border-ink-200 bg-white">
                  <div className="p-4 pb-0">
                    <Img a={c.img} draggable="false" className="aspect-video w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
                    <p className="mb-3 font-mono text-base text-ink-800">{c.label}</p>
                    <h3 className="mb-3 font-sans text-[24px] font-semibold leading-[33px] text-ink-950">{c.title}</h3>
                    <p className="mb-2 text-base text-ink-800">{c.by}</p>
                    <SiteLink to={c.cta.to} className="button tertiary medium mt-auto w-full justify-between px-0">
                      {c.cta.label}
                      <ChevronDown size={24} className="-rotate-90" />
                    </SiteLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex justify-end gap-2">
          {[
            ['Previous stories', -per, ArrowLeft],
            ['Next stories', per, ArrowRight],
          ].map(([label, d, Icon]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => go(index + d)}
              className="flex size-10 items-center justify-center rounded-xl p-2 text-ink-950 transition-colors duration-150 hover:bg-ink-950/5"
            >
              <Icon width={24} height={24} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T15-7 cta.champions-closing
function CheckOutline() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12.5" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.5L11 15.5L16 9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ChampClosing({ eyebrow, title, body, cta, checks }) {
  return (
    <section className="relative z-5 bg-ink-950">
      <div className="flex flex-col lg:flex-row">
        <div className="bg-orange-600 lg:w-1/2">
          <div className="px-10 py-14 lg:ml-auto lg:max-w-[720px]">
            <p className="mb-4 font-mono text-base font-medium text-ink-950">{eyebrow}</p>
            <h2 className="heading-2 mb-4 text-ink-950">{title}</h2>
            <p className="text-base text-ink-950">{body}</p>
            <Btn cta={cta} variant="primary dark" className="mt-12" />
          </div>
        </div>
        <div className="relative flex flex-col justify-center overflow-hidden bg-white px-10 py-14 lg:w-1/2 lg:px-16">
          <svg width="233" height="225" viewBox="0 0 233 225" aria-hidden="true" className="absolute left-0 top-0 hidden lg:block">
            <path d="M0 0H233L0 225Z" fill="#FE6703" />
          </svg>
          <ul className="relative z-10 space-y-6 lg:pl-36">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-3 text-ink-950">
                <CheckOutline />
                <span className="text-base font-semibold leading-[22px]">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
