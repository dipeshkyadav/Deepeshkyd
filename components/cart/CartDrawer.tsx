"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus, Send, Trash2, X } from "lucide-react"
import { products, telegramLink, whatsappLink } from "@/lib/data"
import { useCart } from "@/lib/store"
import { formatNpr } from "@/lib/utils"

function buildOrderMessage(
  lines: Array<{ name: string; quantity: number; subtotal: number }>,
  total: number,
) {
  return [
    "Hi Dipesh! I'd like to order from dipeshkyd.com:",
    ...lines.map(
      (line) => `\u2022 ${line.name} \u00d7${line.quantity} \u2014 ${formatNpr(line.subtotal)}`,
    ),
    `Total: ${formatNpr(total)}`,
  ].join("\n")
}

export function CartDrawer() {
  const { items, isOpen, close, setQuantity, remove } = useCart()
  const [copied, setCopied] = useState(false)

  const resolved = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug)
    return product ? [{ product, quantity: item.quantity }] : []
  })
  const total = resolved.reduce(
    (sum, { product, quantity }) => sum + product.priceNpr * quantity,
    0,
  )
  const message = buildOrderMessage(
    resolved.map(({ product, quantity }) => ({
      name: product.name,
      quantity,
      subtotal: product.priceNpr * quantity,
    })),
    total,
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  async function orderViaTelegram() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 4000)
    } catch {
      // clipboard unavailable — user can still type the order
    }
    window.open(telegramLink(), "_blank", "noopener,noreferrer")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.button
            aria-label="Close cart"
            className="absolute inset-0 bg-bg-dark/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bg-light shadow-lift dark:bg-surface-dark"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 p-6 dark:border-white/10">
              <h2 className="font-display text-xl font-bold tracking-display dark:text-ink-ondark">
                Your order
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                autoFocus
                className="rounded-full p-2 text-ink-secondary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:text-ink-ondark/70"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {resolved.length === 0 ? (
                <p className="text-ink-secondary dark:text-ink-ondark/60">
                  Cart&apos;s empty. The templates and mini-courses in the shop
                  are waiting.
                </p>
              ) : (
                <ul className="space-y-6">
                  {resolved.map(({ product, quantity }) => (
                    <li key={product.slug} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold dark:text-ink-ondark">{product.name}</p>
                        <p className="text-sm text-ink-secondary dark:text-ink-ondark/60">
                          {formatNpr(product.priceNpr)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => setQuantity(product.slug, quantity - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="rounded-full border border-ink/15 p-1 text-ink-secondary hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark/70"
                          >
                            <Minus size={16} strokeWidth={1.75} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold dark:text-ink-ondark">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(product.slug, quantity + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="rounded-full border border-ink/15 p-1 text-ink-secondary hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark/70"
                          >
                            <Plus size={16} strokeWidth={1.75} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="font-semibold dark:text-ink-ondark">
                          {formatNpr(product.priceNpr * quantity)}
                        </p>
                        <button
                          onClick={() => remove(product.slug)}
                          aria-label={`Remove ${product.name} from cart`}
                          className="text-ink-secondary hover:text-brand-red dark:text-ink-ondark/60"
                        >
                          <Trash2 size={16} strokeWidth={1.75} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {resolved.length > 0 && (
              <div className="space-y-4 border-t border-ink/10 p-6 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary dark:text-ink-ondark/70">Total</span>
                  <span className="font-display text-2xl font-bold tracking-display text-brand-purple">
                    {formatNpr(total)}
                  </span>
                </div>
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black px-6 py-3 font-semibold text-ink-ondark transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 dark:bg-ink-ondark dark:text-ink"
                >
                  Order on WhatsApp
                </a>
                <button
                  onClick={orderViaTelegram}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-purple px-6 py-3 font-semibold text-brand-purple transition-colors hover:bg-brand-purple hover:text-ink-ondark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
                >
                  <Send size={18} strokeWidth={1.75} />
                  {copied ? "Order copied — paste it in Telegram" : "Order on Telegram (@deepeshkyd)"}
                </button>
                <p className="text-center text-xs text-ink-secondary dark:text-ink-ondark/60">
                  Send the order message, and I&apos;ll confirm payment and
                  deliver your files in the same chat.
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
