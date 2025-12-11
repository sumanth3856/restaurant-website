export type Category = "All" | "Starters" | "Mains" | "Desserts" | "Drinks";

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    image: string;
    tags?: string[]; // e.g., ["Vegan", "GF", "Spicy"]
    isAvailable: boolean;
}
