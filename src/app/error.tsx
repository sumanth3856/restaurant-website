"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { logger } from "@/lib/logger";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log exception to an error reporting service (e.g. Sentry)
        logger.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full mb-6">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md mb-8">
                We apologize for the inconvenience. Our team has been notified.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
                Try Again
            </button>
        </div>
    );
}
