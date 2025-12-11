import { BookingForm } from "@/components/features/BookingForm";

export default async function BookPage() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return (
        <div className="min-h-screen py-16 px-4 bg-secondary/20">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <span className="text-accent font-medium tracking-wide uppercase text-sm">Reservations</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                        Book a Table
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Secure your spot at Maison Delish. We recommend booking at least 24 hours in advance.
                    </p>
                </div>

                <BookingForm />
            </div>
        </div>
    );
}
