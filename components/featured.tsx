// components/featured.tsx
"use client"

import { useI18n } from "@/lib/i18n"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"

export function Featured() {
  const { t } = useI18n()
  const section = useFadeIn()

  return (
    <section id="featured" className="bg-card">
      <div
        ref={section.ref}
        className={`mx-auto max-w-7xl px-4 py-20 lg:px-8 transition-all duration-1000 ${
          section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              {t("nav.newFeatured")}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              {t("products.featured")}
            </h2>
          </div>
          <Link href="/products" className="hidden md:block">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              {t("nav.shop")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products">
            <Button variant="outline" className="border-border text-foreground bg-transparent">
              {t("nav.shop")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}