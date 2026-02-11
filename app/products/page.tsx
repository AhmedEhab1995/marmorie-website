"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useI18n } from "@/lib/i18n"
import { products } from "@/lib/products"

function ProductGrid() {
  const searchParams = useSearchParams()
  const { t, locale } = useI18n()
  const category = searchParams.get("category")

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {t("nav.collections")}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            {category ? t(`cat.${category}`) : t("products.featured")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? t("products.piece") : t("products.pieces")}
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          <a
            href="/products"
            className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
              !category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {t("products.all")}
          </a>
          {["necklaces", "bracelets", "rings", "earrings", "charms"].map((cat) => (
            <a
              key={cat}
              href={`/products?category=${cat}`}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {t(`cat.${cat}`)}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-muted-foreground">
              {locale === "ar"
                ? "لا توجد قطع في هذه الفئة."
                : "No pieces found in this category."}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductGrid />
    </Suspense>
  )
}
