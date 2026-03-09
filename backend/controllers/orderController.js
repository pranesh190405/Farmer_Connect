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
 * Update order status
 * - Farmer can set 'shipped' (for orders containing their listings)
 * - Buyer can set 'delivered' (for their own orders that are 'shipped')
 */
async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body;
        const userId = req.user.id;
        const userType = req.user.type;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        // Validate transitions based on user type
        if (userType === 'farmer' && status !== 'shipped') {
            return res.status(403).json({ error: 'Farmers can only mark orders as shipped' });
        }
        if (userType === 'buyer' && status !== 'delivered') {
            return res.status(403).json({ error: 'Buyers can only mark orders as delivered' });
        }

        // Fetch order to validate ownership
        const order = await orderModule.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // If farmer: must be 'placed' status and order must contain their listings
        if (userType === 'farmer') {
            if (order.status !== 'placed') {
                return res.status(400).json({ error: 'Can only ship orders that are placed' });
            }
        }

        // If buyer: must be 'shipped' status and order must belong to them
        if (userType === 'buyer') {
            if (order.buyerId !== userId) {
                return res.status(403).json({ error: 'This is not your order' });
            }
            if (order.status !== 'shipped') {
                return res.status(400).json({ error: 'Can only confirm delivery for shipped orders' });
            }
        }

        const updated = await orderModule.updateOrderStatus(req.params.id, status);

        res.json({
            order: updated,
            message: status === 'shipped' ? 'Order marked as shipped' : 'Delivery confirmed'
        });

    } catch (err) {
        console.error('updateOrderStatus error:', err);
        res.status(500).json({ error: 'Failed to update order status' });
    }
}

/**
 * POST /api/orders/:id/complaints
 * Create an order complaint (logged-in user)
 */
async function createComplaint(req, res) {
    try {
        const { issueType, description } = req.body;

        if (!issueType || !description) {
            return res.status(400).json({ error: 'Issue type and description are required' });
        }

        const complaint = await orderModule.createComplaint(
            req.params.id,
            req.user.id,
            issueType,
            description
        );

        res.status(201).json({
            complaint,
            message: 'Complaint raised successfully'
        });

    } catch (err) {
        console.error('createComplaint error:', err);
        res.status(500).json({ error: 'Failed to raise complaint' });
    }
}

// Export controller functions
module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    createComplaint,
};
