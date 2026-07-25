import type { Metadata } from "next"
import Image from "next/image"
import { MessageCircle, Send, Youtube } from "lucide-react"
import { contact, photos, site, whatsappLink, telegramLink } from "@/lib/data"
import { Section } from "@/components/layout/Section"
import { ContactForm } from "@/components/sections/ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Dipesh Kr Yadav directly — WhatsApp, Telegram, or the contact form. Real replies, usually within a day.",
}

export default function ContactPage() {
  const channels = [
    {
      Icon: MessageCircle,
      label: `WhatsApp · ${contact.whatsappDisplay}`,
      href: whatsappLink("Hi Dipesh! I found you through dipeshkyd.com."),
    },
    {
      Icon: Send,
      label: `Telegram · @${contact.telegramHandle}`,
      href: telegramLink(),
    },
    {
      Icon: Youtube,
      label: "YouTube · @dipeshkyd",
      href: site.youtube,
    },
  ]

  return (
    <Section eyebrow="Say hello" script="talk" title="Let's talk">
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
        <div>
          <p className="text-lg text-ink-secondary dark:text-ink-ondark/70">
            Questions about a course, a product order, or a collab — I read
            everything myself. The fastest way to reach me is WhatsApp or
            Telegram.
          </p>
          <ul className="mt-8 space-y-3">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-surface p-4 font-medium transition-shadow hover:shadow-lift dark:bg-surface-dark dark:text-ink-ondark"
                >
                  <channel.Icon size={20} strokeWidth={1.75} className="text-brand-purple" />
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative mt-10 hidden max-w-xs lg:block">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-full w-full -rotate-2 rounded-2xl bg-brand-red/10"
            />
            <Image
              src={photos.posterDocumentMyLife}
              alt="Dipesh Kr Yadav — Document My Life poster"
              width={2297}
              height={3066}
              sizes="320px"
              className="relative rounded-2xl shadow-card"
            />
          </div>
        </div>
        <div className="rounded-2xl bg-surface p-8 dark:bg-surface-dark">
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
