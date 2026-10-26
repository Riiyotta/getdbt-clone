import { useCallback, useEffect, useState } from 'react'
import { announcements, ui } from '../content'
import { announcementLinks } from '../links'
import { ArrowLeft, ArrowRight } from './icons'
import SiteLink from './SiteLink'

// CLONE_SPEC 2.1. Slides: [clone of last, 1..4, clone of first] => 6 children, start at index 1.
const withLinks = announcements.map((text, i) => ({ text, to: announcementLinks[i] }))
const slides = [withLinks[withLinks.length - 1], ...withLinks, withLinks[0]]
const LAST = slides.length - 1

export default function AnnouncementBar() {
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)

  const step = useCallback((dir) => {
    setAnimate(true)
    setIndex((i) => {
      const n = i + dir
      return n < 0 || n > LAST ? i : n
    })
  }, [])

  // autoplay every 8000ms
  useEffect(() => {
    const id = setInterval(() => step(1), 8000)
    return () => clearInterval(id)
  }, [step])

  // re-enable transition one frame after a silent jump
  useEffect(() => {
    if (animate) return undefined
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [animate])

  // after the 500ms slide onto a clone, jump silently to the real slide (measured ~500ms later)
  useEffect(() => {
    if (index !== LAST && index !== 0) return undefined
    const id = setTimeout(() => {
      setAnimate(false)
      setIndex(index === LAST ? 1 : LAST - 1)
    }, 500)
    return () => clearTimeout(id)
  }, [index])

  return (
    <div className="announcement-bar gradient-container hidden h-[53px] py-2 lg:block">
      <div className="container relative z-10 flex h-full items-center justify-center lg:max-xl:px-3">
        <button
          type="button"
          aria-label={ui.prevAnnouncement}
          className="mr-auto shrink-0 text-white"
          onClick={() => step(-1)}
        >
          <ArrowLeft />
        </button>
        <div className="w-full overflow-hidden">
          <div
            className={`flex w-full ${animate ? 'transition-transform duration-500 ease-[ease-in-out]' : ''}`}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map(({ text, to }, i) => (
              <SiteLink
                key={i}
                to={to}
                className="w-full flex-none text-center text-base font-medium text-white no-underline"
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
              >
                {text}
              </SiteLink>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label={ui.nextAnnouncement}
          className="ml-auto shrink-0 text-white"
          onClick={() => step(1)}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
