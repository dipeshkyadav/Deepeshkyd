"use client"

import { cn } from "@/lib/utils"

type FilterChipsProps = {
  options: string[]
  active: string
  onChange: (option: string) => void
  label: string
}

export function FilterChips({ options, active, onChange, label }: FilterChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option === active
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={selected}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2",
              selected
                ? "border-brand-purple bg-brand-purple text-ink-ondark"
                : "border-ink/15 text-ink-secondary hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark/70",
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
