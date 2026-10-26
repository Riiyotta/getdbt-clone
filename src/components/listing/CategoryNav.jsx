import { useEffect, useRef, useState } from 'react'
import SiteLink from '../SiteLink'
import SearchInput from './SearchInput'

// listing.category-nav (specs/T5-T8.md A-2): sticky (top 0, z 50) blurred white bar with the search
// field (3/12) on the left and the category pills (8/12, pushed right at >=1024) on the right.
// A 1px #e5e7eb bottom border appears only while the bar is stuck (>=768).
// The /blog search is inert on the original (no filtering, no URL change); the clone matches that.
export default function CategoryNav({ pills, search }) {
  const ref = useRef(null)
  const [stuck, setStuck] = useState(false)
  const [q, setQ] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (el) setStuck(window.scrollY > 0 && el.getBoundingClientRect().top <= 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav
      ref={ref}
      aria-label="Categories"
      className={`sticky top-0 z-50 bg-blur backdrop-blur-md md:py-6 ${stuck ? 'md:border-b md:border-ink-200' : ''}`.trim()}
    >
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:flex-wrap">
          <SearchInput value={q} onChange={setQ} placeholder={search} className="md:max-w-[25%]" />
          <ul className="flex h-[60px] w-full items-center gap-2 overflow-x-auto overflow-y-hidden md:w-8/12">
            {pills.map((p, i) => (
              <li key={p.label} className="lg:first:ml-auto">
                <SiteLink
                  to={p.to}
                  aria-current={i === 0 ? 'page' : undefined}
                  className={`block whitespace-nowrap rounded-xl px-4 py-2 font-medium text-ink-950 transition-colors duration-150 ease-standard hover:bg-ink-100 ${
                    i === 0 ? 'bg-ink-100' : ''
                  }`}
                >
                  {p.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
