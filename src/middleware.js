import { NextResponse } from 'next/server';

/**
 * Middleware for route protection
 * Checks authentication status and redirects accordingly
 */
export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Get auth token from cookies (in production, use httpOnly cookie)
    const token = request.cookies.get('auth_token')?.value;

    // Define protected routes
    const protectedRoutes = [
        '/farmer/dashboard',
        '/buyer/dashboard',
        '/profile',
        '/listings/create',
        '/negotiations',
    ];

    // Define auth routes (redirect if already logged in)
    const authRoutes = [
        '/farmer/register',
        '/farmer/login',
        '/buyer/register',
        '/buyer/login',
    ];

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if current path is an auth route
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/farmer/register', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth route while logged in
    if (isAuthRoute && token) {
        // Parse token to get user type (simplified - in production decode JWT)
        const dashboardUrl = new URL('/farmer/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|icons|locales).*)',
    ],
};
