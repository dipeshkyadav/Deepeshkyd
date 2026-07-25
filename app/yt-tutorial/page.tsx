import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { VideoLibrary } from "@/components/sections/VideoLibrary"

export const metadata: Metadata = {
  title: "YT Tutorials",
  description:
    "Every tutorial from the Dipeshkyd channel, organized — content creation, growth hacking, AI tools, personal branding, and editing.",
}

export default function YtTutorialPage() {
  return (
    <Section eyebrow="Straight from the channel" script="binge" title="Tutorial library">
      <p className="mb-10 max-w-2xl text-lg text-ink-secondary dark:text-ink-ondark/70">
        Everything I publish, searchable in one place. Play videos right here
        or jump to YouTube — and if a topic is missing, tell me on the
        contact page and I&apos;ll probably film it.
      </p>
      <VideoLibrary />
    </Section>
  )
}
