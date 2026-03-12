"use client"

import { MapPin } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function DeliveryNotice() {
  const { locale } = useI18n()

  return (
    <div className="flex items-start gap-3 rounded-sm border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4">
      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
      <div>
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {locale === "ar" ? "🇪🇬 التوصيل داخل مصر فقط" : "🇪🇬 Egypt Delivery Only"}
        </p>
        <p className="mt-1 text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          {locale === "ar"
            ? "نقوم حالياً بالتوصيل داخل جمهورية مصر العربية فقط. نقبل فقط أرقام الهاتف المصرية للتواصل."
            : "We currently deliver within Egypt only. Only Egyptian phone numbers are accepted for contact."}
        </p>
      </div>
    </div>
  )
}