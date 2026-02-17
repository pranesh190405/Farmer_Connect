const jwt = require('jsonwebtoken');
const db = require('../config/db');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findByPk(decoded.id);

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

/**
 * Middleware to check if user is verified
 * Apply only to buy/sell routes, not auth/registration/browsing
 */
const verifiedUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    if (!req.user.isVerified) {
        return res.status(403).json({
            message: 'Please complete document verification'
        });
    }

    next();
};

module.exports = { protect, verifiedUser };

