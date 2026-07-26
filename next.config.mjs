/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnails on the YT Tutorial page and course covers
      { protocol: "https", hostname: "i.ytimg.com" },
      // Brand poster photos served from the original deployment
      { protocol: "https", hostname: "dipeshkyd-1.vercel.app" },
      // Permanent admin photo uploads (Vercel Blob)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
}

export default nextConfig
