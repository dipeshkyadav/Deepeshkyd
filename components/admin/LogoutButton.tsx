"use client"

import { useState } from "react"

export function LogoutButton() {
  const [busy, setBusy] = useState(false)

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        await fetch("/api/admin/logout", { method: "POST" })
        window.location.href = "/admin/login"
      }}
      className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  )
}
