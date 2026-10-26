import { useRef, useState } from 'react'
import { ui } from '../../../content'
import { ArrowLeft, ArrowRight } from '../../icons'
import { Btn } from '../../sections/parts'
import { InfoTip, MatrixCheck, PlanCheck, Runs } from './parts'

// ---------------------------------------------------------------- T14-0 pricing.plan-cards
// H1 48/57.6 600 at every width (not the heading-1 64 step), p mt-2; 4 equal-height cards
// (r16, 1px #e5e7eb, transparent, p-6), 4 x 294 at 1440 with gap 24, stacked below 1024.
// No highlighted plan, no hover.
export function PlanCards({ title, body, plans }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="font-display text-[48px] font-semibold leading-[57.6px] tracking-display text-ink-950">{title}</h1>
        <p className="mt-2 text-base text-ink-950">{body}</p>
        <div className="flex flex-col gap-6 pt-6 lg:grid lg:grid-cols-4">
          {plans.map((p) => (
            <div key={p.name} className="h-full rounded-2xl border border-ink-200 p-6">
              <div className="mb-2">
                <div className="mb-4 flex justify-between gap-3">
                  <h3 className="font-mono text-base font-medium leading-[19.2px] text-purple-600">{p.name}</h3>
                </div>
                <p className="text-base text-ink-950">{p.body}</p>
              </div>
              <div className="pb-3">
                <span className="font-display text-[24px] font-semibold leading-[28.8px] tracking-display text-ink-950">{p.price}</span>
              </div>
              <ul>
                {p.allowances.map((a) => (
                  <li key={a} className="mb-2 flex gap-2 text-sm">
                    {a}
                  </li>
                ))}
              </ul>
              <div className="my-6">
                <Btn cta={p.cta} className="!w-full" />
              </div>
              <h4 className="heading-4 mb-5 text-ink-950">{p.featuresTitle}</h4>
              <ul>
                {p.features.map((f) => (
                  <li key={f} className="mb-4 flex gap-2 text-sm">
                    <PlanCheck />
                    <span className="pt-0.5">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T14-1 pricing.add-ons
export function AddOns({ title, body, cards }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 mb-0 text-ink-950">{title}</h2>
        <div className="mt-6 max-w-3xl">
          <p className="text-base text-ink-950">
            <Runs runs={body} underline />
          </p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="flex flex-col justify-between gap-10 rounded-2xl border border-ink-200 bg-white/70 p-6 backdrop-blur-xl md:p-10"
            >
              <div className="flex flex-col gap-4">
                <h3 className="heading-4 text-ink-950">{c.title}</h3>
                <p className="mb-6 text-base text-ink-800">{c.p1}</p>
                <p className="text-base text-ink-800">{c.p2}</p>
                <ul className="flex flex-col gap-4">
                  {c.items.map((runs, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <PlanCheck />
                      <p className="text-sm text-ink-950">
                        <Runs runs={runs} />
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <Btn cta={c.primary} variant="primary" />
                <Btn cta={c.secondary} variant="secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T14-2 comparison.plan-matrix
function Value({ v }) {
  if (v === true) return <MatrixCheck />
  if (!v) return null
  return <span className="block text-center text-base font-normal">{v}</span>
}

// One group table. `col` = index of the single value column shown (mobile), or null for all 4.
function GroupTable({ group, heads, col = null }) {
  const cols = col === null ? [0, 1, 2, 3] : [col]
  return (
    <div className="mb-10">
      <div className="font-display text-2xl font-semibold tracking-display text-ink-950">{group.title}</div>
      <div className="overflow-x-auto p-3 lg:pt-0">
        <table className="w-full border-collapse">
          {col === null && (
            <thead className="max-lg:hidden">
              <tr>
                <th aria-hidden="true" />
                {heads.map((h) => (
                  <th key={h.name} scope="col" className="heading-5 min-w-[173px] pb-5 pt-3 text-center text-ink-950">
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="rounded-2xl bg-white shadow-tbody">
            {group.rows.map((r) => (
              <tr key={r.f} className="odd:bg-ink-50">
                <th scope="row" className="rounded-l-xl px-6 py-3 text-left font-normal">
                  <div className="inline text-base font-medium text-ink-950">{r.f}</div>
                  {r.tip && <InfoTip text={r.tip} label={r.f} />}
                </th>
                {cols.map((c, i) => (
                  <td
                    key={c}
                    className={`px-6 py-3 text-ink-950 ${i === cols.length - 1 ? 'rounded-r-xl' : ''} ${
                      col === null ? 'w-[173px]' : 'w-[161px] md:w-[173px]'
                    }`}
                  >
                    <Value v={r.v[c]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PlanHead({ h, mobile = false }) {
  return (
    <div className={`flex flex-col items-center gap-4 ${mobile ? 'mx-auto w-[85%]' : 'w-[173px] px-3'}`}>
      <h4 className={`font-display font-semibold leading-none tracking-display text-ink-950 ${mobile ? 'text-[20px]' : 'text-[24px]'}`}>
        {h.name}
      </h4>
      <span className="text-sm text-ink-950">{h.price}</span>
      <Btn cta={h.cta} className="!w-full" />
    </div>
  )
}

const DRAG = 50
const SLIDE = 'transition-transform duration-400 ease-slider'

// Below 1024: two synced sliders (plan picker, draggable; tables, not draggable). One plan at a
// time; 400ms cubic-bezier(.25,1,.5,1) (Splide timing measured on T15; not timed on this page).
function MatrixSlider({ heads, groups }) {
  const [index, setIndex] = useState(0)
  const [dx, setDx] = useState(0)
  const [drag, setDrag] = useState(false)
  const start = useRef(0)
  const last = heads.length - 1
  const go = (i) => setIndex(Math.max(0, Math.min(last, i)))
  const end = () => {
    if (!drag) return
    if (dx < -DRAG) go(index + 1)
    else if (dx > DRAG) go(index - 1)
    setDrag(false)
    setDx(0)
  }
  const track = (extra = 0) => ({ transform: `translateX(calc(${-index * 100}% + ${extra}px))` })
  return (
    <div className="block lg:hidden">
      <div className="overflow-hidden">
        <div
          className={`flex touch-pan-y select-none ${drag ? '' : SLIDE}`}
          style={track(dx)}
          onPointerDown={(e) => {
            if (e.button !== 0 || e.target.closest('a,button')) return
            start.current = e.clientX
            setDrag(true)
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => drag && setDx(e.clientX - start.current)}
          onPointerUp={end}
          onPointerCancel={end}
        >
          {heads.map((h, i) => (
            <div key={h.name} className="flex h-28 w-full shrink-0 items-center" aria-hidden={i !== index}>
              <PlanHead h={h} mobile />
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-11 items-center justify-between">
        <ul className="flex gap-2 pl-[52px]">
          {heads.map((h, i) => (
            <li key={h.name} className="flex">
              <button
                type="button"
                aria-label={`${ui.goToSlide} ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`block h-1 w-3.5 rounded-2xl ${i === index ? 'bg-purple-600' : 'bg-dot'}`}
              />
            </li>
          ))}
        </ul>
        <div className="flex gap-3.5">
          {[
            [ui.prevSlide, -1, ArrowLeft],
            [ui.nextSlide, 1, ArrowRight],
          ].map(([label, d, Icon]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled={index + d < 0 || index + d > last}
              onClick={() => go(index + d)}
              className="flex size-[19px] items-center justify-center text-ink-950 disabled:opacity-30"
            >
              <Icon width={19} height={19} className="shrink-0" />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 overflow-hidden">
        <div className={`flex items-start ${SLIDE}`} style={track()}>
          {heads.map((h, i) => (
            <div key={h.name} className="w-full shrink-0" aria-hidden={i !== index}>
              {groups.map((g) => (
                <GroupTable key={g.title} group={g} heads={heads} col={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PlanMatrix({ title, heads, groups }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 mb-8 text-ink-950">{title}</h2>
        <div className="relative hidden lg:block">
          {/* sticky plan header: pins at viewport top 0 for the length of the wrapper; z-10 under the
              global nav (z-60), which slides back over it on scroll up */}
          <div className="sticky top-0 z-10 flex justify-end bg-white px-3 py-4">
            {heads.map((h) => (
              <PlanHead key={h.name} h={h} />
            ))}
          </div>
          {groups.map((g) => (
            <GroupTable key={g.title} group={g} heads={heads} />
          ))}
        </div>
        <MatrixSlider heads={heads} groups={groups} />
      </div>
    </section>
  )
}
