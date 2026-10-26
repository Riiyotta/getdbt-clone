import { useEffect, useId, useRef, useState } from 'react'
import SiteLink from '../SiteLink'
import { ChevronDown, PinIcon } from '../icons'
import { Btn } from './parts'

// C-4 N-jobs (specs/T12-T13.md): open roles grouped by department with an instant filter.
// >=1024: a 264-wide button list (14/20, 4 radius, px-4 py-2; active and hover #fe6703), not sticky.
// <1024: a single-select dropdown (400 wide at >=768, 12 radius, 1px #d1d5dc) built as a listbox.
// List (9 cols): groups gap-y-12; group = tag chip (mb-6 ml-4) + rows (gap-y-6); row = heading-4
// link (hover underline) + pin + location | secondary medium "apply" button; 1px #e5e7eb divider
// except on a group's last row. Filtering swaps groups instantly (no animation, no scroll, no URL
// change). No reveal.
function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const base = useId()
  const btn = useRef(null)
  const list = useRef(null)
  const current = options.findIndex((o) => o.value === value)

  useEffect(() => {
    if (!open) return undefined
    setActive(Math.max(0, current))
    list.current?.focus()
    const onDoc = (e) => {
      if (!list.current?.contains(e.target) && !btn.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, current])

  const choose = (i) => {
    onChange(options[i].value)
    setOpen(false)
    btn.current?.focus()
  }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') setActive((a) => Math.min(options.length - 1, a + 1))
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(0, a - 1))
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(options.length - 1)
    else if (e.key === 'Enter' || e.key === ' ') choose(active)
    else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
      if (e.key === 'Escape') btn.current?.focus()
      return
    } else return
    e.preventDefault()
  }

  return (
    <div className="relative mb-6 mt-2 md:mx-auto md:w-[400px] lg:hidden">
      <button
        ref={btn}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${base}-list`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            setOpen(true)
          }
        }}
        className="flex w-full items-center justify-between rounded-xl border border-ink-300 bg-white px-4 py-2 text-left text-base text-ink-950"
      >
        <span>{options[current]?.label}</span>
        <ChevronDown className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          ref={list}
          id={`${base}-list`}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${base}-opt-${active}`}
          onKeyDown={onKey}
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-80 overflow-y-auto rounded-xl border border-ink-300 bg-white py-1 shadow-lg focus:outline-none"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${base}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`cursor-pointer px-4 py-2 text-sm ${i === active ? 'bg-ink-100' : ''} ${o.value === value ? 'text-orange-600' : 'text-ink-950'}`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Jobs({ id, title, allLabel, applyLabel, groups }) {
  const [dept, setDept] = useState('all')
  const options = [{ value: 'all', label: allLabel }, ...groups.map((g) => ({ value: g.name, label: g.name }))]
  const shown = dept === 'all' ? groups : groups.filter((g) => g.name === dept)
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="heading-2 text-center text-ink-950 lg:pb-20">{title}</h2>
        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-12">
          <div className="hidden lg:col-span-3 lg:block">
            <ul>
              {options.map((o) => (
                <li key={o.value} className="list-none">
                  <button
                    type="button"
                    aria-pressed={o.value === dept}
                    onClick={() => setDept(o.value)}
                    className={`block w-full rounded-badge px-4 py-2 text-left text-sm transition-all hover:text-orange-600 ${
                      o.value === dept ? 'text-orange-600' : 'text-ink-950'
                    }`}
                  >
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Dropdown options={options} value={dept} onChange={setDept} />
          <div className="flex flex-col gap-y-12 lg:col-span-9">
            {shown.map((g) => (
              <div key={g.name} className="flex flex-col gap-y-6">
                <span className="mb-6 ml-4 self-start rounded-badge bg-purple-100 p-1 font-mono text-xs font-medium text-purple-600">{g.name}</span>
                {g.jobs.map((j, i) => (
                  <div key={j.title + i} className="border-b border-ink-200 last:border-b-0">
                    <div className="flex flex-col justify-between px-4 pb-6 lg:flex-row lg:items-center">
                      <div>
                        <h3 className="heading-4 text-ink-950">
                          <SiteLink to="#" className="mb-2 inline-block hover:underline">
                            {j.title}
                          </SiteLink>
                        </h3>
                        <div className="flex items-start gap-2">
                          <PinIcon className="shrink-0 text-ink-950" />
                          <p className="text-base text-ink-950">{j.location}</p>
                        </div>
                      </div>
                      <Btn cta={{ label: applyLabel, to: '#' }} variant="secondary" size="medium" className="mt-2 shrink-0 md:mt-0" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
