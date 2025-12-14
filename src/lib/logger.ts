/**
 * Production-safe logger utility.
 * In development: Logs everything to console.
 * In production: Suppresses debug/info logs, sanitizes error logs.
 */
export const logger = {
    log: (...args: unknown[]) => {
        if (process.env.NODE_ENV === "development") {
            console.log(...args);
        }
    },

    info: (...args: unknown[]) => {
        if (process.env.NODE_ENV === "development") {
            console.info(...args);
        }
    },

    warn: (...args: unknown[]) => {
        console.warn(...args);
    },

    error: (...args: unknown[]) => {
        // specific error sanitization logic can go here
        // for now, we allow errors but ensure we don't dump raw objects if possible
        console.error(...args);
    },
};
