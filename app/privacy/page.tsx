import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for dipeshkyd.com.",
}

/* [REVIEW WITH DIPESH before launch — placeholder legal copy.] */
export default function PrivacyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy Policy">
      <div className="max-w-2xl space-y-6 text-ink-secondary dark:text-ink-ondark/70">
        <p>
          dipeshkyd.com does not run accounts, store orders, or keep your
          personal data on a server. The contact form and shop cart prepare a
          message that you send yourself via WhatsApp or Telegram — nothing
          is submitted to this website.
        </p>
        <p>
          Your cart contents and theme preference are stored only in your own
          browser (local storage) and never leave your device.
        </p>
        <p>
          Embedded YouTube videos are served in privacy-enhanced mode.
          YouTube may set cookies once you play a video — see Google&apos;s
          privacy policy for details.
        </p>
        <p>
          Conversations on WhatsApp and Telegram are governed by those
          platforms&apos; own privacy policies. I use your messages only to
          answer you and deliver what you ordered.
        </p>
        <p>Questions? Message me any time — details on the Contact page.</p>
        <p className="text-sm">Last updated: July 2026. [REVIEW BEFORE LAUNCH]</p>
      </div>
    </Section>
  )
}
