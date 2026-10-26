import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useScrollReveal from './hooks/useScrollReveal'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { EventFooter, EventNav, useSummitFonts } from './components/chrome/EventChrome'
import MinimalNav from './components/chrome/MinimalNav'

// Chrome per route (specs/T14-T17.md §0). Everything not listed gets the full site chrome.
// 'event': summit sub-nav + summit footer, no announcement bar. 'none': minimal nav, no footer.
const CHROME = {
  '/summit': 'event',
  '/partner-directory': 'none',
}
export const chromeFor = (pathname) => CHROME[pathname.replace(/\/+$/, '') || '/'] || 'full'

function EventShell() {
  useSummitFonts()
  return (
    <div className="summit" data-site="summit">
      <EventNav />
      <main>
        <Outlet />
      </main>
      <EventFooter />
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useScrollReveal(pathname)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const chrome = chromeFor(pathname)
  if (chrome === 'event') return <EventShell />
  if (chrome === 'none') {
    return (
      <>
        <MinimalNav />
        <main>
          <Outlet />
        </main>
      </>
    )
  }
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
