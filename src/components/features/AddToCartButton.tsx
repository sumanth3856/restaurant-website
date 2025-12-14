"use client";

import { useCartStore } from "@/store/useCartStore";
import { MenuItem } from "@/types/menu";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AddToCartButton({ item }: { item: MenuItem }) {
    const { addItem } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price),
            image: item.image || undefined,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={cn(
                "w-full md:w-auto h-14 px-8 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-95 hover:shadow-xl",
                isAdded
                    ? "bg-green-600 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
        >
            {isAdded ? (
                <>
                    <Check className="w-6 h-6" />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingBag className="w-6 h-6" />
                    Add to Cart
                </>
            )}
        </button>
    );
}
