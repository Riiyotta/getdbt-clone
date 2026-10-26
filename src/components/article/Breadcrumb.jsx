import { Fragment } from 'react'
import SiteLink from '../SiteLink'

// article.breadcrumb (specs/T5-T8.md A-10): section link / category link / current title.
// Links 14/20 #6a7282 (hover underline), "/" separators 16/24 #6a7282, current title 14/20 #030711.
export default function Breadcrumb({ items, current, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-4 flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {items.map((it) => (
        <Fragment key={it.label}>
          <SiteLink to={it.to} className="text-sm text-ink-500 hover:underline">
            {it.label}
          </SiteLink>
          <span aria-hidden="true" className="text-base text-ink-500">
            /
          </span>
        </Fragment>
      ))}
      <span aria-current="page" className="text-sm text-ink-950">
        {current}
      </span>
    </nav>
  )
}
