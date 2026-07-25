import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { blogPosts, courses, videos } from "@/lib/data"
import type { Video } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { PostCard } from "@/components/cards/PostCard"
import { CourseCard } from "@/components/cards/CourseCard"
import { Section } from "@/components/layout/Section"
import { CTABand } from "@/components/sections/CTABand"
import { Hero } from "@/components/sections/Hero"
import { StatsBar } from "@/components/sections/StatsBar"

function HomeVideoCard({ video }: { video: Video }) {
  return (
    <Link
      href="/yt-tutorial"
      className="group w-72 shrink-0 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
    >
      <span className="relative block aspect-video overflow-hidden rounded-xl bg-surface shadow-card dark:bg-surface-dark">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          fill
          sizes="288px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="mt-3 block font-semibold group-hover:text-brand-purple dark:text-ink-ondark">
        {video.title}
      </span>
      <span className="block text-sm text-ink-secondary dark:text-ink-ondark/60">
        {formatDate(video.publishedAt)}
      </span>
    </Link>
  )
}

export default function HomePage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0]
  const otherPosts = blogPosts
    .filter((post) => post.slug !== featuredPost.slug)
    .slice(0, 2)
  const [primaryCourse, ...moreCourses] = courses

  return (
    <>
      <Hero />
      <StatsBar />

      <Section eyebrow="Fresh from the channel" script="watch" title="Latest tutorials">
        {/* Deliberately not a grid — a snap-scroll film strip */}
        <div className="-mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-4">
          {videos.slice(0, 4).map((video) => (
            <HomeVideoCard key={video.id} video={video} />
          ))}
        </div>
        <Link
          href="/yt-tutorial"
          className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-purple hover:underline"
        >
          Browse the full library
          <ArrowRight size={16} strokeWidth={1.75} />
        </Link>
      </Section>

      <Section
        eyebrow="Learn the right way"
        script="master"
        title="The courses"
        className="bg-surface dark:bg-surface-dark"
      >
        {/* Asymmetric: one anchor course, two stacked beside it */}
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <CourseCard course={primaryCourse} featured />
          <div className="grid gap-6">
            {moreCourses.slice(0, 2).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Notes from the journey" script="read" title="From the blog">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-3 lg:col-span-1">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-gradient-brand p-8 text-ink-ondark shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              <div>
                <p className="text-sm uppercase tracking-stretched">Featured</p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-display">
                  {featuredPost.title}
                </h3>
                <p className="mt-3 text-ink-ondark/80">{featuredPost.excerpt}</p>
              </div>
              <span className="inline-flex items-center gap-2 font-semibold">
                Read post
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>
          {otherPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
