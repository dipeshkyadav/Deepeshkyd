import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { TiltCard } from "@/components/ui/TiltCard"

/* Rotating accent palette — each post's topic gets its own highlight color,
   while dates and body copy stay simple and neutral. */
const accents = [
  "text-brand-purple dark:text-brand-purple-light",
  "text-rose-600 dark:text-rose-400",
  "text-sky-600 dark:text-sky-400",
  "text-emerald-600 dark:text-emerald-400",
  "text-amber-600 dark:text-amber-400",
]

function accentFor(slug: string): string {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 9973
  }
  return accents[hash % accents.length]
}

export function PostCard({ post }: { post: BlogPost }) {
  const accent = accentFor(post.slug)
  return (
    <TiltCard className="h-full rounded-2xl">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-bg-light p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:bg-surface-dark"
      >
        {post.image ? (
          <div className="relative -mx-6 -mt-6 aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <time
          dateTime={post.publishedAt}
          className="text-sm text-ink-secondary dark:text-ink-ondark/60"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h3 className={`font-display text-xl font-bold tracking-display ${accent}`}>
          {post.title}
        </h3>
        <p className="flex-1 text-sm text-ink-secondary dark:text-ink-ondark/70">
          {post.excerpt}
        </p>
        <span className={`inline-flex items-center gap-2 font-semibold ${accent}`}>
          Read post
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
    </TiltCard>
  )
}
