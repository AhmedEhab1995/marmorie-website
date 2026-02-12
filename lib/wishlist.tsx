"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase-client"
import { useAuth } from "@/lib/auth-context"

type WishlistContextType = {
  items: string[] // Array of product IDs
  addItem: (productId: string) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  isInWishlist: (productId: string) => boolean
  loading: boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  // Load wishlist from database when user logs in
  useEffect(() => {
    if (user) {
      loadWishlist()
    } else {
      // Clear wishlist when logged out
      setItems([])
      setLoading(false)
    }
  }, [user])

  const loadWishlist = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id)

      if (error) throw error

      setItems(data?.map((item) => item.product_id) || [])
    } catch (error) {
      console.error("Error loading wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (productId: string) => {
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      return
    }

    // Optimistically update UI
    setItems((prev) => [...prev, productId])

    try {
      const { error } = await supabase
        .from("wishlist")
        .insert({
          user_id: user.id,
          product_id: productId,
        })

      if (error) throw error
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      // Revert on error
      setItems((prev) => prev.filter((id) => id !== productId))
      alert("Failed to add to wishlist")
    }
  }

  const removeItem = async (productId: string) => {
    if (!user) return

    // Optimistically update UI
    setItems((prev) => prev.filter((id) => id !== productId))

    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId)

      if (error) throw error
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      // Revert on error
      setItems((prev) => [...prev, productId])
      alert("Failed to remove from wishlist")
    }
  }

  const isInWishlist = (productId: string) => {
    return items.includes(productId)
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within WishlistProvider")
  return context
}
