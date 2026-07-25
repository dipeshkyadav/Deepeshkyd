import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Course } from "@/lib/types"
import { formatNpr } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { TiltCard } from "@/components/ui/TiltCard"

type CourseCardProps = {
  course: Course
  featured?: boolean
}

/** Ecom-style product card — image first, price anchored in red. */
export function CourseCard({ course, featured }: CourseCardProps) {
  return (
    <TiltCard className="h-full rounded-2xl">
      <Link
        href={`/course/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/5 bg-bg-light shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:border-white/10 dark:bg-surface-dark"
      >
        <div
          className={
            featured
              ? "relative aspect-[21/9] w-full overflow-hidden bg-surface dark:bg-bg-dark"
              : "relative aspect-video w-full overflow-hidden bg-surface dark:bg-bg-dark"
          }
        >
          <Image
            src={course.coverImage}
            alt={`${course.title} — course by Dipesh Kr Yadav`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3">
            <Badge tone="neutral" className="bg-bg-light/90 shadow-card backdrop-blur dark:bg-bg-dark/80">
              {course.level}
            </Badge>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-display text-xl font-bold tracking-display dark:text-ink-ondark">
            {course.title}
          </h3>
          <p className="flex-1 text-sm text-ink-secondary dark:text-ink-ondark/70">
            {course.description}
          </p>
          <div className="flex items-center justify-between gap-4 border-t border-ink/5 pt-4 dark:border-white/10">
            <span className="font-display text-2xl font-bold tracking-display text-brand-red">
              {course.isFree
                ? "Free"
                : course.priceNpr !== undefined
                  ? formatNpr(course.priceNpr)
                  : ""}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-4 py-2 text-sm font-semibold text-ink-ondark transition-transform duration-200 group-hover:scale-105">
              View course
              <ArrowRight size={16} strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
