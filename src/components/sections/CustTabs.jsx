import useTabs from '../../hooks/useTabs'
import { QuoteSmall } from '../icons'
import { Btn, Img } from './parts'
import { LightTabList } from './TabsLight'

// N-cust-tabs (specs/T1-T4.md A): customer-story tabs. Left-aligned light tabs labelled with
// customer names; panel = logo + heading-3 + button (>=1024) | quote card + 2 stat cards.
// Below 1024 the card row scrolls horizontally and a full-width button follows it.
// Instant swap, no autoplay, no reveal.
export default function CustTabs({ title, body, stories }) {
  const t = useTabs(stories.length, 'horizontal')
  const s = stories[t.selected]
  return (
    <section className="section">
      <div className="container">
        <div className="mb-12">
          <h2 className="heading-2 text-ink-950">{title}</h2>
          {body && <p className="pt-4 text-base text-ink-950">{body}</p>}
        </div>
        <LightTabList labels={stories.map((x) => x.name)} tabs={t} className="mb-12 lg:mb-10" />
        <div {...t.panelProps} className="grid-container items-start">
          <div className="col-span-full lg:col-span-4">
            <Img a={s.logo} className="mb-6 h-[45px] w-[100px] object-contain object-left md:mb-0 md:h-[100px] md:w-[130px]" />
            <h3 className="heading-3 text-ink-950">{s.headline}</h3>
            {/* some pages add a short summary under the headline (semantic-layer, data-trust, helixa) */}
            {s.summary && <p className="mt-4 text-base text-ink-950">{s.summary}</p>}
            <Btn cta={s.cta} variant="primary" size="medium" className="mt-8 hidden lg:inline-flex" />
          </div>
          <div className="col-span-full lg:col-span-8">
            <div className="flex flex-row gap-6 overflow-scroll lg:items-start lg:overflow-visible">
              <div className="w-full min-w-[400px] grow rounded-2xl lg:min-w-[auto] border border-ink-200 bg-blur p-6 backdrop-blur-md md:w-1/2 lg:p-10">
                <QuoteSmall className="mb-10 text-ink-950 lg:mb-20" />
                <p className="lead text-ink-950">{s.quote}</p>
                <p className="mt-10 text-sm text-ink-950">
                  {s.person}, <span className="text-ink-500">{s.role}</span>
                </p>
              </div>
              <div className="flex w-full flex-row gap-6 md:w-1/2 lg:flex-col lg:items-start">
                {s.stats.map((st) => (
                  <div
                    key={st.label}
                    className="flex w-full flex-col justify-between rounded-2xl border border-ink-200 bg-blur p-10 backdrop-blur-md"
                  >
                    <p className="font-sans text-metric font-normal text-ink-950 lg:text-stat-lg">{st.number}</p>
                    <p className="lead mt-6 text-ink-950">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <Btn cta={s.cta} variant="primary" size="medium" className="mt-6 w-full lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
