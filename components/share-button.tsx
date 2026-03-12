"use client"

import { useState } from "react"
import { Share2, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

interface ShareButtonProps {
  productName: string
  productDescription: string
}

export function ShareButton({ productName, productDescription }: ShareButtonProps) {
  const { locale } = useI18n()
  const [state, setState] = useState<"idle" | "copied" | "shared">("idle")

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""

    // Use native share sheet on supported devices (most mobile browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription,
          url,
        })
        setState("shared")
        setTimeout(() => setState("idle"), 2500)
      } catch (err) {
        // User cancelled share — do nothing
        if ((err as DOMException).name !== "AbortError") {
          console.error("Share failed:", err)
        }
      }
      return
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(url)
      setState("copied")
      setTimeout(() => setState("idle"), 2500)
    } catch {
      // Final fallback for very old browsers
      const el = document.createElement("input")
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setState("copied")
      setTimeout(() => setState("idle"), 2500)
    }
  }

  const label = {
    idle: locale === "ar" ? "مشاركة" : "Share",
    copied: locale === "ar" ? "تم النسخ!" : "Copied!",
    shared: locale === "ar" ? "تمت المشاركة!" : "Shared!",
  }[state]

  const Icon = state === "idle" ? Share2 : state === "copied" ? Copy : Check

  return (
    <Button
      variant="outline"
      size="lg"
      className={`border-border bg-transparent text-foreground transition-all duration-200 ${
        state !== "idle" ? "border-primary text-primary" : ""
      }`}
      onClick={handleShare}
      aria-label={label}
    >
      <Icon className={`h-4 w-4 ${state !== "idle" ? "text-primary" : ""}`} />
      <span className="ml-2 text-sm">{label}</span>
    </Button>
  )
}