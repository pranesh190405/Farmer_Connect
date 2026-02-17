-- =============================================================================
-- Farmer Connect — PostgreSQL Database Schema
-- =============================================================================

-- Drop tables if they exist (for clean re-runs)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS user_locations CASCADE;
DROP TABLE IF EXISTS otp_codes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =============================================================================
-- 1. USERS TABLE
-- =============================================================================
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    mobile        VARCHAR(15) NOT NULL,
    name          VARCHAR(100) NOT NULL DEFAULT '',
    type          VARCHAR(10) NOT NULL CHECK (type IN ('farmer', 'buyer', 'admin')),
    status        VARCHAR(10) NOT NULL DEFAULT 'APPROVED' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    aadhar_number VARCHAR(12) DEFAULT '',
    aadhar_verified BOOLEAN DEFAULT FALSE,
    date_of_birth DATE,
    address       TEXT DEFAULT '',
    password_hash VARCHAR(255) DEFAULT '',
    -- Buyer specific fields
    business_name VARCHAR(100) DEFAULT '',
    tax_id        VARCHAR(20) DEFAULT '',
    business_category VARCHAR(50) DEFAULT '',
    contact_name  VARCHAR(100) DEFAULT '',
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW(),
    UNIQUE(mobile, type)
);

-- =============================================================================
-- 2. OTP_CODES TABLE
-- =============================================================================
CREATE TABLE otp_codes (
    id         SERIAL PRIMARY KEY,
    mobile     VARCHAR(15) NOT NULL,
    otp        VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used       BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- 3. USER_LOCATIONS TABLE
-- =============================================================================
CREATE TABLE user_locations (
    id        SERIAL PRIMARY KEY,
    user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    state     VARCHAR(50) DEFAULT '',
    district  VARCHAR(100) DEFAULT '',
    lat       DECIMAL(10, 7),
    lng       DECIMAL(10, 7),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =============================================================================
-- 4. USER_PREFERENCES TABLE
-- =============================================================================
CREATE TABLE user_preferences (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_interests  TEXT[] DEFAULT '{}',
    sms_alerts      BOOLEAN DEFAULT TRUE,
    price_alerts    BOOLEAN DEFAULT TRUE,
    profile_public  BOOLEAN DEFAULT TRUE,
    show_location   BOOLEAN DEFAULT TRUE,
    show_contact    BOOLEAN DEFAULT FALSE,
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =============================================================================
-- 5. LISTINGS TABLE
-- =============================================================================
CREATE TABLE listings (
    id              SERIAL PRIMARY KEY,
    farmer_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_name       VARCHAR(100) NOT NULL,
    category        VARCHAR(50) DEFAULT 'vegetables',
    variety         VARCHAR(100) DEFAULT '',
    quantity        DECIMAL(10, 2) NOT NULL,
    unit            VARCHAR(10) DEFAULT 'kg',
    expected_price  DECIMAL(10, 2) NOT NULL,
    quality_grade   VARCHAR(5) DEFAULT 'B',
    description     TEXT DEFAULT '',
    image_url       TEXT DEFAULT '',
    location_address TEXT DEFAULT '',
    location_lat    DECIMAL(10, 7),
    location_lng    DECIMAL(10, 7),
    status          VARCHAR(15) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'expired', 'negotiating')),
    is_organic      BOOLEAN DEFAULT FALSE,
    harvest_date    DATE,
    min_qty         DECIMAL(10, 2) DEFAULT 1,
    rating          DECIMAL(3, 1) DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- 6. ORDERS TABLE
-- =============================================================================
CREATE TABLE orders (
    id              SERIAL PRIMARY KEY,
    buyer_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_amount    DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status          VARCHAR(20) DEFAULT 'placed' CHECK (status IN ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    delivery_address TEXT DEFAULT '',
    payment_method  VARCHAR(20) DEFAULT 'cod',
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- 7. ORDER_ITEMS TABLE
-- =============================================================================
CREATE TABLE order_items (
    id          SERIAL PRIMARY KEY,
    order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    listing_id  INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    quantity    DECIMAL(10, 2) NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- ADMIN USER (required for admin panel login)
-- =============================================================================

-- Admin user (password: admin123, bcrypt hash)
INSERT INTO users (mobile, name, type, status, password_hash, aadhar_number, aadhar_verified, date_of_birth, address)
VALUES ('9999999999', 'System Admin', 'admin', 'APPROVED',
        '$2a$10$7a1LsWIfoLsSoKAgbwQsDOymw.LTr0K6xTSksNM50W/7jUN3Eevq6',
        '999999999999', TRUE, '1980-01-01', 'Admin Office, New Delhi')
ON CONFLICT (mobile, type) DO NOTHING;

