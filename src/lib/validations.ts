import { z } from "zod";

export const bookingSchema = z.object({
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    partySize: z.coerce.number().min(1, "Must be at least 1 guest").max(20, "Max 20 guests for online booking"),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    requests: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
