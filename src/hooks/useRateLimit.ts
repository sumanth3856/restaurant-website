import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseRateLimitOptions {
    cooldown?: number; // milliseconds, default 2000
}

export function useRateLimit({ cooldown = 2000 }: UseRateLimitOptions = {}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const withRateLimit = useCallback(
        async (fn: () => Promise<void> | void) => {
            if (isSubmitting) {
                return; // Prevent execution if already submitting
            }

            setIsSubmitting(true);

            try {
                await fn();
            } catch (error) {
                console.error("Action failed:", error);
                // Optional: Toast error here or let component handle it
            } finally {
                // Keep the loading state for at least the cooldown period
                // to prevent rapid re-clicks
                setTimeout(() => {
                    setIsSubmitting(false);
                }, cooldown);
            }
        },
        [isSubmitting, cooldown]
    );

    return { isSubmitting, withRateLimit };
}
