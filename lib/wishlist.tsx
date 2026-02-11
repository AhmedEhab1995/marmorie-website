"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type WishlistContextType = {
  items: string[]
  toggle: (id: string) => void
  isWishlisted: (id: string) => boolean
  count: number
  clear: () => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])

  const toggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }, [])

  const isWishlisted = useCallback(
    (id: string) => items.includes(id),
    [items]
  )

  const clear = useCallback(() => setItems([]), [])

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length, clear }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within WishlistProvider")
  return context
}
