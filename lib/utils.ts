import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge Tailwind classes without duplicate/conflicting utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format NPR prices consistently across Shop and Course pages. */
export function formatNpr(amount: number) {
  return `Rs ${new Intl.NumberFormat("en-IN").format(amount)}`
}

/** Human-readable date for blog posts and videos. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
