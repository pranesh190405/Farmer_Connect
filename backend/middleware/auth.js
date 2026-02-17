// Import JWT library
const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT from auth_token cookie
 * If valid → attach user info to req.user
 */
const requireAuth = (req, res, next) => {
    try {
        // Get token from cookies (requires cookie-parser middleware)
        const token = req.cookies.auth_token;

        // If token not present → user not logged in
        if (!token) {
            return res.status(401).json({
                error: 'Authentication required. Please login.'
            });
        }

        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload to request object
        // Example: { id, type, mobile }
        req.user = decoded;

        next(); // Continue to next middleware / controller

    } catch (err) {
        // Token invalid or expired
        return res.status(401).json({
            error: 'Invalid or expired token. Please login again.'
        });
    }
};

/**
 * Middleware: Require admin role
 * Must be used AFTER requireAuth
 */
const requireAdmin = (req, res, next) => {

    // Ensure logged-in user is admin
    if (req.user.type !== 'admin') {
        return res.status(403).json({
            error: 'Admin access required.'
        });
    }

    next();
};

/**
 * Middleware: Require farmer role
 * Must be used AFTER requireAuth
 */
const requireFarmer = (req, res, next) => {

    // Ensure logged-in user is farmer
    if (req.user.type !== 'farmer') {
        return res.status(403).json({
            error: 'Farmer access required.'
        });
    }

    next();
};

// Export middlewares
module.exports = { requireAuth, requireAdmin, requireFarmer };
