import { useEffect, useId, useRef, useState } from 'react'
import { CheckMark, ChevronDown } from '../icons'
import Inline from '../article/Inline'

// Form system (specs/T9-T11.md A), shared by form.download-form (T8), form.form-header (T9, T10).
// Nothing is sent anywhere: submit is prevented, required fields are validated locally and the card
// swaps to the success paragraph. No reCAPTCHA, no third-party scripts, no network calls.
//
// Field schema: { name, label, type: 'text'|'email'|'tel'|'password'|'textarea'|'select'|
//   'checkbox'|'combobox'|'check' (A-3 custom checkbox), required, options, placeholder, help,
//   helpAbove, half (two-field row at >=768), hidden }
// mode 'blur' (HubSpot forms): required fields validate on blur and on submit.
// mode 'submit' (signup): nothing on blur, validation on submit only.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MESSAGES = {
  required: 'Add a value here before you submit.', // 36ch, as the original's message length
  email: 'Use an email address in the form name@company.com.',
  match: 'The two passwords do not match yet.',
  check: 'Tick this box to continue.',
}

function validate(f, v, values) {
  const empty = f.type === 'check' || f.type === 'checkbox' ? !v : !String(v ?? '').trim()
  if (f.required && empty) return f.type === 'check' ? MESSAGES.check : MESSAGES.required
  if (!empty && f.type === 'email' && !EMAIL.test(String(v).trim())) return MESSAGES.email
  if (!empty && f.matches && v !== values[f.matches]) return MESSAGES.match
  return null
}

// form.FormCard (A-1): 1px #d1d5dc, radius 16, padding 40, bg-blur
export function FormCard({ id, className = '', children }) {
  return (
    <div id={id} className={`form-container scroll-mt-8 rounded-2xl border border-ink-300 bg-blur p-10 backdrop-blur-md ${className}`.trim()}>
      {children}
    </div>
  )
}

function Label({ htmlFor, label, required, as: Tag = 'label', id }) {
  return (
    <Tag htmlFor={Tag === 'label' ? htmlFor : undefined} id={id} className="form-label">
      <span>
        {label}
        {required && ' *'}
      </span>
    </Tag>
  )
}

function Errors({ id, error }) {
  if (!error) return null
  return (
    <ul id={id} className="mt-1 list-none" role="alert">
      <li>
        <span className="block text-sm text-pink-700">{error}</span>
      </li>
    </ul>
  )
}

// A-3 checkbox (signup terms; case-study filters use the same box): 16x16, 1px #d1d5dc, r4;
// checked #632ff5 with a white check; focus-visible ring as A-5
export function CheckBox({ checked, onChange, id, labelledBy, describedBy, invalid, onBlur }) {
  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      onClick={() => onChange(!checked)}
      onBlur={onBlur}
      className={`flex size-4 shrink-0 items-center justify-center rounded-badge border outline-none focus-visible:shadow-focus disabled:opacity-50 ${
        checked ? 'border-purple-600 bg-purple-600 text-white' : 'border-ink-300 bg-transparent'
      }`}
    >
      {checked && <CheckMark size={14} className="text-white" />}
    </button>
  )
}

// A-3 combobox select: trigger in the A-2 box, popover listbox under it (4px gap), option text
// #632ff5 when highlighted, 14px check on the selected option. Escape closes and refocuses.
// (The original's popover fade/zoom entrance is left to the animation pass.)
function Combobox({ id, value, onChange, options, placeholder, describedBy, labelledBy }) {
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(0)
  const ref = useRef(null)
  const btn = useRef(null)
  const listId = `${id}-list`
  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])
  const pick = (i) => {
    onChange(options[i])
    setOpen(false)
    btn.current?.focus()
  }
  const onKeyDown = (e) => {
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      setHi(Math.max(0, options.indexOf(value)))
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHi((h) => Math.min(options.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHi((h) => Math.max(0, h - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setHi(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setHi(options.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(hi)
    } else if (e.key === 'Tab') setOpen(false)
  }
  return (
    <div ref={ref} className="relative">
      <button
        ref={btn}
        type="button"
        role="combobox"
        id={id}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-activedescendant={open ? `${id}-opt-${hi}` : undefined}
        onClick={() => {
          setHi(Math.max(0, options.indexOf(value)))
          setOpen((o) => !o)
        }}
        onKeyDown={onKeyDown}
        className="form-input flex items-center justify-between text-left"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="shrink-0 text-ink-500 opacity-50" />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-auto rounded-xl border border-ink-300 bg-white p-1 shadow-md"
        >
          {options.map((o, i) => (
            <li
              key={o}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setHi(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(i)}
              className={`relative flex h-8 cursor-default select-none items-center rounded-badge py-1.5 pl-8 pr-2 text-sm ${
                i === hi ? 'text-purple-600' : 'text-ink-950'
              }`}
            >
              {o === value && (
                <span className="absolute left-2 flex size-3.5 items-center justify-center">
                  <CheckMark size={14} />
                </span>
              )}
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Field({ f, value, error, onChange, onBlur, base }) {
  const id = `${base}-${f.name}`
  const errId = `${id}-err`
  const helpId = `${id}-help`
  const describedBy = [f.help && helpId, error && errId].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name: f.name,
    'aria-required': f.required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    onBlur: () => onBlur(f),
  }
  const help = f.help && (
    <p id={helpId} className={`form-help ${f.helpLeading ? 'leading-[18px]' : ''}`.trim()}>
      {f.help}
    </p>
  )
  if (f.type === 'checkbox') {
    // HubSpot boolean checkbox: native 13x13 box, 8px gap, 14/20 label
    return (
      <div className="mb-6">
        <label htmlFor={id} className="flex items-center whitespace-nowrap text-sm text-ink-950">
          <input
            type="checkbox"
            {...common}
            checked={!!value}
            onChange={(e) => onChange(f, e.target.checked)}
            className="mr-2 size-[13px] shrink-0 accent-purple-600"
          />
          <span className="whitespace-normal">
            <Inline text={f.label} />
            {f.required && ' *'}
          </span>
        </label>
        <Errors id={errId} error={error} />
      </div>
    )
  }
  if (f.type === 'check') {
    return (
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <CheckBox
            id={id}
            checked={!!value}
            onChange={(v) => onChange(f, v)}
            labelledBy={`${id}-label`}
            describedBy={describedBy}
            invalid={!!error}
          />
          <span id={`${id}-label`} className="text-sm text-ink-950">
            <Inline text={f.label} />
            {f.required && ' *'}
          </span>
        </div>
        <Errors id={errId} error={error} />
      </div>
    )
  }
  let control
  if (f.type === 'textarea') {
    control = <textarea rows={2} placeholder={f.placeholder} className="form-input" value={value || ''} onChange={(e) => onChange(f, e.target.value)} {...common} />
  } else if (f.type === 'select') {
    control = (
      <div className="select-wrap">
        <select className={`form-input ${value ? '' : 'is-placeholder'}`} value={value || ''} onChange={(e) => onChange(f, e.target.value)} {...common}>
          <option value="" disabled>
            {f.placeholder}
          </option>
          {f.options.map((o, i) => (
            <option key={`${o}-${i}`} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    )
  } else if (f.type === 'combobox') {
    control = (
      <Combobox
        id={id}
        value={value}
        options={f.options}
        placeholder={f.placeholder}
        labelledBy={`${id}-label`}
        describedBy={describedBy}
        onChange={(v) => onChange(f, v)}
      />
    )
  } else {
    control = (
      <input
        type={f.type}
        autoComplete={f.autoComplete}
        placeholder={f.placeholder}
        className="form-input"
        value={value || ''}
        onChange={(e) => onChange(f, e.target.value)}
        {...common}
      />
    )
  }
  return (
    <div className={`mb-6 ${f.hidden ? 'hidden' : ''}`.trim()}>
      <Label htmlFor={id} id={`${id}-label`} label={f.label} required={f.required} as={f.type === 'combobox' ? 'span' : 'label'} />
      {f.helpAbove && help}
      {control}
      {!f.helpAbove && help}
      <Errors id={errId} error={error} />
    </div>
  )
}

// consecutive `half` fields pair into a two-column row at >=768 (gap 16), stacked below
function rowsOf(fields) {
  const rows = []
  for (let i = 0; i < fields.length; i += 1) {
    const f = fields[i]
    if (f.half && fields[i + 1]?.half) {
      rows.push([f, fields[i + 1]])
      i += 1
    } else rows.push([f])
  }
  return rows
}

// Legal consent block: 12/16 rich text with one inline link, mb 24
export function Consent({ text }) {
  return (
    <div className="mb-6 text-xs text-ink-950">
      <p>
        <Inline text={text} />
      </p>
    </div>
  )
}

export default function LeadForm({ fields, submit, consent, success, mode = 'blur', title, buttonStyle = 'hs' }) {
  const base = `f${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const onChange = (f, v) => {
    setValues((s) => ({ ...s, [f.name]: v }))
    // a shown error clears once the field becomes valid
    if (errors[f.name] && !validate(f, v, { ...values, [f.name]: v })) setErrors((s) => ({ ...s, [f.name]: null }))
  }
  const onBlur = (f) => {
    if (mode !== 'blur') return
    setErrors((s) => ({ ...s, [f.name]: validate(f, values[f.name], values) }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    fields.filter((f) => !f.hidden).forEach((f) => {
      next[f.name] = validate(f, values[f.name], values)
    })
    setErrors(next)
    const firstBad = fields.find((f) => next[f.name])
    if (firstBad) {
      document.getElementById(`${base}-${firstBad.name}`)?.focus()
      return
    }
    setDone(true)
  }
  if (done) {
    return (
      <div className="submitted-message text-center" role="status">
        {title}
        <p className="mb-0 text-base text-ink-900">{success}</p>
      </div>
    )
  }
  return (
    <>
      {title}
      <form noValidate onSubmit={onSubmit} className={mode === 'submit' ? '' : 'hs-form'}>
        {rowsOf(fields).map((row) =>
          row.length === 2 ? (
            <div key={row[0].name} className="md:flex md:gap-4 md:[&>*]:w-1/2">
              {row.map((f) => (
                <Field key={f.name} f={f} base={base} value={values[f.name]} error={errors[f.name]} onChange={onChange} onBlur={onBlur} />
              ))}
            </div>
          ) : (
            <Field key={row[0].name} f={row[0]} base={base} value={values[row[0].name]} error={errors[row[0].name]} onChange={onChange} onBlur={onBlur} />
          ),
        )}
        {consent && <Consent text={consent} />}
        <div className="text-center md:text-left">
          <button
            type="submit"
            className={`button primary large ${buttonStyle === 'hs' ? 'mt-2 !font-normal !transition-none' : ''}`.trim()}
          >
            {submit}
          </button>
        </div>
      </form>
    </>
  )
}
