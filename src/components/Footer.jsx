import { useState } from 'react'
import { footer, ui } from '../content'
import Logo from './Logo'
import SiteLink from './SiteLink'
import { ChevronDown, GlobeIcon, SocialIcon } from './icons'

const linkCls = 'text-sm text-white/50 transition-colors duration-150 ease-standard hover:text-white hover:underline'

function LinkList({ col }) {
  return (
    <ul className="flex flex-col gap-2">
      {col.links.map((l, i) => (
        <li key={l} className="flex items-center">
          <SiteLink label={l} className={linkCls}>
            {l}
          </SiteLink>
          {col.badgeOn === i && (
            <span className="ms-4 rounded-badge bg-purple-600 p-1 font-mono text-badge font-medium text-white">
              {col.badge}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

function AccordionRow({ col }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-ink-800">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left font-display tracking-display text-h4 font-semibold text-white"
      >
        {col.title}
        <ChevronDown size={24} className={`transition-transform duration-200 ease-standard ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-6">
          <LinkList col={col} />
        </div>
      )}
    </div>
  )
}

function RegionSelect() {
  const { options } = footer.region
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(options[0])
  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-lg border border-ink-600 bg-ink-950 px-3 py-[10px] text-left text-sm text-white"
      >
        <GlobeIcon />
        {value}
        <ChevronDown
          className={`ml-auto opacity-50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 rounded-lg border border-ink-600 bg-ink-950 py-1"
        >
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === value}
                onClick={() => {
                  setValue(o)
                  setOpen(false)
                }}
                className="block w-full px-3 py-2 text-left text-sm text-white hover:bg-ink-800"
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// CLONE_SPEC 2.16
export default function Footer() {
  return (
    <footer className="relative z-5 bg-ink-950 pb-0 pt-12 text-white">
      <div className="container">
        <SiteLink to="/" aria-label={ui.home} className="inline-block">
          <Logo variant="light" width={147} height={34} />
        </SiteLink>

        <div className="max-lg:pb-10 lg:grid lg:grid-cols-8 lg:py-16">
          {/* Desktop link columns */}
          <div className="hidden lg:col-span-6 lg:grid lg:grid-cols-3 lg:gap-y-20">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="heading-5 mb-4 text-white">{col.title}</h3>
                <LinkList col={col} />
              </div>
            ))}
          </div>

          {/* <1024 accordion */}
          <div className="my-10 flex flex-col lg:hidden">
            {footer.columns.map((col) => (
              <AccordionRow key={col.title} col={col} />
            ))}
          </div>

          <div className="grid gap-x-8 gap-y-12 lg:col-span-2">
            <div>
              <h3 className="heading-5 mb-4 text-white">{footer.newsletter.title}</h3>
              <p className="mb-4 text-sm text-white/50">{footer.newsletter.body}</p>
              <SiteLink label={footer.newsletter.cta} className="button secondary dark medium max-lg:w-full">
                {footer.newsletter.cta}
              </SiteLink>
            </div>
            <div>
              <h3 className="heading-5 mb-4 text-white">{footer.region.title}</h3>
              <RegionSelect />
            </div>
            <div>
              <h3 className="heading-5 mb-4 text-white">{footer.social}</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-5 lg:max-w-[200px]">
                {ui.socialLabels.map((label, i) => (
                  <li key={label}>
                    <a href="#" aria-label={label} className="block text-white">
                      <SocialIcon index={i} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-ink-800 py-8 lg:flex-row lg:justify-between lg:py-6">
          <p className="shrink-0 text-sm text-white lg:w-[263px]">{footer.copyright}</p>
          <div className="flex flex-wrap gap-6 lg:flex-1 lg:gap-8">
            {footer.legal.map((l) => (
              <SiteLink key={l} label={l} className={linkCls}>
                {l}
              </SiteLink>
            ))}
            <button type="button" className={`basis-full text-left md:max-lg:basis-auto ${linkCls}`}>
              {footer.cookie}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
