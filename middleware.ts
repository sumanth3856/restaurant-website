import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/session'

export async function middleware(request: NextRequest) {
    // 1. IP RESTRICTION (Layer 1 Security)
    // Protect all routes starting with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const allowedIps = (process.env.ADMIN_ALLOWED_IP || '').split(',').map(ip => ip.trim()).filter(Boolean)

        // If IPs are set, validate them
        if (allowedIps.length > 0) {
            // Get IP - STRICT MODE (No default to 127.0.0.1 unless explicitly found)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? null

            // Handle forwarded-for possibly being a list
            if (ip && ip.includes(' , ')) {
                ip = ip.split(' , ')[0]
            } else if (ip && ip.includes(',')) {
                ip = ip.split(',')[0]
            }

            if (ip) {
                ip = ip.trim()
                // Normalize IPv6 localhost
                if (ip === '::1') ip = '127.0.0.1'
            }

            console.log(`[Middleware] Checking access for IP: ${ip} to ${request.nextUrl.pathname}`)

            // Check Match
            if (!ip || !allowedIps.includes(ip)) {
                // Log access attempt for security auditing
                console.warn(`[Blocked Admin Access] IP: ${ip || 'UNKNOWN'} tried to access ${request.nextUrl.pathname}. Allowed: ${allowedIps.join(', ')}`)

                // Rewrite to the 403 page
                const url = request.nextUrl.clone()
                url.pathname = '/access-denied'
                return NextResponse.rewrite(url)
            }
        }
    }

    // 2. SESSION & AUTH (Layer 2 Security)
    // Refresh cookies and handle Supabase Auth (e.g. redirecting unauthenticated users)
    return await updateSession(request)
}

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // - public files (svg, png, jpg, etc.)
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
