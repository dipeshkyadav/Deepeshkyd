import { promises as fs } from "fs"
import path from "path"
import {
  blogPosts as defaultBlogPosts,
  courses as defaultCourses,
  products as defaultProducts,
  stats as defaultStats,
  videos as defaultVideos,
} from "./data"
import type { BlogPost, Course, Product, Stat, Video } from "./types"

/**
 * Content store — everything the /admin panel can edit.
 *
 * On Vercel the filesystem is read-only, so when BLOB_READ_WRITE_TOKEN is
 * set (Vercel dashboard → Storage → Blob), collections persist to Vercel
 * Blob and survive every redeploy. Without the token (local dev), they
 * fall back to `content/<collection>.json` on disk. Reads always fall
 * back to the code defaults in `lib/data.ts`, so the site works with no
 * content files at all.
 */
const contentDir = path.join(process.cwd(), "content")
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

async function readCollection<T>(file: string, fallback: T): Promise<T> {
  if (useBlob) {
    try {
      const { list } = await import("@vercel/blob")
      const { blobs } = await list({ prefix: "content/" + file })
      const blob = blobs.find((entry) => entry.pathname === "content/" + file)
      if (!blob) return fallback
      const response = await fetch(blob.url, { cache: "no-store" })
      if (!response.ok) return fallback
      return (await response.json()) as T
    } catch {
      return fallback
    }
  }
  try {
    const raw = await fs.readFile(path.join(contentDir, file), "utf8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeCollection(file: string, data: unknown): Promise<void> {
  if (useBlob) {
    const { put } = await import("@vercel/blob")
    await put("content/" + file, JSON.stringify(data, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    })
    return
  }
  await fs.mkdir(contentDir, { recursive: true })
  await fs.writeFile(
    path.join(contentDir, file),
    JSON.stringify(data, null, 2),
    "utf8",
  )
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await readCollection<BlogPost[]>(
    "blog.json",
    defaultBlogPosts.slice(),
  )
  return posts.slice().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  return writeCollection("blog.json", posts)
}

export function getCourses(): Promise<Course[]> {
  return readCollection<Course[]>("courses.json", defaultCourses.slice())
}

export function getVideos(): Promise<Video[]> {
  return readCollection<Video[]>("videos.json", defaultVideos.slice())
}

export function getProducts(): Promise<Product[]> {
  return readCollection<Product[]>("products.json", defaultProducts.slice())
}

export function getStats(): Promise<Stat[]> {
  return readCollection<Stat[]>("stats.json", defaultStats.slice())
}

export type EditableCollection = "courses" | "videos" | "products" | "stats"

export function saveCollection(
  name: EditableCollection,
  data: unknown,
): Promise<void> {
  return writeCollection(`${name}.json`, data)
}
