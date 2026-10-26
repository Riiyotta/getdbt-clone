import { assets } from '../assets'
import { reveal, revealRootProps } from '../hooks/useScrollReveal'
import SiteLink from './SiteLink'

// Gradient feature panel: CLONE_SPEC 2.7-2.9 (homepage, three times with gradient-05 / -02 / -12)
// and C-16 N-demo-panel (specs/T12-T13.md, assistant sections 6-9). On the original these are one
// component with identical classes and geometry: section padding 0 48 64 at >=1024 (64 top and
// bottom at 768-1023, none below 768 with an 8px #030711 bottom rule); gradient container r16
// clipped at >=1024; text 4 cols (md:p-12 xl:px-16: small eyebrow, heading-3, paragraph,
// primary.dark medium button mt-8) and media 8 cols on the panel's bottom edge (r8, max-h 550).
// Reveal: first column 0, second column 200 (media inner wrapper same as its column).
//
// Homepage: `index` picks assets.features[index] and `cta` is a label (href "#"); the text column
// moves first below 1024 when `mediaFirst`. Page sections (demoPanel): `media` asset record and a
// `cta` record ({ label, to }); `textFirstMobile={false}` keeps the source order below 1024, as the
// original's assistant rows do.
export default function FeaturePanel({ index, media, gradient, mediaFirst, eyebrow, title, body, cta, textFirstMobile = true }) {
  const img = media || assets.features[index]
  const text = (
    <div
      {...reveal(
        mediaFirst ? 200 : 0,
        `relative z-10 col-span-full md:p-12 lg:col-span-4 xl:px-16 ${mediaFirst && textFirstMobile ? 'max-lg:order-first' : ''}`,
      )}
    >
      <p className="eyebrow-sm mb-4 text-white">{eyebrow}</p>
      <h3 className="heading-3 mb-4 text-white">{title}</h3>
      <p className="text-base text-white">{body}</p>
      <div className="mt-8 flex gap-3">
        {typeof cta === 'string' ? (
          <a href="#" className="button primary dark medium">
            {cta}
          </a>
        ) : (
          <SiteLink to={cta.to} className="button primary dark medium">
            {cta.label}
          </SiteLink>
        )}
      </div>
    </div>
  )
  const mediaCol = (
    <div {...reveal(mediaFirst ? 0 : 200, 'relative z-10 col-span-full self-end lg:col-span-8')}>
      {/* original: nested animated wrapper around the media, same delay as its column */}
      <div {...reveal(mediaFirst ? 0 : 200)}>
        <img
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          className="block h-auto max-h-[550px] w-full rounded-lg"
          {...(img.ratio ? { style: { aspectRatio: img.ratio, objectFit: 'cover' } } : {})}
        />
      </div>
    </div>
  )

  return (
    <section className="relative z-5 border-b-8 border-ink-950 bg-white py-0 md:border-b-0 md:px-12 md:py-16 lg:pb-16 lg:pt-0">
      <div className={`container gradient-container ${gradient} relative p-12 md:rounded-2xl md:p-0 lg:overflow-hidden`}>
        <div {...revealRootProps} className="max-md:flex max-md:flex-col max-md:gap-12 md:grid-container">
          {mediaFirst ? (
            <>
              {mediaCol}
              {text}
            </>
          ) : (
            <>
              {text}
              {mediaCol}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
