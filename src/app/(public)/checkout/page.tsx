"use client";

import { useCartStore } from "@/store/useCartStore";
import { submitOrder } from "@/app/actions/orders";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRateLimit } from "@/hooks/useRateLimit";

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const [state, formAction, isPending] = useActionState(submitOrder, {});
    const { isSubmitting, withRateLimit } = useRateLimit();

    // Hydration check
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Handle Success
    useEffect(() => {
        if (state.success) {
            clearCart();
            toast.success("Order Placed Successfully! 🎉");
        }
    }, [state.success, clearCart]);

    if (!mounted) return <div className="min-h-screen pt-32 flex justify-center"><Loader2 className="animate-spin" /></div>;

    // Empty Cart State
    if (items.length === 0 && !state.success) {
        return (
            <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center container max-w-md mx-auto text-center space-y-4 px-4">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-8 h-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-serif font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground">It looks like you haven&apos;t added any delicious items yet.</p>
                <Link href="/menu" className="btn-primary w-full">
                    Back to Menu
                </Link>
            </div>
        );
    }

    // Success State
    if (state.success) {
        return (
            <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center container max-w-md mx-auto text-center space-y-6 px-4">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-serif font-bold">Order Received!</h1>
                <p className="text-muted-foreground">
                    Thank you for your order. Your Order ID is <span className="font-mono font-bold text-foreground">#{state.orderId}</span>.
                    You will pay on delivery/pickup.
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg w-full text-sm">
                    Wait time: ~30-45 mins
                </div>
                <Link href="/" className="btn-primary w-full">
                    Back Home
                </Link>
            </div>
        );
    }

    const handleSubmit = (formData: FormData) => {
        withRateLimit(async () => {
            await formAction(formData);
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background to-secondary/20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/menu" className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Menu
                    </Link>
                    <h1 className="text-4xl font-serif font-bold text-foreground">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-[1fr_24rem] gap-12">

                    {/* Left: Form */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Delivery Details</h2>
                        <form action={handleSubmit} className="space-y-6">
                            {/* Hidden Fields for Order Data */}
                            <input type="hidden" name="items" value={JSON.stringify(items)} />
                            <input type="hidden" name="totalAmount" value={getCartTotal()} />

                            {/* Section 1: Contact Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                                    Contact Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-bold text-foreground/80 tracking-wide">Full Name</label>
                                        <input
                                            name="name"
                                            required
                                            type="text"
                                            className="input-field w-full h-12 bg-secondary/30 focus:bg-background border border-zinc-400 focus:border-primary/50 transition-all duration-300 rounded-xl px-4 font-medium"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-bold text-foreground/80 tracking-wide">Phone Number</label>
                                        <input
                                            name="phone"
                                            required
                                            type="tel"
                                            className="input-field w-full h-12 bg-secondary/30 focus:bg-background border border-zinc-400 focus:border-primary/50 transition-all duration-300 rounded-xl px-4 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-bold text-foreground/80 tracking-wide">Email Address</label>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="input-field w-full h-12 bg-secondary/30 focus:bg-background border border-zinc-400 focus:border-primary/50 transition-all duration-300 rounded-xl px-4 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Section 2: Delivery Details */}
                            <div className="space-y-4 pt-4 border-t border-border/50">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                                    Delivery Details
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-bold text-foreground/80 tracking-wide">Delivery Address</label>
                                    <textarea
                                        name="address"
                                        required
                                        className="input-field w-full min-h-[120px] bg-secondary/30 focus:bg-background border border-zinc-400 focus:border-primary/50 transition-all duration-300 rounded-xl p-4 font-medium resize-none leading-relaxed"
                                    ></textarea>
                                </div>
                            </div>

                            {state.error && (
                                <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20">
                                    {state.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending || isSubmitting}
                                className="btn-primary w-full h-12 text-lg font-bold flex items-center justify-center gap-2"
                            >
                                {(isPending || isSubmitting) ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Placing Order...
                                    </>
                                ) : (
                                    <>
                                        Confirm Order • Pay ₹{getCartTotal().toFixed(2)}
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-muted-foreground">
                                Payment will be collected upon delivery/pickup.
                            </p>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Order Summary</h2>
                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 mb-4">
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-secondary">
                                            {item.image && (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                                                <span className="font-mono text-sm">₹{item.price * item.quantity}</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {item.quantity} x ₹{item.price}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4 space-y-2 mt-4">
                                <div className="flex justify-between text-muted-foreground text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground text-sm">
                                    <span>Delivery Fee</span>
                                    <span>₹0.00</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-dashed border-border/50 text-primary">
                                    <span>Total</span>
                                    <span>₹{getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
