import Image from "next/image";
import type { CartItem } from "../context/CartContext";

interface SummaryProps {
    items: CartItem[];
    onSubmit: () => void;
    isSubmitting?: boolean;
}

export default function Summary({ items, onSubmit, isSubmitting = false }: SummaryProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Calculate totals
    const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shipping = 50;
    const vat = subtotal * 0.2; // 20% VAT
    const grandTotal = subtotal + shipping;

    return (
        <div className="bg-white rounded-lg p-6 md:p-8 h-fit">
            <h6 className="mb-8 uppercase">Summary</h6>

            {/* Items */}
            <div className="space-y-6 mb-8">
                {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#F1F1F1] rounded-lg flex items-center justify-center shrink-0">
                            <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h6 className="text-[15px] font-bold leading-[25px]">
                                {item.product.name
                                    .replace(" Headphones", "")
                                    .replace(" Speaker", "")
                                    .replace(" Earphones", "")
                                    .replace("Wireless ", "")}
                            </h6>
                            <p className="text-black/50 text-[14px] font-bold">
                                {formatPrice(item.product.price)}
                            </p>
                        </div>
                        <p className="text-black/50 text-[15px] font-bold">
                            x{item.quantity}
                        </p>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-black/50 uppercase text-[15px]">Total</span>
                    <span className="text-[18px] font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-black/50 uppercase text-[15px]">Shipping</span>
                    <span className="text-[18px] font-bold">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-black/50 uppercase text-[15px]">VAT (Included)</span>
                    <span className="text-[18px] font-bold">{formatPrice(vat)}</span>
                </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-black/50 uppercase text-[15px]">Grand Total</span>
                <span className="text-[18px] font-bold text-[#D87D4A]">
                    {formatPrice(grandTotal)}
                </span>
            </div>

            {/* Submit Button */}
            <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] py-4 transition-colors"
            >
                {isSubmitting ? "Processing..." : "Continue & Pay"}
            </button>
        </div>
    );
}