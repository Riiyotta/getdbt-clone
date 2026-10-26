import Baton from './Baton'
import { Btn, Img } from './parts'
import { PlayCircle } from '../icons'

// N-hero-center (specs/T1-T4.md A): T2/T4 hero. Centred text column (824 at 1440), large image
// below (1036 column). `square` = T4: image wrapper max-w 80%, header `lg:pb-0` (image flush bottom).
// T12-T13 variants (specs/T12-T13.md B): text-only (no media); `title` / `lead` given as arrays
// render as stacked block spans (self-hosting); `illustration` = inline-SVG stand-in with no radius;
// `poster` = 1036-wide framed 16:9 placeholder (bg-blur, 1px #e5e7eb, r12, no padding: the
// original's Lottie frame is 1036x584 holding a 1034x582 animation) with a centred
// 80px play glyph (56 below 768), as specced in H for what-is-lattice.
// The stroke draws as soon as it mounts (`load`); `idleStroke` = T4: the original's hero stroke never
// draws and its fill stays hidden at >=768 (measured on financial-services, healthcare, manufacturing).
const lines = (v) => (Array.isArray(v) ? v.map((t) => <span key={t} className="block">{t}</span>) : v)

export default function HeroCenter({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  media,
  illustration,
  poster,
  stroke,
  gradient,
  square = false,
  idleStroke = false,
  highlights,
}) {
  const hasMedia = media || illustration || poster
  return (
    <header className={`relative z-5 overflow-hidden bg-white py-12 md:py-16 ${square ? 'lg:pb-0' : ''}`}>
      <Baton shape={stroke} gradient={gradient} idle={idleStroke} load />
      <div className="container relative z-10">
        <div className="grid-container mx-auto">
          <div className="col-span-full flex flex-col items-center text-center lg:col-span-8 lg:col-start-3">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="heading-1 text-ink-950">{lines(title)}</h1>
            {lead && <p className="lead mt-6 text-ink-950">{lines(lead)}</p>}
            {(primary || secondary) && (
              <div className="mt-6 flex w-full flex-col justify-center gap-3 md:mt-10 md:w-auto md:flex-row md:items-center">
                <Btn cta={primary} variant="primary" size="large" />
                <Btn cta={secondary} variant="secondary" size="large" />
              </div>
            )}
          </div>
        </div>
        {highlights && (
          <div className="mx-auto mt-10 flex flex-wrap justify-center text-center">
            {highlights.map((h) => (
              <div key={h.title} className="w-full py-2 sm:w-1/2 lg:w-1/4 lg:py-0">
                <span className="block text-2xl font-bold text-ink-950">{h.title}</span>
                <span className="block text-base text-ink-950">{h.body}</span>
              </div>
            ))}
          </div>
        )}
        {hasMedia && (
          <div className="grid-container mt-12">
            <div className="col-span-full lg:col-span-10 lg:col-start-2">
              {media && (
                <div className={square ? 'mx-auto max-w-[80%] max-md:!max-w-full' : 'flex justify-center'}>
                  <Img a={media} priority className="mx-auto block h-auto max-w-full rounded-2xl" />
                </div>
              )}
              {illustration && <Img a={illustration} priority className="mx-auto block h-auto w-full" />}
              {poster && (
                <div className="overflow-hidden rounded-xl border border-ink-200 bg-blur backdrop-blur-md">
                  <div className="relative aspect-video w-full overflow-hidden" role="img" aria-label={poster.alt}>
                    <Img a={poster} priority alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <PlayCircle className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-orange-600 md:size-20" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
