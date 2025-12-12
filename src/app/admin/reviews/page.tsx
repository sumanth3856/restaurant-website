import { getAllReviews } from "@/app/actions/reviews";
import { ReviewAdminCard } from "@/components/admin/ReviewAdminCard";
import { MessageSquare, AlertCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    const reviews = await getAllReviews();
    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const pastReviews = reviews.filter(r => r.status !== 'pending');

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-serif font-bold text-primary mb-2">Review Management</h1>
                <p className="text-muted-foreground">Approve or reject customer feedback.</p>
            </div>

            {/* Pending Reviews Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-bold font-serif">Pending Approval ({pendingReviews.length})</h2>
                </div>

                {pendingReviews.length === 0 ? (
                    <div className="p-8 bg-card rounded-xl border border-dashed border-border text-center text-muted-foreground">
                        No pending reviews to review. Great job!
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {pendingReviews.map(review => (
                            <ReviewAdminCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </div>

            {/* History Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-bold font-serif opacity-70">Review History</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                    {pastReviews.map(review => (
                        <ReviewAdminCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}
