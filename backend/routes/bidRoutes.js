const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const { requireAuth, requireBuyer } = require('../middleware/auth');

/**
 * @swagger
 * /api/bids/listing/{listingId}:
 *   get:
 *     summary: Get all bids for a specific listing
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Bid session and bid history for the listing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                 bids:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bid'
 */
router.get('/listing/:listingId', requireAuth, bidController.getBidsForListing);

/**
 * @swagger
 * /api/bids/listing/{listingId}:
 *   post:
 *     summary: Place a bid on a listing (buyers only)
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 30.0
 *                 description: Bid amount (must be greater than 0)
 *     responses:
 *       201:
 *         description: Bid placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bid:
 *                   $ref: '#/components/schemas/Bid'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid bid amount
 *       403:
 *         description: Only buyers can place bids
 */
router.post('/listing/:listingId', requireAuth, requireBuyer, bidController.placeBid);

/**
 * @swagger
 * /api/bids/my:
 *   get:
 *     summary: Get all bids placed by the logged-in buyer
 *     tags: [Bids]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Array of bids
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bids:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bid'
 *       403:
 *         description: Only buyers can access this endpoint
 */
router.get('/my', requireAuth, requireBuyer, bidController.getMyBids);

module.exports = router;
