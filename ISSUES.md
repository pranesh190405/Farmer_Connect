# Farmer Connect - Future Tasks & Issues

This document tracks known issues, pending features, and future enhancements for the Farmer Connect platform.
Copy-paste these issue descriptions into your next AI coding session to continue development efficiently.

---

## [F01] Feature: Negotiation Chat System

**Context**: 
Currently, buyers and farmers can only see listings. We need a real-time chat system for them to negotiate prices before finalizing a deal.

**Scope**:
- Backend: WebSocket integration (Socket.io).
- Frontend: Chat UI in "My Chats" section.

**Files to Create/Modify**:
- `backend/server.js` (Initialize Socket.io)
- `backend/controllers/chatController.js`
- `frontend/src/app/chat/page.js`

**Tasks**:
- [ ] Install `socket.io` (backend) and `socket.io-client` (frontend).
- [ ] Create `Chat` model (participants, messages array).
- [ ] Implement `sendMessage` and `getMessages` APIs.
- [ ] Create Chat UI with message bubbles and "Make Offer" button.

---

## [F02] Feature: Secure Payment Gateway

**Context**: 
Orders are currently placed without payment. We need to integrate a payment gateway (e.g., Razorpay or Stripe) to handle transactions securely.

**Scope**:
- Backend: Payment verification endpoints.
- Frontend: Payment modal on "Checkout" page.

**Files to Modify**:
- `backend/controllers/paymentController.js`
- `frontend/src/app/buyer/checkout/page.js`

**Tasks**:
- [ ] Create Razorpay/Stripe account and get API keys.
- [ ] Implement `createOrder` API for payment provider.
- [ ] Verify payment signature on backend (`verifyPayment`).
- [ ] Update Order status to `PAID` after success.

---

## [I01] Issue: Admin Analytics Dashboard

**Context**: 
The Admin Dashboard currently shows dummy stats or just counts. We need real analytics (e.g., "Total Transaction Volume", "Top Selling Crops").

**Tasks**:
- [ ] Create API `/api/admin/stats` that aggregates:
    - Sum of all `paid` orders.
    - Count of active vs sold listings.
    - New user registration trend (last 7 days).
- [ ] Visualize this data using Charts.js or Recharts on `admin/dashboard/page.jsx`.

---

## [I02] Issue: Mobile UI Polish

**Context**: 
Some pages have padding issues on small screens, specifically the "New Listing" form and the "Market" filters.

**Tasks**:
- [ ] Market Page: Ensure sidebar filters are collapsible on mobile (currently partially implemented).
- [ ] New Listing: Fix input field widths on mobile (prevent horizontal scroll).
- [ ] Navbar: Ensure hamburger menu works smoothly on all pages.

---

## [I03] Issue: Email Notifications

**Context**: 
Users rely on checking the app for updates. We need email notifications for critical events.

**Tasks**:
- [ ] Configure `nodemailer` with a service (Gmail/SendGrid).
- [ ] Send email when:
    - User registers (Welcome email).
    - Admin approves account ("You are now active!").
    - Order is placed (to both Farmer and Buyer).
