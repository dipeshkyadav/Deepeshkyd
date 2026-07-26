import Link from "next/link"
import {
  FileText,
  GraduationCap,
  PlaySquare,
  ShoppingBag,
} from "lucide-react"
import { adminEmail, requireAdmin } from "@/lib/admin/auth"
import {
  getBlogPosts,
  getCourses,
  getProducts,
  getVideos,
} from "@/lib/content"
import { formatDate } from "@/lib/utils"
import { LogoutButton } from "@/components/admin/LogoutButton"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  await requireAdmin()
  const [posts, courses, videos, products] = await Promise.all([
    getBlogPosts(),
    getCourses(),
    getVideos(),
    getProducts(),
  ])

  const cards = [
    {
      label: "Blog posts",
      count: posts.length,
      href: "/admin/posts",
      Icon: FileText,
    },
    {
      label: "Courses",
      count: courses.length,
      href: "/admin/courses",
      Icon: GraduationCap,
    },
    {
      label: "Videos",
      count: videos.length,
      href: "/admin/videos",
      Icon: PlaySquare,
    },
    {
      label: "Products",
      count: products.length,
      href: "/admin/products",
      Icon: ShoppingBag,
    },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-display">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
            Signed in as {adminEmail()}
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-ink/10 bg-surface p-5 transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-surface-dark"
          >
            <card.Icon
              size={20}
              strokeWidth={1.75}
              className="text-brand-purple"
            />
            <p className="mt-3 font-display text-3xl font-bold tracking-display">
              {card.count}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-secondary group-hover:text-brand-purple dark:text-ink-ondark/70">
              {card.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admin/posts/new">New blog post</Button>
        <Button href="/admin/photos" variant="secondary">
          Upload photos
        </Button>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-display">
          Recent blog posts
        </h2>
        <Link
          href="/admin/posts"
          className="text-sm font-medium text-brand-purple hover:underline"
        >
          View all
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10 dark:divide-white/10 dark:border-white/10">
        {posts.slice(0, 5).map((post) => (
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
