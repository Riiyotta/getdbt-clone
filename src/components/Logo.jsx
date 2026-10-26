import { assets } from '../assets'

// Wordmark image (ASSET_MANIFEST 1-2). Nav 139x32, footer 147x34 (light variant).
export default function Logo({ variant = 'dark', width = 139, height = 32, className = '' }) {
  return (
    <img
      src={assets.logo[variant]}
      alt={assets.logo.alt}
      width={width}
      height={height}
      className={`block ${className}`}
      style={{ width, height }}
    />
  )
}
