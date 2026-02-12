"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart, ShoppingBag, Menu, Globe, User, LogOut, Package } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MarmorieLogo } from "@/components/marmorie-logo"

export function Navbar() {
  const { t, locale, setLocale } = useI18n()
  const { user, profile, signOut } = useAuth()
  const { itemCount } = useCart()
  const { items } = useWishlist()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.collections") },
    { href: "/#about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === "ar" ? "right" : "left"} className="w-72 bg-card">
              <SheetTitle className="text-foreground">
                <MarmorieLogo className="text-xl" />
              </SheetTitle>
              <div className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/size-guide"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {t("footer.sizeGuide")}
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {t("footer.faq")}
                </Link>
                {user && (
                  <Link
                    href="/orders"
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {t("orders.title")}
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <MarmorieLogo className="text-xl text-foreground lg:text-2xl" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            aria-label="Toggle language"
            className="text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">
              {locale === "en" ? "Switch to Arabic" : "Switch to English"}
            </span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("profile.title")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {profile?.first_name} {profile?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">{profile?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("profile.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    {t("orders.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("auth.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("auth.signIn")}
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="h-4 w-4" />
              </Button>
            </Link>
          )}

          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("products.wishlist")}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Heart className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/checkout">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("nav.cart")}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
