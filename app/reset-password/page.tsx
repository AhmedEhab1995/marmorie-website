"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"
import { createClient } from "@/lib/supabase-client"
import { Loader2, Lock, CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
  const { locale } = useI18n()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError(locale === "ar" ? "كلمات المرور غير متطابقة" : "Passwords don't match")
      return
    }

    if (form.password.length < 6) {
      setError(locale === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        password: form.password,
      })

      if (error) throw error

      setSuccess(true)
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
            {locale === "ar" ? "إعادة تعيين كلمة المرور" : "Reset password"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {locale === "ar"
              ? "أدخل كلمة مرور جديدة لحسابك"
              : "Enter a new password for your account"}
          </p>
        </div>

        {success ? (
          <div className="mt-8 rounded-sm border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">
                  {locale === "ar" ? "تم التحديث بنجاح!" : "Password updated!"}
                </h3>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                  {locale === "ar"
                    ? "تم إعادة تعيين كلمة المرور بنجاح. سيتم توجيهك إلى صفحة تسجيل الدخول..."
                    : "Your password has been reset successfully. Redirecting to login..."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <Label className="text-sm text-foreground">
                {locale === "ar" ? "كلمة المرور الجديدة" : "New password"}
              </Label>
              <Input
                type="password"
                className="mt-1.5 border-border bg-background"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={locale === "ar" ? "6 أحرف على الأقل" : "At least 6 characters"}
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label className="text-sm text-foreground">
                {locale === "ar" ? "تأكيد كلمة المرور" : "Confirm password"}
              </Label>
              <Input
                type="password"
                className="mt-1.5 border-border bg-background"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder={locale === "ar" ? "أعد كتابة كلمة المرور" : "Re-enter password"}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {locale === "ar" ? "جاري التحديث..." : "Updating..."}
                </>
              ) : (
                <>
                  {locale === "ar" ? "إعادة تعيين كلمة المرور" : "Reset password"}
                </>
              )}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}
