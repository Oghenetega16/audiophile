import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate a unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// Create a new order
export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const orderNumber = generateOrderNumber();

    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      shippingAddress: args.shippingAddress,
      items: args.items,
      subtotal: args.subtotal,
      shipping: args.shipping,
      vat: args.vat,
      total: args.total,
      paymentMethod: args.paymentMethod,
      status: "pending",
      createdAt: Date.now(),
    });

    return { orderId, orderNumber };
  },
});

// Get order by order number
export const getOrderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", args.orderNumber))
      .first();
    return order;
  },
});

// Get all orders by email
export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerEmail", args.email))
      .order("desc")
      .collect();
    return orders;
  },
});