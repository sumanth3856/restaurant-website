import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-noise" />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
            alt="Delicious Food Spread"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay for Premium Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white text-xs font-medium tracking-[0.2em] uppercase border border-white/20 backdrop-blur-md mb-4 shadow-lg ring-1 ring-white/10">
            Est. 2024 • Maison Delish
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl">
            Taste the <span className="text-accent italic">Extraordinary</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg text-balance opacity-90">
            Where culinary artistry meets timeless elegance. Experience a symphony of flavors crafted with passion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/book"
              className="group relative px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] flex items-center gap-2"
            >
              Book a Table
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-lg backdrop-blur-sm border border-white/20 transition-all flex items-center"
            >
              View Menu
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Intro / Features Teaser */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary">
              Crafted with Passion,<br />Served with Love.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At Maison Delish, we believe that food is more than just sustenance—it&apos;s an experience. Our chefs meticulously select the finest local ingredients to create dishes that tell a story.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Locally sourced, organic ingredients",
                "Award-winning wine selection",
                "Intimate, modern atmosphere",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl skew-y-1">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
              alt="Chef plating food"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
