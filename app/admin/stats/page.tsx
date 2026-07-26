import { requireAdmin } from "@/lib/admin/auth"
import { getStats } from "@/lib/content"
import { CollectionManager } from "@/components/admin/CollectionManager"

export const dynamic = "force-dynamic"

export default async function AdminStatsPage() {
  await requireAdmin()
  const stats = await getStats()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-display">
        Home stats
      </h1>
      <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
        The animated counters on the home page (subscribers, videos,
        students).
      </p>
      <CollectionManager
        collection="stats"
        itemName="stat"
        titleKey="label"
        initial={stats}
        newItem={{ label: "", value: 0, suffix: "+" }}
        fields={[
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value (number)", type: "number" },
          {
            key: "suffix",
            label: "Suffix",
            type: "text",
            optional: true,
            help: 'Shown after the number, e.g. "+" or "K+".',
          },
        ]}
      />
    </div>
  )
}
