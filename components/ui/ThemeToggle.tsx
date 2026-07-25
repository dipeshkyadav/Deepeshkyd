"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("dipeshkyd-theme", next ? "dark" : "light")
    } catch {
      // storage unavailable — theme still applies for this session
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full p-2 text-ink-secondary transition-colors hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:text-ink-ondark/70 dark:hover:text-brand-purple-light"
    >
      {mounted && dark ? (
        <Sun size={20} strokeWidth={1.75} />
      ) : (
        <Moon size={20} strokeWidth={1.75} />
      )}
    </button>
  )
}
