"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useI18n } from "@/lib/i18n"
import { useWishlist } from "@/lib/wishlist"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"

export default function WishlistPage() {
  const { t, locale } = useI18n()
  const { items } = useWishlist()

  const wishlistedProducts = products.filter((p) => items.includes(p.id))

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {locale === "ar" ? "المفضلة" : "My Favorites"}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            {t("wishlist.title")}
          </h1>
          {wishlistedProducts.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {wishlistedProducts.length}{" "}
              {wishlistedProducts.length === 1 ? t("products.piece") : t("products.pieces")}
            </p>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-6 font-serif text-xl text-foreground">
              {t("wishlist.empty")}
            </h2>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground leading-relaxed">
              {t("wishlist.emptyDesc")}
            </p>
            <Link href="/products" className="mt-8">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                {t("wishlist.browseCollection")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
