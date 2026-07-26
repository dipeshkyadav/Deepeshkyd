"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Button — intentionally free of animation libraries. Links render as real
 * anchors, so navigation works in every situation (even before scripts
 * hydrate). Micro-interactions are pure CSS transforms.
 */

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
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[transform,box-shadow,background-color,color] duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"

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
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
}
