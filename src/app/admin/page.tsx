import { Users, CalendarCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch stats from Supabase
    const { count: bookingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });

    // Calculate Avg Party Size (real data)
    const { data: allBookings } = await supabase.from('bookings').select('party_size');
    const totalGuests = allBookings?.reduce((sum, b) => sum + b.party_size, 0) || 0;
    const avgPartySize = allBookings && allBookings.length > 0 ? (totalGuests / allBookings.length).toFixed(1) : "0";

    const { data: recentBookings } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    interface Booking {
        id: string;
        name: string;
        date: string;
        time: string;
        party_size: number;
        status: string;
        created_at: string;
    }

    // Only show stats we can back with real DB data
    const stats = [
        { label: "Total Bookings", value: bookingCount?.toString() || "0", change: "Live", icon: CalendarCheck },
        { label: "Avg. Party Size", value: avgPartySize, change: "Live", icon: Users },
        // Revenue and New Customers removed as they require data points not in our simple schema yet
    ];

    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold text-primary">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, Manager. Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-secondary rounded-lg">
                                <stat.icon className="w-6 h-6 text-accent" />
                            </div>
                            <span className="text-sm font-medium text-green-500">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
                <div className="space-y-4">
                    {recentBookings && recentBookings.length > 0 ? (
                        recentBookings.map((booking: Booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {booking.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{booking.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.date} • {booking.time} • {booking.party_size} Guests
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${booking.status === 'confirmed'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No recent bookings.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
