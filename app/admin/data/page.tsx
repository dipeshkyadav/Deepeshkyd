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
    <div className="mx-auto max-w-4xl px-6">
      <h1 className="font-display text-3xl font-bold tracking-display">
        Site data
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-secondary dark:text-ink-ondark/60">
        Stats, YouTube videos, shop products, and courses — edited as JSON and
        validated before saving. Changes go live immediately, no rebuild.
      </p>
      <DataEditor initial={{ stats, videos, products, courses }} />
    </div>
  )
}
