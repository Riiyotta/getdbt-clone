import { Fragment } from 'react'
import SiteLink from '../SiteLink'

// Inline rich text for the T5-T11 prose system. Content strings use a small markup:
//   **bold**   *italic*   ***bold italic***   `code`   [link text](/path | # | https://...)
// Links render as `.link-styles` (#632ff5 underline). External links open in a new tab.
const TOKEN = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

export function InlineLink({ to, children, className = 'link-styles' }) {
  const external = /^https?:/.test(to)
  return (
    <SiteLink to={to} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </SiteLink>
  )
}

export default function Inline({ text }) {
  if (text == null) return null
  if (typeof text !== 'string') return text
  const parts = text.split(TOKEN)
  return parts.map((p, i) => {
    if (!p) return null
    if (p.startsWith('***')) return (
      <strong key={i}>
        <em>{p.slice(3, -3)}</em>
      </strong>
    )
    if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
    if (p.startsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    const m = p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (m) return (
      <InlineLink key={i} to={m[2]}>
        {m[1]}
      </InlineLink>
    )
    return <Fragment key={i}>{p}</Fragment>
  })
}

// heading text -> slug id (TOC anchors)
export const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[`*]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
