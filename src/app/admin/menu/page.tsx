import { createClient } from "@/lib/supabase/server";
import { AdminMenuList } from "@/components/admin/AdminMenuList";

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

    return <AdminMenuList initialItems={items} />;
}
