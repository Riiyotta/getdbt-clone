import SiteLink from '../../SiteLink'
import { Img } from '../../sections/parts'

// T16 event microsite sections (specs/T14-T17.md T16). Fonts: .summit-display (Schibsted Grotesk
// 500, stands in for bugrino), .summit-btn (Be Vietnam Pro 800, for area-normal), Inter body (set
// on the .summit root). Radius 0 everywhere; every hover is an instant colour swap (no transition).

const BTN = 'summit-btn inline-flex items-center justify-center text-center transition-none'

// ---------------------------------------------------------------- T16-0 hero.event
export function EventHero({ title, lead, cta, portraits }) {
  return (
    <section className="summit-hero-tuck relative overflow-hidden bg-white">
      {/* >=1024: two side portraits, absolute, 22.51% wide (max 389) */}
      {portraits.map((p, i) => (
        <div key={i} className={`absolute inset-y-0 hidden w-[22.51%] max-w-[389px] lg:block ${i ? 'right-0' : 'left-0'}`}>
          <Img a={p} eager className="h-full w-full object-cover object-bottom" />
        </div>
      ))}
      <div className="px-6 py-12 md:py-14 lg:px-[calc(22.51%+24px)]">
        <div className="mx-auto flex max-w-[688px] flex-col items-center gap-8 text-center md:gap-12 xl:max-w-[780px]">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <h1 className="summit-display text-pretty text-[36px] leading-none text-black md:text-[64px] xl:text-[72px] 2xl:text-[88px]">{title}</h1>
            <p className="max-w-[583px] text-[18px] leading-[25.2px] text-black md:text-[24px] md:leading-[33.6px]">{lead}</p>
          </div>
          <SiteLink
            to={cta.to}
            className={`${BTN} bg-orange-600 px-16 py-5 md:min-h-[94px] text-[18px] leading-[28px] text-black hover:bg-white md:text-[24px] md:leading-[32px]`}
          >
            {cta.label}
          </SiteLink>
        </div>
      </div>
      {/* below 1024 the portraits sit under the content as two side-by-side tiles */}
      <div className="mx-auto flex max-w-[600px] lg:hidden">
        {portraits.map((p, i) => (
          <div key={i} className="aspect-[300/477] w-1/2">
            <Img a={p} className="h-full w-full object-cover object-bottom" />
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T16-1 event.photo-gallery
// Infinite marquee: 2 identical sets of 14 photos; translateX(0 -> one set + one gap), 75.83s
// linear infinite, never pauses; off under reduced motion (oneoffs.css).
export function EventMarquee({ photos }) {
  const set = (dup) => (
    <div className="flex shrink-0 gap-3 md:gap-5" aria-hidden={dup || undefined}>
      {photos.map((p, i) => (
        <Img key={i} a={p} eager className="h-[180px] w-[240px] shrink-0 object-cover md:h-[229px] md:w-[305px]" />
      ))}
    </div>
  )
  return (
    <section className="overflow-hidden py-10 md:py-[60px]">
      <div className="animate-scroll-images flex w-max gap-3 md:gap-5">
        {set(false)}
        {set(true)}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T16-2 event.recap
function RecapDecor() {
  return (
    <svg width="287" height="299" viewBox="0 0 287 299" fill="none" aria-hidden="true" className="h-auto w-full">
      <defs>
        <linearGradient id="recap-bar" x1="0" y1="299" x2="240" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FE6703" />
          <stop offset="1" stopColor="#EC71F6" />
        </linearGradient>
      </defs>
      <path d="M0 299L216 83H287L71 299Z" fill="url(#recap-bar)" />
      <rect x="216" y="12" width="71" height="71" fill="#632FF5" />
      {/* pointing hand glyph */}
      <path
        d="M232 52h10v-12a4 4 0 0 1 8 0v12h18a5 5 0 0 1 0 10h-2a5 5 0 0 1 0 10h-28a6 6 0 0 1-6-6Z"
        stroke="#fff"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EventRecap({ title, body, cta }) {
  return (
    <section className="pb-10 pt-8 md:pb-[60px] md:pt-10">
      <div className="container">
        <div className="relative flex flex-col items-center justify-center gap-5 overflow-hidden bg-black px-6 py-12 text-center md:px-10 md:py-16 lg:min-h-[482px]">
          <div className="absolute bottom-0 left-[-1.4%] hidden w-[23%] max-w-[331px] translate-y-[36.87%] lg:block">
            <RecapDecor />
          </div>
          <h2 className="summit-display relative max-w-[714px] text-[36px] leading-[1.1] text-white md:text-[64px]">{title}</h2>
          <p className="relative max-w-[714px] text-[18px] leading-[25.2px] text-white md:text-[24px] md:leading-[33.6px]">{body}</p>
          <SiteLink
            to={cta.to}
            className={`${BTN} relative mt-1 min-h-16 bg-orange-600 px-12 py-[34px] text-[24px] leading-[26.4px] text-black hover:bg-white`}
          >
            {cta.label}
          </SiteLink>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T16-3 event.highlight-cards (rows)
const PIXELS = [
  ['#3E862F', '#D8FF33'],
  ['#FE6703', '#EC71F6'],
  ['#9C79FF', '#632FF5'],
  ['#3E862F', '#6B9AFF'],
]
function PixelIcon({ pair }) {
  return (
    <svg viewBox="0 0 2 5" shapeRendering="crispEdges" aria-hidden="true" className="h-[70px] w-6 shrink-0 md:h-[94px] md:w-8">
      {Array.from({ length: 10 }, (_, k) => {
        const x = k % 2
        const y = Math.floor(k / 2)
        return <rect key={k} x={x} y={y} width="1" height="1" fill={pair[(x + y) % 2]} />
      })}
    </svg>
  )
}

export function EventRows({ title, rows }) {
  return (
    <section className="py-12 md:py-16 lg:py-[88px]">
      <div className="container">
        <h2 className="summit-display text-[36px] leading-[1.1] text-black md:text-[64px]">{title}</h2>
        <ul className="mt-8 md:mt-10">
          {rows.map((r, i) => (
            <li
              key={r.title}
              className="flex flex-col gap-6 border-b border-black py-8 first:pt-0 last:border-b-0 last:pb-0 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
            >
              <div className="flex items-center gap-5 lg:max-w-[813px]">
                <PixelIcon pair={PIXELS[i % 4]} />
                <h3 className="summit-display text-2xl text-black sm:text-3xl lg:text-[40px] lg:leading-[44px]">{r.title}</h3>
              </div>
              <SiteLink
                to={r.cta.to}
                className={`${BTN} min-h-16 w-full shrink-0 border border-black px-8 py-4 text-[24px] leading-[26.4px] text-black hover:bg-black hover:text-white lg:h-[94px] lg:w-[282px]`}
              >
                {r.cta.label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T16-4 event.sponsor-logos
function Tier({ label, logos, className = '' }) {
  return (
    <div className={`flex flex-col border border-black ${className}`}>
      <div className="border-b border-black bg-white px-6 py-3">
        <span className="summit-display text-[24px] capitalize leading-[24px] text-black">{label}</span>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-x-16 gap-y-10 px-8 py-14">
        {logos.map((l) => (
          <SiteLink key={l.src} to="#" className="flex items-center">
            <Img a={l} className="object-contain" style={{ width: l.width, height: l.height }} />
          </SiteLink>
        ))}
      </div>
    </div>
  )
}

export function EventSponsors({ title, tiers, cta }) {
  return (
    <div className="container py-16 md:py-20">
      <h2 className="summit-display mb-12 text-[36px] leading-[1.1] text-[#111827] md:mb-16 md:text-[64px]">{title}</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Tier {...tiers[0]} />
          <Tier {...tiers[1]} />
        </div>
        <Tier {...tiers[2]} />
      </div>
      <SiteLink
        to={cta.to}
        className={`${BTN} mt-12 h-[100px] w-full border border-current px-16 py-9 text-[24px] leading-[32px] text-[#111827] hover:border-transparent hover:bg-orange-600 hover:text-black md:mt-16`}
      >
        {cta.label}
      </SiteLink>
    </div>
  )
}

// ---------------------------------------------------------------- T16-5 event.media-block
export function EventMedia({ img }) {
  return (
    <div className="container">
      <div className="relative h-[320px] w-full overflow-hidden md:h-[560px]">
        <Img a={img} className="absolute inset-0 h-full w-full object-cover object-[50%_74%]" />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- T16-6 / T16-7 closing bands
export function EventQuote({ quote, name, role }) {
  return (
    <section className="bg-black text-white">
      <div className="summit-dither h-6 w-full" aria-hidden="true" />
      <div className="container py-16 md:py-20">
        <p className="summit-display pb-14 text-[40px] leading-[120%] lg:text-6xl lg:leading-[130%] xl:text-[64px]">{quote}</p>
        <p className="font-mono text-[18px] font-semibold leading-[25.2px]">{name}</p>
        <p className="font-mono text-[18px] leading-[25.2px]">{role}</p>
      </div>
    </section>
  )
}

export function EventClosing({ title, body, cta }) {
  return (
    <section className="bg-black text-white">
      <div className="container pb-20 pt-12 md:pb-30 md:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="summit-display mb-6 whitespace-pre-line text-[36px] leading-[1.1] md:text-[64px]">{title}</h2>
          <div className="mt-auto">
            <p className="text-[24px] leading-[33.6px]">{body}</p>
            <div className="flex flex-wrap gap-3">
              <SiteLink
                to={cta.to}
                className={`${BTN} mt-4 border border-white px-16 py-6 text-[24px] leading-[32px] text-white hover:border-transparent hover:bg-orange-600 hover:text-black md:mt-8 md:h-[100px] md:min-w-[305px] md:py-9`}
              >
                {cta.label}
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
