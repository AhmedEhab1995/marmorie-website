"use client"

import { useState } from "react"
import { Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/lib/i18n"
import { validatePromoCode, type PromoCode } from "@/lib/promo-codes"

type PromoCodeInputProps = {
  onApply: (promoCode: PromoCode) => void
  onRemove: () => void
  appliedCode: PromoCode | null
  disabled?: boolean
}

export function PromoCodeInput({
  onApply,
  onRemove,
  appliedCode,
  disabled = false,
}: PromoCodeInputProps) {
  const { t, locale } = useI18n()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleApply = () => {
    const validCode = validatePromoCode(code)
    if (validCode) {
      onApply(validCode)
      setCode("")
      setError("")
    } else {
      setError(t("promo.invalid"))
    }
  }

  const handleRemove = () => {
    onRemove()
    setCode("")
    setError("")
  }

  if (appliedCode) {
    return (
      <div className="rounded-sm border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                {appliedCode.code}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                {appliedCode.description[locale]}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-7 px-2 text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={t("promo.placeholder")}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase())
            setError("")
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleApply()
            }
          }}
          className="flex-1 border-border bg-background uppercase"
          disabled={disabled}
        />
        <Button
          onClick={handleApply}
          disabled={!code.trim() || disabled}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t("promo.apply")}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
