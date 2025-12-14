import Image from "next/image";
import { MenuItem } from "@/types/menu";

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
    return (
        <article className="group grid gap-6 p-4 rounded-xl hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50 md:grid-cols-[12rem_1fr] items-start">
            {/* Image Container: Fixed width col on desktop (12rem) via grid, full width on mobile */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-full shrink-0 overflow-hidden rounded-lg bg-secondary min-h-[8rem]">
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
            </div>

            <div className="flex flex-col h-full justify-between gap-y-2">
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                            {item.name}
                        </h3>
                        <span className="font-price font-semibold text-lg text-primary tracking-wide whitespace-nowrap">
                            ₹{item.price}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {item.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground font-medium border border-border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
