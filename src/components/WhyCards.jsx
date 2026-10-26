import { assets } from '../assets'
import { why } from '../content'
import { reveal, revealRootProps } from '../hooks/useScrollReveal'
import { ChevronRight24 } from './icons'

// CLONE_SPEC 2.11
export default function WhyCards() {
  return (
    <section className="section overflow-hidden">
      <div className="container">
        {/* measured: header spans 9 of 12 grid columns (930 at 1440, 858 at 1280), full width below lg */}
        {/* original: stagger root (relative z-10) wrapping one inline <span> target at 0s; inline, so
            only its opacity animates (transform does not apply to non-atomic inline boxes) */}
        <div {...revealRootProps} className="relative z-10">
          <span {...reveal(0)}>
            <div className="grid-container">
              <div className="col-span-full lg:col-span-9">
                <p className="eyebrow mb-4">{why.eyebrow}</p>
                <h2 className="heading-2 mb-4 text-ink-950">{why.title}</h2>
                <p className="text-base text-ink-800">{why.body}</p>
              </div>
            </div>
          </span>
        </div>
        <div className="relative z-10 mt-12 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-6">
          {why.cards.map((card, i) => (
            <div
              key={card.title}
              className="flex max-w-[400px] flex-col items-start rounded-2xl border border-ink-200 bg-white/90 p-10 backdrop-blur-md"
            >
              <img
                src={assets.whyIcons[i]}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="size-14 shrink-0 object-contain"
              />
              <h3 className="heading-4 mb-3 mt-10 text-ink-950">{card.title}</h3>
              <p className="mb-10 text-base text-ink-800">{card.body}</p>
              <a href="#" className="button text mt-auto pr-4">
                {card.cta}
                <ChevronRight24 />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
