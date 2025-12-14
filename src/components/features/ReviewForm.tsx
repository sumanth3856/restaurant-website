"use client";

import { useState } from "react";
import { Star, Loader, CheckCircle, User, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { submitReview } from "@/app/actions/reviews";
import { cn } from "@/lib/utils";

import { useRateLimit } from "@/hooks/useRateLimit";

export function ReviewForm() {
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState(0);
    const { isSubmitting, withRateLimit } = useRateLimit();
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(formData: FormData) {
        await withRateLimit(async () => {
            formData.append("rating", rating.toString());
            const result = await submitReview(formData);

            if (result.success) {
                setIsSuccess(true);
            } else {
                toast.error(result.error);
            }
        });
    }

    if (isSuccess) {
        return (
            <div className="text-center p-12 bg-card rounded-2xl border border-border shadow-lg animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Thank You!</h3>
                <p className="text-muted-foreground leading-relaxed">
                    Your review has been submitted and is pending approval. We appreciate your feedback!
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-sm font-bold text-primary hover:underline"
                >
                    Write another review
                </button>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="space-y-8 bg-card p-8 rounded-2xl border border-border shadow-lg sticky top-24">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-serif font-bold text-primary">Share Your Experience</h3>
                <p className="text-sm text-muted-foreground">How was your meal at Maison Delish?</p>
            </div>

            <div className="space-y-4 bg-secondary/20 p-6 rounded-xl border border-border/50">
                <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            aria-label={`Rate ${star} stars`}
                            className="p-1.5 transition-all hover:scale-110 focus:outline-none"
                        >
                            <Star
                                className={cn(
                                    "w-8 h-8 transition-colors drop-shadow-sm",
                                    (hoveredRating ? star <= hoveredRating : star <= rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-muted-foreground/20"
                                )}
                            />
                        </button>
                    ))}
                </div>
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        {hoveredRating || rating} Stars
                    </span>
                </div>
                <input type="hidden" name="rating" value={rating} />
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-accent" />
                        <label htmlFor="name" className="text-sm font-bold text-foreground">Your Name</label>
                        <Sparkles className="w-2.5 h-2.5 text-accent fill-accent animate-pulse" />
                    </div>
                    <input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        className="w-full p-3.5 rounded-lg bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all shadow-sm placeholder:text-muted-foreground/50"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-accent" />
                        <label htmlFor="comment" className="text-sm font-bold text-foreground">Comments (Optional)</label>
                    </div>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={5}
                        className="w-full p-3.5 rounded-lg bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all resize-none shadow-sm placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <span>Submit Review</span>
                    </>
                )}
            </button>
        </form>
    );
}
