import { Skeleton } from "@/components/ui/Skeleton";

export function ReviewsSkeleton() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <Skeleton className="h-4 w-32 mx-auto rounded-full" />
                    <Skeleton className="h-12 w-3/4 mx-auto rounded-lg" />
                    <Skeleton className="h-6 w-full mx-auto rounded-md" />
                </div>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 items-start">
                    <div className="lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm h-64 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => <Skeleton key={s} className="w-4 h-4 rounded-full" />)}
                                    </div>
                                    <Skeleton className="h-20 w-full rounded-md" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <Skeleton className="h-[500px] w-full rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
