import { assets } from '../assets'
import { ui } from '../content'

// CLONE_SPEC 2.4: 8 logos x 3 copies, 184px pitch, slider 30s linear infinite.
const items = [...assets.marquee, ...assets.marquee, ...assets.marquee]

export default function LogoMarquee() {
  return (
    <section className="relative z-5 -mt-[85px] bg-white py-12 md:py-16" aria-label={ui.logosLabel}>
      <div className="container max-w-marquee overflow-x-hidden">
        <div className="flex min-w-max translate-x-[-2%] animate-slider flex-nowrap items-center justify-center">
          {items.map((logo, i) => (
            <div
              key={i}
              className="relative mx-8 my-4 flex h-10 w-full max-w-[120px] shrink-0 basis-[120px] items-center"
              aria-hidden={i >= assets.marquee.length}
            >
              <img
                src={logo.src}
                alt={i < assets.marquee.length ? logo.alt : ''}
                width={120}
                height={logo.height}
                loading="lazy"
                className="max-h-[40px] w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
