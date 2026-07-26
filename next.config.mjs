/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow any https image host — course covers and product photos are
    // admin-editable URLs (YouTube thumbnails, Vercel Blob uploads, etc.),
    // so an unknown hostname must never crash a page render.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
}

export default nextConfig
