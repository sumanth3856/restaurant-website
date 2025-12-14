import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Protect all routes starting with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const allowedIps = (process.env.ADMIN_ALLOWED_IP || '').split(',').map(ip => ip.trim())

        // 1. If no IPs set, warn but allow (or fail secure).
        if (allowedIps.length === 0 || (allowedIps.length === 1 && allowedIps[0] === '')) {
            // You might want to remove this in strict production
            return NextResponse.next()
        }

        // 2. Get IP
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1'

        // Handle forwarded-for possibly being a list
        if (ip.includes(' , ')) {
            ip = ip.split(' , ')[0]
        } else if (ip.includes(',')) {
            ip = ip.split(',')[0]
        }
        ip = ip.trim()

        // 3. Normalize IPv6 localhost
        if (ip === '::1') ip = '127.0.0.1'

        // 4. Check Match
        if (!allowedIps.includes(ip)) {
            // Log access attempt for security auditing
            console.warn(`[Blocked Admin Access] IP: ${ip} tried to access ${request.nextUrl.pathname}. Allowed: ${allowedIps.join(', ')}`)

            // Rewrite to the 403 page without changing the URL (so they see they are at /admin but blocked)
            // Or redirect? Rewrite is better for security masking, but Redirect is clearer UX?
            // "Rewrite" keeps them on /admin but shows the error page.
            // Let's use rewrite to prevent redirect loops or confusion.
            const url = request.nextUrl.clone()
            url.pathname = '/access-denied'
            return NextResponse.rewrite(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
