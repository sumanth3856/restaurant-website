"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';

const MenuForm = dynamic(
    () => import("@/components/admin/MenuForm").then((mod) => mod.MenuForm),
    { loading: () => <div className="flex justify-center p-12"><Loader className="animate-spin w-8 h-8 text-primary" /></div> }
);
import { MenuFormData } from "@/components/admin/MenuForm";

export default function AddMenuItem() {
    const router = useRouter();
    const supabase = createClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (data: MenuFormData, imageFile: File | null) => {
        setIsSubmitting(true);
        setError("");

        try {
            let imageUrl = null;

            // 1. Upload Image if exists
            if (imageFile) {
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

            // 2. Insert into DB
            const { error: insertError } = await supabase
                .from('menu_items')
                .insert([{
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image: imageUrl,
                }]);

            if (insertError) throw insertError;

            router.push('/admin/menu');
            router.refresh();
        } catch (err) {
            console.error("Error creating item:", err);
            setError(err instanceof Error ? err.message : "Failed to create item.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/menu" className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-serif font-bold text-primary">Add New Dish</h1>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <div className="max-w-2xl">
                <MenuForm
                    onSubmit={handleCreate}
                    isSubmitting={isSubmitting}
                    buttonText="Create Dish"
                />
            </div>
        </div>
    );
}
