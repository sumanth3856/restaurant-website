"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import "./globals.css";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        logger.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="antialiased font-sans bg-background text-foreground flex flex-col min-h-screen items-center justify-center p-4">
                <div className="bg-card border border-border p-12 rounded-2xl shadow-2xl text-center max-w-lg space-y-6">
                    <h1 className="text-4xl font-serif font-bold text-primary">Critical Error</h1>
                    <p className="text-muted-foreground text-lg">
                        The application encountered a critical error.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg mx-auto"
                    >
                        Reload Application
                    </button>
                </div>
            </body>
        </html>
    );
}
