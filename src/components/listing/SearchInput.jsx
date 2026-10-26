import { CloseIcon, SearchIcon } from '../icons'

// Search input (specs/T5-T8.md A-4): 41 tall, padding 8 16 8 40, 1px #d1d5dc, radius 12, transparent;
// placeholder rgba(3,7,17,.5); focus border #632ff5 with no outline; clear button at right-3 when
// the field has a value.
export default function SearchInput({ value, onChange, placeholder, label, className = '' }) {
  return (
    <label className={`relative block w-full ${className}`.trim()}>
      <span className="sr-only">{label || placeholder}</span>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-3 -translate-y-1/2 text-ink-950" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[41px] w-full rounded-xl border border-ink-300 bg-transparent py-2 pl-10 pr-10 text-base text-ink-950 outline-none placeholder:text-ink-950/50 focus:border-purple-600"
      />
      {value && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Clear search text"
          onClick={() => onChange('')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onChange('')
            }
          }}
          className="absolute right-3 top-1/2 flex h-4 w-[18px] -translate-y-1/2 cursor-pointer items-center justify-center text-ink-500"
        >
          <CloseIcon className="size-4" />
        </span>
      )}
    </label>
  )
}
