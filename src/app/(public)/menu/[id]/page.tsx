import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddToCartButton } from "@/components/features/AddToCartButton"; // Refactoring button for client-side interactivity in server component page

export default async function MenuItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch item
    const { data: item, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !item) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link href="/menu" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Menu
                </Link>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Image */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary shadow-xl">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 500px"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 rounded-full bg-secondary text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    {item.category}
                                </span>
                                {item.tags?.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 rounded-full border border-border text-sm text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                                {item.name}
                            </h1>
                            <p className="text-3xl font-bold text-primary">₹{item.price}</p>
                        </div>

                        <div className="prose prose-lg text-muted-foreground">
                            <p>{item.description}</p>
                            <p>
                                <strong>Chef's Note:</strong> Prepared with fresh ingredients locally sourced.
                                Perfect for {item.category === 'Desserts' ? 'a sweet ending' : 'sharing or enjoying solo'}.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-border">
                            <AddToCartButton item={item} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
