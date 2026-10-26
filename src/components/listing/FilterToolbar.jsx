import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, CloseIcon } from '../icons'
import { CheckBox } from '../form/Form'

function useOutside(open, ref, close) {
  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) close()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, ref, close])
}

// listing.filter-toolbar A-3a (/case-studies): "Filters" menu button (42 tall, 1px #e5e7eb, r12,
// 16/24 400) opening a 600-wide blurred panel (r12, shadow-xl): one group of checkboxes in two
// CSS columns, then a footer with clear / cancel / apply. Ticks are staged until Apply; Apply
// closes the panel and the label gains a count. (The panel's scale/fade entrance is left to the
// animation pass.)
export function FiltersMenu({ label, group, options, applied, onApply, clearLabel, cancelLabel, applyLabel }) {
  const [open, setOpen] = useState(false)
  const [staged, setStaged] = useState(applied)
  const ref = useRef(null)
  const id = useId()
  const close = () => setOpen(false)
  useOutside(open, ref, close)
  const toggle = (o, on) => setStaged((s) => (on ? [...s, o] : s.filter((x) => x !== o)))
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => {
          setStaged(applied)
          setOpen((o) => !o)
        }}
        className="inline-flex w-full items-center justify-between rounded-xl border border-ink-200 px-4 py-2 text-base font-normal text-ink-950"
      >
        {applied.length ? `${label} (${applied.length})` : label}
        <ChevronDown size={24} />
      </button>
      {open && (
        <div
          id={`${id}-panel`}
          className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-xl border border-ink-200 bg-blur shadow-xl backdrop-blur-md md:w-[600px]"
        >
          <div className="mb-4 p-6">
            <p className="mb-2 text-lg font-bold text-ink-950">{group}</p>
            <div className="columns-2 gap-4">
              {options.map((o, i) => (
                <div key={o} className="mb-2 flex items-center gap-2 break-inside-avoid text-base">
                  <CheckBox
                    id={`${id}-o${i}`}
                    checked={staged.includes(o)}
                    onChange={(on) => toggle(o, on)}
                    labelledBy={`${id}-l${i}`}
                  />
                  <span id={`${id}-l${i}`} onClick={() => toggle(o, !staged.includes(o))} className="cursor-pointer">
                    {o}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink-200 p-4">
            <button type="button" onClick={() => setStaged([])} className="button tertiary medium hidden !w-auto md:block">
              {clearLabel}
            </button>
            <div className="flex gap-2">
              <button type="button" role="menuitem" onClick={close} className="button secondary medium !w-auto">
                {cancelLabel}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onApply(staged)
                  close()
                }}
                className="button primary medium !w-auto"
              >
                {applyLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// listing.filter-toolbar A-3b (events, on-demand): single-value dropdown in the react-select style.
// Wrapper 1px #d1d5dc r12 (#632ff5 while focused/open); inner control border #030711 on hover;
// placeholder 16/24 #1e2939; separator + chevron, clear "x" once a value is picked. Menu directly
// under the control: white, 2px #632ff5 border, r4, options 32 tall 12/16 capitalised; the focused
// option is #e5e7eb / #101828. Closes on select.
export function SelectDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [hi, setHi] = useState(0)
  const ref = useRef(null)
  const id = useId()
  const close = () => setOpen(false)
  useOutside(open, ref, close)
  const current = options.find((o) => o.value === value)
  const pick = (o) => {
    onChange(o.value)
    setOpen(false)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      else setHi((h) => Math.min(options.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHi((h) => Math.max(0, h - 1))
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault()
      pick(options[hi])
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    } else if (e.key === 'Escape') setOpen(false)
  }
  return (
    <div ref={ref} className={`relative w-full rounded-xl border md:max-w-100 ${open || focus ? 'border-purple-600' : 'border-ink-300'}`}>
      <div className="flex h-[38px] items-center rounded-xl border border-transparent px-3 hover:border-ink-950">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-menu`}
          aria-haspopup="listbox"
          aria-activedescendant={open ? `${id}-o${hi}` : undefined}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          className={`min-w-0 flex-1 truncate text-left text-base outline-none ${current ? 'text-ink-950' : 'text-ink-800'}`}
        >
          {current ? current.label : placeholder}
        </button>
        {current && (
          <button type="button" aria-label="Clear selection" onClick={() => onChange('')} className="flex h-5 w-[15px] items-center justify-center text-ink-500">
            <CloseIcon className="size-[15px]" />
          </button>
        )}
        <span className="mx-2 h-5 w-px bg-ink-300" aria-hidden="true" />
        <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => setOpen((o) => !o)} className="flex h-5 w-[15px] items-center justify-center text-ink-500">
          <ChevronDown size={15} />
        </button>
      </div>
      {open && (
        <ul id={`${id}-menu`} role="listbox" className="absolute left-0 top-10 z-20 w-full rounded-badge border-2 border-purple-600 bg-white">
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-o${i}`}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHi(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
              className={`h-8 cursor-default p-2 text-xs capitalize ${i === hi ? 'bg-ink-200 text-ink-900' : 'text-ink-800'}`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
