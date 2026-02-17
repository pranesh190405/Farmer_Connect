# Farmer Connect 🌾

**Farmer Connect** is a digital agricultural marketplace that connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing. Built with **Next.js 16** (Frontend) and **Node.js/Express + PostgreSQL** (Backend).

## 🚀 Features

- **For Farmers:**
  - List crops with photos, quantity, and expected price.
  - "Batch Mode" for quick listing of multiple items.
  - Multi-language support (10+ Indian languages).
  - Voice-assisted search and form filling.
  - Dashboard to manage active, sold, and expired listings.

- **For Buyers:**
  - Browse market for fresh produce.
  - Filter by region, category, and price.
  - Cart and order management.
  - Order tracking and status updates.

- **For Admins:**
  - User verification workflow (Approve/Reject new registrations).
  - Platform analytics and user management.

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), TailwindCSS, Redux Toolkit, Framer Motion, Lucide React, i18next.
- **Backend:** Node.js, Express.js, PostgreSQL, JWT Authentication.
- **Database:** PostgreSQL (with PostGIS for future location features).

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)

### 1. Database Setup

1. Open your PostgreSQL terminal (`psql`) or pgAdmin.
2. Create the database:
   ```sql
   CREATE DATABASE farmer_connect;
   ```
3. The backend will automatically create tables on first run, or you can manually run `backend/db/schema.sql`.

### 2. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with your credentials:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=farmer_connect
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=5001
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *Server runs at http://localhost:5001*

### 3. Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
   *App runs at http://localhost:3000*

## 🔑 Default Credentials

- **Admin Login:**
  - Mobile: `9999999999`
  - Password: `admin123`

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
*Built for the Smart India Hackathon 2024* 🚜
