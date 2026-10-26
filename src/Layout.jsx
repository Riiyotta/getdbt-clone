import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useScrollReveal from './hooks/useScrollReveal'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function Layout() {
  const { pathname } = useLocation()
  useScrollReveal(pathname)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
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
