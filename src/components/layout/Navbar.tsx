"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils exists, if not I'll just use template literals or install clsx/tailwind-merge locally if needed, but package.json has them.

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/menu", label: "Menu" },
        { href: "/gallery", label: "Gallery" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled || !isHome
                    ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm py-2"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2 group">
                    <span className={cn(
                        "text-2xl font-serif font-bold tracking-tight transition-colors duration-300",
                        scrolled || !isHome ? "text-primary" : "text-white group-hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    )}>
                        Maison Delish
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:gap-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-semibold transition-all duration-300 relative group tracking-wide",
                                (scrolled || !isHome)
                                    ? "text-foreground hover:text-primary"
                                    : "text-white/95 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
                                pathname === link.href && ((scrolled || !isHome) ? "text-primary font-bold" : "text-white font-bold")
                            )}
                        >
                            {link.label}
                            {/* Animated Underline */}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                                (scrolled || !isHome) ? "bg-primary" : "bg-white shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                            )} />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="/book"
                        className={cn(
                            "rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95",
                            (scrolled || !isHome)
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        )}
                    >
                        Book a Table
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2 transition-colors",
                        (scrolled || !isHome) ? "text-foreground" : "text-white"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-x-0 top-[60px] p-4 transition-all duration-300 ease-in-out md:hidden bg-background/95 backdrop-blur-xl border-b border-border shadow-xl",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-lg font-bold tracking-wide transition-colors p-3 rounded-md hover:bg-accent/10 border-b border-border/10 last:border-0",
                                pathname === link.href ? "text-primary" : "text-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/book"
                        className="w-full rounded-full bg-primary px-4 py-3 text-center text-lg font-bold text-primary-foreground hover:bg-primary/90 shadow-md active:scale-[0.98] transition-transform"
                        onClick={() => setIsOpen(false)}
                    >
                        Book a Table
                    </Link>
                </div>
            </div>
        </nav>
    );
}
