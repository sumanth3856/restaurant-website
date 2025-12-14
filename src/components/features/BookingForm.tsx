"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormData } from "@/lib/validations";
import { Calendar, Users, Clock, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { sendBookingConfirmationEmail } from "@/app/actions/sendEmail";

import { logger } from "@/lib/logger";

// Helper for required label
import { LucideIcon } from "lucide-react";
const RequiredLabel = ({ label, icon: Icon, htmlFor }: { label: string, icon: LucideIcon, htmlFor?: string }) => (
    <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-4 h-4 text-accent" />
        <label htmlFor={htmlFor} className="text-sm font-bold text-foreground tracking-wide flex items-center gap-1 cursor-pointer">
            {label}
            <Sparkles className="w-2.5 h-2.5 text-accent fill-accent animate-pulse" />
        </label>
    </div>
);

import { useRateLimit } from "@/hooks/useRateLimit";

export function BookingForm() {
    const { isSubmitting, withRateLimit } = useRateLimit();
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
        await withRateLimit(async () => {
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

                // Send confirmation email
                const emailResult = await sendBookingConfirmationEmail({
                    name: data.name,
                    email: data.email,
                    date: data.date,
                    time: data.time,
                    guests: data.partySize,
                });

                if (!emailResult.success) {
                    logger.error("Email failed but booking succeeded:", emailResult.error);
                    // Still show success to user since booking was created
                }

                setIsSuccess(true);
            } catch (err) {
                logger.error("Booking error:", err);
                toast.error("Failed to create booking. Please try again.");
            }
        });
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
                    <RequiredLabel label="Date" icon={Calendar} htmlFor="date" />
                    <input
                        id="date"
                        type="date"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all shadow-sm",
                            errors.date && "border-red-500 bg-red-500/5 focus:ring-red-500/20 focus:border-red-500"
                        )}
                        min={new Date().toISOString().split('T')[0]}
                        {...register("date")}
                    />
                    {errors.date && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{errors.date.message}</p>}
                </div>

                {/* Time */}
                <div className="space-y-2">
                    <RequiredLabel label="Time" icon={Clock} htmlFor="time" />
                    <select
                        id="time"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all appearance-none shadow-sm",
                            errors.time && "border-red-500 bg-red-500/5 focus:ring-red-500/20 focus:border-red-500"
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
                    {errors.time && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{errors.time.message}</p>}
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                    <RequiredLabel label="Guests" icon={Users} htmlFor="partySize" />
                    <input
                        id="partySize"
                        type="number"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all shadow-sm",
                            errors.partySize && "border-red-500 bg-red-500/5 focus:ring-red-500/20 focus:border-red-500"
                        )}
                        {...register("partySize")}
                    />
                    {errors.partySize && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{errors.partySize.message}</p>}
                </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Guest Details */}
            <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                Contact Details
                <div className="h-1 w-12 bg-accent rounded-full" />
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <label htmlFor="name" className="text-sm font-bold text-foreground">Full Name</label>
                        <Sparkles className="w-2.5 h-2.5 text-accent fill-accent animate-pulse" />
                    </div>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all shadow-sm",
                            errors.name && "border-red-500 bg-red-500/5 focus:ring-red-500/20 focus:border-red-500"
                        )}
                        {...register("name")}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <label htmlFor="email" className="text-sm font-bold text-foreground">Email Address</label>
                        <Sparkles className="w-2.5 h-2.5 text-accent fill-accent animate-pulse" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all shadow-sm",
                            errors.email && "border-red-500 bg-red-500/5 focus:ring-red-500/20 focus:border-red-500"
                        )}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <label htmlFor="phone" className="text-sm font-bold text-foreground">Phone Number</label>
                        <Sparkles className="w-2.5 h-2.5 text-accent fill-accent animate-pulse" />
                    </div>
                    <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        className={cn(
                            "w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all shadow-sm",
                            errors.phone && "border-red-500 bg-red-500/5 focus:ring-red-500/20 focus:border-red-500"
                        )}
                        {...register("phone")}
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-foreground mb-1.5 block">Special Requests (Optional)</label>
                    <textarea
                        className="w-full p-3 rounded-md bg-secondary/50 border border-zinc-400 focus:ring-2 focus:ring-accent/20 focus:border-accent/40 outline-none transition-all min-h-[100px] shadow-sm"
                        {...register("requests")}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-primary-foreground font-bold text-lg rounded-full bg-primary hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : "Confirm Reservation"}
            </button>
        </form>
    );
}
