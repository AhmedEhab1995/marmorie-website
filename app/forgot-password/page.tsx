"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"
import { createClient } from "@/lib/supabase-client"
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const { locale } = useI18n()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setSent(true)
    } catch (error: any) {
      setError(error.message || "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 lg:px-8">
        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {locale === "ar" ? "العودة لتسجيل الدخول" : "Back to login"}
        </Link>

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
            {locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {locale === "ar"
              ? "لا تقلق، سنرسل لك تعليمات إعادة تعيين كلمة المرور"
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {sent ? (
          <div className="mt-8 rounded-sm border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">
                  {locale === "ar" ? "تم إرسال البريد الإلكتروني!" : "Email sent!"}
                </h3>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300 leading-relaxed">
                  {locale === "ar"
                    ? `لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى ${email}. تحقق من بريدك الإلكتروني وانقر على الرابط للمتابعة.`
                    : `We've sent a password reset link to ${email}. Check your email and click the link to continue.`}
                </p>
                <div className="mt-4">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                    >
                      {locale === "ar" ? "العودة لتسجيل الدخول" : "Back to login"}
                    </Button>
                  </Link>
                </div>
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
                {locale === "ar" ? "البريد الإلكتروني" : "Email address"}
              </Label>
              <Input
                type="email"
                className="mt-1.5 border-border bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={locale === "ar" ? "name@example.com" : "name@example.com"}
                required
                disabled={loading}
                dir="ltr"
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
                  {locale === "ar" ? "جاري الإرسال..." : "Sending..."}
                </>
              ) : (
                <>
                  {locale === "ar" ? "إرسال رابط إعادة التعيين" : "Send reset link"}
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {locale === "ar" ? "تذكرت كلمة المرور؟" : "Remember your password?"}{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
                </Link>
              </p>
            </div>
          </form>
        )}

        <div className="mt-8 rounded-sm border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">
            <strong className="font-medium text-foreground">
              {locale === "ar" ? "ملاحظة:" : "Note:"}
            </strong>{" "}
            {locale === "ar"
              ? "قد يستغرق وصول البريد الإلكتروني بضع دقائق. تأكد من التحقق من مجلد البريد المزعج أيضاً."
              : "The email may take a few minutes to arrive. Make sure to check your spam folder too."}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
