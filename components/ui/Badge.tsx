import { cn } from "@/lib/utils"

type BadgeProps = {
  tone?: "purple" | "red" | "neutral"
  className?: string
  children: React.ReactNode
}

const tones = {
  purple: "bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/20 dark:text-brand-purple-light",
  red: "bg-brand-red/10 text-brand-red",
  neutral: "bg-surface text-ink-secondary dark:bg-surface-dark dark:text-ink-ondark/70",
}

export function Badge({ tone = "purple", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
