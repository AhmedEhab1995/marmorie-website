"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FaqSection = {
  titleKey: string
  questions: { q: { en: string; ar: string }; a: { en: string; ar: string } }[]
}

const faqSections: FaqSection[] = [
  {
    titleKey: "faq.shipping",
    questions: [
      {
        q: { en: "How long does shipping take?", ar: "كم تستغرق عملية الشحن؟" },
        a: {
          en: "Standard shipping takes 5-7 business days within the region. Express shipping is available for 2-3 business days delivery. International orders may take 7-14 business days depending on the destination.",
          ar: "الشحن العادي يستغرق 5-7 أيام عمل داخل المنطقة. الشحن السريع متاح للتوصيل خلال 2-3 أيام عمل. الطلبات الدولية قد تستغرق 7-14 يوم عمل حسب الوجهة.",
        },
      },
      {
        q: { en: "Do you offer free shipping?", ar: "هل تقدمون شحن مجاني؟" },
        a: {
          en: "Yes! We offer free standard shipping on all orders over $500. Orders under $500 have a flat shipping fee of $15.",
          ar: "نعم! نقدم شحن مجاني على جميع الطلبات التي تزيد عن 500 دولار. الطلبات الأقل من 500 دولار لها رسوم شحن ثابتة قدرها 15 دولار.",
        },
      },
      {
        q: { en: "Can I track my order?", ar: "هل يمكنني تتبع طلبي؟" },
        a: {
          en: "Absolutely. Once your order ships, you will receive an email with a tracking number and link to follow your package in real time.",
          ar: "بالتأكيد. بمجرد شحن طلبك، ستتلقين بريداً إلكترونياً برقم التتبع ورابط لمتابعة طردك في الوقت الفعلي.",
        },
      },
    ],
  },
  {
    titleKey: "faq.returns",
    questions: [
      {
        q: { en: "What is your return policy?", ar: "ما هي سياسة الإرجاع؟" },
        a: {
          en: "We accept returns within 30 days of delivery for unworn items in their original packaging. Engraved items cannot be returned unless defective.",
          ar: "نقبل الإرجاع خلال 30 يوماً من التسليم للقطع غير المرتدية في عبواتها الأصلية. القطع المنقوشة لا يمكن إرجاعها إلا إذا كانت معيبة.",
        },
      },
      {
        q: { en: "How do I exchange an item?", ar: "كيف أستبدل قطعة؟" },
        a: {
          en: "To exchange, contact our customer care team with your order number. We will arrange for a return label and ship your new item once we receive the original.",
          ar: "للاستبدال، تواصلي مع فريق خدمة العملاء مع رقم طلبك. سنرتب ملصق إرجاع ونشحن القطعة الجديدة بمجرد استلام الأصلية.",
        },
      },
      {
        q: { en: "When will I receive my refund?", ar: "متى سأستلم المبلغ المسترد؟" },
        a: {
          en: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will appear on your original payment method.",
          ar: "يتم معالجة المبالغ المستردة خلال 5-7 أيام عمل بعد استلام وفحص القطعة المرتجعة. سيظهر المبلغ على طريقة الدفع الأصلية.",
        },
      },
    ],
  },
  {
    titleKey: "faq.care",
    questions: [
      {
        q: { en: "How should I care for my jewelry?", ar: "كيف أعتني بمجوهراتي؟" },
        a: {
          en: "Store your jewelry in a soft cloth pouch or the Marmorie box it came in. Avoid exposure to perfumes, lotions, and harsh chemicals. Clean gently with a soft polishing cloth.",
          ar: "احفظي مجوهراتك في كيس قماش ناعم أو في علبة مارموري. تجنبي تعريضها للعطور والمستحضرات والمواد الكيميائية القاسية. نظفيها بلطف بقطعة قماش تلميع ناعمة.",
        },
      },
      {
        q: { en: "Can I wear my jewelry in water?", ar: "هل يمكنني ارتداء مجوهراتي في الماء؟" },
        a: {
          en: "We recommend removing your jewelry before swimming, bathing, or exercising. Prolonged exposure to water, sweat, and chlorine can cause tarnishing over time.",
          ar: "ننصح بخلع مجوهراتك قبل السباحة أو الاستحمام أو التمارين. التعرض المطول للماء والعرق والكلور قد يسبب تغير اللون مع الوقت.",
        },
      },
      {
        q: { en: "Do you offer a warranty?", ar: "هل تقدمون ضمان؟" },
        a: {
          en: "Yes, all Marmorie pieces come with a 1-year warranty against manufacturing defects. This covers issues with clasps, settings, and chain links under normal wear conditions.",
          ar: "نعم، جميع قطع مارموري تأتي بضمان لمدة سنة ضد عيوب التصنيع. يغطي ذلك مشاكل الأقفال والإعدادات وحلقات السلسلة في ظروف الارتداء العادية.",
        },
      },
    ],
  },
  {
    titleKey: "faq.engravingTitle",
    questions: [
      {
        q: { en: "Which items can be engraved?", ar: "أي قطع يمكن نقشها؟" },
        a: {
          en: "Items marked with an 'Add Engraving' option on their product page can be engraved. This includes select rings, bracelets, pendants, and charms.",
          ar: "القطع المميزة بخيار 'أضيفي نقشاً' في صفحة المنتج يمكن نقشها. تشمل خواتم وأساور وتعليقات وتشارمز مختارة.",
        },
      },
      {
        q: { en: "How many characters can I engrave?", ar: "كم حرفاً يمكنني نقشه؟" },
        a: {
          en: "You can engrave up to 20 characters including letters, numbers, and basic symbols. Both English and Arabic script are supported.",
          ar: "يمكنك نقش ما يصل إلى 20 حرفاً بما في ذلك الحروف والأرقام والرموز الأساسية. يدعم النقش باللغتين العربية والإنجليزية.",
        },
      },
      {
        q: { en: "Can I return engraved items?", ar: "هل يمكنني إرجاع القطع المنقوشة؟" },
        a: {
          en: "Personalized engraved items are final sale and cannot be returned or exchanged unless they arrive with a manufacturing defect.",
          ar: "القطع المنقوشة المخصصة هي بيع نهائي ولا يمكن إرجاعها أو استبدالها إلا إذا وصلت بعيب تصنيع.",
        },
      },
    ],
  },
  {
    titleKey: "faq.sizing",
    questions: [
      {
        q: { en: "How do I find my ring size?", ar: "كيف أعرف مقاس خاتمي؟" },
        a: {
          en: "You can measure the inside diameter of a ring that fits you well and match it to our size chart. Visit our Size Guide page for detailed measurements and conversion tables.",
          ar: "يمكنك قياس القطر الداخلي لخاتم يناسبك جيداً ومطابقته مع جدول المقاسات. زوري صفحة دليل المقاسات لقياسات تفصيلية وجداول تحويل.",
        },
      },
      {
        q: { en: "What if my jewelry does not fit?", ar: "ماذا لو لم تناسبني المجوهرات؟" },
        a: {
          en: "If your item does not fit, you can exchange it within 30 days for a different size (non-engraved items only). Contact our team and we will help you find the perfect fit.",
          ar: "إذا لم تناسبك القطعة، يمكنك استبدالها خلال 30 يوماً بمقاس مختلف (القطع غير المنقوشة فقط). تواصلي مع فريقنا وسنساعدك في إيجاد المقاس المثالي.",
        },
      },
      {
        q: { en: "Do you offer resizing services?", ar: "هل تقدمون خدمة تعديل المقاس؟" },
        a: {
          en: "Yes, we offer complimentary resizing for rings purchased from Marmorie within the first 6 months. After that, a small fee may apply depending on the adjustment needed.",
          ar: "نعم، نقدم خدمة تعديل مقاس مجانية للخواتم المشتراة من مارموري خلال أول 6 أشهر. بعد ذلك، قد يتم تطبيق رسوم بسيطة حسب التعديل المطلوب.",
        },
      },
    ],
  },
]

export default function FaqPage() {
  const { t, locale } = useI18n()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {t("footer.customerCare")}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl text-balance">
            {t("faq.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground leading-relaxed">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="mt-16 space-y-12">
          {faqSections.map((section) => (
            <section key={section.titleKey}>
              <h2 className="font-serif text-xl text-foreground">{t(section.titleKey)}</h2>
              <Accordion type="single" collapsible className="mt-4">
                {section.questions.map((item, i) => (
                  <AccordionItem key={i} value={`${section.titleKey}-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-primary hover:no-underline">
                      {item.q[locale]}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {item.a[locale]}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
