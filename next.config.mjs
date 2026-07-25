/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnails on the YT Tutorial page
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
}

export default nextConfig
