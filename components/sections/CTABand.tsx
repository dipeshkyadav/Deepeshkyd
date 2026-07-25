import { site } from "@/lib/data"
import { Button } from "@/components/ui/Button"

export function CTABand() {
  return (
    <section className="bg-gradient-brand">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
        <h2 className="font-display text-3xl font-bold tracking-display text-ink-ondark md:text-4xl">
          The journey is documented. Come watch it happen.
        </h2>
        <p className="max-w-xl text-ink-ondark/80">
          New tutorials every week — growth experiments, tools, and the honest
          numbers behind them.
        </p>
        <Button href={site.youtube} external size="lg" className="bg-bg-light text-ink hover:shadow-lift">
          Subscribe on YouTube
        </Button>
      </div>
    </section>
  )
}
