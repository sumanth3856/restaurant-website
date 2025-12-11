import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default async function ContactPage() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            We look forward to hosting you at Maison Delish. For private events or table reservations, please contact us clearly.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold text-primary mb-1">Location</h3>
                                <p className="text-muted-foreground">
                                    123 Culinary Avenue,<br />
                                    Food District, FD 90210
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold text-primary mb-1">Opening Hours</h3>
                                <div className="text-muted-foreground space-y-1">
                                    <p><span className="w-24 inline-block font-medium text-foreground">Mon - Thu:</span> 5:00 PM - 10:00 PM</p>
                                    <p><span className="w-24 inline-block font-medium text-foreground">Fri - Sat:</span> 5:00 PM - 11:00 PM</p>
                                    <p><span className="w-24 inline-block font-medium text-foreground">Sunday:</span> 4:00 PM - 9:30 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold text-primary mb-1">Phone</h3>
                                <p className="text-muted-foreground hover:text-accent transition-colors">
                                    <a href="tel:+1234567890">(555) 123-4567</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold text-primary mb-1">Email</h3>
                                <p className="text-muted-foreground hover:text-accent transition-colors">
                                    <a href="mailto:hello@maisondelish.com">hello@maisondelish.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-full min-h-[400px] w-full bg-secondary/30 rounded-2xl border border-border overflow-hidden relative group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 z-10 pointer-events-none">
                        <MapPin className="w-12 h-12 mb-2" />
                        <span className="font-medium">Map Integration</span>
                        <span className="text-xs text-muted-foreground/40">(Google Maps API Placeholder)</span>
                    </div>
                    {/* Decorative faint grid/pattern for "map" look */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="map"
                        marginHeight={0}
                        marginWidth={0}
                        scrolling="no"
                        src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                        className="opacity-40 group-hover:opacity-60 transition-opacity grayscale hover:grayscale-0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
