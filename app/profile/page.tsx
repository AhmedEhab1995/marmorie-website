"use client"

import React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"

export default function ProfilePage() {
  const { t, locale } = useI18n()
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  })

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        {/* Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {locale === "ar" ? "حسابي" : "My Account"}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            {t("profile.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("profile.subtitle")}
          </p>
        </div>

        {/* Demo notice */}
        <div className="mt-8 flex items-start gap-3 rounded-sm border border-border bg-secondary/50 p-4">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("profile.demoNotice")}
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-10 space-y-10">
          {/* Personal Information */}
          <section>
            <h2 className="font-serif text-xl text-foreground">
              {t("profile.personal")}
            </h2>
            <Separator className="my-4" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label className="text-sm text-foreground">{t("profile.firstName")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder={locale === "ar" ? "سارة" : "Sarah"}
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("profile.lastName")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder={locale === "ar" ? "أحمد" : "Ahmed"}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground">{t("contact.email")}</Label>
                <Input
                  className="mt-1.5 border-border bg-background"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Label className="text-sm text-foreground">{t("contact.phone")}</Label>
                <Input
                  className="mt-1.5 border-border bg-background"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+20 100 123 4567"
                />
              </div>
            </div>
          </section>

          {/* Address Information */}
          <section>
            <h2 className="font-serif text-xl text-foreground">
              {t("profile.addressInfo")}
            </h2>
            <Separator className="my-4" />
            <div className="space-y-5">
              <div>
                <Label className="text-sm text-foreground">{t("profile.addressLine")}</Label>
                <Input
                  className="mt-1.5 border-border bg-background"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder={locale === "ar" ? "123 شارع النيل" : "123 Main Street"}
                />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <Label className="text-sm text-foreground">{t("checkout.city")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder={locale === "ar" ? "القاهرة" : "Cairo"}
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("profile.postalCode")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    placeholder="11511"
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("checkout.country")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder={locale === "ar" ? "مصر" : "Egypt"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section>
            <h2 className="font-serif text-xl text-foreground">
              {t("profile.paymentInfo")}
            </h2>
            <Separator className="my-4" />
            <div className="mb-4 flex items-start gap-3 rounded-sm border border-border bg-secondary/50 p-3">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {locale === "ar"
                  ? "هذه الحقول للعرض التوضيحي فقط. لا يتم معالجة أي مدفوعات حقيقية."
                  : "These fields are for demonstration only. No real payments are processed."}
              </p>
            </div>
            <div className="space-y-5">
              <div>
                <Label className="text-sm text-foreground">{t("profile.cardHolder")}</Label>
                <Input
                  className="mt-1.5 border-border bg-background"
                  value={form.cardHolder}
                  onChange={(e) => update("cardHolder", e.target.value)}
                  placeholder={locale === "ar" ? "الاسم على البطاقة" : "Name on card"}
                />
              </div>
              <div>
                <Label className="text-sm text-foreground">{t("profile.cardNumber")}</Label>
                <Input
                  className="mt-1.5 border-border bg-background"
                  value={form.cardNumber}
                  onChange={(e) => update("cardNumber", e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label className="text-sm text-foreground">{t("profile.expiry")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.expiry}
                    onChange={(e) => update("expiry", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("profile.cvv")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.cvv}
                    onChange={(e) => update("cvv", e.target.value)}
                    placeholder="000"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Save */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
            >
              {t("profile.save")}
            </Button>
            {saved && (
              <span className="text-sm font-medium text-primary animate-fade-in">
                {t("profile.saved")}
              </span>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
