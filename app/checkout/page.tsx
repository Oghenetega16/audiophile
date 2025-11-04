"use client";

import { useMutation, useAction } from "convex/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import OrderConfirmationModal from "./OrderConfirmationModal";
import Summary from "./Summary";

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCart();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"emoney" | "cash">("emoney");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Convex mutations
    const createOrder = useMutation(api.orders.createOrder);
    const sendOrderConfirmation = useAction(api.emails.sendOrderConfirmation);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        country: "",
        emoneyNumber: "",
        emoneyPin: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Wrong format";
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        // ZIP validation
        if (!formData.zip.trim()) {
            newErrors.zip = "ZIP code is required";
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        // Country validation
        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
        }

        // e-Money validation (only if e-Money payment is selected)
        if (paymentMethod === "emoney") {
            if (!formData.emoneyNumber.trim()) {
                newErrors.emoneyNumber = "e-Money Number is required";
            }
            if (!formData.emoneyPin.trim()) {
                newErrors.emoneyPin = "e-Money PIN is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const subtotal = getTotalPrice();
            const shipping = 50;
            const vat = subtotal * 0.2;
            const total = subtotal + shipping;

            // Create order in Convex
            const result = await createOrder({
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                    country: formData.country,
                },
                items: items.map((item) => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                })),
                subtotal,
                shipping,
                vat,
                total,
                paymentMethod,
            });

            // Send confirmation email
            await sendOrderConfirmation({
                orderNumber: result.orderNumber,
                customerName: formData.name,
                customerEmail: formData.email,
                items: items.map((item) => ({
                    productName: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                })),
                total,
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                    country: formData.country,
                },
            });

            setOrderNumber(result.orderNumber);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error creating order:", error);
            alert("There was an error processing your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmOrder = () => {
        clearCart();
        setShowConfirmation(false);
        router.push("/");
    };

    // Calculate totals
    const subtotal = getTotalPrice();
    const shipping = 50;
    const grandTotal = subtotal + shipping;

    // Redirect if cart is empty and not showing confirmation
    if (items.length === 0 && !showConfirmation) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                <h2 className="mb-6">Your Cart is Empty</h2>
                <p className="text-black/50 mb-8 text-center">Add some products to your cart before checking out.</p>
                <Link
                    href="/"
                    className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold tracking-[1px] px-8 py-4 transition-colors"
                >
                    Go Shopping
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-[#F1F1F1]">
            {/* Go Back */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-20 pb-6">
                <Link
                    href="/"
                    className="text-black/50 hover:text-[#D87D4A] transition-colors text-[15px]"
                >
                    Go Back
                </Link>
            </section>

            {/* Checkout Form */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-lg p-6 md:p-12">
                        <h3 className="mb-10">Checkout</h3>

                        {/* Billing Details */}
                        <div className="mb-12">
                            <p className="subtitle text-[#D87D4A] mb-4">Billing Details</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Alexei Ward"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.name ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.name && (<p className="text-red-500 text-[12px] mt-1">{errors.name}</p>)}
                                </div>

                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="alexei@mail.com"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.email ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.email && (<p className="text-red-500 text-[12px] mt-1">{errors.email}</p>)}
                                </div>

                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 202-555-0136"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.phone ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.phone && (<p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>)}
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="mb-12">
                            <p className="subtitle text-[#D87D4A] mb-4">Shipping Info</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="1137 Williams Avenue"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.address ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.address && (<p className="text-red-500 text-[12px] mt-1">{errors.address}</p>)}
                                </div>

                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        placeholder="10001"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.zip ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.zip && (<p className="text-red-500 text-[12px] mt-1">{errors.zip}</p>)}
                                </div>

                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.city ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.city && (<p className="text-red-500 text-[12px] mt-1">{errors.city}</p>)}
                                </div>

                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder="United States"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 border ${
                                            errors.country ? "border-red-500" : "border-[#CFCFCF]"
                                        } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                    {errors.country && (<p className="text-red-500 text-[12px] mt-1">{errors.country}</p>)}
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div>
                            <p className="subtitle text-[#D87D4A] mb-4">Payment Details</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">Payment Method</label>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-4 border border-[#CFCFCF] rounded-lg px-6 py-4 cursor-pointer hover:border-[#D87D4A]">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="emoney"
                                            checked={paymentMethod === "emoney"}
                                            onChange={() => setPaymentMethod("emoney")}
                                            disabled={isSubmitting}
                                            className="w-5 h-5 accent-[#D87D4A] disabled:cursor-not-allowed"
                                        />
                                        <span className="text-[14px] font-bold">e-Money</span>
                                    </label>
                                    <label className="flex items-center gap-4 border border-[#CFCFCF] rounded-lg px-6 py-4 cursor-pointer hover:border-[#D87D4A]">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cash"
                                            checked={paymentMethod === "cash"}
                                            onChange={() => setPaymentMethod("cash")}
                                            disabled={isSubmitting}
                                            className="w-5 h-5 accent-[#D87D4A] disabled:cursor-not-allowed"
                                        />
                                        <span className="text-[14px] font-bold">Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === "emoney" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">e-Money Number</label>
                                        <input
                                            type="text"
                                            name="emoneyNumber"
                                            value={formData.emoneyNumber}
                                            onChange={handleInputChange}
                                            placeholder="238521993"
                                            disabled={isSubmitting}
                                            className={`w-full px-6 py-4 border ${
                                                errors.emoneyNumber ? "border-red-500" : "border-[#CFCFCF]"
                                            } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                        />
                                        {errors.emoneyNumber && (<p className="text-red-500 text-[12px] mt-1">{errors.emoneyNumber}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-[12px] font-bold tracking-[-0.21px] mb-2">e-Money PIN</label>
                                        <input
                                            type="text"
                                            name="emoneyPin"
                                            value={formData.emoneyPin}
                                            onChange={handleInputChange}
                                            placeholder="6891"
                                            disabled={isSubmitting}
                                            className={`w-full px-6 py-4 border ${
                                                errors.emoneyPin ? "border-red-500" : "border-[#CFCFCF]"
                                            } rounded-lg focus:border-[#D87D4A] outline-none text-[14px] font-bold disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                        />
                                        {errors.emoneyPin && (<p className="text-red-500 text-[12px] mt-1">{errors.emoneyPin}</p>)}
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "cash" && (
                                <div className="flex gap-8 mt-6">
                                    <div className="w-12 h-12 shrink-0">
                                        <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.406-1.406h-5.335a17.01 17.01 0 0 0-3.343-3.32 1.406 1.406 0 0 0-1.912.494L23.694 7.68a1.406 1.406 0 0 0 .494 1.912 14.225 14.225 0 0 1 4.466 4.057l-3.833 5.24c-.318.435-.22 1.044.216 1.362a1 1 0 0 0 .573.184c.32 0 .635-.156.824-.456l3.833-5.24a17.043 17.043 0 0 0 2.605 5.11l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.406-1.406H23.28c-.448 0-.869.213-1.134.574l-3.833 5.24c-.318.435-.22 1.044.216 1.362a1 1 0 0 0 .573.184c.32 0 .635-.156.824-.456l3.833-5.24c.318-.435.22-1.044-.216-1.362a14.225 14.225 0 0 1-4.466-4.057l3.833-5.24c.318-.435.22-1.044-.216-1.362a1.406 1.406 0 0 0-1.912.494l-4.694 6.417a1.406 1.406 0 0 0 .494 1.912 17.01 17.01 0 0 0 3.343 3.32h-5.335a1.406 1.406 0 0 0-1.406 1.406c0 .74.296.755 2.864 4.285a1.15 1.15 0 1 1-1.848 1.37l-2.694-3.674c-.265-.361-.686-.574-1.134-.574H1.406A1.406 1.406 0 0 0 0 9.844V46.594a1.406 1.406 0 0 0 1.406 1.406h45.188a1.406 1.406 0 0 0 1.406-1.406V9.844a1.406 1.406 0 0 0-1.406-1.406ZM29.375 14.844h14.063v3.375H29.375v-3.375Zm0 6.75h14.063v3.375H29.375v-3.375ZM4.563 11.25h3.375v3.375H4.562V11.25Zm0 6.75h3.375v3.375H4.562V18Zm0 6.75h3.375v3.375H4.562v-3.375Zm7.875 19.688H4.563v-3.376h7.875v3.376Zm0-6.75H4.563v-3.376h7.875v3.376Zm0-6.75H4.563v-3.376h7.875v3.376Zm19.688 13.5H18v-3.376h14.063v3.376Zm0-6.75H18v-3.376h14.063v3.376Zm0-6.75H18v-3.376h14.063v3.376Zm19.687 13.5h-7.875v-3.376h7.875v3.376Zm0-6.75h-7.875v-3.376h7.875v3.376Zm0-6.75h-7.875v-3.376h7.875v3.376Zm-7.875-6.75h7.875v3.375h-7.875v-3.375Zm0-6.75h7.875v3.375h-7.875V11.25Z" fill="#D87D4A"/>
                                        </svg>
                                    </div>
                                    <p className="text-black/50 text-[15px]">
                                        The &apos;Cash on Delivery&apos; option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>

                    {/* Summary Component */}
                    <Summary 
                        items={items} 
                        onSubmit={handleSubmit} 
                        isSubmitting={isSubmitting}
                    />
                </div>
            </section>

            {/* Order Confirmation Modal */}
            <OrderConfirmationModal
                isOpen={showConfirmation}
                items={items}
                grandTotal={grandTotal}
                orderNumber={orderNumber}
                onClose={handleConfirmOrder}
            />
        </main>
    );
}