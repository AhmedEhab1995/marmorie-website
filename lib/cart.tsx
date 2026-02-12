"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { calculateDiscount, type PromoCode } from "@/lib/promo-codes"

export type CartItem = {
  id: string
  name: { en: string; ar: string }
  price: number
  image: string
  quantity: number
  engraving?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  subtotal: number
  discount: number
  total: number
  itemCount: number
  clearCart: () => void
  promoCode: PromoCode | null
  applyPromoCode: (code: PromoCode) => void
  removePromoCode: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null)

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.engraving === item.engraving)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.engraving === item.engraving
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id))
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPromoCode(null)
  }, [])

  const applyPromoCode = useCallback((code: PromoCode) => {
    setPromoCode(code)
  }, [])

  const removePromoCode = useCallback(() => {
    setPromoCode(null)
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoCode ? calculateDiscount(subtotal, promoCode.discount) : 0
  const total = subtotal - discount
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        subtotal,
        discount,
        total,
        itemCount,
        clearCart,
        promoCode,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
