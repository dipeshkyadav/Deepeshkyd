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

export function CourseCard({ course, featured }: CourseCardProps) {
  return (
    <TiltCard className="h-full rounded-2xl">
      <Link
        href={`/course/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:bg-surface-dark"
      >
        <div className={featured ? "relative aspect-[21/9] w-full" : "relative aspect-video w-full"}>
          <Image
            src={course.coverImage}
            alt={`${course.title} — course by Dipesh Kr Yadav`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
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
          <h3 className="font-display text-xl font-bold tracking-display dark:text-ink-ondark">
            {course.title}
          </h3>
          <p className="flex-1 text-sm text-ink-secondary dark:text-ink-ondark/70">
            {course.description}
          </p>
          <span className="inline-flex items-center gap-2 font-semibold text-brand-purple">
            View course
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </TiltCard>
  )
}
