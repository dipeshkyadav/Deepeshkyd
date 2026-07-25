"use client"

import Image from "next/image"
import { LayoutTemplate, ListChecks, MonitorPlay, Plus } from "lucide-react"
import type { Product, ProductKind } from "@/lib/types"
import { useCart } from "@/lib/store"
import { formatNpr } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { TiltCard } from "@/components/ui/TiltCard"

const kindMeta: Record<ProductKind, { label: string; Icon: typeof LayoutTemplate }> = {
  template: { label: "Template", Icon: LayoutTemplate },
  checklist: { label: "Checklist", Icon: ListChecks },
  "mini-course": { label: "Mini-course", Icon: MonitorPlay },
}

/** Ecom-style product grid — image-led cards, red price anchor, cart CTA. */
export function ShopGrid({ products }: { products: Product[] }) {
  const add = useCart((state) => state.add)

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => {
        const { label, Icon } = kindMeta[product.kind]
        return (
          <li key={product.slug} className={index === 1 ? "lg:translate-y-6" : undefined}>
            <TiltCard className="h-full rounded-2xl">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/5 bg-bg-light shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-white/10 dark:bg-surface-dark">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface dark:bg-bg-dark">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-panel">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-purple/30 blur-2xl"
                      />
                      <Icon size={48} strokeWidth={1.5} className="relative text-brand-purple-light" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 z-10">
                    <Badge tone="neutral" className="bg-bg-light/90 shadow-card backdrop-blur dark:bg-bg-dark/80">
                      {label}
                    </Badge>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-bold tracking-display dark:text-ink-ondark">
                    {product.name}
                  </h3>
                  <p className="flex-1 text-sm text-ink-secondary dark:text-ink-ondark/70">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-4 border-t border-ink/5 pt-4 dark:border-white/10">
                    <span className="font-display text-2xl font-bold tracking-display text-brand-red">
                      {formatNpr(product.priceNpr)}
                    </span>
                    <Button size="sm" onClick={() => add(product.slug)}>
                      <Plus size={16} strokeWidth={1.75} />
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </li>
        )
      })}
    </ul>
  )
}
