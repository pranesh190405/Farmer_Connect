#  Farmer Connect - Digital Agricultural Marketplace

A full-stack web application connecting farmers directly with buyers (wholesalers, processors, retailers) to eliminate intermediaries and provide fair pricing for agricultural products.

## 📋 Table of Contents

* [Overview](https://www.google.com/search?q=%23-overview)
* [Features](https://www.google.com/search?q=%23-features)
* [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
* [Project Structure](https://www.google.com/search?q=%23-project-structure)
* [Prerequisites](https://www.google.com/search?q=%23-prerequisites)
* [Setup & Installation](https://www.google.com/search?q=%23-setup--installation)
* [Running the Application](https://www.google.com/search?q=%23-running-the-application)
* [Database Setup](https://www.google.com/search?q=%23-database-setup)
* [API Documentation](https://www.google.com/search?q=%23-api-documentation)
* [Usage Guide](https://www.google.com/search?q=%23-usage-guide)
* [Environment Variables](https://www.google.com/search?q=%23-environment-variables)
* [Contributing](https://www.google.com/search?q=%23-contributing)

---

##  Overview

**Farmer Connect** is a digital marketplace platform designed to:

* **Empower Farmers**: Direct access to buyers without middlemen.
* **Fair Pricing**: Transparent pricing mechanisms.
* **Market Access**: Connect with multiple buyers across India.
* **Multiple Languages**: Support for 10+ Indian languages (Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, and more).
* **Mobile-First**: PWA (Progressive Web App) for offline support.
* **Secure**: Role-based access control with phone + PIN authentication.

### User Roles

1. **Farmers**: List agricultural products, manage inventory, track orders.
2. **Buyers**: Search & purchase products, manage orders, track inventory.
3. **Admin**: System oversight, user verification, dispute resolution.

---

##  Features

### For Farmers 

* ✅ Easy registration with Aadhaar verification.
* ✅ List agricultural products with pricing.
* ✅ Track orders and manage inventory.
* ✅ View buyer information and ratings.
* ✅ Receive order notifications.

### For Buyers 

* ✅ Browse products by category.
* ✅ Advanced filtering and search.
* ✅ Place bulk orders.
* ✅ Order tracking and history.
* ✅ Manage multiple buyer business profiles.
* ✅ File complaints for order disputes.

### Platform Features 

* ✅ Multi-language support (10+ languages).
* ✅ PWA with offline capabilities.
* ✅ Real-time order notifications.
* ✅ Secure authentication (Phone + PIN).
* ✅ Admin dashboard for system management.
* ✅ Responsive design (mobile-first).
* ✅ Image upload for product listings.

---

## 🛠 Tech Stack

### Frontend

* **Framework**: Next.js 13+ (App Router)
* **Styling**: Tailwind CSS
* **State Management**: Redux Toolkit
* **Internationalization**: i18next
* **UI Components**: Lucide React Icons
* **PWA**: Service Workers

### Backend

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: PostgreSQL
* **Authentication**: JWT + bcryptjs
* **File Upload**: Multer

### Deployment

* **Frontend**: Vercel
* **Backend**: AWS Elastic Beanstalk
* **Database**: AWS RDS (PostgreSQL)

---

## 📁 Project Structure

```text
Farmer_Connect/
├── frontend/                # Next.js React Frontend
│   ├── public/              # static assets & i18n locales
│   ├── src/
│   │   ├── app/             # App Router (Auth, Farmer, Buyer, Admin)
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Redux store & i18n config
│   │   └── hooks/           # Custom React hooks
│   └── next.config.mjs
├── backend/                 # Express.js Backend API
│   ├── config/              # Database connection
│   ├── routes/              # API Endpoints
│   ├── middleware/          # Auth & Validation
│   ├── uploads/             # Product images
│   └── server.js            # Entry point
├── farmer_connect.sql       # Database schema
└── docs/                    # Documentation

```

---

## 📋 Prerequisites

Before setting up the project, ensure you have:

* **Node.js** v18.0+
* **npm** v9.0+
* **PostgreSQL** v12+
* **Git**

---

##  Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/adii11001/Farmer_Connect.git
cd Farmer_Connect

```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
node migrate_db.js

```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL=http://localhost:5001

```

---

##  Running the Application

### Development Mode

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev

```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev

```

### Testing

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

```

---

##  Database Setup

1. **Create Database**:
```sql
CREATE DATABASE farmer_connect;

```


2. **Import Schema**:
```bash
psql -U postgres -d farmer_connect -f farmer_connect.sql

```



---

##  API Documentation (Summary)

| Method | Endpoint | Description |
| --- | --- | --- |
| **POST** | `/api/auth/register` | Register new user |
| **POST** | `/api/auth/login` | Login with Phone + PIN |
| **GET** | `/api/products` | List products with filters |
| **POST** | `/api/products` | Create listing (Protected) |
| **POST** | `/api/orders` | Create new order (Protected) |

---

##  Environment Variables

### Backend (`.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farmer_connect
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
PORT=5001

```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_APP_NAME=Farmer Connect

```

---

##  Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
