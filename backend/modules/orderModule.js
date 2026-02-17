const db = require('../config/db');

/**
 * Create a new order from cart items
 */
async function createOrder(buyerId, { items, deliveryAddress, paymentMethod, totalAmount }) {
    const client = await db.pool.connect();

    try {
        await client.query('BEGIN');

        // Create order
        const orderResult = await client.query(
            `INSERT INTO orders (buyer_id, total_amount, delivery_address, payment_method, status)
             VALUES ($1, $2, $3, $4, 'placed')
             RETURNING *`,
            [buyerId, totalAmount, deliveryAddress, paymentMethod || 'cod']
        );

        const order = orderResult.rows[0];

        // Insert order items
        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, listing_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [order.id, item.listingId || item.id, item.quantity, item.price || item.priceValue || 0]
            );

            // Update listing status to 'sold' if fully purchased (optional)
            // In a real app, you'd decrement stock. For simplicity, mark as sold.
        }

        await client.query('COMMIT');
        return formatOrder(order);
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

/**
 * Get orders for a user (buyer sees their orders, farmer sees orders for their listings)
 */
async function getMyOrders(userId, userType) {
    let query;

    if (userType === 'buyer') {
        query = {
            text: `SELECT o.*, 
                    json_agg(json_build_object(
                        'id', oi.id,
                        'listingId', oi.listing_id,
                        'quantity', oi.quantity,
                        'price', oi.price,
                        'cropName', l.crop_name,
                        'image', l.image_url
                    )) AS items,
                    (SELECT u.name FROM users u 
                     JOIN listings l2 ON u.id = l2.farmer_id 
                     JOIN order_items oi2 ON l2.id = oi2.listing_id 
                     WHERE oi2.order_id = o.id LIMIT 1) as farmer_name
                   FROM orders o
                   LEFT JOIN order_items oi ON o.id = oi.order_id
                   LEFT JOIN listings l ON oi.listing_id = l.id
                   WHERE o.buyer_id = $1
                   GROUP BY o.id
                   ORDER BY o.created_at DESC`,
            values: [userId]
        };
    } else {
        // Farmer: find orders that contain their listings
        query = {
            text: `SELECT DISTINCT o.*,
                    json_agg(json_build_object(
                        'id', oi.id,
                        'listingId', oi.listing_id,
                        'quantity', oi.quantity,
                        'price', oi.price,
                        'cropName', l.crop_name,
                        'image', l.image_url
                    )) AS items
                   FROM orders o
                   JOIN order_items oi ON o.id = oi.order_id
                   JOIN listings l ON oi.listing_id = l.id
                   WHERE l.farmer_id = $1
                   GROUP BY o.id
                   ORDER BY o.created_at DESC`,
            values: [userId]
        };
    }

    const result = await db.query(query);
    return result.rows.map(formatOrder);
}

/**
 * Get single order by ID
 */
async function getOrderById(id) {
    const result = await db.query(
        `SELECT o.*, 
            json_agg(json_build_object(
                'id', oi.id,
                'listingId', oi.listing_id,
                'quantity', oi.quantity,
                'price', oi.price,
                'cropName', l.crop_name,
                'image', l.image_url
            )) AS items,
            u.name AS buyer_name
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         LEFT JOIN listings l ON oi.listing_id = l.id
         LEFT JOIN users u ON o.buyer_id = u.id
         WHERE o.id = $1
         GROUP BY o.id, u.name`,
        [id]
    );

    if (result.rows.length === 0) return null;
    return formatOrder(result.rows[0]);
}

/**
 * Update order status
 */
async function updateOrderStatus(id, status) {
    const result = await db.query(
        `UPDATE orders SET status = $1, updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [status, id]
    );

    if (result.rows.length === 0) return null;
    return formatOrder(result.rows[0]);
}

/**
 * Format order for API response
 */
function formatOrder(row) {
    return {
        id: row.id,
        buyerId: row.buyer_id,
        buyerName: row.buyer_name || '',
        totalAmount: parseFloat(row.total_amount),
        status: row.status,
        deliveryAddress: row.delivery_address,
        paymentMethod: row.payment_method,
        items: row.items || [],
        farmerName: row.farmer_name || 'Agri Market', // Default if not found
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
};
