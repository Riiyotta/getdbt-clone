import SiteLink from '../SiteLink'
import Baton from './Baton'
import { Btn, Img, SectionHeader, TextLink } from './parts'

// N-feat (specs/T1-T4.md A): feature card grids.
//  A: icon cards on the .bottom-frequency wash (T1 develop, T4 "unlocking" with a centred header)
//  B: same cards on the photo-wash background (reproduced with the .bottom-frequency gradients);
//     `iconSize` 56 on mesh
//  C: bordered image cards (T3 section 2), optional "powered by" lockup and header button
//  D: 4-column icon cards (T2 "why", T4 "common use cases"), optional header buttons
// Only the header carries a reveal (one span at 0ms).
// T12-T13 additions (specs/T12-T13.md B "N-feat additions"):
//  plain: A cards on white; cards with `cta` get a title link, p mb-10 and a chevron text link
//  E: bordered card (bg-blur, 1px #e5e7eb, r16, p-10): optional icon / stat, title, body, link
//  F: stat card (80/80 400 stat, label), no border
//  G: integration logo card (E card with a 32-tall logo box)
//  H: inline-icon card (32 icon beside a heading-4), body below
//  C with `dark`: C-dark image cards
//  `dark` = section bg #030711 with white header + E-dark / C-dark cards; `wash` forces the
//  photo-wash (.bottom-frequency) on any variant; `stroke` adds an N-baton behind the cards;
//  `cols4` = the 4-column grid (294 cards). No header -> the grid starts 80 below the padding.

function CardLink({ card, dark }) {
  return <TextLink cta={card.cta} shift dark={dark} className="mt-auto w-full justify-between" />
}

function Title({ card, className, dark }) {
  return (
    <h3 className={`heading-4 mb-3 ${dark ? 'text-white' : 'text-ink-950'} ${className || ''}`.trim()}>
      {card.cta && card.linkTitle !== false ? <SiteLink to={card.cta.to}>{card.title}</SiteLink> : card.title}
    </h3>
  )
}

function IconCard({ card, iconSize }) {
  return (
    <div className="flex max-w-[400px] flex-col items-start rounded-2xl">
      {card.icon && (
        <div className={`mb-10 ${iconSize === 56 ? 'h-14' : 'h-8'}`}>
          <Img a={card.icon} className={`${iconSize === 56 ? 'size-14' : 'size-8'} object-contain`} />
        </div>
      )}
      <Title card={card} />
      {card.body && <p className={`text-base text-ink-800 ${card.cta ? 'mb-10' : ''}`}>{card.body}</p>}
      {card.cta && <CardLink card={card} />}
    </div>
  )
}

function ImageCard({ card, dark }) {
  return (
    <div
      className={`flex max-w-[400px] flex-col items-start rounded-2xl border px-4 pb-6 pt-4 backdrop-blur-md ${
        dark ? 'border-ink-800 bg-blur-dark' : 'border-ink-200 bg-blur'
      }`}
    >
      <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Img a={card.image} className="h-full w-full rounded-2xl object-cover" />
      </div>
      <h3 className={`heading-4 mb-3 ${dark ? 'text-white' : 'text-ink-950'}`}>
        <SiteLink to={card.cta.to}>{card.title}</SiteLink>
      </h3>
      <p className={`mb-10 text-base ${dark ? 'text-white' : 'text-ink-800'}`}>{card.body}</p>
      <TextLink cta={card.cta} shift dark={dark} className="mt-auto w-full justify-between pr-4" />
    </div>
  )
}

function Stat({ card, dark }) {
  return (
    <>
      <p className={`mb-4 font-sans text-metric font-normal md:text-display ${dark ? 'text-white' : 'text-ink-950'}`}>{card.stat}</p>
      <p className={`text-base ${dark ? 'text-white' : 'text-ink-800'}`}>{card.label}</p>
    </>
  )
}

// E / E-dark / G
function BorderCard({ card, iconSize, dark, logo }) {
  return (
    <div
      className={`flex max-w-[400px] flex-col items-start rounded-2xl border p-10 backdrop-blur-md ${
        dark ? 'border-ink-800 bg-blur-dark text-white' : 'border-ink-200 bg-blur'
      }`}
    >
      {logo && (
        <div className="relative mb-10 flex h-8">
          <Img a={card.logo} className="h-8 w-auto max-w-[150px] object-contain object-left" />
        </div>
      )}
      {card.icon && (
        <div className={`mb-10 ${iconSize === 56 ? 'h-14' : 'h-8'}`}>
          <Img a={card.icon} className={`${iconSize === 56 ? 'size-14' : 'size-8'} object-contain`} />
        </div>
      )}
      {card.stat && <Stat card={card} dark={dark} />}
      {card.title && <Title card={card} dark={dark} />}
      {card.body && <p className={`text-base ${dark ? 'text-white' : 'text-ink-800'} ${card.cta ? 'mb-10' : ''}`}>{card.body}</p>}
      {card.cta && <CardLink card={card} dark={dark} />}
    </div>
  )
}

function StatCard({ card, iconSize }) {
  return (
    <div className="flex max-w-[400px] flex-col items-start">
      {card.icon && (
        <div className={`mb-10 ${iconSize === 56 ? 'h-14' : 'h-8'}`}>
          <Img a={card.icon} className={`${iconSize === 56 ? 'size-14' : 'size-8'} object-contain`} />
        </div>
      )}
      <Stat card={card} />
    </div>
  )
}

function InlineIconCard({ card }) {
  return (
    <div className="flex max-w-[400px] flex-col items-start">
      <div className="mb-6 flex items-center gap-3">
        <Img a={card.icon} className="size-8 shrink-0 object-contain" />
        <h3 className="heading-4 text-ink-950">{card.title}</h3>
      </div>
      <p className="text-base text-ink-800">{card.body}</p>
    </div>
  )
}

export default function Feat({
  id,
  variant = 'A',
  eyebrow,
  title,
  body,
  center = false,
  pt0 = false,
  lockup,
  primary,
  tertiary,
  cards,
  iconSize = 32,
  dark = false,
  wash,
  stroke,
  gradient = 'gradient-01',
  stillStroke = false,
  cols4 = false,
}) {
  const washed = wash ?? (variant === 'A' || variant === 'B')
  const grid = variant === 'D' || cols4 ? 'sm:grid-cols-2 lg:grid-cols-4' : variant === 'F' && cards.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
  const shell = dark
    ? 'relative z-5 overflow-hidden bg-ink-950 py-12 text-white md:py-16'
    : `section overflow-hidden ${washed ? 'bottom-frequency' : ''}`
  const card = (c, i) => {
    switch (variant) {
      case 'C':
        return <ImageCard key={c.title} card={c} dark={dark} />
      case 'E':
        return <BorderCard key={c.title || i} card={c} iconSize={iconSize} dark={dark} />
      case 'G':
        return <BorderCard key={c.title} card={c} logo />
      case 'F':
        return <StatCard key={c.stat + c.label} card={c} iconSize={iconSize} />
      case 'H':
        return <InlineIconCard key={c.title} card={c} />
      default:
        return <IconCard key={c.title} card={c} iconSize={iconSize} />
    }
  }
  return (
    <section id={id} className={`${shell} ${pt0 ? '!pt-0' : ''}`}>
      {stroke && <Baton shape={stroke} gradient={gradient} dark={dark} still={stillStroke} />}
      <div className={dark || stroke ? 'container relative z-10' : 'container'}>
        {title && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            body={body}
            center={center}
            dark={dark}
            before={
              lockup && (
                <div>
                  <SiteLink to={lockup.to} className="block">
                    <Img a={lockup.image} className="block h-14 w-auto pb-4" />
                  </SiteLink>
                </div>
              )
            }
          >
            {(primary || tertiary) && (
              <div className="mt-10 flex flex-col gap-3 md:flex-row">
                <Btn cta={primary} variant={dark ? 'primary dark' : 'primary'} size="medium" />
                <Btn cta={tertiary} variant={dark ? 'tertiary dark' : 'tertiary'} size="medium" />
              </div>
            )}
          </SectionHeader>
        )}
        <div className={`relative z-10 mt-12 grid grid-cols-1 gap-10 md:mt-20 md:gap-6 ${grid}`}>{cards.map(card)}</div>
      </div>
    </section>
  )
}
