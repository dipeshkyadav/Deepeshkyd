"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "./types"

type CartState = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (slug: string) => void
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
      add: (slug: string) =>
        set((state) => {
          const existing = state.items.find((item) => item.slug === slug)
          return {
            isOpen: true,
            items: existing
              ? state.items.map((item) =>
                  item.slug === slug
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...state.items, { slug, quantity: 1 }],
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
      name: "dipeshkyd-cart",
      partialize: (state: CartState) => ({ items: state.items }),
    },
  ),
)
