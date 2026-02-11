"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n"

const ringData = [
  { us: "4", diameter: "14.9", circumference: "46.8" },
  { us: "5", diameter: "15.7", circumference: "49.3" },
  { us: "6", diameter: "16.5", circumference: "51.9" },
  { us: "7", diameter: "17.3", circumference: "54.4" },
  { us: "8", diameter: "18.1", circumference: "57.0" },
  { us: "9", diameter: "19.0", circumference: "59.5" },
  { us: "10", diameter: "19.8", circumference: "62.1" },
]

const braceletData = [
  { size: { en: "Small", ar: "صغير" }, length: "15 cm / 5.9 in", fit: { en: "Snug fit", ar: "مقاس ضيق" } },
  { size: { en: "Medium", ar: "متوسط" }, length: "17 cm / 6.7 in", fit: { en: "Standard fit", ar: "مقاس عادي" } },
  { size: { en: "Large", ar: "كبير" }, length: "19 cm / 7.5 in", fit: { en: "Loose fit", ar: "مقاس واسع" } },
  { size: { en: "X-Large", ar: "كبير جداً" }, length: "21 cm / 8.3 in", fit: { en: "Very loose", ar: "واسع جداً" } },
]

const necklaceData = [
  { length: "35 cm / 14 in", style: { en: "Choker", ar: "شوكر" }, position: { en: "Close to neck", ar: "قريب من العنق" } },
  { length: "40 cm / 16 in", style: { en: "Princess", ar: "برنسيس" }, position: { en: "At the collarbone", ar: "عند عظم الترقوة" } },
  { length: "45 cm / 18 in", style: { en: "Standard", ar: "قياسي" }, position: { en: "Below collarbone", ar: "أسفل عظم الترقوة" } },
  { length: "50 cm / 20 in", style: { en: "Matinee", ar: "ماتيني" }, position: { en: "Above the bust", ar: "فوق الصدر" } },
  { length: "60 cm / 24 in", style: { en: "Opera", ar: "أوبرا" }, position: { en: "At the bust", ar: "عند الصدر" } },
  { length: "80 cm / 32 in", style: { en: "Rope", ar: "حبل" }, position: { en: "Below the bust", ar: "أسفل الصدر" } },
]

export default function SizeGuidePage() {
  const { t, locale } = useI18n()

  const thClass = "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
  const tdClass = "px-4 py-3 text-sm text-foreground"
  const rtlTh = locale === "ar" ? "text-right" : "text-left"

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {t("footer.customerCare")}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl text-balance">
            {t("sizeGuide.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground leading-relaxed">
            {t("sizeGuide.subtitle")}
          </p>
        </div>

        {/* Ring Size Chart */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-foreground">{t("sizeGuide.rings")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t("sizeGuide.ringsDesc")}
          </p>
          <div className="mt-6 overflow-x-auto rounded-sm border border-border">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.usSize")}</th>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.diameter")}</th>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.circumference")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ringData.map((row) => (
                  <tr key={row.us} className="transition-colors hover:bg-secondary/50">
                    <td className={tdClass}>{row.us}</td>
                    <td className={tdClass}>{row.diameter}</td>
                    <td className={tdClass}>{row.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bracelet Length Guide */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-foreground">{t("sizeGuide.bracelets")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t("sizeGuide.braceletsDesc")}
          </p>
          <div className="mt-6 overflow-x-auto rounded-sm border border-border">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.size")}</th>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.length")}</th>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.fit")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {braceletData.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-secondary/50">
                    <td className={tdClass}>{row.size[locale]}</td>
                    <td className={tdClass}>{row.length}</td>
                    <td className={tdClass}>{row.fit[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Necklace Length Guide */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-foreground">{t("sizeGuide.necklaces")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t("sizeGuide.necklacesDesc")}
          </p>
          <div className="mt-6 overflow-x-auto rounded-sm border border-border">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.length")}</th>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.style")}</th>
                  <th className={`${thClass} ${rtlTh}`}>{t("sizeGuide.position")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {necklaceData.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-secondary/50">
                    <td className={tdClass}>{row.length}</td>
                    <td className={tdClass}>{row.style[locale]}</td>
                    <td className={tdClass}>{row.position[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Necklace visual explanation */}
          <div className="mt-8 rounded-sm border border-border bg-secondary/50 p-6">
            <h3 className="font-serif text-lg text-foreground">
              {locale === "ar" ? "كيف تختارين الطول المناسب" : "How to Choose the Right Length"}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-sm bg-card p-4">
                <p className="text-sm font-medium text-primary">
                  {locale === "ar" ? "للياقة المغلقة" : "For Crew Necklines"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {locale === "ar"
                    ? "اختاري 45-50 سم لتعلق القلادة أسفل خط العنق"
                    : "Choose 45-50 cm so the pendant falls below the neckline"}
                </p>
              </div>
              <div className="rounded-sm bg-card p-4">
                <p className="text-sm font-medium text-primary">
                  {locale === "ar" ? "للياقة V" : "For V-Necklines"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {locale === "ar"
                    ? "اختاري 40-45 سم لتتبع القلادة شكل V"
                    : "Choose 40-45 cm so the chain follows the V shape"}
                </p>
              </div>
              <div className="rounded-sm bg-card p-4">
                <p className="text-sm font-medium text-primary">
                  {locale === "ar" ? "للطبقات" : "For Layering"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {locale === "ar"
                    ? "اجمعي بين 35 سم و 45 سم و 55 سم للحصول على طبقات أنيقة"
                    : "Combine 35 cm, 45 cm, and 55 cm for an elegant layered look"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
