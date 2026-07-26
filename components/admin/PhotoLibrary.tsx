"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { ImageUpload } from "@/components/admin/ImageUpload"

/**
 * Photo uploader with a session history of uploaded URLs and one-tap copy,
 * so photos can easily be reused across courses, products, and posts.
 */
export function PhotoLibrary() {
  const [current, setCurrent] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  function handleChange(url: string) {
    setCurrent(url)
    if (url) {
      setHistory((existing) =>
        existing.includes(url) ? existing : [url, ...existing],
      )
    }
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(url)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard unavailable — the URL is still visible to copy manually.
    }
  }

  return (
    <div>
      <div className="rounded-2xl border border-ink/10 bg-surface p-5 dark:border-white/10 dark:bg-surface-dark">
        <ImageUpload
          id="photo-library-upload"
          label="Upload a photo (JPG, PNG, or WebP — up to 4 MB)"
          value={current}
          onChange={handleChange}
        />
      </div>

      {history.length > 0 ? (
        <div className="mt-6">
          <h2 className="font-display text-lg font-bold tracking-display">
            Uploaded this session
          </h2>
          <ul className="mt-3 space-y-2">
            {history.map((url) => (
              <li
                key={url}
                className="flex items-center gap-3 rounded-xl border border-ink/10 bg-surface px-4 py-3 dark:border-white/10 dark:bg-surface-dark"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
                <p className="min-w-0 flex-1 break-all font-mono text-xs text-ink-secondary dark:text-ink-ondark/60">
                  {url}
                </p>
                <button
                  type="button"
                  onClick={() => copy(url)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand-purple hover:text-brand-purple dark:border-white/15"
                >
                  {copied === url ? (
                    <>
                      <Check size={14} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy URL
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
