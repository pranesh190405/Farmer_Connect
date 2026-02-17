(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FarmerDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/services/apiService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Toast/Toast.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function FarmerDashboard() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [listings, setListings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('active');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FarmerDashboard.useEffect": ()=>{
            setMounted(true);
            fetchListings();
        }
    }["FarmerDashboard.useEffect"], []);
    const fetchListings = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiService"].getFarmerListings();
            setListings(data);
        } catch (error) {
            console.error('Failed to fetch listings:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('common.error') || 'Failed to load listings');
        } finally{
            setLoading(false);
        }
    };
    const handleDelete = async (id)=>{
        if (confirm(t('common.confirmDelete') || 'Are you sure you want to delete this listing?')) {
            const success = await __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiService"].deleteListing(id);
            if (success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('common.deleteSuccess') || 'Listing deleted successfully');
                fetchListings(); // Refresh
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('common.error') || 'Failed to delete');
            }
        }
    };
    if (!mounted) return null;
    const stats = [
        {
            label: t('dashboard.totalSales'),
            value: '₹45,000',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            color: 'bg-blue-100 text-blue-600'
        },
        {
            label: t('dashboard.activeListings'),
            value: listings.filter((l)=>l.status === 'active').length,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
            color: 'bg-green-100 text-green-600'
        },
        {
            label: t('dashboard.todaysPrice'),
            value: '₹12/kg',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
            color: 'bg-yellow-100 text-yellow-600'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 pb-24 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b sticky top-0 z-10 px-6 py-4 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: t('dashboard.welcomeFarmer')
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                    lineNumber: 60,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-sm mt-1",
                                    children: t('dashboard.manageCrops')
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                    lineNumber: 61,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/farmer/listing/batch",
                                    className: "bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-full font-medium flex items-center gap-2 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                            lineNumber: 68,
                                            columnNumber: 29
                                        }, this),
                                        "Batch Mode"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/farmer/listing/new",
                                    className: "bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 text-sm hover:bg-green-700 active:scale-95 transition-all shadow-md hover:shadow-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                            lineNumber: 75,
                                            columnNumber: 29
                                        }, this),
                                        t('dashboard.newListing')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                    lineNumber: 58,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto p-6 space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                        children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `p-3 rounded-xl ${stat.color}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(stat.icon, {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                            lineNumber: 89,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                        lineNumber: 88,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-sm font-medium",
                                                children: stat.label
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 92,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-gray-900",
                                                children: stat.value
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 93,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                        lineNumber: 91,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 87,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                        lineNumber: 85,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-8 border-b border-gray-200",
                            children: [
                                'active',
                                'sold',
                                'expired'
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab),
                                    className: `
                                    pb-3 text-base font-medium capitalize transition-all relative
                                    ${activeTab === tab ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
                                `,
                                    children: [
                                        t(`dashboard.status.${tab}`) || tab,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `ml-2 text-xs py-0.5 px-2 rounded-full ${activeTab === tab ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`,
                                            children: listings.filter((l)=>l.status === tab).length
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                            lineNumber: 115,
                                            columnNumber: 33
                                        }, this),
                                        activeTab === tab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full"
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                            lineNumber: 119,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, tab, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                    lineNumber: 103,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 129,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-gray-500",
                                children: t('common.loading')
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 130,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                        lineNumber: 128,
                        columnNumber: 21
                    }, this) : listings.filter((l)=>l.status === activeTab).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                    className: "w-10 h-10 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                    lineNumber: 135,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 134,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-900 font-bold text-lg mb-2",
                                children: t('dashboard.noListings')
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 137,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 text-sm max-w-xs mx-auto mb-6",
                                children: t('dashboard.startSellingDescription')
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 138,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/farmer/listing/new",
                                className: "text-green-600 font-semibold hover:text-green-700 hover:underline",
                                children: [
                                    "+ ",
                                    t('dashboard.createFirstListing')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 141,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                        lineNumber: 133,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: listings.filter((l)=>l.status === activeTab).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-green-100",
                                        children: [
                                            item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.image,
                                                alt: item.crop,
                                                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 154,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    className: "w-12 h-12 text-green-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                    lineNumber: 161,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 160,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm",
                                                children: item.quantity
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 164,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                        lineNumber: 152,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-gray-900 text-lg truncate pr-2",
                                                        children: item.crop
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                        lineNumber: 171,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                            lineNumber: 173,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                        lineNumber: 172,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 170,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline gap-1 mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-bold text-green-700",
                                                    children: item.price
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                    lineNumber: 178,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 177,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                                lineNumber: 183,
                                                                columnNumber: 45
                                                            }, this),
                                                            item.date
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                        lineNumber: 182,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "ml-auto flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/farmer/listing/edit/${item.id}`,
                                                                className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
                                                                title: t('common.edit'),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                                    lineNumber: 192,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                                lineNumber: 187,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors",
                                                                title: t('common.delete'),
                                                                onClick: ()=>handleDelete(item.id),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                                    lineNumber: 199,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                                lineNumber: 194,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                        lineNumber: 186,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                                lineNumber: 181,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                        lineNumber: 169,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                                lineNumber: 151,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                        lineNumber: 149,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
                lineNumber: 82,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/dashboard/page.js",
        lineNumber: 55,
        columnNumber: 9
    }, this);
}
_s(FarmerDashboard, "dc7uJcxI6sn6A2TZDJj1WfyJ4Qc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = FarmerDashboard;
var _c;
__turbopack_context__.k.register(_c, "FarmerDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Package
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
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw"
        }
    ],
    [
        "path",
        {
            d: "M12 22V12",
            key: "d0xqtd"
        }
    ],
    [
        "polyline",
        {
            points: "3.29 7 12 12 20.71 7",
            key: "ousv84"
        }
    ],
    [
        "path",
        {
            d: "m7.5 4.27 9 5.15",
            key: "1c824w"
        }
    ]
];
const Package = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("package", __iconNode);
;
 //# sourceMappingURL=package.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Package",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
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
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
 //# sourceMappingURL=clock.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>EllipsisVertical
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
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "1",
            key: "41hilf"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "5",
            r: "1",
            key: "gxeob9"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "19",
            r: "1",
            key: "lyex9k"
        }
    ]
];
const EllipsisVertical = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ellipsis-vertical", __iconNode);
;
 //# sourceMappingURL=ellipsis-vertical.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MoreVertical",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SquarePen
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
            d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
            key: "1m0v6g"
        }
    ],
    [
        "path",
        {
            d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
            key: "ohrbg2"
        }
    ]
];
const SquarePen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("square-pen", __iconNode);
;
 //# sourceMappingURL=square-pen.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Edit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trash
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
            d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            key: "miytrc"
        }
    ],
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            key: "e791ji"
        }
    ]
];
const Trash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trash", __iconNode);
;
 //# sourceMappingURL=trash.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TrendingUp
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
            d: "M16 7h6v6",
            key: "box55l"
        }
    ],
    [
        "path",
        {
            d: "m22 7-8.5 8.5-5-5L2 17",
            key: "1t1m79"
        }
    ]
];
const TrendingUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trending-up", __iconNode);
;
 //# sourceMappingURL=trending-up.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendingUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>DollarSign
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
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "2",
            y2: "22",
            key: "7eqyqh"
        }
    ],
    [
        "path",
        {
            d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
            key: "1b0p4s"
        }
    ]
];
const DollarSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("dollar-sign", __iconNode);
;
 //# sourceMappingURL=dollar-sign.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DollarSign",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=SEM6_SE_Farmer_Connect_5c7198b8._.js.map