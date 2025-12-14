"use client";

import { motion } from "framer-motion";

export function LoginLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
            <motion.div
                className="relative w-24 h-24"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border-4 border-primary/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Spinning Cutlery/Icon Metaphor with Segment */}
                <motion.div
                    className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-lg font-serif font-bold text-primary animate-pulse"
            >
                Accessing Kitchen...
            </motion.p>
        </div>
    );
}
