const orderModule = require('../modules/orderModule');

/**
 * POST /api/orders
 */
async function createOrder(req, res) {
    try {
        const { items, deliveryAddress, paymentMethod, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }

        if (!deliveryAddress) {
            return res.status(400).json({ error: 'Delivery address is required' });
        }

        const order = await orderModule.createOrder(req.user.id, {
            items,
            deliveryAddress,
            paymentMethod,
            totalAmount: totalAmount || 0,
        });

        res.status(201).json({ order, message: 'Order placed successfully' });
    } catch (err) {
        console.error('createOrder error:', err);
        res.status(500).json({ error: 'Failed to place order' });
    }
}

/**
 * GET /api/orders/my
 */
async function getMyOrders(req, res) {
    try {
        const orders = await orderModule.getMyOrders(req.user.id, req.user.type);
        res.json({ orders });
    } catch (err) {
        console.error('getMyOrders error:', err);
        res.status(500).json({ error: 'Failed to get orders' });
    }
}

/**
 * GET /api/orders/:id
 */
async function getOrderById(req, res) {
    try {
        const order = await orderModule.getOrderById(req.params.id);

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
 */
async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const order = await orderModule.updateOrderStatus(req.params.id, status);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ order, message: 'Order status updated' });
    } catch (err) {
        console.error('updateOrderStatus error:', err);
        res.status(500).json({ error: 'Failed to update order status' });
    }
}

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
};
