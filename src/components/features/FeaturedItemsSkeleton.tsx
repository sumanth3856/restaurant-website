import { Skeleton } from "@/components/ui/Skeleton";

export function FeaturedItemsSkeleton() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <Skeleton className="h-4 w-32 mx-auto" />
                    <Skeleton className="h-12 w-64 mx-auto" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-border">
                            <Skeleton className="h-64 w-full" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
