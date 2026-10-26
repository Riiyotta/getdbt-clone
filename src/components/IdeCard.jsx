import { assets } from '../assets'
import { ide } from '../content'
import { reveal } from '../hooks/useScrollReveal'

// CLONE_SPEC 2.13. The whole card is one clickable block.
export default function IdeCard() {
  return (
    <section className="section">
      <div className="container">
        <div {...reveal(0, 'relative z-10', true)}>
          <button type="button" className="block w-full rounded-2xl text-left font-medium">
            <div className="gradient-container gradient-26 flex flex-col gap-8 overflow-hidden rounded-2xl p-10 text-ink-50 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative z-10 lg:w-1/2">
                <h2 className="heading-2 mb-4 max-w-[824px] text-ink-50">{ide.title}</h2>
                <p className="max-w-[612px] text-base font-medium text-ink-50">{ide.body}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-1/2">
                {ide.tiles.map((t) => (
                  <div
                    key={t.label}
                    className="relative z-10 flex items-center gap-4 text-nowrap rounded-xl bg-white p-6 transition-all duration-150 hover:bg-ink-50"
                  >
                    <img src={assets.ideIcons[t.icon]} alt="" width={40} height={40} loading="lazy" className="size-10 shrink-0" />
                    <span className="text-lg font-medium text-ink-950 md:text-xl">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
