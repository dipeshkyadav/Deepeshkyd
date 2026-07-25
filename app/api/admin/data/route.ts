import { NextResponse } from "next/server"
import { z } from "zod"
import { isAdmin } from "@/lib/admin/auth"
import { saveCollection } from "@/lib/content"

const statSchema = z.object({
  label: z.string().min(1),
  value: z.number().min(0),
  suffix: z.string().optional(),
})

const videoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  category: z.enum([
    "Content Creation",
    "Growth Hacking",
    "AI Tools",
    "Personal Branding",
    "Editing",
  ]),
  publishedAt: z.string(),
})

const productSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  priceNpr: z.number().min(0),
  kind: z.enum(["template", "checklist", "mini-course"]),
  image: z.string().optional(),
})

const courseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  level: z.enum(["Beginner", "Advanced"]),
  isFree: z.boolean(),
  priceNpr: z.number().min(0).optional(),
  whatYoullLearn: z.array(z.string()),
  curriculum: z.array(
    z.object({ section: z.string(), lessons: z.array(z.string()) }),
  ),
  coverImage: z.string(),
})

const collections = {
  stats: z.array(statSchema),
  videos: z.array(videoSchema),
  products: z.array(productSchema),
  courses: z.array(courseSchema),
} as const

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json().catch(() => null)
  const name = body?.collection as keyof typeof collections
  const schema = collections[name]
  if (!schema) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 400 })
  }
  const parsed = schema.safeParse(body?.data)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json(
      {
        error: issue
          ? `${issue.path.join(".")}: ${issue.message}`
          : "Invalid data",
      },
      { status: 400 },
    )
  }
  await saveCollection(name, parsed.data)
  return NextResponse.json({ ok: true })
}
