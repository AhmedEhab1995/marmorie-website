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

export default function LoginPage() {
  const { t } = useI18n()
  const { signIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error: signInError } = await signIn(form.email, form.password)

    setLoading(false)

    if (signInError) {
      setError(t("auth.invalidCredentials"))
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">
            {t("auth.welcomeBack")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("auth.signInToContinue")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <Label className="text-sm text-foreground">{t("contact.email")}</Label>
            <Input
              type="email"
              className="mt-1.5 border-border bg-background"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
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
                {t("auth.signingIn")}
              </>
            ) : (
              t("auth.signIn")
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.dontHaveAccount")}{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                {t("auth.createAccount")}
              </Link>
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
