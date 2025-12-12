import Image from "next/image";
import { MenuItem } from "@/types/menu";

interface MenuItemCardProps {
    item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
    return (
        <article className="group flex flex-col md:flex-row gap-6 p-4 rounded-xl hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50">
            <div className="relative w-full md:w-48 h-48 md:h-32 shrink-0 overflow-hidden rounded-lg bg-secondary">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 200px"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-medium">
                        No Image
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                            {item.name}
                        </h3>
                        <span className="font-price font-semibold text-lg text-primary tracking-wide">
                            ₹{item.price}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="mt-4 flex gap-2">
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
