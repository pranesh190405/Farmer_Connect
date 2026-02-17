module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/store/slices/authSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminLogin",
    ()=>adminLogin,
    "approveUser",
    ()=>approveUser,
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "logout",
    ()=>logout,
    "rejectUser",
    ()=>rejectUser,
    "resetAuthFlow",
    ()=>resetAuthFlow,
    "sendOtpFailure",
    ()=>sendOtpFailure,
    "sendOtpStart",
    ()=>sendOtpStart,
    "sendOtpSuccess",
    ()=>sendOtpSuccess,
    "sessionExpired",
    ()=>sessionExpired,
    "verifyOtpFailure",
    ()=>verifyOtpFailure,
    "verifyOtpStart",
    ()=>verifyOtpStart,
    "verifyOtpSuccess",
    ()=>verifyOtpSuccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
// Mock function to extract data from Aadhar (simulates API call)
const extractAadharData = (aadharNumber)=>{
    if (!aadharNumber || aadharNumber.length !== 12) {
        return {
            name: '',
            dateOfBirth: '',
            address: ''
        };
    }
    // Mock extraction - In production, this would call Aadhar verification API
    const lastFourDigits = aadharNumber.slice(-4);
    const mockNames = [
        'Ramesh Kumar',
        'Suresh Patil',
        'Amit Singh',
        'Priya Sharma',
        'Vijay Kumar'
    ];
    const mockStates = [
        'Maharashtra',
        'Punjab',
        'Karnataka',
        'Tamil Nadu',
        'Gujarat'
    ];
    const nameIndex = parseInt(lastFourDigits.charAt(0)) % mockNames.length;
    const stateIndex = parseInt(lastFourDigits.charAt(1)) % mockStates.length;
    const year = 1960 + parseInt(lastFourDigits.charAt(2)) * 5;
    const month = parseInt(lastFourDigits.charAt(3)) % 12 + 1;
    return {
        name: mockNames[nameIndex],
        dateOfBirth: `${year}-${month.toString().padStart(2, '0')}-15`,
        address: `Village/City, District, ${mockStates[stateIndex]}`
    };
};
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    otpSent: false,
    otpVerified: false,
    mobileNumber: '',
    error: null,
    userType: null,
    admin: null,
    // Mock Database
    users: [
        {
            id: 'admin1',
            mobile: '9999999999',
            type: 'admin',
            status: 'APPROVED',
            name: 'System Admin',
            aadharNumber: '999999999999',
            aadharVerified: true,
            dateOfBirth: '1980-01-01',
            address: 'Admin Office, New Delhi'
        }
    ]
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        // --- Shared Actions ---
        clearError: (state)=>{
            state.error = null;
        },
        logout: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.admin = null;
            state.error = null;
        },
        sessionExpired: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.admin = null;
            state.error = 'Session expired. Please login again.';
        },
        // --- Admin Actions ---
        adminLogin: (state, action)=>{
            const { username, password } = action.payload;
            if (username === 'admin' && password === 'admin123') {
                state.isAuthenticated = true;
                state.userType = 'admin';
                state.admin = {
                    username: 'admin'
                };
                state.error = null;
            } else {
                state.error = 'Invalid credentials';
            }
        },
        approveUser: (state, action)=>{
            const userId = action.payload;
            const user = state.users.find((u)=>u.id === userId);
            if (user) {
                user.status = 'APPROVED';
            }
        },
        rejectUser: (state, action)=>{
            const userId = action.payload;
            const user = state.users.find((u)=>u.id === userId);
            if (user) {
                user.status = 'REJECTED';
            }
        },
        // --- Auth Actions (Farmer/Buyer) ---
        sendOtpStart: (state, action)=>{
            state.isLoading = true;
            state.error = null;
            state.mobileNumber = action.payload;
        },
        sendOtpSuccess: (state)=>{
            state.isLoading = false;
            state.otpSent = true;
        },
        sendOtpFailure: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
        verifyOtpStart: (state)=>{
            state.isLoading = true;
            state.error = null;
        },
        verifyOtpSuccess: (state, action)=>{
            state.isLoading = false;
            state.otpVerified = true;
            const { mobile, userType, aadharNumber, ...details } = action.payload;
            // Check if user exists
            let existingUser = state.users.find((u)=>u.mobile === mobile && u.type === userType);
            if (existingUser) {
                // Existing user - Check status
                if (existingUser.status === 'APPROVED') {
                    state.isAuthenticated = true;
                    state.user = existingUser;
                    state.userType = userType;
                } else if (existingUser.status === 'REJECTED') {
                    state.error = 'Your account has been rejected. Please contact support.';
                    state.otpVerified = false;
                } else {
                    // PENDING
                    state.error = 'Your account is pending approval.';
                    state.otpVerified = false;
                }
            } else {
                // New User - Create with Aadhar (unverified initially)
                // Mock: Extract details from Aadhar number
                const extractedData = extractAadharData(aadharNumber);
                const newUser = {
                    id: Date.now().toString(),
                    mobile,
                    type: userType,
                    status: 'APPROVED',
                    aadharNumber: aadharNumber || '',
                    aadharVerified: false,
                    name: extractedData.name || details.name || '',
                    dateOfBirth: extractedData.dateOfBirth || '',
                    address: extractedData.address || '',
                    joinedAt: new Date().toISOString(),
                    ...details
                };
                state.users.push(newUser);
                state.user = newUser;
                state.isAuthenticated = true;
                state.userType = userType;
                state.error = null;
            }
        },
        verifyOtpFailure: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
        resetAuthFlow: (state)=>{
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.error = null;
            state.isLoading = false;
        }
    }
});
const { sendOtpStart, sendOtpSuccess, sendOtpFailure, verifyOtpStart, verifyOtpSuccess, verifyOtpFailure, resetAuthFlow, logout, clearError, adminLogin, approveUser, rejectUser, sessionExpired } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/src/lib/store/features/listingSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addImage",
    ()=>addImage,
    "default",
    ()=>__TURBOPACK__default__export__,
    "nextStep",
    ()=>nextStep,
    "prevStep",
    ()=>prevStep,
    "removeImage",
    ()=>removeImage,
    "resetListing",
    ()=>resetListing,
    "setLocation",
    ()=>setLocation,
    "setStep",
    ()=>setStep,
    "updateFormData",
    ()=>updateFormData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    currentStep: 1,
    totalSteps: 5,
    formData: {
        // Step 1: Basic Info
        category: '',
        cropName: '',
        variety: '',
        // Step 2: Quantity & Price
        quantity: '',
        unit: 'kg',
        expectedPrice: '',
        // Step 3: Quality
        qualityGrade: '',
        description: '',
        images: [],
        // Step 4: Location
        location: {
            lat: null,
            lng: null,
            address: ''
        },
        // Meta
        harvestDate: new Date().toISOString().split('T')[0],
        isOrganic: false
    },
    status: 'idle',
    error: null
};
const listingSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'listing',
    initialState,
    reducers: {
        nextStep: (state)=>{
            if (state.currentStep < state.totalSteps) {
                state.currentStep += 1;
            }
        },
        prevStep: (state)=>{
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        setStep: (state, action)=>{
            state.currentStep = action.payload;
        },
        updateFormData: (state, action)=>{
            // Mutate individual fields to ensure Immer handling is clean
            Object.keys(action.payload).forEach((key)=>{
                state.formData[key] = action.payload[key];
            });
        },
        addImage: (state, action)=>{
            // max 3 images
            if (state.formData.images.length < 3) {
                state.formData.images.push(action.payload);
            }
        },
        removeImage: (state, action)=>{
            state.formData.images = state.formData.images.filter((_, index)=>index !== action.payload);
        },
        setLocation: (state, action)=>{
            state.formData.location = action.payload;
        },
        resetListing: (state)=>{
            return initialState;
        }
    }
});
const { nextStep, prevStep, setStep, updateFormData, addImage, removeImage, setLocation, resetListing } = listingSlice.actions;
const __TURBOPACK__default__export__ = listingSlice.reducer;
}),
"[project]/src/store/slices/cartSlice.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "clearCart",
    ()=>clearCart,
    "closeCart",
    ()=>closeCart,
    "default",
    ()=>__TURBOPACK__default__export__,
    "openCart",
    ()=>openCart,
    "removeFromCart",
    ()=>removeFromCart,
    "toggleCart",
    ()=>toggleCart,
    "updateQuantity",
    ()=>updateQuantity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
const initialState = {
    items: [],
    isOpen: false
};
const cartSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const item = action.payload;
            const existingItem = state.items.find((i)=>i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            } else {
                state.items.push({
                    ...item,
                    quantity: item.quantity || 1
                });
            }
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);
        },
        updateQuantity: (state, action)=>{
            const { id, quantity } = action.payload;
            const item = state.items.find((i)=>i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        clearCart: (state)=>{
            state.items = [];
        },
        toggleCart: (state)=>{
            state.isOpen = !state.isOpen;
        },
        openCart: (state)=>{
            state.isOpen = true;
        },
        closeCart: (state)=>{
            state.isOpen = false;
        }
    }
});
const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions;
const __TURBOPACK__default__export__ = cartSlice.reducer;
}),
"[project]/src/store/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$features$2f$listingSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/features/listingSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/cartSlice.js [app-ssr] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        listing: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$features$2f$listingSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        cart: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    devTools: ("TURBOPACK compile-time value", "development") !== 'production'
});
}),
"[project]/public/locales/en/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"Digital Agri Market","tagline":"Connecting Farmers & Buyers"},"nav":{"home":"Home","listings":"My Listings","market":"Market","profile":"Profile"},"dashboard":{"welcomeFarmer":"Welcome back, Farmer!","manageCrops":"Manage your crops and orders","newListing":"New Listing","totalSales":"Total Sales","activeListings":"Active Listings","todaysPrice":"Today's Market Price","status":{"active":"Active","sold":"Sold","expired":"Expired"},"noListings":"No listings found","startSellingDescription":"You haven't posted any listings yet. Start selling your produce today!","createFirstListing":"Create your first listing","welcomeBuyer":"Welcome back, Buyer!","findFreshProduce":"Find fresh produce directly from farmers","adminConsole":"Admin Console","systemOverview":"System Overview","totalFarmers":"Total Farmers","totalBuyers":"Total Buyers","totalRevenue":"Total Revenue","recentRegistrations":"Recent Registrations","user":"User","type":"Type","date":"Date","actions":"Actions","buyer":{"welcome":"Welcome, Buyer","welcomeDesc":"Manage your orders and track deliveries","browseMarket":"Browse Market","stats":{"totalOrders":"Total Orders","activeOrders":"Active Orders","completed":"Completed"},"tabs":{"active":"Active Orders","completed":"Completed Orders","cancelled":"Cancelled Orders"},"empty":{"title":"No {{status}} orders","desc":"You don't have any {{status}} orders at the moment.","startShopping":"Start Shopping"},"orderId":"Order #","inProgress":"In Progress","trackOrder":"Track Order"}},"market":{"title":"Market","subtitle":"Direct from farmers","filters":{"title":"Filters","categories":"Categories","allCategories":"All Categories","region":"Region","allIndia":"All India","priceRange":"Price Range","reset":"Reset Filters","active":"Active filters:"},"searchPlaceholder":"Search crops, farmers...","noCrops":{"title":"No crops found","desc":"Try adjusting your filters or search query"},"card":{"min":"Min.","add":"Add"}},"auth":{"farmer":{"title":"Farmer Registration","subtitle":"Join thousands of farmers selling directly","mobileLabel":"Mobile Number","mobilePlaceholder":"Enter your 10-digit mobile","sendOtp":"Send OTP","otpTitle":"Verify OTP","otpSubtitle":"Enter the 6-digit code sent to","verifyOtp":"Verify","resendOtp":"Resend OTP","resendIn":"Resend in","seconds":"seconds","aadharLabel":"Aadhar Number","aadharPlaceholder":"Enter your 12-digit Aadhar","nameLabel":"Full Name","dobLabel":"Date of Birth","addressLabel":"Address","extractingData":"Extracting details from Aadhar...","confirmDetails":"Confirm Your Details","detailsExtracted":"Details extracted from Aadhar","success":"Account Created!","successMessage":"Welcome to Digital Agri Market","continue":"Continue to Dashboard","verificationPending":"Aadhar verification pending","canBrowse":"You can browse the marketplace, but order placement requires Aadhar verification"},"buyer":{"title":"Buyer Registration","businessName":"Business Name","taxId":"Tax ID / GST Number","category":"Business Category","categories":{"retailer":"Retailer","cooperative":"Cooperative","institution":"Institution"}},"errors":{"invalidMobile":"Please enter a valid 10-digit mobile number","invalidOtp":"Please enter a valid 6-digit OTP","invalidAadhar":"Please enter a valid 12-digit Aadhar number","otpExpired":"OTP expired. Please request a new one.","aadharRequired":"Aadhar number is required for registration"}},"common":{"loading":"Loading...","error":"Something went wrong","retry":"Try Again","next":"Next","back":"Back","submit":"Submit","cancel":"Cancel","changeLanguage":"Change Language","searchPlaceholder":"Search for crops, farmers...","buyNow":"Buy Now","edit":"Edit","delete":"Delete","confirmDelete":"Are you sure you want to delete this listing?","deleteSuccess":"Listing deleted successfully","buySuccess":"Order placed for","fillFields":"Please fill all required fields","listingCreated":"Listing created successfully!"},"voice":{"startListening":"Start voice search","stopListening":"Stop listening","listening":"Listening..."},"offline":{"noConnection":"You are offline. Some features may be limited.","backOnline":"You are back online!"},"profile":{"title":"Profile Settings","accountInfo":"Account Information","name":"Name","mobile":"Mobile","type":"Account Type","location":"Location","state":"State","selectState":"Select state","district":"District","enterDistrict":"Enter district","autoDetect":"Auto-detect Location","cropInterests":"Crop Interests","cropInterestsHint":"Select crops you're interested in buying or selling","notifications":"Notifications","smsAlerts":"SMS Alerts","smsAlertsDesc":"Receive important updates via SMS","priceAlerts":"Price Alerts","priceAlertsDesc":"Get notified when prices change","privacy":"Privacy","publicProfile":"Public Profile","publicProfileDesc":"Allow others to view your profile","showLocation":"Show Location","showLocationDesc":"Display your location on listings","showContact":"Show Contact","showContactDesc":"Make phone number visible to buyers","saveChanges":"Save Changes","saved":"Settings saved!","logout":"Logout","locationError":"Geolocation is not supported by your browser","locationRetrieveError":"Unable to retrieve your location","language":"Language","selectLanguage":"Select Language"},"categories":{"vegetables":"Vegetables","fruits":"Fruits","grains":"Grains","spices":"Spices"},"landing":{"hero":{"badge":"Fair Price • Fresh Produce • Direct Connection","titlePrefix":"The Future of","titleHighlight":"Agricultural Marketing"},"buttons":{"startSelling":"Start Selling","startBuying":"Start Buying"},"features":{"fresh":{"title":"Fresh from Farm","desc":"Direct access to fresh produce without any middlemen."},"quality":{"title":"Quality Assured","desc":"Verified farmers and standard quality checks ensure you get the best."},"fair":{"title":"Fair Pricing","desc":"Transparent market rates help farmers earn more and buyers save more."}}},"cart":{"title":"Shopping Cart","empty":"Your cart is empty","emptyDesc":"Add items from the market to get started","addToCart":"Add to Cart","removeFromCart":"Remove","total":"Total","subtotal":"Subtotal","checkout":"Proceed to Checkout","continueShopping":"Continue Shopping","itemCount":"{{count}} item","itemCount_plural":"{{count}} items","added":"Added to cart","removed":"Removed from cart","updated":"Cart updated","quantity":"Quantity","price":"Price","viewCart":"View Cart","verificationRequired":"Aadhar Verification Required","verifyToCheckout":"Please verify your Aadhar to place orders","pendingVerification":"Your Aadhar is pending admin verification"},"checkout":{"title":"Checkout","deliveryInfo":"Delivery Information","paymentMethod":"Payment Method","orderSummary":"Order Summary","fullName":"Full Name","phoneNumber":"Phone Number","address":"Delivery Address","city":"City","state":"State","pincode":"Pincode","cod":"Cash on Delivery","online":"Online Payment","placeOrder":"Place Order","orderPlaced":"Order Placed Successfully!","orderNumber":"Order Number","thankYou":"Thank you for your order","backToDashboard":"Back to Dashboard","deliveryCharge":"Delivery Charge","grandTotal":"Grand Total"},"listing":{"new":{"title":"New Listing","uploadImage":"Upload Crop Image","imageSupport":"Supports JPG, PNG","cropType":"Crop Type","selectCrop":"Select Crop","variety":"Variety (Optional)","varietyPlaceholder":"e.g. Red, Hybrid","totalQuantity":"Total Quantity (kg)","quantityPlaceholder":"e.g. 500","minQuantity":"Min. Order Quantity (kg)","minQuantityPlaceholder":"e.g. 50","pricePerKg":"Price per kg (₹)","pricePlaceholder":"e.g. 25","creating":"Creating...","createButton":"Create Listing"},"crops":{"potato":"Potato","onion":"Onion","tomato":"Tomato","wheat":"Wheat","rice":"Rice"}}});}),
"[project]/public/locales/hi/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"डिजिटल कृषि बाज़ार","tagline":"किसान और खरीदार जोड़ना"},"nav":{"home":"होम","listings":"सूची","market":"बाज़ार","profile":"प्रोफ़ाइल"},"auth":{"farmer":{"title":"किसान पंजीकरण","subtitle":"हजारों किसानों से जुड़ें जो सीधे बेच रहे हैं","mobileLabel":"मोबाइल नंबर","mobilePlaceholder":"अपना 10 अंकों का मोबाइल नंबर दर्ज करें","sendOtp":"OTP भेजें","otpTitle":"OTP सत्यापित करें","otpSubtitle":"इस नंबर पर भेजा गया 6 अंकों का कोड दर्ज करें","verifyOtp":"सत्यापित करें","resendOtp":"OTP पुनः भेजें","resendIn":"पुनः भेजें","seconds":"सेकंड में","success":"खाता बन गया!","successMessage":"डिजिटल कृषि बाज़ार में आपका स्वागत है","continue":"डैशबोर्ड पर जाएं"},"buyer":{"title":"खरीदार पंजीकरण","businessName":"व्यापार का नाम","taxId":"कर आईडी / GST नंबर","category":"व्यापार श्रेणी","categories":{"retailer":"खुदरा विक्रेता","cooperative":"सहकारी समिति","institution":"संस्थान"}},"errors":{"invalidMobile":"कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें","invalidOtp":"कृपया मान्य 6 अंकों का OTP दर्ज करें","otpExpired":"OTP समाप्त हो गया। कृपया नया अनुरोध करें।"}},"common":{"loading":"लोड हो रहा है...","error":"कुछ गलत हो गया","retry":"पुनः प्रयास करें","next":"अगला","back":"वापस","submit":"जमा करें","cancel":"रद्द करें","changeLanguage":"भाषा बदलें"},"voice":{"startListening":"वॉइस सर्च शुरू करें","stopListening":"सुनना बंद करें","listening":"सुन रहे हैं..."},"offline":{"noConnection":"आप ऑफलाइन हैं। कुछ सुविधाएं सीमित हो सकती हैं।","backOnline":"आप फिर से ऑनलाइन हैं!"},"landing":{"hero":{"badge":"उचित मूल्य • ताज़ा उपज • सीधा संपर्क","titlePrefix":"भविष्य","titleHighlight":"कृषि विपणन का"},"buttons":{"startSelling":"बेचना शुरू करें","startBuying":"खरीदना शुरू करें"},"features":{"fresh":{"title":"खेतों से ताज़ा","desc":"बिना किसी बिचौलिए के ताज़ा उपज तक सीधी पहुंच।"},"quality":{"title":"गुणवत्ता सुनिश्चित","desc":"सत्यापित किसान और मानक गुणवत्ता जांच सुनिश्चित करते हैं कि आपको सबसे अच्छा मिले।"},"fair":{"title":"उचित मूल्य निर्धारण","desc":"पारदर्शी बाज़ार दरें किसानों को अधिक कमाने और खरीदारों को अधिक बचाने में मदद करती हैं।"}}},"categories":{"vegetables":"सब्जियां","fruits":"फल","grains":"अनाज","spices":"मसाले"},"cart":{"title":"शॉपिंग कार्ट","empty":"आपकी कार्ट खाली है","emptyDesc":"शुरू करने के लिए बाजार से आइटम जोड़ें","addToCart":"कार्ट में जोड़ें","removeFromCart":"हटाएं","total":"कुल","subtotal":"उप-योग","checkout":"चेकआउट करें","continueShopping":"खरीदारी जारी रखें","itemCount":"{{count}} आइटम","itemCount_plural":"{{count}} आइटम","added":"कार्ट में जोड़ा गया","removed":"कार्ट से हटाया गया","updated":"कार्ट अपडेट किया गया","quantity":"मात्रा","price":"कीमत","viewCart":"कार्ट देखें"},"checkout":{"title":"चेकआउट","deliveryInfo":"डिलीवरी जानकारी","paymentMethod":"भुगतान विधि","orderSummary":"ऑर्डर सारांश","fullName":"पूरा नाम","phoneNumber":"फोन नंबर","address":"डिलीवरी पता","city":"शहर","state":"राज्य","pincode":"पिनकोड","cod":"कैश ऑन डिलीवरी","online":"ऑनलाइन भुगतान","placeOrder":"ऑर्डर करें","orderPlaced":"ऑर्डर सफलतापूर्वक दिया गया!","orderNumber":"ऑर्डर नंबर","thankYou":"आपके ऑर्डर के लिए धन्यवाद","backToDashboard":"डैशबोर्ड पर वापस जाएं","deliveryCharge":"डिलीवरी शुल्क","grandTotal":"कुल योग"},"listing":{"new":{"title":"नई लिस्टिंग","uploadImage":"फसल की तस्वीर अपलोड करें","imageSupport":"JPG, PNG समर्थित","cropType":"फसल का प्रकार","selectCrop":"फसल चुनें","variety":"किस्म (वैकल्पिक)","varietyPlaceholder":"जैसे लाल, हाइब्रिड","totalQuantity":"कुल मात्रा (किलो)","quantityPlaceholder":"जैसे 500","minQuantity":"न्यूनतम ऑर्डर मात्रा (किलो)","minQuantityPlaceholder":"जैसे 50","pricePerKg":"प्रति किलो कीमत (₹)","pricePlaceholder":"जैसे 25","creating":"बना रहे हैं...","createButton":"लिस्टिंग बनाएं"},"crops":{"potato":"आलू","onion":"प्याज","tomato":"टमाटर","wheat":"गेहूं","rice":"चावल"}}});}),
"[project]/public/locales/ta/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"டிஜிட்டல் வேளாண் சந்தை","tagline":"விவசாயிகள் மற்றும் வாங்குபவர்களை இணைக்கிறது"},"nav":{"home":"முகப்பு","listings":"பட்டியல்கள்","market":"சந்தை","profile":"சுயவிவரம்"},"auth":{"farmer":{"title":"விவசாயி பதிவு","subtitle":"நேரடியாக விற்கும் ஆயிரக்கணக்கான விவசாயிகளுடன் சேரவும்","mobileLabel":"மொபைல் எண்","mobilePlaceholder":"10 இலக்க மொபைல் எண்ணை உள்ளிடவும்","sendOtp":"OTP அனுப்பவும்","otpTitle":"OTP ஐ சரிபார்க்கவும்","otpSubtitle":"அனுப்பப்பட்ட 6 இலக்க குறியீட்டை உள்ளிடவும்","verifyOtp":"சரிபார்க்கவும்","resendOtp":"OTP ஐ மீண்டும் அனுப்பவும்","resendIn":"மீண்டும் அனுப்பவும்","seconds":"விநாடிகளில்","success":"கணக்கு உருவாக்கப்பட்டது!","successMessage":"டிஜிட்டல் வேளாண் சந்தைக்கு வரவேற்கிறோம்","continue":"டாஷ்போர்டுக்கு செல்லவும்"},"buyer":{"title":"வாங்குபவர் பதிவு","businessName":"வணிகப் பெயர்","taxId":"வரி ஐடி / GST எண்","category":"வணிக வகை","categories":{"retailer":"சில்லறை விற்பனையாளர்","cooperative":"கூட்டுறவு","institution":"நிறுவனம்"}},"errors":{"invalidMobile":"சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்","invalidOtp":"சரியான 6 இலக்க OTP ஐ உள்ளிடவும்","otpExpired":"OTP காலாவதியானது. புதியதை கோரவும்."}},"common":{"loading":"ஏற்றுகிறது...","error":"ஏதோ தவறு நடந்தது","retry":"மீண்டும் முயலவும்","next":"அடுத்து","back":"பின்","submit":"சமர்ப்பிக்கவும்","cancel":"ரத்து செய்","changeLanguage":"மொழியை மாற்றவும்","language":"மொழி","selectLanguage":"மொழியைத் தேர்ந்தெடுக்கவும்"},"voice":{"startListening":"குரல் தேடலைத் தொடங்கவும்","stopListening":"கேட்பதை நிறுத்து","listening":"கேட்கிறது..."},"offline":{"noConnection":"நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். சில அம்சங்கள் குறைவாக இருக்கலாம்.","backOnline":"நீங்கள் மீண்டும் ஆன்லைனில் உள்ளீர்கள்!"},"landing":{"hero":{"badge":"நியாயமான விலை • புதிய விளைபொருள் • நேரடி இணைப்பு","titlePrefix":"எதிர்காலம்","titleHighlight":"விவசாய சந்தைப்படுத்தலின்"},"buttons":{"startSelling":"விற்கத் தொடங்குங்கள்","startBuying":"வாங்கத் தொடங்குங்கள்"},"features":{"fresh":{"title":"பண்ணைகளிலிருந்து புதிதாக","desc":"இடைத்தரகர்கள் இல்லாமல் புதிய விளைபொருட்களை நேரடியாகப் பெறுங்கள்."},"quality":{"title":"தரம் உறுதி","desc":"சரிபார்க்கப்பட்ட விவசாயிகள் மற்றும் தர சோதனைகள் உங்களுக்கு சிறந்ததை உறுதி செய்கின்றன."},"fair":{"title":"நியாயமான விலை நிர்ணயம்","desc":"வெளிப்படையான சந்தை விலைகள் விவசாயிகள் அதிக லாபம் ஈட்டவும் வாங்குபவர்கள் சேமிக்கவும் உதவுகின்றன."}}},"categories":{"vegetables":"காய்கறிகள்","fruits":"பழங்கள்","grains":"தானியங்கள்","spices":"மசாலா பொருட்கள்"},"cart":{"title":"ஷாப்பிங் கார்ட்","empty":"உங்கள் கார்ட் காலியாக உள்ளது","emptyDesc":"தொடங்க சந்தையிலிருந்து பொருட்களைச் சேர்க்கவும்","addToCart":"கார்ட்டில் சேர்க்கவும்","removeFromCart":"அகற்று","total":"மொத்தம்","subtotal":"துணை மொத்தம்","checkout":"செக்அவுட் செய்யவும்","continueShopping":"ஷாப்பிங் தொடரவும்","itemCount":"{{count}} பொருள்","itemCount_plural":"{{count}} பொருட்கள்","added":"கார்ட்டில் சேர்க்கப்பட்டது","removed":"கார்ட்டிலிருந்து அகற்றப்பட்டது","updated":"கார்ட் புதுப்பிக்கப்பட்டது","quantity":"அளவு","price":"விலை","viewCart":"கார்ட்டைப் பார்க்கவும்"},"checkout":{"title":"செக்அவுட்","deliveryInfo":"டெலிவரி தகவல்","paymentMethod":"பணம் செலுத்தும் முறை","orderSummary":"ஆர்டர் சுருக்கம்","fullName":"முழு பெயர்","phoneNumber":"தொலைபேசி எண்","address":"டெலிவரி முகவரி","city":"நகரம்","state":"மாநிலம்","pincode":"பின்கோடு","cod":"கேஷ் ஆன் டெலிவரி","online":"ஆன்லைன் பேமெண்ட்","placeOrder":"ஆர்டர் செய்யவும்","orderPlaced":"ஆர்டர் வெற்றிகரமாக வழங்கப்பட்டது!","orderNumber":"ஆர்டர் எண்","thankYou":"உங்கள் ஆர்டருக்கு நன்றி","backToDashboard":"டாஷ்போர்டுக்குத் திரும்பு","deliveryCharge":"டெலிவரி கட்டணம்","grandTotal":"மொத்த தொகை"},"listing":{"new":{"title":"புதிய பட்டியல்","uploadImage":"பயிர் படத்தைப் பதிவேற்றவும்","imageSupport":"JPG, PNG ஆதரவு","cropType":"பயிர் வகை","selectCrop":"பயிரைத் தேர்ந்தெடுக்கவும்","variety":"வகை (விருப்பமானது)","varietyPlaceholder":"எ.கா. சிவப்பு, கலப்பின","totalQuantity":"மொத்த அளவு (கிலோ)","quantityPlaceholder":"எ.கா. 500","minQuantity":"குறைந்தபட்ச ஆர்டர் அளவு (கிலோ)","minQuantityPlaceholder":"எ.கா. 50","pricePerKg":"ஒரு கிலோ விலை (₹)","pricePlaceholder":"எ.கா. 25","creating":"உருவாக்குகிறது...","createButton":"பட்டியலை உருவாக்கு"},"crops":{"potato":"உருளைக்கிழங்கு","onion":"வெங்காயம்","tomato":"தக்காளி","wheat":"கோதுமை","rice":"அரிசி"}},"market":{"title":"சந்தை","subtitle":"விவசாயிகளிடமிருந்து நேரடியாக","filters":{"title":"வடிப்பான்கள்","categories":"வகைகள்","allCategories":"அனைத்து வகைகள்","region":"பிராந்தியம்","allIndia":"அனைத்து இந்தியா","priceRange":"விலை வரம்பு","reset":"வடிப்பான்களை மீட்டமைக்கவும்","active":"செயலில் உள்ள வடிப்பான்கள்:"},"searchPlaceholder":"பயிர், விவசாயிகள் தேடவும்...","noCrops":{"title":"பயிர்கள் எதுவும் கிடைக்கவில்லை","desc":"உங்கள் வடிப்பான்களை அல்லது தேடலை மாற்றவும்"},"card":{"min":"குறைந்தபட்சம்","add":"சேர்"}}});}),
"[project]/public/locales/te/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"డిజిటల్ వ్యవసాయ మార్కెట్","tagline":"రైతులు & కొనుగోలుదారులను కలుపుతోంది"},"nav":{"home":"హోమ్","listings":"జాబితాలు","market":"మార్కెట్","profile":"ప్రొఫైల్"},"auth":{"farmer":{"title":"రైతు రిజిస్ట్రేషన్","subtitle":"నేరుగా విక్రయించే వేలాది రైతులతో చేరండి","mobileLabel":"మొబైల్ నంబర్","mobilePlaceholder":"మీ 10-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి","sendOtp":"OTP పంపండి","otpTitle":"OTP ధృవీకరించండి","otpSubtitle":"పంపిన 6-అంకెల కోడ్‌ను నమోదు చేయండి","verifyOtp":"ధృవీకరించండి","resendOtp":"OTP మళ్లీ పంపండి","resendIn":"మళ్లీ పంపండి","seconds":"సెకన్లలో","success":"ఖాతా సృష్టించబడింది!","successMessage":"డిజిటల్ వ్యవసాయ మార్కెట్‌కు స్వాగతం","continue":"డాష్‌బోర్డ్‌కు వెళ్లండి"},"buyer":{"title":"కొనుగోలుదారు రిజిస్ట్రేషన్","businessName":"వ్యాపార పేరు","taxId":"పన్ను ID / GST నంబర్","category":"వ్యాపార వర్గం","categories":{"retailer":"రిటైలర్","cooperative":"సహకార సంఘం","institution":"సంస్థ"}},"errors":{"invalidMobile":"దయచేసి చెల్లుబాటు అయ్యే 10-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి","invalidOtp":"దయచేసి చెల్లుబాటు అయ్యే 6-అంకెల OTPని నమోదు చేయండి","otpExpired":"OTP గడువు ముగిసింది. దయచేసి కొత్తదాన్ని అభ్యర్థించండి."}},"common":{"loading":"లోడ్ అవుతోంది...","error":"ఏదో తప్పు జరిగింది","retry":"మళ్లీ ప్రయత్నించండి","next":"తదుపరి","back":"వెనక్కి","submit":"సమర్పించండి","cancel":"రద్దు చేయి","changeLanguage":"భాషను మార్చండి"},"voice":{"startListening":"వాయిస్ శోధన ప్రారంభించండి","stopListening":"వినడం ఆపండి","listening":"వింటోంది..."},"offline":{"noConnection":"మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కొన్ని ఫీచర్లు పరిమితం కావచ్చు.","backOnline":"మీరు మళ్లీ ఆన్‌లైన్‌లో ఉన్నారు!"},"landing":{"hero":{"badge":"సరసమైన ధరలు • తాజా ఉత్పత్తులు • ప్రత్యక్ష కనెక్షన్","titlePrefix":"భవిష్యత్తు","titleHighlight":"వ్యవసాయ మార్కెటింగ్ యొక్క"},"buttons":{"startSelling":"అమ్మకం ప్రారంభించండి","startBuying":"కొనుగోలు ప్రారంభించండి"},"features":{"fresh":{"title":"పొలాల నుండి తాజాగా","desc":"మధ్యవర్తులు లేకుండా తాజా ఉత్పత్తులకు ప్రత్యక్ష ప్రాప్యత."},"quality":{"title":"నాణ్యత హామీ","desc":"ధృవీకరించబడిన రైతులు మరియు ప్రామాణిక నాణ్యత తనిఖీలు మీకు ఉత్తమమైనవి అందేలా చూస్తాయి."},"fair":{"title":"సరసమైన ధర నిర్ణయం","desc":"పారదర్శక మార్కెట్ రేట్లు రైతులకు ఎక్కువ సంపాదించడానికి మరియు కొనుగోలుదారులు ఆదా చేయడానికి సహాయపడతాయి."}}},"categories":{"vegetables":"కూరగాయలు","fruits":"పండ్లు","grains":"ధాన్యాలు","spices":"సుగంధ ద్రవ్యాలు"},"cart":{"title":"షాపింగ్ కార్ట్","empty":"మీ కార్ట్ ఖాళీగా ఉంది","emptyDesc":"ప్రారంభించడానికి మార్కెట్ నుండి వస్తువులను జోడించండి","addToCart":"కార్ట్‌కు జోడించండి","removeFromCart":"తొలగించు","total":"మొత్తం","subtotal":"ఉప మొత్తం","checkout":"చెక్అవుట్ చేయండి","continueShopping":"షాపింగ్ కొనసాగించండి","itemCount":"{{count}} వస్తువు","itemCount_plural":"{{count}} వస్తువులు","added":"కార్ట్‌కు జోడించబడింది","removed":"కార్ట్ నుండి తొలగించబడింది","updated":"కార్ట్ నవీకరించబడింది","quantity":"పరిమాణం","price":"ధర","viewCart":"కార్ట్ చూడండి"},"checkout":{"title":"చెక్అవుట్","deliveryInfo":"డెలివరీ సమాచారం","paymentMethod":"చెల్లింపు పద్ధతి","orderSummary":"ఆర్డర్ సారాంశం","fullName":"పూర్తి పేరు","phoneNumber":"ఫోన్ నంబర్","address":"డెలివరీ చిరునామా","city":"నగరం","state":"రాష్ట్రం","pincode":"పిన్‌కోడ్","cod":"క్యాష్ ఆన్ డెలివరీ","online":"ఆన్‌లైన్ చెల్లింపు","placeOrder":"ఆర్డర్ చేయండి","orderPlaced":"ఆర్డర్ విజయవంతంగా ఇవ్వబడింది!","orderNumber":"ఆర్డర్ నంబర్","thankYou":"మీ ఆర్డర్‌కు ధన్యవాదాలు","backToDashboard":"డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి","deliveryCharge":"డెలివరీ ఛార్జ్","grandTotal":"మొత్తం మొత్తం"},"listing":{"new":{"title":"కొత్త జాబితా","uploadImage":"పంట చిత్రాన్ని అప్‌లోడ్ చేయండి","imageSupport":"JPG, PNG మద్దతు","cropType":"పంట రకం","selectCrop":"పంటను ఎంచుకోండి","variety":"రకం (ఐచ్ఛికం)","varietyPlaceholder":"ఉదా. ఎరుపు, హైబ్రిడ్","totalQuantity":"మొత్తం పరిమాణం (కిలో)","quantityPlaceholder":"ఉదా. 500","minQuantity":"కనిష్ట ఆర్డర్ పరిమాణం (కిలో)","minQuantityPlaceholder":"ఉదా. 50","pricePerKg":"కిలోకు ధర (₹)","pricePlaceholder":"ఉదా. 25","creating":"సృష్టిస్తోంది...","createButton":"జాబితాను సృష్టించండి"},"crops":{"potato":"బంగాళాదుంప","onion":"ఉల్లిపాయ","tomato":"టమోటా","wheat":"గోధుమ","rice":"బియ్యం"}}});}),
"[project]/public/locales/kn/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"ಡಿಜಿಟಲ್ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ","tagline":"ರೈತರು ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸುವುದು"},"nav":{"home":"ಮುಖಪುಟ","listings":"ಪಟ್ಟಿಗಳು","market":"ಮಾರುಕಟ್ಟೆ","profile":"ಪ್ರೊಫೈಲ್"},"auth":{"farmer":{"title":"ರೈತ ನೋಂದಣಿ","subtitle":"ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡುವ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿ","mobileLabel":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ","mobilePlaceholder":"ನಿಮ್ಮ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ","sendOtp":"OTP ಕಳುಹಿಸಿ","otpTitle":"OTP ಪರಿಶೀಲಿಸಿ","otpSubtitle":"ಕಳುಹಿಸಿದ 6-ಅಂಕಿಯ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ","verifyOtp":"ಪರಿಶೀಲಿಸಿ","resendOtp":"OTP ಮರು ಕಳುಹಿಸಿ","resendIn":"ಮರು ಕಳುಹಿಸಿ","seconds":"ಸೆಕೆಂಡುಗಳಲ್ಲಿ","success":"ಖಾತೆ ರಚಿಸಲಾಗಿದೆ!","successMessage":"ಡಿಜಿಟಲ್ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗೆ ಸುಸ್ವಾಗತ","continue":"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ"},"buyer":{"title":"ಖರೀದಿದಾರ ನೋಂದಣಿ","businessName":"ವ್ಯಾಪಾರ ಹೆಸರು","taxId":"ತೆರಿಗೆ ID / GST ಸಂಖ್ಯೆ","category":"ವ್ಯಾಪಾರ ವರ್ಗ","categories":{"retailer":"ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿ","cooperative":"ಸಹಕಾರ ಸಂಘ","institution":"ಸಂಸ್ಥೆ"}},"errors":{"invalidMobile":"ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ","invalidOtp":"ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 6-ಅಂಕಿಯ OTP ಅನ್ನು ನಮೂದಿಸಿ","otpExpired":"OTP ಅವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಹೊಸದನ್ನು ವಿನಂತಿಸಿ."}},"common":{"loading":"ಲೋಡ್ ಆಗುತ್ತಿದೆ...","error":"ಏನೋ ತಪ್ಪಾಗಿದೆ","retry":"ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ","next":"ಮುಂದೆ","back":"ಹಿಂದೆ","submit":"ಸಲ್ಲಿಸಿ","cancel":"ರದ್ದುಮಾಡಿ","changeLanguage":"ಭಾಷೆ ಬದಲಾಯಿಸಿ"},"voice":{"startListening":"ಧ್ವನಿ ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ","stopListening":"ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ","listening":"ಕೇಳುತ್ತಿದೆ..."},"offline":{"noConnection":"ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಕೆಲವು ವೈಶಿಷ್ಟ್ಯಗಳು ಸೀಮಿತವಾಗಿರಬಹುದು.","backOnline":"ನೀವು ಮತ್ತೆ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ!"},"landing":{"hero":{"badge":"ನ್ಯಾಯಯುತ ಬೆಲೆಗಳು • ತಾಜಾ ಉತ್ಪನ್ನ • ನೇರ ಸಂಪರ್ಕ","titlePrefix":"ಭವಿಷ್ಯ","titleHighlight":"ಕೃಷಿ ಮಾರುಕಟ್ಟೆಯ"},"buttons":{"startSelling":"ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಿ","startBuying":"ಖರೀದಿ ಪ್ರಾರಂಭಿಸಿ"},"features":{"fresh":{"title":"ಹೊಲಗಳಿಂದ ತಾಜಾ","desc":"ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ತಾಜಾ ಉತ್ಪನ್ನಗಳಿಗೆ ನೇರ ಪ್ರವೇಶ."},"quality":{"title":"ಗುಣಮಟ್ಟದ ಭರವಸೆ","desc":"ಪರಿಶೀಲಿಸಿದ ರೈತರು ಮತ್ತು ಗುಣಮಟ್ಟದ ತಪಾಸಣೆಗಳು ನಿಮಗೆ ಉತ್ತಮವಾದದ್ದನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ."},"fair":{"title":"ನ್ಯಾಯಯುತ ಬೆಲೆ","desc":"ಪಾರದರ್ಶಕ ಮಾರುಕಟ್ಟೆ ದರಗಳು ರೈತರಿಗೆ ಹೆಚ್ಚು ಗಳಿಸಲು ಮತ್ತು ಖರೀದಿದಾರರಿಗೆ ಉಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."}}},"categories":{"vegetables":"ತರಕಾರಿಗಳು","fruits":"ಹಣ್ಣುಗಳು","grains":"ಧಾನ್ಯಗಳು","spices":"ಸಾಂಬಾರ ಪದಾರ್ಥಗಳು"},"cart":{"title":"ಶಾಪಿಂಗ್ ಕಾರ್ಟ್","empty":"ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ","emptyDesc":"ಪ್ರಾರಂಭಿಸಲು ಮಾರುಕಟ್ಟೆಯಿಂದ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ","addToCart":"ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ","removeFromCart":"ತೆಗೆದುಹಾಕಿ","total":"ಒಟ್ಟು","subtotal":"ಉಪ ಒಟ್ಟು","checkout":"ಚೆಕ್ಔಟ್ ಮಾಡಿ","continueShopping":"ಶಾಪಿಂಗ್ ಮುಂದುವರಿಸಿ","itemCount":"{{count}} ವಸ್ತು","itemCount_plural":"{{count}} ವಸ್ತುಗಳು","added":"ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ","removed":"ಕಾರ್ಟ್‌ನಿಂದ ತೆಗೆದುಹಾಕಲಾಗಿದೆ","updated":"ಕಾರ್ಟ್ ನವೀಕರಿಸಲಾಗಿದೆ","quantity":"ಪ್ರಮಾಣ","price":"ಬೆಲೆ","viewCart":"ಕಾರ್ಟ್ ನೋಡಿ"},"checkout":{"title":"ಚೆಕ್ಔಟ್","deliveryInfo":"ವಿತರಣಾ ಮಾಹಿತಿ","paymentMethod":"ಪಾವತಿ ವಿಧಾನ","orderSummary":"ಆರ್ಡರ್ ಸಾರಾಂಶ","fullName":"ಪೂರ್ಣ ಹೆಸರು","phoneNumber":"ಫೋನ್ ಸಂಖ್ಯೆ","address":"ವಿತರಣಾ ವಿಳಾಸ","city":"ನಗರ","state":"ರಾಜ್ಯ","pincode":"ಪಿನ್‌ಕೋಡ್","cod":"ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ","online":"ಆನ್‌ಲೈನ್ ಪಾವತಿ","placeOrder":"ಆರ್ಡರ್ ಮಾಡಿ","orderPlaced":"ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ನೀಡಲಾಗಿದೆ!","orderNumber":"ಆರ್ಡರ್ ಸಂಖ್ಯೆ","thankYou":"ನಿಮ್ಮ ಆರ್ಡರ್‌ಗೆ ಧನ್ಯವಾದಗಳು","backToDashboard":"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ","deliveryCharge":"ವಿತರಣಾ ಶುಲ್ಕ","grandTotal":"ಒಟ್ಟು ಮೊತ್ತ"},"listing":{"new":{"title":"ಹೊಸ ಪಟ್ಟಿ","uploadImage":"ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ","imageSupport":"JPG, PNG ಬೆಂಬಲ","cropType":"ಬೆಳೆ ಪ್ರಕಾರ","selectCrop":"ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ","variety":"ವಿಧ (ಐಚ್ಛಿಕ)","varietyPlaceholder":"ಉದಾ. ಕೆಂಪು, ಹೈಬ್ರಿಡ್","totalQuantity":"ಒಟ್ಟು ಪ್ರಮಾಣ (ಕೆಜಿ)","quantityPlaceholder":"ಉದಾ. 500","minQuantity":"ಕನಿಷ್ಠ ಆರ್ಡರ್ ಪ್ರಮಾಣ (ಕೆಜಿ)","minQuantityPlaceholder":"ಉದಾ. 50","pricePerKg":"ಪ್ರತಿ ಕೆಜಿ ಬೆಲೆ (₹)","pricePlaceholder":"ಉದಾ. 25","creating":"ರಚಿಸಲಾಗುತ್ತಿದೆ...","createButton":"ಪಟ್ಟಿ ರಚಿಸಿ"},"crops":{"potato":"ಆಲೂಗಡ್ಡೆ","onion":"ಈರುಳ್ಳಿ","tomato":"ಟೊಮೇಟೊ","wheat":"ಗೋಧಿ","rice":"ಅಕ್ಕಿ"}}});}),
"[project]/public/locales/bn/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"ডিজিটাল কৃষি বাজার","tagline":"কৃষক এবং ক্রেতাদের সংযুক্ত করা"},"nav":{"home":"হোম","listings":"তালিকা","market":"বাজার","profile":"প্রোফাইল"},"auth":{"farmer":{"title":"কৃষক নিবন্ধন","subtitle":"সরাসরি বিক্রয়কারী হাজার হাজার কৃষকের সাথে যোগ দিন","mobileLabel":"মোবাইল নম্বর","mobilePlaceholder":"আপনার 10-সংখ্যার মোবাইল নম্বর লিখুন","sendOtp":"OTP পাঠান","otpTitle":"OTP যাচাই করুন","otpSubtitle":"পাঠানো 6-সংখ্যার কোড লিখুন","verifyOtp":"যাচাই করুন","resendOtp":"OTP পুনরায় পাঠান","resendIn":"পুনরায় পাঠান","seconds":"সেকেন্ডে","success":"অ্যাকাউন্ট তৈরি হয়েছে!","successMessage":"ডিজিটাল কৃষি বাজারে স্বাগতম","continue":"ড্যাশবোর্ডে যান"},"buyer":{"title":"ক্রেতা নিবন্ধন","businessName":"ব্যবসার নাম","taxId":"কর ID / GST নম্বর","category":"ব্যবসার বিভাগ","categories":{"retailer":"খুচরা বিক্রেতা","cooperative":"সমবায়","institution":"প্রতিষ্ঠান"}},"errors":{"invalidMobile":"অনুগ্রহ করে একটি বৈধ 10-সংখ্যার মোবাইল নম্বর লিখুন","invalidOtp":"অনুগ্রহ করে একটি বৈধ 6-সংখ্যার OTP লিখুন","otpExpired":"OTP মেয়াদ শেষ হয়েছে। অনুগ্রহ করে নতুন অনুরোধ করুন।"}},"common":{"loading":"লোড হচ্ছে...","error":"কিছু ভুল হয়েছে","retry":"আবার চেষ্টা করুন","next":"পরবর্তী","back":"ফিরে যান","submit":"জমা দিন","cancel":"বাতিল করুন","changeLanguage":"ভাষা পরিবর্তন করুন"},"voice":{"startListening":"ভয়েস অনুসন্ধান শুরু করুন","stopListening":"শোনা বন্ধ করুন","listening":"শুনছে..."},"offline":{"noConnection":"আপনি অফলাইনে আছেন। কিছু বৈশিষ্ট্য সীমিত হতে পারে।","backOnline":"আপনি আবার অনলাইনে আছেন!"},"landing":{"hero":{"badge":"ন্যায্য মূল্য • তাজা পণ্য • সরাসরি সংযোগ","titlePrefix":"ভবিষ্যৎ","titleHighlight":"কৃষি বিপণনের"},"buttons":{"startSelling":"বিক্রয় শুরু করুন","startBuying":"কেনাকাটা শুরু করুন"},"features":{"fresh":{"title":"খামার থেকে তাজা","desc":"কোনো মধ্যস্থতাকারী ছাড়াই তাজা পণ্য সরাসরি পান।"},"quality":{"title":"গুণমান নিশ্চিত","desc":"যাচাইকৃত কৃষক এবং মানক গুণমান পরীক্ষা নিশ্চিত করে যে আপনি সেরাটি পাবেন।"},"fair":{"title":"ন্যায্য মূল্য নির্ধারণ","desc":"স্বচ্ছ বাজার দর কৃষকদের বেশি আয় করতে এবং ক্রেতাদের বাঁচাতে সাহায্য করে।"}}},"categories":{"vegetables":"শাকসবজি","fruits":"ফল","grains":"শস্য","spices":"মশলা"},"cart":{"title":"শপিং কার্ট","empty":"আপনার কার্ট খালি","emptyDesc":"শুরু করতে বাজার থেকে আইটেম যোগ করুন","addToCart":"কার্টে যোগ করুন","removeFromCart":"সরান","total":"মোট","subtotal":"উপমোট","checkout":"চেকআউট করুন","continueShopping":"কেনাকাটা চালিয়ে যান","itemCount":"{{count}} আইটেম","itemCount_plural":"{{count}} আইটেম","added":"কার্টে যোগ করা হয়েছে","removed":"কার্ট থেকে সরানো হয়েছে","updated":"কার্ট আপডেট করা হয়েছে","quantity":"পরিমাণ","price":"মূল্য","viewCart":"কার্ট দেখুন"},"checkout":{"title":"চেকআউট","deliveryInfo":"ডেলিভারি তথ্য","paymentMethod":"পেমেন্ট পদ্ধতি","orderSummary":"অর্ডার সারসংক্ষেপ","fullName":"পূর্ণ নাম","phoneNumber":"ফোন নম্বর","address":"ডেলিভারি ঠিকানা","city":"শহর","state":"রাজ্য","pincode":"পিনকোড","cod":"ক্যাশ অন ডেলিভারি","online":"অনলাইন পেমেন্ট","placeOrder":"অর্ডার করুন","orderPlaced":"অর্ডার সফলভাবে দেওয়া হয়েছে!","orderNumber":"অর্ডার নম্বর","thankYou":"আপনার অর্ডারের জন্য ধন্যবাদ","backToDashboard":"ড্যাশবোর্ডে ফিরে যান","deliveryCharge":"ডেলিভারি চার্জ","grandTotal":"সর্বমোট"},"listing":{"new":{"title":"নতুন তালিকা","uploadImage":"ফসলের ছবি আপলোড করুন","imageSupport":"JPG, PNG সমর্থিত","cropType":"ফসলের ধরন","selectCrop":"ফসল নির্বাচন করুন","variety":"জাত (ঐচ্ছিক)","varietyPlaceholder":"যেমন লাল, হাইব্রিড","totalQuantity":"মোট পরিমাণ (কেজি)","quantityPlaceholder":"যেমন 500","minQuantity":"ন্যূনতম অর্ডার পরিমাণ (কেজি)","minQuantityPlaceholder":"যেমন 50","pricePerKg":"প্রতি কেজি মূল্য (₹)","pricePlaceholder":"যেমন 25","creating":"তৈরি করা হচ্ছে...","createButton":"তালিকা তৈরি করুন"},"crops":{"potato":"আলু","onion":"পেঁয়াজ","tomato":"টমেটো","wheat":"গম","rice":"চাল"}}});}),
"[project]/public/locales/mr/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"डिजिटल कृषी बाजार","tagline":"शेतकरी आणि खरेदीदार जोडणे"},"nav":{"home":"होम","listings":"यादी","market":"बाजार","profile":"प्रोफाइल"},"auth":{"farmer":{"title":"शेतकरी नोंदणी","subtitle":"थेट विक्री करणाऱ्या हजारो शेतकऱ्यांसोबत सामील व्हा","mobileLabel":"मोबाइल नंबर","mobilePlaceholder":"आपला 10-अंकी मोबाइल नंबर प्रविष्ट करा","sendOtp":"OTP पाठवा","otpTitle":"OTP सत्यापित करा","otpSubtitle":"पाठवलेला 6-अंकी कोड प्रविष्ट करा","verifyOtp":"सत्यापित करा","resendOtp":"OTP पुन्हा पाठवा","resendIn":"पुन्हा पाठवा","seconds":"सेकंदात","success":"खाते तयार झाले!","successMessage":"डिजिटल कृषी बाजारात आपले स्वागत आहे","continue":"डॅशबोर्डवर जा"},"buyer":{"title":"खरेदीदार नोंदणी","businessName":"व्यवसायाचे नाव","taxId":"कर ID / GST नंबर","category":"व्यवसाय श्रेणी","categories":{"retailer":"किरकोळ विक्रेता","cooperative":"सहकारी संस्था","institution":"संस्था"}},"errors":{"invalidMobile":"कृपया वैध 10-अंकी मोबाइल नंबर प्रविष्ट करा","invalidOtp":"कृपया वैध 6-अंकी OTP प्रविष्ट करा","otpExpired":"OTP कालबाह्य झाला. कृपया नवीन विनंती करा."}},"common":{"loading":"लोड होत आहे...","error":"काहीतरी चूक झाली","retry":"पुन्हा प्रयत्न करा","next":"पुढे","back":"मागे","submit":"सबमिट करा","cancel":"रद्द करा","changeLanguage":"भाषा बदला"},"voice":{"startListening":"व्हॉइस शोध सुरू करा","stopListening":"ऐकणे थांबवा","listening":"ऐकत आहे..."},"offline":{"noConnection":"तुम्ही ऑफलाइन आहात. काही वैशिष्ट्ये मर्यादित असू शकतात.","backOnline":"तुम्ही पुन्हा ऑनलाइन आहात!"},"landing":{"hero":{"badge":"वाजवी किंमत • ताज्या भाज्या • थेट संपर्क","titlePrefix":"भविष्य","titleHighlight":"कृषी विपणनाचे"},"buttons":{"startSelling":"विक्री सुरू करा","startBuying":"खरेदी सुरू करा"},"features":{"fresh":{"title":"शेतातून ताजे","desc":"कोणताही मध्यस्थ न घेता ताज्या उत्पादनापर्यंत थेट प्रवेश."},"quality":{"title":"गुणवत्ता सुनिश्चित","desc":"सत्यापित शेतकरी आणि मानक गुणवत्ता तपासणी सुनिश्चित करते की तुम्हाला सर्वोत्तम मिळेल."},"fair":{"title":"वाजवी किंमत","desc":"पारदर्शक बाजार दर शेतकऱ्यांना अधिक कमावण्यास आणि खरेदीदारांना अधिक बचत करण्यास मदत करतात."}}},"categories":{"vegetables":"भाजीपाला","fruits":"फळे","grains":"धान्य","spices":"मसाले"},"cart":{"title":"शॉपिंग कार्ट","empty":"तुमची कार्ट रिकामी आहे","emptyDesc":"सुरू करण्यासाठी बाजारातून वस्तू जोडा","addToCart":"कार्टमध्ये जोडा","removeFromCart":"काढा","total":"एकूण","subtotal":"उप-एकूण","checkout":"चेकआउट करा","continueShopping":"खरेदी सुरू ठेवा","itemCount":"{{count}} वस्तू","itemCount_plural":"{{count}} वस्तू","added":"कार्टमध्ये जोडले","removed":"कार्टमधून काढले","updated":"कार्ट अपडेट केले","quantity":"प्रमाण","price":"किंमत","viewCart":"कार्ट पहा"},"checkout":{"title":"चेकआउट","deliveryInfo":"डिलिव्हरी माहिती","paymentMethod":"पेमेंट पद्धत","orderSummary":"ऑर्डर सारांश","fullName":"पूर्ण नाव","phoneNumber":"फोन नंबर","address":"डिलिव्हरी पत्ता","city":"शहर","state":"राज्य","pincode":"पिनकोड","cod":"कॅश ऑन डिलिव्हरी","online":"ऑनलाइन पेमेंट","placeOrder":"ऑर्डर द्या","orderPlaced":"ऑर्डर यशस्वीरित्या दिले!","orderNumber":"ऑर्डर क्रमांक","thankYou":"तुमच्या ऑर्डरसाठी धन्यवाद","backToDashboard":"डॅशबोर्डवर परत जा","deliveryCharge":"डिलिव्हरी शुल्क","grandTotal":"एकूण रक्कम"},"listing":{"new":{"title":"नवीन लिस्टिंग","uploadImage":"पिकाचा फोटो अपलोड करा","imageSupport":"JPG, PNG समर्थित","cropType":"पिकाचा प्रकार","selectCrop":"पीक निवडा","variety":"प्रकार (पर्यायी)","varietyPlaceholder":"उदा. लाल, संकरित","totalQuantity":"एकूण प्रमाण (किलो)","quantityPlaceholder":"उदा. 500","minQuantity":"किमान ऑर्डर प्रमाण (किलो)","minQuantityPlaceholder":"उदा. 50","pricePerKg":"प्रति किलो किंमत (₹)","pricePlaceholder":"उदा. 25","creating":"तयार करत आहे...","createButton":"लिस्टिंग तयार करा"},"crops":{"potato":"बटाटा","onion":"कांदा","tomato":"टोमॅटो","wheat":"गहू","rice":"तांदूळ"}}});}),
"[project]/public/locales/gu/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"ડિજિટલ કૃષિ બજાર","tagline":"ખેડૂતો અને ખરીદદારોને જોડવું"},"nav":{"home":"હોમ","listings":"યાદીઓ","market":"બજાર","profile":"પ્રોફાઇલ"},"auth":{"farmer":{"title":"ખેડૂત નોંધણી","subtitle":"સીધા વેચાણ કરતા હજારો ખેડૂતો સાથે જોડાઓ","mobileLabel":"મોબાઇલ નંબર","mobilePlaceholder":"તમારો 10-અંકનો મોબાઇલ નંબર દાખલ કરો","sendOtp":"OTP મોકલો","otpTitle":"OTP ચકાસો","otpSubtitle":"મોકલેલો 6-અંકનો કોડ દાખલ કરો","verifyOtp":"ચકાસો","resendOtp":"OTP ફરીથી મોકલો","resendIn":"ફરીથી મોકલો","seconds":"સેકંડમાં","success":"ખાતું બનાવવામાં આવ્યું!","successMessage":"ડિજિટલ કૃષિ બજારમાં આપનું સ્વાગત છે","continue":"ડેશબોર્ડ પર જાઓ"},"buyer":{"title":"ખરીદદાર નોંધણી","businessName":"વ્યવસાયનું નામ","taxId":"કર ID / GST નંબર","category":"વ્યવસાય શ્રેણી","categories":{"retailer":"છૂટક વિક્રેતા","cooperative":"સહકારી મંડળી","institution":"સંસ્થા"}},"errors":{"invalidMobile":"કૃપા કરીને માન્ય 10-અંકનો મોબાઇલ નંબર દાખલ કરો","invalidOtp":"કૃપા કરીને માન્ય 6-અંકનો OTP દાખલ કરો","otpExpired":"OTP સમાપ્ત થયો. કૃપા કરીને નવો વિનંતી કરો."}},"common":{"loading":"લોડ થઈ રહ્યું છે...","error":"કંઈક ખોટું થયું","retry":"ફરી પ્રયાસ કરો","next":"આગળ","back":"પાછળ","submit":"સબમિટ કરો","cancel":"રદ કરો","changeLanguage":"ભાષા બદલો"},"voice":{"startListening":"વૉઇસ શોધ શરૂ કરો","stopListening":"સાંભળવાનું બંધ કરો","listening":"સાંભળી રહ્યું છે..."},"offline":{"noConnection":"તમે ઑફલાઇન છો. કેટલીક સુવિધાઓ મર્યાદિત હોઈ શકે છે.","backOnline":"તમે ફરીથી ઑનલાઇન છો!"},"landing":{"hero":{"badge":"વાજબી ભાવ • તાજી પેદાશ • સીધો સંપર્ક","titlePrefix":"ભવિષ્ય","titleHighlight":"કૃષિ માર્કેટિંગનું"},"buttons":{"startSelling":"વેચાણ શરૂ કરો","startBuying":"ખરીદી શરૂ કરો"},"features":{"fresh":{"title":"ખેતરોમાંથી તાજું","desc":"કોઈપણ મધ્યસ્થી વિના તાજી પેદાશો સુધી સીધી પહોંચ."},"quality":{"title":"ગુણવત્તા ખાતરી","desc":"ચકાસાયેલ ખેડૂતો અને ગુણવત્તા તપાસ ખાતરી કરે છે કે તમને શ્રેષ્ઠ મળે."},"fair":{"title":"વાજબી કિંમત","desc":"પારદર્શક બજાર દરો ખેડૂતોને વધુ કમાવવામાં અને ખરીદદારોને બચાવવામાં મદદ કરે છે."}}},"categories":{"vegetables":"શાકભાજી","fruits":"ફળો","grains":"અનાજ","spices":"મસાલા"},"cart":{"title":"શોપિંગ કાર્ટ","empty":"તમારી કાર્ટ ખાલી છે","emptyDesc":"શરૂ કરવા માટે બજારમાંથી વસ્તુઓ ઉમેરો","addToCart":"કાર્ટમાં ઉમેરો","removeFromCart":"દૂર કરો","total":"કુલ","subtotal":"પેટા કુલ","checkout":"ચેકઆઉટ કરો","continueShopping":"ખરીદી ચાલુ રાખો","itemCount":"{{count}} વસ્તુ","itemCount_plural":"{{count}} વસ્તુઓ","added":"કાર્ટમાં ઉમેરાયું","removed":"કાર્ટમાંથી દૂર કર્યું","updated":"કાર્ટ અપડેટ થયું","quantity":"જથ્થો","price":"કિંમત","viewCart":"કાર્ટ જુઓ"},"checkout":{"title":"ચેકઆઉટ","deliveryInfo":"ડિલિવરી માહિતી","paymentMethod":"ચુકવણી પદ્ધતિ","orderSummary":"ઓર્ડર સારાંશ","fullName":"પૂરું નામ","phoneNumber":"ફોન નંબર","address":"ડિલિવરી સરનામું","city":"શહેર","state":"રાજ્ય","pincode":"પિનકોડ","cod":"કેશ ઓન ડિલિવરી","online":"ઓનલાઇન ચુકવણી","placeOrder":"ઓર્ડર આપો","orderPlaced":"ઓર્ડર સફળતાપૂર્વક આપવામાં આવ્યો!","orderNumber":"ઓર્ડર નંબર","thankYou":"તમારા ઓર્ડર માટે આભાર","backToDashboard":"ડેશબોર્ડ પર પાછા જાઓ","deliveryCharge":"ડિલિવરી ચાર્જ","grandTotal":"કુલ રકમ"},"listing":{"new":{"title":"નવી યાદી","uploadImage":"પાકનું ચિત્ર અપલોડ કરો","imageSupport":"JPG, PNG સપોર્ટેડ","cropType":"પાકનો પ્રકાર","selectCrop":"પાક પસંદ કરો","variety":"જાત (વૈકલ્પિક)","varietyPlaceholder":"દા.ત. લાલ, હાઇબ્રિડ","totalQuantity":"કુલ જથ્થો (કિલો)","quantityPlaceholder":"દા.ત. 500","minQuantity":"ન્યૂનતમ ઓર્ડર જથ્થો (કિલો)","minQuantityPlaceholder":"દા.ત. 50","pricePerKg":"પ્રતિ કિલો કિંમત (₹)","pricePlaceholder":"દા.ત. 25","creating":"બનાવી રહ્યા છીએ...","createButton":"યાદી બનાવો"},"crops":{"potato":"બટાકા","onion":"ડુંગળી","tomato":"ટામેટા","wheat":"ઘઉં","rice":"ચોખા"}}});}),
"[project]/public/locales/pa/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"app\":{\"name\":\"ਡਿਜੀਟਲ ਖੇਤੀ ਮੰਡੀ\",\"tagline\":\"ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਜੋੜਨਾ\"},\"nav\":{\"home\":\"ਘਰ\",\"listings\":\"ਮੇਰੀ ਸੂਚੀ\",\"market\":\"ਮੰਡੀ\",\"profile\":\"ਪ੍ਰੋਫਾਈਲ\"},\"dashboard\":{\"welcomeFarmer\":\"ਜੀ ਆਇਆਂ ਨੂੰ, ਕਿਸਾਨ ਵੀਰ!\",\"manageCrops\":\"ਆਪਣੀਆਂ ਫਸਲਾਂ ਅਤੇ ਆਰਡਰਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ\",\"newListing\":\"ਨਵੀਂ ਸੂਚੀ\",\"totalSales\":\"ਕੁੱਲ ਵਿਕਰੀ\",\"activeListings\":\"ਸਰਗਰਮ ਸੂਚੀਆਂ\",\"todaysPrice\":\"ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ\",\"status\":{\"active\":\"ਸਰਗਰਮ\",\"sold\":\"ਵਿਕ ਗਿਆ\",\"expired\":\"ਮਿਆਦ ਪੁੱਗ\"},\"noListings\":\"ਕੋਈ ਸੂਚੀ ਨਹੀਂ ਮਿਲੀ\",\"startSellingDescription\":\"ਤੁਸੀਂ ਅਜੇ ਤੱਕ ਕੋਈ ਸੂਚੀ ਪੋਸਟ ਨਹੀਂ ਕੀਤੀ। ਅੱਜ ਹੀ ਆਪਣੀ ਫਸਲ ਵੇਚਣੀ ਸ਼ੁਰੂ ਕਰੋ!\",\"createFirstListing\":\"ਆਪਣੀ ਪਹਿਲੀ ਸੂਚੀ ਬਣਾਓ\",\"welcomeBuyer\":\"ਜੀ ਆਇਆਂ ਨੂੰ, ਖਰੀਦਦਾਰ!\",\"findFreshProduce\":\"ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧਾ ਤਾਜ਼ਾ ਉਪਜ ਲੱਭੋ\",\"adminConsole\":\"ਐਡਮਿਨ ਕੰਸੋਲ\",\"systemOverview\":\"ਸਿਸਟਮ ਸੰਖੇਪ ਜਾਣਕਾਰੀ\",\"totalFarmers\":\"ਕੁੱਲ ਕਿਸਾਨ\",\"totalBuyers\":\"ਕੁੱਲ ਖਰੀਦਦਾਰ\",\"totalRevenue\":\"ਕੁੱਲ ਆਮਦਨ\",\"recentRegistrations\":\"ਹਾਲੀਆ ਰਜਿਸਟ੍ਰੇਸ਼ਨਾਂ\",\"user\":\"ਯੂਜ਼ਰ\",\"type\":\"ਕਿਸਮ\",\"date\":\"ਮਿਤੀ\",\"actions\":\"ਕਾਰਵਾਈਆਂ\",\"buyer\":{\"welcome\":\"ਜੀ ਆਇਆਂ ਨੂੰ, ਖਰੀਦਦਾਰ!\",\"welcomeDesc\":\"ਆਪਣੇ ਆਰਡਰ ਪ੍ਰਬੰਧਿਤ ਕਰੋ ਅਤੇ ਡਿਲੀਵਰੀ ਟ੍ਰੈਕ ਕਰੋ\",\"browseMarket\":\"ਮੰਡੀ ਦੇਖੋ\",\"stats\":{\"totalOrders\":\"ਕੁੱਲ ਆਰਡਰ\",\"activeOrders\":\"ਸਰਗਰਮ ਆਰਡਰ\",\"completed\":\"ਪੂਰੇ ਹੋਏ\"},\"tabs\":{\"active\":\"ਸਰਗਰਮ ਆਰਡਰ\",\"completed\":\"ਪੂਰੇ ਹੋਏ ਆਰਡਰ\",\"cancelled\":\"ਰੱਦ ਕੀਤੇ ਆਰਡਰ\"},\"empty\":{\"title\":\"ਕੋਈ {{status}} ਆਰਡਰ ਨਹੀਂ\",\"desc\":\"ਸਾਡੇ ਕੋਲ ਇਸ ਸਮੇਂ ਕੋਈ {{status}} ਆਰਡਰ ਨਹੀਂ ਹਨ।\",\"startShopping\":\"ਖਰੀਦਦਾਰੀ ਸ਼ੁਰੂ ਕਰੋ\"},\"orderId\":\"ਆਰਡਰ #\",\"inProgress\":\"ਪ੍ਰਗਤੀ ਵਿੱਚ ਹੈ\",\"trackOrder\":\"ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ\"}},\"auth\":{\"farmer\":{\"title\":\"ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ\",\"subtitle\":\"ਸਿੱਧੇ ਵੇਚਣ ਵਾਲੇ ਹਜ਼ਾਰਾਂ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ\",\"mobileLabel\":\"ਮੋਬਾਈਲ ਨੰਬਰ\",\"mobilePlaceholder\":\"ਆਪਣਾ 10-ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ\",\"sendOtp\":\"OTP ਭੇਜੋ\",\"otpTitle\":\"OTP ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ\",\"otpSubtitle\":\"ਇਸ ਨੰਬਰ 'ਤੇ ਭੇਜਿਆ ਗਿਆ 6-ਅੰਕਾਂ ਦਾ ਕੋਡ ਦਰਜ ਕਰੋ\",\"verifyOtp\":\"ਪੁਸ਼ਟੀ ਕਰੋ\",\"resendOtp\":\"ਦੁਬਾਰਾ OTP ਭੇਜੋ\",\"resendIn\":\"ਦੁਬਾਰਾ ਭੇਜੋ\",\"seconds\":\"ਸਕਿੰਟਾਂ ਵਿੱਚ\",\"success\":\"ਖਾਤਾ ਬਣਾਇਆ ਗਿਆ!\",\"successMessage\":\"ਡਿਜੀਟਲ ਖੇਤੀ ਮੰਡੀ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ\",\"continue\":\"ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਜਾਓ\"},\"buyer\":{\"title\":\"ਖਰੀਦਦਾਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ\",\"businessName\":\"ਕਾਰੋਬਾਰ ਦਾ ਨਾਮ\",\"taxId\":\"ਟੈਕਸ ਆਈਡੀ / ਜੀਐਸਟੀ ਨੰਬਰ\",\"category\":\"ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ\",\"categories\":{\"retailer\":\"ਪਰਚੂਨ ਵਿਕਰੇਤਾ\",\"cooperative\":\"ਸਹਿਕਾਰੀ\",\"institution\":\"ਸੰਸਥਾ\"}},\"errors\":{\"invalidMobile\":\"ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਜਾਇਜ਼ 10-ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ\",\"invalidOtp\":\"ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਜਾਇਜ਼ 6-ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ\",\"otpExpired\":\"OTP ਦੀ ਮਿਆਦ ਪੁੱਗ ਗਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਨਵਾਂ ਮੰਗੋ।\"}},\"common\":{\"loading\":\"ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...\",\"error\":\"ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ\",\"retry\":\"ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ\",\"next\":\"ਅੱਗੇ\",\"back\":\"ਪਿੱਛੇ\",\"submit\":\"ਜਮ੍ਹਾਂ ਕਰੋ\",\"cancel\":\"ਰੱਦ ਕਰੋ\",\"changeLanguage\":\"ਭਾਸ਼ਾ ਬਦਲੋ\",\"language\":\"ਭਾਸ਼ਾ\",\"selectLanguage\":\"ਭਾਸ਼ਾ ਚੁਣੋ\",\"searchPlaceholder\":\"ਫਸਲਾਂ, ਕਿਸਾਨਾਂ ਦੀ ਖੋਜ ਕਰੋ...\",\"buyNow\":\"ਹੁਣੇ ਖਰੀਦੋ\",\"edit\":\"ਸੋਧੋ\",\"delete\":\"ਹਟਾਓ\"},\"voice\":{\"startListening\":\"ਵਾਇਸ ਖੋਜ ਸ਼ੁਰੂ ਕਰੋ\",\"stopListening\":\"ਸੁਣਨਾ ਬੰਦ ਕਰੋ\",\"listening\":\"ਸੁਣ ਰਿਹਾ ਹੈ...\"},\"offline\":{\"noConnection\":\"ਤੁਸੀਂ ਆਫਲਾਈਨ ਹੋ। ਕੁਝ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸੀਮਤ ਹੋ ਸਕਦੀਆਂ ਹਨ।\",\"backOnline\":\"ਤੁਸੀਂ ਵਾਪਸ ਔਨਲਾਈਨ ਹੋ!\"},\"landing\":{\"hero\":{\"badge\":\"उचित मूल्य • ताज़ा उपज • सीधा संपर्क\",\"titlePrefix\":\"ਭਵਿੱਖ\",\"titleHighlight\":\"ਖੇਤੀਬਾੜੀ ਮੰਡੀਕਰਨ ਦਾ\"},\"buttons\":{\"startSelling\":\"ਵੇਚਣਾ ਸ਼ੁਰੂ ਕਰੋ\",\"startBuying\":\"ਖਰੀਦਣਾ ਸ਼ੁਰੂ ਕਰੋ\"},\"features\":{\"fresh\":{\"title\":\"ਖੇਤਾਂ ਤੋਂ ਤਾਜ਼ਾ\",\"desc\":\"ਬਿਨਾਂ ਕਿਸੇ ਵਿਚੋਲੇ ਦੇ ਤਾਜ਼ਾ ਉਪਜ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ।\"},\"quality\":{\"title\":\"ਗੁਣਵੱਤਾ ਯਕੀਨੀ\",\"desc\":\"ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ ਅਤੇ ਮਿਆਰੀ ਗੁਣਵੱਤਾ ਜਾਂਚ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ ਕਿ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਮਿਲੇ।\"},\"fair\":{\"title\":\"ਉਚਿਤ ਮੁੱਲ ਨਿਰਧਾਰਨ\",\"desc\":\"ਪਾਰਦਰਸ਼ੀ ਮੰਡੀ ਦਰਾਂ ਕਿਸਾਨਾਂ ਨੂੰ ਵੱਧ ਕਮਾਉਣ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਵੱਧ ਬਚਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ।\"}}},\"categories\":{\"vegetables\":\"ਸਬਜ਼ੀਆਂ\",\"fruits\":\"ਫਲ\",\"grains\":\"ਅਨਾਜ\",\"spices\":\"ਮਸਾਲੇ\"},\"cart\":{\"title\":\"ਸ਼ਾਪਿੰਗ ਕਾਰਟ\",\"empty\":\"ਤੁਹਾਡੀ ਕਾਰਟ ਖਾਲੀ ਹੈ\",\"emptyDesc\":\"ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਮਾਰਕੀਟ ਤੋਂ ਆਈਟਮਾਂ ਜੋੜੋ\",\"addToCart\":\"ਕਾਰਟ ਵਿੱਚ ਜੋੜੋ\",\"removeFromCart\":\"ਹਟਾਓ\",\"total\":\"ਕੁੱਲ\",\"subtotal\":\"ਉਪ-ਜੋੜ\",\"checkout\":\"ਚੈੱਕਆਉਟ ਕਰੋ\",\"continueShopping\":\"ਖਰੀਦਦਾਰੀ ਜਾਰੀ ਰੱਖੋ\",\"itemCount\":\"{{count}} ਆਈਟਮ\",\"itemCount_plural\":\"{{count}} ਆਈਟਮਾਂ\",\"added\":\"ਕਾਰਟ ਵਿੱਚ ਜੋੜਿਆ ਗਿਆ\",\"removed\":\"ਕਾਰਟ ਤੋਂ ਹਟਾਇਆ ਗਿਆ\",\"updated\":\"ਕਾਰਟ ਅੱਪਡੇਟ ਕੀਤੀ ਗਈ\",\"quantity\":\"ਮਾਤਰਾ\",\"price\":\"ਕੀਮਤ\",\"viewCart\":\"ਕਾਰਟ ਦੇਖੋ\"},\"checkout\":{\"title\":\"ਚੈੱਕਆਉਟ\",\"deliveryInfo\":\"ਡਿਲੀਵਰੀ ਜਾਣਕਾਰੀ\",\"paymentMethod\":\"ਭੁਗਤਾਨ ਵਿਧੀ\",\"orderSummary\":\"ਆਰਡਰ ਸੰਖੇਪ\",\"fullName\":\"ਪੂਰਾ ਨਾਮ\",\"phoneNumber\":\"ਫ਼ੋਨ ਨੰਬਰ\",\"address\":\"ਡਿਲੀਵਰੀ ਪਤਾ\",\"city\":\"ਸ਼ਹਿਰ\",\"state\":\"ਰਾਜ\",\"pincode\":\"ਪਿੰਨਕੋਡ\",\"cod\":\"ਕੈਸ਼ ਆਨ ਡਿਲੀਵਰੀ\",\"online\":\"ਆਨਲਾਈਨ ਭੁਗਤਾਨ\",\"placeOrder\":\"ਆਰਡਰ ਕਰੋ\",\"orderPlaced\":\"ਆਰਡਰ ਸਫਲਤਾਪੂਰਵਕ ਦਿੱਤਾ ਗਿਆ!\",\"orderNumber\":\"ਆਰਡਰ ਨੰਬਰ\",\"thankYou\":\"ਤੁਹਾਡੇ ਆਰਡਰ ਲਈ ਧੰਨਵਾਦ\",\"backToDashboard\":\"ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ ਜਾਓ\",\"deliveryCharge\":\"ਡਿਲੀਵਰੀ ਚਾਰਜ\",\"grandTotal\":\"ਕੁੱਲ ਜੋੜ\"},\"listing\":{\"new\":{\"title\":\"ਨਵੀਂ ਲਿਸਟਿੰਗ\",\"uploadImage\":\"ਫਸਲ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ\",\"imageSupport\":\"JPG, PNG ਸਮਰਥਿਤ\",\"cropType\":\"ਫਸਲ ਦੀ ਕਿਸਮ\",\"selectCrop\":\"ਫਸਲ ਚੁਣੋ\",\"variety\":\"ਕਿਸਮ (ਵਿਕਲਪਿਕ)\",\"varietyPlaceholder\":\"ਜਿਵੇਂ ਲਾਲ, ਹਾਈਬ੍ਰਿਡ\",\"totalQuantity\":\"ਕੁੱਲ ਮਾਤਰਾ (ਕਿਲੋ)\",\"quantityPlaceholder\":\"ਜਿਵੇਂ 500\",\"minQuantity\":\"ਘੱਟੋ-ਘੱਟ ਆਰਡਰ ਮਾਤਰਾ (ਕਿਲੋ)\",\"minQuantityPlaceholder\":\"ਜਿਵੇਂ 50\",\"pricePerKg\":\"ਪ੍ਰਤੀ ਕਿਲੋ ਕੀਮਤ (₹)\",\"pricePlaceholder\":\"ਜਿਵੇਂ 25\",\"creating\":\"ਬਣਾ ਰਹੇ ਹਾਂ...\",\"createButton\":\"ਲਿਸਟਿੰਗ ਬਣਾਓ\"},\"crops\":{\"potato\":\"ਆਲੂ\",\"onion\":\"ਪਿਆਜ਼\",\"tomato\":\"ਟਮਾਟਰ\",\"wheat\":\"ਕਣਕ\",\"rice\":\"ਚੌਲ\"}},\"market\":{\"title\":\"ਮੰਡੀ\",\"subtitle\":\"ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧਾ\",\"filters\":{\"title\":\"ਫਿਲਟਰ\",\"categories\":\"ਸ਼੍ਰੇਣੀਆਂ\",\"allCategories\":\"ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ\",\"region\":\"ਖੇਤਰ\",\"allIndia\":\"ਸਾਰਾ ਭਾਰਤ\",\"priceRange\":\"ਕੀਮਤ ਰੇਂਜ\",\"reset\":\"ਫਿਲਟਰ ਰੀਸੈਟ ਕਰੋ\",\"active\":\"ਸਰਗਰਮ ਫਿਲਟਰ:\"},\"searchPlaceholder\":\"ਫਸਲਾਂ, ਕਿਸਾਨਾਂ ਦੀ ਖੋਜ ਕਰੋ...\",\"noCrops\":{\"title\":\"ਕੋਈ ਫਸਲ ਨਹੀਂ ਮਿਲੀ\",\"desc\":\"ਆਪਣੇ ਫਿਲਟਰ ਜਾਂ ਖੋਜ ਬਦਲੋ\"},\"card\":{\"min\":\"ਘੱਟੋ ਘੱਟ\",\"add\":\"ਸ਼ਾਮਲ ਕਰੋ\"}}}"));}),
"[project]/public/locales/hr/common.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"app":{"name":"डिजिटल खेती मंडी","tagline":"किसानां अर खरीदार ने जोड़ना"},"nav":{"home":"घर","listings":"मेरी लिस्टिंग","market":"मंडी","profile":"प्रोफाइल"},"dashboard":{"welcomeFarmer":"राम राम, किसान भाई!","manageCrops":"अपनी फसल अर आर्डर का हिसाब राखो","newListing":"नई लिस्टिंग","totalSales":"कुल बिक्री","activeListings":"चालू लिस्टिंग","todaysPrice":"आज का भाव","status":{"active":"चालू","sold":"बिक गया","expired":"पुराना"},"noListings":"कोई लिस्टिंग ना मिली","startSellingDescription":"तमनै इब तक कोई लिस्टिंग ना डाली। आज ही अपनी फसल बेचना शुरू करो!","createFirstListing":"पहली लिस्टिंग बणाओ","welcomeBuyer":"राम राम, खरीदार!","findFreshProduce":"किसानां तै सीधा ताजा माल ल्यो","adminConsole":"एडमिन कंसोल","systemOverview":"सिस्टम की जानकारी","totalFarmers":"कुल किसान","totalBuyers":"कुल खरीदार","totalRevenue":"कुल कमाई","recentRegistrations":"नई रजिस्ट्रेशन","user":"यूजर","type":"किसम","date":"तारीख","actions":"काम"},"auth":{"farmer":{"title":"किसान रजिस्ट्रेशन","subtitle":"सीधा बेचने आले हजारों किसानां गैल जुड़ो","mobileLabel":"मोबाइल नंबर","mobilePlaceholder":"अपणा 10 अंक का नंबर भर","sendOtp":"OTP भेज","otpTitle":"OTP पक्का कर","otpSubtitle":"फोन पै आया 6 अंक का कोड भर","verifyOtp":"पक्का कर","resendOtp":"फेर तै भेज","resendIn":"रुक","seconds":"सेकंड","success":"खाता बण गया!","successMessage":"डिजिटल खेती मंडी म थारा स्वागत सै","continue":"डैशबोर्ड पै चल"},"buyer":{"title":"खरीदार रजिस्ट्रेशन","businessName":"कारोबार का नाम","taxId":"टैक्स आईडी / जीएसटी","category":"कारोबार की किसम","categories":{"retailer":"दुकानदार","cooperative":"सहकारी","institution":"संस्था"}},"errors":{"invalidMobile":"कृपया करके सही 10 अंक का नंबर भर","invalidOtp":"कृपया करके सही 6 अंक का OTP भर","otpExpired":"OTP पुराना हो गया। नया मांग।"}},"common":{"loading":"रुक...","error":"कोई गड़बड़ हैगी","retry":"फेर कोशिश कर","next":"आगे","back":"पाछै","submit":"जमा कर","cancel":"रद्द कर","changeLanguage":"भाषा बदल","searchPlaceholder":"फसल, किसान ढूंढ...","buyNow":"इबै खरीद","edit":"ठीक कर","delete":"हटा"},"voice":{"startListening":"बोल कै ढूंढ","stopListening":"सुणना बंद कर","listening":"सुण रहया हूं..."},"offline":{"noConnection":"नेट ना चाल रहया। कुछ चीज़ ना चालै।","backOnline":"नेट आ गया!"},"landing":{"hero":{"badge":"सही दाम • ताज़ा माल • सीधा संपर्क","titlePrefix":"भविष्य","titleHighlight":"खेती बाज़ार का"},"buttons":{"startSelling":"बेचना शुरू करो","startBuying":"खरीदना शुरू करो"},"features":{"fresh":{"title":"खेत तै ताज़ा","desc":"बिना किसी बिचोलिए के ताज़ा माल तक सीधी पहुंच।"},"quality":{"title":"बढ़िया क्वालिटी","desc":"पक्के किसान और बढ़िया जाँच ताकि तनै सबतै बढ़िया मिलै।"},"fair":{"title":"सही भाव","desc":"साफ-सुथरे बाज़ार भाव तै किसान भी कमावै और ग्राहक भी बचावै।"}}},"categories":{"vegetables":"साग-सब्जी","fruits":"फल","grains":"अनाज","spices":"मसाले"},"cart":{"title":"शॉपिंग कार्ट","empty":"थारी कार्ट खाली सै","emptyDesc":"शुरू करण खातर बाजार तै चीज जोड़ो","addToCart":"कार्ट म्ह जोड़ो","removeFromCart":"हटाओ","total":"कुल","subtotal":"उप-जोड़","checkout":"चेकआउट करो","continueShopping":"खरीददारी जारी राक्खो","itemCount":"{{count}} चीज","itemCount_plural":"{{count}} चीजां","added":"कार्ट म्ह जोड़ दी गी","removed":"कार्ट तै हटा दी गी","updated":"कार्ट अपडेट होगी","quantity":"मात्रा","price":"कीमत","viewCart":"कार्ट देखो"},"checkout":{"title":"चेकआउट","deliveryInfo":"डिलीवरी जाणकारी","paymentMethod":"भुगतान तरीका","orderSummary":"ऑर्डर सारांश","fullName":"पूरा नाम","phoneNumber":"फोन नंबर","address":"डिलीवरी पता","city":"शहर","state":"राज्य","pincode":"पिनकोड","cod":"कैश ऑन डिलीवरी","online":"ऑनलाइन भुगतान","placeOrder":"ऑर्डर करो","orderPlaced":"ऑर्डर सफलतापूर्वक दे दिया!","orderNumber":"ऑर्डर नंबर","thankYou":"थारे ऑर्डर खातर धन्यवाद","backToDashboard":"डैशबोर्ड पै वापस जाओ","deliveryCharge":"डिलीवरी चार्ज","grandTotal":"कुल जोड़"},"listing":{"new":{"title":"नई लिस्टिंग","uploadImage":"फसल की तस्वीर अपलोड करो","imageSupport":"JPG, PNG समर्थित","cropType":"फसल की किस्म","selectCrop":"फसल चुणो","variety":"किस्म (वैकल्पिक)","varietyPlaceholder":"जिसा लाल, हाइब्रिड","totalQuantity":"कुल मात्रा (किलो)","quantityPlaceholder":"जिसा 500","minQuantity":"न्यूनतम ऑर्डर मात्रा (किलो)","minQuantityPlaceholder":"जिसा 50","pricePerKg":"प्रति किलो कीमत (₹)","pricePlaceholder":"जिसा 25","creating":"बणा रहे सां...","createButton":"लिस्टिंग बणाओ"},"crops":{"potato":"आलू","onion":"प्याज","tomato":"टमाटर","wheat":"गेहूं","rice":"चावल"}}});}),
"[project]/src/lib/i18n.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js [app-ssr] (ecmascript)");
// Import translations
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$en$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/en/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$hi$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/hi/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$ta$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/ta/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$te$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/te/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$kn$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/kn/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$bn$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/bn/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$mr$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/mr/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$gu$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/gu/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$pa$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/pa/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$hr$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/hr/common.json (json)");
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
;
;
;
const resources = {
    en: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$en$2f$common$2e$json__$28$json$29$__["default"]
    },
    hi: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$hi$2f$common$2e$json__$28$json$29$__["default"]
    },
    ta: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$ta$2f$common$2e$json__$28$json$29$__["default"]
    },
    te: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$te$2f$common$2e$json__$28$json$29$__["default"]
    },
    kn: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$kn$2f$common$2e$json__$28$json$29$__["default"]
    },
    bn: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$bn$2f$common$2e$json__$28$json$29$__["default"]
    },
    mr: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$mr$2f$common$2e$json__$28$json$29$__["default"]
    },
    gu: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$gu$2f$common$2e$json__$28$json$29$__["default"]
    },
    pa: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$pa$2f$common$2e$json__$28$json$29$__["default"]
    },
    hr: {
        common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$hr$2f$common$2e$json__$28$json$29$__["default"]
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]).use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: [
        'common'
    ],
    detection: {
        order: [
            'localStorage',
            'navigator'
        ],
        caches: [
            'localStorage'
        ]
    },
    interpolation: {
        escapeValue: false
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/src/components/Providers.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.jsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/OfflineBanner/OfflineBanner.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "banner": "OfflineBanner-module__FFIJhq__banner",
  "content": "OfflineBanner-module__FFIJhq__content",
  "icon": "OfflineBanner-module__FFIJhq__icon",
  "message": "OfflineBanner-module__FFIJhq__message",
  "offline": "OfflineBanner-module__FFIJhq__offline",
  "online": "OfflineBanner-module__FFIJhq__online",
  "slideDown": "OfflineBanner-module__FFIJhq__slideDown",
});
}),
"[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OfflineBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/OfflineBanner/OfflineBanner.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
function OfflineBanner() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [isOnline, setIsOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showBanner, setShowBanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Set initial state
        setIsOnline(navigator.onLine);
        const handleOnline = ()=>{
            setIsOnline(true);
            // Show "back online" message briefly
            setShowBanner(true);
            setTimeout(()=>setShowBanner(false), 3000);
        };
        const handleOffline = ()=>{
            setIsOnline(false);
            setShowBanner(true);
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return ()=>{
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    if (!showBanner && isOnline) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].banner} ${isOnline ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].online : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].offline}`,
        role: "alert",
        "aria-live": "assertive",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                    children: isOnline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                            points: "20 6 9 17 4 12"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                            lineNumber: 51,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                        lineNumber: 50,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "1",
                                y1: "1",
                                x2: "23",
                                y2: "23"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 55,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 56,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 57,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M10.71 5.05A16 16 0 0 1 22.58 9"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 58,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 59,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8.53 16.11a6 6 0 0 1 6.95 0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 60,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "12",
                                y1: "20",
                                x2: "12.01",
                                y2: "20"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                                lineNumber: 61,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                        lineNumber: 54,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                    lineNumber: 48,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OfflineBanner$2f$OfflineBanner$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].message,
                    children: isOnline ? t('offline.backOnline') : t('offline.noConnection')
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
            lineNumber: 47,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/OfflineBanner/OfflineBanner.jsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/ui/BottomNav/BottomNav.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "BottomNav-module__v1ZkUW__active",
  "bottomNav": "BottomNav-module__v1ZkUW__bottomNav",
  "bounce": "BottomNav-module__v1ZkUW__bounce",
  "iconWrapper": "BottomNav-module__v1ZkUW__iconWrapper",
  "label": "BottomNav-module__v1ZkUW__label",
  "navItem": "BottomNav-module__v1ZkUW__navItem",
});
}),
"[project]/src/components/ui/BottomNav/BottomNav.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-ssr] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BottomNav$2f$BottomNav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/BottomNav/BottomNav.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
function BottomNav() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const { userType, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    if (!isAuthenticated) return null;
    // Default links (public)
    let navItems = [
        {
            href: '/',
            label: t('nav.home'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
        },
        {
            href: '/market',
            label: t('nav.market'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"]
        },
        {
            href: '/profile',
            label: t('nav.profile'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
        }
    ];
    if (userType === 'farmer') {
        navItems = [
            {
                href: '/farmer/dashboard',
                label: t('nav.home'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
            },
            {
                href: '/farmer/listings',
                label: t('nav.listings'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"]
            },
            {
                href: '/market',
                label: t('nav.market'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"]
            },
            {
                href: '/profile',
                label: t('nav.profile'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
            }
        ];
    } else if (userType === 'buyer') {
        navItems = [
            {
                href: '/buyer/dashboard',
                label: t('nav.home'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
            },
            {
                href: '/market',
                label: t('nav.market'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"]
            },
            // Maybe add Orders here later
            {
                href: '/profile',
                label: t('nav.profile'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
            }
        ];
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BottomNav$2f$BottomNav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bottomNav,
        role: "navigation",
        "aria-label": "Main navigation",
        children: navItems.map((item)=>{
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BottomNav$2f$BottomNav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem} ${isActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BottomNav$2f$BottomNav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                "aria-label": item.label,
                "aria-current": isActive ? 'page' : undefined,
                suppressHydrationWarning: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BottomNav$2f$BottomNav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 24
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/BottomNav/BottomNav.jsx",
                            lineNumber: 55,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BottomNav/BottomNav.jsx",
                        lineNumber: 54,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BottomNav$2f$BottomNav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                        suppressHydrationWarning: true,
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BottomNav/BottomNav.jsx",
                        lineNumber: 57,
                        columnNumber: 25
                    }, this)
                ]
            }, item.href, true, {
                fileName: "[project]/src/components/ui/BottomNav/BottomNav.jsx",
                lineNumber: 46,
                columnNumber: 21
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/ui/BottomNav/BottomNav.jsx",
        lineNumber: 41,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "LanguageSwitcher-module__43PcSG__active",
  "arrow": "LanguageSwitcher-module__43PcSG__arrow",
  "backdrop": "LanguageSwitcher-module__43PcSG__backdrop",
  "compact": "LanguageSwitcher-module__43PcSG__compact",
  "dropdown": "LanguageSwitcher-module__43PcSG__dropdown",
  "header": "LanguageSwitcher-module__43PcSG__header",
  "langCode": "LanguageSwitcher-module__43PcSG__langCode",
  "langEnglish": "LanguageSwitcher-module__43PcSG__langEnglish",
  "langIcon": "LanguageSwitcher-module__43PcSG__langIcon",
  "langName": "LanguageSwitcher-module__43PcSG__langName",
  "langOption": "LanguageSwitcher-module__43PcSG__langOption",
  "mainButton": "LanguageSwitcher-module__43PcSG__mainButton",
  "slideDown": "LanguageSwitcher-module__43PcSG__slideDown",
  "switcher": "LanguageSwitcher-module__43PcSG__switcher",
});
}),
"[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
const LANGUAGES = [
    {
        code: 'en',
        name: 'English',
        nativeName: 'English'
    },
    {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी'
    },
    {
        code: 'ta',
        name: 'Tamil',
        nativeName: 'தமிழ்'
    },
    {
        code: 'te',
        name: 'Telugu',
        nativeName: 'తెలుగు'
    },
    {
        code: 'kn',
        name: 'Kannada',
        nativeName: 'ಕನ್ನಡ'
    },
    {
        code: 'bn',
        name: 'Bengali',
        nativeName: 'বাংলা'
    },
    {
        code: 'mr',
        name: 'Marathi',
        nativeName: 'मराठी'
    },
    {
        code: 'gu',
        name: 'Gujarati',
        nativeName: 'ગુજરાતી'
    },
    {
        code: 'pa',
        name: 'Punjabi',
        nativeName: 'ਪੰਜਾਬੀ'
    },
    {
        code: 'hr',
        name: 'Haryanvi',
        nativeName: 'हरियाणवी'
    }
];
function LanguageSwitcher({ variant = 'default' }) {
    const { i18n, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentLang, setCurrentLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en');
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        setCurrentLang(i18n.language);
    }, [
        i18n.language
    ]);
    if (!mounted) {
        return null; // or a loading skeleton/default state
    }
    const changeLanguage = (langCode)=>{
        i18n.changeLanguage(langCode);
        setCurrentLang(langCode);
        setIsOpen(false);
    };
    const currentLanguage = LANGUAGES.find((lang)=>lang.code === currentLang) || LANGUAGES[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].switcher} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][variant]}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainButton,
                "aria-label": t('common.changeLanguage'),
                "aria-expanded": isOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].langIcon,
                        children: "🌐"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].langCode,
                        children: currentLanguage.nativeName
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].arrow,
                        children: isOpen ? '▲' : '▼'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdown,
                children: LANGUAGES.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>changeLanguage(lang.code),
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].langOption} ${lang.code === currentLang ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].langName,
                                children: lang.nativeName
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                                lineNumber: 64,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].langEnglish,
                                children: lang.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                                lineNumber: 65,
                                columnNumber: 29
                            }, this)
                        ]
                    }, lang.code, true, {
                        fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                        lineNumber: 59,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                lineNumber: 57,
                columnNumber: 17
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backdrop,
                onClick: ()=>setIsOpen(false),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
                lineNumber: 72,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/VoiceSearch/VoiceSearch.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoiceSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-ssr] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function VoiceSearch({ onResult, placeholder }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [supported, setSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setSupported(true);
        }
    }, []);
    const toggleListening = ()=>{
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };
    const startListening = ()=>{
        setIsListening(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // Could be dynamic based on i18n language
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event)=>{
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };
        recognition.onerror = (event)=>{
            console.error('Voice search error', event.error);
            setIsListening(false);
        };
        recognition.onend = ()=>{
            setIsListening(false);
        };
        recognition.start();
    };
    const stopListening = ()=>{
        // Recognition stops automatically on end, but we can manage state here
        setIsListening(false);
    };
    if (!supported) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleListening,
        className: `
                p-2.5 rounded-full transition-all duration-300 relative
                ${isListening ? 'bg-red-100 text-red-600 animate-pulse ring-2 ring-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `,
        title: isListening ? t('voice.stopListening') : t('voice.startListening'),
        children: isListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/VoiceSearch/VoiceSearch.jsx",
            lineNumber: 72,
            columnNumber: 28
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/VoiceSearch/VoiceSearch.jsx",
            lineNumber: 72,
            columnNumber: 61
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/VoiceSearch/VoiceSearch.jsx",
        lineNumber: 61,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/CartButton/CartButton.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/cartSlice.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function CartButton() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.cart.items);
    const itemCount = items.reduce((sum, item)=>sum + item.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toggleCart"])()),
        className: "relative p-2.5 hover:bg-gray-100 rounded-full transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                className: "w-6 h-6 text-gray-700"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CartButton/CartButton.jsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            itemCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce",
                children: itemCount > 9 ? '9+' : itemCount
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CartButton/CartButton.jsx",
                lineNumber: 19,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/CartButton/CartButton.jsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/Header/Header.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "Header-module__GS2qTq__actions",
  "container": "Header-module__GS2qTq__container",
  "header": "Header-module__GS2qTq__header",
  "logo": "Header-module__GS2qTq__logo",
  "logoText": "Header-module__GS2qTq__logoText",
  "tagline": "Header-module__GS2qTq__tagline",
});
}),
"[project]/src/components/ui/Header/Header.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$VoiceSearch$2f$VoiceSearch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/VoiceSearch/VoiceSearch.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartButton$2f$CartButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CartButton/CartButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/Header/Header.module.css [app-ssr] (css module)");
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
function Header({ showVoiceSearch = false, onVoiceResult }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth.user);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoText,
                            children: t('app.name')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Header/Header.jsx",
                            lineNumber: 27,
                            columnNumber: 21
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tagline,
                            children: t('app.tagline')
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Header/Header.jsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Header/Header.jsx",
                    lineNumber: 26,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                    children: [
                        showVoiceSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$VoiceSearch$2f$VoiceSearch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onResult: onVoiceResult
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Header/Header.jsx",
                            lineNumber: 33,
                            columnNumber: 25
                        }, this),
                        user?.type === 'buyer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartButton$2f$CartButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/Header/Header.jsx",
                            lineNumber: 35,
                            columnNumber: 48
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            variant: "header"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Header/Header.jsx",
                            lineNumber: 36,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Header/Header.jsx",
                    lineNumber: 31,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Header/Header.jsx",
            lineNumber: 25,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Header/Header.jsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/Toast/Toast.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer,
    "showToast",
    ()=>showToast,
    "toast",
    ()=>toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
'use client';
;
;
;
;
// Simple event bus for toasts
const listeners = new Set();
const toast = {
    success: (message)=>notify('success', message),
    error: (message)=>notify('error', message),
    info: (message)=>notify('info', message)
};
const showToast = (message, type = 'info')=>notify(type, message);
const notify = (type, message)=>{
    listeners.forEach((listener)=>listener({
            type,
            message,
            id: Date.now()
        }));
};
function ToastContainer() {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const handleToast = (toast)=>{
            setToasts((prev)=>[
                    ...prev,
                    toast
                ]);
            setTimeout(()=>{
                setToasts((prev)=>prev.filter((t)=>t.id !== toast.id));
            }, 3000); // Auto dismiss after 3s
        };
        listeners.add(handleToast);
        return ()=>listeners.delete(handleToast);
    }, []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4",
        children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
                        flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-bottom-5 fade-in duration-300
                        ${t.type === 'success' ? 'bg-white border-green-200 text-green-800' : ''}
                        ${t.type === 'error' ? 'bg-white border-red-200 text-red-800' : ''}
                        ${t.type === 'info' ? 'bg-gray-900 border-gray-800 text-white' : ''}
                    `,
                children: [
                    t.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        className: "w-5 h-5 text-green-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                        lineNumber: 52,
                        columnNumber: 46
                    }, this),
                    t.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-5 h-5 text-red-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                        lineNumber: 53,
                        columnNumber: 44
                    }, this),
                    t.type === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                        lineNumber: 54,
                        columnNumber: 43
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium flex-1",
                        children: t.message
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                        lineNumber: 56,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setToasts((prev)=>prev.filter((toast)=>toast.id !== t.id)),
                        className: "p-1 hover:bg-black/5 rounded-full transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4 opacity-50"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                            lineNumber: 62,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                        lineNumber: 58,
                        columnNumber: 21
                    }, this)
                ]
            }, t.id, true, {
                fileName: "[project]/src/components/ui/Toast/Toast.jsx",
                lineNumber: 43,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Toast/Toast.jsx",
        lineNumber: 41,
        columnNumber: 9
    }, this), document.body);
}
}),
"[project]/src/components/ui/Cart/Cart.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/cartSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Cart() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { items, isOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.cart);
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    const isAadharVerified = user?.aadharVerified || false;
    const total = items.reduce((sum, item)=>{
        const price = parseFloat(item.price.replace('₹', '').replace('/kg', ''));
        return sum + price * item.quantity;
    }, 0);
    const handleRemove = (id)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeFromCart"])(id));
    };
    const handleUpdateQuantity = (id, newQuantity)=>{
        if (newQuantity > 0) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateQuantity"])({
                id,
                quantity: newQuantity
            }));
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 transition-opacity",
                onClick: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCart"])())
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-6 border-b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        className: "w-6 h-6 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                        lineNumber: 48,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-gray-900",
                                        children: t('cart.title')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                        lineNumber: 49,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCart"])()),
                                className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-gray-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                    lineNumber: 55,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 51,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6 space-y-4",
                        children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center h-full text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    className: "w-16 h-16 text-gray-300 mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                    lineNumber: 63,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-medium",
                                    children: t('cart.empty')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                    lineNumber: 64,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-sm mt-2",
                                    children: t('cart.emptyDesc')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                    lineNumber: 65,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                            lineNumber: 62,
                            columnNumber: 25
                        }, this) : items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 rounded-xl p-4 flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: item.image,
                                            alt: item.name,
                                            width: 80,
                                            height: 80,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                            lineNumber: 71,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                        lineNumber: 70,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-gray-900 truncate",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                lineNumber: 80,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: item.farmer
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                lineNumber: 81,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-green-600 font-bold mt-1",
                                                children: item.price
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                lineNumber: 82,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mt-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 bg-white rounded-lg border border-gray-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleUpdateQuantity(item.id, item.quantity - 1),
                                                                className: "p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors",
                                                                disabled: item.quantity <= 1,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                    className: "w-4 h-4 text-gray-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                                    lineNumber: 92,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                                lineNumber: 87,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 font-medium text-gray-900",
                                                                children: [
                                                                    item.quantity,
                                                                    " kg"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                                lineNumber: 94,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleUpdateQuantity(item.id, item.quantity + 1),
                                                                className: "p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                    className: "w-4 h-4 text-gray-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                                    lineNumber: 99,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                                lineNumber: 95,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                        lineNumber: 86,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleRemove(item.id),
                                                        className: "p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                            lineNumber: 106,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                        lineNumber: 102,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                lineNumber: 85,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 69,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t p-6 space-y-4 bg-gray-50",
                        children: [
                            isAuthenticated && !isAadharVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl",
                                            children: "⚠️"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                            lineNumber: 122,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold text-yellow-900 text-sm mb-1",
                                                    children: t('cart.verificationRequired')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                    lineNumber: 124,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-yellow-800",
                                                    children: t('cart.pendingVerification')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                                    lineNumber: 127,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                            lineNumber: 123,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                    lineNumber: 121,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 120,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 font-medium",
                                        children: t('cart.subtotal')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                        lineNumber: 136,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: [
                                            "₹",
                                            total.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                        lineNumber: 137,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 135,
                                columnNumber: 25
                            }, this),
                            isAadharVerified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/checkout",
                                className: "block w-full bg-green-600 text-white text-center py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg",
                                onClick: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCart"])()),
                                children: t('cart.checkout')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 141,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: true,
                                className: "w-full bg-gray-300 text-gray-500 text-center py-3.5 rounded-xl font-bold cursor-not-allowed shadow-lg",
                                title: t('cart.verifyToCheckout'),
                                children: [
                                    t('cart.checkout'),
                                    " 🔒"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 149,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCart"])()),
                                className: "w-full text-gray-600 text-center py-2 font-medium hover:text-gray-900 transition-colors",
                                children: t('cart.continueShopping')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                        lineNumber: 117,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Cart/Cart.jsx",
                lineNumber: 44,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/ui/VoiceAgent/VoiceAgent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoiceAgent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-ssr] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function VoiceAgent() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])('common');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) //TURBOPACK unreachable
        ;
    }, [
        router
    ]);
    const processCommand = (command)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])(`Heard: "${command}"`, 'info');
        // Simple command parsing logic
        if (command.includes('market') || command.includes('buy')) {
            router.push('/market');
        } else if (command.includes('home') || command.includes('dashboard')) {
            if (pathname.includes('farmer')) router.push('/farmer/dashboard');
            else router.push('/buyer/dashboard');
        } else if (command.includes('cart')) {
            router.push('/cart'); // Or trigger openCart action
        } else if (command.includes('profile') || command.includes('account')) {
            router.push('/profile');
        } else if (command.includes('search') || command.includes('find')) {
            // "Search for tomato" -> extract "tomato"
            const query = command.replace('search', '').replace('find', '').replace('for', '').trim();
            if (query) {
                // Navigate to market with query? Or just focus search bar?
                // For now, simple navigation
                // Need to pass query param, but we don't have search page query implementation yet fully
                // Assume market search
                // Use custom event or Redux?
                // Let's just toast for now and route
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])(`Searching for ${query}...`, 'success');
            // Could implement URL param search later
            }
        } else if (command.includes('logout')) {
            // Trigger logout? Maybe too dangerous for voice
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Please use the menu to logout', 'info');
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Command not recognized', 'warning');
        }
    };
    const toggleListening = ()=>{
        if (!recognitionRef.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Voice recognition not supported in this browser', 'error');
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };
    // Don't show on login/register pages
    if (pathname.includes('/auth') || pathname === '/') return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2",
        children: [
            transcript && isListening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black/80 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm mb-2 animate-fade-in",
                children: transcript || 'Listening...'
            }, void 0, false, {
                fileName: "[project]/src/components/ui/VoiceAgent/VoiceAgent.jsx",
                lineNumber: 104,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleListening,
                className: `p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center ${isListening ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200' : 'bg-green-600 text-white hover:bg-green-700'}`,
                title: "Voice Assistant",
                children: isListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/VoiceAgent/VoiceAgent.jsx",
                    lineNumber: 117,
                    columnNumber: 32
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/VoiceAgent/VoiceAgent.jsx",
                    lineNumber: 117,
                    columnNumber: 65
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/VoiceAgent/VoiceAgent.jsx",
                lineNumber: 109,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/VoiceAgent/VoiceAgent.jsx",
        lineNumber: 102,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__556dc637._.js.map