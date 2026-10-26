import { reveal } from '../../hooks/useScrollReveal'
import { Btn } from './parts'

// N-cta-card (specs/T1-T4.md A): gradient-05 card with grain, primary.dark large + optional
// tertiary.dark large. Reveal: the inner relative z-10 block fades up at 0ms.
export default function CtaCard({ title, body, primary, tertiary }) {
  return (
    <section className="section">
      <div className="container">
        <div className="gradient-container gradient-05 overflow-hidden rounded-2xl bg-center p-10 text-ink-50">
          <div {...reveal(0, 'relative z-10', true)}>
            <h2 className="heading-2 mb-4 max-w-[824px] text-ink-50">{title}</h2>
            <p className="max-w-[612px] text-base text-ink-50">{body}</p>
            <div className="mt-10 flex flex-col gap-3 md:flex-row">
              <Btn cta={primary} variant="primary dark" size="large" />
              <Btn cta={tertiary} variant="tertiary dark" size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
