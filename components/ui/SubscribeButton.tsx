import { cn } from "@/lib/utils"

type SubscribeButtonProps = {
  href: string
  size?: "md" | "lg"
  className?: string
}

/**
 * 1:1 replica of YouTube's own Subscribe button (current design):
 * Roboto, full pill, #0f0f0f on light theme / white on dark theme,
 * flat with a subtle shade change on hover — no scale, no shadow.
 */
export function SubscribeButton({ href, size = "md", className }: SubscribeButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFamily: "Roboto, Arial, sans-serif" }}
      className={cn(
        "inline-flex select-none items-center justify-center whitespace-nowrap rounded-full bg-[#0f0f0f] font-medium text-white transition-colors duration-150 hover:bg-[#272727] active:bg-[#3f3f3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 dark:bg-white dark:text-[#0f0f0f] dark:hover:bg-[#f2f2f2] dark:active:bg-[#e5e5e5]",
        size === "lg" ? "h-12 px-7 text-base" : "h-9 px-4 text-sm",
        className,
      )}
    >
      Subscribe
    </a>
  )
}
