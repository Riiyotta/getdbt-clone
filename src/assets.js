// Single map of every image/logo the page renders: role -> public path.
// All files under public/assets/ are original SVG artwork for the fictional brand "Lattice" and
// invented customer/tool names (see ASSET_MANIFEST.md for rendered sizes). Wordmarks are converted
// to vector paths (OFL fonts); mockups embed OFL IBM Plex Mono / Outfit via @font-face data URIs.
// Generic UI icons (chevrons, arrows, search, menu, social glyphs) stay inline in components/icons.jsx.

const A = '/assets'

export const assets = {
  // ASSET_MANIFEST 1-2: 391x90 natural, rendered 139x32 (nav) / 147x34 (footer)
  logo: { dark: `${A}/logo/logo-dark.svg`, light: `${A}/logo/logo-light.svg`, alt: 'Lattice' },

  // 3-10: 8 marquee logos, rendered 120 wide x listed height, object-contain, max-h 40
  marquee: [
    { src: `${A}/marquee/logo-1.svg`, height: 31, alt: 'Kestrel' },
    { src: `${A}/marquee/logo-2.svg`, height: 34, alt: 'Meridian Partners' },
    { src: `${A}/marquee/logo-3.svg`, height: 40, alt: 'Tidepool' },
    { src: `${A}/marquee/logo-4.svg`, height: 32, alt: 'Ferrocene' },
    { src: `${A}/marquee/logo-5.svg`, height: 40, alt: 'Orbitly' },
    { src: `${A}/marquee/logo-6.svg`, height: 19, alt: 'Halcyon' },
    { src: `${A}/marquee/logo-7.svg`, height: 20, alt: 'Basalt Health' },
    { src: `${A}/marquee/logo-8.svg`, height: 40, alt: 'Fernway' },
  ],

  // 11: dark news band lockup, rendered 326x71
  newsLockup: { src: `${A}/news/lockup.svg`, alt: 'Northwind + Lattice' },

  // 12-14: feature panel media (GIF in the original), aspect ~1.85:1, radius 8, max-h 550
  features: [
    { src: `${A}/features/feature-1.svg`, width: 1920, height: 1041, alt: 'Lattice editor flagging an unknown column while a model is written' },
    { src: `${A}/features/feature-2.svg`, width: 1920, height: 1038, alt: 'Column-level lineage graph for an intermediate model' },
    { src: `${A}/features/feature-3.svg`, width: 1920, height: 1036, alt: 'Rename refactor preview with a downstream build log' },
  ],

  // 15-20: integration tile logos, 30x30 contained in a 40x40 box
  integrations: [1, 2, 3, 4, 5, 6].map((n) => `${A}/integrations/logo-${n}.svg`),

  // 21-23: "why" card icons, 56x56
  whyIcons: [1, 2, 3].map((n) => `${A}/why/icon-${n}.svg`),

  // 24: pipeline diagram, 555x409, radius 16
  diagram: { src: `${A}/diagram/pipeline.svg`, width: 555, height: 409, alt: 'Sources flowing through Lattice models to downstream consumers' },

  // 25-28: IDE tile icons, 40x40 (keyed by content.ide.tiles[].icon)
  ideIcons: {
    terminal: `${A}/ide/terminal.svg`,
    desktop: `${A}/ide/desktop.svg`,
    web: `${A}/ide/web.svg`,
    notebook: `${A}/ide/notebook.svg`,
  },

  // 29-30: testimonial logos in a 100x50 object-contain box
  testimonialLogos: [
    { src: `${A}/testimonials/logo-a.svg`, alt: 'Fernway' },
    { src: `${A}/testimonials/logo-b.svg`, alt: 'Orbitly' },
  ],

  // 31: mega-menu item icons, 20x20 in a 40x40 tile (keyed by content menus[].items[].icon)
  menuIcons: {
    code: `${A}/menu/code.svg`,
    layout: `${A}/menu/layout.svg`,
    build: `${A}/menu/build.svg`,
    flask: `${A}/menu/flask.svg`,
    blocks: `${A}/menu/blocks.svg`,
    book: `${A}/menu/book.svg`,
    ship: `${A}/menu/ship.svg`,
    layers: `${A}/menu/layers.svg`,
  },

  // 32: mega-menu featured thumbnail, 124x61
  menuFeatured: `${A}/menu/featured.svg`,
}
