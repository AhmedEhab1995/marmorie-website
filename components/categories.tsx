// components/categories.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useFadeIn } from "@/hooks/use-fade-in"

const categories = [
  { key: "necklaces", image: "/images/cat-necklaces.jpg" },
  { key: "bracelets", image: "/images/cat-bracelets.jpg" },
  { key: "rings", image: "/images/cat-rings.jpg" },
  { key: "earrings", image: "/images/cat-earrings.jpg" },
  { key: "charms", image: "/images/cat-charms.jpg" },
]

export function Categories() {
  const { t } = useI18n()
  const header = useFadeIn()
  const grid = useFadeIn(200)

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div
        ref={header.ref}
        className={`text-center transition-all duration-1000 ${
          header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          {t("cat.title")}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl text-balance">
          {t("cat.title")}
        </h2>
      </div>

      <div
        ref={grid.ref}
        className={`mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 transition-all duration-1000 ${
          grid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={`/products?category=${cat.key}`}
            className="group relative overflow-hidden rounded-sm"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={cat.image || "/placeholder.svg"}
                alt={t(`cat.${cat.key}`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                loading="eager"
              />
              <div className="absolute inset-0 bg-foreground/10 transition-colors duration-300 group-hover:bg-foreground/20" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="inline-block bg-card/90 px-4 py-2 text-sm font-medium tracking-wide text-foreground backdrop-blur-sm">
                {t(`cat.${cat.key}`)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional category tags */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["valentines", "engraving", "labDiamonds", "gifts", "sale"].map((key) => (
          <Link
            key={key}
            href={`/products?category=${key}`}
            className="rounded-full border border-border bg-card px-5 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t(`cat.${key}`)}
          </Link>
        ))}
      </div>
    </section>
  )
}