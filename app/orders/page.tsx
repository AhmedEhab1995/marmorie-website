"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import { createClient } from "@/lib/supabase-client"
import { Loader2, Package, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

type OrderItem = {
  id: string
  product_id: string
  product_name_en: string
  product_name_ar: string
  product_image: string | null
  quantity: number
  price: number
  engraving: string | null
}

type Order = {
  id: string
  order_number: string
  status: string
  subtotal: number
  discount: number
  total: number
  promo_code: string | null
  promo_discount_percent: number | null
  shipping_address: string
  shipping_city: string
  shipping_country: string
  created_at: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const { t, locale } = useI18n()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    if (!user) return

    try {
      const supabase = createClient()

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (ordersError) throw ordersError

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: itemsData } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id)

          return {
            ...order,
            items: itemsData || [],
          }
        })
      )

      setOrders(ordersWithItems)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50 dark:bg-green-950/20"
      case "shipped":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950/20"
      case "processing":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20"
      case "cancelled":
        return "text-red-600 bg-red-50 dark:bg-red-950/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { en: string; ar: string }> = {
      pending: { en: "Pending", ar: "قيد الانتظار" },
      processing: { en: "Processing", ar: "قيد المعالجة" },
      shipped: { en: "Shipped", ar: "تم الشحن" },
      delivered: { en: "Delivered", ar: "تم التوصيل" },
      cancelled: { en: "Cancelled", ar: "ملغي" },
    }
    return statusMap[status]?.[locale] || status
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            {locale === "ar" ? "طلباتي" : "My Orders"}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            {t("orders.title")}
          </h1>
          {orders.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {orders.length}{" "}
              {orders.length === 1 ? t("orders.order") : t("orders.orders")}
            </p>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Package className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-6 font-serif text-xl text-foreground">
              {t("orders.noOrders")}
            </h2>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground leading-relaxed">
              {t("orders.noOrdersDesc")}
            </p>
            <Link href="/products" className="mt-8">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                {t("orders.startShopping")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-sm border border-border bg-card p-6"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {t("orders.orderNumber")}: {order.order_number}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString(
                        locale === "ar" ? "ar-EG" : "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                    <p className="font-serif text-lg text-foreground">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div className="mt-4 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                        {item.product_image && (
                          <Image
                            src={item.product_image}
                            alt={locale === "ar" ? item.product_name_ar : item.product_name_en}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {locale === "ar" ? item.product_name_ar : item.product_name_en}
                          </p>
                          {item.engraving && (
                            <p className="mt-1 text-xs text-muted-foreground italic">
                              {t("checkout.engraving")}: {item.engraving}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t("checkout.quantity")}: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order summary */}
                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
                    <span className="text-foreground">${order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">
                        {t("checkout.discount")}
                        {order.promo_discount_percent && ` (${order.promo_discount_percent}%)`}
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        -${order.discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-foreground">{t("checkout.total")}</span>
                    <span className="text-foreground">${order.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Shipping address */}
                <div className="mt-4 rounded-sm bg-secondary/50 p-3">
                  <p className="text-xs font-medium text-foreground">
                    {t("orders.shippingAddress")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.shipping_address}, {order.shipping_city}, {order.shipping_country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
