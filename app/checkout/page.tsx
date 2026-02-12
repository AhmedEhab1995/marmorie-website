"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PromoCodeInput } from "@/components/promo-code-input"
import { useI18n } from "@/lib/i18n"
import { useCart } from "@/lib/cart"

export default function CheckoutPage() {
  const { t, locale } = useI18n()
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("products.backToShop")}
        </Link>

        <h1 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
          {t("checkout.title")}
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-serif text-xl text-muted-foreground">
              {t("checkout.emptyCart")}
            </p>
            <Link href="/products" className="mt-4 inline-block">
              <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                {t("nav.shop")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:gap-20">
            {/* Cart items + Form */}
            <div className="flex-1">
              {/* Items */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.engraving || ""}`} className="flex gap-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name[locale]}
                        fill
                        className="object-cover"
                        sizes="80px"
                        loading="eager"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">
                            {item.name[locale]}
                          </h3>
                          {item.engraving && (
                            <p className="mt-0.5 text-xs text-muted-foreground italic">
                              {t("checkout.engraving")}: {item.engraving}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-10" />

              {/* Delivery form */}
              <h2 className="font-serif text-xl text-foreground">{t("checkout.address")}</h2>
              <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <Label className="text-sm text-foreground">{t("contact.name")}</Label>
                    <Input className="mt-1.5 border-border bg-background" required />
                  </div>
                  <div>
                    <Label className="text-sm text-foreground">{t("contact.phone")}</Label>
                    <Input className="mt-1.5 border-border bg-background" type="tel" required />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("contact.email")}</Label>
                  <Input className="mt-1.5 border-border bg-background" type="email" required />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("checkout.street")}</Label>
                  <Input className="mt-1.5 border-border bg-background" required />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <Label className="text-sm text-foreground">{t("checkout.city")}</Label>
                    <Input className="mt-1.5 border-border bg-background" required />
                  </div>
                  <div>
                    <Label className="text-sm text-foreground">{t("checkout.country")}</Label>
                    <Input className="mt-1.5 border-border bg-background" required />
                  </div>
                </div>
              </form>
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-80">
              <div className="sticky top-24 rounded-sm border border-border bg-card p-6">
                <h2 className="font-serif text-lg text-foreground">{t("checkout.summary")}</h2>
                <Separator className="my-4" />
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.engraving || ""}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.name[locale]} x{item.quantity}
                      </span>
                      <span className="text-foreground">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                
                {/* Promo Code Input */}
                <div className="mb-4">
                  <Label className="mb-2 block text-sm text-foreground">{t("promo.title")}</Label>
                  <PromoCodeInput
                    onApply={applyPromoCode}
                    onRemove={removePromoCode}
                    appliedCode={promoCode}
                  />
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
                  <span className="text-foreground">${subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      {t("checkout.discount")} ({promoCode?.discount}%)
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      -${discount.toLocaleString()}
                    </span>
                  </div>
                )}
                
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("checkout.shipping")}</span>
                  <span className="text-foreground">{t("checkout.free")}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{t("checkout.total")}</span>
                  <span className="font-serif text-xl text-foreground">
                    ${total.toLocaleString()}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t("checkout.placeOrder")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
