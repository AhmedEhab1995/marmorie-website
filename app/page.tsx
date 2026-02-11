"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { Featured } from "@/components/featured"
import { CollectionBanner } from "@/components/collection-banner"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
