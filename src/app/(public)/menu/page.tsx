import { supabase } from "@/lib/supabase";
import { MenuInterface } from "@/components/features/MenuInterface";
import { MenuItem } from "@/types/menu";

// Revalidate data every hour
export const revalidate = 3600;

export default async function MenuPage() {
    const { data: menuItems, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true });

    if (error) {
        console.error("Error fetching menu:", error);
    }

    // Fallback to empty array if error
    const items = (menuItems || []) as MenuItem[];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16 space-y-4">
                <span className="text-accent font-medium tracking-wide uppercase text-sm">Deliciously Carefully</span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">
                    Our Menu
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Explore our seasonal selection of dishes, crafted with passion and precision.
                </p>
            </div>

            <MenuInterface initialItems={items} />
        </div>
    );
}
