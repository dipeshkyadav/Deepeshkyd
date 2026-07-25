import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts, photos, site } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { PostCard } from "@/components/cards/PostCard"
import { CreativeText } from "@/components/ui/CreativeText"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((candidate) => candidate.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = blogPosts.find((candidate) => candidate.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter((candidate) => candidate.slug !== slug).slice(0, 2)

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header>
        <CreativeText variant="condensed" className="text-sm">
          From the journey
        </CreativeText>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-display dark:text-ink-ondark md:text-5xl">
          {post.title}
        </h1>
        <time
          dateTime={post.publishedAt}
          className="mt-4 block text-sm text-ink-secondary dark:text-ink-ondark/60"
        >
          {formatDate(post.publishedAt)} · {site.fullName}
        </time>
      </header>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-secondary dark:text-ink-ondark/80">
        {post.content.map((paragraph, index) => (
          <div key={paragraph.slice(0, 32)}>
            <p>{paragraph}</p>
            {post.pullQuote && index === 1 && (
              <blockquote className="my-10 border-l-4 border-brand-purple pl-6">
                <CreativeText
                  variant="display"
                  className="text-2xl leading-snug md:text-3xl"
                >
                  “{post.pullQuote}”
                </CreativeText>
              </blockquote>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-16">
        <div className="flex items-center gap-4 rounded-2xl bg-surface p-6 dark:bg-surface-dark">
          <Image
            src={photos.posterContentCreator}
            alt={site.fullName}
            width={64}
            height={80}
            className="rounded-xl object-cover"
          />
          <div>
            <p className="font-display font-bold tracking-display dark:text-ink-ondark">
              {site.fullName}
            </p>
            <p className="text-sm text-ink-secondary dark:text-ink-ondark/60">
              {site.tagline} — documenting the whole journey, flops included.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-display dark:text-ink-ondark">
              Keep reading
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((candidate) => (
                <PostCard key={candidate.slug} post={candidate} />
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  )
}
