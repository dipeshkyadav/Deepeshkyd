import { stats as defaultStats } from "@/lib/data"
import type { Stat } from "@/lib/types"
import { StatsCounter } from "@/components/ui/StatsCounter"

export function StatsBar({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <div className="border-y border-ink/5 bg-surface dark:border-white/10 dark:bg-surface-dark">
      <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <dd className="font-display text-4xl font-bold tracking-display text-brand-purple">
              <StatsCounter value={stat.value} suffix={stat.suffix} />
            </dd>
            <dt className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
