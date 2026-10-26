import { assets } from '../assets'
import { integrations } from '../content'
import SiteLink from './SiteLink'
import { Btn, Img } from './sections/parts'

// tiles follow content.integrations.tiles order: Northwind, Quarry, Helixa, Stratus, Driftway, Cobalt DB
const platformRoutes = ['northwind', 'quarry', 'helixa', 'stratus', 'driftway', 'cobalt'].map((s) => `/data-platforms/${s}`)

// Labelled integration tiles: CLONE_SPEC 2.10 (homepage) and C-13 N-int-tiles (specs/T12-T13.md,
// analyst section 12). On the original these are one component (identical classes and geometry):
// left 5/12 (eyebrow, heading-2, paragraph mt-4, primary medium button mt-4) | right 6/12 from
// column 7: 2-column grid (gap 20) of 302x82 tiles (1px #e5e7eb, r16, px-6 py-5; label 24/32 600,
// 20/28 below 1024; hover border #99a1af over 300ms). No reveal.
//
// Called without props it renders the homepage content. With `tiles` ({ label, icon, to }) and a
// `cta` record it renders a page section (T13). The homepage keeps its built markup unchanged
// (homeTiles: 30px icon in a 40px box, 15px vertical padding below 768); page sections use the
// original's measured tile (40px icon, 30 below 768, py-5 at every width).
export default function Integrations({ eyebrow, title, body, cta, tiles }) {
  const home = !tiles
  const copy = home ? integrations : { eyebrow, title, body }
  return (
    <section className="section">
      <div className="container">
        <div className={home ? 'grid grid-cols-12 justify-between' : 'grid grid-cols-12'}>
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow mb-4">{copy.eyebrow}</p>
            <h2 className="heading-2 text-ink-950">{copy.title}</h2>
            <p className="mt-4 text-base text-ink-950">{copy.body}</p>
            {home ? (
              <div className="mt-4">
                <a href="#" className="button primary medium">
                  {integrations.cta}
                </a>
              </div>
            ) : (
              <Btn cta={cta} variant="primary" size="medium" className="mt-4" />
            )}
          </div>
          <div className="col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{home ? homeTiles() : tiles.map(pageTile)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function homeTiles() {
  return integrations.tiles.map((name, i) => (
    <SiteLink
      key={name}
      to={platformRoutes[i]}
      className="flex flex-row items-center gap-2 rounded-2xl border border-ink-200 px-6 py-5 transition-all duration-300 ease-standard hover:border-ink-400 max-md:py-[15px]"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl">
        <img
          src={assets.integrations[i]}
          alt=""
          width={30}
          height={30}
          loading="lazy"
          className="h-[30px] max-w-[30px] rounded-2xl object-contain"
        />
      </span>
      <span className="text-xl font-semibold text-ink-950 lg:text-2xl">{name}</span>
    </SiteLink>
  ))
}

function pageTile(t) {
  return (
    <SiteLink
      key={t.label}
      to={t.to || '/product/integrations'}
      className="flex items-center gap-2 rounded-2xl border border-ink-200 px-6 py-5 transition-all duration-300 ease-standard hover:border-ink-400"
    >
      <Img a={t.icon} alt="" className="size-[30px] rounded-2xl object-contain md:size-10" />
      <span className="font-display text-xl font-semibold text-ink-950 lg:text-2xl">{t.label}</span>
    </SiteLink>
  )
}
