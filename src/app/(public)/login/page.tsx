"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LoginLoader } from "@/components/ui/LoginLoader";
import { toast } from "sonner";

import { useRateLimit } from "@/hooks/useRateLimit";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { isSubmitting: isLoading, withRateLimit } = useRateLimit();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (isLoading) {
            toast.warning("Please wait before trying again.");
            return;
        }

        await withRateLimit(async () => {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    console.error("Login error:", error.message);
                    setError(error.message);
                    toast.error(error.message);
                    return;
                }

                toast.success("Login successful! Redirecting...");
                // Keep loading true while redirecting for smoother UX
                router.push("/admin");
                router.refresh();
            } catch {
                const errorMsg = "An unexpected error occurred.";
                setError(errorMsg);
                toast.error(errorMsg);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 relative">
            {isLoading && <LoginLoader />}

            <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-lg border border-border animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-primary">Staff Login</h1>
                    <p className="text-muted-foreground">Please enter your credentials.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg border border-zinc-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg border border-zinc-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                            disabled={isLoading}
                        />
                        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
