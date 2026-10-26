import { useEffect, useId, useRef, useState } from 'react'

// N-baton (specs/T1-T4.md A): brush-stroke decoration. A gradient-filled <foreignObject> masked by a
// thick round-capped stroke. The stroke paths below are original hand-drawn curves drawn for the
// clone, sized to the spec's viewBoxes and wrapper boxes (the original's path data is not used).
// Draw-on: stroke-dashoffset full -> 0 over 1s ease-in-out; the fill fades 0 -> 1 over 250ms. Both only
// at >=768: below 768 the original never sets a dash style (every stroke is static and fully drawn,
// measured on T1-T13 originals at 375 and 767), so the dash rules live in an md media query (index.css).
// Mount: the original's stroke is client-only (absent from the server HTML) and is inserted right
// after hydration, ~0.8s after DOMContentLoaded; nothing is drawn before that. MOUNT_DELAY mirrors it
// on the first page load (client-side route changes mount immediately).
// Triggers (measured on the originals at 1440, see the T12-T13 animation fix):
// - `load` (heroes): draw as soon as the stroke mounts.
// - default: IntersectionObserver, threshold 0.9, on the section-sized shell (the original observes its
//   `relative h-full w-full` wrapper, not the stroke). A section taller than viewport/0.9 never
//   reaches it, so its stroke never draws and the fill stays hidden >=768 (e.g. community bento, T4).
// `tall` (opt-in): if the clone's section is taller than viewport/0.9 only because its placeholder
//   copy wraps to more lines than the original's (case-studies featured story: 1045 vs 931), draw once
//   the section fills the viewport instead of never (min(0.9 x section, viewport) visible).
// `idle` (N-tabs-dark, T4 heroes): no observer, full undashed path, fill hidden at >=768 (visible
// below 768, where the original has no opacity class).
// `still` (specs/T12-T13.md A, about-us hero S3 and values dark grid S6): no dash style, fill fully
// visible, no observer.
const MOUNT_DELAY = 800

function mountWait() {
  if (typeof window === 'undefined' || !window.performance) return 0
  const nav = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null
  const dcl = nav && nav.domContentLoadedEventEnd ? nav.domContentLoadedEventEnd : null
  if (dcl == null) return null // DOMContentLoaded has not fired yet
  return Math.max(0, dcl + MOUNT_DELAY - performance.now())
}

const SHAPES = {
  // quote band (catalog, cost-optimization): x -48, 1536x438 at 1440
  S1: {
    w: 2427,
    h: 692,
    d: 'M48 318C412 112 1028 46 1586 104C1996 148 2214 300 2071 446C1924 596 1388 628 1262 520C1150 424 1466 330 1792 388C2040 432 2232 520 2379 600',
    wrap: 'absolute -left-12 -right-12 top-5 mx-auto',
    svg: 'block h-auto w-full',
  },
  // T3 hero: 1600x582 box, vertically centred in the header at >=768
  S3: {
    w: 2428,
    h: 582,
    d: 'M2379 372C2142 476 1818 548 1560 484C1302 420 1290 214 1132 128C990 52 854 150 742 236C612 336 446 330 316 268C204 214 118 132 48 60',
    wrap: 'absolute -left-20 -right-20 top-5 m-auto max-h-[582px] max-w-[2428px] md:bottom-0 md:my-auto',
    svg: 'block h-auto w-full',
  },
  // T4 hero, deploy hero, build-trust hero: 1840x516 box, centred in the header
  S4: {
    w: 2427,
    h: 516,
    d: 'M2379 432C2224 282 1866 70 1592 96C1384 116 1352 300 1486 392C1640 498 1888 404 1802 274C1690 104 1186 112 852 214C590 294 286 378 48 412',
    wrap: 'absolute -left-50 -right-50 bottom-0 top-0 m-auto max-h-[516px] max-w-[2427px]',
    svg: 'block h-auto w-full',
  },
  // T1 hero (develop, test-and-observe, mesh, catalog, semantic-layer) and helixa hero
  S5: {
    w: 2506,
    h: 697,
    d: 'M48 176C428 404 902 470 1232 318C1520 186 1640 34 1500 72C1338 116 1362 470 1612 588C1876 712 2236 480 2458 236',
    wrap: 'absolute -left-20 -right-20 top-5 mx-auto max-h-[697px] max-w-[2506px]',
    svg: 'block h-auto w-full',
  },
  // N-tabs-dark: 1276x899 at x=364, bottom -80 (right edge 200px past the viewport)
  S6: {
    w: 1276,
    h: 899,
    d: 'M712 851C780 702 524 566 300 470C136 400 40 334 104 280C196 204 668 392 980 450C1150 482 1236 430 1176 372C1092 290 760 268 704 166C658 82 858 52 1228 140',
    wrap: 'absolute -right-50 -bottom-20 h-fit max-h-[899px] w-full max-w-[1276px]',
    svg: 'block h-auto w-full',
  },
  // S2 (T12-T13): tall S-curve falling from top-right to bottom-left; 768x1306 at x692, top -280
  // (dark tabs on what-is-lattice, dark image cards on learn)
  S2: {
    w: 768,
    h: 1306,
    d: 'M720 48C642 196 404 222 292 352C176 488 286 604 470 660C664 720 716 872 560 986C410 1096 196 1112 48 1258',
    wrap: 'absolute -right-5 -top-25 h-fit max-h-[1306px] w-full max-w-[768px] rotate-[10deg] md:-top-70 md:rotate-0',
    svg: 'block h-auto w-full',
  },
  // S7 (T12-T13): wide loop entering right, looping through the middle, leaving left; x -431, +20,
  // 2303x853 (dark card grids on /product/lattice and /product/charts)
  S7: {
    w: 2303,
    h: 853,
    d: 'M2255 176C1928 252 1588 386 1350 534C1150 658 1006 716 962 622C916 524 1086 420 1234 470C1384 520 1310 700 1050 772C780 846 452 760 48 600',
    wrap: 'absolute -left-150 -right-150 top-5 mx-auto max-h-[853px] max-w-[2303px]',
    svg: 'block h-auto w-full',
  },
  // S9 (T12-T13): zig-zag "N" rising to the right. At >=768 the original's visible stroke box sits at
  // x = viewport width + 600 (2040 at 1440, 1368 at 768), fully clipped by its section, so it is only
  // rendered below 768 (-40, +20, 615x416 at 375, matching the original).
  S9: {
    w: 1705,
    h: 1153,
    d: 'M48 1105C176 820 300 470 452 330C566 226 650 470 760 700C872 934 1000 960 1120 680C1238 404 1400 168 1657 48',
    wrap: 'absolute -left-10 -right-50 top-5 bottom-auto max-h-[1153px] max-w-[1705px] md:hidden',
    svg: 'block h-auto w-full',
  },
  // S10 (T12-T13): wide zig-zag, a long rise left to right, a sharp return, then a second rise;
  // x -400, +20, 2240x514 at 1440 (what-is-lattice hero, state section 1)
  S10: {
    w: 2861,
    h: 657,
    d: 'M48 609C560 548 1070 330 1468 104C1560 52 1606 108 1482 214C1330 344 1262 470 1460 488C1880 526 2380 300 2813 48',
    wrap: 'absolute -left-100 -right-100 top-5 mx-auto max-h-[657px] max-w-[2861px]',
    svg: 'block h-auto w-full',
  },
  // T2 hero (data-modernization, ai, embedded, cost-optimization): x -90, 1840x684
  S8: {
    w: 2277,
    h: 847,
    d: 'M48 498C246 252 620 66 836 106C1034 144 920 352 760 472C602 590 690 704 980 612C1292 512 1596 352 1846 420C2026 470 2156 640 2229 799',
    wrap: 'absolute -left-[90px] -right-[90px] top-5 mx-auto w-[calc(100%+400px)] max-w-none',
    svg: 'block h-auto w-full',
  },
}

export default function Baton({ shape, gradient = 'gradient-01', dark = false, idle = false, still = false, load = false, tall = false }) {
  const s = SHAPES[shape]
  const ref = useRef(null)
  const [mounted, setMounted] = useState(() => mountWait() === 0)
  const [drawn, setDrawn] = useState(false)
  const id = `baton${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  useEffect(() => {
    if (mounted) return undefined
    let t
    const arm = () => {
      t = setTimeout(() => setMounted(true), mountWait() ?? MOUNT_DELAY)
    }
    if (mountWait() == null) {
      document.addEventListener('DOMContentLoaded', arm, { once: true })
      return () => {
        document.removeEventListener('DOMContentLoaded', arm)
        clearTimeout(t)
      }
    }
    arm()
    return () => clearTimeout(t)
  }, [mounted])

  useEffect(() => {
    const el = ref.current
    if (!mounted || !el || idle || still) return undefined
    if (load || !('IntersectionObserver' in window)) {
      // let the undrawn state paint first so the transition runs
      let r2
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setDrawn(true))
      })
      return () => {
        cancelAnimationFrame(r1)
        cancelAnimationFrame(r2)
      }
    }
    const hit = (e) => {
      if (!e.isIntersecting) return false
      if (!tall) return e.intersectionRatio >= 0.9 - 1e-3
      const viewH = e.rootBounds ? e.rootBounds.height : window.innerHeight
      return e.intersectionRect.height >= Math.min(0.9 * e.boundingClientRect.height, viewH) - 0.5
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(hit)) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { threshold: tall ? Array.from({ length: 101 }, (_, i) => i / 100) : 0.9 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mounted, idle, still, load, tall])

  if (!s) return null
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={ref} className={`baton-shell relative mx-auto h-full w-full max-w-[2100px] ${dark ? 'baton-dark' : ''}`}>
        {mounted && (
          <div className={`${s.wrap} ${drawn ? 'baton-drawn' : ''} ${idle ? 'baton-idle' : ''} ${still ? 'baton-static' : ''}`}>
            <svg viewBox={`0 0 ${s.w} ${s.h}`} className={s.svg} fill="none">
              <defs>
                <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={s.w} height={s.h}>
                  <path
                    className="baton-path"
                    d={s.d}
                    pathLength="1"
                    stroke="white"
                    strokeWidth="96"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </mask>
              </defs>
              <foreignObject x="0" y="0" width={s.w} height={s.h} mask={`url(#${id})`}>
                <div className={`gradient-container ${gradient} baton-fill h-full w-full`} />
              </foreignObject>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
