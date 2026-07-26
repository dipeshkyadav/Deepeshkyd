import { requireAdmin } from "@/lib/admin/auth"
import { getVideos } from "@/lib/content"
import { CollectionManager } from "@/components/admin/CollectionManager"

export const dynamic = "force-dynamic"

export default async function AdminVideosPage() {
  await requireAdmin()
  const videos = await getVideos()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-display">
        Videos
      </h1>
      <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
        The YT Tutorial page. Thumbnails and playback come automatically from
        the YouTube video ID.
      </p>
      <CollectionManager
        collection="videos"
        itemName="video"
        titleKey="title"
        initial={videos}
        newItem={{
          id: "",
          title: "",
          description: "",
          category: "Content Creation",
          publishedAt: new Date().toISOString().slice(0, 10),
        }}
        fields={[
          { key: "title", label: "Title", type: "text" },
          {
            key: "id",
            label: "YouTube video ID",
            type: "text",
            help: "The part after watch?v= in the YouTube link, e.g. NObvtQ-EN_4.",
          },
          { key: "description", label: "Description", type: "textarea" },
          {
            key: "category",
            label: "Category",
            type: "select",
            options: [
              "Content Creation",
              "Growth Hacking",
              "AI Tools",
              "Personal Branding",
              "Editing",
            ],
          },
          { key: "publishedAt", label: "Published on", type: "date" },
        ]}
      />
    </div>
  )
}
