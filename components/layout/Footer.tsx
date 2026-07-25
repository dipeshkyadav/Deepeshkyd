import Link from "next/link"
import {
  AtSign,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Youtube,
} from "lucide-react"
import { footerNav, site, socials } from "@/lib/data"
import type { SocialPlatform } from "@/lib/types"

const icons: Record<SocialPlatform, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  threads: AtSign,
  whatsapp: MessageCircle,
  telegram: Send,
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

          <ul className="flex gap-2" aria-label="Social links">
            {socials.map((social) => {
              const Icon = icons[social.platform]
              return (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-ink-secondary transition-all hover:text-brand-purple hover:shadow-glow dark:text-ink-ondark/70 dark:hover:text-brand-purple-light"
                  >
                    <Icon size={20} strokeWidth={1.75} />
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
