"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-bg-light px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-surface-dark dark:text-ink-ondark"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError("")
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (response.ok) {
      window.location.href = "/admin"
      return
    }
    const body = await response.json().catch(() => null)
    setError(body?.error ?? "Login failed. Try again.")
    setBusy(false)
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-3xl font-bold tracking-display">
        Admin sign in
      </h1>
      <p className="mt-2 text-sm text-ink-secondary dark:text-ink-ondark/60">
        This area is for Dipesh only. Visitors — the good stuff is on the blog.
      </p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="admin-email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="admin-password"
            className="mb-1 block text-sm font-medium"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            className={inputClass}
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-brand-red">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  )
}
