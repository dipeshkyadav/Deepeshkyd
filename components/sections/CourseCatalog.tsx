"use client"

import { useState } from "react"
import type { Course } from "@/lib/types"
import { FilterChips } from "@/components/ui/FilterChips"
import { CourseCard } from "@/components/cards/CourseCard"

const filters = ["All", "Free", "Paid", "Beginner", "Advanced"]

export function CourseCatalog({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState("All")

  const filtered = courses.filter((course) => {
    switch (filter) {
      case "Free":
        return course.isFree
      case "Paid":
        return !course.isFree
      case "Beginner":
      case "Advanced":
        return course.level === filter
      default:
        return true
    }
  })

  return (
    <div>
      <FilterChips
        options={filters}
        active={filter}
        onChange={setFilter}
        label="Filter courses"
      />
      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-secondary dark:text-ink-ondark/60">
          No courses match that filter yet — more are in production.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((course, index) => (
            <div key={course.slug} className={index === 0 ? "md:col-span-2" : undefined}>
              <CourseCard course={course} featured={index === 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
