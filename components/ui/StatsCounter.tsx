"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

type StatsCounterProps = {
  value: number
  suffix?: string
  className?: string
}

/** Count-up on first scroll into view. Reduced motion → static value. */
export function StatsCounter({ value, suffix = "", className }: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest: number) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  )
}
