import { reveal } from '../../hooks/useScrollReveal'
import { Btn } from './parts'

// C-3 N-news-band (specs/T12-T13.md): dark announcement strip, py-10. Inner block fades up at 0ms:
// eyebrow #9786ff, heading-3-styled h2, paragraph (space-y-8) + secondary.dark large button.
export default function NewsStrip({ eyebrow, title, body, cta }) {
  return (
    <section className="relative z-5 bg-ink-950 py-10 text-white">
      <div className="container">
        <div {...reveal(0, 'relative z-10', true)}>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
            <div className="space-y-8">
              <p className="eyebrow text-purple-400">{eyebrow}</p>
              <h2 className="heading-3 text-white">{title}</h2>
              <p className="text-base text-white">{body}</p>
            </div>
            <Btn cta={cta} variant="secondary dark" size="large" className="shrink-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
