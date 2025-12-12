export const metadata = {
    title: "Terms of Service",
    description: "Read our terms and conditions for using Maison Delish services."
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-serif font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing our website, making a reservation, or visiting Maison Delish, you agree to be bound by these Terms of Service and to verify that you are over the age of 13.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Reservations and Cancellations</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to cancel or modify reservations where it appears that a customer has engaged in fraudulent or inappropriate activity or under other circumstances where it appears that the reservations contain or resulted from a mistake or error.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. User Conduct</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You agree not to use the website or services for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website or services in any way that could damage the website, services, or general business of Maison Delish.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Maison Delish and its employees shall not be liable for any damages that may occur to you as a result of your use of our website or services, to the fullest extent permitted by law.
                    </p>
                </section>
            </div>
        </div>
    );
}
