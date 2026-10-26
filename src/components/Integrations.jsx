import { assets } from '../assets'
import { integrations } from '../content'
import SiteLink from './SiteLink'

// tiles follow content.integrations.tiles order: Northwind, Quarry, Helixa, Stratus, Driftway, Cobalt DB
const platformRoutes = ['northwind', 'quarry', 'helixa', 'stratus', 'driftway', 'cobalt'].map((s) => `/data-platforms/${s}`)

// CLONE_SPEC 2.10
export default function Integrations() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-12 justify-between">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow mb-4">{integrations.eyebrow}</p>
            <h2 className="heading-2 text-ink-950">{integrations.title}</h2>
            <p className="mt-4 text-base text-ink-950">{integrations.body}</p>
            <div className="mt-4">
              <a href="#" className="button primary medium">
                {integrations.cta}
              </a>
            </div>
          </div>
          <div className="col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {integrations.tiles.map((name, i) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
