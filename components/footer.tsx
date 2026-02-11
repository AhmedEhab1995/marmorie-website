"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MarmorieLogo } from "@/components/marmorie-logo"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.14a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.57z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h3 className="font-serif text-2xl text-foreground">{t("footer.newsletter")}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t("footer.newsletterDesc")}
          </p>
          <form className="mt-6 flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              className="flex-1 border-border bg-background"
              required
            />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {t("footer.subscribe")}
            </Button>
          </form>
        </div>
      </div>

      {/* Links & Social */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            {/* Brand + Links */}
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-8">
              <Link href="/">
                <MarmorieLogo className="text-lg text-foreground" />
              </Link>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-foreground">
                  {t("nav.home")}
                </Link>
                <Link href="/#about" className="transition-colors hover:text-foreground">
                  {t("nav.about")}
                </Link>
                <Link href="/contact" className="transition-colors hover:text-foreground">
                  {t("nav.contact")}
                </Link>
                <Link href="/size-guide" className="transition-colors hover:text-foreground">
                  {t("footer.sizeGuide")}
                </Link>
                <Link href="/faq" className="transition-colors hover:text-foreground">
                  {t("footer.faq")}
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                {t("footer.followUs")}
              </span>
              <a
                href="https://www.instagram.com/marmorie_jewelry?igsh=MXAzMmQyNzV6djVhaw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@marmorie93?_r=1&_t=ZS-93pgZFA1fOf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Marmorie. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
