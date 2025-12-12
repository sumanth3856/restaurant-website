import { Star, Quote } from "lucide-react";
import { Review } from "@/app/actions/reviews";

export function ReviewsList({ reviews }: { reviews: Review[] }) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground italic">
                No reviews yet. Be the first to share your experience!
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all relative group">
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/10 rotate-180" />

                    <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
                            />
                        ))}
                    </div>

                    <p className="text-foreground/80 mb-6 italic leading-relaxed min-h-[4.5rem]">
                        "{review.comment || "Rated " + review.rating + " stars"}"
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold font-serif">
                            {review.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-foreground text-sm">{review.name}</p>
                            <p className="text-xs text-muted-foreground">Certified Diner</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
