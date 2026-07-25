"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CreativeText } from "@/components/ui/CreativeText"

type SectionProps = {
  id?: string
  eyebrow?: string
  script?: string
  title?: string
  className?: string
  children: React.ReactNode
}

/** Standard page section: red condensed eyebrow + display heading + staggered entrance. */
export function Section({ id, eyebrow, script, title, className, children }: SectionProps) {
  const reduce = useReducedMotion()

  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {eyebrow && (
            <p>
              <CreativeText variant="condensed" className="text-sm">
                {eyebrow}
              </CreativeText>
            </p>
          )}
          {title && (
            <h2 className="mt-3 font-display text-3xl font-bold tracking-display dark:text-ink-ondark md:text-4xl">
              {script && (
                <CreativeText variant="script" className="mr-3 text-3xl md:text-4xl">
                  {script}
                </CreativeText>
              )}
              {title}
            </h2>
          )}
          <div className={title ? "mt-10" : undefined}>{children}</div>
        </motion.div>
      </div>
    </section>
  )
}
