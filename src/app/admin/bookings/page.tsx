import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0; // Disable cache for admin

interface Booking {
    id: string;
    name: string;
    date: string;
    time: string;
    party_size: number;
    email: string;
    status: string;
}

export default async function AdminBookings() {
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

    if (error) console.error("Error fetching bookings:", error);

    const items = (bookings || []) as Booking[];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-serif font-bold text-primary">Reservations</h1>
                    <p className="text-muted-foreground">Manage upcoming table bookings.</p>
                </div>
                <Link href="/admin/bookings/add" className="px-4 py-2 bg-accent text-black font-bold rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
                    Add Reservation
                </Link>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/50 text-muted-foreground border-b border-border">
                            <tr>
                                <th className="p-4 font-medium">Guest</th>
                                <th className="p-4 font-medium">Date & Time</th>
                                <th className="p-4 font-medium">Party Size</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                items.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-secondary/20 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{booking.name}</td>
                                        <td className="p-4 text-muted-foreground">
                                            {booking.date} • {booking.time}
                                        </td>
                                        <td className="p-4 text-muted-foreground">{booking.party_size} Guests</td>
                                        <td className="p-4 text-muted-foreground">{booking.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs capitalize ${booking.status === 'confirmed'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-accent hover:underline">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
