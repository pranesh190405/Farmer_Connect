const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ─── Constants ───────────────────────────────────────────────
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

// ─── Register User (Farmer or Buyer) ────────────────────────
async function registerUser({ mobile, type, name, pin, aadharNumber, dateOfBirth, address, businessName, taxId, businessCategory, contactName }) {
    // Check if user already exists with this mobile + type
    const existing = await db.query(
        'SELECT id FROM users WHERE mobile = $1 AND type = $2',
        [mobile, type]
    );

    if (existing.rows.length > 0) {
        return { error: 'User already exists with this mobile and type' };
    }

    // Hash the 4-digit PIN
    const pinHash = await bcrypt.hash(pin, 10);

    // Compute initial trust score
    let trustScore = 15; // Mobile provided
    if (name) trustScore += 5;
    if (type === 'farmer' && aadharNumber) trustScore += 10;
    if (type === 'buyer' && taxId) trustScore += 10;
    if (address || businessName) trustScore += 5;

    const result = await db.query(
        `INSERT INTO users (
            mobile, name, type, status, trust_score, pin_hash,
            aadhar_number, aadhar_verified, date_of_birth, address,
            business_name, tax_id, business_category, contact_name
        )
         VALUES ($1, $2, $3, 'PENDING', $4, $5, $6, FALSE, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [
            mobile, name || '', type, trustScore, pinHash,
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

    return { user: formatUser(user) };
}

// ─── Login User (Phone + PIN) ────────────────────────────────
async function loginUser(mobile, pin, userType) {
    // Find user by mobile and type
    const userResult = await db.query(
        'SELECT * FROM users WHERE mobile = $1 AND type = $2 LIMIT 1',
        [mobile, userType]
    );

    if (userResult.rows.length === 0) {
        return { error: 'No account found. Please register first.' };
    }

    const user = userResult.rows[0];

    // Check if account is locked
    if (user.lock_until && new Date(user.lock_until) > new Date()) {
        const remainingMinutes = Math.ceil((new Date(user.lock_until) - new Date()) / 60000);
        return { error: `Account locked. Try again in ${remainingMinutes} minute(s).` };
    }

    // If account was locked but lock expired, reset attempts
    if (user.lock_until && new Date(user.lock_until) <= new Date()) {
        await db.query(
            'UPDATE users SET failed_login_attempts = 0, lock_until = NULL WHERE id = $1',
            [user.id]
        );
        user.failed_login_attempts = 0;
    }

    // Verify PIN
    const isMatch = await bcrypt.compare(pin, user.pin_hash);

    if (!isMatch) {
        const newAttempts = (user.failed_login_attempts || 0) + 1;

        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
            // Lock the account
            const lockUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);
            await db.query(
                'UPDATE users SET failed_login_attempts = $1, lock_until = $2 WHERE id = $3',
                [newAttempts, lockUntil, user.id]
            );
            return { error: `Too many failed attempts. Account locked for ${LOCK_DURATION_MINUTES} minutes.` };
        } else {
            await db.query(
                'UPDATE users SET failed_login_attempts = $1 WHERE id = $2',
                [newAttempts, user.id]
            );
            return { error: `Incorrect PIN. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempt(s) remaining.` };
        }
    }

    // PIN correct — reset failed attempts
    await db.query(
        'UPDATE users SET failed_login_attempts = 0, lock_until = NULL WHERE id = $1',
        [user.id]
    );

    // Check user status
    if (user.status === 'REJECTED') {
        return { error: 'Your account has been rejected. Please contact support.' };
    }

    if (user.status === 'PENDING') {
        return { error: 'Your account is pending approval.', status: 'PENDING' };
    }

    // APPROVED — generate token
    const token = generateToken(user);
    return { user: formatUser(user), token };
}

// ─── Reset PIN (Forgot PIN) ─────────────────────────────────
async function resetPin(mobile, aadharLast4, newPin, userType) {
    // Find user by mobile and type
    const userResult = await db.query(
        'SELECT * FROM users WHERE mobile = $1 AND type = $2 LIMIT 1',
        [mobile, userType]
    );

    if (userResult.rows.length === 0) {
        return { error: 'No account found with this mobile number.' };
    }

    const user = userResult.rows[0];

    // Verify last 4 digits of Aadhaar
    const storedLast4 = (user.aadhar_number || '').slice(-4);

    if (!storedLast4 || storedLast4 !== aadharLast4) {
        return { error: 'Aadhaar verification failed. Last 4 digits do not match.' };
    }

    // Hash and update new PIN
    const pinHash = await bcrypt.hash(newPin, 10);
    await db.query(
        'UPDATE users SET pin_hash = $1, failed_login_attempts = 0, lock_until = NULL, updated_at = NOW() WHERE id = $2',
        [pinHash, user.id]
    );

    return { success: true, message: 'PIN reset successfully. You can now login.' };
}

// ─── Admin Login ─────────────────────────────────────────────
async function adminLogin(username, password) {
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

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
        return { error: 'Invalid credentials' };
    }

    const token = generateToken(admin);
    return { user: formatUser(admin), token };
}

// ─── Get User By ID ──────────────────────────────────────────
async function getUserById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return formatUser(result.rows[0]);
}

// ─── Generate JWT ────────────────────────────────────────────
function generateToken(user) {
    return jwt.sign(
        { id: user.id, type: user.type, mobile: user.mobile },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

// ─── Format User (strip sensitive fields) ────────────────────
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
        trustScore: user.trust_score || 0,
        profilePhotoUrl: user.profile_photo_url || '',
        documentUrl: user.document_url || '',
        documentType: user.document_type || '',
        adminNotes: user.admin_notes || '',
        verifiedAt: user.verified_at,
        createdAt: user.created_at,
    };
}

module.exports = {
    registerUser,
    loginUser,
    resetPin,
    adminLogin,
    getUserById,
    generateToken,
};
