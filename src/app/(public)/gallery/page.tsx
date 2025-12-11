import Image from "next/image";

const images = [
    { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop", alt: "Signature Cocktail" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", alt: "Gourmet Entree" },
    { src: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=800&auto=format&fit=crop", alt: "Fine Dining Atmosphere" }, // Restaurant interior
    { src: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9f4?q=80&w=800&auto=format&fit=crop", alt: "Chef Preparation" }, // Chef
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", alt: "Interior Design" }, // Interior
    { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop", alt: "Dessert Selection" },
];

export default async function GalleryPage() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-accent font-medium tracking-wide uppercase text-sm">Visual Journey</span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">
                    Our Gallery
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A glimpse into our world. Experience the ambiance and artistry that defines Maison Delish.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
                {images.map((img, index) => {
                    // Creative Layout Logic
                    // Index 0: Large Hero (2x2)
                    // Index 1: Tall (1x2)
                    // Index 4: Wide (2x1)
                    let spanClass = "md:col-span-1 md:row-span-1";
                    if (index === 0) spanClass = "md:col-span-2 md:row-span-2";
                    else if (index === 1) spanClass = "md:col-span-1 md:row-span-2";
                    else if (index === 4) spanClass = "md:col-span-2 md:row-span-1";

                    return (
                        <div
                            key={index}
                            className={`relative rounded-2xl overflow-hidden group ${spanClass}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-white font-serif text-2xl font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {img.alt}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
