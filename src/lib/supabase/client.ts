import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    // Create a client only on the client side
    if (typeof window === 'undefined') {
        return createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }

    // Use a global property to persist the client across hot reloads
    const globalWithSupabase = window as unknown as {
        _supabase?: ReturnType<typeof createBrowserClient>
    }

    if (!globalWithSupabase._supabase) {
        globalWithSupabase._supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }

    return globalWithSupabase._supabase
}
