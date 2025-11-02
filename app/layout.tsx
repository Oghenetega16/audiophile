import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "700", "800"],
    variable: '--font-manrope',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "My Ecommerce Store",
    description: "Premium audio equipment ecommerce store",
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body 
                className={`${manrope.variable} antialiased`}
                suppressHydrationWarning
            >   
                <CartProvider>
                    <Header />
                    <CartDrawer />
                    {children}
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}