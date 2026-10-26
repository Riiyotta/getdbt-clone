import { CheckMark, XMark } from '../icons'
import { Img } from './parts'

// C-17 N-journey (specs/T12-T13.md): dark maturity columns. Header: orange mono eyebrow, white
// heading-2 (mb-6), paragraph. Four flex-1 columns (min-h 500 at >=1024, gap 24): columns 1-3 white
// 1px r8 outline (heading-4, three bold-label lines, then a status badge -- green / yellow -- or a
// list of red x items); column 4 highlighted (orange border, #030711 fill, orange glow, 32 product
// mark, orange check items). An original overlay drawing (2 thin grey->amber curves, coloured dots
// where they cross each column, 2 mono axis labels) sits along the bottom of the row at >=1024.
// The original's sticky mobile header card (<1024) was not measured and is not built. No reveal.
const BADGE = {
  green: 'border-journey-green bg-journey-green/20 text-journey-green',
  yellow: 'border-journey-yellow bg-journey-yellow/20 text-journey-yellow',
}

function Lines({ lines }) {
  return lines.map((l) => (
    <p key={l.label} className="mb-6 text-base text-white">
      <strong className="font-bold">{l.label}</strong> {l.value}
    </p>
  ))
}

// overlay: viewBox 1226x400 stretched over the 1248x400 row bottom
function Overlay({ labels }) {
  const dots = [
    [240, 375, 'fill-journey-ok'],
    [456, 360, 'fill-journey-warn'],
    [762, 340, 'fill-danger'],
    [1070, 306, 'fill-orange-600'],
    [240, 392, 'fill-journey-ok'],
    [456, 384, 'fill-journey-warn'],
    [762, 374, 'fill-danger'],
    [1070, 356, 'fill-orange-600'],
  ]
  return (
    <svg
      viewBox="0 0 1226 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-[400px] w-full lg:block"
    >
      <defs>
        <linearGradient id="journey-curve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="text-journey-line" stopColor="currentColor" />
          <stop offset="1" className="text-journey-amber" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <path d="M210 375C360 374 520 362 700 344C900 324 1060 304 1186 284" stroke="url(#journey-curve)" strokeWidth="1.5" fill="none" />
      <path d="M210 392C380 391 560 384 760 373C940 362 1080 350 1186 336" stroke="url(#journey-curve)" strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
      {dots.map(([x, y, c]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className={c} />
      ))}
      <text x="8" y="379" className="fill-white/60 font-mono text-xs">
        {labels[0]}
      </text>
      <text x="8" y="396" className="fill-white/60 font-mono text-xs">
        {labels[1]}
      </text>
    </svg>
  )
}

export default function Journey({ eyebrow, title, body, columns, highlight, axis }) {
  return (
    <section className="relative z-5 bg-ink-950 py-12 text-white md:py-16">
      <div className="container">
        <p className="eyebrow mb-4 text-orange-600">{eyebrow}</p>
        <h2 className="heading-2 mb-6 text-white">{title}</h2>
        <p className="text-base text-white">{body}</p>
        <div className="grid-container relative pt-12">
          <div className="isolate col-span-full flex flex-col gap-6 lg:flex-row">
            {columns.map((c) => (
              <div key={c.title} className="flex-1 rounded-lg border border-white p-6 lg:min-h-125">
                <h3 className="heading-4 mb-6 text-white">{c.title}</h3>
                <Lines lines={c.lines} />
                {c.badge && (
                  <span className={`my-6 inline-block rounded-badge border px-2 py-1 font-mono text-xs ${BADGE[c.badge.tone]}`}>
                    {c.badge.label}
                  </span>
                )}
                {c.missing && (
                  <ul>
                    {c.missing.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-base text-white">
                        <XMark className="shrink-0 text-danger" />
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="relative flex-1 rounded-lg border border-orange-600 bg-ink-950 p-6 shadow-ember lg:min-h-125">
              <div className="mb-6 flex gap-2">
                <Img a={highlight.mark} className="size-8 shrink-0" />
                <h3 className="heading-4 text-white">{highlight.title}</h3>
              </div>
              <Lines lines={highlight.lines} />
              <ul>
                {highlight.items.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-base text-white">
                    <CheckMark size={16} className="shrink-0 text-orange-600" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Overlay labels={axis} />
        </div>
      </div>
    </section>
  )
}
