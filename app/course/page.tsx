import type { Metadata } from "next"
import { getCourses } from "@/lib/content"
import { Section } from "@/components/layout/Section"
import { CourseCatalog } from "@/components/sections/CourseCatalog"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Courses by Dipesh Kr Yadav — YouTube growth, content systems, and personal branding, taught from documented experience.",
}

export default async function CoursePage() {
  let courses = []
  try {
    courses = await getCourses()
  } catch (err) {
    console.error("getCourses failed:", err)
    // Fall through with empty list so the page still renders
  }

  return (
    <Section eyebrow="Learn the right way" script="pick" title="Your next course">
      <p className="mb-10 max-w-2xl text-lg text-ink-secondary dark:text-ink-ondark/70">
        Everything here comes from my own channel — tested, documented, and
        taught step by step. Free courses need zero commitment; paid ones come
        with my direct support on WhatsApp.
      </p>
      <CourseCatalog courses={courses} />
    </Section>
  )
}
