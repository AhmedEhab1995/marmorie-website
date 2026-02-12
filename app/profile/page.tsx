"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Info, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase-client"

export default function ProfilePage() {
  const { t, locale } = useI18n()
  const { user, profile, updateProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState<any[]>([])

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
      })
      loadAddress()
    }
  }, [profile])

  const loadAddress = async () => {
    if (!user) return

    const supabase = createClient()
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_default", true)
      .single()

    if (data) {
      setForm((prev) => ({
        ...prev,
        address: data.address_line,
        city: data.city,
        country: data.country,
        postalCode: data.postal_code || "",
      }))
    }
  }

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    const supabase = createClient()

    try {
      // Update user profile
      const { error: profileError } = await updateProfile({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
      })

      if (profileError) throw profileError

      // Save or update address if provided
      if (form.address && form.city && form.country) {
        // Check if address exists
        const { data: existingAddress } = await supabase
          .from("addresses")
          .select("id")
          .eq("user_id", user.id)
          .eq("is_default", true)
          .single()

        if (existingAddress) {
          // Update existing address
          await supabase
            .from("addresses")
            .update({
              address_line: form.address,
              city: form.city,
              country: form.country,
              postal_code: form.postalCode,
            })
            .eq("id", existingAddress.id)
        } else {
          // Create new address
          await supabase
            .from("addresses")
            .insert({
              user_id: user.id,
              address_line: form.address,
              city: form.city,
              country: form.country,
              postal_code: form.postalCode,
              is_default: true,
            })
        }
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Failed to save profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

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

        {/* Info notice */}
        <div className="mt-8 flex items-start gap-3 rounded-sm border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <p className="text-xs text-blue-900 dark:text-blue-100 leading-relaxed">
            {locale === "ar"
              ? "معلوماتك محفوظة بشكل آمن ويمكنك تحديثها في أي وقت."
              : "Your information is securely saved and you can update it anytime."}
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
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground">{t("profile.lastName")}</Label>
                  <Input
                    className="mt-1.5 border-border bg-background"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder={locale === "ar" ? "أحمد" : "Ahmed"}
                    required
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground">{t("contact.email")}</Label>
                <Input
                  className="mt-1.5 border-border bg-muted"
                  type="email"
                  value={form.email}
                  disabled
                  placeholder="name@example.com"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {locale === "ar" ? "لا يمكن تغيير البريد الإلكتروني" : "Email cannot be changed"}
                </p>
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

          {/* Address Information (Optional) */}
          <section>
            <h2 className="font-serif text-xl text-foreground">
              {t("profile.addressInfo")}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({locale === "ar" ? "اختياري" : "Optional"})
              </span>
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

          {/* Save */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {locale === "ar" ? "جاري الحفظ..." : "Saving..."}
                </>
              ) : (
                t("profile.save")
              )}
            </Button>
            {saved && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400 animate-fade-in">
                ✓ {t("profile.saved")}
              </span>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
