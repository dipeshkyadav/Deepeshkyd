"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Minus, Plus, ShieldCheck, Trash2, X } from "lucide-react"
import { whatsappLink } from "@/lib/data"
import { useCart } from "@/lib/store"
import { formatUsd } from "@/lib/utils"

/** Country dial codes — buyers can be anywhere in the world. */
const dialCodes = [
  { country: "Nepal", code: "+977" },
  { country: "India", code: "+91" },
  { country: "USA / Canada", code: "+1" },
  { country: "UK", code: "+44" },
  { country: "Australia", code: "+61" },
  { country: "UAE", code: "+971" },
  { country: "Qatar", code: "+974" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "Kuwait", code: "+965" },
  { country: "Bahrain", code: "+973" },
  { country: "Oman", code: "+968" },
  { country: "Malaysia", code: "+60" },
  { country: "Singapore", code: "+65" },
  { country: "Japan", code: "+81" },
  { country: "South Korea", code: "+82" },
  { country: "China", code: "+86" },
  { country: "Bangladesh", code: "+880" },
  { country: "Pakistan", code: "+92" },
  { country: "Sri Lanka", code: "+94" },
  { country: "Philippines", code: "+63" },
  { country: "Indonesia", code: "+62" },
  { country: "Thailand", code: "+66" },
  { country: "Vietnam", code: "+84" },
  { country: "Germany", code: "+49" },
  { country: "France", code: "+33" },
  { country: "Italy", code: "+39" },
  { country: "Spain", code: "+34" },
  { country: "Netherlands", code: "+31" },
  { country: "Portugal", code: "+351" },
  { country: "Ireland", code: "+353" },
  { country: "Switzerland", code: "+41" },
  { country: "Sweden", code: "+46" },
  { country: "Norway", code: "+47" },
  { country: "Denmark", code: "+45" },
  { country: "Poland", code: "+48" },
  { country: "Turkey", code: "+90" },
  { country: "Russia", code: "+7" },
  { country: "Brazil", code: "+55" },
  { country: "Mexico", code: "+52" },
  { country: "South Africa", code: "+27" },
  { country: "Nigeria", code: "+234" },
  { country: "Kenya", code: "+254" },
  { country: "Egypt", code: "+20" },
  { country: "Israel", code: "+972" },
  { country: "New Zealand", code: "+64" },
]

type Step = "cart" | "details" | "verify" | "done"

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-bg-light px-4 py-3 text-sm outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-bg-dark dark:text-ink-ondark"

const labelClass =
  "mb-1.5 block text-sm font-semibold dark:text-ink-ondark"

export function CartDrawer() {
  const { items, isOpen, close, setQuantity, remove, clear } = useCart()
  const [step, setStep] = useState<Step>("cart")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dial, setDial] = useState("+977")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [token, setToken] = useState("")
  const [expires, setExpires] = useState(0)
  const [orderId, setOrderId] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const total = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0,
  )
  const whatsappMessage = [
    "Hi Dipesh! I'd like to order from dipeshkyd.com:",
    ...items.map(
      (item) =>
        `\u2022 ${item.name} \u00d7${item.quantity} \u2014 ${formatUsd(item.priceUsd * item.quantity)}`,
    ),
    `Total: ${formatUsd(total)}`,
  ].join("\n")

  useEffect(() => {
    if (!isOpen) return
    setStep("cart")
    setError("")
    setCode("")
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  function detailsValid(): string {
    if (name.trim().length < 2) return "Enter your full name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Enter a valid email address."
    if (!/^\d[\d ()-]{4,15}$/.test(phone.trim()))
      return "Enter a valid phone number (digits only, without the country code)."
    return ""
  }

  async function sendCode() {
    const invalid = detailsValid()
    if (invalid) {
      setError(invalid)
      return
    }
    setBusy(true)
    setError("")
    try {
      const response = await fetch("/api/checkout/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        setError(result?.error ?? "Could not send the code \u2014 try again.")
      } else {
        setToken(result.token)
        setExpires(result.expires)
        setCode("")
        setStep("verify")
      }
    } catch {
      setError("Network problem \u2014 check your connection and try again.")
    }
    setBusy(false)
  }

  async function placeOrder() {
    if (!/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit code from your email.")
      return
    }
    setBusy(true)
    setError("")
    try {
      const response = await fetch("/api/checkout/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: `${dial} ${phone.trim()}`,
          code: code.trim(),
          token,
          expires,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            priceUsd: item.priceUsd,
          })),
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        setError(result?.error ?? "Could not place the order \u2014 try again.")
      } else {
        setOrderId(result.orderId ?? "")
        clear()
        setStep("done")
      }
    } catch {
      setError("Network problem \u2014 check your connection and try again.")
    }
    setBusy(false)
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
              <div className="flex items-center gap-3">
                {(step === "details" || step === "verify") && (
                  <button
                    onClick={() => {
                      setError("")
                      setStep(step === "verify" ? "details" : "cart")
                    }}
                    aria-label="Go back"
                    className="rounded-full p-1 text-ink-secondary hover:text-ink dark:text-ink-ondark/70"
                  >
                    <ArrowLeft size={18} strokeWidth={1.75} />
                  </button>
                )}
                <h2 className="font-display text-xl font-bold tracking-display dark:text-ink-ondark">
                  {step === "cart" && "Your order"}
                  {step === "details" && "Your details"}
                  {step === "verify" && "Verify your email"}
                  {step === "done" && "Order placed"}
                </h2>
              </div>
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
              {step === "cart" &&
                (items.length === 0 ? (
                  <p className="text-ink-secondary dark:text-ink-ondark/60">
                    Cart&apos;s empty. The templates and mini-courses in the shop
                    are waiting.
                  </p>
                ) : (
                  <ul className="space-y-6">
                    {items.map((item) => (
                      <li key={item.slug} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold dark:text-ink-ondark">{item.name}</p>
                          <p className="text-sm text-ink-secondary dark:text-ink-ondark/60">
                            {formatUsd(item.priceUsd)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => setQuantity(item.slug, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="rounded-full border border-ink/15 p-1 text-ink-secondary hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark/70"
                            >
                              <Minus size={16} strokeWidth={1.75} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold dark:text-ink-ondark">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(item.slug, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="rounded-full border border-ink/15 p-1 text-ink-secondary hover:border-brand-purple hover:text-brand-purple dark:border-white/15 dark:text-ink-ondark/70"
                            >
                              <Plus size={16} strokeWidth={1.75} />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="font-semibold dark:text-ink-ondark">
                            {formatUsd(item.priceUsd * item.quantity)}
                          </p>
                          <button
                            onClick={() => remove(item.slug)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-ink-secondary hover:text-brand-red dark:text-ink-ondark/60"
                          >
                            <Trash2 size={16} strokeWidth={1.75} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}

              {step === "details" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="checkout-name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="checkout-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className={labelClass}>
                      Email — we&apos;ll send a verification code here
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className={labelClass}>
                      Phone — any country
                    </label>
                    <div className="flex gap-2">
                      <select
                        aria-label="Country code"
                        value={dial}
                        onChange={(event) => setDial(event.target.value)}
                        className="w-32 shrink-0 rounded-xl border border-ink/15 bg-bg-light px-2 py-3 text-sm outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-bg-dark dark:text-ink-ondark"
                      >
                        {dialCodes.map((entry) => (
                          <option key={`${entry.country}-${entry.code}`} value={entry.code}>
                            {entry.country} {entry.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        autoComplete="tel-national"
                        placeholder="98XXXXXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-ink-secondary dark:text-ink-ondark/60">
                    <ShieldCheck size={14} strokeWidth={1.75} className="shrink-0 text-brand-purple" />
                    Your email is verified with a one-time code before the order
                    is placed — no spam, ever.
                  </p>
                </div>
              )}

              {step === "verify" && (
                <div className="space-y-4">
                  <p className="text-sm text-ink-secondary dark:text-ink-ondark/70">
                    We emailed a 6-digit code to{" "}
                    <span className="font-semibold text-ink dark:text-ink-ondark">{email.trim()}</span>.
                    Enter it below to confirm your order. Check spam if you
                    don&apos;t see it.
                  </p>
                  <div>
                    <label htmlFor="checkout-code" className={labelClass}>
                      Verification code
                    </label>
                    <input
                      id="checkout-code"
                      inputMode="numeric"
                      maxLength={6}
                      value={code}
                      onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      className={`${inputClass} text-center font-display text-2xl font-bold tracking-[0.4em]`}
                    />
                  </div>
                  <button
                    onClick={sendCode}
                    disabled={busy}
                    className="text-sm font-semibold text-brand-purple hover:underline disabled:opacity-50"
                  >
                    Resend code
                  </button>
                </div>
              )}

              {step === "done" && (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <CheckCircle2 size={56} strokeWidth={1.5} className="text-brand-purple" />
                  <h3 className="font-display text-2xl font-bold tracking-display dark:text-ink-ondark">
                    Thank you, {name.trim().split(" ")[0] || "friend"}!
                  </h3>
                  <p className="text-sm text-ink-secondary dark:text-ink-ondark/70">
                    Order {orderId ? <strong>{orderId}</strong> : null} is in. A
                    confirmation is on its way to <strong>{email.trim()}</strong>{" "}
                    — I&apos;ll contact you shortly to arrange payment and
                    delivery.
                  </p>
                  <button
                    onClick={close}
                    className="mt-2 rounded-xl bg-brand-black px-6 py-3 font-semibold text-ink-ondark transition-shadow hover:shadow-glow dark:bg-ink-ondark dark:text-ink"
                  >
                    Keep browsing
                  </button>
                </div>
              )}
            </div>

            {step !== "done" && items.length > 0 && (
              <div className="space-y-4 border-t border-ink/10 p-6 dark:border-white/10">
                {error ? (
                  <p role="alert" className="text-sm font-medium text-brand-red">
                    {error}
                  </p>
                ) : null}
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary dark:text-ink-ondark/70">Total</span>
                  <span className="font-display text-2xl font-bold tracking-display text-brand-red">
                    {formatUsd(total)}
                  </span>
                </div>
                {step === "cart" && (
                  <>
                    <button
                      onClick={() => {
                        setError("")
                        setStep("details")
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black px-6 py-3 font-semibold text-ink-ondark transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 dark:bg-ink-ondark dark:text-ink"
                    >
                      Checkout
                    </button>
                    <a
                      href={whatsappLink(whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm font-medium text-ink-secondary underline-offset-4 hover:text-brand-purple hover:underline dark:text-ink-ondark/60"
                    >
                      Prefer chat? Order on WhatsApp instead
                    </a>
                  </>
                )}
                {step === "details" && (
                  <button
                    onClick={sendCode}
                    disabled={busy}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black px-6 py-3 font-semibold text-ink-ondark transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-ink-ondark dark:text-ink"
                  >
                    {busy ? "Sending code\u2026" : "Send verification code"}
                  </button>
                )}
                {step === "verify" && (
                  <button
                    onClick={placeOrder}
                    disabled={busy}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black px-6 py-3 font-semibold text-ink-ondark transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-ink-ondark dark:text-ink"
                  >
                    {busy ? "Placing order\u2026" : "Verify & place order"}
                  </button>
                )}
                <p className="text-center text-xs text-ink-secondary dark:text-ink-ondark/60">
                  No card needed — after your order is placed, I confirm payment
                  and deliver your files by email or chat.
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
