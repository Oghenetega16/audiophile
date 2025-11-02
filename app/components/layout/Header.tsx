"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getTotalItems, openCart } = useCart();
    const cartItemCount = getTotalItems();

    return (
        <header className="bg-[#191919] text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                <div className="flex items-center justify-between h-[90px] border-b border-white/10">
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="md:mr-auto">
                        <Image 
                            src="/assets/images/audiophile.png" 
                            alt="Audiophile logo" 
                            width={143}
                            height={25}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-8">
                            <li>
                                <Link 
                                    href="/" 
                                    className="hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/headphones" 
                                    className="hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                >
                                    Headphones
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/speakers" 
                                    className="hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                >
                                    Speakers
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/earphones" 
                                    className="hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                >
                                    Earphones
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Cart Icon */}
                    <button 
                        onClick={openCart}
                        className="relative hover:text-[#D87D4A] transition-colors"
                        aria-label="Shopping cart"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-6 border-b border-white/10">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link 
                                    href="/" 
                                    className="block hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/headphones" 
                                    className="block hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Headphones
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/speakers" 
                                    className="block hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Speakers
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/earphones" 
                                    className="block hover:text-[#D87D4A] transition-colors uppercase text-[13px] font-bold tracking-[2px]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Earphones
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}