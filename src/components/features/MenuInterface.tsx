"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem, Category } from "@/types/menu";
import { MenuItemCard } from "@/components/features/MenuItemCard";
import { cn } from "@/lib/utils";

const CATEGORIES: Category[] = ["All", "Starters", "Mains", "Desserts", "Drinks"];

interface MenuInterfaceProps {
    initialItems: MenuItem[];
}

export function MenuInterface({ initialItems }: MenuInterfaceProps) {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredItems = activeCategory === "All"
        ? initialItems
        : initialItems.filter(item => item.category === activeCategory);

    return (
        <section aria-label="Menu Categories">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            activeCategory === cat
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <motion.div
                layout
                className="grid lg:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto"
            >
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MenuItemCard item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No items found in this category.
                </div>
            )}
        </section>
    );
}
