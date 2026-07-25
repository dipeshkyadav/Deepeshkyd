"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type ImageUploadProps = {
  id: string
  label: string
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ id, label, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setBusy(true)
    setError("")
    const form = new FormData()
    form.append("file", file)
    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      })
      const result = await response.json().catch(() => null)
      if (response.ok && typeof result?.url === "string") {
        onChange(result.url)
      } else {
        setError(
          result?.error ?? "Upload failed — try a JPG, PNG, or WebP under 4 MB.",
        )
      }
    } catch {
      setError("Upload failed — check your connection and try again.")
    }
    setBusy(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {value ? (
        <div className="mb-3 flex items-start gap-4">
          <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-ink/10 dark:border-white/15">
            <Image
              src={value}
              alt="Uploaded photo preview"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="break-all font-mono text-xs text-ink-secondary dark:text-ink-ondark/60">
              {value}
            </p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-2 text-sm font-medium text-brand-red hover:underline"
            >
              Remove photo
            </button>
          </div>
        </div>
      ) : null}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={busy}
        onChange={handleFile}
        className="block w-full text-sm text-ink-secondary file:mr-4 file:rounded-full file:border-0 file:bg-brand-purple file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:opacity-90 dark:text-ink-ondark/60"
      />
      {busy ? (
        <p className="mt-2 text-sm text-ink-secondary dark:text-ink-ondark/60">
          Uploading…
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-2 text-sm text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  )
}
