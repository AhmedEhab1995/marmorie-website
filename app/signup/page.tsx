"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {
  const { t } = useI18n()
  const { signUp } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError(t("auth.fillAllFields"))
      return
    }

    if (form.password !== form.confirmPassword) {
      setError(t("auth.passwordMismatch"))
      return
    }

    if (form.password.length < 6) {
      setError(t("auth.passwordTooShort"))
      return
    }

    setLoading(true)

    const { error: signUpError } = await signUp(
      form.email,
      form.password,
      form.firstName,
      form.lastName
    )

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
    } else {
      // Successfully created account, redirect to home
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">
            {t("auth.createAccount")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("auth.joinMarmorie")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-foreground">{t("profile.firstName")}</Label>
              <Input
                className="mt-1.5 border-border bg-background"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label className="text-sm text-foreground">{t("profile.lastName")}</Label>
              <Input
                className="mt-1.5 border-border bg-background"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-foreground">{t("contact.email")}</Label>
            <Input
              type="email"
              className="mt-1.5 border-border bg-background"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label className="text-sm text-foreground">{t("auth.password")}</Label>
            <Input
              type="password"
              className="mt-1.5 border-border bg-background"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label className="text-sm text-foreground">{t("auth.confirmPassword")}</Label>
            <Input
              type="password"
              className="mt-1.5 border-border bg-background"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
                {t("auth.creatingAccount")}
              </>
            ) : (
              t("auth.createAccount")
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                {t("auth.signIn")}
              </Link>
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
