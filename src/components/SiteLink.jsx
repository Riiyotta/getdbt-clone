import { Link } from 'react-router-dom'
import { hrefFor } from '../links'

// Chrome link: client-side route for internal paths, plain anchor for "#" and external URLs.
// Pass `to` for an explicit path, or `label` to look it up in links.js.
export default function SiteLink({ to, label, children, ...props }) {
  const href = to ?? hrefFor(label)
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
