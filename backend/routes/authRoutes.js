const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { protect } = require('../middleware/authMiddleware');
const { sendSms } = require("../config/sms");

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/send-otp
// @desc    Send OTP to mobile
// @access  Public
router.post('/send-otp', async (req, res) => {
    const { phone } = req.body;

    // Validate Indian mobile number (10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            message: "Invalid phone number"
        });
    }

    try {
        // DEV MODE: Use fixed OTP "123456" and skip SMS
        const isDev = process.env.NODE_ENV !== 'production';
        const otp = isDev ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes TTL

        // Upsert OTP - find existing or create new
        const [otpRecord, created] = await Otp.findOrCreate({
            where: { phone },
            defaults: { otp, expiresAt }
        });

        if (!created) {
            // Update existing OTP record
            otpRecord.otp = otp;
            otpRecord.expiresAt = expiresAt;
            await otpRecord.save();
        }

        // Only send real SMS in production
        if (!isDev) {
            await sendSms(phone, otp);
        } else {
            console.log(`[DEV MODE] OTP for ${phone}: ${otp}`);
        }

        res.json({
            message: "OTP sent successfully",
            ...(isDev && { devOtp: otp }) // Include OTP in response for dev mode
        });
    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP - does NOT create user
// @access  Public
router.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ message: 'Please provide phone and OTP' });
    }

    try {
        // Find valid OTP (not expired)
        const validOtp = await Otp.findOne({
            where: {
                phone,
                otp,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!validOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Delete OTP record after successful verification
        await Otp.destroy({ where: { phone } });

        // Check if user exists with this phone
        const user = await User.findOne({ where: { phone } });

        if (!user) {
            // User does not exist - frontend should call /register
            return res.json({ isNewUser: true });
        }

        // User exists - return user with token
        res.json({
            isNewUser: false,
            token: generateToken(user.id),
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                role: user.role,
                documents: user.documents,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/register
// @desc    Register new user (called after OTP verification for new users)
// @access  Public
router.post('/register', async (req, res) => {
    const { phone, name, role } = req.body;

    if (!phone || !role) {
        return res.status(400).json({ message: 'Phone and role are required' });
    }

    // Validate role
    if (!['farmer', 'buyer'].includes(role)) {
        return res.status(400).json({ message: 'Role must be farmer or buyer' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this phone number' });
        }

        // Create new user
        const user = await User.create({
            phone,
            name: name || null,
            role,
            documents: [],
            isVerified: false
        });

        res.status(201).json({
            token: generateToken(user.id),
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                role: user.role,
                documents: user.documents,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    res.json({
        success: true,
        user: {
            id: user.id,
            phone: user.phone,
            name: user.name,
            role: user.role,
            location: user.location,
            cropInterests: user.cropInterests,
            buyingPreferences: user.buyingPreferences,
            documents: user.documents,
            isVerified: user.isVerified
        }
    });
});

module.exports = router;
