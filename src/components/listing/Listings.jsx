import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SiteLink from '../SiteLink'
import { ChevronRight24 } from '../icons'
import { Btn } from '../sections/parts'
import { CaseCard, CaseEmpty, PostCard, SkeletonCard, TextEmpty, ViewMore } from './Cards'
import FeaturedItem from './FeaturedItem'
import FeaturedStory from './FeaturedStory'
import { FiltersMenu, SelectDropdown } from './FilterToolbar'
import SearchInput from './SearchInput'

const T6_GRID = 'grid grid-cols-1 gap-6 md:grid-cols-3'
const T7_GRID = 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
const has = (item, q) => {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return [item.title, item.body, item.name, item.tag].filter(Boolean).some((t) => t.toLowerCase().includes(s))
}

// ---------------------------------------------------------------- T6 hub body (B-T6)
// Stack of category blocks (mb 120, last 0): optional header (heading-3 + secondary medium link with a
// -90deg chevron, hidden below 768), optional featured row, 3-up card grid. `promo` entries render
// the /resources inline gradient-05 card (A-12).
function Promo({ title, body, cta }) {
  return (
    <section className="my-[120px] py-16">
      <div className="gradient-container gradient-05 overflow-hidden rounded-2xl bg-center p-10 text-ink-50">
        <div className="relative z-10">
          <h2 className="heading-2 mb-4 max-w-[824px] text-ink-50">{title}</h2>
          <p className="max-w-[612px] text-base text-ink-50">{body}</p>
          <div className="mt-10 flex flex-col gap-3 md:flex-row">
            <Btn cta={cta} variant="primary dark" size="large" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HubListing({ blocks, variant = 'blog' }) {
  return (
    <section className="section !pt-0">
      <div className="container">
        {blocks.map((b, i) =>
          b.promo ? (
            <Promo key={i} {...b.promo} />
          ) : (
            <div key={b.title || i} className="mb-[120px] last:mb-0 [&:has(+section)]:mb-0">
              {b.title && (
                <div className="hidden md:block">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="heading-3 text-ink-950">{b.title}</h3>
                    <SiteLink to={b.more.to} className="button secondary medium">
                      {b.more.label}
                      <ChevronRight24 />
                    </SiteLink>
                  </div>
                </div>
              )}
              {b.featured && <FeaturedItem item={b.featured} />}
              <div className={T6_GRID}>
                {b.cards.map((c) => (
                  <PostCard key={c.title} item={c} variant={variant} />
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  )
}

// T8 "Latest posts": heading-3 + 3 compact blog cards (gap 24 / 48)
export function LatestPosts({ title, cards }) {
  return (
    <section className="section">
      <div className="container">
        <h3 className="heading-3 mb-6 text-ink-950">{title}</h3>
        <div className="grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-3">
          {cards.map((c) => (
            <PostCard key={c.title} item={c} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T7 /case-studies (A-3a, A-11)
// 6 cards, the featured story band, 6 more cards (+12 per View more, up to 50); Filters apply on
// Apply only and search filters per keystroke, both client-side with no URL change.
export function CaseStudiesListing({ items, filters, search, featured, empty, more, perMore = 12, maxSecond = 50 }) {
  const [applied, setApplied] = useState([])
  const [q, setQ] = useState('')
  const [second, setSecond] = useState(6)
  const list = useMemo(
    () => items.filter((it) => (!applied.length || applied.includes(it.industry)) && has(it, q)),
    [items, applied, q],
  )
  const shownSecond = Math.min(second, maxSecond)
  const g1 = list.slice(0, 6)
  const g2 = list.slice(6, 6 + shownSecond)
  const canMore = list.length > 6 + shownSecond && shownSecond < maxSecond
  return (
    <div className="relative z-10 overflow-visible py-12">
      <div className="container mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mb-12">
        <FiltersMenu {...filters} applied={applied} onApply={setApplied} />
        <SearchInput value={q} onChange={setQ} placeholder={search} className="md:col-start-3" />
      </div>
      {list.length === 0 ? (
        <CaseEmpty {...empty} onClear={() => setQ('')} />
      ) : (
        <>
          <div className={`container ${T7_GRID}`}>
            {g1.map((it) => (
              <CaseCard key={it.slug} item={it} />
            ))}
          </div>
          <FeaturedStory {...featured} />
          {g2.length > 0 && (
            <div className={`container ${T7_GRID}`}>
              {g2.map((it) => (
                <CaseCard key={it.slug} item={it} />
              ))}
            </div>
          )}
          {canMore && <ViewMore label={more} onClick={() => setSecond((s) => s + perMore)} />}
        </>
      )}
    </div>
  )
}

// ---------------------------------------------------------------- T7 /events (A-3b)
// Single-select region filter (instant, writes ?filter=<slug>) + client-side search; 14 cards.
export function EventsListing({ items, placeholder, options, search, empty }) {
  const [params, setParams] = useSearchParams()
  const filter = params.get('filter') || ''
  const [q, setQ] = useState('')
  const list = items.filter((it) => (!filter || it.region === filter) && has(it, q))
  const setFilter = (v) => {
    const next = new URLSearchParams(params)
    if (v) next.set('filter', v)
    else next.delete('filter')
    setParams(next, { replace: true })
  }
  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 flex flex-col gap-x-4 gap-y-2 md:flex-row md:justify-between lg:mb-12">
          <SelectDropdown placeholder={placeholder} options={options} value={filter} onChange={setFilter} />
          <SearchInput value={q} onChange={setQ} placeholder={search} className="md:max-w-100" />
        </div>
        {list.length ? (
          <div className={T7_GRID}>
            {list.map((it) => (
              <PostCard key={it.title} item={{ ...it, tag: it.regionLabel }} variant="event" />
            ))}
          </div>
        ) : (
          <TextEmpty {...empty} />
        )}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T7 on-demand (A-3b + A-6g)
// Simulates the original's server refetch locally: a filter or (debounced) query change shows 3
// pulsing skeleton cards for ~1.2s, then the filtered list; the URL gets ?filter= / ?query=.
// 21 cards per page, View more (+21) appends instantly.
const LOAD_MS = 1200
const DEBOUNCE_MS = 400
export function OnDemandListing({ items, placeholder, options, search, empty, more, perPage = 21 }) {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState(params.get('filter') || '')
  const [q, setQ] = useState(params.get('query') || '')
  const [applied, setApplied] = useState({ filter: params.get('filter') || '', q: params.get('query') || '' })
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(perPage)
  const timers = useRef([])
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return undefined
    }
    const run = () => {
      setLoading(true)
      const t = setTimeout(() => {
        setApplied({ filter, q })
        setCount(perPage)
        setLoading(false)
        const next = new URLSearchParams()
        if (filter) next.set('filter', filter)
        if (q.trim()) next.set('query', q.trim())
        setParams(next, { replace: true })
      }, LOAD_MS)
      timers.current.push(t)
    }
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (q !== applied.q) timers.current.push(setTimeout(run, DEBOUNCE_MS))
    else run()
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, q])
  const list = items.filter((it) => (!applied.filter || it.year === applied.filter) && has(it, applied.q))
  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 flex flex-col gap-x-4 gap-y-2 md:flex-row md:justify-between lg:mb-12">
          <SelectDropdown placeholder={placeholder} options={options} value={filter} onChange={setFilter} />
          <SearchInput value={q} onChange={setQ} placeholder={search} className="md:max-w-100" />
        </div>
        {loading ? (
          <div className={T7_GRID} aria-busy="true">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : list.length ? (
          <>
            <div className={T7_GRID}>
              {list.slice(0, count).map((it) => (
                <PostCard key={it.title} item={it} variant="session" />
              ))}
            </div>
            {list.length > count && <ViewMore label={more} variant="primary" onClick={() => setCount((c) => c + perPage)} />}
          </>
        ) : (
          <TextEmpty {...empty} />
        )}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- T7 /press
// Two sections, each a centred heading-2, a 21-card grid and a primary View more (+21).
export function PressGrid({ title, items, variant, more, perPage = 21 }) {
  const [count, setCount] = useState(perPage)
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 text-center text-ink-950">{title}</h2>
        <div className={T7_GRID}>
          {items.slice(0, count).map((it) => (
            <PostCard key={it.title} item={it} variant={variant} />
          ))}
        </div>
        {items.length > count && <ViewMore label={more} variant="primary" onClick={() => setCount((c) => c + perPage)} />}
      </div>
    </section>
  )
}
