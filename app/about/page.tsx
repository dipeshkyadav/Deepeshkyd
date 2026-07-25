import type { Metadata } from "next"
import Image from "next/image"
import { photos, posterQuotes, site } from "@/lib/data"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { CreativeText } from "@/components/ui/CreativeText"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About / The Journey",
  description:
    "The story behind Dipeshkyd — a CA aspirant documenting the road to becoming a professional content creator and growth hacker.",
}

const milestones = [
  {
    marker: "The start",
    title: "A student with a phone",
    body: "No camera, no team, no plan — just a phone and the itch to make things. I filmed what my days actually looked like: studying, failing, figuring it out. That honesty became the whole brand.",
  },
  {
    marker: "The grind",
    title: "Learning in public",
    body: "Every editing trick, every growth experiment, every flopped video went on the channel. Documenting instead of performing meant I never ran out of content — my life was the content.",
  },
  {
    marker: "The balance",
    title: "CA prep meets content",
    body: "I'm a CA aspirant. Mornings belong to the books, one protected block belongs to the channel. The discipline from one feeds the other — and proving they can coexist is half my message.",
  },
  {
    marker: "Today",
    title: "Teaching the right way",
    body: "Dipeshkyd is now courses, tutorials, and tools — all built from things I've actually done. No recycled advice. If it's on this site, it's been tested on my own channel first.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Section eyebrow="About / The Journey" script="my" title="Story so far">
        <p className="max-w-2xl text-lg text-ink-secondary dark:text-ink-ondark/70">
          I&apos;m {site.fullName} — most people know me as Dipeshkyd. This
          page isn&apos;t a resume; it&apos;s the journey, documented the same
          way everything else here is.
        </p>

        {/* Asymmetric timeline — rows deliberately alternate and offset */}
        <ol className="mt-16 space-y-16">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.marker}
              className={cn(
                "grid items-start gap-6 md:grid-cols-[1fr_3fr]",
                index % 2 === 1 && "md:grid-cols-[3fr_1fr] md:text-right",
              )}
            >
              <div className={cn(index % 2 === 1 && "md:order-2")}>
                <CreativeText variant="condensed" className="text-sm">
                  {milestone.marker}
                </CreativeText>
              </div>
              <div className={cn(index % 2 === 1 && "md:order-1")}>
                <h2 className="font-display text-2xl font-bold tracking-display dark:text-ink-ondark md:text-3xl">
                  {milestone.title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink-secondary dark:text-ink-ondark/70 md:inline-block">
                  {milestone.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-surface py-16 dark:bg-surface-dark md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full -rotate-2 rounded-2xl bg-brand-red/10"
            />
            <Image
              src={photos.posterDocumentMyLife}
              alt="Dipesh Kr Yadav — Document My Life poster with notepad"
              width={2297}
              height={3066}
              sizes="(max-width: 768px) 90vw, 33vw"
              className="relative rounded-2xl shadow-lift"
            />
          </div>
          <div className="space-y-10">
            {posterQuotes.map((quote) => (
              <blockquote key={quote} className="border-l-4 border-brand-purple pl-6">
                <CreativeText variant="display" className="text-2xl leading-snug md:text-3xl">
                  “{quote}”
                </CreativeText>
              </blockquote>
            ))}
            <p className="text-ink-secondary dark:text-ink-ondark/70">
              Both quotes are from my posters — and both are rules I actually
              live by. Everything on this site exists because of them.
            </p>
            <Button href="/contact">Say hello</Button>
          </div>
        </div>
      </section>
    </>
  )
}
