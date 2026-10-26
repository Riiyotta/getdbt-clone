import SiteLink from '../SiteLink'
import { FaqItem } from '../sections/Faq'
import { Avatar, Btn, Img, VideoPoster } from '../sections/parts'
import Inline, { slug } from './Inline'
import PullQuote from './PullQuote'

// article.prose-chapter (specs/T5-T8.md A-15) and the shared body flow of form.form-header and
// legal.policy-part (specs/T9-T11.md B, E-2). Content is a list of block tuples:
//   ['p', text]  ['h2'|'h3'|'h4'|'h5', text]  ['ul'|'ol', [text | { text, items }]]
//   ['quote', text, attribution?]  ['img', asset, { caption, to }?]  ['video', asset]
//   ['table', { head, rows }]  ['hr']  ['icons', [{ icon, title, body }]]
//   ['embed', { eyebrow, title, body, cta }]  ['empty']  ['node', <element/>]
//   form-header blocks: ['checklist', items]  ['logos', { label, logos }]
//   ['accordion', [{ q, blocks }]]  ['hosts', { title, people }]  ['buttons', [{ label, to, variant }]]
// Text uses the Inline markup (**bold**, *italic*, `code`, [link](to)).
// Every direct child of the flow gets mb 24 (*:mb-6), the last 0. With `chapterAt` ('h2' on posts
// and guides, 'h3' on case studies) each heading of that level opens a <div class="prose-chapter">
// wrapper; the rhythm is unchanged (index.css .prose-flow rules).

function List({ items, ordered }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag>
      {items.map((it, i) => (
        <li key={i}>
          {typeof it === 'string' ? (
            <Inline text={it} />
          ) : (
            <>
              <Inline text={it.text} />
              {it.items && (
                <ul>
                  {it.items.map((s, j) => (
                    <li key={j}>
                      <Inline text={s} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </li>
      ))}
    </Tag>
  )
}

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto p-3">
      <table className="w-full min-w-150 border-collapse">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="heading-5 px-6 pb-5 pt-3 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="rounded-2xl bg-white shadow-tbody">
          {rows.map((row, r) => (
            <tr key={r} className="h-12">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-6 py-3 text-base ${r % 2 === 0 ? 'bg-ink-50' : ''} ${
                    r % 2 === 0 && c === 0 ? 'rounded-l-xl' : ''
                  } ${r % 2 === 0 && c === row.length - 1 ? 'rounded-r-xl' : ''}`}
                >
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Figure({ a, opts = {} }) {
  if (opts.caption) {
    // SoAE captioned image: linked image centred at 525 wide + 14/20 #1e2939 caption
    return (
      <div>
        <SiteLink to={opts.to || '#'} className="mx-auto block w-full max-w-[525px]">
          <Img a={a} className="block h-auto w-full" />
        </SiteLink>
        <span className="mt-3 block text-center text-sm text-ink-800">{opts.caption}</span>
      </div>
    )
  }
  return (
    <div>
      <Img a={a} className="block h-auto w-full rounded-2xl" />
    </div>
  )
}

// SoAE icon list: rows of a 24px icon + heading-5 title + paragraph
function IconList({ items }) {
  return (
    <div>
      {items.map((it) => (
        <div key={it.title} className="mb-6 flex gap-3 last:mb-0">
          <span className="min-w-6">
            <Img a={it.icon} className="size-6 object-contain" />
          </span>
          <div>
            <h5 className="heading-5 mb-3 text-ink-950">{it.title}</h5>
            <p className="mb-0 text-base">
              <Inline text={it.body} />
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// merger post inline CTA embed: 1px #030711 rules top and bottom, padding 40/0, margin 32/0
function Embed({ eyebrow, title, body, cta }) {
  return (
    <div>
      <div className="my-8 border-y border-ink-950 py-10">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h3 className="heading-3 mb-4 text-ink-950">{title}</h3>
        <p className="text-base">
          <Inline text={body} />
        </p>
        <Btn cta={cta} variant="primary" size="medium" className="mt-8" />
      </div>
    </div>
  )
}

// form.form-header B-1: icon checklist rows (24px icon, heading-5 mb-3, paragraph)
function Checklist({ items }) {
  return (
    <div>
      {items.map((it) => (
        <div key={it.title} className="mb-6 flex gap-3 last:mb-0">
          <span className="min-w-6">
            <Img a={it.icon} className="size-6 object-contain" />
          </span>
          <div>
            <h5 className="heading-5 mb-3 text-ink-950">{it.title}</h5>
            <p className="text-base">{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// form.form-header B-2: bold label + 2/3-column wordmark grid (150 max each)
function LogoGrid({ label, logos }) {
  return (
    <div>
      <p className="mb-6 text-base">
        <strong className="font-bold">{label}</strong>
      </p>
      <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-3">
        {logos.map((l) => (
          <div key={l.alt} className="mx-auto w-full max-w-[150px]">
            <Img a={l} className="block h-auto w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

// form.form-header B-4: host row (60px illustrated avatar, name 16/24, role 12/16 #6a7282)
function Hosts({ title, people }) {
  return (
    <div>
      <h4 className="heading-4 mb-6 text-ink-950">{title}</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {people.map((p) => (
          <div key={p.name} className="flex items-center gap-4">
            <Avatar a={p.avatar} className="min-w-15 max-w-15 size-15" />
            <div>
              <p className="mb-1 text-base text-ink-950">{p.name}</p>
              <p className="text-xs text-ink-500">{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Block({ b }) {
  const [type, a, c] = b
  switch (type) {
    case 'p':
      return (
        <p>
          <Inline text={a} />
        </p>
      )
    case 'empty':
      return <p />
    case 'h2':
      return (
        <h2 id={slug(a)}>
          <Inline text={a} />
        </h2>
      )
    case 'h3':
      return (
        <h3 id={slug(a)}>
          <Inline text={a} />
        </h3>
      )
    case 'h4':
      return (
        <h4>
          <Inline text={a} />
        </h4>
      )
    case 'h5':
      return (
        <h5>
          <Inline text={a} />
        </h5>
      )
    case 'ul':
    case 'ol':
      return <List items={a} ordered={type === 'ol'} />
    case 'quote':
      return <PullQuote quote={a} by={c} />
    case 'img':
      return <Figure a={a} opts={c} />
    case 'video':
      return (
        <div>
          <VideoPoster a={a} />
        </div>
      )
    case 'table':
      return <Table {...a} />
    case 'hr':
      return <hr />
    case 'icons':
      return <IconList items={a} />
    case 'embed':
      return <Embed {...a} />
    case 'checklist':
      return <Checklist items={a} />
    case 'logos':
      return <LogoGrid {...a} />
    case 'hosts':
      return <Hosts {...a} />
    case 'accordion':
      return (
        <div className="[&>*:last-child]:mb-0 [&>*]:mb-6">
          {a.map((it) => (
            <FaqItem key={it.q} q={it.q} compact>
              <div className="prose-flow">
                {it.blocks.map((blk, i) => (
                  <Block key={i} b={blk} />
                ))}
              </div>
            </FaqItem>
          ))}
        </div>
      )
    case 'buttons':
      return (
        <div className="!mt-8 flex flex-col items-center justify-start gap-3 md:!mt-10 md:flex-row">
          {a.map((cta) => (
            <Btn key={cta.label} cta={cta} variant={cta.variant || 'primary'} size="large" />
          ))}
        </div>
      )
    case 'node':
      return a
    default:
      return null
  }
}

export default function Prose({ blocks, chapterAt, className = '' }) {
  if (!chapterAt) {
    return (
      <div className={`prose-flow ${className}`.trim()}>
        {blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
    )
  }
  const chapters = []
  blocks.forEach((b) => {
    if (b[0] === chapterAt || !chapters.length) chapters.push([])
    chapters[chapters.length - 1].push(b)
  })
  return (
    <div className={`prose-flow ${className}`.trim()}>
      {chapters.map((ch, i) => (
        <div key={i} className="prose-chapter">
          {ch.map((b, j) => (
            <Block key={j} b={b} />
          ))}
        </div>
      ))}
    </div>
  )
}
