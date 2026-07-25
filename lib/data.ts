import type {
  BlogPost,
  Course,
  NavItem,
  Product,
  SocialLink,
  Stat,
  Video,
} from "./types"

import { env } from "./env"

/** Brand facts — master prompt §1. Fixed. */
export const site = {
  name: "Dipeshkyd",
  fullName: "Dipesh Kr Yadav",
  tagline: "The Growth Hacker | Professional Content Creator",
  url: env.siteUrl,
  youtube: "https://youtube.com/@dipeshkyd",
  handle: "dipeshkyd",
  madeWith: "Made with \u2764\ufe0f and \u2615 by Dipeshkyd",
} as const

/** Payment & contact channels. Orders and messages go here — no Stripe. */
export const contact = {
  whatsappDisplay: env.whatsappDisplay,
  whatsappNumber: env.whatsappNumber, // wa.me format: country code, no "+"
  telegramHandle: env.telegramHandle,
} as const

export function whatsappLink(message: string): string {
  return `{{https://wa.me/${contact.whatsappNumber}}}?text=${encodeURIComponent(message)}`
}

export function telegramLink(): string {
  return `{{https://t.me/${contact.telegramHandle}}}`
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/course" },
  { label: "YT Tutorial", href: "/yt-tutorial" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
]

export const footerNav: NavItem[] = [
  { label: "About / The Journey", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund", href: "/refund" },
]

export const socials: SocialLink[] = [
  { platform: "youtube", label: "YouTube", url: "https://youtube.com/@dipeshkyd" },
  { platform: "instagram", label: "Instagram", url: "https://instagram.com/dipeshkyd" },
  { platform: "facebook", label: "Facebook", url: "https://facebook.com/dipeshkyd" },
  { platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@dipeshkyd" },
  { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/dipeshkyd" },
  { platform: "whatsapp", label: "WhatsApp", url: `{{https://wa.me/${contact.whatsappNumber}}}` },
  { platform: "telegram", label: "Telegram", url: telegramLink() },
]

/** The two poster quotes — pull-quotes on About / The Journey (§3). */
export const posterQuotes = [
  "Every video deserves my attention, and every word deserves my dedication.",
  "Starve your distractions, feed your focus.",
] as const

/**
 * Home stats bar. Every value below is [REPLACE WITH REAL FIGURE] —
 * do NOT ship these zeros. Wire real numbers before launch.
 */
export const stats: Stat[] = [
  { label: "Subscribers", value: 0, suffix: "+" }, // [REPLACE WITH REAL FIGURE]
  { label: "Videos published", value: 0, suffix: "+" }, // [REPLACE WITH REAL FIGURE]
  { label: "Students learning", value: 0, suffix: "+" }, // [REPLACE WITH REAL FIGURE]
]

/** Approved photos — the only two until Dipesh supplies more (§1). */
export const photos = {
  posterContentCreator: "/images/poster-content-creator.png",
  posterDocumentMyLife: "/images/poster-document-my-life.png",
} as const

/* ------------------------------------------------------------------ */
/* [SAMPLE DATA] Everything below is structured sample content in     */
/* Dipesh's voice. Replace titles, prices, and IDs with real ones     */
/* before launch. Shapes are final — pages consume these types.       */
/* Prices are in US DOLLARS. Cover photos default to real thumbnails  */
/* from youtube.com/@dipeshkyd — replace via the admin panel anytime. */
/* ------------------------------------------------------------------ */

export const courses: Course[] = [
  {
    slug: "youtube-growth-blueprint",
    title: "YouTube Growth Blueprint",
    description:
      "The exact system I use to plan, film, and publish videos that grow — starting from zero, with a phone and no excuses.",
    level: "Beginner",
    isFree: true,
    whatYoullLearn: [
      "Find video ideas people already search for",
      "Script a hook in the first 15 seconds",
      "Batch-film a week of content in one afternoon",
      "Read analytics without drowning in them",
    ],
    curriculum: [
      {
        section: "Week 1 — Foundation",
        lessons: ["Your niche is a question, not a topic", "Channel setup that doesn't look amateur", "The idea bank system"],
      },
      {
        section: "Week 2 — Production",
        lessons: ["Phone filming setup on a budget", "Scripting hooks that hold", "Batch filming day"],
      },
      {
        section: "Week 3 — Growth",
        lessons: ["Thumbnails people actually click", "Titles: promise + curiosity", "Reading your first analytics"],
      },
    ],
    coverImage: "https://i.ytimg.com/vi/NObvtQ-EN_4/hqdefault.jpg",
  },
  {
    slug: "content-engine",
    title: "The Content Engine",
    description:
      "Turn one idea into a week of content across YouTube, Shorts, and Instagram — my full repurposing workflow, tool by tool.",
    level: "Advanced",
    isFree: false,
    priceUsd: 19, // [SAMPLE PRICE]
    whatYoullLearn: [
      "One-idea → seven-pieces repurposing map",
      "AI tools that save hours without making content generic",
      "A publishing calendar you'll actually follow",
      "Cross-platform analytics in one dashboard",
    ],
    curriculum: [
      {
        section: "Module 1 — The Engine",
        lessons: ["Anatomy of a repurposable idea", "The content pyramid", "My exact weekly workflow"],
      },
      {
        section: "Module 2 — Tools",
        lessons: ["Editing stack walkthrough", "AI assistants: where they help, where they hurt", "Templates I reuse every week"],
      },
      {
        section: "Module 3 — Scale",
        lessons: ["Batching and scheduling", "When to hire an editor", "Monetization checkpoints"],
      },
    ],
    coverImage: "https://i.ytimg.com/vi/8gzMw_BoN3s/hqdefault.jpg",
  },
  {
    slug: "personal-brand-launchpad",
    title: "Personal Brand Launchpad",
    description:
      "Build a personal brand while you're still a student — how I balance content creation with CA preparation, and how you can too.",
    level: "Beginner",
    isFree: false,
    priceUsd: 9, // [SAMPLE PRICE]
    whatYoullLearn: [
      "Define your brand in one sentence",
      "Consistent visual identity on a student budget",
      "Time-blocking content around studies",
      "Your first 100 true followers",
    ],
    curriculum: [
      {
        section: "Part 1 — Identity",
        lessons: ["The one-line positioning exercise", "Name, handle, and look", "Your story is the moat"],
      },
      {
        section: "Part 2 — Launch",
        lessons: ["First 10 posts, planned", "Showing up on camera", "The 30-day consistency sprint"],
      },
    ],
    coverImage: "https://i.ytimg.com/vi/IAEbTZ7EuVY/hqdefault.jpg",
  },
]

/** Real videos from youtube.com/@dipeshkyd — add more via the admin panel (/admin/data). */
export const videos: Video[] = [
  {
    id: "NObvtQ-EN_4",
    title: "60-Day Challenge — latest short",
    description: "Straight from the channel — part of the 60-day skill and discipline challenge.",
    category: "Personal Branding",
    publishedAt: "2026-07-20",
  },
  {
    id: "8gzMw_BoN3s",
    title: "Get Gemini Pro & Google AI Pro free for all students",
    description: "Step-by-step: how students can unlock Gemini Pro and Google AI Pro for free.",
    category: "AI Tools",
    publishedAt: "2026-05-15",
  },
  {
    id: "vlSFd4tZrNs",
    title: "Day 08/60 Challenge — build up your skill",
    description: "Top 3 websites + Telegram channels to build your skills and grow smarter every day.",
    category: "Growth Hacking",
    publishedAt: "2025-11-09",
  },
  {
    id: "IAEbTZ7EuVY",
    title: "Day 04/60 Challenge — build your network on digital space",
    description: "Growing your digital identity — part of the 60-day challenge series.",
    category: "Personal Branding",
    publishedAt: "2025-11-05",
  },
]

/** [SAMPLE] Digital products. Delivery happens by email or chat after order. */
export const products: Product[] = [
  {
    slug: "reel-script-template",
    name: "Reel Script Template Pack",
    description: "20 fill-in-the-blank short-form scripts — hooks, structures, and CTAs I use on my own reels.",
    priceUsd: 4.99, // [SAMPLE PRICE]
    kind: "template",
  },
  {
    slug: "growth-checklist",
    name: "30-Day Channel Growth Checklist",
    description: "One page per day. Do the task, tick the box, watch the channel move. Printable PDF.",
    priceUsd: 2.99, // [SAMPLE PRICE]
    kind: "checklist",
  },
  {
    slug: "editing-mini-course",
    name: "Phone Editing Mini-Course",
    description: "90 minutes of over-the-shoulder editing — from raw clips to a publish-ready video, all on a phone.",
    priceUsd: 9.99, // [SAMPLE PRICE]
    kind: "mini-course",
  },
]

/** [SAMPLE] Blog posts in Dipesh's voice. */
export const blogPosts: BlogPost[] = [
  {
    slug: "document-dont-create",
    title: "Document, don't create: the mindset that unblocked me",
    excerpt:
      "I spent months waiting to be 'ready' to make content. Then I stopped creating and started documenting. Everything changed.",
    publishedAt: "2026-07-01",
    featured: true,
    pullQuote: "Every video deserves my attention, and every word deserves my dedication.",
    content: [
      "For months I had a camera, a niche, and a list of video ideas — and zero published videos. I kept waiting for the day my content would be 'good enough' to post. That day never comes. I know now that it never comes for anyone.",
      "The shift happened when I stopped trying to create and started documenting. Instead of inventing a persona who teaches, I filmed the student who learns. My CA prep, my first bad thumbnails, my analytics screenshots at 47 subscribers — all of it became content.",
      "Documentation removes the biggest bottleneck in content creation: the fear of not being an expert. You don't need to be ahead of everyone. You need to be one step ahead of the person watching, and honest about the steps you haven't taken yet.",
      "Practically, this means my phone's camera roll is my content calendar. Study session? Timelapse. New tool? Screen recording. Failed experiment? That's the best video of the month, because nobody else will publish theirs.",
      "If you're stuck at zero videos: lower the bar until it's under your feet. Document today. Edit tomorrow. Publish the day after. Repeat until the quality catches up with your taste — it will.",
    ],
  },
  {
    slug: "starve-your-distractions",
    title: "Starve your distractions, feed your focus",
    excerpt:
      "The poster quote everyone asks about — here's the actual system behind it: how I structure a day that has both CA prep and a content channel in it.",
    publishedAt: "2026-06-15",
    pullQuote: "Starve your distractions, feed your focus.",
    content: [
      "People read the quote on my poster and assume it's about deleting Instagram. It's not. Instagram is my distribution channel — I can't delete it. It's about deciding, in advance, what gets your best hours.",
      "My day has two protected blocks: morning study (CA prep gets my freshest brain) and one afternoon content block. Everything else — replies, scrolling for 'research', tweaking thumbnails for the fifth time — fights for the leftovers.",
      "Starving a distraction doesn't mean willpower. It means friction. Notifications off by default. Phone in another room during study. Editing apps live in a folder my thumb doesn't reach by habit.",
      "Feeding focus also means feeding it something specific. 'Work on the channel' is not a task. 'Script the hook for Tuesday's video' is. Vague plans are how distractions win.",
      "Try one week: two protected blocks, tasks named in advance, phone out of reach. Your output will embarrass your old schedule.",
    ],
  },
  {
    slug: "first-100-subscribers",
    title: "What I'd do differently for my first 100 subscribers",
    excerpt:
      "The honest post-mortem: what worked, what was wasted effort, and the three things I'd tell anyone starting a channel this year.",
    publishedAt: "2026-05-20",
    content: [
      "The first 100 subscribers are the slowest and the most educational. Mine took longer than they should have, and this is the post-mortem I wish someone had published for me.",
      "What was wasted effort: obsessing over gear, redesigning my banner three times, and posting without a hook because 'the content speaks for itself'. It doesn't. Nobody hears content they never click.",
      "What actually worked: picking one repeatable format, publishing on a schedule I could sustain during exam season, and answering every single comment like it was a conversation — because at 47 subscribers, it is.",
      "The three things I'd tell anyone starting now: your first 10 videos are practice in public, your title is 80% of the video's fate, and consistency beats intensity every single month.",
      "None of this is theory. It's all documented on the channel — the flops included. That's the point.",
    ],
  },
]
