"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem, Category } from "@/types/menu";
import { MenuItemCard } from "@/components/features/MenuItemCard";
import { cn } from "@/lib/utils";

const CATEGORIES: Category[] = ["All", "Starters", "Mains", "Desserts", "Drinks"];
const INITIAL_VISIBLE_COUNT = 6;

interface MenuInterfaceProps {
    initialItems: MenuItem[];
}

/**
 * MenuInterface Component
 * 
 * Displays a filterable grid of menu items with pagination ("Load More") and smooth animations.
 * 
 * @param initialItems - The full list of menu items to display.
 */
export function MenuInterface({ initialItems }: MenuInterfaceProps) {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    // Filter items based on active category
    // Memoized to prevent unnecessary recalculations on re-renders unrelated to category/items
    const filteredItems = useMemo(() => {
        return activeCategory === "All"
            ? initialItems
            : initialItems.filter(item => item.category === activeCategory);
    }, [activeCategory, initialItems]);

    const visibleItems = filteredItems.slice(0, visibleCount);

    // Reset pagination when category changes to give a fresh view
    const handleCategoryChange = useCallback((cat: Category) => {
        setActiveCategory(cat);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }, []);

    // Increment visible count by the initial chunk size
    const handleLoadMore = useCallback(() => {
        setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
    }, []);

    return (
        <section aria-label="Menu Categories">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
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
                className="grid lg:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto"
            >
                <AnimatePresence mode="wait">
                    {visibleItems.map((item) => (
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

            {/* Load More Button */}
            {visibleCount < filteredItems.length && (
                <div className="mt-12 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
                    >
                        Load More ({filteredItems.length - visibleCount} remaining)
                    </button>
                </div>
            )}

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No items found in this category.
                </div>
            )}
        </section>
    );
}
