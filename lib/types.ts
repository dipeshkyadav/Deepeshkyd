export type NavItem = {
  label: string
  href: string
}

export type SocialPlatform =
  | "youtube"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin"
  | "threads"
  | "whatsapp"
  | "telegram"

export type SocialLink = {
  platform: SocialPlatform
  label: string
  url: string
}

export type Stat = {
  label: string
  value: number
  suffix?: string
}

export type CourseLevel = "Beginner" | "Advanced"

export type Course = {
  slug: string
  title: string
  description: string
  level: CourseLevel
  isFree: boolean
  priceUsd?: number // US dollars
  whatYoullLearn: string[]
  curriculum: Array<{ section: string; lessons: string[] }>
  coverImage: string // real photo or brand graphic only — never stock/AI
}

export type VideoCategory =
  | "Content Creation"
  | "Growth Hacking"
  | "AI Tools"
  | "Personal Branding"
  | "Editing"

export type Video = {
  id: string // YouTube video ID
  title: string
  description: string
  category: VideoCategory
  publishedAt: string // ISO date
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string // ISO date
  featured?: boolean
  pullQuote?: string
  image?: string // cover photo URL — upload via the admin panel
  content: string[] // paragraphs
}

export type ProductKind = "template" | "checklist" | "mini-course"

export type Product = {
  slug: string
  name: string
  description: string
  priceUsd: number // US dollars
  kind: ProductKind
  image?: string // product photo URL — upload via the admin panel
}

/**
 * Cart lines snapshot the product's name and price at add-time, so items
 * added through the admin panel work in the cart without a static lookup.
 */
export type CartItem = {
  slug: string
  name: string
  priceUsd: number
  quantity: number
}
