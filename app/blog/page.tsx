import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getBlogPosts } from "@/lib/content"
import { formatDate } from "@/lib/utils"
import { PostCard } from "@/components/cards/PostCard"
import { Section } from "@/components/layout/Section"
import { CreativeText } from "@/components/ui/CreativeText"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays and post-mortems from Dipesh Kr Yadav's creator journey — focus, growth, and building in public.",
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0]
  const rest = blogPosts.filter((post) => post.slug !== featured.slug)

  return (
    <Section eyebrow="Notes from the journey" script="read" title="The blog">
      {/* Magazine-style lead story */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group grid gap-6 rounded-2xl bg-surface p-8 shadow-card transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:bg-surface-dark md:grid-cols-[2fr_3fr] md:p-12"
      >
        <div>
          <CreativeText variant="condensed" className="text-sm">
            Featured essay
          </CreativeText>
          <time
            dateTime={featured.publishedAt}
            className="mt-2 block text-sm text-ink-secondary dark:text-ink-ondark/60"
          >
            {formatDate(featured.publishedAt)}
          </time>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold tracking-display group-hover:text-brand-purple dark:text-ink-ondark md:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-4 text-lg text-ink-secondary dark:text-ink-ondark/70">
            {featured.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-purple">
            Read the essay
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  )
}
