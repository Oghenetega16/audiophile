"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getTotalItems, openCart } = useCart();
    const cartItemCount = getTotalItems();

    return (
        <>
            <header className="bg-[#191919] text-white relative z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                    <div className="flex items-center justify-between h-[90px] border-b border-white/10">
                        {/* Mobile Menu Button */}
                        <button 
                            className="lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 cursor-pointer" />
                            ) : (
                                <Menu className="w-6 h-6 cursor-pointer" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link href="/">
                            <Image 
                                src="/assets/images/audiophile.png" 
                                alt="Audiophile logo" 
                                width={143}
                                height={25}
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
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
                            className="relative cursor-pointer hover:text-[#D87D4A] transition-colors"
                            aria-label="Shopping cart"
                        >
                            <Image 
                                src="/assets/images/shopping-cart.png" 
                                alt="Shopping Cart" 
                                width={23}
                                height={20}
                            />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile/Tablet Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>

                    {/* Menu Content */}
                    <div className="fixed top-[90px] left-0 right-0 bg-white z-40 lg:hidden">
                        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-14">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                                {/* Headphones Category */}
                                <Link 
                                    href="/headphones"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-[#F1F1F1] rounded-lg pt-20 pb-6 px-6 text-center relative hover:opacity-80 transition-opacity"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Image 
                                            src="/assets/images/headphones.png"
                                            alt="Headphones"
                                            width={79.92}
                                            height={104}
                                            className="object-contain"
                                        />
                                    </div>
                                    <h6 className="text-[15px] font-bold tracking-wider mb-3 mt-4 text-black uppercase">Headphones</h6>
                                    <div className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[1px] text-black/50">
                                        Shop
                                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
                                        </svg>
                                    </div>
                                </Link>

                                {/* Speakers Category */}
                                <Link 
                                    href="/speakers"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-[#F1F1F1] rounded-lg pt-20 pb-6 px-6 text-center relative hover:opacity-80 transition-opacity"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Image 
                                            src="/assets/images/speakers.png"
                                            alt="Speakers"
                                            width={84.04}
                                            height={101}
                                            className="object-contain"
                                        />
                                    </div>
                                    <h6 className="text-[15px] font-bold tracking-wider mb-3 mt-4 text-black uppercase">Speakers</h6>
                                    <div className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[1px] text-black/50">
                                        Shop
                                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
                                        </svg>
                                    </div>
                                </Link>

                                {/* Earphones Category */}
                                <Link 
                                    href="/earphones"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-[#F1F1F1] rounded-lg pt-20 pb-6 px-6 text-center relative hover:opacity-80 transition-opacity"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Image 
                                            src="/assets/images/earphones.png"
                                            alt="Earphones"
                                            width={103}
                                            height={104}
                                            className="object-contain"
                                        />
                                    </div>
                                    <h6 className="text-[15px] font-bold tracking-wider mb-3 mt-4 text-black uppercase">Earphones</h6>
                                    <div className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[1px] text-black/50">
                                        Shop
                                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}