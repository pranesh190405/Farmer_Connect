(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__a2ee6726._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/SEM6/SE/Farmer_Connect/src/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
    const { pathname } = request.nextUrl;
    // Get auth token from cookies (in production, use httpOnly cookie)
    const token = request.cookies.get('auth_token')?.value;
    // Define protected routes
    const protectedRoutes = [
        '/farmer/dashboard',
        '/buyer/dashboard',
        '/profile',
        '/listings/create',
        '/negotiations'
    ];
    // Define auth routes (redirect if already logged in)
    const authRoutes = [
        '/farmer/register',
        '/farmer/login',
        '/buyer/register',
        '/buyer/login'
    ];
    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    // Check if current path is an auth route
    const isAuthRoute = authRoutes.some((route)=>pathname.startsWith(route));
    // Redirect to login if accessing protected route without auth
    // if (isProtectedRoute && !token) {
    //     const loginUrl = new URL('/farmer/register', request.url);
    //     loginUrl.searchParams.set('redirect', pathname);
    //     return NextResponse.redirect(loginUrl);
    // }
    // Redirect to dashboard if accessing auth route while logged in
    // if (isAuthRoute && token) {
    //     // Parse token to get user type (simplified - in production decode JWT)
    //     const dashboardUrl = new URL('/farmer/dashboard', request.url);
    //     return NextResponse.redirect(dashboardUrl);
    // }
    return __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */ '/((?!api|_next/static|_next/image|favicon.ico|icons|locales).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__a2ee6726._.js.map