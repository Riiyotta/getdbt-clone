import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import SiteLink from '../SiteLink'
import { CheckMark, ChevronRight24 } from '../icons'
import { Btn } from './parts'

// H-cta short variants (specs/T1-T4.md "H-cta variants"; homepage 2.15 shell): gradient-12 + grain +
// concentric circles. With `aside` (T1, T3): left 7 cols + right 4 cols (no divider).
// Without (T2): eyebrow + heading-2 + paragraph + buttons.
// Reveal, one-for-one with the original's ScrollAnimate output (develop, snowflake, data-modernization):
//   grid 0 > left col 0 > <span> per item stepping 100ms from 0 (eyebrow?, h2, p), then the button row
//   at the next step with each button in its own <span> (row + 0 / +100);
//   aside col 100 > space-y-6 100 > <span> h 100, <span> p 200, <span> link 300.
// develop: 12 targets 0-300 | data-modernization (eyebrow, no aside): 8 targets 0-400.
// The wrappers are inline <span>s like the original's, so those items fade without translating.
// The aside heading is an <h4> on the original (heading-4 styling).
// T12-T13 additions (specs/T12-T13.md B "H-cta short additions"):
//   `checklist` aside: space-y-6 rows of a 24x25 white check + 24/32 text; row k at 100+100k, its
//     text +200
//   `stats` aside: 1px #e5e7eb divider (top below 768, left at >=768), md:pl-15, two stats
//     (32/38.4 400 value + 18/28 label)
//   `wide`: the left column spans all 12 columns (no aside); no buttons -> no button row
export default function CtaBand({ eyebrow, title, body, primary, secondary, aside, checklist, stats, wide = false }) {
  let step = 0
  const next = () => {
    const d = step
    step += 100
    return d
  }
  const eyebrowAt = eyebrow ? next() : null
  const titleAt = next()
  const bodyAt = next()
  const buttonsAt = next()
  const buttons = [
    [primary, 'primary dark'],
    [secondary, 'secondary dark'],
  ].filter(([c]) => c)
  const asideCol = 'col-span-full mt-8 md:col-span-3 md:col-end-9 md:mt-0 lg:col-span-4 lg:col-end-13'
  return (
    <section className="gradient-container gradient-12 circle-bg relative z-5 overflow-hidden py-12 text-white md:py-16">
      <div {...revealRootProps} className="container relative z-10">
        <div {...reveal(0, 'grid-container gap-0')}>
          <div {...reveal(0, `col-span-full ${wide ? '' : 'md:col-span-4 lg:col-span-7'}`)}>
            {eyebrow && (
              <span {...reveal(eyebrowAt)}>
                <p className="eyebrow mb-4 text-white">{eyebrow}</p>
              </span>
            )}
            <span {...reveal(titleAt)}>
              <h2 className="heading-2 mb-4 text-white">{title}</h2>
            </span>
            <span {...reveal(bodyAt)}>
              {/* T7 /case-studies closing band carries two paragraphs (body as an array) */}
              {Array.isArray(body) ? (
                body.map((t, i) => (
                  <p key={i} className={`text-base text-white ${i ? 'mt-4' : ''}`.trim()}>
                    {t}
                  </p>
                ))
              ) : (
                <p className="text-base text-white">{body}</p>
              )}
            </span>
            {buttons.length > 0 && (
              <div {...reveal(buttonsAt, 'mt-8 flex flex-col items-center gap-3 md:flex-row')}>
                {buttons.map(([c, v], i) => (
                  <span key={v} {...reveal(buttonsAt + i * 100)}>
                    <Btn cta={c} variant={v} size="large" />
                  </span>
                ))}
              </div>
            )}
          </div>
          {aside && (
            <div {...reveal(100, asideCol)}>
              <div {...reveal(100, 'space-y-6')}>
                <span {...reveal(100)}>
                  <h4 className="heading-4 mb-4 text-white">{aside.title}</h4>
                </span>
                <span {...reveal(200)}>
                  <p className="text-base text-white">{aside.body}</p>
                </span>
                <span {...reveal(300)}>
                  <div className="mt-4 flex items-center">
                    <SiteLink to={aside.cta.to} className="flex items-center gap-x-2 text-base font-medium text-white">
                      {aside.cta.label}
                      <ChevronRight24 />
                    </SiteLink>
                  </div>
                </span>
              </div>
            </div>
          )}
          {checklist && (
            <div {...reveal(100, asideCol)}>
              <ul className="space-y-6">
                {checklist.map((row, k) => (
                  <li key={row} {...reveal(100 + 100 * k, 'flex items-center gap-x-2')}>
                    <CheckMark className="shrink-0 text-white" />
                    <span {...reveal(300 + 100 * k, 'ml-2 font-sans text-2xl font-normal text-white')}>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {stats && (
            <div {...reveal(100, asideCol)}>
              <div className="space-y-6 border-t border-ink-200 pt-8 md:border-l md:border-t-0 md:pl-15 md:pt-0">
                {stats.map((st, k) => (
                  <div key={st.label} {...reveal(100 + 100 * k, 'space-y-1')}>
                    <p className="font-display text-stat font-normal text-white">{st.number}</p>
                    <p className="text-lg text-white">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
