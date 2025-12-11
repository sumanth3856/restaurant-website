import { cn } from "@/lib/utils";

interface SectionDividerProps {
    className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
    return (
        <div className={cn("flex items-center justify-center py-8 opacity-80", className)}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent md:w-48" />
            <div className="mx-4 flex items-center space-x-1">
                <span className="h-1 w-1 rounded-full bg-accent/60" />
                <div className="h-2 w-2 rotate-45 border border-accent" />
                <span className="h-1 w-1 rounded-full bg-accent/60" />
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent md:w-48" />
        </div>
    );
}
