import { useId, useRef, useState } from 'react'

// WAI-ARIA tabs with automatic activation (focus selects), like Headless UI's Tab.Group defaults.
// orientation 'vertical' uses ArrowUp/ArrowDown, 'horizontal' ArrowLeft/ArrowRight; Home/End jump.
// Panels swap instantly (no transition, no autoplay) per specs/T1-T4.md.
export default function useTabs(count, orientation = 'horizontal') {
  const [selected, setSelected] = useState(0)
  const refs = useRef([])
  const base = useId().replace(/[^a-zA-Z0-9]/g, '')

  const select = (i) => {
    setSelected(i)
    refs.current[i]?.focus()
  }
  const onKeyDown = (e) => {
    const [prevKey, nextKey] = orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight']
    let next
    if (e.key === nextKey) next = (selected + 1) % count
    else if (e.key === prevKey) next = (selected - 1 + count) % count
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = count - 1
    if (next === undefined) return
    e.preventDefault()
    select(next)
  }

  const listProps = { role: 'tablist', 'aria-orientation': orientation }
  const tabProps = (i) => ({
    type: 'button',
    role: 'tab',
    id: `${base}-tab-${i}`,
    'aria-selected': i === selected,
    'aria-controls': `${base}-panel-${i}`,
    tabIndex: i === selected ? 0 : -1,
    onClick: () => setSelected(i),
    onKeyDown,
    ref: (el) => {
      refs.current[i] = el
    },
  })
  const panelProps = {
    role: 'tabpanel',
    id: `${base}-panel-${selected}`,
    'aria-labelledby': `${base}-tab-${selected}`,
    tabIndex: 0,
  }
  return { selected, setSelected, listProps, tabProps, panelProps }
}
