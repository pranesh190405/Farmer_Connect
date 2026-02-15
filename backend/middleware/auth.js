const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT from auth_token cookie
 * Attaches req.user = { id, type, mobile }
 */
const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ error: 'Authentication required. Please login.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, type, mobile }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token. Please login again.' });
    }
};

/**
 * Middleware: Require admin role
 * Must be used AFTER requireAuth
 */
const requireAdmin = (req, res, next) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
};

/**
 * Middleware: Require farmer role
 * Must be used AFTER requireAuth
 */
const requireFarmer = (req, res, next) => {
    if (req.user.type !== 'farmer') {
        return res.status(403).json({ error: 'Farmer access required.' });
    }
    next();
};

module.exports = { requireAuth, requireAdmin, requireFarmer };
