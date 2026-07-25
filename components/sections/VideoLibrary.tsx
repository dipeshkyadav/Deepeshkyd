"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Play, Search } from "lucide-react"
import { videos } from "@/lib/data"
import type { Video } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { FilterChips } from "@/components/ui/FilterChips"
import { Modal } from "@/components/ui/Modal"
import { TiltCard } from "@/components/ui/TiltCard"

const categories = [
  "All",
  "Content Creation",
  "Growth Hacking",
  "AI Tools",
  "Personal Branding",
  "Editing",
]

function thumbnailUrl(id: string) {
  return `{{https://i.ytimg.com/vi/${id}}}/hqdefault.jpg`
}

function watchUrl(id: string) {
  return `{{https://www.youtube.com/watch?v=${id}}}`
}

function embedUrl(id: string) {
  return `{{https://www.youtube-nocookie.com/embed/${id}}}?autoplay=1`
}

export function VideoLibrary() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [active, setActive] = useState<Video | null>(null)

  const filtered = videos.filter((video) => {
    const matchesCategory = category === "All" || video.category === category
    const matchesQuery =
      query.trim() === "" ||
      `${video.title} ${video.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary"
          />
          <label htmlFor="video-search" className="sr-only">
            Search tutorials
          </label>
          <input
            id="video-search"
            type="search"
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            placeholder="Search tutorials…"
            className="w-full rounded-full border border-ink/15 bg-bg-light py-2.5 pl-10 pr-4 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-surface-dark dark:text-ink-ondark"
          />
        </div>
        <FilterChips
          options={categories}
          active={category}
          onChange={setCategory}
          label="Filter videos by category"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-secondary dark:text-ink-ondark/60">
          Nothing matches that yet — but it might be on the channel already.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video) => (
            <li key={video.id}>
              <TiltCard className="h-full rounded-2xl">
                <button
                  onClick={() => setActive(video)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-bg-light text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:bg-surface-dark"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-surface dark:bg-bg-dark">
                    <Image
                      src={thumbnailUrl(video.id)}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-bg-dark/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-ink-ondark">
                        <Play size={24} strokeWidth={1.75} />
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <Badge tone="purple" className="self-start">
                      {video.category}
                    </Badge>
                    <h3 className="font-display text-lg font-bold tracking-display dark:text-ink-ondark">
                      {video.title}
                    </h3>
                    <p className="text-sm text-ink-secondary dark:text-ink-ondark/60">
                      {formatDate(video.publishedAt)}
                    </p>
                  </div>
                </button>
              </TiltCard>
            </li>
          ))}
        </ul>
      )}

      <Modal open={active !== null} onClose={() => setActive(null)} title={active?.title ?? ""}>
        {active && (
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-bg-dark">
              <iframe
                src={embedUrl(active.id)}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <p className="text-ink-secondary dark:text-ink-ondark/70">{active.description}</p>
            <a
              href={watchUrl(active.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-brand-purple hover:underline"
            >
              Watch on YouTube
              <ExternalLink size={16} strokeWidth={1.75} />
            </a>
          </div>
        )}
      </Modal>
    </div>
  )
}
