export default function Loading() {
    return (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <div className="relative flex items-center justify-center">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-muted/30 rounded-full"></div>
                    {/* Spinning Arc */}
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

                    {/* Center Brand */}
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-card shadow-lg z-10">
                        <span className="font-serif font-bold text-xl text-primary">MD</span>
                    </div>
                </div>
                <p className="text-primary font-serif tracking-[0.2em] text-xs uppercase animate-pulse">Maison Delish</p>
            </div>
        </div>
    );
}
