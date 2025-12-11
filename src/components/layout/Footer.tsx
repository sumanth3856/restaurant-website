import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-muted/40 py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-serif font-bold text-primary">Maison Delish</h3>
                    <p className="text-sm text-muted-foreground">
                        123 Culinary Ave, Food City
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-muted-foreground">
                    <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                    <Link href="/terms" className="hover:text-foreground">Terms</Link>
                </div>

                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Maison Delish. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
