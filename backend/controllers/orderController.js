// Import order business logic module
const orderModule = require('../modules/orderModule');

/**
 * POST /api/orders
 * Create a new order
 */
async function createOrder(req, res) {
    try {
        const { items, deliveryAddress, paymentMethod, totalAmount } = req.body;

        // Order must contain at least one item
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }

        // Delivery address is mandatory
        if (!deliveryAddress) {
            return res.status(400).json({ error: 'Delivery address is required' });
        }

        // Create order using logged-in user's ID
        const order = await orderModule.createOrder(req.user.id, {
            items,
            deliveryAddress,
            paymentMethod,
            totalAmount: totalAmount || 0, // Default to 0 if not provided
        });

        res.status(201).json({
            order,
            message: 'Order placed successfully'
        });

    } catch (err) {
        console.error('createOrder error:', err);
        res.status(500).json({ error: 'Failed to place order' });
    }
}

/**
 * GET /api/orders/my
 * Get orders of the logged-in user
 */
async function getMyOrders(req, res) {
    try {
        // Pass user ID and type (buyer/seller) for role-based filtering
        const orders = await orderModule.getMyOrders(
            req.user.id,
            req.user.type
        );

        res.json({ orders });

    } catch (err) {
        console.error('getMyOrders error:', err);
        res.status(500).json({ error: 'Failed to get orders' });
    }
}

/**
 * GET /api/orders/:id
 * Get single order by ID
 */
async function getOrderById(req, res) {
    try {
        const order = await orderModule.getOrderById(req.params.id);

        // If order does not exist
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ order });

    } catch (err) {
        console.error('getOrderById error:', err);
        res.status(500).json({ error: 'Failed to get order' });
    }
}

/**
 * PUT /api/orders/:id/status
 * Update order status (e.g., pending, shipped, delivered)
 */
async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body;

        // Status field is required
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const order = await orderModule.updateOrderStatus(
            req.params.id,
            status
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            order,
            message: 'Order status updated'
        });

    } catch (err) {
        console.error('updateOrderStatus error:', err);
        res.status(500).json({ error: 'Failed to update order status' });
    }
}

// Export controller functions
module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
};
