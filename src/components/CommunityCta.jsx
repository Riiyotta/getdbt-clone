import { community as homeCommunity } from '../content'
import { reveal, revealRootProps } from '../hooks/useScrollReveal'
import SiteLink from './SiteLink'

// CLONE_SPEC 2.15: gradient-12 + grain (::before) + concentric circles (::after).
// Reveal structure mirrors the original's 19 targets: the container is the observed (non-animated)
// root; nested stagger steps of 100ms. The <span> wrappers are inline like the original's, so only
// their opacity animates; the two CTA spans are flex items (blockified) and also translate.
// Reused as the T2/T4 "H-cta long" band: pass `content` (same shape as content.community) and
// optional `primaryTo` / `secondaryTo`; the homepage renders it with the defaults ("#" links).
export default function CommunityCta({ content: community = homeCommunity, primaryTo = '#', secondaryTo = '#' }) {
  return (
    <section className="gradient-container gradient-12 circle-bg relative z-5 overflow-hidden py-12 text-white md:py-16">
      <div {...revealRootProps} className="container relative z-10">
        <div {...reveal(0, 'grid-container gap-0')}>
          <div {...reveal(0, 'col-span-full md:col-span-4 lg:col-span-7')}>
            <span {...reveal(0)}>
              <p className="eyebrow mb-4 text-white">{community.eyebrow}</p>
            </span>
            <span {...reveal(100)}>
              <h2 className="heading-2 mb-4 text-white">{community.title}</h2>
            </span>
            <span {...reveal(200)}>
              <p className="text-base text-white">{community.body}</p>
            </span>
            <div {...reveal(300, 'mt-8 flex flex-col items-center gap-3 md:flex-row')}>
              <span {...reveal(300)}>
                <SiteLink to={primaryTo} className="button primary dark large">
                  {community.primary}
                </SiteLink>
              </span>
              <span {...reveal(400)}>
                <SiteLink to={secondaryTo} className="button secondary dark large">
                  {community.secondary}
                </SiteLink>
              </span>
            </div>
          </div>
          <div {...reveal(100, 'col-span-full mt-8 md:col-span-3 md:col-end-9 md:mt-0 lg:col-span-4 lg:col-end-13')}>
            <div
              {...reveal(
                100,
                'space-y-6 border-t border-ink-200 pt-8 md:border-l md:border-t-0 md:pl-[60px] md:pt-0',
              )}
            >
              {community.stats.map((s, i) => (
                <div key={s.label} {...reveal(100 + i * 100)}>
                  <span {...reveal(100 + i * 100)}>
                    <p className="font-display tracking-display text-stat font-normal text-white">{s.number}</p>
                  </span>
                  <span {...reveal(200 + i * 100)}>
                    <p className="text-lg text-white">{s.label}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
