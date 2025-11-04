"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
    const {
        items,
        isCartOpen,
        closeCart,
        updateQuantity,
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
            {/* Overlay with Backdrop Blur */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-all duration-300"
                onClick={closeCart}
            ></div>

            {/* Drawer - Positioned from top on mobile, from right on desktop */}
            <div className="fixed top-[90px] md:top-[114px] left-1/2 -translate-x-1/2 md:right-10 md:left-auto md:translate-x-0 w-[calc(100%-48px)] max-w-[377px] bg-white z-50 rounded-lg shadow-2xl p-8 animate-slideIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h6 className="uppercase">Cart ({items.length})</h6>
                    {items.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-black/50 hover:text-[#D87D4A] cursor-pointer underline text-[15px] transition-colors"
                        >
                            Remove all
                        </button>
                    )}
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
                        {/* Cart Items */}
                        <div className="space-y-6 mb-8">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    {/* Product Image */}
                                    <div className="w-16 h-16 bg-[#F1F1F1] rounded-lg flex items-center justify-center shrink-0">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h6 className="text-[15px] font-bold leading-[25px] truncate">
                                            {item.product.name
                                                .replace(" Headphones", "")
                                                .replace(" Speaker", "")
                                                .replace(" Earphones", "")
                                                .replace("Wireless ", "")}
                                        </h6>
                                        <p className="text-black/50 text-[14px] font-bold leading-[25px]">{formatPrice(item.product.price)}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="bg-[#F1F1F1] flex items-center h-8">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity - 1)
                                            }
                                            className="px-3 h-full hover:text-[#D87D4A] transition-colors text-black/25 font-bold text-[13px]"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 font-bold text-[13px] tracking-[1px] min-w-5 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity + 1)
                                            }
                                            className="px-3 h-full hover:text-[#D87D4A] transition-colors text-black/25 font-bold text-[13px]"
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
                            <span className="text-black/50 uppercase text-[15px] font-medium">Total</span>
                            <span className="text-[18px] font-bold tracking-[1.3px]">{formatPrice(getTotalPrice())}</span>
                        </div>

                        {/* Checkout Button */}
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="block w-full bg-[#D87D4A] hover:bg-[#FBAF85] cursor-pointer text-white text-center uppercase text-[13px] font-bold tracking-[1px] py-4 transition-colors"
                        >
                            Checkout
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}