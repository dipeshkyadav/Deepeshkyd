"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2 } from "lucide-react"
import { whatsappLink } from "@/lib/data"
import { Button } from "@/components/ui/Button"

const schema = z.object({
  name: z.string().min(2, "Tell me your name — at least 2 characters."),
  email: z.string().email("That email doesn't look right."),
  message: z.string().min(10, "Give me at least a sentence to work with."),
})

type FormValues = z.infer<typeof schema>

const inputClasses =
  "w-full rounded-md border border-ink/15 bg-bg-light px-4 py-3 text-ink placeholder:text-ink-secondary/60 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/15 dark:bg-surface-dark dark:text-ink-ondark"

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(values: FormValues) {
    const message = [
      "New message from dipeshkyd.com",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      "",
      values.message,
    ].join("\n")
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer")
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-surface p-8 text-center dark:bg-surface-dark" role="status">
        <CheckCircle2 size={40} strokeWidth={1.75} className="mx-auto text-brand-purple" />
        <h3 className="mt-4 font-display text-xl font-bold tracking-display dark:text-ink-ondark">
          Message on its way
        </h3>
        <p className="mt-2 text-ink-secondary dark:text-ink-ondark/70">
          Your message opened in WhatsApp — hit send there and I&apos;ll reply
          personally, usually within a day.
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

      <Button type="submit" size="lg" className="w-full">
        Send via WhatsApp
      </Button>
      <p className="text-center text-xs text-ink-secondary dark:text-ink-ondark/60">
        Submitting opens WhatsApp with your message prefilled — nothing is
        stored on this site.
      </p>
    </form>
  )
}
