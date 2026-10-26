import { useEffect, useRef, useState } from 'react'

const DRAG_THRESHOLD = 50 // px (not measured)

// Hand-built replacement for the original's Splide sliders (CLONE_SPEC 2.14, specs/T1-T4.md
// N-testi-slider): type 'slide', `perPage` visible, `perMove` per step, gap 1rem, 400ms
// cubic-bezier(.25,1,.5,1) track transition, draggable, no autoplay. Controls only when slides overflow.
export default function useSlider({ count, perPage, perMove = 1 }) {
  const maxIndex = Math.max(0, count - perPage)
  const overflow = count > perPage
  const [index, setIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const go = (i) => setIndex(Math.max(0, Math.min(maxIndex, i)))

  // page start indices: 0, perMove, 2*perMove ... clamped to the last full page
  const pages = []
  for (let i = 0; ; i += perMove) {
    pages.push(Math.min(i, maxIndex))
    if (i >= maxIndex) break
  }
  const page = pages.findIndex((p) => p >= index)

  const onPointerDown = (e) => {
    if (!overflow || e.button !== 0) return
    startX.current = e.clientX
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (dragging) setDragX(e.clientX - startX.current)
  }
  const endDrag = () => {
    if (!dragging) return
    if (dragX < -DRAG_THRESHOLD) go(index + perMove)
    else if (dragX > DRAG_THRESHOLD) go(index - perMove)
    setDragging(false)
    setDragX(0)
  }

  const gaps = perPage - 1
  const slideW = `calc((100% - ${gaps}rem) / ${perPage})`
  const offset = `calc(${-index} * ((100% - ${gaps}rem) / ${perPage} + 1rem) + ${dragX}px)`

  return {
    index,
    maxIndex,
    overflow,
    pages,
    page,
    go,
    prev: () => go(index - perMove),
    next: () => go(index + perMove),
    slideW,
    dragging,
    trackStyle: { transform: `translateX(${offset})` },
    trackHandlers: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag },
    isHidden: (i) => i < index || i >= index + perPage,
  }
}
