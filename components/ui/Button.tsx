"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const MotionLink = motion.create(Link)

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  href?: string
  external?: boolean
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
  className?: string
  children: React.ReactNode
  "aria-label"?: string
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[box-shadow,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

const variants = {
  primary:
    "bg-brand-black text-ink-ondark hover:shadow-glow dark:bg-ink-ondark dark:text-ink",
  secondary:
    "border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-ink-ondark",
  ghost:
    "text-ink-secondary hover:text-brand-purple dark:text-ink-ondark/70 dark:hover:text-brand-purple-light",
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  type = "button",
  disabled,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  const reduce = useReducedMotion()
  const hover = reduce ? undefined : { scale: 1.03 }
  const tap = reduce ? undefined : { scale: 0.97 }
  const spring = { type: "spring" as const, stiffness: 260, damping: 24 }
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={hover}
        whileTap={tap}
        transition={spring}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  if (href) {
    return (
      <MotionLink
        href={href}
        whileHover={hover}
        whileTap={tap}
        transition={spring}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={hover}
      whileTap={tap}
      transition={spring}
      className={classes}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
