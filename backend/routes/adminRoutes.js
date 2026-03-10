const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with trust scores
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     description: Admin-only. Returns all registered users with trust scores and document verification info.
 *     responses:
 *       200:
 *         description: Array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin access required
 */
router.get('/users', requireAuth, requireAdmin, adminController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}/verification:
 *   get:
 *     summary: Get full verification data for a user
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User verification details
 *       404:
 *         description: User not found
 */
router.get('/users/:id/verification', requireAuth, requireAdmin, adminController.getUserVerification);

/**
 * @swagger
 * /api/admin/users/{id}/approve:
 *   put:
 *     summary: Approve a user registration
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     description: Approves the user and adds trust score points.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "Documents verified, approved for marketplace access"
 *     responses:
 *       200:
 *         description: User approved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User approved successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put('/users/:id/approve', requireAuth, requireAdmin, adminController.approveUser);

/**
 * @swagger
 * /api/admin/users/{id}/reject:
 *   put:
 *     summary: Reject a user registration
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     description: Rejects the user. A rejection reason (notes) is required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [notes]
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "Aadhaar document is blurry, please re-upload"
 *     responses:
 *       200:
 *         description: User rejected
 *       400:
 *         description: Rejection reason is required
 *       404:
 *         description: User not found
 */
router.put('/users/:id/reject', requireAuth, requireAdmin, adminController.rejectUser);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     description: Returns aggregate stats — total users, listings, orders, pending approvals, etc.
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 */
router.get('/stats', requireAuth, requireAdmin, adminController.getStats);

/**
 * @swagger
 * /api/admin/complaints:
 *   get:
 *     summary: Get all complaints
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Array of complaints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 complaints:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Complaint'
 */
router.get('/complaints', requireAuth, requireAdmin, adminController.getComplaints);

/**
 * @swagger
 * /api/admin/complaints/{id}/resolve:
 *   put:
 *     summary: Resolve a complaint
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Complaint ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [adminResponse]
 *             properties:
 *               adminResponse:
 *                 type: string
 *                 example: "Refund has been processed"
 *               status:
 *                 type: string
 *                 enum: [RESOLVED, REJECTED]
 *                 default: RESOLVED
 *     responses:
 *       200:
 *         description: Complaint resolved
 *       400:
 *         description: Admin response is required
 *       404:
 *         description: Complaint not found
 */
router.put('/complaints/:id/resolve', requireAuth, requireAdmin, adminController.resolveComplaint);

module.exports = router;
