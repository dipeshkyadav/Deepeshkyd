import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { TiltCard } from "@/components/ui/TiltCard"

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <TiltCard className="h-full rounded-2xl">
      <Link
        href={`/blog/${post.slug}`}
        className="glass-card group flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      >
        {post.image ? (
          <div className="relative -mx-6 -mt-6 aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <time
          dateTime={post.publishedAt}
          className="text-sm text-ink-secondary dark:text-ink-ondark/60"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="font-display text-xl font-bold tracking-display dark:text-ink-ondark">
          {post.title}
        </h3>
        <p className="flex-1 text-sm text-ink-secondary dark:text-ink-ondark/70">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 font-semibold text-brand-purple">
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
