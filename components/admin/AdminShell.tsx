"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Braces,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  PlaySquare,
  ShoppingBag,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Blog posts", icon: FileText },
  { href: "/admin/courses", label: "Courses", icon: GraduationCap },
  { href: "/admin/videos", label: "Videos", icon: PlaySquare },
  { href: "/admin/products", label: "Shop products", icon: ShoppingBag },
  { href: "/admin/stats", label: "Home stats", icon: BarChart3 },
  { href: "/admin/photos", label: "Photos", icon: ImageIcon },
  { href: "/admin/data", label: "Advanced (JSON)", icon: Braces },
]

/**
 * Professional admin chrome: brand header + sidebar navigation on desktop,
 * horizontally scrollable pill nav on mobile. The login screen renders
 * without the shell.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ""
  if (pathname === "/admin/login") return <>{children}</>

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-8 md:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="md:sticky md:top-24 md:self-start">
          <p className="flex items-center gap-2 px-3 font-display text-lg font-bold tracking-display">
            Dipesh<span className="-ml-2 text-brand-purple">kyd</span>
            <span className="rounded-md bg-brand-purple/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-purple dark:bg-brand-purple/20 dark:text-brand-purple-light">
              Admin
            </span>
          </p>
          <nav
            aria-label="Admin sections"
            className="mt-4 flex gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0"
          >
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex shrink-0 items-center gap-2.5 rounded-xl bg-brand-purple px-3 py-2 text-sm font-medium text-white"
                      : "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-brand-purple/10 hover:text-brand-purple dark:text-ink-ondark/70 dark:hover:bg-brand-purple/20"
                  }
                >
                  <item.icon size={17} strokeWidth={1.75} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
