import SiteLink from '../SiteLink'
import { Avatar } from '../sections/parts'

// Author row (specs/T5-T8.md A-7): 24px avatar circle (2px white ring around a 20px photo; `plain`
// = no ring, as on the guide header), name link 14/20 (hover underline), date 14/20 #6a7282, 4px after the name.
export default function AuthorRow({ author, date, plain = false, className = '' }) {
  if (!author) return null
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      {plain ? (
        <Avatar a={author.avatar} className="size-6 shrink-0" />
      ) : (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
          <Avatar a={author.avatar} className="size-5" />
        </span>
      )}
      <SiteLink to={author.to || '#'} className="text-sm text-ink-950 hover:underline">
        {author.name}
      </SiteLink>
      {date && <p className="-ml-1 text-sm text-ink-500">{date}</p>}
    </div>
  )
}
