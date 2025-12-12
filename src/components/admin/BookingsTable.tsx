"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check, X, Clock, MoreHorizontal, Calendar as CalendarIcon, Users, Phone, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/app/actions/bookingActions";

interface Booking {
    id: string;
    created_at: string;
    date: string;
    time: string;
    party_size: number;
    name: string;
    email: string;
    phone: string;
    requests?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

interface BookingsTableProps {
    initialBookings: Booking[];
}

export default function BookingsTable({ initialBookings }: BookingsTableProps) {
    const supabase = createClient();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [actionId, setActionId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

    const handleStatusUpdate = async (id: string, newStatus: Booking['status']) => {
        setLoadingId(id);
        setActionId(null);
        try {
            // Optimistic update
            setBookings(prev => prev.map(b =>
                b.id === id ? { ...b, status: newStatus } : b
            ));

            await updateBookingStatus(id, newStatus);

            // router.refresh() is handled by the server action's revalidatePath implicitly for other routes,
            // but we might still want it here to be safe or just rely on the setBookings for immediate feedback.
            router.refresh();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
            // Revert optimistic update (optional but good practice)
            router.refresh();
        } finally {
            setLoadingId(null);
        }
    };

    const filteredBookings = bookings.filter(b =>
        filter === 'all' ? true : b.status === filter
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 p-1 bg-secondary rounded-lg w-fit">
                {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all capitalize",
                            filter === f
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Guest</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-secondary/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-foreground">{booking.name}</div>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" /> {booking.party_size}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" /> {booking.phone}
                                                </div>
                                            </div>
                                            {booking.requests && (
                                                <div className="mt-2 text-xs italic text-accent/80">
                                                    "{booking.requests}"
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-medium">
                                                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                                {format(new Date(booking.date), 'MMM d, yyyy')}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                {booking.time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-bold border",
                                                getStatusColor(booking.status)
                                            )}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <div className="flex items-center justify-end gap-2">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                            disabled={loadingId === booking.id}
                                                            className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                                                            title="Confirm"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                            disabled={loadingId === booking.id}
                                                            className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                                                            title="Cancel"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status !== 'pending' && (
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setActionId(actionId === booking.id ? null : booking.id)}
                                                            className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
                                                            title="Options"
                                                        >
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>

                                                        {actionId === booking.id && (
                                                            <div className="absolute right-full top-0 mr-2 w-48 bg-card/85 backdrop-blur-md border border-border shadow-xl rounded-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-right">
                                                                <div className="p-1 space-y-0.5">
                                                                    <button
                                                                        onClick={() => handleStatusUpdate(booking.id, 'pending')}
                                                                        disabled={loadingId === booking.id}
                                                                        className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors font-medium flex items-center gap-2"
                                                                    >
                                                                        <MoreHorizontal className="w-4 h-4" />
                                                                        Mark as Pending
                                                                    </button>
                                                                    <div className="h-px bg-border/50 my-1" />
                                                                    <button
                                                                        onClick={() => setActionId(null)}
                                                                        className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors font-medium"
                                                                    >
                                                                        Go Back
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
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
