import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Img } from '../../sections/parts'

// T17 partner directory (specs/T14-T17.md T17): static mock of the partner locator. No XHR; data
// from content/pages/t17.js. Checking an option filters instantly (OR inside a group, AND across
// groups); search filters live; 9 cards per page with top and bottom pagination.

// ---------------------------------------------------------------- T17-1 directory.header
export function DirHeader({ title, body }) {
  return (
    <div className="hero py-8">
      <div className="mx-auto w-full max-w-[1248px] px-6">
        <div className="mx-auto max-w-[684px] text-center">
          <h1 className="mb-4 font-display text-[48px] font-semibold leading-[57.6px] tracking-display text-ink-950">{title}</h1>
          <p className="text-base text-ink-950">{body}</p>
        </div>
      </div>
    </div>
  )
}

function Chevron({ up }) {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true" className={up ? '' : '-rotate-90'}>
      <path d="M3 7l5 5 5-5" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Collapsible group: content height animates 350ms (`transition: height .35s`, default ease) between
// its natural height and 0; `mp-is-expanded` mirrors the state. All groups start expanded.
function FilterGroup({ group, counts, checked, onToggle }) {
  const [open, setOpen] = useState(true)
  const body = useRef(null)
  const first = useRef(true)
  useLayoutEffect(() => {
    const el = body.current
    if (first.current) {
      first.current = false
      return undefined
    }
    const full = el.scrollHeight
    if (open) {
      el.style.height = '0px'
      void el.offsetHeight
      el.style.height = `${full}px`
      const done = () => {
        el.style.height = 'auto'
      }
      el.addEventListener('transitionend', done, { once: true })
      return () => el.removeEventListener('transitionend', done)
    }
    el.style.height = `${full}px`
    void el.offsetHeight
    el.style.height = '0px'
    return undefined
  }, [open])
  const id = `facet-${group.key}`
  return (
    <div className={`mp-partner-filter-item mt-6 first:mt-0 ${open ? 'mp-is-expanded' : ''}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="mp-header mb-2 flex h-[26px] w-full cursor-pointer items-center justify-between text-left"
      >
        <span className="text-[17px] font-semibold leading-[25.5px] text-[#374151]">{group.title}</span>
        <Chevron up={open} />
      </button>
      <div id={id} ref={body} className="mp-collapse">
        <ul className="-ml-[3px]">
          {group.options.map((o) => (
            <li key={o} className="mp-list-item grid h-[23px] grid-cols-[15px_1fr] items-center gap-1.5">
              <input
                id={`${id}-${o}`}
                type="checkbox"
                checked={checked.includes(o)}
                onChange={() => onToggle(group.key, o)}
                className="m-0 size-[13px]"
              />
              <label htmlFor={`${id}-${o}`} className="cursor-pointer text-[15px] leading-[22.5px] text-[#374151]">
                {o} ({counts[o] || 0})
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Arrow({ left }) {
  return (
    <svg width="20" height="11" viewBox="0 0 20 11" fill="none" aria-hidden="true" className={left ? 'rotate-180' : ''}>
      <path d="M0 5.5h18M13.5 1l4.5 4.5L13.5 10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function Pagination({ page, pages, go, prev, next, className = '' }) {
  return (
    <div className={`grid grid-cols-3 items-center justify-between ${className}`}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => go(page - 1)}
        className="mp-next-previous flex items-center gap-2 justify-self-start px-3 py-1.5 text-sm text-[#374151] disabled:cursor-default disabled:text-[#6b7280]"
      >
        <Arrow left />
        {prev}
      </button>
      <ul className="mp-list-inline flex items-center justify-self-center">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span aria-current="page" className="mx-2 my-1.5 block border-b border-[#959eac] px-1 text-sm font-semibold text-[#959eac]">
                {n}
              </span>
            ) : (
              <button type="button" onClick={() => go(n)} className="px-3 py-1.5 text-sm font-semibold text-[#374151]">
                {n}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={page === pages}
        onClick={() => go(page + 1)}
        className="mp-next-previous flex items-center gap-2 justify-self-end px-3 py-1.5 text-sm text-[#374151] disabled:cursor-default disabled:text-[#6b7280]"
      >
        {next}
        <Arrow />
      </button>
    </div>
  )
}

function Card({ p }) {
  return (
    <div className="mp-card relative flex flex-col rounded border border-ink-50 bg-white shadow-[0_0_0_2px_rgba(89,105,129,.1),0_1px_3px_rgba(89,105,129,.1),0_1px_2px_rgba(0,0,0,.05)] transition-[box-shadow,border-color] duration-300">
      <a href="#" className="mp-listi absolute inset-0 z-10" aria-label={p.name} />
      <div className="mp-card-header px-4 pb-4 pt-5">
        <Img a={p.logo} className="mx-auto block h-[114px] w-full max-w-[236px] object-contain" />
      </div>
      <div className="mp-card-body px-4 pb-5">
        <h3 className="text-[15px] font-semibold leading-[22.5px] text-[#252f3f]">{p.name}</h3>
        <p className="break-all text-[13px] leading-[19.5px] text-[#6b7280]">{p.url}</p>
        <p className="mp-clamp-3 mt-1.5 text-sm leading-[21px] text-[#374151]">{p.text}</p>
      </div>
      <div className="mp-card-footer mt-auto px-4 pb-[26px]">
        <Img a={p.badge} className="mb-2.5 block size-8" />
        <p className="text-sm leading-[21px] text-[#4b5563]">{p.tier}</p>
      </div>
    </div>
  )
}

const PER_PAGE = 9

export function Directory({ filtersTitle, clearAll, apply, toggleFilters, groups, search, clearSearch, prev, next, empty, partners }) {
  const [sel, setSel] = useState(() => Object.fromEntries(groups.map((g) => [g.key, []])))
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [panel, setPanel] = useState(false)

  // facet counts over the whole list (static, as on the original)
  const counts = useMemo(() => {
    const c = {}
    partners.forEach((p) => [p.service, p.tier, ...p.regions].forEach((v) => (c[v] = (c[v] || 0) + 1)))
    return c
  }, [partners])

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return partners.filter((p) => {
      const vals = { service: [p.service], tier: [p.tier], regions: p.regions }
      for (const g of groups) if (sel[g.key].length && !sel[g.key].some((o) => vals[g.key].includes(o))) return false
      if (!term) return true
      return [p.name, p.url, p.text, p.service, p.tier, ...p.regions].join(' ').toLowerCase().includes(term)
    })
  }, [partners, groups, sel, q])

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const cur = Math.min(page, pages)
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE)

  const toggle = (key, o) => {
    setSel((s) => ({ ...s, [key]: s[key].includes(o) ? s[key].filter((x) => x !== o) : [...s[key], o] }))
    setPage(1)
  }
  const active = groups.flatMap((g) => sel[g.key].map((o) => [g.key, o]))

  const filters = (
    <>
      <div className="mp-facet-title pb-6">
        <h2 className="mb-2 text-2xl font-semibold leading-9 text-[#161e2e]">{filtersTitle}</h2>
        {active.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {active.map(([k, o]) => (
              <button
                key={o}
                type="button"
                onClick={() => toggle(k, o)}
                className="mp-selected-facet-item flex items-center gap-1 rounded border border-[#d2d6dc] px-2 py-0.5 text-sm text-[#374151]"
              >
                {o} <span aria-hidden="true">×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setSel(Object.fromEntries(groups.map((g) => [g.key, []])))
                setPage(1)
              }}
              className="text-sm text-purple-600 underline hover:no-underline"
            >
              {clearAll}
            </button>
          </div>
        )}
      </div>
      {groups.map((g) => (
        <FilterGroup key={g.key} group={g} counts={counts} checked={sel[g.key]} onToggle={toggle} />
      ))}
    </>
  )

  return (
    <div className="mp-directory-partner-wrapper mx-auto w-full max-w-[1200px] px-4 pb-8 sm:px-6 lg:grid lg:grid-cols-[275px_minmax(0,845px)] lg:gap-8 lg:pt-[30px]">
      <aside className="hidden lg:block">{filters}</aside>
      <div className="mp-main-content grid gap-4">
        <div className="flex gap-2">
          <label className="mp-partner-search flex h-[43px] flex-1 items-center gap-2.5 rounded border border-[#d2d6dc] bg-white px-4">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="shrink-0">
              <circle cx="6.5" cy="6.5" r="5.25" stroke="#374151" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="sr-only">{search}</span>
            <input
              type="text"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setPage(1)
              }}
              placeholder={search}
              className="mp-form-control h-7 min-w-0 flex-1 rounded border border-[#d2d6dc] py-2 pl-3 pr-2 text-sm leading-[21px] text-[#374151] outline-none focus:border-purple-600"
            />
            <button type="button" aria-label={clearSearch} onClick={() => setQ('')} className="shrink-0 text-[#374151]">
              <svg width="15" height="20" viewBox="0 0 15 20" fill="none" aria-hidden="true">
                <path d="M3 6l9 9M12 6l-9 9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </label>
          {/* below 1024: the filters toggle (34x41, left border) opens the filter panel */}
          <button
            type="button"
            aria-expanded={panel}
            aria-label={toggleFilters}
            onClick={() => setPanel((p) => !p)}
            className="flex h-[41px] w-[34px] shrink-0 items-center justify-center border-l border-[#d2d6dc] py-1 pl-[9px] pr-2.5 lg:hidden"
          >
            <svg width="14" height="33" viewBox="0 0 14 33" fill="none" aria-hidden="true">
              <path d="M1 11h12M3 16.5h8M5 22h4" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {panel && (
          <div className="rounded border border-[#d2d6dc] p-4 lg:hidden">
            {filters}
            <button type="button" onClick={() => setPanel(false)} className="mp-apply-filter-button button primary medium mt-6">
              {apply}
            </button>
          </div>
        )}
        <Pagination page={cur} pages={pages} go={setPage} prev={prev} next={next} className="max-sm:hidden" />
        {shown.length ? (
          <div className="mp-cards-container grid grid-cols-1 gap-y-[15px] sm:grid-cols-2 sm:gap-x-[2%] lg:grid-cols-3">
            {shown.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-base text-[#374151]">{empty}</p>
        )}
        <Pagination page={cur} pages={pages} go={setPage} prev={prev} next={next} />
      </div>
    </div>
  )
}
