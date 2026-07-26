"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { site } from "@/lib/data"
import { env } from "@/lib/env"
import { Button } from "@/components/ui/Button"
import { CreativeText } from "@/components/ui/CreativeText"

/**
 * Home hero — Poster 1's visual language: purple diamond behind a free
 * cutout photo (no card frame), script + bold-purple headline mix.
 * Photo layer parallax ≤ 8px (§16).
 *
 * Photo reliability rules:
 * - The photo stage has a FIXED aspect ratio, so the diamond keeps its
 *   shape even while the photo loads or if it fails.
 * - Several photo sources are tried in order; if every one fails, a clean
 *   branded poster text shows instead. alt="" ensures broken-image alt
 *   text is never visible.
 * - A ref check catches images that failed BEFORE scripts loaded (the
 *   case a plain onError handler misses).
 */

const photoSources = Array.from(
  new Set([
    env.heroImage,
    "https://dipeshkyd-1.vercel.app/images/poster-content-creator.png",
    "https://avatars.githubusercontent.com/u/171313872?v=4",
  ]),
)

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [sourceIndex, setSourceIndex] = useState(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 24 })
  const springY = useSpring(y, { stiffness: 260, damping: 24 })

  const exhausted = sourceIndex >= photoSources.length

  function tryNextSource() {
    setSourceIndex((current) => current + 1)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 16) // ±8px
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 16)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className="overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[7fr_5fr] md:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center rounded-full border border-brand-purple/30 bg-brand-purple/5 px-4 py-1.5 text-sm font-medium text-brand-purple dark:bg-brand-purple/15 dark:text-brand-purple-light">
            Learn the right way
          </span>

          <h1 className="mt-6 text-5xl leading-tight md:text-6xl lg:text-7xl">
            <CreativeText variant="script" className="block text-4xl md:text-5xl">
              Professional
            </CreativeText>
            <CreativeText variant="display">CONTENT CREATOR</CreativeText>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-ink-secondary dark:text-ink-ondark/70">
            I&apos;m {site.fullName} — I document my journey as a creator and
            growth hacker, and teach you exactly what works. No recycled
            advice, only tested moves.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/course" size="lg">
              Explore courses
            </Button>
            <Button href="/yt-tutorial" variant="secondary" size="lg">
              Watch tutorials
            </Button>
          </div>
        </motion.div>

        {/* Photo stage — fixed aspect so the composition never collapses. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm md:max-w-none">
          {/* Poster 1's purple diamond, offset deliberately off-grid */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-[45%] -translate-y-[55%] rotate-12 rounded-3xl bg-brand-purple/90"
          />
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute inset-0"
          >
            {exhausted ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                <span className="font-script text-3xl text-white/90 drop-shadow">
                  Professional
                </span>
                <span className="font-display text-3xl font-bold uppercase tracking-display text-white drop-shadow">
                  Content Creator
                </span>
                <span className="mt-1 text-sm font-semibold uppercase tracking-stretched text-white/85 drop-shadow">
                  {site.fullName}
                </span>
              </div>
            ) : (
              // Free cutout photo — floats over the diamond, no card frame.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photoSources[sourceIndex]}
                ref={(node) => {
                  // Catch failures that happened before hydration — a plain
                  // onError misses those.
                  if (node && node.complete && node.naturalWidth === 0) {
                    tryNextSource()
                  }
                }}
                src={photoSources[sourceIndex]}
                alt=""
                onError={tryNextSource}
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            )}
            <span className="sr-only">
              {site.fullName} — professional content creator
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
