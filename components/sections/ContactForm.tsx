"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2 } from "lucide-react"
import { env } from "@/lib/env"
import { Button } from "@/components/ui/Button"

const schema = z.object({
  name: z.string().min(2, "Tell me your name — at least 2 characters."),
  email: z.string().email("That email doesn't look right."),
  message: z.string().min(10, "Give me at least a sentence to work with."),
})

type FormValues = z.infer<typeof schema>

/* Premium text boxes — soft glass surface, gentle lift and glow on focus. */
const inputClasses =
  "w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-ink shadow-sm backdrop-blur placeholder:text-ink-secondary/50 transition-all duration-300 hover:border-ink/20 focus:-translate-y-0.5 focus:border-brand-purple focus:shadow-glow focus:outline-none focus:ring-2 focus:ring-brand-purple/20 dark:border-white/10 dark:bg-white/5 dark:text-ink-ondark dark:hover:border-white/20"

function mailtoHref(values: FormValues): string {
  const subject = `New message from dipeshkyd.com — ${values.name}`
  const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
  return `mailto:${env.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm() {
  const [sent, setSent] = useState<"idle" | "sent" | "mailto">("idle")
  const [busy, setBusy] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setBusy(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        setSent("sent")
        return
      }
      // Server-side sending unavailable — open the visitor's email app
      // with everything prefilled. Same inbox, one extra tap.
      window.location.href = mailtoHref(values)
      setSent("mailto")
    } catch {
      window.location.href = mailtoHref(values)
      setSent("mailto")
    } finally {
      setBusy(false)
    }
  }

  if (sent !== "idle") {
    return (
      <div className="rounded-2xl bg-surface p-8 text-center dark:bg-surface-dark" role="status">
        <CheckCircle2 size={40} strokeWidth={1.75} className="mx-auto text-brand-purple" />
        <h3 className="mt-4 font-display text-xl font-bold tracking-display dark:text-ink-ondark">
          {sent === "sent" ? "Message sent" : "One more tap"}
        </h3>
        <p className="mt-2 text-ink-secondary dark:text-ink-ondark/70">
          {sent === "sent"
            ? `Your message is in my inbox (${env.contactEmail}) — I reply personally, usually within a day.`
            : `Your email app opened with the message addressed to ${env.contactEmail} — hit send there and I reply personally, usually within a day.`}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium dark:text-ink-ondark">
          Name
        </label>
        <input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClasses}
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-brand-red">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium dark:text-ink-ondark">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClasses}
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-brand-red">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium dark:text-ink-ondark">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClasses}
          placeholder="What's on your mind?"
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-brand-red">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </Button>
      <p className="text-center text-xs text-ink-secondary dark:text-ink-ondark/60">
        Your message is delivered straight to {env.contactEmail} — no WhatsApp
        involved, nothing else is stored on this site.
      </p>
    </form>
  )
}
