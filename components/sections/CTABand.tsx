import { site } from "@/lib/data"
import { SubscribeButton } from "@/components/ui/SubscribeButton"

export function CTABand() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Vivid brand-gradient color field — lives BEHIND the glass */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-brand" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/30 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-purple/40 blur-3xl"
        />

        {/* Frosted glassmorphism layer */}
        <div className="glass-panel relative m-3 flex flex-col items-center gap-6 rounded-[1.25rem] px-6 py-14 text-center md:m-4 md:py-16">
          <h2 className="font-display text-3xl font-bold tracking-display text-ink dark:text-ink-ondark md:text-4xl">
            The journey is documented. Come watch it happen.
          </h2>
          <p className="max-w-xl text-ink-secondary dark:text-ink-ondark/80">
            New tutorials every week — growth experiments, tools, and the honest
            numbers behind them.
          </p>
          <SubscribeButton href={site.youtube} size="lg" />
        </div>
      </div>
    </section>
  )
}
