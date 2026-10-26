import useTabs from '../../hooks/useTabs'
import { Img } from './parts'

// Light tab row shared by N-tabs-light (centred) and N-cust-tabs (left-aligned): 16/24 500 labels,
// active #030711 + 2px orange bottom bar, inactive #6a7282, hairline under the row.
// T12-T13: `grow` = flex-grow tabs filling the row (course, photo tabs); `icons` = a 24px icon before
// each label inside an inline-flex gap-2 (persona tabs).
export function LightTabList({ labels, tabs, center = false, className = '', grow = false, icons }) {
  const { selected, listProps, tabProps } = tabs
  return (
    <div
      {...listProps}
      className={`flex flex-row gap-6 border-b max-md:overflow-x-auto border-ink-200 ${center ? 'md:justify-center' : ''} ${className}`}
    >
      {labels.map((label, i) => (
        <button
          key={label}
          {...tabProps(i)}
          className={`relative shrink-0 cursor-pointer text-nowrap px-4 py-2 text-base font-medium ${grow ? 'flex-grow' : ''} ${
            i === selected
              ? 'text-ink-950 after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:bg-orange-600'
              : 'text-ink-500'
          }`}
        >
          {icons ? (
            <span className="inline-flex items-center gap-2">
              <Img a={icons[i]} className="size-6 object-contain" />
              {label}
            </span>
          ) : (
            label
          )}
        </button>
      ))}
    </div>
  )
}

// N-tabs-light (specs/T1-T4.md A): centred tabbed media (T2). Instant swap, no autoplay, no reveal.
export default function TabsLight({ tabs }) {
  const t = useTabs(tabs.length, 'horizontal')
  const active = tabs[t.selected]
  return (
    <section className="section">
      <div className="container">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-10 lg:col-start-2">
            <LightTabList labels={tabs.map((x) => x.label)} tabs={t} center className="mb-12 lg:mb-10" />
            <div {...t.panelProps} className="text-center">
              {active.lead && <p className="lead mb-6 font-bold text-ink-950">{active.lead}</p>}
              <p className="lead mb-6 text-ink-950">{active.body}</p>
              {/* empty caption <p> follows on the original, so the image keeps its mb-6 */}
              <div className="mb-6">
                <Img a={active.media} className="mx-auto block h-auto max-w-full rounded-2xl md:max-w-[600px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
