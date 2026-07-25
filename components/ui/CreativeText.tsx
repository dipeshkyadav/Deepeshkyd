import { cn } from "@/lib/utils"

type CreativeTextProps = {
  /**
   * script    — Poster 1's thin script ("Professional"). 1–2 words max.
   * display   — bold purple poster headline ("CONTENT CREATOR").
   * condensed — Poster 2's red condensed caps ("DOCUMENT MY LIFE"). Eyebrows only.
   */
  variant: "script" | "display" | "condensed"
  className?: string
  children: React.ReactNode
}

const styles = {
  script: "font-script font-normal text-ink-secondary dark:text-ink-ondark/70",
  display: "font-display font-bold tracking-display text-brand-purple",
  condensed: "font-condensed uppercase tracking-stretched text-brand-red",
}

export function CreativeText({ variant, className, children }: CreativeTextProps) {
  return <span className={cn(styles[variant], className)}>{children}</span>
}
