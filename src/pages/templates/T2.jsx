import pages from '../../content/pages/t2'
import SectionsPage from './Sections'

// T2 page template (specs/T1-T4.md): section order and content come from content/pages/t2.js.
export default function T2() {
  return <SectionsPage pages={pages} />
}
