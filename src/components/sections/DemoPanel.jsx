import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import { Btn, Img } from './parts'

// C-16 N-demo-panel (specs/T12-T13.md): gradient demo row. Section: no top padding at >=1024,
// 48 sides/bottom at >=768; below 768 no vertical padding and an 8px #030711 bottom rule between
// panels. Panel: gradient-12 / gradient-02 container (r16 at >=768, clipped at >=1024) with grain;
// text 4 cols (md:p-12 xl:px-16: small eyebrow, heading-3, paragraph, primary.dark medium button
// mt-8) and media 8 cols sitting on the panel's bottom edge (r8, max-h 550). `mediaLeft` swaps the
// order. Reveal: first column 0, second column 200 (media inner +200).
export default function DemoPanel({ gradient, eyebrow, title, body, cta, media, mediaLeft = false }) {
  const first = mediaLeft ? 'media' : 'text'
  const at = (col) => (col === first ? 0 : 200)
  const text = (
    <div key="text" {...reveal(at('text'), 'col-span-full md:p-12 lg:col-span-4 xl:px-16')}>
      <p className="eyebrow-sm mb-4 text-white">{eyebrow}</p>
      <h3 className="heading-3 mb-4 text-white">{title}</h3>
      <p className="text-base text-white">{body}</p>
      <Btn cta={cta} variant="primary dark" size="medium" className="mt-8" />
    </div>
  )
  const mediaCol = (
    <div key="media" {...reveal(at('media'), 'col-span-full mt-8 self-end md:mt-0 lg:col-span-8')}>
      <div {...reveal(at('media') + 200)}>
        <Img a={media} className="block max-h-[550px] w-full rounded-lg" />
      </div>
    </div>
  )
  return (
    <section className="relative z-5 bg-white max-md:border-b-8 max-md:border-ink-950 md:p-12 lg:pt-0">
      <div className={`gradient-container ${gradient} container relative p-12 md:rounded-2xl md:p-0 lg:overflow-hidden`}>
        <div {...revealRootProps} className="relative z-10 items-center justify-between md:grid-container">
          {mediaLeft ? [mediaCol, text] : [text, mediaCol]}
        </div>
      </div>
    </section>
  )
}
