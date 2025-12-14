"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, UtensilsCrossed, Settings, LogOut, Menu, X, MessageSquare } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import RealtimeDataListener from "@/components/admin/RealtimeDataListener";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        // Small delay to show animation (optional, but enhances "process" feel)
        await new Promise(resolve => setTimeout(resolve, 800));
        await supabase.auth.signOut();
        router.push("/login"); // Redirect to login
        router.refresh();
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Reset loading states when pathname changes
    useEffect(() => {
        setIsSidebarOpen(false);
        // We could reset settings loading here if we used a specific state for it
    }, [pathname]);

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
        { href: "/admin/menu", label: "Menu Manager", icon: UtensilsCrossed },
        { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-secondary/20 relative">
            <RealtimeDataListener />
            {/* Signout Overlay */}
            {isSigningOut && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin-fast mb-4" />
                    <p className="text-xl font-serif font-bold text-primary animate-pulse">Signing out...</p>
                </div>
            )}

            {/* ... (Mobile Header etc) ... */}

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 p-4 flex items-center justify-between shadow-sm">
                <span className="text-xl font-serif font-bold text-primary">Maison Admin</span>
                <button onClick={toggleSidebar} className="p-2 hover:bg-secondary rounded-lg">
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-[60] w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 flex flex-col",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-border hidden md:block">
                    <span className="text-2xl font-serif font-bold text-primary">Maison Admin</span>
                </div>

                {/* Mobile Sidebar Header */}
                <div className="p-6 border-b border-border md:hidden flex justify-between items-center bg-card">
                    <span className="text-xl font-serif font-bold text-primary">Menu</span>
                    <button onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        const isSettings = href === "/admin/settings";

                        return (
                            <Link
                                key={href}
                                href={href}
                                // onClick handled by useEffect for consistency
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md font-bold"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                {/* Lively Icon Animation on Hover */}
                                <Icon className={cn(
                                    "w-5 h-5 transition-all duration-500 ease-out",
                                    // Settings spins, others have a lively bounce/rotate effect
                                    isSettings
                                        ? "group-hover:rotate-180"
                                        : "group-hover:scale-110 group-hover:-rotate-12",
                                    (isSettings && isActive) && "animate-spin-slow"
                                )} />

                                {label}

                                {isActive && (
                                    <div className="absolute right-4 w-2 h-2 rounded-full bg-accent animate-ping" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border mt-auto sticky bottom-0 bg-card z-10">
                    <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-8 mt-16 md:mt-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
