"use server";

import { resend } from "@/lib/resend";
import BookingConfirmationTemplate from "@/components/emails/BookingConfirmation";
import { logger } from "@/lib/logger";

interface SendBookingEmailParams {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
}

export async function sendBookingConfirmationEmail({
    name,
    email,
    date,
    time,
    guests,
}: SendBookingEmailParams) {
    try {
        logger.log("Attempting to send email to:", email);
        logger.log("API Key exists:", !!process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: "Maison Delish <onboarding@resend.dev>",
            to: [email],
            subject: "Your Reservation at Maison Delish is Confirmed",
            react: BookingConfirmationTemplate({ name, date, time, guests }),
        });

        if (error) {
            logger.error("Resend API error:", JSON.stringify(error, null, 2));
            return { success: false, error: "Failed to send email. Please check your inbox or try again." };
        }

        logger.log("Email sent successfully:", data);
        return { success: true, data };
    } catch (error: unknown) {
        logger.error("Unexpected email error:", error);
        const err = error as Error;
        logger.error("Error details:", {
            message: err?.message || 'Unknown error',
            stack: err?.stack,
            name: err?.name,
        });
        return { success: false, error: "An unexpected error occurred while sending the confirmation email." };
    }
}
