import { Btn, Img } from './parts'

// C-7 N-cert-list (specs/T12-T13.md): left half heading-2 + 2 paragraphs + primary medium button
// (mt-8); right half 3 items (24 icon mt-1.5, heading-4 mb-6, paragraph, tertiary medium button
// mt-4 w-fit), gap-y-8. No reveal.
export default function CertList({ title, paragraphs, cta, items }) {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-4">
          <div className="lg:w-1/2">
            <h2 className="heading-2 mb-4 text-ink-950">{title}</h2>
            {paragraphs.map((p) => (
              <p key={p} className="mb-4 text-base text-ink-950 last-of-type:mb-0">
                {p}
              </p>
            ))}
            <Btn cta={cta} variant="primary" size="medium" className="mt-8" />
          </div>
          <div className="flex flex-col gap-y-8 lg:w-1/2">
            {items.map((it) => (
              <div key={it.title} className="flex items-start gap-4">
                <Img a={it.icon} className="mt-1.5 size-6 shrink-0 object-contain" />
                <div className="w-3/4 lg:w-full">
                  <h3 className="heading-4 mb-6 text-ink-950">{it.title}</h3>
                  <p className="text-base text-ink-950">{it.body}</p>
                  <Btn cta={it.cta} variant="tertiary" size="medium" className="mt-4 w-fit" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
