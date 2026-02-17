# 🌾 Digital Agri Market — Frontend Guide

> A **Next.js 16** web app that connects farmers and buyers. Farmers list their crops, buyers browse the marketplace, add items to cart, and place orders. An admin panel approves/rejects users. The app supports **10 Indian languages**, works **offline** (PWA), and has **voice navigation**.

---

## Tech Stack at a Glance

| What | Why We Use It |
|---|---|
| **Next.js 16** (App Router) | File-based routing, server-side rendering, API proxy to backend |
| **React 19** | Component-based UI |
| **Redux Toolkit** | Global state for auth, cart, and listing wizard |
| **TailwindCSS 4** | Utility classes for styling (e.g., `bg-green-600 text-white rounded-xl`) |
| **i18next** | All text is translatable — supports 10 languages |
| **Leaflet + React Leaflet** | Interactive map for picking crop location and viewing crop locations |
| **Axios** | HTTP client used in the legacy `AuthContext` |
| **Framer Motion** | Page transitions and animations |
| **Lucide React** | Icon library (all icons like `Home`, `ShoppingBag`, `Mic`, `X`, etc.) |
| **Recharts** | Charts for data visualization |
| **@ducanh2912/next-pwa** | Makes the app installable on phones like a native app |

---

## How the App Works (User Flow)

```
Landing Page (/)
  ├── Farmer clicks "Start Selling"
  │     → Register (/farmer/register) → OTP verify → Farmer Dashboard
  │     → Create Listing (5-step wizard) → Published to Marketplace
  │
  ├── Buyer clicks "Start Buying"
  │     → Register (/buyer/register) → OTP verify → Buyer Dashboard
  │     → Browse Market → Add to Cart → Checkout → Order placed
  │
  └── Admin
        → Login with username/password (/admin/login)
        → Dashboard: Approve or Reject pending farmers/buyers
```

---

## Folder Structure — What's Where

### Root Config Files

| File | What It Does |
|---|---|
| `package.json` | Lists all dependencies. Run `npm run dev` to start, `npm run build` to build |
| `next.config.mjs` | **API Proxy**: all `/api/*` calls from frontend are forwarded to `http://localhost:5001/api/*` (backend). Also allows images from `unsplash.com` |
| `tailwind.config.js` | TailwindCSS settings |
| `jsconfig.json` | Lets you write `@/components/...` instead of `../../components/...` |
| `public/manifest.json` | PWA config — app name ("Digital Agri Market"), theme color (green), icons |

---

### `public/locales/` — Translation Files

Each language has a `common.json` with all the translated text. These are loaded by `i18n.js`.

**Languages:** English (`en`), Hindi (`hi`), Tamil (`ta`), Telugu (`te`), Kannada (`kn`), Bengali (`bn`), Marathi (`mr`), Gujarati (`gu`), Punjabi (`pa`), Haryanvi (`hr`)

> When you write `{t('nav.home')}` in any component, it pulls the correct translated text based on the user's selected language.

---

### `src/app/` — All Pages (Routes)

This is the **Next.js App Router**. Each folder with a `page.js`/`page.jsx` = a URL route.

#### Global Files (apply to every page)

| File | What It Does |
|---|---|
| `layout.js` | **Root wrapper** — every page is rendered inside this. It includes the Header (top bar), BottomNav (bottom bar), Cart drawer, VoiceAgent (floating mic button), OfflineBanner, and Toast notifications. Also wraps everything in Redux Provider + i18n |
| `globals.css` | CSS variables (colors, spacing, font) + TailwindCSS import + accessibility styles (focus outlines, screen reader class, high contrast support, reduced motion) |
| `page.js` | **Landing page** at `/` — shows hero section with "Start Selling" and "Start Buying" buttons, 3 feature cards (Fresh Produce, Quality Assured, Fair Pricing), footer with links. If user is already logged in, auto-redirects to their dashboard |

---

#### Auth Pages — `(auth)/`

> The `(auth)` parentheses mean it's a **route group** — it doesn't add `/auth/` to the URL.

| Route | File | What It Does |
|---|---|---|
| `/login` | `(auth)/login/page.jsx` | **Unified login** — has tabs for Farmer/Buyer/Admin. Enter 10-digit mobile → get OTP → enter OTP → logged in. If no account exists, redirects to register. Admin tab links to `/admin/login` |
| `/farmer/register` | `(auth)/farmer/register/page.jsx` | **Farmer registration** — OTP verification + enter name + sets role as "farmer" |
| `/buyer/register` | `(auth)/buyer/register/page.jsx` | **Buyer registration** — same flow, role is "buyer" |

---

#### Admin Pages — `admin/`

| Route | File | What It Does |
|---|---|---|
| `/admin/login` | `admin/login/page.jsx` | Admin login with **username + password** (not OTP). Dispatches `adminLoginAsync` |
| `/admin/dashboard` | `admin/dashboard/page.jsx` | Shows all registered users split into **Pending / Approved / Rejected** tabs. Admin can click Approve ✓ or Reject ✗ for each pending user. Shows stats (total users, pending count) |

---

#### Farmer Pages — `farmer/`

| Route | File | What It Does |
|---|---|---|
| `/farmer/dashboard` | `farmer/dashboard/page.js` | Farmer's home — shows their crop listings with status badges (Active/Pending/Sold). Can **delete** listings. "Add New Listing" button links to the wizard. Fetches data via `ApiService.getFarmerListings()` |
| `/farmer/listing/new` | `farmer/listing/new/page.js` | **Create New Listing** — renders the `ListingWizard` component (5-step form) |
| `/farmer/listing/edit/[id]` | `farmer/listing/edit/[id]/page.jsx` | **Edit Listing** — pre-filled wizard for an existing listing. `[id]` is a dynamic URL param |
| `/farmer/listing/batch` | `farmer/listing/batch/page.jsx` | **Batch Upload** — create multiple listings at once |
| `/farmer/listings` | `farmer/listings/page.js` | View all farmer's listings with filters |

---

#### Buyer Pages — `buyer/`

| Route | File | What It Does |
|---|---|---|
| `/buyer/dashboard` | `buyer/dashboard/page.js` | Buyer's home — shows their **orders** with tabs: All / Pending / Completed. Each order shows crop name, quantity, price, status, date. Fetches via `ApiService.getMyOrders()` |

---

#### Marketplace — `market/`

| Route | File | What It Does |
|---|---|---|
| `/market` | `market/page.js` | **Browse all available crops** — search bar, category filter (vegetables/fruits/grains/spices/flowers), region filter (Maharashtra/Karnataka/Tamil Nadu/Gujarat). Each crop shows as a card with image, name, price, farmer info, and "Add to Cart" button. Has a link to map view |
| `/market/map` | `market/map/page.jsx` | **Map view** — shows crop locations as pins on a Leaflet map. Tap a pin to see crop details |

---

#### Other Pages

| Route | File | What It Does |
|---|---|---|
| `/checkout` | `checkout/page.js` | **Checkout** — reads items from Redux cart, shows order summary with prices, delivery address input (with GPS auto-detect), "Place Order" button. Calls `ApiService.placeOrder()` then clears the cart |
| `/profile` | `profile/page.jsx` | **Profile settings** — edit name, select state/region, auto-detect location via GPS, choose crop interests (rice/wheat/cotton etc.), notification preferences. Has logout button and link to KYC page |
| `/profile/kyc` | `profile/kyc/page.jsx` | **KYC verification** — upload identity documents (Aadhaar, PAN) |
| `/session-expired` | `session-expired/page.js` | Shows "Session Expired" message with a "Login Again" button |

---

### `src/components/` — Reusable Components

#### Top-Level

| File | What It Does |
|---|---|
| `Providers.jsx` | Wraps the entire app with the Redux `<Provider>` (so any component can use `useSelector`/`useDispatch`). Also imports `i18n.js` to initialize translations |
| `AuthGuard.jsx` | Wrap any page with this to protect it. If user is not logged in (`isAuthenticated` is false in Redux), it redirects to `/login`. While checking, it shows nothing (blank screen) |

---

#### `common/` — Shared Utilities

| File | What It Does |
|---|---|
| `DocumentUpload.jsx` | A file upload component specifically for KYC — supports drag-and-drop, validates file type/size, shows preview of uploaded document |
| `ProtectedRoute.jsx` | Alternative to `AuthGuard` — wraps children and redirects if not authenticated |

---

#### `farmer/` — Farmer-Specific Components

| File | What It Does |
|---|---|
| `ProductForm.jsx` | Reusable form for adding or editing a product. Has fields: name, category, price, quantity, description, and image upload |
| `ProductList.jsx` | Displays a grid/list of the farmer's products with action buttons (edit, delete, view details) |

---

#### `listing/` — 5-Step Listing Wizard

When a farmer creates a new listing, they go through a **5-step wizard**. Each step is a separate component. The wizard state (current step, all form data) is stored in Redux's `listingSlice`.

| File | Step | What the User Does |
|---|---|---|
| `ListingWizard.jsx` | Controller | Renders the correct step based on `currentStep` in Redux. Shows a progress bar at the top and a back button. This is the parent component that switches between steps |
| `StepCategory.jsx` | Step 1 | Pick a crop category — clickable cards for: Vegetables, Fruits, Grains, Spices, Flowers |
| `StepDetails.jsx` | Step 2 | Fill in: crop name, variety, quantity, unit (kg/quintal/ton), expected price, harvest date, description, organic toggle |
| `StepQuality.jsx` | Step 3 | Select quality grade (A/B/C) and adjust quality sliders (freshness, size, color) |
| `StepLocation.jsx` | Step 4 | Pick location on an **interactive Leaflet map**. Has a GPS "auto-detect" button. Shows a draggable pin. Auto-fills address from coordinates |
| `StepReview.jsx` | Step 5 | Review everything entered so far as a preview card. Submit button calls `ApiService.addListing()` to publish |
| `ImageCapture.jsx` | Helper | Opens the device camera to photograph crops. Creates an image blob that gets attached to the listing |

---

#### `ui/` — UI Component Library

These are the building blocks used across all pages. Each component has its own folder with `.jsx` + `.module.css` (scoped styles).

| Component | Where It's Used | What It Does |
|---|---|---|
| `Header/Header.jsx` | Every page (via `layout.js`) | Top bar showing app name "🌾 Digital Agri Market" + tagline. On the right side: `LanguageSwitcher` (always), `CartButton` (only for buyers), `VoiceSearch` (when enabled). Hides during server render to avoid hydration issues |
| `BottomNav/BottomNav.jsx` | Every page (via `layout.js`) | Fixed bottom navigation bar (like a mobile app). **Only shows when logged in.** Shows different links based on role — Farmers see: Home, Listings, Market, Profile. Buyers see: Home, Market, Profile. Highlights the currently active page |
| `Button/Button.jsx` | Login, Register, Checkout, Forms | Styled button with loading spinner support. Pass `isLoading={true}` to show a spinner. Pass `fullWidth` to stretch it. Used for "Send OTP", "Place Order", "Submit", etc. |
| `Input/Input.jsx` | Login, Register, Profile, Forms | Styled text input with label above, placeholder text, and error message below. Supports icons. Used for mobile number input, name input, etc. |
| `OTPInput/OTPInput.jsx` | Login, Register | **6 individual digit boxes** for OTP entry. Auto-focuses the next box as you type. Handles paste (if you copy-paste the full OTP). Each box accepts 1 digit |
| `Cart/Cart.jsx` | Every page (via `layout.js`) | **Shopping cart drawer** that slides in from the right. Shows added items with images, names, prices, quantity +/- buttons, and a remove button. Shows total price. "Proceed to Checkout" links to `/checkout`. Opens/closes via Redux `cart.isOpen` |
| `CartButton/CartButton.jsx` | Header (for buyers only) | Small floating button in the header showing the cart item count. Clicking it toggles the Cart drawer open/closed |
| `LanguageSwitcher/LanguageSwitcher.jsx` | Header | Dropdown menu to switch between 10 languages. When changed, `i18n.changeLanguage()` is called and the choice is saved to localStorage. All text on the page instantly updates |
| `Toast/Toast.jsx` | Used across the entire app | **Notification popups** — small messages that appear at the bottom of the screen and auto-dismiss after 3 seconds. Types: success (green), error (red), info (dark). Any component can trigger a toast by calling `showToast('message', 'success')` or `toast.error('message')` |
| `OfflineBanner/OfflineBanner.jsx` | Every page (via `layout.js`) | Listens to browser `online`/`offline` events. Shows a red banner "No internet connection" when offline. Shows a green "Back online" message briefly when connection restores |
| `VoiceAgent/VoiceAgent.jsx` | Every page except login/landing (via `layout.js`) | **Floating microphone button** (bottom-right corner). Uses the Web Speech API to listen to voice commands. Says "go to market" → navigates to `/market`. Says "profile" → goes to `/profile`. Says "cart" → opens cart. Shows the recognized text in a popup. Not shown on auth pages |
| `VoiceSearch/VoiceSearch.jsx` | Header (optional) | A mic button in the header. When clicked, listens for speech and sends the transcribed text to the search bar (via `onResult` callback). Used for searching the marketplace by voice |
| `VoiceInput/VoiceInput.jsx` | Forms | A mic button you place next to any input field. Speaks → text appears in the field. Supports **Indian language speech recognition** (maps i18n language to speech locale like `hi-IN`, `ta-IN`, etc.) |
| `Map/Map.jsx` | StepLocation, Market Map | Leaflet map wrapper. Renders an interactive map with markers |
| `Modal/Modal.jsx` | Various dialogs | Reusable popup dialog with dark backdrop, close button, title. Traps keyboard focus inside for accessibility |
| `Badge/Badge.jsx` | Listings, Orders | Small colored label. Green = Active, Yellow = Pending, Dark = Sold, Gray = Expired, Red = Rejected |
| `Select/Select.jsx` | Forms, Filters | Styled dropdown with label. Used for selecting crop category, region, etc. |
| `FileUpload/FileUpload.jsx` | KYC, Listings | Drag-and-drop file upload with file type validation and preview |
| `QualitySliders.jsx` | StepQuality | Range sliders for grading crop quality (freshness, size, color) |
| `Tutorial/Tutorial.jsx` | First-time user experience | Step-by-step onboarding overlay. Highlights a specific element on the page with a spotlight, shows a tooltip with instructions, and has Next/Skip/Finish buttons. Remembers in localStorage if the user has seen it |

---

#### `auth/SessionTimeout/`

| File | What It Does |
|---|---|
| `SessionTimeout.jsx` | Popup warning that appears when the user's session is about to expire. Shows a countdown timer ("Your session expires in X seconds"). Has an "Extend Session" button |

---

### `src/store/` — Redux State Management

The app has **3 Redux slices** combined in one store. Think of each slice as a separate "piece" of global data.

#### `store.js` — The Store

Combines all 3 slices:
```
store = {
    auth: authSlice,       → Login/logout state
    listing: listingSlice,  → Listing wizard form data
    cart: cartSlice,        → Shopping cart items
}
```

#### `slices/authSlice.js` — Who is logged in?

Tracks everything about the current user's login state.

**Key data:** `user` (the logged-in user object), `isAuthenticated` (are they logged in?), `userType` (farmer/buyer/admin), `otpSent`/`otpVerified` (which step of login they're on), `isNewUser` (do they need to register?), `error`, `isLoading`

**Key actions (API calls):**
- `sendOtpAsync(mobile)` → calls `POST /api/auth/send-otp`
- `verifyOtpAsync({mobile, otp, userType})` → calls `POST /api/auth/verify-otp`
- `registerAsync(userData)` → calls `POST /api/auth/register`
- `fetchMe()` → calls `GET /api/auth/me` (checks if user is still logged in on page refresh)
- `adminLoginAsync({username, password})` → calls `POST /api/auth/admin-login`
- `logoutAsync()` → calls `POST /api/auth/logout`
- `logout` / `sessionExpired` / `resetAuthFlow` — sync actions to reset state

#### `slices/cartSlice.js` — Shopping Cart

**Key data:** `items` (array of `{id, name, price, quantity, image, farmer}`), `isOpen` (is the cart drawer visible?)

**Key actions:** `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `toggleCart`, `openCart`, `closeCart`

#### `lib/store/features/listingSlice.js` — Listing Wizard

**Key data:** `currentStep` (1–5), `formData` (category, cropName, variety, quantity, unit, expectedPrice, qualityGrade, description, images[], location, harvestDate, isOrganic)

**Key actions:** `nextStep`, `prevStep`, `updateFormData`, `addImage` (max 3), `removeImage`, `setLocation`, `resetListing`

---

### `src/context/AuthContext.jsx` — Legacy Auth

An older auth system using React Context + Axios. **The main auth now uses Redux** (`authSlice`), but this still exists for backward compatibility. It provides `sendOtp`, `verifyOtp`, `register`, `logout` functions and `user`/`isAuthenticated` state.

---

### `src/hooks/useAuth.js` — Session Timeout

A custom hook that manages **session timeout**. If the user doesn't interact with the page (mouse, keyboard, scroll, touch) for **30 minutes**, it auto-logs them out. Shows a warning **5 minutes** before timeout. Also sets the `auth_token` cookie when logging in.

---

### `src/services/apiService.js` — API Calls

A centralized class with **static methods** for every API call in the app. Uses the native `fetch` API with `credentials: 'include'` (sends cookies automatically).

| Method | What It Does |
|---|---|
| `getMarketCrops(filters)` | Fetch crops for marketplace (with search/category/region filters) |
| `getFarmerListings()` | Fetch the logged-in farmer's own listings |
| `addListing(data)` | Create a new crop listing |
| `updateListing(id, data)` | Update an existing listing |
| `deleteListing(id)` | Delete a listing |
| `placeOrder(orderData)` | Place a new order from the cart |
| `getMyOrders()` | Fetch the logged-in user's orders |
| `getProfile()` / `updateProfile(data)` | Get/update user profile |
| `updateLocation(data)` | Update user's GPS coordinates |
| `getAdminStats()` | Get platform statistics for admin |
| `getAdminUsers()` | Get all users for admin approval |
| `approveUser(id)` / `rejectUser(id)` | Admin approves/rejects a user |

---

### `src/utils/api.js` — Axios Instance

An **Axios instance** pointed at `http://localhost:5001/api`. Automatically attaches the JWT token from `localStorage` to every request. If the backend returns `401 Unauthorized`, it clears the token and redirects to `/login`. This is used by `AuthContext.jsx` only.

---

### `src/lib/i18n.js` — Language Setup

Initializes i18next with all 10 language translations loaded from `public/locales/`. Auto-detects the user's browser language, falls back to English if not supported. Saves the user's language choice to `localStorage`.

---

### `src/middleware.js` — Route Protection (Server-Side)

Next.js middleware that runs on every page request. Defines protected routes (dashboards, profile, listings) and auth routes (login, register). **Currently disabled** — the redirect logic is commented out. Auth is handled client-side via `AuthGuard` and Redux state instead.

---

## How to Run

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
# Backend must be running at http://localhost:5001
```
