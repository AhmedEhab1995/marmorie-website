// components/hero.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"

export function Hero() {
  const { t } = useI18n()
  const text = useFadeIn(0)
  const image = useFadeIn(200)

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-center">
        {/* Text content */}
        <div
          ref={text.ref}
          className={`flex flex-1 flex-col justify-center px-6 py-20 lg:px-16 lg:py-32 transition-all duration-1000 ${
            text.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Marmorie
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            {t("hero.headline")}
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            {t("hero.subheadline")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#featured">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              >
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#categories">
              <Button
                variant="outline"
                size="lg"
                className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 bg-transparent"
              >
                {t("hero.secondary")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div
          ref={image.ref}
          className={`relative flex-1 transition-all duration-1000 ${
            image.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px]">
            <Image
              src="/images/collection.jpg"
              alt="Marmorie luxury jewelry collection"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}