"use client"

import { I18nProvider } from "@/lib/i18n"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart"
import { WishlistProvider } from "@/lib/wishlist"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </I18nProvider>
  )
}
