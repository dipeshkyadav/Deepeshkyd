import { randomBytes } from "crypto"
import { promises as fs } from "fs"
import path from "path"
import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin/auth"

const uploadsDir = path.join(process.cwd(), "content", "uploads")

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
}

const maxBytes = 4 * 1024 * 1024 // 4 MB

/**
 * Admin-only photo upload. Accepts multipart form data with a `file` field.
 *
 * Storage:
 * - With BLOB_READ_WRITE_TOKEN set (Vercel \u2192 Storage \u2192 Blob), photos are
 *   stored PERMANENTLY in Vercel Blob and survive every redeploy.
 * - Without it, photos fall back to the local filesystem \u2014 fine for local
 *   development, but on Vercel the disk is wiped on each deploy.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const form = await request.formData().catch(() => null)
  const file = form?.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 })
  }
  const extension = allowedTypes[file.type]
  if (!extension) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP, and GIF photos are supported." },
      { status: 415 },
    )
  }
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: "Photo is too large \u2014 keep it under 4 MB." },
      { status: 413 },
    )
  }
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}${extension}`

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${name}`, file, {
      access: "public",
      contentType: file.type,
    })
    return NextResponse.json({ url: blob.url })
  }

  await fs.mkdir(uploadsDir, { recursive: true })
  await fs.writeFile(
    path.join(uploadsDir, name),
    Buffer.from(await file.arrayBuffer()),
  )
  return NextResponse.json({ url: `/api/uploads/${name}` })
}
