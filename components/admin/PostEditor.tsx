"use client"

import { useState } from "react"
import type { BlogPost } from "@/lib/types"
import { Button } from "@/components/ui/Button"

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-bg-light px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-surface-dark dark:text-ink-ondark"

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function PostEditor({ post }: { post?: BlogPost }) {
  const editing = Boolean(post)
  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(editing)
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ?? new Date().toISOString().slice(0, 10),
  )
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [pullQuote, setPullQuote] = useState(post?.pullQuote ?? "")
  const [featured, setFeatured] = useState(post?.featured ?? false)
  const [body, setBody] = useState(post?.content.join("\n\n") ?? "")
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)

  async function save(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setStatus("")
    const payload = {
      slug: slug || slugify(title),
      title,
      excerpt,
      publishedAt,
      featured,
      pullQuote: pullQuote.trim() ? pullQuote.trim() : undefined,
      content: body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    }
    const response = await fetch("/api/admin/posts", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editing ? { originalSlug: post?.slug, post: payload } : payload,
      ),
    })
    if (response.ok) {
      window.location.href = "/admin"
      return
    }
    const result = await response.json().catch(() => null)
    setStatus(result?.error ?? "Save failed. Try again.")
    setBusy(false)
  }

  async function removePost() {
    if (!post) return
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return
    }
    setBusy(true)
    const response = await fetch("/api/admin/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: post.slug }),
    })
    if (response.ok) {
      window.location.href = "/admin"
      return
    }
    const result = await response.json().catch(() => null)
    setStatus(result?.error ?? "Delete failed. Try again.")
    setBusy(false)
  }

  return (
    <form onSubmit={save} className="mt-8 space-y-5">
      <div>
        <label htmlFor="post-title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="post-title"
          required
          value={title}
          className={inputClass}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value)
            if (!slugTouched) setSlug(slugify(event.target.value))
          }}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="post-slug" className="mb-1 block text-sm font-medium">
            Slug (URL)
          </label>
          <input
            id="post-slug"
            required
            value={slug}
            className={inputClass}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSlugTouched(true)
              setSlug(slugify(event.target.value))
            }}
          />
        </div>
        <div>
          <label htmlFor="post-date" className="mb-1 block text-sm font-medium">
            Publish date
          </label>
          <input
            id="post-date"
            type="date"
            required
            value={publishedAt}
            className={inputClass}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPublishedAt(event.target.value)
            }
          />
        </div>
      </div>
      <div>
        <label htmlFor="post-excerpt" className="mb-1 block text-sm font-medium">
          Excerpt — shown on cards and in search results
        </label>
        <textarea
          id="post-excerpt"
          required
          rows={2}
          value={excerpt}
          className={inputClass}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setExcerpt(event.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="post-quote" className="mb-1 block text-sm font-medium">
          Pull quote (optional — rendered big and purple mid-article)
        </label>
        <input
          id="post-quote"
          value={pullQuote}
          className={inputClass}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPullQuote(event.target.value)
          }
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFeatured(event.target.checked)
          }
        />
        Featured post (shown big at the top of the blog page)
      </label>
      <div>
        <label htmlFor="post-body" className="mb-1 block text-sm font-medium">
          Content — separate paragraphs with a blank line
        </label>
        <textarea
          id="post-body"
          required
          rows={14}
          value={body}
          className={inputClass}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBody(event.target.value)
          }
        />
      </div>
      {status ? (
        <p role="alert" className="text-sm text-brand-red">
          {status}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Publish post"}
        </Button>
        {editing ? (
          <button
            type="button"
            onClick={removePost}
            disabled={busy}
            className="rounded-full border border-brand-red/40 px-4 py-2 text-sm font-medium text-brand-red transition hover:bg-brand-red/10"
          >
            Delete post
          </button>
        ) : null}
      </div>
    </form>
  )
}
