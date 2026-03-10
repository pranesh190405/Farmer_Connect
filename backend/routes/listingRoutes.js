const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { requireAuth, requireFarmer } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// Validation rules
const createListingValidation = [
    check('cropName').notEmpty().withMessage('Crop name is required'),
    check('quantity').isFloat({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    check('unit').notEmpty().withMessage('Unit is required'),
    check('expectedPrice').isFloat({ gt: 0 }).withMessage('Expected price must be greater than 0'),
];

const updateListingValidation = [
    check('quantity').optional().isFloat({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    check('expectedPrice').optional().isFloat({ gt: 0 }).withMessage('Expected price must be greater than 0'),
];

/**
 * @swagger
 * /api/listings:
 *   get:
 *     summary: Get all listings with optional filters
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by crop name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by crop category
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, sold, closed]
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Array of listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Listing'
 */
router.get('/', requireAuth, listingController.getListings);

/**
 * @swagger
 * /api/listings/my:
 *   get:
 *     summary: Get the authenticated farmer's own listings
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Array of farmer's listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Listing'
 *       403:
 *         description: Only farmers can access this endpoint
 */
router.get('/my', requireAuth, requireFarmer, listingController.getMyListings);

/**
 * @swagger
 * /api/listings/{id}:
 *   get:
 *     summary: Get a single listing by ID
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listing:
 *                   $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Listing not found
 */
router.get('/:id', requireAuth, listingController.getListingById);

/**
 * @swagger
 * /api/listings:
 *   post:
 *     summary: Create a new crop listing (farmers only)
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cropName, quantity, unit, expectedPrice]
 *             properties:
 *               cropName:
 *                 type: string
 *                 example: "Tomato"
 *               quantity:
 *                 type: number
 *                 example: 100
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               expectedPrice:
 *                 type: number
 *                 example: 25.5
 *               description:
 *                 type: string
 *                 example: "Fresh organic tomatoes from Mandya"
 *     responses:
 *       201:
 *         description: Listing created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listing:
 *                   $ref: '#/components/schemas/Listing'
 *       403:
 *         description: Only farmers can create listings
 */
router.post('/', requireAuth, requireFarmer, validate(createListingValidation), listingController.createListing);

/**
 * @swagger
 * /api/listings/{id}:
 *   put:
 *     summary: Update a listing (owner farmer only)
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
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
 *               quantity:
 *                 type: number
 *               expectedPrice:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Listing updated
 *       404:
 *         description: Listing not found or not authorized
 */
router.put('/:id', requireAuth, requireFarmer, validate(updateListingValidation), listingController.updateListing);

/**
 * @swagger
 * /api/listings/{id}/status:
 *   put:
 *     summary: Update listing status (owner farmer only)
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, sold, closed]
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Status is required
 *       404:
 *         description: Listing not found or not authorized
 */
router.put('/:id/status', requireAuth, requireFarmer, listingController.updateStatus);

/**
 * @swagger
 * /api/listings/{id}:
 *   delete:
 *     summary: Delete a listing (owner farmer only)
 *     tags: [Listings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Listing deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Listing deleted successfully"
 *       404:
 *         description: Listing not found or not authorized
 */
router.delete('/:id', requireAuth, requireFarmer, listingController.deleteListing);

module.exports = router;
