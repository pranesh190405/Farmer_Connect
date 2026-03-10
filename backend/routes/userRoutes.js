const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// Validation rules
const updateProfileValidation = [
    check('name').optional().notEmpty().withMessage('Name cannot be empty'),
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('mobile').optional().notEmpty().withMessage('Mobile cannot be empty'),
];

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Profile not found
 */
router.get('/profile', requireAuth, userController.getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ravi Kumar"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ravi@example.com"
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.put('/profile', requireAuth, validate(updateProfileValidation), userController.updateProfile);

/**
 * @swagger
 * /api/users/upload-document:
 *   post:
 *     summary: Upload identity document (Aadhar/GST certificate)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Document file (Aadhar photo or GST certificate)
 *               documentType:
 *                 type: string
 *                 enum: [aadhar_photo, gst_certificate]
 *                 default: aadhar_photo
 *     responses:
 *       200:
 *         description: Document uploaded — trust score updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 documentUrl:
 *                   type: string
 *                 trustScore:
 *                   type: integer
 *       400:
 *         description: No file uploaded
 */
router.post('/upload-document', requireAuth, upload.single('document'), userController.uploadDocument);

/**
 * @swagger
 * /api/users/upload-photo:
 *   post:
 *     summary: Upload profile photo
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded — trust score updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profilePhotoUrl:
 *                   type: string
 *                 trustScore:
 *                   type: integer
 *       400:
 *         description: No file uploaded
 */
router.post('/upload-photo', requireAuth, upload.single('photo'), userController.uploadProfilePhoto);

/**
 * @swagger
 * /api/users/location:
 *   put:
 *     summary: Update user's location (state, district, coordinates)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 example: "Karnataka"
 *               district:
 *                 type: string
 *                 example: "Mandya"
 *               lat:
 *                 type: number
 *                 example: 12.52
 *               lng:
 *                 type: number
 *                 example: 76.9
 *     responses:
 *       200:
 *         description: Location updated
 */
router.put('/location', requireAuth, userController.updateLocation);

/**
 * @swagger
 * /api/users/preferences:
 *   put:
 *     summary: Update user preferences (language, notifications, etc.)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 example: "hi"
 *               notifications:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Preferences updated
 */
router.put('/preferences', requireAuth, userController.updatePreferences);

module.exports = router;
