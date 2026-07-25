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

export function ShopGrid({ products }: { products: Product[] }) {
  const add = useCart((state) => state.add)

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => {
        const { label, Icon } = kindMeta[product.kind]
        return (
          <li key={product.slug} className={index === 1 ? "lg:translate-y-6" : undefined}>
            <TiltCard className="h-full rounded-2xl">
              <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                {product.image ? (
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-panel">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-purple/30 blur-2xl"
                    />
                    <Icon size={40} strokeWidth={1.75} className="relative text-brand-purple-light" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <Badge tone="neutral" className="self-start">
                    {label}
                  </Badge>
                  <h3 className="font-display text-lg font-bold tracking-display dark:text-ink-ondark">
                    {product.name}
                  </h3>
                  <p className="flex-1 text-sm text-ink-secondary dark:text-ink-ondark/70">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold tracking-display text-brand-purple">
                      {formatNpr(product.priceNpr)}
                    </span>
                    <Button size="sm" onClick={() => add(product.slug)}>
                      <Plus size={16} strokeWidth={1.75} />
                      Add
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
