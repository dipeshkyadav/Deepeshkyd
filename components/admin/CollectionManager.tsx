"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ImageUpload } from "@/components/admin/ImageUpload"

/**
 * Professional form-based editor for a site-data collection (courses,
 * videos, products, stats). Each item is an expandable card with real
 * form fields — no JSON editing. Saves the whole collection through
 * PUT /api/admin/data, which validates before writing.
 */

export type Field = {
  key: string
  label: string
  type:
    | "text"
    | "number"
    | "date"
    | "textarea"
    | "checkbox"
    | "select"
    | "image"
    | "lines"
    | "curriculum"
  options?: string[]
  help?: string
  optional?: boolean
}

type Item = Record<string, unknown>
type Draft = Record<string, string | boolean>

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-bg-light px-3 py-2 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-surface-dark dark:text-ink-ondark"

function curriculumToText(value: unknown): string {
  if (!Array.isArray(value)) return ""
  return value
    .map((entry) => {
      const section = entry as { section?: string; lessons?: string[] }
      const lessons = Array.isArray(section.lessons) ? section.lessons : []
      return [`# ${section.section ?? ""}`, ...lessons].join("\n")
    })
    .join("\n\n")
}

function textToCurriculum(
  text: string,
): Array<{ section: string; lessons: string[] }> {
  const sections: Array<{ section: string; lessons: string[] }> = []
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim()
    if (!line) continue
    if (line.startsWith("#")) {
      sections.push({ section: line.replace(/^#+\s*/, ""), lessons: [] })
    } else if (sections.length > 0) {
      sections[sections.length - 1].lessons.push(line)
    } else {
      sections.push({ section: line, lessons: [] })
    }
  }
  return sections
}

function toDraft(item: Item, fields: Field[]): Draft {
  const draft: Draft = {}
  for (const field of fields) {
    const value = item[field.key]
    if (field.type === "checkbox") {
      draft[field.key] = Boolean(value)
    } else if (field.type === "lines") {
      draft[field.key] = Array.isArray(value)
        ? (value as string[]).join("\n")
        : ""
    } else if (field.type === "curriculum") {
      draft[field.key] = curriculumToText(value)
    } else {
      draft[field.key] =
        value === undefined || value === null ? "" : String(value)
    }
  }
  return draft
}

function fromDraft(draft: Draft, fields: Field[]): Item {
  const item: Item = {}
  for (const field of fields) {
    const value = draft[field.key]
    if (field.type === "checkbox") {
      item[field.key] = Boolean(value)
    } else if (field.type === "number") {
      const text = String(value).trim()
      if (text !== "") item[field.key] = Number(text)
      else if (!field.optional) item[field.key] = 0
    } else if (field.type === "lines") {
      item[field.key] = String(value)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    } else if (field.type === "curriculum") {
      item[field.key] = textToCurriculum(String(value))
    } else {
      const text = String(value)
      if (text !== "" || !field.optional) item[field.key] = text
    }
  }
  return item
}

export function CollectionManager({
  collection,
  itemName,
  titleKey,
  fields,
  initial,
  newItem,
}: {
  collection: "stats" | "videos" | "products" | "courses"
  itemName: string
  titleKey: string
  fields: Field[]
  initial: Item[]
  newItem: Item
}) {
  const [drafts, setDrafts] = useState<Draft[]>(
    initial.map((item) => toDraft(item, fields)),
  )
  const [open, setOpen] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<{
    kind: "ok" | "error"
    text: string
  } | null>(null)

  function update(index: number, key: string, value: string | boolean) {
    setDrafts((current) =>
      current.map((draft, i) =>
        i === index ? { ...draft, [key]: value } : draft,
      ),
    )
    setStatus(null)
  }

  function addItem() {
    setDrafts((current) => [...current, toDraft(newItem, fields)])
    setOpen(drafts.length)
    setStatus(null)
  }

  function removeItem(index: number) {
    if (!window.confirm(`Delete this ${itemName}? This cannot be undone after saving.`)) {
      return
    }
    setDrafts((current) => current.filter((_, i) => i !== index))
    setOpen(null)
    setStatus(null)
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= drafts.length) return
    setDrafts((current) => {
      const next = [...current]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    setOpen(null)
  }

  async function save() {
    setBusy(true)
    setStatus(null)
    const data = drafts.map((draft) => fromDraft(draft, fields))
    try {
      const response = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, data }),
      })
      const result = await response.json().catch(() => null)
      setStatus(
        response.ok
          ? { kind: "ok", text: "Saved — changes are live on the site." }
          : {
              kind: "error",
              text:
                result?.error ??
                "Save failed — check that required fields are filled in.",
            },
      )
    } catch {
      setStatus({
        kind: "error",
        text: "Save failed — check your connection and try again.",
      })
    }
    setBusy(false)
  }

  function renderField(field: Field, index: number) {
    const draft = drafts[index]
    const id = `${collection}-${index}-${field.key}`
    if (field.type === "image") {
      return (
        <div key={field.key} className="sm:col-span-2">
          <ImageUpload
            id={id}
            label={field.label}
            value={String(draft[field.key] ?? "")}
            onChange={(url) => update(index, field.key, url)}
          />
          <input
            type="text"
            aria-label={`${field.label} — or paste an image URL`}
            placeholder="…or paste an image URL (https://…)"
            value={String(draft[field.key] ?? "")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              update(index, field.key, event.target.value)
            }
            className={`${inputClass} mt-2`}
          />
        </div>
      )
    }
    if (field.type === "checkbox") {
      return (
        <label
          key={field.key}
          htmlFor={id}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <input
            id={id}
            type="checkbox"
            checked={Boolean(draft[field.key])}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              update(index, field.key, event.target.checked)
            }
            className="h-4 w-4 rounded border-ink/30 accent-brand-purple"
          />
          {field.label}
        </label>
      )
    }
    const isWide =
      field.type === "textarea" ||
      field.type === "lines" ||
      field.type === "curriculum"
    return (
      <div key={field.key} className={isWide ? "sm:col-span-2" : undefined}>
        <label htmlFor={id} className="mb-1 block text-sm font-medium">
          {field.label}
        </label>
        {field.type === "select" ? (
          <select
            id={id}
            value={String(draft[field.key] ?? "")}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              update(index, field.key, event.target.value)
            }
            className={inputClass}
          >
            {(field.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : isWide ? (
          <textarea
            id={id}
            rows={field.type === "textarea" ? 3 : 6}
            spellCheck={field.type === "textarea"}
            value={String(draft[field.key] ?? "")}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              update(index, field.key, event.target.value)
            }
            className={inputClass}
          />
        ) : (
          <input
            id={id}
            type={
              field.type === "number"
                ? "number"
                : field.type === "date"
                  ? "date"
                  : "text"
            }
            step={field.type === "number" ? "0.01" : undefined}
            value={String(draft[field.key] ?? "")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              update(index, field.key, event.target.value)
            }
            className={inputClass}
          />
        )}
        {field.help ? (
          <p className="mt-1 text-xs text-ink-secondary dark:text-ink-ondark/60">
            {field.help}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="space-y-3">
        {drafts.map((draft, index) => {
          const title =
            String(draft[titleKey] ?? "").trim() || `New ${itemName}`
          const isOpen = open === index
          return (
            <div
              key={index}
              className="rounded-2xl border border-ink/10 bg-surface dark:border-white/10 dark:bg-surface-dark"
            >
              <div className="flex items-center gap-2 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left font-medium"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <ChevronUp size={16} className="shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="shrink-0" />
                  )}
                  <span className="truncate">{title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  className="rounded-lg p-1.5 text-ink-secondary transition-colors hover:bg-brand-purple/10 hover:text-brand-purple disabled:opacity-30 dark:text-ink-ondark/60"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === drafts.length - 1}
                  aria-label="Move down"
                  className="rounded-lg p-1.5 text-ink-secondary transition-colors hover:bg-brand-purple/10 hover:text-brand-purple disabled:opacity-30 dark:text-ink-ondark/60"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  aria-label={`Delete ${itemName}`}
                  className="rounded-lg p-1.5 text-brand-red transition-colors hover:bg-brand-red/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {isOpen ? (
                <div className="grid gap-4 border-t border-ink/10 p-4 sm:grid-cols-2 dark:border-white/10">
                  {fields.map((field) => renderField(field, index))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 px-4 py-4 text-sm font-medium text-ink-secondary transition-colors hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark/70"
      >
        <Plus size={16} />
        Add {itemName}
      </button>

      <div className="sticky bottom-4 mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-ink/10 bg-surface/95 p-4 shadow-lift backdrop-blur dark:border-white/10 dark:bg-surface-dark/95">
        <Button onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </Button>
        {status ? (
          <p
            role="alert"
            className={
              status.kind === "ok"
                ? "text-sm font-medium text-green-600 dark:text-green-400"
                : "text-sm font-medium text-brand-red"
            }
          >
            {status.text}
          </p>
        ) : (
          <p className="text-sm text-ink-secondary dark:text-ink-ondark/60">
            Changes go live immediately after saving.
          </p>
        )}
      </div>
    </div>
  )
}
