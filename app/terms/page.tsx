import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for dipeshkyd.com.",
}

/* [REVIEW WITH DIPESH before launch — placeholder legal copy.] */
export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service">
      <div className="max-w-2xl space-y-6 text-ink-secondary dark:text-ink-ondark/70">
        <p>
          By using dipeshkyd.com you agree to these terms. The site provides
          educational content, digital products, and courses created by
          Dipesh Kr Yadav.
        </p>
        <p>
          Orders are placed by sending a message via WhatsApp or Telegram.
          An order is confirmed once payment is agreed and completed in that
          chat. Digital products are delivered to the same chat.
        </p>
        <p>
          All content, courses, and products are for your personal use. You
          may not resell, redistribute, or republish them without written
          permission.
        </p>
        <p>
          Content on this site reflects personal experience and is provided
          as-is, without guarantees of specific results — your growth
          depends on your execution.
        </p>
        <p className="text-sm">Last updated: July 2026. [REVIEW BEFORE LAUNCH]</p>
      </div>
    </Section>
  )
}
