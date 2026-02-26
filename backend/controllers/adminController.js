// Import admin module (contains database/business logic)
const adminModule = require('../modules/adminModule');

/**
 * GET /api/admin/users
 * Fetch all users with trust scores and document info
 */
async function getAllUsers(req, res) {
    try {
        const users = await adminModule.getAllUsers();
        res.json({ users });
    } catch (err) {
        console.error('getAllUsers error:', err);
        res.status(500).json({ error: 'Failed to get users' });
    }
}

/**
 * GET /api/admin/users/:id/verification
 * Get full verification data for admin review
 */
async function getUserVerification(req, res) {
    try {
        const data = await adminModule.getUserVerificationData(req.params.id);

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: data });
    } catch (err) {
        console.error('getUserVerification error:', err);
        res.status(500).json({ error: 'Failed to get verification data' });
    }
}

/**
 * PUT /api/admin/users/:id/approve
 * Approve a user — adds trust points, optional admin notes
 */
async function approveUser(req, res) {
    try {
        const { notes } = req.body;
        const result = await adminModule.approveUser(req.params.id, notes);

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User approved successfully', user: result });
    } catch (err) {
        console.error('approveUser error:', err);
        res.status(500).json({ error: 'Failed to approve user' });
    }
}

/**
 * PUT /api/admin/users/:id/reject
 * Reject a user — requires reason in notes
 */
async function rejectUser(req, res) {
    try {
        const { notes } = req.body;

        if (!notes) {
            return res.status(400).json({ error: 'Rejection reason is required' });
        }

        const result = await adminModule.rejectUser(req.params.id, notes);

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

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
        const stats = await adminModule.getStats();
        res.json({ stats });
    } catch (err) {
        console.error('getStats error:', err);
        res.status(500).json({ error: 'Failed to get stats' });
    }
}

/**
 * GET /api/admin/complaints
 */
async function getComplaints(req, res) {
    try {
        const complaints = await adminModule.getComplaints();
        res.json({ complaints });
    } catch (err) {
        console.error('getComplaints error:', err);
        res.status(500).json({ error: 'Failed to get complaints' });
    }
}

/**
 * PUT /api/admin/complaints/:id/resolve
 */
async function resolveComplaint(req, res) {
    try {
        const { adminResponse, status } = req.body;

        if (!adminResponse) {
            return res.status(400).json({ error: 'Admin response is required' });
        }

        const complaint = await adminModule.resolveComplaint(req.params.id, adminResponse, status || 'RESOLVED');

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        res.json({ message: 'Complaint resolved', complaint });
    } catch (err) {
        console.error('resolveComplaint error:', err);
        res.status(500).json({ error: 'Failed to resolve complaint' });
    }
}

// Export controller functions
module.exports = {
    getAllUsers,
    getUserVerification,
    approveUser,
    rejectUser,
    getStats,
    getComplaints,
    resolveComplaint,
};
