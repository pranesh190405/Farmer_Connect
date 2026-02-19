const db = require('../config/db');

/**
 * Get all users with trust score and document info (for admin panel)
 */
async function getAllUsers() {
    const result = await db.query(
        `SELECT id, mobile, name, type, status, aadhar_number, aadhar_verified,
                trust_score, document_url, document_type, admin_notes, verified_at,
                business_name, tax_id, business_category, contact_name, address, created_at
         FROM users
         ORDER BY 
            CASE WHEN status = 'PENDING' THEN 0 ELSE 1 END,
            created_at DESC`
    );

    return result.rows.map(u => ({
        id: u.id,
        mobile: u.mobile,
        name: u.name,
        type: u.type,
        status: u.status,
        aadharNumber: u.aadhar_number,
        aadharVerified: u.aadhar_verified,
        trustScore: u.trust_score || 0,
        documentUrl: u.document_url || '',
        documentType: u.document_type || '',
        adminNotes: u.admin_notes || '',
        verifiedAt: u.verified_at,
        businessName: u.business_name || '',
        taxId: u.tax_id || '',
        businessCategory: u.business_category || '',
        contactName: u.contact_name || '',
        address: u.address || '',
        joinedAt: u.created_at,
    }));
}

/**
 * Get full verification data for a single user (admin review)
 */
async function getUserVerificationData(userId) {
    const result = await db.query(
        `SELECT u.*, ul.state, ul.district, ul.lat, ul.lng
         FROM users u
         LEFT JOIN user_locations ul ON ul.user_id = u.id
         WHERE u.id = $1 AND u.type != 'admin'`,
        [userId]
    );

    if (result.rows.length === 0) return null;

    const u = result.rows[0];
    return {
        id: u.id,
        mobile: u.mobile,
        name: u.name,
        type: u.type,
        status: u.status,
        aadharNumber: u.aadhar_number,
        aadharVerified: u.aadhar_verified,
        address: u.address || '',
        businessName: u.business_name || '',
        taxId: u.tax_id || '',
        businessCategory: u.business_category || '',
        contactName: u.contact_name || '',
        trustScore: u.trust_score || 0,
        documentUrl: u.document_url || '',
        documentType: u.document_type || '',
        profilePhotoUrl: u.profile_photo_url || '',
        adminNotes: u.admin_notes || '',
        verifiedAt: u.verified_at,
        location: {
            state: u.state || '',
            district: u.district || '',
            lat: u.lat || null,
            lng: u.lng || null,
        },
        createdAt: u.created_at,
    };
}

/**
 * Approve a user — adds 30 trust points and sets verified timestamp
 */
async function approveUser(userId, adminNotes) {
    const result = await db.query(
        `UPDATE users SET 
            status = 'APPROVED', 
            trust_score = LEAST(trust_score + 30, 100),
            admin_notes = $2,
            verified_at = NOW(),
            updated_at = NOW()
         WHERE id = $1 AND type != 'admin'
         RETURNING id, name, type, status, trust_score`,
        [userId, adminNotes || '']
    );

    if (result.rows.length === 0) return null;
    return result.rows[0];
}

/**
 * Reject a user — requires a reason
 */
async function rejectUser(userId, adminNotes) {
    if (!adminNotes) {
        return { error: 'Rejection reason is required' };
    }

    const result = await db.query(
        `UPDATE users SET 
            status = 'REJECTED', 
            admin_notes = $2,
            updated_at = NOW()
         WHERE id = $1 AND type != 'admin'
         RETURNING id, name, type, status, trust_score`,
        [userId, adminNotes]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0];
}

/**
 * Get dashboard statistics
 */
async function getStats() {
    const usersCount = await db.query(
        `SELECT 
            COUNT(*) FILTER (WHERE type = 'farmer') AS farmers,
            COUNT(*) FILTER (WHERE type = 'buyer') AS buyers,
            COUNT(*) FILTER (WHERE status = 'PENDING') AS pending
         FROM users WHERE type != 'admin'`
    );

    const listingsCount = await db.query(
        `SELECT 
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE status = 'active') AS active,
            COUNT(*) FILTER (WHERE status = 'sold') AS sold
         FROM listings`
    );

    const ordersCount = await db.query(
        `SELECT 
            COUNT(*) AS total,
            COALESCE(SUM(total_amount), 0) AS total_revenue
         FROM orders`
    );

    const stats = usersCount.rows[0];
    const listings = listingsCount.rows[0];
    const orders = ordersCount.rows[0];

    return {
        farmers: parseInt(stats.farmers),
        buyers: parseInt(stats.buyers),
        pendingApprovals: parseInt(stats.pending),
        totalListings: parseInt(listings.total),
        activeListings: parseInt(listings.active),
        soldListings: parseInt(listings.sold),
        totalOrders: parseInt(orders.total),
        totalRevenue: parseFloat(orders.total_revenue),
    };
}

module.exports = {
    getAllUsers,
    getUserVerificationData,
    approveUser,
    rejectUser,
    getStats,
};
