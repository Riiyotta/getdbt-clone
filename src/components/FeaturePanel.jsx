import { assets } from '../assets'
import { reveal, revealRootProps } from '../hooks/useScrollReveal'

// CLONE_SPEC 2.7-2.9. Reused three times with gradient-05 / gradient-02 / gradient-12.
export default function FeaturePanel({ index, gradient, mediaFirst, eyebrow, title, body, cta }) {
  const img = assets.features[index]
  const text = (
    <div
      {...reveal(
        mediaFirst ? 200 : 0,
        `relative z-10 col-span-full md:p-12 lg:col-span-4 xl:px-16 ${mediaFirst ? 'max-lg:order-first' : ''}`,
      )}
    >
      <p className="eyebrow-sm mb-4 text-white">{eyebrow}</p>
      <h3 className="heading-3 mb-4 text-white">{title}</h3>
      <p className="text-base text-white">{body}</p>
      <div className="mt-8 flex gap-3">
        <a href="#" className="button primary dark medium">
          {cta}
        </a>
      </div>
    </div>
  )
  const media = (
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
              {media}
              {text}
            </>
          ) : (
            <>
              {text}
              {media}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
