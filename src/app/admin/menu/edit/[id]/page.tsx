"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import dynamic from 'next/dynamic';

const MenuForm = dynamic(
    () => import("@/components/admin/MenuForm").then((mod) => mod.MenuForm),
    { loading: () => <div className="flex justify-center p-12"><Loader className="animate-spin w-8 h-8 text-primary" /></div> }
);
import { MenuFormData } from "@/components/admin/MenuForm";

interface MenuItem extends MenuFormData {
    id: string;
}

export default function EditMenuItem() {
    const router = useRouter();
    const params = useParams();
    const supabase = createClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [initialData, setInitialData] = useState<MenuItem | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error("Error fetching item:", error);
                setError("Failed to load item.");
            } else {
                setInitialData(data);
            }
            setIsLoading(false);
        };

        if (params.id) fetchItem();
    }, [params.id, supabase]);

    const handleUpdate = async (data: MenuFormData, imageFile: File | null) => {
        if (!initialData) return;
        setIsSubmitting(true);
        setError("");

        try {
            let imageUrl = initialData.image; // Default to existing

            // 1. Upload NEW Image if provided
            if (imageFile) {
                // Determine file path (could delete old one, but keeping history is safer for now or just overwriting)
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('menu-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('menu-images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // 2. Update DB
            const { error: updateError } = await supabase
                .from('menu_items')
                .update({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image: imageUrl,
                })
                .eq('id', params.id);

            if (updateError) throw updateError;

            router.push('/admin/menu');
            router.refresh();
        } catch (err) {
            console.error("Error updating item:", err);
            setError(err instanceof Error ? err.message : "Failed to update item.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="p-12 flex justify-center"><Loader className="animate-spin w-8 h-8 text-primary" /></div>;
    if (!initialData) return <div className="p-12 text-center text-red-500">Item not found.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/menu" className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-serif font-bold text-primary">Edit Dish</h1>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <div className="max-w-2xl">
                <MenuForm
                    initialData={initialData}
                    onSubmit={handleUpdate}
                    isSubmitting={isSubmitting}
                    buttonText="Save Changes"
                />
            </div>
        </div>
    );
}
