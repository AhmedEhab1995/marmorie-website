import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          address_line: string
          city: string
          country: string
          postal_code: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          address_line: string
          city: string
          country: string
          postal_code?: string | null
          is_default?: boolean
        }
        Update: {
          address_line?: string
          city?: string
          country?: string
          postal_code?: string | null
          is_default?: boolean
        }
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string
          card_holder_name: string
          card_last_four: string
          card_brand: string | null
          expiry_month: number | null
          expiry_year: number | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          card_holder_name: string
          card_last_four: string
          card_brand?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          is_default?: boolean
        }
        Update: {
          card_holder_name?: string
          expiry_month?: number | null
          expiry_year?: number | null
          is_default?: boolean
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          product_id: string
        }
        Delete: {
          user_id: string
          product_id: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          order_number: string
          status: string
          subtotal: number
          discount: number
          shipping_cost: number
          total: number
          promo_code: string | null
          promo_discount_percent: number | null
          shipping_name: string
          shipping_email: string
          shipping_phone: string
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_postal_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          order_number: string
          status?: string
          subtotal: number
          discount?: number
          shipping_cost?: number
          total: number
          promo_code?: string | null
          promo_discount_percent?: number | null
          shipping_name: string
          shipping_email: string
          shipping_phone: string
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_postal_code?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name_en: string
          product_name_ar: string
          product_image: string | null
          quantity: number
          price: number
          engraving: string | null
          created_at: string
        }
        Insert: {
          order_id: string
          product_id: string
          product_name_en: string
          product_name_ar: string
          product_image?: string | null
          quantity: number
          price: number
          engraving?: string | null
        }
      }
    }
  }
}
