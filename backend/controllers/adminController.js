// Import admin module (contains database/business logic)
const adminModule = require('../modules/adminModule');

/**
 * GET /api/admin/users
 * Fetch all users
 */
async function getAllUsers(req, res) {
    try {
        // Call module function to retrieve users from database
        const users = await adminModule.getAllUsers();

        // Send users as JSON response
        res.json({ users });

    } catch (err) {
        // Log error for debugging
        console.error('getAllUsers error:', err);

        // Send server error response
        res.status(500).json({ error: 'Failed to get users' });
    }
}

/**
 * PUT /api/admin/users/:id/approve
 * Approve a user by ID
 */
async function approveUser(req, res) {
    try {
        // Approve user using ID from request params
        const result = await adminModule.approveUser(req.params.id);

        // If no user found, return 404
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Success response
        res.json({ message: 'User approved successfully', user: result });

    } catch (err) {
        console.error('approveUser error:', err);
        res.status(500).json({ error: 'Failed to approve user' });
    }
}

/**
 * PUT /api/admin/users/:id/reject
 * Reject a user by ID
 */
async function rejectUser(req, res) {
    try {
        // Reject user using ID from request params
        const result = await adminModule.rejectUser(req.params.id);

        // If no user found, return 404
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Success response
        res.json({ message: 'User rejected', user: result });

    } catch (err) {
        console.error('rejectUser error:', err);
        res.status(500).json({ error: 'Failed to reject user' });
    }
}

/**
 * GET /api/admin/stats
 * Get admin dashboard statistics
 */
async function getStats(req, res) {
    try {
        // Fetch statistics from module
        const stats = await adminModule.getStats();

        // Send stats as response
        res.json({ stats });

    } catch (err) {
        console.error('getStats error:', err);
        res.status(500).json({ error: 'Failed to get stats' });
    }
}

// Export controller functions
module.exports = {
    getAllUsers,
    approveUser,
    rejectUser,
    getStats,
};
