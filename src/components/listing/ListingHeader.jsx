// listing.header (specs/T5-T8.md A-1).
// hub (A-1a, T6): left-aligned heading-1 only; py 48 / 24 bottom at >=768.
// centred (A-1b, T7): optional mono eyebrow, heading-1, 18/28 lead, in 8 centred columns
// (`wide`: all 12 columns, as /case-studies).
export default function ListingHeader({ variant = 'centred', eyebrow, title, lead, wide = false }) {
  if (variant === 'hub') {
    return (
      <header className="bg-white py-12 md:pb-6 md:pt-12">
        <div className="container">
          <h1 className="heading-1 text-ink-950">{title}</h1>
        </div>
      </header>
    )
  }
  return (
    <header className="overflow-hidden bg-white py-12 md:py-16">
      <div className="container">
        <div className="grid-container mx-auto text-center">
          <div className={wide ? 'col-span-full flex flex-col items-center' : 'col-span-full lg:col-span-8 lg:col-start-3'}>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="heading-1 !mb-0 text-ink-950">{title}</h1>
            {lead && <p className="mt-6 text-lg text-ink-950">{lead}</p>}
          </div>
        </div>
      </div>
    </header>
  )
}
