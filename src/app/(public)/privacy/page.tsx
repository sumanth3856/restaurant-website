export const metadata = {
    title: "Privacy Policy",
    description: "Learn how we collect, use, and protect your data at Maison Delish."
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-serif font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We collect information you provide directly to us, such as when you make a reservation, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and dining preferences.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use the information we collect to provide, maintain, and improve our services, including to process your reservations, send you confirmations and reminders, and communicate with you about your dining experience.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not share your personal information with third parties except as described in this policy. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and email delivery.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </section>
            </div>
        </div>
    );
}
