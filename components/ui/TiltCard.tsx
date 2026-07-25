"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { cn } from "@/lib/utils"

type TiltCardProps = {
  className?: string
  children: React.ReactNode
}

/**
 * 3D tilt following the cursor — max 6° each axis, spring return (§16).
 * Decorative only: disabled for touch pointers and reduced motion.
 */
export function TiltCard({ className, children }: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 260, damping: 24 })
  const springY = useSpring(rotateY, { stiffness: 260, damping: 24 })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 12) // ±6°
    rotateX.set(-py * 12)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={cn(
        "shadow-card transition-shadow duration-200 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
