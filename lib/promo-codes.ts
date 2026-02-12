export type PromoCode = {
  code: string
  discount: number // percentage discount
  description: { en: string; ar: string }
}

export const PROMO_CODES: PromoCode[] = [
  {
    code: "MA26",
    discount: 15,
    description: {
      en: "15% off your order",
      ar: "خصم 15% على طلبك",
    },
  },
  {
    code: "WELCOME10",
    discount: 10,
    description: {
      en: "10% off for new customers",
      ar: "خصم 10% للعملاء الجدد",
    },
  },
  {
    code: "LUXURY20",
    discount: 20,
    description: {
      en: "20% off luxury collection",
      ar: "خصم 20% على المجموعة الفاخرة",
    },
  },
]

export function validatePromoCode(code: string): PromoCode | null {
  const upperCode = code.trim().toUpperCase()
  return PROMO_CODES.find((promo) => promo.code === upperCode) || null
}

export function calculateDiscount(subtotal: number, discount: number): number {
  return Math.round(subtotal * (discount / 100))
}