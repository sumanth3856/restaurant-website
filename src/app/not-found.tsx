"use client";

import Link from "next/link";
import { ArrowLeft, Home, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />

            <div className="relative z-10 container px-4 flex flex-col items-center text-center">

                {/* Animated 404 Graphic */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative mb-8"
                >
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        <h1 className="text-[12rem] md:text-[16rem] font-serif font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/20 to-transparent select-none">
                            404
                        </h1>

                        {/* Floating elements overlaying the number */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-full shadow-2xl border border-border"
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <UtensilsCrossed className="w-16 h-16 text-primary" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6 max-w-lg mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                        Order Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        It looks like this dish isn't on our menu anymore.
                        The chef might have scraped it, or it was just a figment of our culinary imagination.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </motion.button>
                        </Link>

                        <Link href="/menu">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full hover:bg-secondary/80 transition-colors border border-border"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Browse Menu
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
