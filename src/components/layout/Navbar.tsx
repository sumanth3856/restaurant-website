"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-2xl font-serif font-bold text-primary tracking-tight">Maison Delish</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:gap-x-6">
                    <Link href="/menu" className="text-sm font-medium transition-colors hover:text-primary">
                        Menu
                    </Link>
                    <Link href="/gallery" className="text-sm font-medium transition-colors hover:text-primary">
                        Gallery
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                        Contact
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="/book"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Book a Table
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-muted-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-border">
                    <div className="flex flex-col space-y-4 p-4">
                        <Link
                            href="/menu"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Menu
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/book"
                            className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            onClick={() => setIsOpen(false)}
                        >
                            Book a Table
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
