import { QuoteSmall } from '../icons'
import Inline from './Inline'

// article.pull-quote (specs/T5-T8.md A-17): 1px #030711 left rule, pl 24 (48 from 640), 24px quote
// mark, quote 24/32 600, optional attribution 14/20 #6a7282.
export default function PullQuote({ quote, by }) {
  return (
    <figure className="border-l border-ink-950">
      <div className="flex flex-col gap-6 pl-6 sm:pl-12">
        <QuoteSmall className="text-ink-950" />
        <blockquote className="font-sans text-2xl font-semibold text-ink-950">
          <p>
            <Inline text={quote} />
          </p>
        </blockquote>
        {by && <figcaption className="mb-0 text-sm text-ink-500">{by}</figcaption>}
      </div>
    </figure>
  )
}
