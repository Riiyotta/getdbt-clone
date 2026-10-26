#!/usr/bin/env node
// Optional re-measure tool for extraction/measured-values.json -> sectionHeights (R9).
// Measures every implemented route of routes/routes.json at 1440x900 in a headless browser:
// the announcement bar (full chrome only), the first nav (or the event header), the footer (absent on chrome 'none') and each direct child of <main>, after a full scroll so lazy media settle.
//
//   PLAYWRIGHT_MODULE=<path or package name of playwright>   (default: "playwright", resolved normally)
//   BASE_URL=http://localhost:5197                            (the clone's dev server)
//   node extraction/measure_sections.mjs > <output-file>.json
//
// No absolute paths are stored here; the browser comes from the playwright package you point at.
// Output maps route -> { docHeightPx, chrome, main: [{tag, position, topPx, heightPx}] }; copy the numbers
// into measured-values.json (node order must equal the route's reference PageSpec; wrapper_gate.py checks it).
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.BASE_URL || 'http://localhost:5197'
const routes = JSON.parse(readFileSync(join(repo, 'routes/routes.json'), 'utf8')).routes.filter((r) => r.status === 'implemented')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const out = { viewport: 1440, routes: {} }
for (const { path } of routes) {
  await page.goto(base + path, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(250)
  out.routes[path] = await page.evaluate(() => {
    const box = (el) => {
      const b = el.getBoundingClientRect()
      return { topPx: Math.round(b.top + scrollY), heightPx: Math.round(b.height * 10) / 10, position: getComputedStyle(el).position }
    }
    const pick = (sel) => (document.querySelector(sel) ? box(document.querySelector(sel)) : null)
    return {
      docHeightPx: document.documentElement.scrollHeight,
      shell: { announcement: pick('.announcement-bar'), nav: pick('nav, header.summit-nav'), footer: pick('footer') }, // map to the route's chrome variant (full | event | none) in routes/routes.json
      main: [...document.querySelector('main').children].map((el) => ({ tag: el.tagName.toLowerCase(), ...box(el) })),
    }
  })
}
await browser.close()
process.stdout.write(JSON.stringify(out, null, 1) + '\n')
