"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "en" | "ar"

type Translations = {
  [key: string]: { en: string; ar: string }
}

export const translations: Translations = {
  // Nav
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.newFeatured": { en: "New & Featured", ar: "جديد ومميز" },
  "nav.collections": { en: "Collections", ar: "مجموعات" },
  "nav.about": { en: "About", ar: "عن مارموري" },
  "nav.contact": { en: "Contact", ar: "تواصل معنا" },
  "nav.cart": { en: "Cart", ar: "السلة" },
  "nav.search": { en: "Search", ar: "بحث" },
  "nav.shop": { en: "Shop All", ar: "تسوقي الكل" },

  // Hero
  "hero.headline": { en: "Jewelry that tells your story.", ar: "مجوهرات تحكي قصتك." },
  "hero.subheadline": {
    en: "Timeless pieces crafted with love, designed to be uniquely yours.",
    ar: "قطع خالدة صُنعت بحب، صُممت لتكون فريدة مثلك.",
  },
  "hero.cta": { en: "Explore Collection", ar: "استكشفي المجموعة" },
  "hero.secondary": { en: "New Arrivals", ar: "وصل حديثاً" },

  // Categories
  "cat.title": { en: "Shop by Category", ar: "تسوقي حسب الفئة" },
  "cat.necklaces": { en: "Necklaces", ar: "قلادات" },
  "cat.bracelets": { en: "Bracelets", ar: "أساور" },
  "cat.rings": { en: "Rings", ar: "خواتم" },
  "cat.earrings": { en: "Earrings", ar: "أقراط" },
  "cat.charms": { en: "Charms", ar: "تعاليق" },
  "cat.valentines": { en: "Valentine's Day", ar: "عيد الحب" },
  "cat.engraving": { en: "Engraving", ar: "نقش" },
  "cat.labDiamonds": { en: "Lab-grown Diamonds", ar: "ألماس مُصنّع" },
  "cat.gifts": { en: "Gifts", ar: "هدايا" },
  "cat.sale": { en: "Sale", ar: "تخفيضات" },

  // Products
  "products.featured": { en: "Featured Pieces", ar: "قطع مميزة" },
  "products.addToCart": { en: "Add to Cart", ar: "أضيفي للسلة" },
  "products.buyNow": { en: "Buy Now", ar: "اشتري الآن" },
  "products.wishlist": { en: "Add to Wishlist", ar: "أضيفي للمفضلة" },
  "products.description": { en: "Description", ar: "الوصف" },
  "products.engraving": { en: "Add Engraving", ar: "أضيفي نقشاً" },
  "products.engravingPlaceholder": { en: "Enter your text...", ar: "اكتبي النص هنا..." },
  "products.viewDetails": { en: "View Details", ar: "عرض التفاصيل" },
  "products.backToShop": { en: "Back to Home", ar: "العودة للرئيسية" },
  "products.pieces": { en: "pieces", ar: "قطع" },
  "products.piece": { en: "piece", ar: "قطعة" },
  "products.all": { en: "All", ar: "الكل" },

  // About
  "about.title": { en: "About Marmorie", ar: "عن مارموري" },
  "about.subtitle": { en: "Where every piece tells a story", ar: "حيث كل قطعة تحكي قصة" },
  "about.p1": {
    en: "Marmorie was born from a passion for creating jewelry that captures life's most precious moments. Each piece is thoughtfully designed to become part of your personal narrative.",
    ar: "وُلدت مارموري من شغف بصناعة مجوهرات تلتقط أثمن لحظات الحياة. كل قطعة مصممة بعناية لتصبح جزءاً من قصتك الشخصية.",
  },
  "about.p2": {
    en: "Our artisans blend traditional craftsmanship with contemporary design, using ethically sourced materials to create pieces that are as responsible as they are beautiful.",
    ar: "يمزج حرفيونا بين الصناعة التقليدية والتصميم المعاصر، باستخدام مواد مستدامة لصنع قطع جميلة ومسؤولة.",
  },
  "about.collections": { en: "Collections", ar: "مجموعات" },
  "about.customers": { en: "Happy Customers", ar: "عملاء سعداء" },
  "about.years": { en: "Years of Craft", ar: "سنوات من الحرفة" },

  // Contact
  "contact.title": { en: "Get in Touch", ar: "تواصلي معنا" },
  "contact.subtitle": { en: "We would love to hear from you", ar: "يسعدنا سماعك" },
  "contact.name": { en: "Full Name", ar: "الاسم الكامل" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.phone": { en: "Phone", ar: "الهاتف" },
  "contact.message": { en: "Message", ar: "الرسالة" },
  "contact.send": { en: "Send Message", ar: "إرسال الرسالة" },
  "contact.location": { en: "Location", ar: "الموقع" },

  // Checkout
  "checkout.title": { en: "Checkout", ar: "إتمام الطلب" },
  "checkout.summary": { en: "Order Summary", ar: "ملخص الطلب" },
  "checkout.subtotal": { en: "Subtotal", ar: "المجموع الفرعي" },
  "checkout.shipping": { en: "Shipping", ar: "الشحن" },
  "checkout.total": { en: "Total", ar: "الإجمالي" },
  "checkout.free": { en: "Free", ar: "مجاني" },
  "checkout.address": { en: "Delivery Address", ar: "عنوان التوصيل" },
  "checkout.street": { en: "Street Address", ar: "العنوان" },
  "checkout.city": { en: "City", ar: "المدينة" },
  "checkout.country": { en: "Country", ar: "الدولة" },
  "checkout.placeOrder": { en: "Place Order", ar: "تأكيد الطلب" },
  "checkout.quantity": { en: "Qty", ar: "الكمية" },
  "checkout.emptyCart": { en: "Your cart is empty", ar: "سلتك فارغة" },
  "checkout.engraving": { en: "Engraving", ar: "نقش" },

  // Footer
  "footer.newsletter": { en: "Join our newsletter", ar: "اشتركي في نشرتنا" },
  "footer.newsletterDesc": {
    en: "Be the first to know about new collections and exclusive offers.",
    ar: "كوني أول من يعرف عن المجموعات الجديدة والعروض الحصرية.",
  },
  "footer.emailPlaceholder": { en: "Your email address", ar: "بريدك الإلكتروني" },
  "footer.subscribe": { en: "Subscribe", ar: "اشتراك" },
  "footer.customerCare": { en: "Customer Care", ar: "خدمة العملاء" },
  "footer.shippingReturns": { en: "Shipping & Returns", ar: "الشحن والإرجاع" },
  "footer.sizeGuide": { en: "Size Guide", ar: "دليل المقاسات" },
  "footer.faq": { en: "FAQ", ar: "الأسئلة الشائعة" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.followUs": { en: "Follow Us", ar: "تابعينا" },

  // Wishlist
  "wishlist.title": { en: "My Wishlist", ar: "قائمة أمنياتي" },
  "wishlist.empty": { en: "Your wishlist is empty", ar: "قائمة أمنياتك فارغة" },
  "wishlist.emptyDesc": {
    en: "Browse our collection and tap the heart icon on pieces you love.",
    ar: "تصفحي مجموعتنا واضغطي على أيقونة القلب على القطع التي تحبينها.",
  },
  "wishlist.browseCollection": { en: "Browse Collection", ar: "تصفحي المجموعة" },
  "wishlist.remove": { en: "Remove", ar: "إزالة" },

  // Profile
  "profile.title": { en: "My Profile", ar: "ملفي الشخصي" },
  "profile.subtitle": { en: "Manage your information", ar: "إدارة معلوماتك" },
  "profile.personal": { en: "Personal Information", ar: "المعلومات الشخصية" },
  "profile.firstName": { en: "First Name", ar: "الاسم الأول" },
  "profile.lastName": { en: "Last Name", ar: "اسم العائلة" },
  "profile.addressInfo": { en: "Address Information", ar: "معلومات العنوان" },
  "profile.addressLine": { en: "Address Line", ar: "العنوان" },
  "profile.postalCode": { en: "Postal Code", ar: "الرمز البريدي" },
  "profile.paymentInfo": { en: "Payment Information", ar: "معلومات الدفع" },
  "profile.cardNumber": { en: "Card Number", ar: "رقم البطاقة" },
  "profile.expiry": { en: "Expiry Date", ar: "تاريخ الانتهاء" },
  "profile.cvv": { en: "CVV", ar: "CVV" },
  "profile.cardHolder": { en: "Cardholder Name", ar: "اسم حامل البطاقة" },
  "profile.save": { en: "Save Changes", ar: "حفظ التغييرات" },
  "profile.saved": { en: "Changes saved!", ar: "تم الحفظ!" },
  "profile.demoNotice": {
    en: "This is a demo. No real data is stored or processed.",
    ar: "هذا عرض توضيحي. لا يتم تخزين أو معالجة بيانات حقيقية.",
  },

  // Size Guide
  "sizeGuide.title": { en: "Size Guide", ar: "دليل المقاسات" },
  "sizeGuide.subtitle": {
    en: "Find your perfect fit with our comprehensive sizing guide.",
    ar: "اعثري على مقاسك المثالي مع دليل المقاسات الشامل.",
  },
  "sizeGuide.rings": { en: "Ring Size Chart", ar: "جدول مقاسات الخواتم" },
  "sizeGuide.ringsDesc": {
    en: "Measure the inside diameter of a ring that fits you well, then match it below.",
    ar: "قيسي القطر الداخلي لخاتم يناسبك جيداً، ثم طابقيه أدناه.",
  },
  "sizeGuide.bracelets": { en: "Bracelet Length Guide", ar: "دليل أطوال الأساور" },
  "sizeGuide.braceletsDesc": {
    en: "Wrap a flexible tape measure around your wrist just above the wrist bone.",
    ar: "لفي شريط قياس مرن حول معصمك فوق عظمة المعصم مباشرة.",
  },
  "sizeGuide.necklaces": { en: "Necklace Length Guide", ar: "دليل أطوال القلادات" },
  "sizeGuide.necklacesDesc": {
    en: "Choose the necklace length that best complements your neckline and style.",
    ar: "اختاري طول القلادة الذي يكمل فتحة العنق وأسلوبك بشكل أفضل.",
  },
  "sizeGuide.size": { en: "Size", ar: "المقاس" },
  "sizeGuide.diameter": { en: "Diameter (mm)", ar: "القطر (مم)" },
  "sizeGuide.circumference": { en: "Circumference (mm)", ar: "المحيط (مم)" },
  "sizeGuide.usSize": { en: "US Size", ar: "المقاس الأمريكي" },
  "sizeGuide.length": { en: "Length", ar: "الطول" },
  "sizeGuide.fit": { en: "Fit", ar: "الملاءمة" },
  "sizeGuide.style": { en: "Style", ar: "الأسلوب" },
  "sizeGuide.position": { en: "Position", ar: "الموقع" },

  // FAQ
  "faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "faq.subtitle": {
    en: "Everything you need to know about Marmorie.",
    ar: "كل ما تحتاجين معرفته عن مارموري.",
  },
  "faq.shipping": { en: "Shipping & Delivery", ar: "الشحن والتوصيل" },
  "faq.returns": { en: "Returns & Exchanges", ar: "الإرجاع والاستبدال" },
  "faq.care": { en: "Jewelry Care", ar: "العناية بالمجوهرات" },
  "faq.engravingTitle": { en: "Engraving", ar: "النقش" },
  "faq.sizing": { en: "Sizing Questions", ar: "أسئلة المقاسات" },
}

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr"
  }, [])

  const t = useCallback(
    (key: string) => {
      return translations[key]?.[locale] ?? key
    },
    [locale]
  )

  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
