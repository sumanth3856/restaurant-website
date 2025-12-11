export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
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
                <p className="text-primary font-serif tracking-[0.2em] text-xs uppercase animate-pulse">Loading Admin...</p>
            </div>
        </div>
    );
}
