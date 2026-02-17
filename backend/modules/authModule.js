const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Send OTP to mobile number
 * Mock: always stores '123456' as OTP
 */
async function sendOtp(mobile) {
    // Delete any existing unused OTPs for this mobile
    await db.query('DELETE FROM otp_codes WHERE mobile = $1 AND used = FALSE', [mobile]);

    // Mock OTP — in production, generate random and send via SMS
    const otp = '123456';
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await db.query(
        'INSERT INTO otp_codes (mobile, otp, expires_at) VALUES ($1, $2, $3)',
        [mobile, otp, expiresAt]
    );

    console.log(`📱 OTP for ${mobile}: ${otp}`);
    return { success: true, message: 'OTP sent successfully' };
}

/**
 * Verify OTP for a mobile number
 * Returns whether the user exists and their data
 */
async function verifyOtp(mobile, otp) {
    // Check the OTP
    const otpResult = await db.query(
        `SELECT * FROM otp_codes 
         WHERE mobile = $1 AND otp = $2 AND used = FALSE AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1`,
        [mobile, otp]
    );

    if (otpResult.rows.length === 0) {
        return { valid: false, error: 'Invalid or expired OTP' };
    }

    // Mark OTP as used
    await db.query('UPDATE otp_codes SET used = TRUE WHERE id = $1', [otpResult.rows[0].id]);

    // Check if user exists (check both farmer and buyer)
    const userResult = await db.query(
        'SELECT * FROM users WHERE mobile = $1 ORDER BY created_at DESC LIMIT 1',
        [mobile]
    );

    if (userResult.rows.length > 0) {
        const user = userResult.rows[0];

        if (user.status === 'REJECTED') {
            return { valid: true, isNewUser: false, error: 'Your account has been rejected. Please contact support.' };
        }

        if (user.status === 'PENDING') {
            return { valid: true, isNewUser: false, error: 'Your account is pending approval.' };
        }

        // APPROVED user — generate token
        const token = generateToken(user);
        return { valid: true, isNewUser: false, user: formatUser(user), token };
    }

    // New user
    return { valid: true, isNewUser: true };
}

/**
 * Verify OTP and find user by type (for login page with type selection)
 */
async function verifyOtpWithType(mobile, otp, userType) {
    // Check the OTP
    const otpResult = await db.query(
        `SELECT * FROM otp_codes 
         WHERE mobile = $1 AND otp = $2 AND used = FALSE AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1`,
        [mobile, otp]
    );

    if (otpResult.rows.length === 0) {
        return { valid: false, error: 'Invalid or expired OTP' };
    }

    // Mark OTP as used
    await db.query('UPDATE otp_codes SET used = TRUE WHERE id = $1', [otpResult.rows[0].id]);

    // Find user by mobile and type
    const userResult = await db.query(
        'SELECT * FROM users WHERE mobile = $1 AND type = $2 LIMIT 1',
        [mobile, userType]
    );

    if (userResult.rows.length === 0) {
        return { valid: true, isNewUser: true, userType };
    }

    const user = userResult.rows[0];

    if (user.status === 'REJECTED') {
        return { valid: true, isNewUser: false, error: 'Your account has been rejected. Please contact support.' };
    }

    if (user.status === 'PENDING') {
        return { valid: true, isNewUser: false, error: 'Your account is pending approval.' };
    }

    const token = generateToken(user);
    return { valid: true, isNewUser: false, user: formatUser(user), token };
}

/**
 * Register a new user (farmer or buyer)
 */
async function registerUser({ mobile, type, name, aadharNumber, dateOfBirth, address, businessName, taxId, businessCategory, contactName }) {
    // Check if user already exists
    const existing = await db.query(
        'SELECT id FROM users WHERE mobile = $1 AND type = $2',
        [mobile, type]
    );

    if (existing.rows.length > 0) {
        return { error: 'User already exists with this mobile and type' };
    }

    const result = await db.query(
        `INSERT INTO users (
            mobile, name, type, status, 
            aadhar_number, aadhar_verified, date_of_birth, address,
            business_name, tax_id, business_category, contact_name
        )
         VALUES ($1, $2, $3, 'APPROVED', $4, FALSE, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
            mobile, name, type,
            aadharNumber || '', dateOfBirth || null, address || '',
            businessName || '', taxId || '', businessCategory || '', contactName || ''
        ]
    );

    const user = result.rows[0];

    // Create default location and preferences
    await db.query(
        'INSERT INTO user_locations (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
        [user.id]
    );
    await db.query(
        'INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
        [user.id]
    );

    const token = generateToken(user);
    return { user: formatUser(user), token };
}

/**
 * Admin login with username and password
 */
async function adminLogin(username, password) {
    // Admin username is 'admin', find admin user
    if (username !== 'admin') {
        return { error: 'Invalid credentials' };
    }

    const result = await db.query(
        "SELECT * FROM users WHERE type = 'admin' LIMIT 1"
    );

    if (result.rows.length === 0) {
        return { error: 'Admin account not found' };
    }

    const admin = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
        return { error: 'Invalid credentials' };
    }

    const token = generateToken(admin);
    return { user: formatUser(admin), token };
}

/**
 * Get user by ID
 */
async function getUserById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return formatUser(result.rows[0]);
}

/**
 * Generate JWT token
 */
function generateToken(user) {
    return jwt.sign(
        { id: user.id, type: user.type, mobile: user.mobile },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

/**
 * Format user object for API response (remove sensitive fields)
 */
function formatUser(user) {
    return {
        id: user.id,
        mobile: user.mobile,
        name: user.name,
        type: user.type,
        status: user.status,
        aadharNumber: user.aadhar_number,
        aadharVerified: user.aadhar_verified,
        dateOfBirth: user.date_of_birth,
        address: user.address,
        businessName: user.business_name,
        taxId: user.tax_id,
        businessCategory: user.business_category,
        contactName: user.contact_name,
        createdAt: user.created_at,
    };
}

module.exports = {
    sendOtp,
    verifyOtp,
    verifyOtpWithType,
    registerUser,
    adminLogin,
    getUserById,
    generateToken,
};
