"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { Featured } from "@/components/featured"
import { CollectionBanner } from "@/components/collection-banner"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"

export default function HomePage() {
  const { profile } = useAuth()
  const { locale } = useI18n()

  return (
    <div className="min-h-screen">
      <Navbar />
      {profile && (
        <div className="bg-secondary/50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
            <p className="text-sm text-foreground">
              {locale === "ar" ? (
                <>مرحباً، {profile.first_name || "عزيزتنا"}! 👋</>
              ) : (
                <>Welcome back, {profile.first_name || "there"}! 👋</>
              )}
            </p>
          </div>
        </div>
      )}
      <main>
        <Hero />
        <Categories />
        <Featured />
        <CollectionBanner />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
