import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import SiteLink from '../SiteLink'
import { Btn, Img } from './parts'

// C-12 N-int-strip (specs/T12-T13.md): centred grey kicker (24/32, 32/38.4 at >=768, 600 #6a7282)
// + heading-2, a wrapping row of 6 bordered icon tiles (74 at >=768, 64 below; hover border #99a1af
// over 300ms) and a primary medium button. Reveal: wrapper 0, kicker 0, h2 100, tiles 200, button 400.
export default function IntStrip({ kicker, title, tiles, cta }) {
  return (
    <section className="section">
      <div className="container">
        <div {...revealRootProps} className="flex flex-col items-center text-center">
          <div {...reveal(0, 'max-w-2xl')}>
            <span {...reveal(0, 'block text-2xl font-semibold text-ink-500 md:text-stat')}>{kicker}</span>
            <h2 {...reveal(100, 'heading-2 text-ink-950')}>{title}</h2>
          </div>
          <div {...reveal(200, 'mt-12 w-full')}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {tiles.map((t) => (
                <SiteLink
                  key={t.alt}
                  to={t.to || '/product/integrations'}
                  aria-label={t.alt}
                  className="flex items-center gap-2 rounded-2xl border border-ink-200 p-4 transition-all duration-300 ease-standard hover:border-ink-400"
                >
                  <Img a={t} alt="" className="h-[30px] max-w-[30px] rounded-2xl object-contain md:h-10 md:max-w-[40px]" />
                </SiteLink>
              ))}
            </div>
          </div>
          <div {...reveal(400, 'mt-12 w-full md:w-auto')}>
            <Btn cta={cta} variant="primary" size="medium" className="w-full md:w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
