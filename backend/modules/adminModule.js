const db = require('../config/db');

/**
 * Get all users (for admin panel)
 */
async function getAllUsers() {
    const result = await db.query(
        `SELECT id, mobile, name, type, status, aadhar_number, aadhar_verified, created_at
         FROM users
         ORDER BY created_at DESC`
    );

    return result.rows.map(u => ({
        id: u.id,
        mobile: u.mobile,
        name: u.name,
        type: u.type,
        status: u.status,
        aadharNumber: u.aadhar_number,
        aadharVerified: u.aadhar_verified,
        createdAt: u.created_at,
    }));
}

/**
 * Approve a user
 */
async function approveUser(userId) {
    const result = await db.query(
        `UPDATE users SET status = 'APPROVED', updated_at = NOW()
         WHERE id = $1 AND type != 'admin'
         RETURNING id, name, type, status`,
        [userId]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0];
}

/**
 * Reject a user
 */
async function rejectUser(userId) {
    const result = await db.query(
        `UPDATE users SET status = 'REJECTED', updated_at = NOW()
         WHERE id = $1 AND type != 'admin'
         RETURNING id, name, type, status`,
        [userId]
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
    approveUser,
    rejectUser,
    getStats,
};
