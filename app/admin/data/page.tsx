import { requireAdmin } from "@/lib/admin/auth"
import { getCourses, getProducts, getStats, getVideos } from "@/lib/content"
import { DataEditor } from "@/components/admin/DataEditor"

export const dynamic = "force-dynamic"

export default async function AdminDataPage() {
  await requireAdmin()
  const [stats, videos, products, courses] = await Promise.all([
    getStats(),
    getVideos(),
    getProducts(),
    getCourses(),
  ])

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-display">
        Advanced (JSON)
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-secondary dark:text-ink-ondark/60">
        Raw JSON editing for power users. Prefer the Courses, Videos, Shop
        products, and Home stats sections in the sidebar — they edit the same
        data with friendlier forms. Everything is validated before saving.
      </p>
      <DataEditor initial={{ stats, videos, products, courses }} />
    </div>
  )
}
