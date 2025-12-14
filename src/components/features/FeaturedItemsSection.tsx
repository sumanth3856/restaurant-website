import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export default async function FeaturedItemsSection() {
    const supabase = await createClient();

    let featuredItems = [];
    try {
        // Fetch 3 items to display
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .limit(3)
            .order('price', { ascending: false }); // Show expensive/premium items first? Or random?

        if (error) throw error;
        featuredItems = data || [];
    } catch (err) {
        console.error("Error fetching featured items:", err);
        return null;
    }

    if (!featuredItems || featuredItems.length === 0) {
        return null; // Hide section if no items
    }

    return (
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-4">
                        <span className="text-accent text-sm font-bold tracking-widest uppercase">Our Masterpieces</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                            Curated <span className="italic font-light">Selections</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            A glimpse into our culinary journey. Each dish is a testament to our passion for perfection.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2} direction="up">
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {featuredItems.map((item) => (
                            <div key={item.id} className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                                            <Utensils className="w-12 h-12 text-muted-foreground/30" />
                                        </div>
                                    )}
                                    {/* Price Tag */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                        <span className="font-price font-semibold text-primary">₹{item.price}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <span className="text-xs font-medium text-accent uppercase tracking-wider">{item.category}</span>
                                        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">{item.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                                        {item.description || "A delightful culinary experience."}
                                    </p>

                                    <div className="pt-4 border-t border-border flex items-center justify-between">
                                        <Link href="/menu" className="text-sm font-medium text-primary flex items-center gap-1 group/link">
                                            View Details
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="text-center mt-10 md:mt-12">
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all"
                        >
                            View Complete Menu
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
