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
 * File-backed content store — everything the /admin panel can edit.
 *
 * Reads check `content/<collection>.json` first and fall back to the code
 * defaults in `lib/data.ts`, so the site works with no content files at all.
 * Saves write pretty-printed JSON that goes live on the next request —
 * no rebuild needed. Server-side only (uses the filesystem).
 *
 * NOTE: `content/` is gitignored. Back it up before redeploying, or live
 * edits fall back to the code defaults.
 */
const contentDir = path.join(process.cwd(), "content")

async function readCollection<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(contentDir, file), "utf8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeCollection(file: string, data: unknown): Promise<void> {
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
