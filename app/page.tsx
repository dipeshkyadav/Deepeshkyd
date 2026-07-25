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
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-2 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              {/* Brand-gradient color field behind the glass */}
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-brand" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
              />

              {/* Frosted glassmorphism layer */}
              <div className="glass-panel relative flex flex-1 flex-col justify-between gap-6 rounded-xl p-6">
                <div>
                  <p className="inline-flex items-center rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-stretched text-brand-purple backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-brand-purple-light">
                    Featured
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-display text-ink dark:text-ink-ondark">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-3 text-ink-secondary dark:text-ink-ondark/80">{featuredPost.excerpt}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-semibold text-brand-purple dark:text-brand-purple-light">
                  Read post
                  <ArrowRight
                    size={16}
                    strokeWidth={1.75}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
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
