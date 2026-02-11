// components/about-section.tsx
"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { useFadeIn } from "@/hooks/use-fade-in"

export function AboutSection() {
  const { t } = useI18n()
  const imageAnim = useFadeIn()
  const textAnim = useFadeIn(200)

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* Image */}
        <div
          ref={imageAnim.ref}
          className={`relative w-full flex-1 transition-all duration-1000 ${
            imageAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/about.jpg"
              alt="Marmorie artisan craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        </div>

        {/* Text */}
        <div
          ref={textAnim.ref}
          className={`flex-1 transition-all duration-1000 ${
            textAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {t("about.subtitle")}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl text-balance">
            {t("about.title")}
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            {t("about.p1")}
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            {t("about.p2")}
          </p>
          <div className="mt-10 grid grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-3xl text-primary">500+</p>
              <p className="mt-1 text-xs text-muted-foreground tracking-wide">
                {t("about.collections")}
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">10K+</p>
              <p className="mt-1 text-xs text-muted-foreground tracking-wide">
                {t("about.customers")}
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">15+</p>
              <p className="mt-1 text-xs text-muted-foreground tracking-wide">
                {t("about.years")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}