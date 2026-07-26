"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { posterQuotes, site } from "@/lib/data"
import { env } from "@/lib/env"
import { Button } from "@/components/ui/Button"
import { CreativeText } from "@/components/ui/CreativeText"

/**
 * Home hero — Poster 1's visual language: purple diamond behind the photo,
 * script + bold-purple headline mix. Photo layer parallax ≤ 8px (§16).
 *
 * The photo is a plain <img> on purpose (no server-side optimizer, no
 * hostname allow-list) and falls back to a branded poster card if the
 * file ever fails to load — the hero never shows a broken image.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [photoFailed, setPhotoFailed] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 24 })
  const springY = useSpring(y, { stiffness: 260, damping: 24 })

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

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          {/* Poster 1's purple diamond, offset deliberately off-grid */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-[45%] -translate-y-[55%] rotate-12 rounded-3xl bg-brand-purple/90"
          />
          <motion.div style={{ x: springX, y: springY }} className="relative">
            {photoFailed ? (
              <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-brand p-8 text-center shadow-lift">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-3xl bg-white/10"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-12 -left-8 h-44 w-44 rotate-12 rounded-3xl bg-black/10"
                />
                <span className="font-script text-3xl text-white/90">
                  Professional
                </span>
                <span className="font-display text-4xl font-bold uppercase tracking-display text-white">
                  Content Creator
                </span>
                <span className="mt-1 text-sm font-semibold uppercase tracking-stretched text-white/80">
                  {site.fullName}
                </span>
                <span className="mt-4 max-w-xs text-sm italic leading-relaxed text-white/70">
                  “{posterQuotes[0]}”
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={env.heroImage}
                alt="Dipesh Kr Yadav — professional content creator"
                width={2300}
                height={2875}
                fetchPriority="high"
                onError={() => setPhotoFailed(true)}
                className="h-auto w-full rounded-2xl shadow-lift"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
