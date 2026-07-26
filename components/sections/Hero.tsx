"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import {
  Sparkles,
  Clapperboard,
  TrendingUp,
  Code2,
  Search,
  BrainCircuit,
  Camera,
  PenTool,
  BookOpen,
} from "lucide-react"
import { site } from "@/lib/data"
import { env } from "@/lib/env"
import { Button } from "@/components/ui/Button"
import { CreativeText } from "@/components/ui/CreativeText"

/**
 * Premium Hero — photo sources ordered by reliability.
 * Primary: /images/hero.png (put your notebook cutout here)
 */
const photoSources = Array.from(
  new Set([
    "/images/hero.png",
    env.heroImage,
    "https://avatars.githubusercontent.com/u/171313872?v=4",
  ]),
)

const roles = [
  { icon: BrainCircuit, label: "AI Educator" },
  { icon: Clapperboard, label: "Video Editor" },
  { icon: TrendingUp, label: "Growth Hacker" },
  { icon: Sparkles, label: "Content Creator" },
  { icon: Code2, label: "Web Developer" },
  { icon: Search, label: "SEO Manager" },
]

const taglines = [
  "Document. Don't create.",
  "Starve distractions. Feed focus.",
  "One tested move at a time.",
  "Real journey. Real numbers.",
]

export function Hero() {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const [sourceIndex, setSourceIndex] = useState(0)
  const [taglineIndex, setTaglineIndex] = useState(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 22 })
  const springY = useSpring(y, { stiffness: 180, damping: 22 })

  const exhausted = sourceIndex >= photoSources.length

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length)
    }, 3800)
    return () => clearInterval(id)
  }, [reduce])

  function tryNextSource() {
    setSourceIndex((c) => c + 1)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 28)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 28)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(124 58 237 / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(124 58 237 / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-brand-purple/7 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[360px] w-[360px] rounded-full bg-brand-purple/9 blur-[90px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24 lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex items-center rounded-full border border-brand-purple/25 bg-brand-purple/5 px-4 py-1.5 text-sm font-medium text-brand-purple dark:bg-brand-purple/15 dark:text-brand-purple-light">
            Learn the right way
          </div>

          <h1 className="mt-6 text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <CreativeText variant="script" className="block text-4xl md:text-5xl">
              Professional
            </CreativeText>
            <span className="mt-1 block font-display font-bold tracking-display text-gradient-brand">
              CONTENT CREATOR
            </span>
          </h1>

          <div className="mt-4 h-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={reduce ? false : { y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? undefined : { y: -16, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="font-condensed text-sm uppercase tracking-stretched text-brand-red md:text-base"
              >
                {taglines[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-secondary dark:text-ink-ondark/75">
            I&apos;m {site.fullName} — I document my journey as a creator and
            growth hacker, and teach you exactly what works. No recycled
            advice, only tested moves.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/course" size="lg">
              Explore courses
            </Button>
            <Button href="/yt-tutorial" variant="secondary" size="lg">
              Watch tutorials
            </Button>
          </div>
        </motion.div>

        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={reset}
          className="relative mx-auto aspect-[4/5] w-full max-w-md md:max-w-none"
        >
          {!reduce && (
            <>
              <motion.div
                className="absolute -left-4 top-12 z-0 flex h-11 w-11 items-center justify-center rounded-xl border border-white/50 bg-white/90 shadow-sm backdrop-blur-sm dark:bg-surface-dark/90"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Camera size={18} className="text-brand-purple" />
              </motion.div>

              <motion.div
                className="absolute -right-2 top-28 z-0 flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/90 shadow-sm backdrop-blur-sm dark:bg-surface-dark/90"
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              >
                <PenTool size={16} className="text-brand-purple" />
              </motion.div>

              <motion.div
                className="absolute -left-5 bottom-36 z-0 flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/90 shadow-sm backdrop-blur-sm dark:bg-surface-dark/90"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <BookOpen size={16} className="text-brand-purple" />
              </motion.div>
            </>
          )}

          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-[46%] -translate-y-[54%] rotate-[11deg] rounded-[1.8rem] bg-gradient-to-br from-brand-purple via-[#6d28d9] to-indigo-600"
            style={{ boxShadow: "0 25px 50px -12px rgb(124 58 237 / 0.35)" }}
            animate={reduce ? undefined : { rotate: [11, 13, 11] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 z-10"
            style={{ x: springX, y: springY }}
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" } }}
          >
            {exhausted ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl bg-brand-purple/90 p-8 text-center">
                <span className="font-script text-3xl text-white/90">Professional</span>
                <span className="font-display text-3xl font-bold uppercase tracking-display text-white">
                  Content Creator
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photoSources[sourceIndex]}
                ref={(node) => {
                  if (node && node.complete && node.naturalWidth === 0) tryNextSource()
                }}
                src={photoSources[sourceIndex]}
                alt=""
                onError={tryNextSource}
                className="h-full w-full object-contain"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 68%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.4) 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 68%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.4) 92%, transparent 100%)",
                }}
              />
            )}
            <span className="sr-only">
              {site.fullName} — professional content creator
            </span>
          </motion.div>

          {!reduce &&
            roles.map((role, i) => {
              const angle = (i / roles.length) * Math.PI * 2 - Math.PI / 2
              const radius = 48
              const xPos = 50 + Math.cos(angle) * radius
              const yPos = 50 + Math.sin(angle) * radius

              return (
                <motion.div
                  key={role.label}
                  className="absolute z-20 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-surface-dark/95 dark:text-ink-ondark"
                  style={{
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    x: "-50%",
                    y: "-50%",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: ["-50%", "calc(-50% - 4px)", "-50%"],
                  }}
                  transition={{
                    opacity: { delay: 0.4 + i * 0.06, duration: 0.35 },
                    scale: { delay: 0.4 + i * 0.06, duration: 0.35 },
                    y: {
                      duration: 3.6 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.12,
                    },
                  }}
                >
                  <role.icon size={11} strokeWidth={2.2} className="text-brand-purple" />
                  <span>{role.label}</span>
                </motion.div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
