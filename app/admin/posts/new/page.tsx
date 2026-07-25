import { requireAdmin } from "@/lib/admin/auth"
import { PostEditor } from "@/components/admin/PostEditor"

export const dynamic = "force-dynamic"

export default async function NewPostPage() {
  await requireAdmin()
  return (
    <div className="mx-auto max-w-3xl px-6">
      <h1 className="font-display text-3xl font-bold tracking-display">
        New blog post
      </h1>
      <PostEditor />
    </div>
  )
}
