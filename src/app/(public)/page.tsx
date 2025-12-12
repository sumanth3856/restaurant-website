import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ChefHat, Clock } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import FeaturedItemsSection from "@/components/features/FeaturedItemsSection";

export default async function Home() {
  console.log("--- RENDERING HOME PAGE (3D Version) ---");
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate loading for animations

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1920&auto=format&fit=crop"
            alt="Maison Delish High-End Dining"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Multi-layered Gradient for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md text-accent-foreground mb-4 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Star className="w-4 h-4 text-accent fill-accent animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-accent">Michelin Guide Recommended 2024</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70 italic">
                Senses
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Experience the symphony of flavors where culinary artistry meets
              <span className="text-white font-medium"> timeless elegance</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
              <Link
                href="/book"
                className="group relative px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold text-lg transition-all 
                shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Reserve a Table
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </Link>

              <Link
                href="/menu"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-semibold text-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all flex items-center gap-2 hover:-translate-y-1"
              >
                <ChefHat className="w-5 h-5" />
                Explore Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-white/50 z-20">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      <SectionDivider />

      <FeaturedItemsSection />

    </div>
  );
}
