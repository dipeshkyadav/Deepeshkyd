import { ChevronDown } from "lucide-react"

type AccordionProps = {
  items: Array<{ title: string; content: React.ReactNode }>
}

/** Native <details> accordion — keyboard-accessible by default. */
export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 px-6 dark:divide-white/10 dark:border-white/10">
      {items.map((item) => (
        <details key={item.title} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold dark:text-ink-ondark [&::-webkit-details-marker]:hidden">
            {item.title}
            <ChevronDown
              size={20}
              strokeWidth={1.75}
              className="shrink-0 text-brand-purple transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="pt-3 text-ink-secondary dark:text-ink-ondark/70">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  )
}
