import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/useCartStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MenuItemCardProps {
    item: MenuItem;
}

/**
 * MenuItemCard Component
 * 
 * Displays a single menu item with an image, price, description, and tags.
 * Uses CSS Grid for a stable, responsive layout that maintains alignment even with varying content lengths.
 */
export function MenuItemCard({ item }: MenuItemCardProps) {
    const { addItem } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price),
            image: item.image || undefined,
        });

        // Visual feedback
        toast.success(`${item.name} added to cart`);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <article className="group grid gap-6 p-4 rounded-xl hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50 md:grid-cols-[12rem_1fr] items-start">
            {/* Image Container: Fixed width col on desktop (12rem) via grid, full width on mobile */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-full shrink-0 overflow-hidden rounded-lg bg-secondary min-h-[8rem]">
                <Link href={`/menu/${item.id}`} className="block w-full h-full">
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 200px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-medium">
                            No Image
                        </div>
                    )}
                </Link>

                {/* Mobile Add Button Overlay (better reachability) */}
                <button
                    onClick={handleAdd}
                    className="md:hidden absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg active:scale-90 transition-transform"
                    aria-label="Add to cart"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-col h-full justify-between gap-y-2">
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                        <Link href={`/menu/${item.id}`} className="group-hover:underline decoration-primary/30 underline-offset-4">
                            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                        <span className="font-price font-semibold text-lg text-primary tracking-wide whitespace-nowrap">
                            ₹{item.price}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                </div>

                <div className="flex justify-between items-end mt-4 pt-2 border-t border-dashed border-border/50">
                    <div className="flex flex-wrap gap-2">
                        {item.tags?.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground font-medium border border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Desktop Add Button */}
                    <button
                        onClick={handleAdd}
                        className={cn(
                            "hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm",
                            isAdded
                                ? "bg-green-500 text-white"
                                : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                        )}
                    >
                        {isAdded ? (
                            <>
                                <span>Added</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}

