import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Marmorie | Jewelry That Tells Your Story",
  description:
    "Discover timeless, handcrafted jewelry designed to capture your most precious moments. Necklaces, rings, bracelets, earrings & more.",
  keywords: ["jewelry", "luxury", "gold", "necklaces", "rings", "bracelets", "earrings", "gifts"],
}

export const viewport: Viewport = {
  themeColor: "#F6E7EB",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
