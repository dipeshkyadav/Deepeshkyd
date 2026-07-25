import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

const uploadsDir = path.join(process.cwd(), "content", "uploads")

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
}

/** Serves photos uploaded through the admin panel. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params
  // Generated names only — blocks path traversal.
  if (!/^[a-z0-9-]+\.(?:jpg|png|webp|gif)$/.test(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  try {
    const data = await fs.readFile(path.join(uploadsDir, name))
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type":
          contentTypes[path.extname(name)] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}
