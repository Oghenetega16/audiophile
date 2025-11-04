import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    orderNumber: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        productId: v.number(),
        productName: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    total: v.number(),
    paymentMethod: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["customerEmail"])
    .index("by_order_number", ["orderNumber"])
    .index("by_created_at", ["createdAt"]),
});