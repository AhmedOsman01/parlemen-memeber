import { NextResponse } from 'next/server';

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // Explicitly bypass admin login page and its sub-paths to avoid redirect loops
    // We also bypass API routes as they handle their own auth
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/') || pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Protect all other /admin routes
    if (pathname.startsWith('/admin')) {
        const adminJwt = request.cookies.get('admin_jwt');

        if (!adminJwt) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            url.searchParams.set('from', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
