import { assets } from '../assets'
import { news } from '../content'
import { reveal } from '../hooks/useScrollReveal'
import { ArrowRight } from './icons'

// CLONE_SPEC 2.5
export default function NewsBand() {
  return (
    <section className="relative z-5 bg-ink-950 !py-10 text-white">
      <div className="container">
        {/* original: a single ScrollAnimate wrapper (relative z-10), observed itself, delay 0 */}
        <div {...reveal(0, 'relative z-10 flex flex-col items-start gap-6', true)}>
          <div>
            <img
              src={assets.newsLockup.src}
              alt={assets.newsLockup.alt}
              width={326}
              height={71}
              loading="lazy"
              className="block h-[70.6px] w-[326px] max-w-full"
            />
            <h2 className="heading-3 mt-8 text-white">{news.headline}</h2>
          </div>
          <div>
            <a href="#" className="button tertiary dark medium w-auto pl-0 hover:bg-transparent">
              {news.link}
              <ArrowRight width={21} height={21} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
