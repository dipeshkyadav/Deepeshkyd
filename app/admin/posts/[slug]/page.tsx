import { notFound } from "next/navigation"
import { requireAdmin } from "@/lib/admin/auth"
import { getBlogPosts } from "@/lib/content"
import { PostEditor } from "@/components/admin/PostEditor"

export const dynamic = "force-dynamic"

type Params = Promise<{ slug: string }>

export default async function EditPostPage({ params }: { params: Params }) {
  await requireAdmin()
  const { slug } = await params
  const posts = await getBlogPosts()
  const post = posts.find((candidate) => candidate.slug === slug)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-display text-3xl font-bold tracking-display">
        Edit post
      </h1>
      <PostEditor post={post} />
    </div>
  )
}
