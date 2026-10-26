import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { accountLinks, menus, navCtas, navPlainLink, ui } from '../content'
import Logo from './Logo'
import MegaMenu from './MegaMenu'
import SiteLink from './SiteLink'
import {
  AddUserIcon,
  ChevronDown,
  ChevronRight24,
  CloseIcon,
  LoginIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from './icons'

// Original (getdbt.com chunk 5547, DesktopNavigation): mouseleave on a trigger or its panel closes
// the popover after 300ms; mouseenter clears that timer and opens immediately.
const CLOSE_DELAY = 300
const PANEL_LAG_FRAMES = 2 // measured on the original: panel transition starts ~50ms after the state change

export default function Navbar() {
  const navRef = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [navH, setNavH] = useState(91)
  const [open, setOpen] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [sub, setSub] = useState(null)
  const closeTimer = useRef()
  const { pathname } = useLocation()

  // A navigation closes any open menu/drawer and shows the nav again.
  useEffect(() => {
    clearTimeout(closeTimer.current)
    setOpen(null)
    setDrawer(false)
    setSub(null)
    setHidden(false)
  }, [pathname])

  // Original rule: hidden = scrollY > z && scrollY > lastScrollY, otherwise shown (top: -navH / 0,
  // 0.2s cubic-bezier(.4,0,.2,1)). z = page-top of the first <section> (the logo marquee, 556.6px
  // at 1440), re-measured on resize and on every route change (each page has its own first section).
  useEffect(() => {
    let lastY = window.scrollY
    let z = 0
    const measure = () => {
      const s = document.querySelector('section')
      z = s ? s.getBoundingClientRect().top + window.scrollY : 0
    }
    const onScroll = () => {
      const y = window.scrollY
      if (y > z && y > lastY) {
        if (navRef.current) setNavH(navRef.current.offsetHeight)
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY = y
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  // Escape / outside click closes the desktop menu
  useEffect(() => {
    if (open === null) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    const onDown = (e) => navRef.current && !navRef.current.contains(e.target) && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  const openMenu = (i) => {
    clearTimeout(closeTimer.current)
    setOpen(i)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // The button state (aria-expanded, chevron, bg) flips at once, but on the original the panel's
  // opacity/translate transition starts ~3 frames (~50ms) later, on open and on close (Headless UI
  // transition handshake). The panels follow `open` after the same number of frames.
  const [panelOpen, setPanelOpen] = useState(null)
  useEffect(() => {
    let id
    let n = PANEL_LAG_FRAMES
    const step = () => {
      if (--n <= 0) setPanelOpen(open)
      else id = requestAnimationFrame(step)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [open])

  const toggleDrawer = () => {
    setDrawer((d) => !d)
    setSub(null)
  }

  const subMenu = sub !== null ? menus[sub] : null
  const anim = 'transition-all duration-250 ease-standard'

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-60 border-b border-ink-200 bg-white py-6 transition-all duration-200 ease-standard"
      style={{ top: hidden ? -navH : 0 }}
    >
      {/* ---------------- Desktop (>=1024) ---------------- */}
      <div className="container hidden items-center justify-between lg:flex lg:max-xl:px-3">
        <SiteLink to="/" aria-label={ui.home} className="text-ink-950">
          <Logo />
        </SiteLink>
        <div className="flex items-center gap-2 2xl:gap-6">
          <div className="flex items-center">
            {menus.map((m, i) => (
              <button
                key={m.label}
                type="button"
                aria-expanded={open === i}
                aria-haspopup="true"
                className={`button tertiary medium md:max-2xl:px-2.5 ${open === i ? 'bg-ink-800/5' : ''}`}
                onMouseEnter={() => openMenu(i)}
                onMouseLeave={scheduleClose}
                onClick={() => {
                  clearTimeout(closeTimer.current)
                  setOpen(open === i ? null : i)
                }}
              >
                {m.label}
                <ChevronDown
                  className={`transition-transform duration-150 ease-standard ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
            ))}
            <SiteLink label={navPlainLink} className="button tertiary medium md:max-2xl:px-2.5">
              {navPlainLink}
            </SiteLink>
          </div>
          <div className="flex items-center gap-2 xl:gap-3">
            <button type="button" aria-label={ui.search} className="button tertiary p-2">
              <SearchIcon />
            </button>
            <SiteLink label={navCtas.secondary} className="button secondary medium">
              {navCtas.secondary}
            </SiteLink>
            <SiteLink label={navCtas.primary} className="button primary medium">
              {navCtas.primary}
            </SiteLink>
            <button type="button" aria-label={ui.account} className="button tertiary gap-1 p-2">
              <UserIcon />
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Mega-menu panels: one per trigger (Headless UI Popover per item on the original), stacked in
          the same spot, so switching triggers cross-fades: the old panel runs its 200ms close while
          the new one runs its 200ms open. opacity 0 + translateY(-8px) <-> 1 + 0, 200ms
          cubic-bezier(.4,0,.2,1). `visibility` flips immediately on open and at the end on close. */}
      {menus.map((m, i) => (
        <div
          key={m.label}
          data-mega-panel={i}
          className={`container pointer-events-none absolute left-0 right-0 top-full z-60 mx-auto hidden justify-center transition-all duration-200 ease-in-out lg:flex ${
            panelOpen === i ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
          aria-hidden={panelOpen !== i}
        >
          <MegaMenu menu={m} onMouseEnter={cancelClose} onMouseLeave={scheduleClose} />
        </div>
      ))}

      {/* ---------------- Mobile / tablet (<1024) ---------------- */}
      <div className="container relative flex h-10 items-center justify-between max-lg:px-6 lg:hidden">
        <SiteLink
          to="/"
          aria-label={ui.home}
          className={`text-ink-950 ${anim} ${sub !== null ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <Logo />
        </SiteLink>
        <button
          type="button"
          onClick={() => setSub(null)}
          className={`absolute left-6 top-1/2 flex h-6 w-[72px] -translate-y-1/2 items-center gap-1 text-base font-medium ${anim} ${
            sub !== null ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-2 opacity-0'
          }`}
          tabIndex={sub !== null ? 0 : -1}
        >
          <ChevronDown size={24} className="rotate-90" />
          {ui.back}
        </button>
        <div className="flex items-center gap-4">
          <button type="button" aria-label={ui.search}>
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label={drawer ? ui.closeMenu : ui.openMenu}
            aria-expanded={drawer}
            className="relative size-6"
            onClick={toggleDrawer}
          >
            <MenuIcon
              className={`absolute inset-0 ${anim} ${drawer ? 'translate-x-2 opacity-0' : 'translate-x-0 opacity-100'}`}
            />
            <CloseIcon
              className={`absolute inset-0 ${anim} ${drawer ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}
            />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`absolute left-0 right-0 top-[calc(100%+1px)] overflow-y-auto bg-white ${anim} lg:hidden ${
          drawer ? 'visible h-drawer translate-y-0 opacity-100' : 'invisible h-0 -translate-y-2 opacity-0'
        }`}
        aria-hidden={!drawer}
      >
        <div className="px-6 pb-[85px]">
          {subMenu === null ? (
            <>
              {menus.map((m, i) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSub(i)}
                  className="flex h-16 w-full items-center justify-between border-b border-ink-200 py-3 text-left text-xl font-semibold text-ink-950"
                >
                  {m.label}
                  <ChevronRight24 />
                </button>
              ))}
              <SiteLink
                label={navPlainLink}
                className="flex h-16 items-center border-b border-ink-200 py-3 text-xl font-semibold text-ink-950"
              >
                {navPlainLink}
              </SiteLink>
              {accountLinks.map((label, i) => (
                <SiteLink
                  key={label}
                  label={label}
                  className="flex h-16 items-center justify-between border-b border-ink-200 py-3 text-xl font-semibold text-ink-950"
                >
                  {label}
                  {i === 0 ? <LoginIcon /> : <AddUserIcon />}
                </SiteLink>
              ))}
            </>
          ) : (
            [...subMenu.groupA.items, ...subMenu.groupB.items].map((item) => (
              <SiteLink
                key={item.title}
                label={item.title}
                className="flex h-16 items-center border-b border-ink-200 py-3 text-xl font-semibold text-ink-950"
              >
                {item.title}
              </SiteLink>
            ))
          )}
        </div>
      </div>

      {/* Fixed bottom bar while the drawer is open */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex gap-3 border-t border-ink-200 bg-white p-6 ${anim} lg:hidden ${
          drawer ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
        }`}
        aria-hidden={!drawer}
      >
        <SiteLink label={navCtas.secondary} className="button secondary small grow">
          {navCtas.secondary}
        </SiteLink>
        <SiteLink label={navCtas.primary} className="button primary small grow">
          {navCtas.primary}
        </SiteLink>
      </div>
    </nav>
  )
}
