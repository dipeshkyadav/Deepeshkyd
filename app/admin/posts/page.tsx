import Link from "next/link"
import { requireAdmin } from "@/lib/admin/auth"
import { getBlogPosts } from "@/lib/content"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export const dynamic = "force-dynamic"

export default async function AdminPostsPage() {
  await requireAdmin()
  const posts = await getBlogPosts()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-display">
            Blog posts
          </h1>
          <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
            {posts.length} published
          </p>
        </div>
        <Button href="/admin/posts/new">New blog post</Button>
      </div>
      <ul className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 dark:divide-white/10 dark:border-white/10">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
          >
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-ink-secondary dark:text-ink-ondark/60">
                {formatDate(post.publishedAt)} · /blog/{post.slug}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {post.featured ? <Badge tone="purple">Featured</Badge> : null}
              <Link
                href={`/admin/posts/${post.slug}`}
                className="text-sm font-medium text-brand-purple hover:underline"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
