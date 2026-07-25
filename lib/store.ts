"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "./types"

/** What the shop passes when adding a product — a snapshot of the line. */
type AddInput = {
  slug: string
  name: string
  priceUsd: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: AddInput) => void
  remove: (slug: string) => void
  setQuantity: (slug: string, quantity: number) => void
  clear: () => void
}

/**
 * Explicitly typed `set` — a narrow, middleware-agnostic view of zustand's
 * setter that stays assignable to the real API.
 */
type CartSet = (
  partial: Partial<CartState> | ((state: CartState) => Partial<CartState>),
) => void

export const useCart = create<CartState>()(
  persist(
    (set: CartSet) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (product: AddInput) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.slug === product.slug,
          )
          return {
            isOpen: true,
            items: existing
              ? state.items.map((item) =>
                  item.slug === product.slug
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...state.items, { ...product, quantity: 1 }],
          }
        }),
      remove: (slug: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        })),
      setQuantity: (slug: string, quantity: number) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.slug !== slug)
              : state.items.map((item) =>
                  item.slug === slug ? { ...item, quantity } : item,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      // v2: cart lines now snapshot name + USD price
      name: "dipeshkyd-cart-v2",
      partialize: (state: CartState) => ({ items: state.items }),
    },
  ),
)
