import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type { Video } from "@/lib/types"
import { formatDate } from "@/lib/utils"

function MarqueeCard({ video }: { video: Video }) {
  // Plain string concatenation on purpose — never let tooling mangle the URL.
  const thumbnail = "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg"
  return (
    <Link
      href="/yt-tutorial"
      className="group w-72 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
    >
      <span className="relative block aspect-video overflow-hidden rounded-xl bg-surface shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift dark:bg-surface-dark">
        <Image
          src={thumbnail}
          alt=""
          fill
          sizes="288px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Play overlay — fades and scales in on hover */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
          <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/95 text-brand-purple opacity-0 shadow-lift transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play size={20} strokeWidth={2} fill="currentColor" className="ml-0.5" />
          </span>
        </span>
      </span>
      <span className="mt-3 block font-semibold transition-colors group-hover:text-brand-purple dark:text-ink-ondark">
        {video.title}
      </span>
      <span className="block text-sm text-ink-secondary dark:text-ink-ondark/60">
        {formatDate(video.publishedAt)}
      </span>
    </Link>
  )
}

/**
 * Infinite auto-scrolling film strip. The list is repeated and animated
 * -50% on a loop, so the seam is invisible. Pauses on hover; respects
 * prefers-reduced-motion via the global CSS rule.
 */
export function VideoMarquee({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null
  const base: Video[] = []
  while (base.length < 8) {
    base.push(...videos)
  }
  return (
    <div
      className="marquee-paused -mx-6 overflow-hidden px-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max gap-6 pb-4">
        {[...base, ...base].map((video, index) => (
          <MarqueeCard key={`${video.id}-${index}`} video={video} />
        ))}
      </div>
    </div>
  )
}
