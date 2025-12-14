"use client";

import Link from "next/link";
import { ShieldAlert, Lock, ArrowLeft, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function AccessDenied() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white relative overflow-hidden selection:bg-red-500/30">

            {/* Background Animated Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-[128px] animate-pulse delay-700" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

            <div className="relative z-10 flex flex-col items-center max-w-2xl px-4 text-center">

                {/* Animated Icon Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative mb-8 group"
                >
                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full group-hover:bg-red-500/30 transition-all duration-500" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/20">
                        <motion.div
                            animate={{
                                rotate: [0, -10, 10, -10, 10, 0],
                                transition: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 2,
                                    repeatDelay: 3
                                }
                            }}
                        >
                            <Lock className="w-10 h-10 text-red-500" />
                        </motion.div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border border-red-400 shadow-lg"
                    >
                        403
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                        Access Restricted
                    </h1>
                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                        Your IP address is not authorized to access this secure area.
                        <br className="hidden md:block" />
                        This attempt has been logged.
                    </p>
                </motion.div>

                {/* Terminal Effect Box */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mb-8 font-mono text-xs text-left"
                >
                    <div className="flex gap-1.5 mb-3 border-b border-zinc-800 pb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-1 text-zinc-500">
                        <p> initiating_security_protocol...</p>
                        <p> verifying_identity...</p>
                        <p className="text-red-400">error: unauthorized_ip_detected</p>
                        <p className="text-red-400">access_denied</p>
                        <p> <span className="animate-pulse">_</span></p>
                    </div>
                </motion.div>

                {/* Action Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Safety
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
