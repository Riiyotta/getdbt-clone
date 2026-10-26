import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import content from '../../content/pages/devModal'
import { CloseIcon } from '../icons'
import SiteLink from '../SiteLink'

// C-20 N-dev-modal (specs/T12-T13.md): the developer-path chooser behind hero `<button>` CTAs.
// Overlay fixed inset-0 #101828 at 80% + 4px backdrop blur; panel max-w 1050 / max-h 90vh, r16,
// white; enter 200ms ease-out from scale .95 / opacity 0. Close button top-right (24 icon, p-2,
// hover bg #f3f4f6). Header heading-2; rows heading-4 + paragraph + secondary button, divided by
// 1px #e5e7eb. Escape and overlay click close; Tab is trapped inside; focus returns to the trigger.
const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

function Dialog({ onClose }) {
  const panel = useRef(null)
  const [shown, setShown] = useState(false)
  const titleId = useId()

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true))
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector(FOCUSABLE)?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = [...panel.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!panel.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 bg-ink-900/80 backdrop-blur-xs transition-opacity duration-200 ease-out ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative max-h-[90vh] w-full max-w-[1050px] overflow-y-auto rounded-2xl bg-white transition duration-200 ease-out ${
          shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={content.close}
          className="absolute right-4 top-4 rounded-md p-2 text-ink-950 hover:bg-ink-100"
        >
          <CloseIcon />
        </button>
        <div className="p-8 pb-4 pt-12 md:p-12 md:pb-6">
          <h2 id={titleId} className="heading-2 text-ink-950">
            {content.title}
          </h2>
        </div>
        <div className="px-8 pb-8 md:px-12 md:pb-12">
          {content.rows.map((row) => (
            <div
              key={row.title}
              className="flex flex-col justify-between gap-4 border-b border-ink-200 py-6 last:border-b-0 md:flex-row md:items-center md:gap-6"
            >
              <div>
                <h3 className="heading-4 !mb-2 text-ink-950">{row.title}</h3>
                <p className="text-base text-ink-800">{row.body}</p>
              </div>
              <SiteLink to={row.cta.to} onClick={onClose} className="button secondary medium shrink-0">
                {row.cta.label}
              </SiteLink>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function DevModalButton({ children, className, ...props }) {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const close = useRef(() => {
    setOpen(false)
    requestAnimationFrame(() => trigger.current?.focus())
  }).current
  return (
    <>
      <button ref={trigger} type="button" aria-haspopup="dialog" className={className} onClick={() => setOpen(true)} {...props}>
        {children}
      </button>
      {open && <Dialog onClose={close} />}
    </>
  )
}
