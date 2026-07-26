import { requireAdmin } from "@/lib/admin/auth"
import { PhotoLibrary } from "@/components/admin/PhotoLibrary"

export const dynamic = "force-dynamic"

export default async function AdminPhotosPage() {
  await requireAdmin()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-display">
        Photos
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-secondary dark:text-ink-ondark/60">
        Upload photos here, then copy the URL and paste it wherever a photo is
        needed — course covers, product photos, or blog post images. With a
        Vercel Blob store connected, uploads are stored permanently.
      </p>
      <div className="mt-8">
        <PhotoLibrary />
      </div>
    </div>
  )
}
