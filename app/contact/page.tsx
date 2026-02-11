"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"

export default function ContactPage() {
  const { t, locale } = useI18n()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {t("nav.contact")}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl text-balance">
            {t("contact.title")}
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* Contact form */}
          <div className="flex-1">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label className="text-sm text-foreground">{t("contact.name")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-card"
                    placeholder={locale === "ar" ? "الاسم الكامل" : "Your full name"}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("contact.phone")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-card"
                    type="tel"
                    placeholder={locale === "ar" ? "رقم هاتفك" : "Your phone number"}
                    required
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground">{t("contact.email")}</Label>
                <Input
                  className="mt-1.5 border-border bg-card"
                  type="email"
                  placeholder={locale === "ar" ? "بريدك الإلكتروني" : "your@email.com"}
                  required
                />
              </div>
              <div>
                <Label className="text-sm text-foreground">{t("contact.message")}</Label>
                <Textarea
                  className="mt-1.5 min-h-[140px] resize-none border-border bg-card"
                  placeholder={
                    locale === "ar"
                      ? "كيف يمكننا مساعدتك؟"
                      : "How can we help you?"
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto md:px-12"
              >
                {t("contact.send")}
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="w-full lg:w-72">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {t("contact.email")}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">hello@marmorie.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {t("contact.phone")}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">+20 100 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {locale === "ar" ? "الموقع" : "Location"}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {locale === "ar"
                      ? "القاهرة، مصر"
                      : "Cairo, Egypt"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
