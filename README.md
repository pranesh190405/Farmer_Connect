# 🌾 Farmer Connect — Digital Agricultural Marketplace

> A full-stack web platform connecting Indian farmers directly with buyers, eliminating middlemen and ensuring fair prices through a transparent, trust-based marketplace.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [User Guide](#-user-guide)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌟 Project Overview

**Farmer Connect** is a digital agricultural marketplace designed for the Indian farming ecosystem. The platform empowers farmers to list their crops directly, while buyers can browse, bid, and place orders — all within a trust-verified environment.

### Problem Statement
Indian farmers often rely on middlemen to sell their produce, resulting in unfair pricing. There is no transparent, accessible digital platform that connects farmers and buyers directly while ensuring trust and quality.

### Solution
Farmer Connect provides:
- A **verified marketplace** where both farmers and buyers undergo identity verification (Aadhaar/GST)
- A **trust scoring system** that builds credibility over time
- **Multilingual voice navigation** supporting 10 Indian languages for accessibility
- An **admin dashboard** for user verification, complaint resolution, and platform analytics

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Mobile + PIN login, Aadhaar-based PIN recovery, admin login |
| 👤 **Trust Verification** | Trust score system with document upload (Aadhaar/GST) and admin approval |
| 🌾 **Crop Listings** | Farmers create, edit, and manage crop listings with pricing |
| 💰 **Bidding System** | Buyers place competitive bids on crop listings |
| 📦 **Order Management** | Full order lifecycle — placed → shipped → delivered |
| 📊 **Admin Dashboard** | User management, approval workflows, statistics, complaint handling |
| 🎙️ **Voice Navigation** | Multilingual voice commands in 10 Indian languages (Hindi, Tamil, Telugu, etc.) |
| 🌍 **Internationalization** | Full i18n support with language detection |
| 📱 **PWA Support** | Progressive Web App for mobile-like experience |
| 🗺️ **Location Services** | Interactive maps with Leaflet for location-based features |

---

## 🏗️ Architecture

The application follows a **client-server architecture** with clear separation of concerns:

```
┌─────────────────────┐     HTTPS/REST     ┌──────────────────────┐
│   Next.js Frontend  │ ◄──────────────── ►│  Express.js Backend  │
│   (Vercel)          │                    │  (Render/Railway)     │
│                     │                    │                       │
│  • React 19         │                    │  • RESTful API        │
│  • Redux Toolkit    │                    │  • JWT Auth (Cookie)  │
│  • Framer Motion    │                    │  • Express Validator  │
│  • Leaflet Maps     │                    │  • Multer Uploads     │
│  • i18next          │                    │  • Swagger Docs       │
└─────────────────────┘                    └───────────┬───────────┘
                                                       │
                                                       ▼
                                           ┌───────────────────────┐
                                           │  PostgreSQL (Neon)    │
                                           │                       │
                                           │  • Users & Auth       │
                                           │  • Listings & Bids    │
                                           │  • Orders & Complaints│
                                           │  • Trust Scores       │
                                           └───────────────────────┘
```

> 📌 See full architecture diagram: [`docs/Architecture diagram.png`](docs/Architecture%20diagram.png)

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express.js** | REST API server |
| **PostgreSQL (Neon)** | Cloud-hosted relational database |
| **JWT + HTTP-only cookies** | Secure authentication |
| **bcryptjs** | Password/PIN hashing |
| **express-validator** | Request validation |
| **Multer** | File uploads (documents, photos) |
| **Swagger UI** | Interactive API documentation |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with SSR/SSG |
| **React 19** | UI library |
| **Redux Toolkit** | Global state management |
| **Framer Motion** | Animations |
| **Leaflet + React-Leaflet** | Interactive maps |
| **i18next** | Internationalization |
| **Recharts** | Data visualization |
| **TailwindCSS 4** | Utility-first CSS |
| **next-pwa** | Progressive Web App support |

### DevOps & Testing
| Technology | Purpose |
|-----------|---------|
| **Jest** | Unit testing (backend + frontend) |
| **Supertest** | API integration testing |
| **Testing Library** | React component testing |
| **GitHub Actions** | CI/CD pipeline |
| **ESLint** | Code linting |

---

## 📂 Project Structure

```
farmer-connect/
├── backend/
│   ├── config/           # Database connection config
│   ├── controllers/      # Route handler logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── listingController.js
│   │   ├── orderController.js
│   │   ├── adminController.js
│   │   ├── bidController.js
│   │   └── voiceController.js
│   ├── middleware/        # Auth, validation, upload middleware
│   ├── modules/          # Business logic layer
│   ├── routes/           # API route definitions (with Swagger docs)
│   ├── scripts/          # Utility scripts
│   ├── tests/            # Jest test suites
│   ├── server.js         # Express app entry point
│   ├── swagger.js        # Swagger/OpenAPI configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   │   ├── (auth)/   # Login & registration pages
│   │   │   ├── admin/    # Admin dashboard
│   │   │   ├── buyer/    # Buyer dashboard
│   │   │   ├── farmer/   # Farmer dashboard
│   │   │   ├── market/   # Marketplace browsing
│   │   │   ├── checkout/ # Order checkout
│   │   │   └── profile/  # User profile management
│   │   ├── components/   # Reusable React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility libraries
│   │   ├── services/     # API service layer
│   │   ├── store/        # Redux store & slices
│   │   └── utils/        # Helper functions
│   └── package.json
│
├── docs/                 # UML & architecture diagrams
│   ├── Architecture diagram.png
│   ├── Schema.png
│   ├── activity.png
│   ├── class.png
│   ├── sequence.png
│   └── use case.png
│
├── farmer_connect.sql    # Database schema dump
├── CONTRIBUTING.md       # Contribution guidelines
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** 9 or higher
- **PostgreSQL** database (or a [Neon](https://neon.tech) cloud instance)

### 1. Clone the Repository
```bash
git clone https://github.com/adii11001/Farmer_Connect.git
cd Farmer_Connect
```

### 2. Set Up the Backend
```bash
cd backend
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env   # edit with your values

# Run database migrations
node migrate_db.js

# Start the dev server
npm run dev
```
The backend will start at `http://localhost:5001`.

### 3. Set Up the Frontend
```bash
cd frontend
npm install

# Start the dev server
npm run dev
```
The frontend will start at `http://localhost:3000`.

### 4. Access the Application
| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Frontend application |
| `http://localhost:5001` | Backend API |
| `http://localhost:5001/api-docs` | **Swagger API documentation** |
| `http://localhost:5001/health` | Health check endpoint |

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/farmer_connect

# Authentication
JWT_SECRET=your_jwt_secret_key

# Server
PORT=5001
NODE_ENV=development

# Admin credentials
ADMIN_EMAIL=admin@farmerconnect.com
ADMIN_PASSWORD=your_admin_password
```

---

## 📡 API Documentation

### Swagger UI (Interactive)
Once the backend is running, open **[http://localhost:5001/api-docs](http://localhost:5001/api-docs)** for the full interactive API documentation.

You can directly test every endpoint from the browser — try "Register", "Login", and then use the cookie for authenticated endpoints.

### API Endpoint Summary

| Module | Endpoints | Base Path | Auth Required |
|--------|-----------|-----------|---------------|
| **Auth** | 6 | `/api/auth` | Partial (register/login are public) |
| **Users** | 6 | `/api/users` | ✅ Yes |
| **Listings** | 7 | `/api/listings` | ✅ Yes |
| **Orders** | 5 | `/api/orders` | ✅ Yes |
| **Bids** | 3 | `/api/bids` | ✅ Yes |
| **Admin** | 7 | `/api/admin` | ✅ Admin only |
| **Voice** | 2 | `/api/voice` | ❌ No |

### Authentication Flow
1. **Register** → `POST /api/auth/register` (account created with `pending` status)
2. **Admin Approval** → Admin reviews and approves via dashboard
3. **Login** → `POST /api/auth/login` (returns HTTP-only `auth_token` cookie)
4. **Authenticated Requests** → Cookie is automatically sent with requests
5. **Logout** → `POST /api/auth/logout` (clears cookie)

---

## 👤 User Guide

### For Farmers
1. **Register** with your mobile number, PIN, and Aadhaar details
2. **Wait for admin approval** (you'll be notified when approved)
3. **Upload documents** (Aadhaar photo) to improve your trust score
4. **Create listings** for your crops — set crop name, quantity, unit, and expected price
5. **Receive bids** from buyers on your listings
6. **Manage orders** — mark orders as shipped when dispatched

### For Buyers
1. **Register** with your mobile number, PIN, and business details (GST)
2. **Wait for admin approval**
3. **Browse the marketplace** — search and filter crop listings
4. **Place bids** on listings to negotiate prices
5. **Place orders** and track delivery status
6. **Raise complaints** if there are quality or delivery issues

### For Admins
1. **Login** with admin email and password
2. **Review pending users** — view uploaded documents and approve/reject
3. **Monitor dashboard stats** — total users, active listings, order volume
4. **Handle complaints** — review and resolve user complaints

### Voice Navigation
The app supports voice commands in **10 Indian languages**:
English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, and Haryanvi.

Example commands:
- *"Take me to the market"* → navigates to marketplace
- *"बाज़ार दिखाओ"* (Hindi) → navigates to marketplace
- *"Search for tomatoes"* → searches marketplace for tomatoes

---

## 🗃️ Database Schema

The application uses **PostgreSQL** with the following primary tables:

| Table | Description |
|-------|-------------|
| `users` | Farmer and buyer accounts with type, status, trust score |
| `user_locations` | User location data (state, district, lat/lng) |
| `listings` | Crop listings created by farmers |
| `bid_sessions` | Bidding sessions linked to listings |
| `bids` | Individual bids placed by buyers |
| `orders` | Purchase orders with delivery tracking |
| `order_items` | Items within each order |
| `complaints` | Order complaints with admin resolution |
| `admins` | Admin user accounts |

> 📌 See full schema diagram: [`docs/Schema.png`](docs/Schema.png)
>
> 📌 Full SQL dump: [`farmer_connect.sql`](farmer_connect.sql)

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test               # Run all tests
npm run test:coverage  # Run with coverage report
```

### Frontend Tests
```bash
cd frontend
npm test               # Run all tests
npm run test:coverage  # Run with coverage report
```

---

## 🚢 Deployment

### Backend (Render / Railway)
1. Set all environment variables in the platform dashboard
2. Set build command: `npm install`
3. Set start command: `npm start`
4. The backend will serve at the assigned URL

### Frontend (Vercel)
1. Connect the GitHub repository
2. Set root directory to `frontend/`
3. Framework: **Next.js**
4. Environment variable: set the backend API URL
5. Deploy — Vercel handles build and CDN automatically

**Production URL:** [https://farmer-connect-omega.vercel.app](https://farmer-connect-omega.vercel.app)

---

## 📊 Project Diagrams

The `docs/` directory contains the following UML and architecture diagrams:

| Diagram | File |
|---------|------|
| System Architecture | [`Architecture diagram.png`](docs/Architecture%20diagram.png) |
| Database Schema (ER) | [`Schema.png`](docs/Schema.png) |
| Use Case Diagram | [`use case.png`](docs/use%20case.png) |
| Activity Diagram | [`activity.png`](docs/activity.png) |
| Class Diagram | [`class.png`](docs/class.png) |
| Sequence Diagram | [`sequence.png`](docs/sequence.png) |

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:
- Git workflow and branch naming
- Code style and conventions
- Pull request process

---

## 📄 License

This project is licensed under the **MIT License**.
