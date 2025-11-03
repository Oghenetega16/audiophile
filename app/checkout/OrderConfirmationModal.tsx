"use client";

import Image from "next/image";
import { CartItem } from "../context/CartContext";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  items: CartItem[];
  grandTotal: number;
  onClose: () => void;
}

export default function OrderConfirmationModal({
  isOpen,
  items,
  grandTotal,
  onClose,
}: OrderConfirmationModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-start md:items-center justify-center z-50 p-6 md:p-0 overflow-y-auto">
        <div className="bg-white rounded-lg p-8 md:p-12 max-w-[540px] w-full my-auto">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mb-6">
            <svg width="24" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 9l6 6L22 2"
                stroke="#FFF"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-[32px] font-bold tracking-wider leading-tight mb-4 uppercase">
            Thank you<br />for your order
          </h3>

          {/* Subtitle */}
          <p className="text-black/50 mb-6 text-[15px] leading-[25px]">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary Box */}
          <div className="rounded-lg overflow-hidden mb-6 md:mb-8 grid md:grid-cols-[1fr_auto]">
            {/* Items Section */}
            <div className="bg-[#F1F1F1] p-6">
              {items.length > 0 && (
                <>
                  {/* First Item */}
                  <div className="flex items-center gap-4">
                    <div className="w-[50px] h-[50px] bg-[#F1F1F1] rounded-lg flex items-center justify-center shrink-0">
                      <Image
                        src={items[0].product.image}
                        alt={items[0].product.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="text-[15px] font-bold leading-[25px] truncate uppercase">
                        {items[0].product.name
                          .replace(" Headphones", "")
                          .replace(" Speaker", "")
                          .replace(" Earphones", "")
                          .replace("Wireless ", "")}
                      </h6>
                      <p className="text-black/50 text-[14px] font-bold leading-[25px]">
                        {formatPrice(items[0].product.price)}
                      </p>
                    </div>
                    <p className="text-black/50 text-[15px] font-bold">
                      x{items[0].quantity}
                    </p>
                  </div>

                  {/* Other Items Count */}
                  {items.length > 1 && (
                    <>
                      <hr className="my-3 border-black/10" />
                      <p className="text-black/50 text-[12px] font-bold text-center">
                        and {items.length - 1} other item{items.length > 2 ? "s" : ""}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Grand Total Section */}
            <div className="bg-black text-white p-6 flex flex-col justify-center md:min-w-[198px]">
              <p className="text-white/50 uppercase text-[15px] mb-2 font-medium tracking-wider">
                Grand Total
              </p>
              <p className="text-[18px] font-bold">
                {formatPrice(grandTotal)}
              </p>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={onClose}
            className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] py-[15px] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}