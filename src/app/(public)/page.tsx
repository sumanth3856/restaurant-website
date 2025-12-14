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
          <video
            className="object-cover w-full h-full object-center md:scale-105"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/hero-video.webm" type="video/webm" />
          </video>
          {/* Lighter Gradient for Better Image Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />
          <div className="absolute inset-0 bg-black/0" />
          {/* Cinematic Dark Overlay for Maximum Contrast */}
          <div className="absolute inset-0 bg-black/0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 flex-grow flex flex-col justify-end items-center h-full pb-10 pt-24 md:pt-32">
          <FadeIn className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10" delay={0.2}>

            {/* Premium Eyebrow */}
            {/* <div className="flex items-center justify-center gap-4 animate-fade-in">
              <div className="h-[1px] w-12 bg-white/40" />
              <span className="text-white/80 font-medium tracking-[0.3em] text-sm uppercase">Est. 2024</span>
              <div className="h-[1px] w-12 bg-white/40" />
            </div> */}

            {/* Main Headline */}
            {/* <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              Taste the <br className="hidden md:block" />
              <span className="italic text-primary/90">Extraordinary</span>
            </h1> */}

            {/* Subheadline */}
            {/* <p className="text-lg md:text-2xl text-white font-normal max-w-2xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              A culinary journey that transcends the ordinary. Experience artistry on every plate.
            </p> */}

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
