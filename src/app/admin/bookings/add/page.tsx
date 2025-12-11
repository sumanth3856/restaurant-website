"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/Loader";

export default function AddBooking() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        party_size: 2,
        requests: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.from('bookings').insert([
                {
                    ...formData,
                    status: 'confirmed' // Auto-confirm admin bookings
                }
            ]);

            if (error) throw error;

            router.push('/admin/bookings');
            router.refresh();
        } catch (error) {
            console.error('Error adding booking:', error);
            alert('Failed to add booking');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/bookings" className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-primary">New Reservation</h1>
                    <p className="text-muted-foreground">Manually create a booking for a guest.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Guest Name</label>
                        <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Guest Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Party Size</label>
                        <input
                            name="party_size"
                            type="number"
                            min="1"
                            required
                            value={formData.party_size}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <input
                            name="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Time</label>
                        <input
                            name="time"
                            type="time"
                            required
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Special Requests</label>
                    <textarea
                        name="requests"
                        value={formData.requests}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-secondary/30 border border-input focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-accent text-black font-bold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 shadow-md"
                    >
                        {isSubmitting ? <Loader className="text-black w-4 h-4" /> : "Confirm Reservation"}
                    </button>
                </div>
            </form>
        </div>
    );
}
