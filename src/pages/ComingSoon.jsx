import { useLocation } from 'react-router-dom'

// Temporary stand-in for routes whose template hasn't been built yet.
export default function ComingSoon() {
  const { pathname } = useLocation()
  return (
    <section className="container py-32 text-center">
      <p className="font-mono text-sm text-ink-500">{pathname}</p>
      <h1 className="heading-2 mt-4 text-ink-950">This page is being built</h1>
    </section>
  )
}
