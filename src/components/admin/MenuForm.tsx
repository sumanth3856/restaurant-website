"use client";

import { useState } from "react";
import { Loader, Upload, X } from "lucide-react";
import Image from "next/image";
// import removed

export interface MenuFormData {
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
}

interface MenuFormProps {
    initialData?: MenuFormData;
    onSubmit: (data: MenuFormData, imageFile: File | null) => Promise<void>;
    isSubmitting: boolean;
    buttonText: string;
}

export function MenuForm({ initialData, onSubmit, isSubmitting, buttonText }: MenuFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [price, setPrice] = useState(initialData?.price?.toString() || "");
    const [category, setCategory] = useState(initialData?.category || "Mains");
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            name,
            description,
            price: parseFloat(price),
            category,
        }, imageFile);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border border-border">
            <div className="space-y-4">
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">Dish Image</label>
                    <div className="flex items-center gap-4">
                        {imagePreview ? (
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                    }}
                                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-32 h-32 bg-secondary/30 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary/50 transition-colors relative">
                                <Upload className="w-8 h-8 mb-2" />
                                <span className="text-xs">Upload Photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                            <p>Recommended: 800x600px</p>
                            <p>JPG, PNG, WebP up to 2MB</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-lg border border-input bg-background"
                            placeholder="e.g. Truffle Risotto"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 rounded-lg border border-input bg-background"
                            placeholder="24.00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 rounded-lg border border-input bg-background"
                    >
                        <option value="Starters">Starters</option>
                        <option value="Mains">Mains</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded-lg border border-input bg-background h-24 resize-none"
                        placeholder="Describe the ingredients and flavors..."
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
                {isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : buttonText}
            </button>
        </form>
    );
}
