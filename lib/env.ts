/**
 * Central environment configuration — the ONLY place that reads process.env
 * for NEXT_PUBLIC_* values.
 *
 * Vercel: Project → Settings → Environment Variables. NEXT_PUBLIC_* values
 * are inlined at BUILD time, so redeploy after changing them.
 *
 * Local development: copy `.env.example` to `.env.local` and edit.
 *
 * Every value has a safe production default, so the site also builds with
 * zero environment setup.
 */
function readEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export const env = {
  /** Canonical site origin, no trailing slash — used for metadata and OG URLs. */
  siteUrl: readEnv(process.env.NEXT_PUBLIC_SITE_URL, "https://dipeshkyd.com"),

  /** WhatsApp number in wa.me format: country code + number, digits only. */
  whatsappNumber: readEnv(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    "9779821594372",
  ),

  /** WhatsApp number as displayed to visitors. */
  whatsappDisplay: readEnv(
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY,
    "+977 9821594372",
  ),

  /** Telegram handle without the @. */
  telegramHandle: readEnv(
    process.env.NEXT_PUBLIC_TELEGRAM_HANDLE,
    "deepeshkyd",
  ),

  /** Business email — contact-form messages are delivered here. */
  contactEmail: readEnv(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    "deepesh@dipeshkyd.com",
  ),

  /**
   * Home hero photo URL. Default: the poster served by the original
   * deployment. To use your own: upload the photo in /admin (photo
   * uploader), copy the URL, set NEXT_PUBLIC_HERO_IMAGE in Vercel,
   * and redeploy. If the image ever fails to load, the site shows a
   * branded poster card instead — never a broken image.
   */
  heroImage: readEnv(
    process.env.NEXT_PUBLIC_HERO_IMAGE,
    "https://dipeshkyd-1.vercel.app/images/poster-content-creator.png",
  ),
}
