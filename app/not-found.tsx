import { Button } from "@/components/ui/Button"
import { CreativeText } from "@/components/ui/CreativeText"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center md:py-32">
      <CreativeText variant="script" className="text-4xl md:text-5xl">
        lost?
      </CreativeText>
      <h1 className="mt-2 font-display text-6xl font-bold tracking-display text-brand-purple md:text-8xl">
        404
      </h1>
      <p className="mt-6 max-w-md text-lg text-ink-secondary dark:text-ink-ondark/70">
        This page doesn&apos;t exist — which is rare, because I document
        everything. Head back and I&apos;ll point you somewhere useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/">Back home</Button>
        <Button href="/yt-tutorial" variant="secondary">
          Watch a tutorial instead
        </Button>
      </div>
    </section>
  )
}
