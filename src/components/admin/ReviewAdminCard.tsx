"use client";

import { Check, X, Trash2, Loader2, Clock } from "lucide-react";
import { updateReviewStatus, deleteReview } from "@/app/actions/reviews";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Review {
    id: number;
    name: string;
    created_at: string;
    status: 'pending' | 'approved' | 'rejected';
    rating: number;
    comment: string;
}

interface ReviewCardProps {
    review: Review;
}

export function ReviewAdminCard({ review }: ReviewCardProps) {
    const [loading, setLoading] = useState(false);

    async function handleStatus(status: 'approved' | 'rejected') {
        setLoading(true);
        const loadingToast = toast.loading(`${status === 'approved' ? 'Approving' : 'Rejecting'} review...`);

        try {
            await updateReviewStatus(review.id, status);
            toast.success(`Review ${status}!`, { id: loadingToast });
        } catch (error) {
            toast.error(`Failed to ${status} review`, { id: loadingToast });
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this review?")) return;
        setLoading(true);
        const loadingToast = toast.loading("Deleting review...");

        try {
            await deleteReview(review.id);
            toast.success("Review deleted successfully!", { id: loadingToast });
        } catch (error) {
            toast.error("Failed to delete review", { id: loadingToast });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={cn(
            "p-6 bg-card rounded-xl border transition-all",
            review.status === 'pending' ? "border-accent/50 shadow-md ring-1 ring-accent/20" : "border-border",
            review.status === 'rejected' && "opacity-60 bg-secondary/30"
        )}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-serif font-bold text-primary">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground">{review.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span>•</span>
                            <span className={cn(
                                "capitalize font-medium px-2 py-0.5 rounded-full",
                                review.status === 'approved' && "bg-green-100 text-green-700",
                                review.status === 'pending' && "bg-yellow-100 text-yellow-700",
                                review.status === 'rejected' && "bg-red-100 text-red-700",
                            )}>
                                {review.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className={cn("w-1.5 h-1.5 rounded-full", s <= review.rating ? "bg-accent" : "bg-border")} />
                    ))}
                    <span className="ml-2 font-bold text-lg">{review.rating}</span>
                </div>
            </div>

            <p className="text-foreground/80 mb-6 italic bg-secondary/20 p-3 rounded-lg text-sm">
                "{review.comment || (review.rating + " Stars only")}"
            </p>

            <div className="flex justify-end gap-2">
                {review.status === 'pending' && (
                    <>
                        <button
                            onClick={() => handleStatus('approved')}
                            disabled={loading}
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            Approve
                        </button>
                        <button
                            onClick={() => handleStatus('rejected')}
                            disabled={loading}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-bold disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                            Reject
                        </button>
                    </>
                )}

                {review.status !== 'pending' && (
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-1.5 px-4 py-2 border border-border text-muted-foreground rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors text-sm font-bold disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
