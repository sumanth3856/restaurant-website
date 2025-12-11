import { Plus } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MenuActions } from "@/components/admin/MenuActions";

export const revalidate = 0;

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
}

export default async function AdminMenu() {
    const supabase = await createClient();
    const { data: menuItems, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true });

    if (error) console.error("Error fetching menu:", error);
    const items = (menuItems || []) as MenuItem[];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-serif font-bold text-primary">Menu Items</h1>
                    <p className="text-muted-foreground">Update availability and pricing.</p>
                </div>
                <Link href="/admin/menu/add" className="flex items-center gap-2 px-4 py-2 bg-accent text-black font-bold rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Add New Dish
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No menu items found. Add some to get started!
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden bg-secondary">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                                )}
                            </div>
                            <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <span className="font-mono text-primary">₹{item.price}</span>
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <MenuActions id={item.id} imageUrl={item.image} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
