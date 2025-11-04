"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmation = action({
  args: {
    orderNumber: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    items: v.array(
      v.object({
        productName: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    total: v.number(),
    shippingAddress: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(price);
    };

    const itemsHtml = args.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            ${item.productName}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
            ${formatPrice(item.price)}
          </td>
        </tr>
      `
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #191919; padding: 30px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">AUDIOPHILE</h1>
          </div>
          
          <div style="background-color: #D87D4A; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
            <svg width="24" height="18" xmlns="http://www.w3.org/2000/svg" style="display: block;">
              <path d="M2 9l6 6L22 2" stroke="#FFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h2 style="font-size: 28px; margin-bottom: 16px; text-transform: uppercase;">Thank you<br/>for your order</h2>
          
          <p style="color: #666; margin-bottom: 32px;">
            Your order has been confirmed and will be shipped soon.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; font-weight: bold;">Order Number:</p>
            <p style="margin: 0; color: #D87D4A; font-size: 18px; font-weight: bold;">${args.orderNumber}</p>
          </div>
          
          <h3 style="font-size: 18px; margin-bottom: 16px; text-transform: uppercase;">Order Details</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 12px; text-align: left; font-weight: bold;">Product</th>
                <th style="padding: 12px; text-align: center; font-weight: bold;">Qty</th>
                <th style="padding: 12px; text-align: right; font-weight: bold;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="background-color: #191919; color: white; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Grand Total</span>
              <span style="font-size: 20px; font-weight: bold;">${formatPrice(args.total)}</span>
            </div>
          </div>
          
          <h3 style="font-size: 18px; margin-bottom: 16px; text-transform: uppercase;">Shipping Address</h3>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0 0 4px 0; font-weight: bold;">${args.customerName}</p>
            <p style="margin: 0 0 4px 0;">${args.shippingAddress.address}</p>
            <p style="margin: 0;">${args.shippingAddress.city}, ${args.shippingAddress.zip}</p>
            <p style="margin: 0;">${args.shippingAddress.country}</p>
          </div>
          
          <div style="border-top: 2px solid #eee; padding-top: 24px; text-align: center; color: #666;">
            <p style="margin: 0;">Thank you for shopping with Audiophile!</p>
            <p style="margin: 8px 0 0 0; font-size: 14px;">
              If you have any questions, please contact us at support@audiophile.com
            </p>
          </div>
        </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: "Audiophile <onboarding@resend.dev>", // Change this to your verified domain
        to: [args.customerEmail],
        subject: `Order Confirmation - ${args.orderNumber}`,
        html: emailHtml,
      });

      return { success: true };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: String(error) };
    }
  },
});