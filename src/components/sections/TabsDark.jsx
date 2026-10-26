import useTabs from '../../hooks/useTabs'
import Baton from './Baton'
import { Img } from './parts'

// N-tabs-dark (specs/T1-T4.md A): dark vertical-tab feature showcase.
// >=1024: vertical tablist on bg-blur-dark, 3px orange bar on the active tab, description only in
// the active tab. <1024: horizontal scroll strip with a 2px bottom bar; the panel shows its own
// title + description above the media. Instant panel swap, no autoplay, no reveal.
// Keyboard: like the original, aria-orientation stays "horizontal" at every width (ArrowLeft/Right
// move focus and select, Home/End jump; ArrowUp/Down do nothing) even though the list is vertical >=1024.
// T12-T13 (specs/T12-T13.md B): optional `eyebrow` (#9786ff); no `body` -> the tablist sits 48 below
// the h2; `stroke` replaces the idle S6 with a drawing stroke (what-is-lattice S2) or another shape
// ('S9' analyst, mobile only); `stroke: null` = none (assistant); `wide` = 16:9 media with no radius.
export default function TabsDark({ eyebrow, title, body, tabs, gradient = 'gradient-01', stroke = 'S6', wide = false, caption = true }) {
  const { selected, listProps, tabProps, panelProps } = useTabs(tabs.length, 'horizontal')
  const active = tabs[selected]
  return (
    <section className="relative z-5 overflow-hidden bg-ink-950 py-20 text-white md:py-16 lg:py-30">
      {stroke && <Baton shape={stroke} gradient={gradient} dark idle={stroke === 'S6'} />}
      <div className="container relative z-10">
        <div className="grid-container items-center">
          <div className="col-span-full lg:col-span-5">
            {eyebrow && <p className="eyebrow mb-4 text-purple-400">{eyebrow}</p>}
            <h2 className={`heading-2 text-white ${body ? 'mb-4' : ''}`}>{title}</h2>
            {body && <p className="text-base text-white">{body}</p>}
            <div
              {...listProps}
              className="mt-8 flex flex-row overflow-x-auto md:mt-12 lg:flex-col lg:overflow-visible lg:bg-blur-dark lg:backdrop-blur-md"
            >
              {tabs.map((t, i) => {
                const on = i === selected
                return (
                  <button
                    key={t.title}
                    {...tabProps(i)}
                    className={`group relative shrink-0 cursor-pointer px-6 pt-4 text-left lg:w-full ${
                      on
                        ? 'after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:bg-orange-600 lg:after:bottom-0 lg:after:top-0 lg:after:h-full lg:after:w-[3px]'
                        : ''
                    }`}
                  >
                    <div className="border-b border-inverse-line pb-4">
                      <span
                        className={`block text-nowrap text-base font-medium transition-all duration-150 ease-standard group-hover:text-white lg:text-wrap lg:font-display lg:text-2xl lg:font-semibold lg:tracking-display ${
                          on ? 'text-white' : 'text-inverse-tertiary'
                        }`}
                      >
                        {t.title}
                      </span>
                      {on && <p className="mt-4 hidden text-base font-medium text-ink-100 lg:block">{t.body}</p>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          <div {...panelProps} className="col-span-full lg:col-span-6 lg:col-start-7">
            <div className="mb-12 mt-6 lg:hidden">
              <p className="font-display text-2xl font-normal text-white">{active.title}</p>
              <p className="mt-4 text-base text-white">{active.body}</p>
            </div>
            <div className="rounded-2xl border border-inverse-line bg-blur-dark p-6 backdrop-blur-md">
              {/* the original's frame ends with an empty caption <p>, so the image keeps its mb-6 (636 tall);
                  `caption: false` (analyst) has no caption and a 612-tall frame */}
              <div className={caption ? 'mb-6' : ''}>
                <Img a={active.media} className={`block h-auto w-full ${wide ? '' : 'rounded-2xl'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
