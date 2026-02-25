const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// ─── Validation Rules ────────────────────────────────────────

const registerValidation = [
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required'),
    check('type').isIn(['farmer', 'buyer']).withMessage('Type must be farmer or buyer'),
    check('pin').matches(/^[0-9]{4}$/).withMessage('PIN must be exactly 4 digits'),
    check('name')
        .if(check('contactName').not().exists())
        .notEmpty().withMessage('Name is required'),
    check('contactName')
        .if(check('name').not().exists())
        .notEmpty().withMessage('Contact Name is required'),
];

const loginValidation = [
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required'),
    check('pin').matches(/^[0-9]{4}$/).withMessage('PIN must be exactly 4 digits'),
    check('userType').isIn(['farmer', 'buyer']).withMessage('User type must be farmer or buyer'),
];

const forgotPinValidation = [
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required'),
    check('aadharLast4').matches(/^[0-9]{4}$/).withMessage('Last 4 digits of Aadhaar required'),
    check('newPin').matches(/^[0-9]{4}$/).withMessage('New PIN must be exactly 4 digits'),
    check('userType').isIn(['farmer', 'buyer']).withMessage('User type must be farmer or buyer'),
];

const adminLoginValidation = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

// ─── Public Routes ───────────────────────────────────────────
router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/forgot-pin', validate(forgotPinValidation), authController.forgotPin);
router.post('/admin-login', validate(adminLoginValidation), authController.adminLogin);

// ─── Protected Routes ────────────────────────────────────────
router.get('/me', requireAuth, authController.getMe);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
