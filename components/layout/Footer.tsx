import Link from "next/link"
import { AtSign, Mail } from "lucide-react"
import { footerNav, primaryNav, site, socials } from "@/lib/data"
import { env } from "@/lib/env"
import type { SocialPlatform } from "@/lib/types"
import { BrandIcon, type BrandIconName } from "@/components/ui/BrandIcons"

/** Official brand colors on hover — real logos, professional feel. */
const brandStyles: Partial<Record<SocialPlatform, { icon: BrandIconName; hoverClass: string }>> = {
  youtube: { icon: "youtube", hoverClass: "hover:text-[#FF0000]" },
  instagram: { icon: "instagram", hoverClass: "hover:text-[#E4405F]" },
  facebook: { icon: "facebook", hoverClass: "hover:text-[#1877F2]" },
  tiktok: { icon: "tiktok", hoverClass: "hover:text-[#010101] dark:hover:text-[#69C9D0]" },
  linkedin: { icon: "linkedin", hoverClass: "hover:text-[#0A66C2]" },
  whatsapp: { icon: "whatsapp", hoverClass: "hover:text-[#25D366]" },
  telegram: { icon: "telegram", hoverClass: "hover:text-[#26A5E4]" },
}

const columnHeading =
  "text-sm font-semibold uppercase tracking-stretched text-ink dark:text-ink-ondark"

const footerLink =
  "text-sm text-ink-secondary transition-colors hover:text-brand-purple dark:text-ink-ondark/70 dark:hover:text-brand-purple-light"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/5 bg-surface dark:border-white/10 dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold tracking-display dark:text-ink-ondark">
              Dipesh<span className="text-brand-purple">kyd</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-secondary dark:text-ink-ondark/60">
              {site.tagline}. I document the journey and teach exactly what
              works — no recycled advice, only tested moves.
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Social links">
              {socials.map((social) => {
                const brand = brandStyles[social.platform]
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-ink-secondary transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-bg-light hover:shadow-card dark:text-ink-ondark/70 dark:hover:bg-white/10 ${brand?.hoverClass ?? "hover:text-brand-purple"}`}
                    >
                      {brand ? (
                        <BrandIcon name={brand.icon} size={19} />
                      ) : (
                        <AtSign size={19} strokeWidth={1.75} />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className={columnHeading}>Explore</h3>
            <ul className="mt-5 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className={columnHeading}>Resources</h3>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className={columnHeading}>Get in touch</h3>
            <p className="mt-5 text-sm leading-relaxed text-ink-secondary dark:text-ink-ondark/60">
              Questions, collabs, or feedback — I reply personally, usually
              within a day.
            </p>
            <a
              href={`mailto:${env.contactEmail}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline dark:text-brand-purple-light"
            >
              <Mail size={16} strokeWidth={1.75} />
              {env.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-6 text-sm text-ink-secondary dark:border-white/10 dark:text-ink-ondark/60 md:flex-row">
          <p>© {year} Dipeshkyd. All rights reserved.</p>
          <p>{site.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
