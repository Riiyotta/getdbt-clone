import useSlider from '../../hooks/useSlider'
import { ui } from '../../content'
import { QuoteIcon } from '../icons'
import Baton from './Baton'
import { Img } from './parts'

// N-quote-band (specs/T1-T4.md A): one bordered testimonial card, vertically centred in a
// min-height container. `quotes` with more than one entry becomes a 1-per-view slider with
// pagination bars and no arrows (catalog). `stroke` adds N-baton S1 behind the card. No reveal.
function Quote({ q }) {
  return (
    <div className="flex flex-col gap-6">
      <QuoteIcon className="text-ink-950" />
      {q.logo && (
        <div className="w-full max-w-[112px]">
          <Img a={q.logo} className="block h-auto w-full" />
        </div>
      )}
      <p className="font-sans text-2xl font-semibold text-ink-950">{q.quote}</p>
      <p className="text-sm text-ink-500">
        <span className="text-ink-950">{q.person}</span> {q.role}
      </p>
    </div>
  )
}

// T12-T13: a square product-lockup logo (112x112) works as-is; `wash` = the assistant band's soft
// background (the original's stretched PNG, recreated in CSS); slides without a logo omit the box.
export default function QuoteBand({ quotes, stroke = false, wash = false }) {
  const { index, pages, page, go, slideW, dragging, trackStyle, trackHandlers, isHidden, overflow } = useSlider({
    count: quotes.length,
    perPage: 1,
  })
  return (
    <section className={`relative z-5 overflow-hidden bg-white bg-cover bg-center py-12 md:py-[120px] ${wash ? 'quote-wash' : ''}`.trim()}>
      {stroke && <Baton shape="S1" />}
      <div className="container relative flex flex-col items-center justify-center lg:min-h-[375px] xl:min-h-[415px]">
        <div className="relative z-10 w-full rounded-2xl border border-ink-200 bg-blur p-12 backdrop-blur-md">
          {quotes.length === 1 ? (
            <Quote q={quotes[0]} />
          ) : (
            <>
              <div className="overflow-hidden">
                <ul
                  className={`flex touch-pan-y select-none ${dragging ? '' : 'transition-transform duration-400 ease-slider'} ${
                    overflow ? 'cursor-grab active:cursor-grabbing' : ''
                  }`}
                  style={trackStyle}
                  {...trackHandlers}
                >
                  {quotes.map((q, i) => (
                    <li key={q.person} className="mr-4 shrink-0" style={{ width: slideW }} aria-hidden={isHidden(i)}>
                      <Quote q={q} />
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="mt-6 flex">
                {pages.map((p, i) => (
                  <li key={p}>
                    <button
                      type="button"
                      aria-label={`${ui.goToSlide} ${i + 1}`}
                      aria-current={i === page}
                      onClick={() => go(p)}
                      className={`m-[3px] block h-1 w-3.5 rounded-2xl opacity-70 transition-transform duration-200 ease-linear ${
                        p === index ? 'bg-purple-600' : 'bg-dot'
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
