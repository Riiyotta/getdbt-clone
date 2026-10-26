import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import SiteLink from '../SiteLink'
import { Img } from './parts'

// N-stats (specs/T1-T4.md A): dark "trusted globally" bento. Rows 7+5 / 5+7 at >=1024, stacked below.
// Cards: bg-blur-dark + 1px #1e2939 border; optional image (1/3) and logo-tile row (T2).
// Reveal (with eyebrow, T2): eyebrow 0 / h2 200 / grid 400 / cards 400-700.
//        (no eyebrow, T4):  h2 0 / grid 200 / cards 200-500.
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

export default function Stats({ eyebrow, title, cards }) {
  const d0 = eyebrow ? 200 : 0
  return (
    <section className="relative z-5 overflow-hidden bg-ink-950 bg-bottom bg-no-repeat py-20 text-white md:py-16 lg:py-30">
      <div {...revealRootProps} className="container relative z-10">
        {eyebrow && <p {...reveal(0, 'eyebrow mb-4 text-purple-400')}>{eyebrow}</p>}
        <h2 {...reveal(d0, 'heading-2 mb-10 text-white')}>{title}</h2>
        <div {...reveal(d0 + 200, 'grid grid-cols-12 gap-6')}>
          {cards.map((c, i) => (
            <div
              key={c.title}
              {...reveal(
                d0 + 200 + i * 100,
                `col-span-12 rounded-2xl border border-ink-800 bg-blur-dark p-10 backdrop-blur-md ${SPANS[i % 4]}`,
              )}
            >
              <div className="flex h-full flex-col items-center gap-4 lg:flex-row lg:gap-6">
                {/* measured: text column lg:w-2/3 on every card except a 5-col card without media */}
                <div className={`w-full ${c.image || SPANS[i % 4] === 'lg:col-span-7' ? 'lg:w-2/3' : ''}`}>
                  <p className="eyebrow-sm mb-4 text-purple-400">{c.eyebrow}</p>
                  <h3 className="heading-3 mb-4 text-white">{c.title}</h3>
                  {c.body && <p className="text-base text-white">{c.body}</p>}
                  {c.tiles && (
                    <div className="mt-6 flex gap-4">
                      {c.tiles.map((tile) => (
                        <SiteLink
                          key={tile.to}
                          to={tile.to}
                          aria-label={tile.image.alt}
                          className="flex size-12 items-center justify-center rounded-lg border border-ink-800 bg-blur-dark p-2 backdrop-blur-md transition-colors duration-150 ease-standard hover:border-ink-700"
                        >
                          <Img a={tile.image} alt="" className="size-[30px] object-contain" />
                        </SiteLink>
                      ))}
                    </div>
                  )}
                </div>
                {c.image && (
                  <div className="w-full lg:w-1/3">
                    <Img a={c.image} className="mx-auto block h-auto max-w-full rounded-2xl object-cover" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
