import { assets } from '../assets'
import { testimonials, ui } from '../content'
import useMedia, { LG } from '../hooks/useMedia'
import useSlider from '../hooks/useSlider'
import { ArrowLeft, ArrowRight, ChevronRight24, QuoteIcon } from './icons'

function Card({ card, logo }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-200 p-10 lg:max-w-[400px]">
      <img
        src={logo.src}
        alt={logo.alt}
        width={100}
        height={50}
        loading="lazy"
        draggable="false"
        className="h-[50px] w-[100px] object-contain"
      />
      {card.type === 'quote' ? (
        <>
          <QuoteIcon className="mb-6 mt-12 shrink-0" />
          <p className="lead text-ink-950">{card.quote}</p>
          <p className="mt-6 text-sm text-ink-950">
            {card.name}, <span className="text-ink-500">{card.role}</span>
          </p>
        </>
      ) : (
        <>
          <p className="mb-6 mt-12 font-sans text-metric font-normal text-ink-950">{card.metric}</p>
          <p className="lead text-ink-950">{card.line}</p>
        </>
      )}
      <div className="mt-auto pt-6">
        <a href="#" className="button text" draggable="false">
          {card.cta}
          <ChevronRight24 />
        </a>
      </div>
    </div>
  )
}

// CLONE_SPEC 2.14. Hand-built slider (hooks/useSlider) replacing Splide: perPage 2 (>=1024) / 1, gap 1rem,
// 400ms cubic-bezier(.25,1,.5,1), draggable, no autoplay; controls only when slides overflow.
export default function Testimonials() {
  const { cards } = testimonials
  const perPage = useMedia(LG) ? 2 : 1
  const { index, maxIndex, overflow, go, slideW, dragging, trackStyle, trackHandlers, isHidden } = useSlider({
    count: cards.length,
    perPage,
  })

  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow mb-4">{testimonials.eyebrow}</p>
            <h2 className="heading-2 mb-4 text-ink-950">{testimonials.title}</h2>
            <p className="text-base text-ink-950">{testimonials.body}</p>
            <div className="mt-6">
              <a href="#" className="button secondary medium">
                {testimonials.cta}
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="overflow-hidden">
              <ul
                className={`flex touch-pan-y select-none ${
                  dragging ? '' : 'transition-transform duration-400 ease-slider'
                } ${overflow ? 'cursor-grab active:cursor-grabbing' : ''}`}
                style={trackStyle}
                {...trackHandlers}
              >
                {cards.map((card, i) => (
                  <li
                    key={i}
                    className="mr-4 shrink-0"
                    style={{ width: slideW }}
                    aria-hidden={isHidden(i)}
                  >
                    <Card card={card} logo={assets.testimonialLogos[i]} />
                  </li>
                ))}
              </ul>
            </div>
            {overflow && (
              <div className="flex h-8 items-center justify-between">
                <ul className="flex">
                  {Array.from({ length: maxIndex + 1 }, (_, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        aria-label={`${ui.goToSlide} ${i + 1}`}
                        aria-current={i === index}
                        onClick={() => go(i)}
                        className={`m-[3px] block h-1 w-3.5 rounded-2xl opacity-70 transition-transform duration-200 ease-linear ${
                          i === index ? 'bg-purple-600' : 'bg-dot'
                        }`}
                      />
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  {[
                    [ui.prevSlide, -1, ArrowLeft],
                    [ui.nextSlide, 1, ArrowRight],
                  ].map(([label, dir, Icon]) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      disabled={dir < 0 ? index === 0 : index === maxIndex}
                      onClick={() => go(index + dir)}
                      className="flex size-[19px] items-center justify-center bg-transparent text-ink-950 opacity-70 hover:opacity-90 disabled:opacity-30"
                    >
                      <Icon width={24} height={24} className="shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
