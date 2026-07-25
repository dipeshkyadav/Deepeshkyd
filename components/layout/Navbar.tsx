"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, X } from "lucide-react"
import { primaryNav } from "@/lib/data"
import { useCart } from "@/lib/store"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const items = useCart((state) => state.items)
  const openCart = useCart((state) => state.open)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-bg-light/80 backdrop-blur-md dark:border-white/10 dark:bg-bg-dark/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-display dark:text-ink-ondark"
          aria-label="Dipeshkyd — home"
        >
          Dipesh<span className="text-brand-purple">kyd</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/20 dark:text-brand-purple-light"
                    : "text-ink-secondary hover:text-brand-purple dark:text-ink-ondark/70 dark:hover:text-brand-purple-light",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative rounded-full p-2 text-ink-secondary transition-colors hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:text-ink-ondark/70"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-xs font-bold text-ink-ondark">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-ink-secondary hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:text-ink-ondark/70 md:hidden"
          >
            {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-ink/5 px-6 pb-4 pt-2 dark:border-white/10 md:hidden"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 font-medium text-ink-secondary hover:bg-surface hover:text-brand-purple dark:text-ink-ondark/80 dark:hover:bg-surface-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
