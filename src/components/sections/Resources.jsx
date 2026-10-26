import SiteLink from '../SiteLink'
import { Img, SectionHeader } from './parts'

// N-resources (specs/T1-T4.md A): resource cards row. Card = 16:9 image link -> tag chip (32px
// below, own row) -> heading-4 title link (my-3, hover underline) -> optional paragraph (mb-3). Variants by content:
// T3 tag + title only; T4 "customer stories" title only (2 cards at 612 or 3 at 400);
// cost-optimization 4 columns. Reveal: header span at 0ms only.
export default function Resources({ eyebrow, title, body, cards }) {
  const cols = cards.length === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className={`mt-12 grid gap-10 md:mt-20 md:gap-6 ${cols}`}>
          {cards.map((c) => (
            <div key={c.title}>
              <SiteLink to={c.to} className="relative block aspect-video overflow-hidden rounded-2xl" tabIndex={-1} aria-hidden="true">
                <Img a={c.image} alt="" className="h-full w-full rounded-2xl object-cover" />
              </SiteLink>
              {c.tag ? (
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="rounded-badge bg-purple-100 p-1 font-mono text-xs font-medium text-purple-600">{c.tag}</span>
                </div>
              ) : null}
              <h3 className="heading-4 my-3 text-ink-950">
                <SiteLink to={c.to} className="hover:underline">
                  {c.title}
                </SiteLink>
              </h3>
              {c.body && <p className="mb-3 text-base text-ink-950">{c.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
