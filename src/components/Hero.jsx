import { hero } from '../content'

// CLONE_SPEC 2.3. The hidden video thumbnail and the brush-stroke layer are intentionally not built.
// No scroll/load reveal here: on the original the hero h1, lead and CTA are static (opacity 1 from 0ms).
export default function Hero() {
  return (
    <header className="relative z-5 overflow-hidden bg-white py-12 md:py-16">
      <div className="container">
        <div className="relative z-10">
          <div className="relative text-center">
            <div className="grid-container">
              <div className="col-span-full flex flex-col items-center">
                <h1 className="heading-1 text-ink-950">
                  {hero.h1[0]}
                  <br />
                  {hero.h1[1]}
                </h1>
                <p className="lead mt-6 text-ink-950">
                  {hero.sub[0]}
                  <br />
                  {hero.sub[1]}
                </p>
                <div className="mt-10 w-full md:w-auto">
                  <a href="#" className="button primary large">
                    {hero.cta}
                  </a>
                </div>
                {/* Spacer standing in for the hidden video-link wrapper: the measured header is
                    48px (>=768) / 32px (<768) taller than its visible content. */}
                <div aria-hidden="true" className="h-8 md:h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
