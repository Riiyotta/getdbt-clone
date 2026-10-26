import { useEffect } from 'react'

// Mirrors the original's ScrollAnimate component (read from getdbt.com chunk 9560):
//   useInView({ threshold: isMobile ? 0.1 : 0.3, delay: isMobile ? 100 : 0, triggerOnce: true })
//   isMobile = innerWidth < 1023, no rootMargin. react-intersection-observer hands `delay` straight to
//   `new IntersectionObserver(cb, { threshold, delay })`; Chromium honours it (IntersectionObserver v2:
//   at most one notification per target per 100ms), which is why mobile reveals land a little later
//   while scrolling. Browsers without IO v2 ignore the option, as they do on the original.
// One observer target per "root" ([data-reveal-root]); when the root crosses the threshold, the
// root itself (if it is an .animate-scroll-fade-up) and every .animate-scroll-fade-up inside it get
// .is-visible together. Stagger comes only from each element's animation-delay.
const MOBILE_MAX = 1023
const thresholdFor = () => (window.innerWidth < MOBILE_MAX ? 0.1 : 0.3)
const delayFor = () => (window.innerWidth < MOBILE_MAX ? 100 : 0)

function revealRoot(root) {
  if (root.classList.contains('animate-scroll-fade-up')) root.classList.add('is-visible')
  root.querySelectorAll('.animate-scroll-fade-up').forEach((el) => el.classList.add('is-visible'))
  root.setAttribute('data-reveal-done', '')
}

// `key` (the route path) re-runs the scan so each newly rendered page gets observed.
export default function useScrollReveal(key) {
  useEffect(() => {
    // roots flagged data-reveal-load are revealed on mount (see SectionHeader `revealOnLoad`)
    document.querySelectorAll('[data-reveal-root][data-reveal-load]:not([data-reveal-done])').forEach(revealRoot)
    const pending = () => [...document.querySelectorAll('[data-reveal-root]:not([data-reveal-done])')]
    if (!('IntersectionObserver' in window)) {
      pending().forEach(revealRoot)
      return undefined
    }
    let observer
    let threshold
    const connect = () => {
      threshold = thresholdFor()
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
              revealRoot(entry.target)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold, delay: delayFor() },
      )
      pending().forEach((el) => observer.observe(el))
    }
    connect()
    // the original re-reads isMobile on resize; re-create the observer when the threshold flips
    const onResize = () => {
      if (thresholdFor() !== threshold) {
        observer.disconnect()
        connect()
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [key])
}

// Props helper for an animated element with a stagger delay (0 / 100 / 200 / 300 / 400ms).
// Pass root=true when the element is also the observed root (the original's non-stagger ScrollAnimate).
export function reveal(delay = 0, className = '', root = false) {
  return {
    className: `animate-scroll-fade-up ${className}`.trim(),
    style: { animationDelay: `${delay}ms` },
    ...(root ? { 'data-reveal-root': '' } : {}),
  }
}

// Props for a non-animated observed root (the original's stagger ScrollAnimate wrapper).
export const revealRootProps = { 'data-reveal-root': '' }
