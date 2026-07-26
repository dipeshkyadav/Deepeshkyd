import { randomBytes } from "crypto"
import { promises as fs } from "fs"
import path from "path"
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
 * Admin-only photo upload.
 *
 * With BLOB_READ_WRITE_TOKEN → permanent Vercel Blob storage.
 * Without it → local filesystem (works in local dev only).
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
      { error: "Photo is too large — keep it under 4 MB." },
      { status: 413 },
    )
  }

  const name = `${Date.now()}-${randomBytes(4).toString("hex")}${extension}`

  // Prefer Vercel Blob when the token is present
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob")
      const blob = await put(`uploads/${name}`, file, {
        access: "public",
        contentType: file.type,
      })
      return NextResponse.json({ url: blob.url })
    } catch (err) {
      console.error("Blob upload failed:", err)
      return NextResponse.json(
        { error: "Upload to Blob failed. Check BLOB_READ_WRITE_TOKEN." },
        { status: 500 },
      )
    }
  }

  // Local filesystem fallback (dev only)
  try {
    await fs.mkdir(uploadsDir, { recursive: true })
    await fs.writeFile(
      path.join(uploadsDir, name),
      Buffer.from(await file.arrayBuffer()),
    )
    return NextResponse.json({ url: `/api/uploads/${name}` })
  } catch (err) {
    console.error("Local upload failed:", err)
    return NextResponse.json(
      {
        error:
          "Upload failed. On Vercel you must connect a Blob store and set BLOB_READ_WRITE_TOKEN.",
      },
      { status: 500 },
    )
  }
}
