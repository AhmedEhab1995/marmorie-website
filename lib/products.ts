export type Product = {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  price: number
  category: string
  image: string
  images: string[]
  isNew?: boolean
  isSale?: boolean
  salePrice?: number
  allowEngraving?: boolean
}

export const products: Product[] = [
  // --- Necklaces ---
  {
    id: "1",
    name: { en: "Luminara Pendant", ar: "قلادة لومينارا" },
    description: {
      en: "A delicate gold pendant featuring a single brilliant-cut diamond, suspended on a fine chain. Perfect for everyday elegance.",
      ar: "قلادة ذهبية رقيقة تتميز بألماسة بريليانت مفردة، معلقة على سلسلة رفيعة. مثالية للأناقة اليومية.",
    },
    price: 1250,
    category: "necklaces",
    image: "/images/product-1.jpg",
    images: ["/images/product-1.jpg"],
    isNew: true,
    allowEngraving: true,
  },
  {
    id: "6",
    name: { en: "Cascade Layered Necklace", ar: "قلادة كاسكيد الطبقية" },
    description: {
      en: "A sophisticated layered necklace set featuring multiple delicate chains with small pendant accents.",
      ar: "مجموعة قلادات طبقية راقية تضم سلاسل رقيقة متعددة مع لمسات تعليقات صغيرة.",
    },
    price: 1450,
    category: "necklaces",
    image: "/images/product-6.jpg",
    images: ["/images/product-6.jpg"],
    isSale: true,
    salePrice: 1160,
  },
  {
    id: "7",
    name: { en: "Seraphina Chain", ar: "سلسلة سيرافينا" },
    description: {
      en: "An ultra-fine gold chain with a tiny star pendant, giving a celestial touch to any look.",
      ar: "سلسلة ذهبية رفيعة للغاية مع تعليقة نجمة صغيرة، تمنح لمسة سماوية لأي إطلالة.",
    },
    price: 780,
    category: "necklaces",
    image: "/images/product-1.jpg",
    images: ["/images/product-1.jpg"],
    allowEngraving: true,
  },
  {
    id: "8",
    name: { en: "Aura Choker", ar: "شوكر أورا" },
    description: {
      en: "A modern gold choker that sits close to the neck with a minimalist bar detail.",
      ar: "شوكر ذهبي عصري يجلس بالقرب من العنق مع تفصيل شريط بسيط.",
    },
    price: 980,
    category: "necklaces",
    image: "/images/product-6.jpg",
    images: ["/images/product-6.jpg"],
    isNew: true,
  },
  {
    id: "9",
    name: { en: "Infinity Lariat", ar: "لاريات إنفينيتي" },
    description: {
      en: "A Y-shaped lariat necklace with a delicate infinity symbol drop, perfect for V-necklines.",
      ar: "قلادة لاريات بشكل حرف Y مع تدلي رمز اللانهاية الرقيق، مثالية لفتحات العنق.",
    },
    price: 1100,
    category: "necklaces",
    image: "/images/product-1.jpg",
    images: ["/images/product-1.jpg"],
    allowEngraving: true,
  },

  // --- Rings ---
  {
    id: "2",
    name: { en: "Eternal Trio Rings", ar: "خواتم الثلاثي الأبدي" },
    description: {
      en: "A stunning set of three stackable gold rings, each with its own character.",
      ar: "مجموعة مذهلة من ثلاث خواتم ذهبية قابلة للتكديس، كل واحدة بطابعها الخاص.",
    },
    price: 890,
    category: "rings",
    image: "/images/product-2.jpg",
    images: ["/images/product-2.jpg"],
    allowEngraving: true,
  },
  {
    id: "5",
    name: { en: "Soleil Diamond Ring", ar: "خاتم سوليل الألماسي" },
    description: {
      en: "A breathtaking solitaire ring featuring a lab-grown diamond set in polished gold.",
      ar: "خاتم سوليتير خلاب يضم ألماسة مُصنّعة في المختبر مرصعة في ذهب مصقول.",
    },
    price: 2100,
    category: "rings",
    image: "/images/product-5.jpg",
    images: ["/images/product-5.jpg"],
    isNew: true,
    allowEngraving: true,
  },
  {
    id: "10",
    name: { en: "Rosetta Band", ar: "خاتم روزيتا" },
    description: {
      en: "A slim rose-gold band with micro-pave diamonds around the circumference.",
      ar: "خاتم من الذهب الوردي الرفيع مع ألماس صغير محيط بالخاتم.",
    },
    price: 1340,
    category: "rings",
    image: "/images/product-5.jpg",
    images: ["/images/product-5.jpg"],
  },
  {
    id: "11",
    name: { en: "Petite Signet Ring", ar: "خاتم سيغنت الصغير" },
    description: {
      en: "A dainty signet ring with a flat oval surface, perfect for a personalized engraving.",
      ar: "خاتم سيغنت أنيق بسطح بيضاوي مسطح، مثالي للنقش الشخصي.",
    },
    price: 620,
    category: "rings",
    image: "/images/product-2.jpg",
    images: ["/images/product-2.jpg"],
    allowEngraving: true,
  },
  {
    id: "12",
    name: { en: "Twisted Vine Ring", ar: "خاتم الكرمة الملتوية" },
    description: {
      en: "A nature-inspired twisted gold ring mimicking vine tendrils, an organic statement piece.",
      ar: "خاتم ذهبي ملتوي مستوحى من الطبيعة يحاكي محلاق الكرمة، قطعة فريدة.",
    },
    price: 750,
    category: "rings",
    image: "/images/product-5.jpg",
    images: ["/images/product-5.jpg"],
    isNew: true,
  },

  // --- Bracelets ---
  {
    id: "3",
    name: { en: "Amore Heart Bracelet", ar: "سوار قلب أموري" },
    description: {
      en: "A charming gold bracelet adorned with a heart-shaped clasp, symbolizing love and connection.",
      ar: "سوار ذهبي ساحر مزين بقفل على شكل قلب، يرمز للحب والتواصل.",
    },
    price: 680,
    category: "bracelets",
    image: "/images/product-3.jpg",
    images: ["/images/product-3.jpg"],
    isNew: true,
    allowEngraving: true,
  },
  {
    id: "13",
    name: { en: "Tennis Sparkle Bracelet", ar: "سوار تنس سباركل" },
    description: {
      en: "A classic tennis bracelet featuring lab-grown diamonds set in 18k gold.",
      ar: "سوار تنس كلاسيكي يضم ألماس مُصنّع مرصع في ذهب عيار 18.",
    },
    price: 2450,
    category: "bracelets",
    image: "/images/product-3.jpg",
    images: ["/images/product-3.jpg"],
  },
  {
    id: "14",
    name: { en: "Chain Link Cuff", ar: "كاف سلسلة" },
    description: {
      en: "A bold chain-link style cuff in polished gold with a modern open design.",
      ar: "كاف على شكل سلسلة جريئة من الذهب المصقول بتصميم مفتوح عصري.",
    },
    price: 920,
    category: "bracelets",
    image: "/images/product-3.jpg",
    images: ["/images/product-3.jpg"],
    isSale: true,
    salePrice: 690,
  },
  {
    id: "15",
    name: { en: "Silk Thread Bracelet", ar: "سوار خيط الحرير" },
    description: {
      en: "A delicate bracelet combining a silk thread with a gold bar centerpiece.",
      ar: "سوار رقيق يجمع بين خيط حريري وقطعة ذهبية مركزية.",
    },
    price: 380,
    category: "bracelets",
    image: "/images/product-3.jpg",
    images: ["/images/product-3.jpg"],
    allowEngraving: true,
    isNew: true,
  },
  {
    id: "16",
    name: { en: "Charm Collector Bracelet", ar: "سوار جامع التعاليق" },
    description: {
      en: "A charm bracelet with detachable charms including a heart, star, and moon.",
      ar: "سوار تعاليق مع تعاليق قابلة للفك تشمل قلب ونجمة وقمر.",
    },
    price: 850,
    category: "bracelets",
    image: "/images/product-3.jpg",
    images: ["/images/product-3.jpg"],
  },

  // --- Earrings ---
  {
    id: "4",
    name: { en: "Pearl Drop Earrings", ar: "أقراط اللؤلؤ المتدلية" },
    description: {
      en: "Elegant gold drop earrings featuring lustrous pearl accents. The elongated design frames the face beautifully.",
      ar: "أقراط ذهبية متدلية أنيقة تتميز بلمسات من اللؤلؤ اللامع. التصميم الممتد يؤطر الوجه بجمال.",
    },
    price: 520,
    category: "earrings",
    image: "/images/product-4.jpg",
    images: ["/images/product-4.jpg"],
  },
  {
    id: "17",
    name: { en: "Mini Hoop Earrings", ar: "أقراط حلقية صغيرة" },
    description: {
      en: "Petite gold hoop earrings with a click-shut closure, ideal for everyday wear.",
      ar: "أقراط حلقية ذهبية صغيرة بإغلاق كبسة، مثالية للارتداء اليومي.",
    },
    price: 340,
    category: "earrings",
    image: "/images/product-4.jpg",
    images: ["/images/product-4.jpg"],
    isNew: true,
  },
  {
    id: "18",
    name: { en: "Celestial Stud Earrings", ar: "أقراط نجمية" },
    description: {
      en: "Star-shaped stud earrings with tiny diamond accents, perfect for adding sparkle.",
      ar: "أقراط على شكل نجمة مع لمسات ألماسية صغيرة، مثالية لإضافة لمعان.",
    },
    price: 460,
    category: "earrings",
    image: "/images/product-4.jpg",
    images: ["/images/product-4.jpg"],
  },
  {
    id: "19",
    name: { en: "Tassel Drop Earrings", ar: "أقراط شرابة متدلية" },
    description: {
      en: "Statement earrings with delicate gold chain tassels that catch light with every movement.",
      ar: "أقراط مميزة مع شرابات سلسلة ذهبية رقيقة تلتقط الضوء مع كل حركة.",
    },
    price: 690,
    category: "earrings",
    image: "/images/product-4.jpg",
    images: ["/images/product-4.jpg"],
    isSale: true,
    salePrice: 520,
  },
  {
    id: "20",
    name: { en: "Crescent Moon Studs", ar: "أقراط هلال القمر" },
    description: {
      en: "Minimalist crescent moon studs in polished gold, subtle yet captivating.",
      ar: "أقراط هلال قمر بسيطة من الذهب المصقول، رقيقة لكنها أخاذة.",
    },
    price: 290,
    category: "earrings",
    image: "/images/product-4.jpg",
    images: ["/images/product-4.jpg"],
  },

  // --- Charms ---
  {
    id: "21",
    name: { en: "Heart Lock Charm", ar: "تعليقة قفل القلب" },
    description: {
      en: "A romantic heart-shaped lock charm in 18k gold, perfect for bracelets and necklaces.",
      ar: "تعليقة قفل على شكل قلب من الذهب عيار 18، مثالية للأساور والقلادات.",
    },
    price: 280,
    category: "charms",
    image: "/images/cat-charms.jpg",
    images: ["/images/cat-charms.jpg"],
    isNew: true,
  },
  {
    id: "22",
    name: { en: "Initial Letter Charm", ar: "تعليقة حرف أولي" },
    description: {
      en: "A personalized initial charm that can be added to any Marmorie chain or bracelet.",
      ar: "تعليقة حرف شخصية يمكن إضافتها لأي سلسلة أو سوار من مارموري.",
    },
    price: 220,
    category: "charms",
    image: "/images/cat-charms.jpg",
    images: ["/images/cat-charms.jpg"],
    allowEngraving: true,
  },
  {
    id: "23",
    name: { en: "Evil Eye Charm", ar: "تعليقة العين" },
    description: {
      en: "A protective evil eye charm in gold with blue enamel detailing.",
      ar: "تعليقة عين حامية من الذهب مع تفاصيل مينا زرقاء.",
    },
    price: 310,
    category: "charms",
    image: "/images/cat-charms.jpg",
    images: ["/images/cat-charms.jpg"],
  },
  {
    id: "24",
    name: { en: "Butterfly Charm", ar: "تعليقة الفراشة" },
    description: {
      en: "A delicate butterfly charm with pave-set stones on its wings, symbolizing transformation.",
      ar: "تعليقة فراشة رقيقة مع أحجار مرصعة على أجنحتها، ترمز للتحول.",
    },
    price: 350,
    category: "charms",
    image: "/images/cat-charms.jpg",
    images: ["/images/cat-charms.jpg"],
    isNew: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
