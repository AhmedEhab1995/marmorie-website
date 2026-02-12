"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useState } from "react"

export function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useI18n()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [imageError, setImageError] = useState(false)

  const wishlisted = isInWishlist(product.id)
  const displayPrice = product.isSale && product.salePrice ? product.salePrice : product.price

  const handleWishlistToggle = async () => {
  if (wishlisted) {
    await removeFromWishlist(product.id)
  } else {
    await addToWishlist(product.id)
  }
}

  // Better fallback handling
  const imageSrc = imageError ? "/images/placeholder.jpg" : (product.image || "/images/placeholder.jpg")

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary">
          <Image
            src={imageSrc}
            alt={product.name[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="eager"
            onError={() => setImageError(true)}
            unoptimized={imageSrc.includes('placeholder')} // Don't optimize placeholder
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              {locale === "ar" ? "جديد" : "New"}
            </span>
          )}
          {product.isSale && (
            <span className="absolute top-3 left-3 bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-card">
              {locale === "ar" ? "تخفيض" : "Sale"}
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        aria-label={t("products.wishlist")}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${wishlisted ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      </button>

      <div className="mt-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-base text-foreground transition-colors group-hover:text-primary">
            {product.name[locale]}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            ${displayPrice.toLocaleString()}
          </span>
          {product.isSale && product.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 h-auto px-0 text-xs font-medium tracking-wide text-primary hover:text-primary/80 hover:bg-transparent"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: displayPrice,
              image: product.image,
            })
          }
        >
          {t("products.addToCart")}
        </Button>
      </div>
    </div>
  )
}