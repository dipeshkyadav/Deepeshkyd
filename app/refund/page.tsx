import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for dipeshkyd.com.",
}

/* [REVIEW WITH DIPESH before launch — placeholder legal copy.] */
export default function RefundPage() {
  return (
    <Section eyebrow="Legal" title="Refund Policy">
      <div className="max-w-2xl space-y-6 text-ink-secondary dark:text-ink-ondark/70">
        <p>
          Because every order happens in a direct chat, refunds do too — no
          forms, no ticket queues. Message me on WhatsApp or Telegram with
          your order details.
        </p>
        <p>
          Digital products: if the delivered file is broken, incomplete, or
          not what was described, tell me within 7 days and I&apos;ll fix it
          or refund you in full.
        </p>
        <p>
          Paid courses: if you&apos;ve completed less than the first module
          and it&apos;s not for you, ask for a refund within 7 days of
          enrollment.
        </p>
        <p>
          Since products are digital and delivered instantly, refunds for
          simple change of mind after download are handled case by case —
          talk to me, I&apos;m reasonable.
        </p>
        <p className="text-sm">Last updated: July 2026. [REVIEW BEFORE LAUNCH]</p>
      </div>
    </Section>
  )
}
