(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/SEM6/SE/Farmer_Connect/src/components/AuthGuard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AuthGuard({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isAuthenticated, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AuthGuard.useSelector": (state)=>state.auth
    }["AuthGuard.useSelector"]);
    const [authorized, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            // Allow public paths (redundant if used as a wrapper, but safe)
            if (isLoading) return;
            if (!isAuthenticated) {
                router.push('/login');
                setAuthorized(false);
            } else {
                setAuthorized(true);
            }
        }
    }["AuthGuard.useEffect"], [
        isAuthenticated,
        isLoading,
        router,
        pathname
    ]);
    // Show nothing while checking or if redirecting
    if (isLoading || !isAuthenticated) {
        return null; // Or a loading spinner
    }
    return children;
}
_s(AuthGuard, "h8daQRJZ/ScaN/q1vi8H/XLsqwE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/services/apiService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiService",
    ()=>ApiService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * ApiService — Calls real backend API endpoints
 */ // Helper for API calls
async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'API request failed');
    }
    return data;
}
class ApiService {
    // === Listings ===
    static async getMarketCrops(filters = {}) {
        try {
            const params = new URLSearchParams();
            if (filters.search) params.set('search', filters.search);
            if (filters.category && filters.category !== 'all') params.set('category', filters.category);
            if (filters.region && filters.region !== 'all') params.set('region', filters.region);
            params.set('status', 'active');
            const data = await apiFetch(`/api/listings?${params.toString()}`);
            return data.listings || [];
        } catch (err) {
            console.error('getMarketCrops error:', err);
            return [];
        }
    }
    static async getFarmerListings() {
        try {
            const data = await apiFetch('/api/listings/my');
            return data.listings || [];
        } catch (err) {
            console.error('getFarmerListings error:', err);
            return [];
        }
    }
    static async addListing(listingData) {
        try {
            const data = await apiFetch('/api/listings', {
                method: 'POST',
                body: JSON.stringify(listingData)
            });
            return data.listing;
        } catch (err) {
            console.error('addListing error:', err);
            throw err;
        }
    }
    static async updateListing(id, listingData) {
        try {
            const data = await apiFetch(`/api/listings/${id}`, {
                method: 'PUT',
                body: JSON.stringify(listingData)
            });
            return data.listing;
        } catch (err) {
            console.error('updateListing error:', err);
            throw err;
        }
    }
    static async updateListingStatus(id, status) {
        try {
            const data = await apiFetch(`/api/listings/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({
                    status
                })
            });
            return data.listing;
        } catch (err) {
            console.error('updateListingStatus error:', err);
            throw err;
        }
    }
    static async getListingById(id) {
        try {
            const data = await apiFetch(`/api/listings/${id}`);
            return data.listing;
        } catch (err) {
            console.error('getListingById error:', err);
            return null;
        }
    }
    static async deleteListing(id) {
        try {
            await apiFetch(`/api/listings/${id}`, {
                method: 'DELETE'
            });
            return true;
        } catch (err) {
            console.error('deleteListing error:', err);
            return false;
        }
    }
    // === Orders ===
    static async placeOrder(orderData) {
        try {
            const data = await apiFetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
            return data.order;
        } catch (err) {
            console.error('placeOrder error:', err);
            throw err;
        }
    }
    static async getMyOrders() {
        try {
            const data = await apiFetch('/api/orders/my');
            return data.orders || [];
        } catch (err) {
            console.error('getMyOrders error:', err);
            return [];
        }
    }
    // === User Profile ===
    static async getProfile() {
        try {
            const data = await apiFetch('/api/users/profile');
            return data.profile;
        } catch (err) {
            console.error('getProfile error:', err);
            return null;
        }
    }
    static async updateProfile(profileData) {
        try {
            const data = await apiFetch('/api/users/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });
            return data;
        } catch (err) {
            console.error('updateProfile error:', err);
            throw err;
        }
    }
    static async updateLocation(locationData) {
        try {
            const data = await apiFetch('/api/users/location', {
                method: 'PUT',
                body: JSON.stringify(locationData)
            });
            return data;
        } catch (err) {
            console.error('updateLocation error:', err);
            throw err;
        }
    }
    static async updatePreferences(preferences) {
        try {
            const data = await apiFetch('/api/users/preferences', {
                method: 'PUT',
                body: JSON.stringify(preferences)
            });
            return data;
        } catch (err) {
            console.error('updatePreferences error:', err);
            throw err;
        }
    }
    // === Admin ===
    static async getAdminStats() {
        try {
            const data = await apiFetch('/api/admin/stats');
            return data.stats;
        } catch (err) {
            console.error('getAdminStats error:', err);
            return null;
        }
    }
    static async getAdminUsers() {
        try {
            const data = await apiFetch('/api/admin/users');
            return data.users || [];
        } catch (err) {
            console.error('getAdminUsers error:', err);
            return [];
        }
    }
    static async approveUser(userId) {
        try {
            const data = await apiFetch(`/api/admin/users/${userId}/approve`, {
                method: 'PUT'
            });
            return data;
        } catch (err) {
            console.error('approveUser error:', err);
            throw err;
        }
    }
    static async rejectUser(userId) {
        try {
            const data = await apiFetch(`/api/admin/users/${userId}/reject`, {
                method: 'PUT'
            });
            return data;
        } catch (err) {
            console.error('rejectUser error:', err);
            throw err;
        }
    }
}
const __TURBOPACK__default__export__ = ApiService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$AuthGuard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/AuthGuard.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/store/slices/cartSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Toast/Toast.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/services/apiService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
// Regions
const REGIONS = [
    {
        value: 'all',
        labelKey: 'market.filters.allIndia'
    },
    {
        value: 'Maharashtra',
        label: 'Maharashtra'
    },
    {
        value: 'Punjab',
        label: 'Punjab'
    },
    {
        value: 'Madhya Pradesh',
        label: 'Madhya Pradesh'
    },
    {
        value: 'Karnataka',
        label: 'Karnataka'
    },
    {
        value: 'Tamil Nadu',
        label: 'Tamil Nadu'
    },
    {
        value: 'Gujarat',
        label: 'Gujarat'
    }
];
const CATEGORIES = [
    'vegetables',
    'fruits',
    'grains',
    'spices',
    'flowers'
];
function MarketPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Filters
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedRegion, setSelectedRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [priceRange, setPriceRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        0,
        1000
    ]);
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Mobile filter toggle
    const [crops, setCrops] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredCrops, setFilteredCrops] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketPage.useEffect": ()=>{
            setMounted(true);
            loadCrops();
        }
    }["MarketPage.useEffect"], []);
    const loadCrops = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiService"].getMarketCrops();
            // Assign random categories for demo if not present
            const enhancedData = data.map((item)=>({
                    ...item,
                    category: item.category || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
                    image: item.image || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400&h=400' // Fallback image
                }));
            setCrops(enhancedData);
            setFilteredCrops(enhancedData);
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('common.error') || "Failed to load market data");
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketPage.useEffect": ()=>{
            let result = crops;
            // Filter by Region
            if (selectedRegion !== 'all') {
                result = result.filter({
                    "MarketPage.useEffect": (item)=>item.location.includes(selectedRegion)
                }["MarketPage.useEffect"]);
            }
            // Filter by Category
            if (selectedCategory !== 'all') {
                result = result.filter({
                    "MarketPage.useEffect": (item)=>item.category === selectedCategory
                }["MarketPage.useEffect"]);
            }
            // Filter by Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                result = result.filter({
                    "MarketPage.useEffect": (item)=>item.name.toLowerCase().includes(q) || item.farmer.toLowerCase().includes(q)
                }["MarketPage.useEffect"]);
            }
            setFilteredCrops(result);
        }
    }["MarketPage.useEffect"], [
        selectedRegion,
        selectedCategory,
        searchQuery,
        crops
    ]);
    const handleAddToCart = (item)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToCart"])({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            farmer: item.farmer,
            minQty: item.minQty,
            quantity: 1 // Default to 1 unit
        }));
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('cart.added') || `${item.name} added to cart!`);
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openCart"])());
    };
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$AuthGuard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 pb-24 font-sans",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "bg-white border-b sticky top-0 z-20 px-4 md:px-6 py-4 shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between w-full md:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-gray-900",
                                                children: t('nav.market')
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                lineNumber: 116,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-sm mt-1",
                                                children: t('market.subtitle')
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                lineNumber: 117,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 115,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "md:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200",
                                        onClick: ()=>setShowFilters(!showFilters),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                            lineNumber: 125,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 121,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                lineNumber: 114,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 w-full md:w-auto bg-gray-100 rounded-xl px-4 py-2 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:bg-white transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "w-5 h-5 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: t('market.searchPlaceholder'),
                                        className: "bg-transparent border-none outline-none text-sm w-full md:w-80 text-gray-900 placeholder-gray-500",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 131,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                lineNumber: 129,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                        lineNumber: 113,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                    lineNumber: 112,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "max-w-7xl mx-auto p-4 md:p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: `fixed inset-0 z-30 bg-white lg:static lg:bg-transparent lg:w-64 lg:block ${showFilters ? 'block' : 'hidden'} h-full overflow-y-auto lg:h-auto lg:overflow-visible p-4 lg:p-0 shadow-xl lg:shadow-none transition-all duration-300`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center lg:hidden mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-lg text-gray-900",
                                                children: t('market.filters.title') || 'Filters'
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                lineNumber: 147,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowFilters(false),
                                                className: "p-2 bg-gray-100 rounded-full hover:bg-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                    lineNumber: 149,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                lineNumber: 148,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 146,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-gray-900 mb-3 block",
                                                        children: t('market.filters.categories')
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                        lineNumber: 156,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 cursor-pointer group",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "radio",
                                                                        name: "category",
                                                                        className: "w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300",
                                                                        checked: selectedCategory === 'all',
                                                                        onChange: ()=>setSelectedCategory('all')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                        lineNumber: 159,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-600 group-hover:text-green-700 transition-colors",
                                                                        children: t('market.filters.allCategories')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                        lineNumber: 166,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                lineNumber: 158,
                                                                columnNumber: 41
                                                            }, this),
                                                            CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "flex items-center gap-2 cursor-pointer group",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "radio",
                                                                            name: "category",
                                                                            className: "w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300",
                                                                            checked: selectedCategory === cat,
                                                                            onChange: ()=>setSelectedCategory(cat)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                            lineNumber: 170,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-600 group-hover:text-green-700 transition-colors capitalize",
                                                                            children: cat
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                            lineNumber: 177,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, cat, true, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 169,
                                                                    columnNumber: 45
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                        lineNumber: 157,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                lineNumber: 155,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-gray-900 mb-3 block",
                                                        children: t('market.filters.regions')
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                        lineNumber: 185,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all",
                                                        value: selectedRegion,
                                                        onChange: (e)=>setSelectedRegion(e.target.value),
                                                        children: REGIONS.map((region)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: region.value,
                                                                children: region.label || t(region.labelKey)
                                                            }, region.value, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                lineNumber: 192,
                                                                columnNumber: 45
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                        lineNumber: 186,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                lineNumber: 184,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 153,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                lineNumber: 145,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-2xl h-80 animate-pulse border border-gray-100"
                                        }, i, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                            lineNumber: 206,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                    lineNumber: 204,
                                    columnNumber: 33
                                }, this) : filteredCrops.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-gray-900",
                                        children: t('market.noCrops.title')
                                    }, void 0, false, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                        lineNumber: 211,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                    lineNumber: 210,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                                    children: filteredCrops.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative h-48 overflow-hidden bg-gray-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.image,
                                                            alt: item.name,
                                                            fill: true,
                                                            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                                                            className: "object-cover group-hover:scale-110 transition-transform duration-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                            lineNumber: 219,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 227,
                                                                    columnNumber: 53
                                                                }, this),
                                                                item.location
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                            lineNumber: 226,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                    lineNumber: 218,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5 flex-1 flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-bold text-gray-900 text-lg truncate pr-2",
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 235,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-xs font-bold text-green-700",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                            className: "w-3 h-3 fill-green-700"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                            lineNumber: 237,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        " ",
                                                                        item.rating
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 236,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                            lineNumber: 234,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 text-sm text-gray-500 mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                                                    className: "w-3.5 h-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 241,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "truncate",
                                                                    children: item.farmer
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 242,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                            lineNumber: 240,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-auto flex items-end justify-between gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-2xl font-bold text-green-700",
                                                                            children: [
                                                                                "₹",
                                                                                item.price,
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-gray-500 font-normal",
                                                                                    children: [
                                                                                        "/",
                                                                                        item.unit
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                                    lineNumber: 247,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                            lineNumber: 247,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-gray-400 font-medium",
                                                                            children: [
                                                                                t('market.card.min'),
                                                                                " ",
                                                                                item.minQty,
                                                                                " ",
                                                                                item.unit
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                            lineNumber: 248,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 246,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleAddToCart(item),
                                                                    className: "bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-100 flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                            lineNumber: 254,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        t('market.card.add')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                                    lineNumber: 250,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                            lineNumber: 245,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                                    lineNumber: 233,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                            lineNumber: 216,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                    lineNumber: 214,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                                lineNumber: 202,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                        lineNumber: 143,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
                    lineNumber: 142,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
            lineNumber: 110,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/market/page.js",
        lineNumber: 109,
        columnNumber: 9
    }, this);
}
_s(MarketPage, "gXzQUOxO//YgUADELqRn4UFS+Es=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = MarketPage;
var _c;
__turbopack_context__.k.register(_c, "MarketPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPin
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
];
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("map-pin", __iconNode);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SlidersHorizontal
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 5H3",
            key: "1qgfaw"
        }
    ],
    [
        "path",
        {
            d: "M12 19H3",
            key: "yhmn1j"
        }
    ],
    [
        "path",
        {
            d: "M14 3v4",
            key: "1sua03"
        }
    ],
    [
        "path",
        {
            d: "M16 17v4",
            key: "1q0r14"
        }
    ],
    [
        "path",
        {
            d: "M21 12h-9",
            key: "1o4lsq"
        }
    ],
    [
        "path",
        {
            d: "M21 19h-5",
            key: "1rlt1p"
        }
    ],
    [
        "path",
        {
            d: "M21 5h-7",
            key: "1oszz2"
        }
    ],
    [
        "path",
        {
            d: "M8 10v4",
            key: "tgpxqk"
        }
    ],
    [
        "path",
        {
            d: "M8 12H3",
            key: "a7s4jb"
        }
    ]
];
const SlidersHorizontal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sliders-horizontal", __iconNode);
;
 //# sourceMappingURL=sliders-horizontal.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SlidersHorizontal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=SEM6_SE_Farmer_Connect_2169aae8._.js.map