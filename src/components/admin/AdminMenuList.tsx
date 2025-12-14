"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Utensils } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MenuActions } from "@/components/admin/MenuActions";
import { cn } from "@/lib/utils";

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
}

interface AdminMenuListProps {
    initialItems: MenuItem[];
}

const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export function AdminMenuList({ initialItems }: AdminMenuListProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredItems = activeCategory === "All"
        ? initialItems
        : initialItems.filter(item => item.category === activeCategory);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-serif font-bold text-primary">Menu Manager</h1>
                    <p className="text-muted-foreground mt-1">Update availability and pricing.</p>
                </div>

                <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                    {/* Categories Tabs */}
                    <div className="flex p-1 bg-secondary/50 rounded-lg overflow-x-auto no-scrollbar w-full md:w-auto">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                                    activeCategory === cat
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/admin/menu/add"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95 ml-auto"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Add Dish</span>
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-full py-16 text-center bg-secondary/20 rounded-2xl border-2 border-dashed border-border"
                        >
                            <Utensils className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-lg font-medium text-muted-foreground">No items in {activeCategory}.</p>
                            {activeCategory !== "All" && (
                                <button
                                    onClick={() => setActiveCategory("All")}
                                    className="text-primary hover:underline text-sm mt-2"
                                >
                                    View all items
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="bg-card rounded-xl border border-border overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden bg-secondary">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <span className="text-xs font-bold px-2 py-1 bg-white/90 backdrop-blur-md rounded-full text-foreground shadow-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                                            <span className="font-mono text-primary font-semibold">₹{item.price}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                    </div>

                                    <div className="pt-4 border-t border-border mt-auto">
                                        <MenuActions id={item.id} imageUrl={item.image} />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
