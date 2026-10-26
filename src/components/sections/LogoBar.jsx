import { Img } from './parts'

// C-11 N-logo-bar (specs/T12-T13.md): centred heading-5 + a row of 6 wordmarks (120 max, 40 max
// tall, mx-8 my-4); wraps to 3 per row at 768 and 1 per row below 640. No reveal.
export default function LogoBar({ title, logos }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-5 mb-6 text-center text-ink-950">{title}</h2>
        <div className="flex flex-wrap items-center justify-center lg:flex-nowrap">
          {logos.map((l) => (
            <div key={l.alt} className="relative mx-8 my-4 w-full max-w-[120px]">
              <Img a={l} className="mx-auto block h-auto max-h-[40px] w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
