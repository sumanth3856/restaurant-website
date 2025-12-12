import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import BookingsTable from "@/components/admin/BookingsTable";

export const metadata = {
    title: "Bookings | Admin",
};

export default async function BookingsPage() {
    const supabase = await createClient();

    const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: false })
        .order('time', { ascending: true });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Reservations</h1>
                    <p className="text-muted-foreground mt-1">Manage table bookings and requests.</p>
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    {bookings?.length || 0} Total Bookings
                </div>
            </div>

            <BookingsTable initialBookings={bookings || []} />
        </div>
    );
}
