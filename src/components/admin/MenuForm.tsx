"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { upsertMenuItem } from "@/app/actions/menuActions";

// Schema
const menuSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be positive"),
    category: z.string().min(1, "Category is required"),
    image: z.string().optional(),
});

type MenuFormValues = z.infer<typeof menuSchema>;

interface MenuFormProps {
    initialData?: MenuFormValues & { id?: string };
}

const CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks"];

// Helper for required label
const RequiredLabel = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1.5 mb-1.5">
        <label className="text-sm font-bold text-foreground Tracking-wide">{label}</label>
        <Sparkles className="w-3 h-3 text-accent fill-accent animate-pulse" />
    </div>
);

export default function MenuForm({ initialData }: MenuFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image || null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || 0,
            category: initialData?.category || CATEGORIES[0],
            image: initialData?.image || "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('menu-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const onSubmit = async (data: MenuFormValues) => {
        setLoading(true);
        try {
            let imageUrl = data.image;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const payload = {
                ...data,
                image: imageUrl,
            };

            await upsertMenuItem(payload, initialData?.id);

            router.push("/admin/menu");
            router.refresh();
        } catch (error) {
            console.error("Error saving menu item:", error);
            alert("Failed to save menu item. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <RequiredLabel label="Name" />
                        <input
                            {...register("name")}
                            className="w-full p-2.5 rounded-lg border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-sm font-medium"
                            placeholder="e.g. Truffle Pasta"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <RequiredLabel label="Price (₹)" />
                        <input
                            type="number"
                            step="0.01"
                            {...register("price")}
                            className="w-full p-2.5 rounded-lg border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-sm font-mono"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <RequiredLabel label="Category" />
                        <select
                            {...register("category")}
                            className="w-full p-2.5 rounded-lg border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-accent/20 outline-none transition-all shadow-sm"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px] relative bg-secondary/20">
                        {previewUrl ? (
                            <div className="relative w-full h-full min-h-[200px]">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewUrl(null);
                                        setImageFile(null);
                                        setValue("image", "");
                                    }}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Click to upload image</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Describe the dish..."
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData?.id ? "Update Item" : "Create Item"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
