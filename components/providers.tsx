"use client"

import { I18nProvider } from "@/lib/i18n"
import { CartProvider } from "@/lib/cart"
import { WishlistProvider } from "@/lib/wishlist"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </I18nProvider>
  )
}
