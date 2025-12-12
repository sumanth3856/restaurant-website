import { getApprovedReviews } from "@/app/actions/reviews";
import { ReviewForm } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { FadeIn } from "@/components/ui/FadeIn";

export default async function ReviewsSection() {
    const reviews = await getApprovedReviews();

    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <span className="text-accent text-sm font-bold tracking-widest uppercase">Social Proof</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                            Guest <span className="italic font-light">Experiences</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Don't just take our word for it. Hear what our cherished guests have to say about their journey with us.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 items-start">
                    {/* Reviews Feed */}
                    <div className="lg:col-span-2">
                        <FadeIn delay={0.2} direction="right">
                            <ReviewsList reviews={reviews} />
                        </FadeIn>
                    </div>

                    {/* Submission Form */}
                    <div className="lg:col-span-1 sticky top-24">
                        <FadeIn delay={0.4} direction="left">
                            <ReviewForm />
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
