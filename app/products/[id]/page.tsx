"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/lib/i18n"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"
import { getProductById, products } from "@/lib/products"

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { t, locale } = useI18n()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist() // ← Updated
  const [quantity, setQuantity] = useState(1)
  const [engraving, setEngraving] = useState("")

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl text-foreground">
              {locale === "ar" ? "المنتج غير موجود" : "Product not found"}
            </h1>
            <Link href="/products" className="mt-4 inline-block text-sm text-primary hover:underline">
              {t("products.backToShop")}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const wishlisted = isInWishlist(product.id) // ← Updated
  const displayPrice = product.isSale && product.salePrice ? product.salePrice : product.price
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: displayPrice,
        image: product.image,
        engraving: engraving || undefined,
      })
    }
  }

  // ← Updated: Toggle wishlist
  const handleWishlistToggle = async () => {
    if (wishlisted) {
      await removeFromWishlist(product.id)
    } else {
      await addToWishlist(product.id)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("products.backToShop")}
        </Link>

        <div className="mt-6 flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Gallery */}
          <div className="flex-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name[locale]}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {locale === "ar" ? "جديد" : "New"}
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1 lg:max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              {t(`cat.${product.category}`)}
            </p>
            <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              {product.name[locale]}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-medium text-foreground">
                ${displayPrice.toLocaleString()}
              </span>
              {product.isSale && product.salePrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              {product.description[locale]}
            </p>

            {/* Engraving */}
            {product.allowEngraving && (
              <div className="mt-8">
                <label className="text-sm font-medium text-foreground">
                  {t("products.engraving")}
                </label>
                <Input
                  className="mt-2 border-border bg-background"
                  placeholder={t("products.engravingPlaceholder")}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  maxLength={20}
                />
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <label className="text-sm font-medium text-foreground">
                {t("checkout.quantity")}
              </label>
              <div className="mt-2 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-border text-foreground bg-transparent"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-base font-medium text-foreground">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-border text-foreground bg-transparent"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("products.addToCart")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`border-border bg-transparent ${wishlisted ? "text-primary border-primary" : "text-foreground"}`}
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-primary" : ""}`} />
              </Button>
            </div>

            {/* Buy now */}
            <Link href="/checkout" className="mt-3 block">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-foreground text-foreground hover:bg-foreground hover:text-card bg-transparent"
                onClick={handleAddToCart}
              >
                {t("products.buyNow")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-2xl text-foreground">
              {locale === "ar" ? "قد يعجبك أيضاً" : "You may also like"}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky mobile Add to Cart */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">{product.name[locale]}</p>
            <p className="text-base font-semibold text-primary">
              ${displayPrice.toLocaleString()}
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("products.addToCart")}
          </Button>
        </div>
      </div>

      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
    </div>
  )
}
