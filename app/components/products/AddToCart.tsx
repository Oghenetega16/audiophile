"use client";

import { useState } from "react";
import { Product } from "@/app/lib/products";
import { useCart } from "@/app/context/CartContext";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
    openCart(); // Open cart drawer after adding item
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quantity Selector */}
      <div className="bg-[#F1F1F1] flex items-center">
        <button
          onClick={handleDecrease}
          className="px-4 py-4 hover:text-[#D87D4A] transition-colors text-black/25 font-bold"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-4 font-bold text-[13px] tracking-[1px]">
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          className="px-4 py-4 hover:text-[#D87D4A] transition-colors text-black/25 font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}