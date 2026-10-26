import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { eventChrome as E } from '../../content/pages/t16'
import SiteLink from '../SiteLink'

// Summit-only fonts (specs/T14-T17.md T16-T): Schibsted Grotesk 500, Be Vietnam Pro 800, Inter, plus
// IBM Plex Mono 600/700 for the nav and footer. Loaded only while the event chrome is mounted.
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500&family=Schibsted+Grotesk:wght@500&display=swap'
export function useSummitFonts() {
  useEffect(() => {
    if (document.querySelector('link[data-summit-fonts]')) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = FONT_HREF
    l.dataset.summitFonts = ''
    document.head.appendChild(l)
  }, [])
}

function Burger({ open }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {open ? (
        <path d="M11 11L29 29M29 11L11 29" stroke="#fff" strokeWidth="2.5" strokeLinecap="square" />
      ) : (
        <path d="M9 13H31M9 20H31M9 27H31" stroke="#fff" strokeWidth="2.5" strokeLinecap="square" />
      )}
    </svg>
  )
}

const CTA = 'summit-btn bg-orange-600 text-[20px] leading-[22px] text-black transition-none hover:bg-white'

// T16-A shell.event-subnav. >=1024: 80 tall, sticky at top 0 (no visual change on scroll); white
// panel from the logo's right edge; transparent under the logo notch so the hero shows through.
// <1024: fixed bar (height = logo-h) with an in-flow spacer; black hamburger; instant dropdown.
export function EventNav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const links = E.links.flat()
  return (
    <header className="summit-nav relative font-mono lg:sticky lg:top-0 lg:z-40">
      {/* desktop */}
      <div className="relative hidden h-20 lg:flex">
        <div className="absolute right-0 top-0 h-20 bg-white" style={{ left: 'calc(var(--summit-logo-w) - 5px)' }} />
        <SiteLink to={E.home} aria-label={E.logo.alt} className="absolute left-0 top-0 z-10">
          <img src={E.logo.src} alt="" width={666} height={108} style={{ width: 'var(--summit-logo-w)', height: 'var(--summit-logo-h)' }} className="block" />
        </SiteLink>
        <div className="relative flex w-full items-stretch gap-x-6" style={{ paddingLeft: 'calc(var(--summit-logo-w) + 24px)' }}>
          {/* hidden date/location column on the original: kept as an empty 154px spacer (>=1280) */}
          <div className="invisible hidden w-[154px] shrink-0 xl:block" aria-hidden="true" />
          <nav className="flex flex-1 items-center justify-around gap-x-10">
            {E.links.map((col, i) => (
              <div key={i} className="flex flex-col">
                {col.map((l) => (
                  <SiteLink key={l.label} to={l.to} className="whitespace-nowrap text-[14px] font-semibold leading-[22px] text-black hover:underline xl:text-base xl:leading-[22px]">
                    {l.label}
                  </SiteLink>
                ))}
              </div>
            ))}
          </nav>
          <SiteLink to={E.cta.to} className={`${CTA} ml-2 flex shrink-0 items-center px-6`}>
            {E.cta.label}
          </SiteLink>
        </div>
      </div>

      {/* mobile / tablet */}
      <div className="lg:hidden">
        <div className="fixed inset-x-0 top-0 z-40 flex" style={{ height: 'var(--summit-logo-h)' }}>
          <SiteLink to={E.home} aria-label={E.logo.alt} className="block shrink-0">
            <img src={E.logo.src} alt="" width={666} height={108} style={{ width: 'var(--summit-logo-w)', height: 'var(--summit-logo-h)' }} className="block" />
          </SiteLink>
          <div className="flex-1 bg-white" />
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative z-40 flex h-full w-16 shrink-0 items-center justify-center bg-black"
          >
            <span className="sr-only">{open ? E.closeMenu : E.openMenu}</span>
            <Burger open={open} />
          </button>
          {open && (
            <div className="absolute right-0 top-full z-40 flex w-[260px] flex-col gap-2 bg-black px-6 pb-6 pt-4">
              {links.map((l) => (
                <SiteLink key={l.label} to={l.to} className="text-base font-semibold leading-6 text-white hover:underline" onClick={() => setOpen(false)}>
                  {l.label}
                </SiteLink>
              ))}
              <SiteLink to={E.cta.to} className={`${CTA} mt-2 inline-flex w-[212px] justify-center px-4 py-3`}>
                {E.cta.label}
              </SiteLink>
            </div>
          )}
        </div>
        {open && <button type="button" aria-label={E.closeMenu} tabIndex={-1} className="fixed inset-0 z-30 cursor-default bg-transparent" onClick={() => setOpen(false)} />}
        <div style={{ height: 'var(--summit-logo-h)' }} aria-hidden="true" />
      </div>
    </header>
  )
}

// T16-F shell.event-footer: giant wordmark with the link block overlaid at >=768 (shifted 160px
// right as on the original, but clipped with overflow-x: clip so the page never scrolls sideways),
// then the pixel-tile strip and the citron bar.
export function EventFooter() {
  return (
    <footer className="summit-footer overflow-x-clip bg-black font-mono">
      <section className="summit-container-wide relative text-white">
        <div className="px-1.5 pt-4 md:px-8 md:pb-12 lg:-translate-y-10 lg:pb-0 xl:translate-y-0">
          <img src={E.wordmark.src} alt={E.wordmark.alt} width={1662} height={528} className="block aspect-[1662/528] h-auto w-full" loading="lazy" />
        </div>
        <div className="flex px-4 pb-8 pt-6 md:absolute md:inset-0 md:translate-x-40 md:translate-y-6 md:items-end md:justify-center md:p-0 md:pb-10">
          <div className="grid w-full grid-cols-1 gap-y-2 md:max-w-[420px] md:grid-cols-2">
            {E.footerLinks.map((col, i) => (
              <ul key={i} className="flex flex-col gap-y-2">
                {col.map((l) => (
                  <li key={l.label} className="text-sm">
                    {l.text}
                    <SiteLink to={l.to} className="text-white hover:underline">
                      {l.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 grid-rows-[48px_auto] md:grid-cols-[140px_1fr] md:grid-rows-[56px_auto]">
        <div className="summit-tile hidden md:row-span-2 md:block" aria-hidden="true" />
        <div className="summit-strip flex" aria-hidden="true">
          <div className="summit-dither w-[22%]" />
          <div className="summit-heat flex-1" />
          <div className="summit-check w-[38%]" />
        </div>
        <div className="flex bg-[#D8FF33] text-black">
          <div className="hidden size-[52px] shrink-0 items-center justify-center bg-[#6B9AFF] md:flex" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <rect x="2" y="2" width="11" height="11" rx="2.5" fill="#000" />
              <rect x="15" y="15" width="11" height="11" rx="2.5" fill="#000" />
              <circle cx="20.5" cy="7.5" r="5.5" fill="#fff" />
              <circle cx="7.5" cy="20.5" r="5.5" fill="#fff" />
            </svg>
          </div>
          <div className="flex flex-1 flex-col px-3 py-4 text-[12px] font-medium leading-4 md:flex-row md:justify-between md:text-sm">
            <p>{E.tagline}</p>
            <p>{E.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
