'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    const supabase = await createClient();

    const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

    if (error) {
        throw new Error('Failed to update booking status');
    }

    // Revalidate both the list and the dashboard
    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
}
