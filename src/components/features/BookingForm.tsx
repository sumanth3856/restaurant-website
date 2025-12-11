"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormData } from "@/lib/validations";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Loader } from "@/components/ui/Loader";

export function BookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            partySize: 2,
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('bookings')
                .insert([
                    {
                        date: data.date,
                        time: data.time,
                        party_size: data.partySize,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        requests: data.requests,
                        status: 'pending'
                    }
                ]);

            if (error) throw error;

            setIsSuccess(true);
        } catch (err) {
            console.error("Booking error:", err);
            alert("Failed to create booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary">Booking Confirmed!</h2>
                <p className="text-muted-foreground font-medium">
                    Thank you for choosing Maison Delish. We have sent a confirmation email to your inbox.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 px-6 py-2 rounded-full border border-border hover:bg-secondary transition-colors"
                >
                    Make another booking
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 rounded-2xl shadow-sm border border-border">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" /> Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all",
                            errors.date && "border-red-500"
                        )}
                        min={new Date().toISOString().split('T')[0]}
                        {...register("date")}
                    />
                    {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                </div>

                {/* Time */}
                <div className="space-y-2">
                    <label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" /> Time
                    </label>
                    <select
                        id="time"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all appearance-none",
                            errors.time && "border-red-500"
                        )}
                        {...register("time")}
                    >
                        <option value="">Select time</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                    </select>
                    {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                    <label htmlFor="partySize" className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" /> Guests
                    </label>
                    <input
                        id="partySize"
                        type="number"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all",
                            errors.partySize && "border-red-500"
                        )}
                        {...register("partySize")}
                    />
                    {errors.partySize && <p className="text-xs text-red-500">{errors.partySize.message}</p>}
                </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Guest Details */}
            <h3 className="font-serif font-bold text-lg text-primary">Contact Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all",
                            errors.name && "border-red-500"
                        )}
                        {...register("name")}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all",
                            errors.email && "border-red-500"
                        )}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all",
                            errors.phone && "border-red-500"
                        )}
                        {...register("phone")}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Special Requests (Optional)</label>
                    <textarea
                        className="w-full p-3 rounded-md bg-secondary/50 border border-input focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all min-h-[100px]"
                        placeholder="Allergies, special occasions, seating preference..."
                        {...register("requests")}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-primary-foreground font-bold text-lg rounded-full bg-primary hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? <Loader className="text-primary-foreground w-5 h-5" /> : "Confirm Reservation"}
            </button>
        </form>
    );
}
