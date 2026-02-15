const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// Validation Rules
const sendOtpValidation = [
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required'),
];

const verifyOtpValidation = [
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required'),
    check('otp').isLength({ min: 4, max: 6 }).withMessage('OTP must be 4-6 digits'),
];

const registerValidation = [
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required'),
    check('type').isIn(['farmer', 'buyer']).withMessage('Type must be farmer or buyer'),
    check('name')
        .if(check('contactName').not().exists())
        .notEmpty().withMessage('Name is required'),
    check('contactName')
        .if(check('name').not().exists())
        .notEmpty().withMessage('Contact Name is required'),
];

const adminLoginValidation = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

// Public routes
router.post('/send-otp', validate(sendOtpValidation), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpValidation), authController.verifyOtp);
router.post('/register', validate(registerValidation), authController.register);
router.post('/admin-login', validate(adminLoginValidation), authController.adminLogin);

// Protected routes
router.get('/me', requireAuth, authController.getMe);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
