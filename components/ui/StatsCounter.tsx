"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

type StatsCounterProps = {
  value: number
  suffix?: string
  className?: string
}

/**
 * Shows the REAL value immediately (server-rendered — correct even before
 * scripts load), then plays the count-up once on first scroll into view as
 * a pure enhancement. Reduced motion → static value.
 */
export function StatsCounter({ value, suffix = "", className }: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (!inView || reduce || played || value <= 0) return
    setPlayed(true)
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest: number) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduce, played, value])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  )
}
