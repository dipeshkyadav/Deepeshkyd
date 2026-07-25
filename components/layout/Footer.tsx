import Link from "next/link"
import { AtSign } from "lucide-react"
import { footerNav, site, socials } from "@/lib/data"
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

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-surface dark:border-white/10 dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-display dark:text-ink-ondark">
              Dipesh<span className="text-brand-purple">kyd</span>
            </p>
            <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-secondary transition-colors hover:text-brand-purple dark:text-ink-ondark/70 dark:hover:text-brand-purple-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ul className="flex gap-1.5" aria-label="Social links">
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

        <p className="mt-10 text-center text-sm text-ink-secondary dark:text-ink-ondark/60">
          {site.madeWith}
        </p>
      </div>
    </footer>
  )
}
