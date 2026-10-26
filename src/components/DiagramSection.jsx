import { assets } from '../assets'
import { cost } from '../content'
import { reveal, revealRootProps } from '../hooks/useScrollReveal'

// CLONE_SPEC 2.12
export default function DiagramSection() {
  return (
    <section className="section">
      <div className="container">
        <div {...revealRootProps} className="grid-container items-center">
          <div {...reveal(0, 'col-span-full md:col-span-4 lg:col-span-6')}>
            <p {...reveal(0, 'eyebrow mb-4')}>{cost.eyebrow}</p>
            <h2 {...reveal(100, 'heading-2 mb-4 text-ink-950')}>{cost.title}</h2>
            <p {...reveal(200, 'text-base text-ink-950')}>{cost.body}</p>
            <div {...reveal(300, 'mt-8 flex gap-3')}>
              <a href="#" {...reveal(300, 'button primary medium')}>
                {cost.cta}
              </a>
            </div>
          </div>
          <div {...reveal(200, 'col-span-full max-md:order-first md:col-span-4 lg:col-span-6')}>
            <div {...reveal(200)}>
              <img
                src={assets.diagram.src}
                alt={assets.diagram.alt}
                width={assets.diagram.width}
                height={assets.diagram.height}
                loading="lazy"
                {...reveal(200, 'mx-auto block h-auto w-full max-w-[555px] rounded-2xl')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
