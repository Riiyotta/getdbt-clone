import { Img, RichText } from './parts'

// C-5 N-compliance (specs/T12-T13.md): badge + text rows. Centred heading-2, rows gap-12: badge
// column (1/4, centred, natural size, no radius) + text column (3/4): heading-3 !mb-3 + prose with
// inline #632ff5 links. White section (the original's bg class computes transparent). No reveal.
export default function Compliance({ title, rows }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 text-center text-ink-950">{title}</h2>
        <div className="mt-12 flex flex-col gap-12">
          {rows.map((r) => (
            <div key={r.title} className="flex flex-wrap justify-between">
              <div className="mb-8 flex w-full justify-center md:mb-0 md:w-1/4 md:pr-4">
                <Img a={r.badge} className="block h-auto max-w-full self-start" />
              </div>
              <div className="w-full md:w-3/4 md:pl-4">
                <h3 className="heading-3 !mb-3 text-ink-950">{r.title}</h3>
                <p className="text-base text-ink-950">
                  <RichText runs={r.body} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
