import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionDivider } from "@/components/ui/SectionDivider";
import FeaturedItemsSection from "@/components/features/FeaturedItemsSection";
import { FeaturedItemsSkeleton } from "@/components/features/FeaturedItemsSkeleton";
import { FadeIn } from "@/components/ui/FadeIn";
import ReviewsSection from "@/components/features/ReviewsSection";
import { ReviewsSkeleton } from "@/components/features/ReviewsSkeleton";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Overhead view of a vibrant social dining experience at Maison Delish"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
            sizes="100vw"
            quality={100}
          />
          {/* Lighter Gradient for Better Image Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-black/20" />
          {/* Spotlight Effect behind text */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,transparent_70%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 flex-grow flex flex-col justify-center items-center h-full pb-12 pt-32">
          <FadeIn className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10" delay={0.2}>

            {/* Premium Eyebrow */}
            <div className="inline-flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white/40 backdrop-blur-md px-8 py-2 rounded-full border border-white/20 shadow-sm">
              <div className="h-[1px] w-8 md:w-16 bg-black/60"></div>
              <span className="text-black uppercase tracking-[0.3em] text-xs md:text-sm font-bold">Est. 2024</span>
              <div className="h-[1px] w-8 md:w-16 bg-black/60"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white tracking-wide leading-[1.1] drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              <span className="block mb-2 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">Taste the</span>
              <span className="font-thin italic drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">Extraordinary</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-2xl text-white font-normal max-w-2xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              A culinary journey that transcends the ordinary. Experience artistry on every plate.
            </p>

            {/* CTA Buttons - Premium Minimalist */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
              <Link
                href="/book"
                className="group relative px-10 py-4 bg-white text-black rounded-full font-serif font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Reserve Your Table
                </span>
              </Link>

              <Link
                href="/menu"
                className="group px-10 py-4 bg-transparent hover:bg-white/10 text-white rounded-full font-serif font-medium text-lg border border-white/40 hover:border-white transition-all duration-300 backdrop-blur-sm flex items-center gap-3"
              >
                View Menu
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      <Suspense fallback={<FeaturedItemsSkeleton />}>
        <FeaturedItemsSection />
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsSection />
      </Suspense>

    </div>
  );
}
