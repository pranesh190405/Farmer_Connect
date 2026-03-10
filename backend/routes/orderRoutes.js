const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// Validation rules
const createOrderValidation = [
    check('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
    check('items.*.id').isInt().withMessage('Invalid item ID'),
    check('items.*.quantity').isFloat({ gt: 0 }).withMessage('Item quantity must be greater than 0'),
    check('deliveryAddress').notEmpty().withMessage('Delivery address is required'),
];

const updateStatusValidation = [
    check('status').isIn(['placed', 'confirmed', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
];

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, deliveryAddress]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id, quantity]
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Listing ID
 *                       example: 5
 *                     quantity:
 *                       type: number
 *                       example: 10
 *               deliveryAddress:
 *                 type: string
 *                 example: "123 Farm Road, Mandya, Karnataka"
 *               paymentMethod:
 *                 type: string
 *                 example: "cash_on_delivery"
 *               totalAmount:
 *                 type: number
 *                 example: 2500
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error
 */
router.post('/', requireAuth, validate(createOrderValidation), orderController.createOrder);

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Get orders of the logged-in user
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     description: Returns orders based on user type — buyers see their purchases, farmers see orders containing their listings.
 *     responses:
 *       200:
 *         description: Array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get('/my', requireAuth, orderController.getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get('/:id', requireAuth, orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     description: |
 *       Role-based status transitions:
 *       - **Farmer** can set status to `shipped` (for placed orders containing their listings)
 *       - **Buyer** can set status to `delivered` (for their own shipped orders)
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
 *                 enum: [placed, confirmed, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status transition
 *       403:
 *         description: Not authorized for this status change
 *       404:
 *         description: Order not found
 */
router.put('/:id/status', requireAuth, validate(updateStatusValidation), orderController.updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}/complaints:
 *   post:
 *     summary: Raise a complaint for an order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [issueType, description]
 *             properties:
 *               issueType:
 *                 type: string
 *                 example: "quality"
 *                 description: Type of issue (e.g. quality, delivery, quantity)
 *               description:
 *                 type: string
 *                 example: "Produce was damaged on arrival"
 *     responses:
 *       201:
 *         description: Complaint raised successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 complaint:
 *                   $ref: '#/components/schemas/Complaint'
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing issue type or description
 */
router.post('/:id/complaints', requireAuth, orderController.createComplaint);

module.exports = router;
