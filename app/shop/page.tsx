import type { Metadata } from "next"
import { MessageCircle, PackageCheck, ShoppingBag } from "lucide-react"
import { contact } from "@/lib/data"
import { getProducts } from "@/lib/content"
import { Section } from "@/components/layout/Section"
import { ShopGrid } from "@/components/sections/ShopGrid"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Templates, checklists, and mini-courses by Dipesh Kr Yadav — order via WhatsApp or Telegram, delivered straight to your chat.",
}

const steps = [
  {
    Icon: ShoppingBag,
    title: "Add to cart",
    body: "Pick your products — the cart builds your order message automatically.",
  },
  {
    Icon: MessageCircle,
    title: "Send the order",
    body: `One tap sends it to me on WhatsApp (${contact.whatsappDisplay}) or Telegram (@${contact.telegramHandle}).`,
  },
  {
    Icon: PackageCheck,
    title: "Pay & receive",
    body: "I confirm payment in chat and deliver your files right there. Personal, fast, no checkout forms.",
  },
]

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <>
      <Section eyebrow="Digital products" script="grab" title="The shop">
        <p className="mb-10 max-w-2xl text-lg text-ink-secondary dark:text-ink-ondark/70">
          The exact templates and systems I use on my own channel — packaged
          so you can skip the trial and error.
        </p>
        <ShopGrid products={products} />
      </Section>

      <Section
        eyebrow="How ordering works"
        title="Three steps, one chat"
        className="bg-surface dark:bg-surface-dark"
      >
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl bg-bg-light p-6 shadow-card dark:bg-bg-dark">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple font-display text-sm font-bold text-ink-ondark">
                {index + 1}
              </span>
              <step.Icon size={28} strokeWidth={1.75} className="text-brand-purple" />
              <h3 className="mt-4 font-display text-lg font-bold tracking-display dark:text-ink-ondark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-secondary dark:text-ink-ondark/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
