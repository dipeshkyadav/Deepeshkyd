import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Check, Send } from "lucide-react"
import { courses, telegramLink, whatsappLink } from "@/lib/data"
import { formatNpr } from "@/lib/utils"
import { Accordion } from "@/components/ui/Accordion"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Section } from "@/components/layout/Section"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const course = courses.find((candidate) => candidate.slug === slug)
  if (!course) return {}
  return { title: course.title, description: course.description }
}

export default async function CourseDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const course = courses.find((candidate) => candidate.slug === slug)
  if (!course) notFound()

  const enrollMessage = course.isFree
    ? `Hi Dipesh! I want to join your free course "${course.title}".`
    : `Hi Dipesh! I want to enroll in "${course.title}" (${formatNpr(course.priceNpr ?? 0)}). How do I pay?`

  return (
    <>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[3fr_2fr] md:py-24">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">{course.level}</Badge>
            {course.isFree ? (
              <Badge tone="red">Free</Badge>
            ) : (
              course.priceNpr !== undefined && (
                <Badge tone="purple">{formatNpr(course.priceNpr)}</Badge>
              )
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-display text-brand-purple md:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-secondary dark:text-ink-ondark/70">
            {course.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={whatsappLink(enrollMessage)} external size="lg">
              {course.isFree ? "Join free via WhatsApp" : "Enroll via WhatsApp"}
            </Button>
            <Button href={telegramLink()} external variant="secondary" size="lg">
              <Send size={18} strokeWidth={1.75} />
              Or message on Telegram
            </Button>
          </div>
          <p className="mt-3 text-sm text-ink-secondary dark:text-ink-ondark/60">
            Enrollment is personal — you message me, I confirm payment and set
            you up in the same chat.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rotate-3 rounded-2xl bg-brand-purple/20"
          />
          <Image
            src={course.coverImage}
            alt={`${course.title} — taught by Dipesh Kr Yadav`}
            width={800}
            height={1000}
            priority
            sizes="(max-width: 768px) 90vw, 33vw"
            className="relative rounded-2xl object-cover shadow-lift"
          />
        </div>
      </div>

      <Section
        eyebrow="What you'll learn"
        title="Skills you walk away with"
        className="bg-surface py-16 dark:bg-surface-dark"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {course.whatYoullLearn.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/20">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span className="dark:text-ink-ondark">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Curriculum" script="inside" title="What's covered">
        <Accordion
          items={course.curriculum.map((section) => ({
            title: section.section,
            content: (
              <ul className="list-disc space-y-1 pl-5">
                {section.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            ),
          }))}
        />
      </Section>
    </>
  )
}
