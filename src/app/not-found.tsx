import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
            {/* Background Texture */}
            <div className="bg-noise fixed inset-0 z-0 opacity-20" />

            <div className="relative z-10 text-center space-y-6 px-4 animate-in fade-in zoom-in duration-500">
                <h1 className="text-9xl font-serif font-bold text-accent opacity-20 select-none">404</h1>
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        The dish you are looking for seems to be off the menu.
                        Let&apos;s get you back to the main course.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
