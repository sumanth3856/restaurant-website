"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export function CartDrawer() {
    const {
        isOpen,
        toggleCart,
        items,
        removeItem,
        updateQuantity,
        getCartTotal
    } = useCartStore();

    // Hydration mismatch fix: Wait for mount
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        // Sync zustand persistence if needed happens automatically
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-[2px]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-[1000] w-full max-w-md bg-background shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h2 className="text-3xl font-serif font-bold text-foreground tracking-tight">Cart</h2>
                                <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                                    {items.length} items
                                </span>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-secondary rounded-full transition-colors active:scale-95"
                            >
                                <X className="w-6 h-6 text-foreground/80 hover:text-foreground transition-colors" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-8 custom-scrollbar">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30" strokeWidth={1} />
                                    <p className="text-lg text-muted-foreground font-medium">Your cart is empty</p>
                                    <Link
                                        href="/menu"
                                        onClick={toggleCart}
                                        className="text-primary font-bold hover:underline tracking-wide"
                                    >
                                        Browse Menu
                                    </Link>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        {/* Image */}
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-secondary/30 flex-shrink-0">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                                                    <ShoppingBag className="w-6 h-6 text-muted-foreground/20" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-foreground text-lg leading-tight tracking-tight line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground/40 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-base font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-lg text-primary tracking-tight">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 border-t border-border/50 bg-background/95 backdrop-blur-md space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-muted-foreground text-base">
                                        <span>Subtotal</span>
                                        <span className="font-mono">₹{getCartTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-3xl font-serif font-bold text-foreground tracking-tight">
                                        <span>Total</span>
                                        <span>₹{getCartTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="w-full py-4 bg-primary text-primary-foreground text-lg font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/20 active:scale-[0.98]"
                                >
                                    Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>

            )}
        </AnimatePresence>
    );
}
