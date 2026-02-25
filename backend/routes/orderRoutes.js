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

// All order routes require authentication
router.post('/', requireAuth, validate(createOrderValidation), orderController.createOrder);
router.get('/my', requireAuth, orderController.getMyOrders);
router.get('/:id', requireAuth, orderController.getOrderById);
router.put('/:id/status', requireAuth, validate(updateStatusValidation), orderController.updateOrderStatus);
router.post('/:id/complaints', requireAuth, orderController.createComplaint);

module.exports = router;
