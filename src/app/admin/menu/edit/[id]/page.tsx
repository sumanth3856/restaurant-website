import MenuForm from "@/components/admin/MenuForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface EditMenuPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: item, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !item) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-primary mb-6">Edit Dish</h1>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <MenuForm initialData={item} />
            </div>
        </div>
    );
}
