import SiteLink from '../SiteLink'
import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import { ChevronRight24, PlayIcon } from '../icons'
import DevModalButton from './DevModal'

// Small building blocks shared by the T1-T4 section components.

// `.button` link. cta = { label, to }. cta.dialog (T12-T13 hero `<button>`s) renders a <button>
// that opens the developer-path dialog (C-20) instead of a link.
export function Btn({ cta, variant = 'primary', size = 'medium', className = '', ...props }) {
  if (!cta) return null
  if (cta.dialog) {
    return (
      <DevModalButton className={`button ${variant} ${size} ${className}`.trim()} {...props}>
        {cta.label}
      </DevModalButton>
    )
  }
  return (
    <SiteLink to={cta.to} className={`button ${variant} ${size} ${className}`.trim()} {...props}>
      {cta.label}
    </SiteLink>
  )
}

// `.button.text` card link with the rotated 24px chevron (CLONE_SPEC 0.7).
// `shift`: the original's image-card links (N-feat C, e.g. snowflake cards) wrap the chevron in
// `transition-all group-hover:translate-x-1.5` (6px, 150ms cubic-bezier(.4,0,.2,1)); the T4 slider
// card links have a bare chevron with no shift.
// `dark` (T12-T13 E-dark / C-dark cards): white text, hover #9786ff.
export function TextLink({ cta, className = '', shift = false, dark = false }) {
  if (!cta) return null
  const tone = dark ? 'text-white hover:text-purple-400' : ''
  return (
    <SiteLink to={cta.to} className={`button text ${shift ? 'group' : ''} ${tone} ${className}`.replace(/\s+/g, ' ').trim()}>
      {cta.label}
      {shift ? (
        <div className="shrink-0 transition-all group-hover:translate-x-1.5">
          <ChevronRight24 className="shrink-0" />
        </div>
      ) : (
        <ChevronRight24 className="shrink-0" />
      )}
    </SiteLink>
  )
}

// <img> from a page-asset record { src, width, height, alt }. A record made with `crop()` carries a
// `ratio` (the spec's rendered box) and is drawn object-cover in that box.
export function Img({ a, className = '', eager = false, priority = false, style, ...props }) {
  if (!a) return null
  const fit = a.ratio ? { style: { aspectRatio: a.ratio, ...style } } : style ? { style } : {}
  return (
    <img
      src={a.src}
      alt={a.alt ?? ''}
      width={a.width}
      height={a.height}
      loading={eager || priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={a.ratio ? `${className} object-cover` : className}
      {...fit}
      {...props}
    />
  )
}

// asset record rendered in a w x h box (object-cover)
export const crop = (a, w, h) => ({ ...a, ratio: `${w} / ${h}` })

// Section header used by N-feat / N-resources (homepage 2.11 pattern): eyebrow -> heading-2 ->
// paragraph #1e2939, one inline reveal span at 0ms, 9 of 12 columns (930 at 1440). The h2 keeps its
// mb-4 even without a paragraph (measured on the original); a centred header spans all 12 columns.
// `dark` (T12-T13 dark card grids): white h2 and paragraph, eyebrow #9786ff.
export function SectionHeader({ eyebrow, title, body, center = false, before, children, span = 'lg:col-span-9', dark = false }) {
  return (
    <div {...revealRootProps} className="relative z-10">
      <span {...reveal(0)}>
        <div className="grid-container">
          <div className={`col-span-full ${center ? 'text-center' : span}`}>
            {before}
            {eyebrow && <p className={`eyebrow mb-4 ${dark ? 'text-purple-400' : ''}`}>{eyebrow}</p>}
            <h2 className={`heading-2 mb-4 ${dark ? 'text-white' : 'text-ink-950'}`}>{title}</h2>
            {body && <p className={`text-base ${dark ? 'text-white' : 'text-ink-800'}`}>{body}</p>}
            {children}
          </div>
        </div>
      </span>
    </div>
  )
}

// 16:9 video stand-in: a poster image with a play glyph. No third-party player is embedded.
export function VideoPoster({ a, className = '' }) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden ${className}`} role="img" aria-label={a?.alt}>
      <Img a={a} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blur text-ink-950 backdrop-blur-md">
        <PlayIcon className="ml-1" />
      </span>
    </div>
  )
}

// Inline rich text (T12-T13 prose): a string, or an array of strings and { b } (bold) /
// { a, to } (#632ff5 link) runs.
export function RichText({ runs }) {
  if (typeof runs === 'string') return runs
  return runs.map((r, i) => {
    if (typeof r === 'string') return <span key={i}>{r}</span>
    if (r.a)
      return (
        <SiteLink key={i} to={r.to} className="text-purple-600 hover:underline">
          {r.a}
        </SiteLink>
      )
    return (
      <strong key={i} className="font-bold">
        {r.b}
      </strong>
    )
  })
}

// Illustrated avatar circle (CSS background, cover), as the original's leader / board circles.
export function Avatar({ a, className = '' }) {
  if (!a) return null
  return <div role="img" aria-label={a.alt} className={`aspect-square rounded-full bg-cover bg-center ${className}`} style={{ backgroundImage: `url(${a.src})` }} />
}
