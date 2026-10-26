import useTabs from '../../hooks/useTabs'
import SiteLink from '../SiteLink'
import { ChevronRight24 } from '../icons'
import { Btn, Img } from './parts'
import { LightTabList } from './TabsLight'

// C-8 N-course-tabs (specs/T12-T13.md): left 4 cols (eyebrow, heading-2, paragraph, primary large
// button hidden below 768) | right 8 cols: flex-grow light tabs, panel 40 below with course cards
// (1px #e5e7eb, r16, p-6; 16:9 image 334 wide r16 | tag chip + duration, heading-4, paragraph,
// full-width link with a chevron that shifts 6px on hover). Instant switch, no reveal.
export default function CourseTabs({ id, eyebrow, title, body, cta, tabs }) {
  const t = useTabs(tabs.length, 'horizontal')
  const active = tabs[t.selected]
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="grid-container">
          <div className="col-span-4 flex flex-col items-start gap-y-4 sm:col-span-8 lg:col-span-4">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="heading-2 text-ink-950">{title}</h2>
            <p className="text-base text-ink-950">{body}</p>
            <Btn cta={cta} variant="primary" size="large" className="hidden md:inline-flex" />
          </div>
          <div className="col-span-full lg:col-span-8">
            <LightTabList labels={tabs.map((x) => x.label)} tabs={t} center grow />
            <div {...t.panelProps} className="mt-10 flex flex-col gap-6">
              {active.courses.map((c) => (
                <article
                  key={c.title}
                  className="flex flex-col items-center gap-6 rounded-2xl border border-ink-200 p-6 sm:flex-row"
                >
                  <Img a={c.image} className="aspect-video w-full rounded-2xl object-cover md:max-w-[334px]" />
                  <div className="flex w-full flex-col items-start gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="rounded-badge bg-purple-100 p-1 font-mono text-xs font-medium text-purple-600">{c.tag}</span>
                      <span className="text-sm/[21px] text-ink-950">{c.duration}</span>
                    </div>
                    <h3 className="heading-4 text-ink-950">{c.title}</h3>
                    <p className="text-base text-ink-950">{c.body}</p>
                    <SiteLink to={c.cta.to} className="group block w-full">
                      <span className="mt-10 flex justify-between text-base text-ink-950">
                        {c.cta.label}
                        <ChevronRight24 className="shrink-0 transition-all group-hover:translate-x-1.5" />
                      </span>
                    </SiteLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
