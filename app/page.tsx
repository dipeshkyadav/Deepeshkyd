import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { blogPosts, courses, videos } from "@/lib/data"
import { PostCard } from "@/components/cards/PostCard"
import { CourseCard } from "@/components/cards/CourseCard"
import { Section } from "@/components/layout/Section"
import { CTABand } from "@/components/sections/CTABand"
import { Hero } from "@/components/sections/Hero"
import { StatsBar } from "@/components/sections/StatsBar"
import { VideoMarquee } from "@/components/sections/VideoMarquee"

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
        {/* Auto-scrolling film strip — pauses on hover */}
        <VideoMarquee videos={videos} />
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
              className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-panel p-8 text-ink-ondark shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              {/* Ambient glow — premium panel treatment */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-purple/25 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-stretched backdrop-blur">
                  Featured
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-display">
                  {featuredPost.title}
                </h3>
                <p className="mt-3 text-ink-ondark/80">{featuredPost.excerpt}</p>
              </div>
              <span className="relative inline-flex items-center gap-2 font-semibold text-brand-purple-light">
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
