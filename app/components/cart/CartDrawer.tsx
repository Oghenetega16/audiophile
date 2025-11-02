"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { X } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h6>Cart ({items.length})</h6>
            <button
              onClick={closeCart}
              className="hover:text-[#D87D4A] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-black/50 mb-8">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Remove All */}
              <button
                onClick={clearCart}
                className="text-black/50 hover:text-[#D87D4A] underline text-[15px] mb-6 transition-colors"
              >
                Remove all
              </button>

              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-[#F1F1F1] rounded-lg flex items-center justify-center shrink-0">
                      <div className="w-10 h-10 bg-gray-300 rounded"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h6 className="text-[15px] font-bold truncate">
                        {item.product.name.replace(" Headphones", "").replace(" Speaker", "").replace(" Earphones", "")}
                      </h6>
                      <p className="text-black/50 text-[14px] font-bold">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="bg-[#F1F1F1] flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-3 py-2 hover:text-[#D87D4A] transition-colors text-black/25 font-bold text-[13px]"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-[13px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-3 py-2 hover:text-[#D87D4A] transition-colors text-black/25 font-bold text-[13px]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-black/50 uppercase text-[15px]">Total</span>
                <span className="text-[18px] font-bold">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-center uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
              >
                Checkout
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}