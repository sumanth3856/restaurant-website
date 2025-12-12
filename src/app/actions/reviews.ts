"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

export interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
}

export async function submitReview(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const rating = parseInt(formData.get("rating") as string);
    const comment = formData.get("comment") as string;

    if (!name || !rating) {
        return { success: false, error: "Name and rating are required" };
    }

    try {
        const { error } = await supabase
            .from("reviews")
            .insert([
                {
                    name,
                    rating,
                    comment,
                    status: 'pending' // Enforce pending status
                }
            ]);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        logger.error("Review submission error:", error);
        return { success: false, error: "Failed to submit review" };
    }
}

export async function getApprovedReviews(): Promise<Review[]> {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("reviews")
            .select("id, name, rating, comment, created_at")
            .eq("status", "approved")
            .order("created_at", { ascending: false })
            .limit(6);

        if (error) throw error;

        return data || [];
    } catch (error) {
        logger.error("Error fetching reviews:", error);
        return [];
    }
}

export async function getAllReviews() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        logger.error("Error fetching all reviews:", error);
        return [];
    }
}

export async function updateReviewStatus(id: number, status: 'approved' | 'rejected') {
    const supabase = await createClient();
    try {
        const { error } = await supabase
            .from("reviews")
            .update({ status })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/reviews");
        revalidatePath("/"); // Revalidate homepage to show approved reviews
        return { success: true };
    } catch (error) {
        logger.error("Error updating review status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function deleteReview(id: number) {
    const supabase = await createClient();
    try {
        const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/reviews");
        return { success: true };
    } catch (error) {
        logger.error("Error deleting review:", error);
        return { success: false, error: "Failed to delete review" };
    }
}
