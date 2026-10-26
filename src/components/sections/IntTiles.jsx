import SiteLink from '../SiteLink'
import { Btn, Img } from './parts'

// C-13 N-int-tiles (specs/T12-T13.md): left 5/12 (eyebrow, heading-2, paragraph mt-4, primary
// medium button mt-4) | right 6/12 from column 7: 2-column grid (gap 20) of labelled tiles (1px
// #e5e7eb, r16, px-6 py-5; 40 icon, 30 below 768; label 24/32 600, 20 below 1024; hover border
// #99a1af, 300ms). No reveal.
export default function IntTiles({ eyebrow, title, body, cta, tiles }) {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="heading-2 text-ink-950">{title}</h2>
            <p className="mt-4 text-base text-ink-950">{body}</p>
            <Btn cta={cta} variant="primary" size="medium" className="mt-4" />
          </div>
          <div className="col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {tiles.map((t) => (
                <SiteLink
                  key={t.label}
                  to={t.to || '/product/integrations'}
                  className="flex items-center gap-2 rounded-2xl border border-ink-200 px-6 py-5 transition-all duration-300 ease-standard hover:border-ink-400"
                >
                  <Img a={t.icon} alt="" className="size-[30px] object-contain md:size-10" />
                  <span className="font-display text-xl font-semibold text-ink-950 lg:text-2xl">{t.label}</span>
                </SiteLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
