import { site } from "@/lib/data"
import { Button } from "@/components/ui/Button"

export function CTABand() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-panel">
        {/* Ambient glows — premium panel treatment */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-purple/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-20 h-72 w-72 rounded-full bg-brand-purple-light/15 blur-3xl"
        />
        <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-display text-ink-ondark md:text-4xl">
            The journey is documented. Come watch it happen.
          </h2>
          <p className="max-w-xl text-ink-ondark/80">
            New tutorials every week — growth experiments, tools, and the honest
            numbers behind them.
          </p>
          <Button
            href={site.youtube}
            external
            size="lg"
            className="bg-bg-light text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Subscribe on YouTube
          </Button>
        </div>
      </div>
    </section>
  )
}
