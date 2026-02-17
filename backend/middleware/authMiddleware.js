// Import JWT library
const jwt = require('jsonwebtoken');

// Import User model (Sequelize model)
const User = require('../models/User');

/**
 * Middleware: Protect routes using Bearer Token (Authorization header)
 * Attaches full user object to req.user
 */
const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from header (format: Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // Verify token using secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from database using decoded ID
            // findByPk = Find by Primary Key (id)
            req.user = await User.findByPk(decoded.id);

            next(); // Continue to next middleware/controller

        } catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    // If no token provided
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }
};

/**
 * Middleware: Check if user is document verified
 * Apply to buy/sell routes (not login/register routes)
 */
const verifiedUser = (req, res, next) => {

    // Ensure user exists (protect middleware must run first)
    if (!req.user) {
        return res.status(401).json({
            message: 'Not authorized'
        });
    }

    // Check verification status
    if (!req.user.isVerified) {
        return res.status(403).json({
            message: 'Please complete document verification'
        });
    }

    next();
};

module.exports = { protect, verifiedUser };
