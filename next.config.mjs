/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnails (course covers)
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      // Vercel Blob uploads
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      // GitHub avatars / fallbacks
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      // Any other https host (admin-editable covers)
      { protocol: "https", hostname: "**" },
    ],
  },
}

export default nextConfig
