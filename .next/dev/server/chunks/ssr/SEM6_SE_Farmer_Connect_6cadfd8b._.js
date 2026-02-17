module.exports = [
"[project]/SEM6/SE/Farmer_Connect/src/services/apiService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "addBtn": "page-module__oUZwwG__addBtn",
  "container": "page-module__oUZwwG__container",
  "error": "page-module__oUZwwG__error",
  "footer": "page-module__oUZwwG__footer",
  "header": "page-module__oUZwwG__header",
  "input": "page-module__oUZwwG__input",
  "removeBtn": "page-module__oUZwwG__removeBtn",
  "select": "page-module__oUZwwG__select",
  "subtitle": "page-module__oUZwwG__subtitle",
  "table": "page-module__oUZwwG__table",
  "tableContainer": "page-module__oUZwwG__tableContainer",
  "title": "page-module__oUZwwG__title",
});
}),
"[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BatchListingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/services/apiService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Toast/Toast.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
;
const CROPS = [
    {
        value: '',
        label: 'Select Crop'
    },
    {
        value: 'Potato',
        label: 'Potato'
    },
    {
        value: 'Onion',
        label: 'Onion'
    },
    {
        value: 'Tomato',
        label: 'Tomato'
    },
    {
        value: 'Wheat',
        label: 'Wheat'
    },
    {
        value: 'Rice',
        label: 'Rice'
    },
    {
        value: 'Cotton',
        label: 'Cotton'
    }
];
function BatchListingPage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            crop: '',
            variety: '',
            quantity: '',
            price: '',
            minQty: '',
            image: ''
        }
    ]);
    const handleAddRow = ()=>{
        setRows([
            ...rows,
            {
                id: Date.now(),
                crop: '',
                variety: '',
                quantity: '',
                price: '',
                minQty: '',
                image: ''
            }
        ]);
    };
    const handleRemoveRow = (id)=>{
        if (rows.length === 1) return;
        setRows(rows.filter((row)=>row.id !== id));
    };
    const handleChange = (id, field, value)=>{
        setRows(rows.map((row)=>row.id === id ? {
                ...row,
                [field]: value
            } : row));
    };
    // Generic function to mock image upload
    const handleImageUpload = (id)=>{
        // In real app, this would trigger file input
        // Here we just set a dummy image based on crop type or generic
        const row = rows.find((r)=>r.id === id);
        if (!row.crop) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Select a crop first', 'error');
            return;
        }
        // Mock image URL
        const mockImage = `https://source.unsplash.com/400x300/?${row.crop.toLowerCase()},vegetable`;
        handleChange(id, 'image', mockImage);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Image uploaded (simulated)', 'success');
    };
    const validate = ()=>{
        for(let i = 0; i < rows.length; i++){
            const row = rows[i];
            if (!row.crop) return `Row ${i + 1}: Select a crop`;
            if (!row.quantity) return `Row ${i + 1}: Enter quantity`;
            if (!row.price) return `Row ${i + 1}: Enter price`;
        }
        return null;
    };
    const handleSubmit = async ()=>{
        const error = validate();
        if (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])(error, 'error');
            return;
        }
        setIsSubmitting(true);
        try {
            // Submit all rows sequentially (or batch API if available)
            await Promise.all(rows.map((row)=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$services$2f$apiService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiService"].addListing({
                    cropName: `${row.crop} ${row.variety ? `(${row.variety})` : ''}`.trim(),
                    category: 'vegetables',
                    variety: row.variety || '',
                    quantity: parseFloat(row.quantity),
                    unit: 'kg',
                    expectedPrice: parseFloat(row.price),
                    minQty: parseFloat(row.minQty) || 1,
                    imageUrl: row.image || ''
                })));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('All listings created successfully!', 'success');
            setTimeout(()=>{
                router.push('/farmer/dashboard');
            }, 1000);
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Failed to create listings', 'error');
            console.error(err);
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b px-6 py-4 sticky top-0 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto flex items-center justify-between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                className: "p-2 hover:bg-gray-100 rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-5 h-5 text-gray-600"
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                lineNumber: 117,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-gray-900",
                                children: "Batch Listing"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                lineNumber: 120,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                        lineNumber: 116,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                lineNumber: 114,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableContainer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].table,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    width: '20%'
                                                },
                                                children: "Crop Details"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                lineNumber: 130,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    width: '15%'
                                                },
                                                children: "Quantity (kg)"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                lineNumber: 131,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    width: '15%'
                                                },
                                                children: "Price (₹/kg)"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                lineNumber: 132,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    width: '15%'
                                                },
                                                children: "Min. Order"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                lineNumber: 133,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    width: '20%'
                                                },
                                                children: "Photo"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                lineNumber: 134,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    width: '10%'
                                                },
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                lineNumber: 135,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                        lineNumber: 129,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                    lineNumber: 128,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].select,
                                                                value: row.crop,
                                                                onChange: (e)=>handleChange(row.id, 'crop', e.target.value),
                                                                children: CROPS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: opt.value,
                                                                        children: opt.label
                                                                    }, opt.value, false, {
                                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                        lineNumber: 149,
                                                                        columnNumber: 53
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                lineNumber: 143,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                                                placeholder: "Variety (Optional)",
                                                                value: row.variety,
                                                                onChange: (e)=>handleChange(row.id, 'variety', e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                lineNumber: 152,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 142,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                    lineNumber: 141,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                                        placeholder: "Total Qty",
                                                        value: row.quantity,
                                                        onChange: (e)=>handleChange(row.id, 'quantity', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 162,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                    lineNumber: 161,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                                        placeholder: "Price",
                                                        value: row.price,
                                                        onChange: (e)=>handleChange(row.id, 'price', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 171,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                    lineNumber: 170,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                                        placeholder: "Min Qty",
                                                        value: row.minQty,
                                                        onChange: (e)=>handleChange(row.id, 'minQty', e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 180,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                    lineNumber: 179,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: row.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-16 h-16 rounded overflow-hidden group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: row.image,
                                                                alt: "Crop",
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                lineNumber: 191,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity",
                                                                onClick: ()=>handleChange(row.id, 'image', ''),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                lineNumber: 192,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 190,
                                                        columnNumber: 45
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 text-xs flex flex-col items-center gap-1",
                                                        onClick: ()=>handleImageUpload(row.id),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                                lineNumber: 204,
                                                                columnNumber: 49
                                                            }, this),
                                                            "Add Photo"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 200,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                    lineNumber: 188,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: rows.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].removeBtn,
                                                        onClick: ()=>handleRemoveRow(row.id),
                                                        title: "Remove row",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                            lineNumber: 216,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                        lineNumber: 211,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                                    lineNumber: 209,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, row.id, true, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                            lineNumber: 140,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                    lineNumber: 138,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                            lineNumber: 127,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                        lineNumber: 126,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addBtn,
                        onClick: handleAddRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-5 h-5 inline-block mr-2"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                lineNumber: 227,
                                columnNumber: 21
                            }, this),
                            "Add Another Crop"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                        lineNumber: 226,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f$farmer$2f$listing$2f$batch$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors",
                        onClick: ()=>router.back(),
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                        lineNumber: 233,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2",
                        onClick: handleSubmit,
                        disabled: isSubmitting,
                        children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Saving..."
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                            lineNumber: 245,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                                    lineNumber: 248,
                                    columnNumber: 29
                                }, this),
                                "Submit All"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
                lineNumber: 232,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/farmer/listing/batch/page.jsx",
        lineNumber: 113,
        columnNumber: 9
    }, this);
}
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Save
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
            key: "1c8476"
        }
    ],
    [
        "path",
        {
            d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
            key: "1ydtos"
        }
    ],
    [
        "path",
        {
            d: "M7 3v4a1 1 0 0 0 1 1h7",
            key: "t51u73"
        }
    ]
];
const Save = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("save", __iconNode);
;
 //# sourceMappingURL=save.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Save",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowLeft
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript)");
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Upload
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3v12",
            key: "1x0j5s"
        }
    ],
    [
        "path",
        {
            d: "m17 8-5-5-5 5",
            key: "7q97r8"
        }
    ],
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ]
];
const Upload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("upload", __iconNode);
;
 //# sourceMappingURL=upload.js.map
}),
"[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Upload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=SEM6_SE_Farmer_Connect_6cadfd8b._.js.map