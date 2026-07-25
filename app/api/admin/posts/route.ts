import { NextResponse } from "next/server"
import { z } from "zod"
import { isAdmin } from "@/lib/admin/auth"
import { getBlogPosts, isContentWriteError, saveBlogPosts } from "@/lib/content"

const postSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: lowercase letters, numbers, and hyphens only"),
  title: z.string().min(3, "Title needs at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt needs at least 10 characters"),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  featured: z.boolean().optional(),
  pullQuote: z.string().optional(),
  content: z.array(z.string().min(1)).min(1, "Add at least one paragraph"),
})

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

function contentWriteErrorResponse(error: unknown) {
  if (isContentWriteError(error)) {
    console.error("[admin:posts] content save failed", {
      code: error.code,
      fsCode: error.fsCode ?? "UNKNOWN",
    })
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    )
  }
  console.error("[admin:posts] unexpected content save failure")
  return NextResponse.json(
    {
      error: "Failed to save post due to a server error.",
      code: "CONTENT_SAVE_FAILED",
    },
    { status: 500 },
  )
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized()
  const parsed = postSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid post" },
      { status: 400 },
    )
  }
  const posts = await getBlogPosts()
  if (posts.some((post) => post.slug === parsed.data.slug)) {
    return NextResponse.json(
      { error: "A post with that slug already exists." },
      { status: 409 },
    )
  }
  try {
    await saveBlogPosts([parsed.data, ...posts])
  } catch (error) {
    return contentWriteErrorResponse(error)
  }
  return NextResponse.json({ ok: true })
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return unauthorized()
  const body = await request.json().catch(() => null)
  const originalSlug =
    typeof body?.originalSlug === "string" ? body.originalSlug : ""
  const parsed = postSchema.safeParse(body?.post)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid post" },
      { status: 400 },
    )
  }
  const posts = await getBlogPosts()
  const index = posts.findIndex((post) => post.slug === originalSlug)
  if (index === -1) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 })
  }
  if (
    parsed.data.slug !== originalSlug &&
    posts.some((post) => post.slug === parsed.data.slug)
  ) {
    return NextResponse.json(
      { error: "A post with that slug already exists." },
      { status: 409 },
    )
  }
  posts[index] = parsed.data
  try {
    await saveBlogPosts(posts)
  } catch (error) {
    return contentWriteErrorResponse(error)
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return unauthorized()
  const body = await request.json().catch(() => null)
  const slug = typeof body?.slug === "string" ? body.slug : ""
  const posts = await getBlogPosts()
  const remaining = posts.filter((post) => post.slug !== slug)
  if (remaining.length === posts.length) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 })
  }
  try {
    await saveBlogPosts(remaining)
  } catch (error) {
    return contentWriteErrorResponse(error)
  }
  return NextResponse.json({ ok: true })
}
