import { ui } from '../../content'
import useMedia, { LG } from '../../hooks/useMedia'
import useSlider from '../../hooks/useSlider'
import { ArrowLeft, ArrowRight, QuoteIcon } from '../icons'
import { Btn, Img, TextLink } from './parts'

// N-testi-slider (specs/T1-T4.md A): T4 customer slider, a variant of the homepage testimonials.
// 2 per view at >=1024 moving 2 at a time (1 below), no autoplay; the controls row shows only
// when the slides overflow (hidden with 2 slides at >=1024).
function Card({ card }) {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-ink-200 p-10 lg:max-w-[400px]">
      {card.logo && (
        <div className="mb-12 w-full max-w-[100px]">
          <Img a={card.logo} draggable="false" className="h-[50px] w-[100px] object-contain object-left" />
        </div>
      )}
      {/* quote cards sit under the logo; metric cards float between logo and link (mt-auto both sides) */}
      {card.type === 'quote' ? (
        <div className="mb-6">
          <QuoteIcon className="mb-6 shrink-0" />
          <p className="lead text-ink-950">{card.quote}</p>
          <p className="mt-6 text-sm text-ink-950">
            {card.person}, <span className="text-ink-500">{card.role}</span>
          </p>
        </div>
      ) : (
        <div className="mb-6 mt-auto">
          <p className="mb-6 font-sans text-metric font-normal text-ink-950">{card.metric}</p>
          <p className="lead text-ink-950">{card.line}</p>
        </div>
      )}
      <TextLink cta={card.cta} className="mt-auto w-full justify-between" />
    </div>
  )
}

// T12-T13: optional `eyebrow` above the h2, optional paragraph; quote-only slides (no logo, no link).
export default function TestiSlider({ eyebrow, title, body, cta, cards }) {
  const perPage = useMedia(LG) ? 2 : 1
  const { index, pages, page, go, prev, next, maxIndex, overflow, slideW, dragging, trackStyle, trackHandlers, isHidden } =
    useSlider({ count: cards.length, perPage, perMove: perPage })
  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h2 className="heading-2 mb-4 text-ink-950">{title}</h2>
            {body && <p className="text-base text-ink-950">{body}</p>}
            {cta && (
              <div className="mt-6 flex flex-col items-center gap-3 md:flex-row">
                <Btn cta={cta} variant="primary" size="medium" />
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="overflow-hidden">
              <ul
                className={`flex touch-pan-y select-none ${dragging ? '' : 'transition-transform duration-400 ease-slider'} ${
                  overflow ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                style={trackStyle}
                {...trackHandlers}
              >
                {cards.map((card, i) => (
                  <li key={i} className="mr-4 shrink-0" style={{ width: slideW }} aria-hidden={isHidden(i)}>
                    <Card card={card} />
                  </li>
                ))}
              </ul>
            </div>
            {overflow && (
              <div className="flex h-8 justify-between">
                <ul className="mt-4 flex h-4 gap-2 pl-1">
                  {pages.map((p, i) => (
                    <li key={p} className="flex h-4 items-end">
                      <button
                        type="button"
                        aria-label={`${ui.goToSlide} ${i + 1}`}
                        aria-current={i === page}
                        onClick={() => go(p)}
                        className={`m-[3px] block h-1 w-3.5 rounded-2xl opacity-70 transition-transform duration-200 ease-linear ${
                          i === page ? 'bg-purple-600' : 'bg-dot'
                        }`}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex h-4 items-end gap-3.5">
                  {[
                    [ui.prevSlide, prev, ArrowLeft, index === 0],
                    [ui.nextSlide, next, ArrowRight, index === maxIndex],
                  ].map(([label, fn, Icon, disabled]) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      disabled={disabled}
                      onClick={fn}
                      className="flex size-[19px] items-center justify-center rounded-full bg-transparent text-ink-950 opacity-70 hover:opacity-90 disabled:opacity-30"
                    >
                      <Icon width={19} height={19} className="shrink-0" />
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
