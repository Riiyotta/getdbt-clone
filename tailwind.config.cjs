/** @type {import('tailwindcss').Config} */
const sansStack = [
  'Outfit',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Helvetica Neue"',
  '"Segoe UI"',
  'Ubuntu',
  'Roboto',
  'Noto',
  'Arial',
  'sans-serif',
]
const monoStack = [
  '"IBM Plex Mono"',
  'ui-monospace',
  '"Cascadia Code"',
  '"Source Code Pro"',
  'Menlo',
  'Consolas',
  'monospace',
]

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // CLONE_SPEC 0.2: Tailwind's container is replaced by the custom .container in index.css
  corePlugins: { container: false },
  theme: {
    // CLONE_SPEC 0.1: the site's 2xl is 1440, not 1536
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        ink: {
          950: '#030711',
          900: '#101828',
          800: '#1e2939',
          700: '#364153',
          600: '#4a5565',
          500: '#6a7282',
          400: '#99a1af',
          300: '#d1d5dc',
          200: '#e5e7eb',
          100: '#f3f4f6',
          50: '#f9fafb',
        },
        purple: {
          50: '#f6f5ff',
          100: '#ecebff',
          400: '#9786ff',
          600: '#632ff5',
          700: '#5720e1',
          900: '#3d189a',
        },
        orange: {
          50: '#fff9f5',
          400: '#ff9e5f',
          500: '#fe8331',
          600: '#fe6703',
          700: '#dd5604',
        },
        sun: '#ffcc25',
        dot: '#cccccc',
        // CTA section base colour (gradient-12 background-color rgb(6,42,224))
        cobalt: '#062ae0',
        // T1-T4 spec tokens
        // bg-blur-dark: #101828 at 70% (dark cards, dark tablist, media frame); pair with backdrop-blur-md
        'blur-dark': 'rgba(16,24,40,.7)',
        // bg-blur: white at 90% ("why" cards, quote cards); pair with backdrop-blur-md
        blur: 'rgba(255,255,255,.9)',
        inverse: {
          secondary: 'rgba(255,255,255,.8)',
          tertiary: 'rgba(255,255,255,.5)', // inactive dark tab titles
          line: 'rgba(255,255,255,.1)', // inverse-tertiary border: dark tab dividers, dark media frame
        },
        // T12-T13 spec tokens
        danger: '#ff4141', // journey "x" icons, journey red dot
        journey: {
          green: 'rgb(146,196,48)', // status badge text/border (bg = same at 20%)
          yellow: 'rgb(255,204,37)',
          ok: '#73d480', // overlay dots
          warn: '#ffe367',
          line: '#929292', // overlay curve start
          amber: '#fd8e00', // overlay curve end
        },
      },
      spacing: {
        30: '7.5rem', // lg:py-30 (120px) on dark sections
        50: '12.5rem', // -left-50 / -right-50 baton offsets (200px)
        // T12-T13: md:pl-15 (stats aside), baton offsets, lg:min-h-125 (journey columns)
        15: '3.75rem',
        25: '6.25rem',
        70: '17.5rem',
        100: '25rem',
        125: '31.25rem',
        150: '37.5rem',
      },
      // Outfit is ~1.8% wider than polymath at weight 600; -0.008em reproduces the original's
      // line breaks for every display block (measured: safe range -0.005..-0.012em). Body needs none.
      letterSpacing: { display: '-0.008em' },
      fontFamily: {
        display: sansStack,
        sans: sansStack,
        mono: monoStack,
      },
      // CLONE_SPEC 0.6 type roles
      fontSize: {
        h1: ['48px', '57.6px'],
        'h1-xl': ['64px', '76.8px'],
        h2: ['32px', '38.4px'],
        'h2-xl': ['48px', '57.6px'],
        h3: ['24px', '28.8px'],
        'h3-xl': ['32px', '38.4px'],
        h4: ['20px', '24px'],
        'h4-xl': ['24px', '28.8px'],
        h5: ['18px', '21.6px'],
        stat: ['32px', '38.4px'],
        metric: ['64px', '64px'],
        badge: ['10px', '14.29px'],
        // customer-tab stat number: 64/64 below lg, 88/88 at lg (original text-6xl / text-8xl)
        'stat-lg': ['88px', '88px'],
        // T12-T13 stat display (heading-display md:text-[5rem]): 80/80 400, 64/64 below 768
        display: ['80px', '80px'],
      },
      borderRadius: {
        badge: '4px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        primary: '0 32px 64px -16px rgba(3,7,17,.24)',
        glow: '0 0 100px 40px rgba(255,0,255,.3)',
        // highlighted journey card (self-hosting)
        ember: '0 0 40px rgba(255,90,0,.35)',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '3xl': '64px',
      },
      width: {
        'container-xl': '1152px',
        'container-2xl': '1248px',
        megamenu: '846px',
      },
      maxWidth: {
        'container-xl': '1152px',
        'container-2xl': '1248px',
        marquee: '1240px',
      },
      height: {
        drawer: 'calc(100vh - 90px)',
      },
      zIndex: {
        5: '5',
        60: '60',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(.4,0,.2,1)',
        reveal: 'cubic-bezier(0,0,0,1)',
        slider: 'cubic-bezier(.25,1,.5,1)',
      },
      transitionDuration: {
        250: '250ms',
        400: '400ms',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slider: {
          '0%': { transform: 'translate(-2%)' },
          '100%': { transform: 'translate(-35.35%)' },
        },
      },
      animation: {
        'scroll-fade-up': 'fadeUp .4s cubic-bezier(0,0,0,1) forwards',
        slider: 'slider 30s linear infinite',
      },
    },
  },
  plugins: [],
}
