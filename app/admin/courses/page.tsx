import { requireAdmin } from "@/lib/admin/auth"
import { getCourses } from "@/lib/content"
import { CollectionManager } from "@/components/admin/CollectionManager"

export const dynamic = "force-dynamic"

export default async function AdminCoursesPage() {
  await requireAdmin()
  const courses = await getCourses()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-display">
        Courses
      </h1>
      <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
        Everything shown on the Course page — add, edit, reorder, or delete.
      </p>
      <CollectionManager
        collection="courses"
        itemName="course"
        titleKey="title"
        initial={courses}
        newItem={{
          slug: "my-new-course",
          title: "",
          description: "",
          level: "Beginner",
          isFree: false,
          priceUsd: 19,
          whatYoullLearn: [],
          curriculum: [],
          coverImage: "",
        }}
        fields={[
          {
            key: "title",
            label: "Title",
            type: "text",
          },
          {
            key: "slug",
            label: "Slug (URL)",
            type: "text",
            help: "Lowercase with dashes — becomes /course/your-slug.",
          },
          { key: "description", label: "Description", type: "textarea" },
          {
            key: "level",
            label: "Level",
            type: "select",
            options: ["Beginner", "Advanced"],
          },
          {
            key: "priceUsd",
            label: "Price (USD)",
            type: "number",
            optional: true,
            help: "Leave empty for free courses.",
          },
          { key: "isFree", label: "This course is free", type: "checkbox" },
          {
            key: "whatYoullLearn",
            label: "What you'll learn (one point per line)",
            type: "lines",
          },
          {
            key: "curriculum",
            label: "Curriculum",
            type: "curriculum",
            help: 'Start a section with "#" (e.g. "# Getting started"), then list its lessons on the lines below. Leave a blank line between sections.',
          },
          {
            key: "coverImage",
            label: "Cover photo",
            type: "image",
            optional: true,
          },
        ]}
      />
    </div>
  )
}
