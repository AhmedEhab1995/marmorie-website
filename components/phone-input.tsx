"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateEgyptianPhone, formatPhoneInput } from "@/lib/phone-validation"
import { useI18n } from "@/lib/i18n"

type PhoneInputProps = {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  disabled?: boolean
  showError?: boolean
  className?: string
}

export function PhoneInput({
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  showError = true,
  className = "",
}: PhoneInputProps) {
  const { locale } = useI18n()
  const [error, setError] = useState<string>("")
  const [touched, setTouched] = useState(false)

  // Validate on blur or when value changes and touched
  useEffect(() => {
    if (touched && value) {
      const validation = validateEgyptianPhone(value)
      if (!validation.isValid) {
        setError(validation.error || "Invalid phone number")
      } else {
        setError("")
      }
    } else if (touched && !value && required) {
      setError("Phone number is required")
    } else if (!touched || !value) {
      setError("")
    }
  }, [value, touched, required])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value)
    onChange(formatted)
  }

  const handleBlur = () => {
    setTouched(true)
  }

  const labelText = label || (locale === "ar" ? "رقم الهاتف" : "Phone Number")

  // Translate error messages to Arabic
  const getTranslatedError = (error: string): string => {
    if (locale !== "ar") return error

    const translations: Record<string, string> = {
      "Phone number is required": "رقم الهاتف مطلوب",
      "Phone number is too short": "رقم الهاتف قصير جداً",
      "Phone number is too long": "رقم الهاتف طويل جداً",
      "Mobile numbers must start with 10, 11, 12, or 15": "أرقام الموبايل يجب أن تبدأ بـ 10 أو 11 أو 12 أو 15",
      "Mobile numbers must start with 010, 011, 012, or 015": "أرقام الموبايل يجب أن تبدأ بـ 010 أو 011 أو 012 أو 015",
      "Mobile numbers must start with 201 followed by 0, 1, 2, or 5": "أرقام الموبايل يجب أن تبدأ بـ 201 متبوعة بـ 0 أو 1 أو 2 أو 5",
      "Mobile numbers must start with +201 followed by 0, 1, 2, or 5": "أرقام الموبايل يجب أن تبدأ بـ +201 متبوعة بـ 0 أو 1 أو 2 أو 5",
      "Invalid Egyptian phone number format. Only Egyptian numbers are accepted.": "صيغة رقم هاتف مصري غير صحيحة. نقبل فقط الأرقام المصرية.",
      "Invalid phone number": "رقم هاتف غير صحيح",
    }

    return translations[error] || error
  }

  return (
    <div className={className}>
      {label !== null && (
        <Label className="text-sm text-foreground">
          {labelText}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}
      <Input
        type="tel"
        className={`mt-1.5 border-border bg-background ${error && showError ? "border-destructive" : ""}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={locale === "ar" ? "01XX XXX XXXX" : "01XX XXX XXXX"}
        required={required}
        disabled={disabled}
        dir="ltr"
      />
      {error && showError && touched && (
        <p className="mt-1 text-xs text-destructive">
          {getTranslatedError(error)}
        </p>
      )}
      {!error && value && touched && (
        <p className="mt-1 text-xs text-green-600 dark:text-green-400">
          ✓ {locale === "ar" ? "رقم صحيح" : "Valid number"}
        </p>
      )}
      <p className="mt-1 text-xs text-muted-foreground">
        {locale === "ar" 
          ? "مثال: 01012345678 أو 1012345678 أو +201012345678" 
          : "Example: 01012345678 or 1012345678 or +201012345678"}
      </p>
    </div>
  )
}
