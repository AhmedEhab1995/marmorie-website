// components/collection-banner.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"

export function CollectionBanner() {
  const { t } = useI18n()
  const content = useFadeIn()

  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <Image
          src="/images/collection.jpg"
          alt="Marmorie collection"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          loading="eager"
        />
      </div>
      <div
        ref={content.ref}
        className={`relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center lg:py-32 transition-all duration-1000 ${
          content.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          {t("cat.valentines")}
        </p>
        <h2 className="mt-4 font-serif text-3xl text-card md:text-5xl text-balance">
          {t("hero.headline")}
        </h2>
        <p className="mt-4 max-w-lg text-sm text-card/70 leading-relaxed">
          {t("hero.subheadline")}
        </p>
        <Link href="/products" className="mt-8">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            {t("hero.cta")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}