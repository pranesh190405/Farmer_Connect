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
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

// ─── Public Routes ───────────────────────────────────────────

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new farmer or buyer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile, type, pin]
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *                 description: 10-digit mobile number
 *               type:
 *                 type: string
 *                 enum: [farmer, buyer]
 *               pin:
 *                 type: string
 *                 example: "1234"
 *                 description: 4-digit PIN
 *               name:
 *                 type: string
 *                 example: "Ravi Kumar"
 *               aadharNumber:
 *                 type: string
 *                 example: "123456789012"
 *               dateOfBirth:
 *                 type: string
 *                 example: "1990-05-15"
 *               address:
 *                 type: string
 *                 example: "Village Road, Mandya, Karnataka"
 *               businessName:
 *                 type: string
 *                 description: Required for buyers
 *               taxId:
 *                 type: string
 *                 description: GST number for buyers
 *               businessCategory:
 *                 type: string
 *               contactName:
 *                 type: string
 *                 description: Fallback name for buyers
 *     responses:
 *       201:
 *         description: User registered successfully (pending admin approval)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or duplicate mobile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', validate(registerValidation), authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with mobile, PIN and user type
 *     tags: [Auth]
 *     description: Authenticates the user and sets an HTTP-only JWT cookie (`auth_token`).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile, pin, userType]
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               pin:
 *                 type: string
 *                 example: "1234"
 *               userType:
 *                 type: string
 *                 enum: [farmer, buyer]
 *     responses:
 *       200:
 *         description: Login successful — auth_token cookie is set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account pending admin approval
 */
router.post('/login', validate(loginValidation), authController.login);

/**
 * @swagger
 * /api/auth/forgot-pin:
 *   post:
 *     summary: Reset PIN using Aadhaar verification
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile, aadharLast4, newPin, userType]
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               aadharLast4:
 *                 type: string
 *                 example: "9012"
 *                 description: Last 4 digits of Aadhaar number
 *               newPin:
 *                 type: string
 *                 example: "5678"
 *               userType:
 *                 type: string
 *                 enum: [farmer, buyer]
 *     responses:
 *       200:
 *         description: PIN reset successful
 *       400:
 *         description: Validation error or Aadhaar mismatch
 */
router.post('/forgot-pin', validate(forgotPinValidation), authController.forgotPin);

/**
 * @swagger
 * /api/auth/admin-login:
 *   post:
 *     summary: Admin login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@farmerconnect.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Admin login successful — auth_token cookie is set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid email or password
 */
router.post('/admin-login', validate(adminLoginValidation), authController.adminLogin);

// ─── Protected Routes ────────────────────────────────────────

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user profile with location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   allOf:
 *                     - $ref: '#/components/schemas/User'
 *                     - type: object
 *                       properties:
 *                         location:
 *                           type: object
 *                           properties:
 *                             state:
 *                               type: string
 *                             district:
 *                               type: string
 *                             lat:
 *                               type: number
 *                               nullable: true
 *                             lng:
 *                               type: number
 *                               nullable: true
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.get('/me', requireAuth, authController.getMe);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout — clears the auth cookie
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 */
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
