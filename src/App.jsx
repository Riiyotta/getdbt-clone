import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { redirects, routes } from './routes'
import Layout from './Layout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import T1 from './pages/templates/T1'
import T2 from './pages/templates/T2'
import T3 from './pages/templates/T3'
import T4 from './pages/templates/T4'
import T5 from './pages/templates/T5'
import T6 from './pages/templates/T6'
import T7 from './pages/templates/T7'
import T8 from './pages/templates/T8'
import T9 from './pages/templates/T9'
import T10 from './pages/templates/T10'
import T11 from './pages/templates/T11'
import T12 from './pages/templates/T12'
import T13 from './pages/templates/T13'
import T14 from './pages/templates/T14'
import T15 from './pages/templates/T15'
import T16 from './pages/templates/T16'
import T17 from './pages/templates/T17'

// Template id -> page component. Templates not listed here render the ComingSoon stand-in.
const templates = { T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17 }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {routes.map(({ path, template }) => {
            const Page = templates[template] || ComingSoon
            return <Route key={path} path={path} element={<Page />} />
          })}
          {redirects.map(({ from, to }) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
