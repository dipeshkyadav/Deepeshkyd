"use client"

import { useState } from "react"
import type { Course, Product, Stat, Video } from "@/lib/types"
import { Button } from "@/components/ui/Button"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Collections = {
  stats: Stat[]
  videos: Video[]
  products: Product[]
  courses: Course[]
}

type CollectionName = keyof Collections

const help: Record<CollectionName, string> = {
  stats:
    'Home page counters. Fields per item: label, value (number), suffix (optional, e.g. "+").',
  videos:
    'YT Tutorial page. Fields per item: id (YouTube video ID), title, description, category ("Content Creation", "Growth Hacking", "AI Tools", "Personal Branding", or "Editing"), publishedAt (YYYY-MM-DD).',
  products:
    'Shop page. Fields per item: slug, name, description, priceNpr (number), kind ("template", "checklist", or "mini-course"), image (optional — upload a photo below and paste its URL).',
  courses:
    'Course pages. Fields per item: slug, title, description, level ("Beginner" or "Advanced"), isFree, priceNpr (optional), whatYoullLearn (list of strings), curriculum (list of { section, lessons }), coverImage (upload a photo below and paste its URL, or a path under /images).',
}

export function DataEditor({ initial }: { initial: Collections }) {
  const [active, setActive] = useState<CollectionName>("stats")
  const [drafts, setDrafts] = useState<Record<CollectionName, string>>({
    stats: JSON.stringify(initial.stats, null, 2),
    videos: JSON.stringify(initial.videos, null, 2),
    products: JSON.stringify(initial.products, null, 2),
    courses: JSON.stringify(initial.courses, null, 2),
  })
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)
  const [uploadedPhoto, setUploadedPhoto] = useState("")

  async function save() {
    setBusy(true)
    setStatus("")
    let data: unknown
    try {
      data = JSON.parse(drafts[active])
    } catch {
      setStatus("Not valid JSON — check for missing commas or quotes.")
      setBusy(false)
      return
    }
    const response = await fetch("/api/admin/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: active, data }),
    })
    const result = await response.json().catch(() => null)
    setStatus(
      response.ok
        ? "Saved — changes are live."
        : (result?.error ?? "Save failed."),
    )
    setBusy(false)
  }

  return (
    <div className="mt-8">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Site data collections"
      >
        {(Object.keys(drafts) as CollectionName[]).map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={active === name}
            onClick={() => {
              setActive(name)
              setStatus("")
            }}
            className={
              active === name
                ? "rounded-full bg-brand-purple px-4 py-2 text-sm font-medium text-white"
                : "rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition hover:border-brand-purple dark:border-white/15"
            }
          >
            {name}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-secondary dark:text-ink-ondark/60">
        {help[active]}
      </p>
      {active === "products" || active === "courses" ? (
        <div className="mt-4 rounded-xl border border-ink/10 p-4 dark:border-white/15">
          <ImageUpload
            id="data-photo"
            label="Photo uploader — upload, then copy the URL into the JSON (image for products, coverImage for courses)"
            value={uploadedPhoto}
            onChange={setUploadedPhoto}
          />
        </div>
      ) : null}
      <textarea
        value={drafts[active]}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDrafts({ ...drafts, [active]: event.target.value })
        }
        rows={20}
        spellCheck={false}
        aria-label={`${active} JSON`}
        className="mt-4 w-full rounded-xl border border-ink/15 bg-surface p-4 font-mono text-sm dark:border-white/15 dark:bg-surface-dark dark:text-ink-ondark"
      />
      {status ? (
        <p role="alert" className="mt-3 text-sm">
          {status}
        </p>
      ) : null}
      <div className="mt-4">
        <Button onClick={save} disabled={busy}>
          {busy ? "Saving…" : `Save ${active}`}
        </Button>
      </div>
    </div>
  )
}
