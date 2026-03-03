process.env.NODE_ENV = 'test';

jest.mock('../../config/db');
const db = require('../../config/db');

const orderModule = require('../../modules/orderModule');

describe('Order Module Tests', () => {

    let mockClient;

    beforeEach(() => {
        jest.clearAllMocks();

        mockClient = {
            query: jest.fn(),
            release: jest.fn()
        };

        db.pool = {
            connect: jest.fn().mockResolvedValue(mockClient)
        };
    });

    // ────────────────────────────────
    // CREATE ORDER (Transaction)
    // ────────────────────────────────

    test('createOrder → creates order successfully', async () => {

        const fakeOrder = {
            id: 1,
            buyer_id: 5,
            total_amount: 100,
            status: 'placed',
            delivery_address: 'Chennai',
            payment_method: 'cod',
            created_at: new Date(),
            updated_at: new Date()
        };

        mockClient.query
            .mockResolvedValueOnce() // BEGIN
            .mockResolvedValueOnce({ rows: [fakeOrder] }) // insert order
            .mockResolvedValueOnce() // insert item
            .mockResolvedValueOnce(); // COMMIT

        const result = await orderModule.createOrder(5, {
            items: [{ id: 1, quantity: 2, price: 50 }],
            deliveryAddress: 'Chennai',
            paymentMethod: 'cod',
            totalAmount: 100
        });

        expect(result.id).toBe(1);
        expect(mockClient.release).toHaveBeenCalled();
    });

    test('createOrder → rolls back on error', async () => {

        mockClient.query
            .mockResolvedValueOnce() // BEGIN
            .mockRejectedValueOnce(new Error('DB Error')) // fail insert
            .mockResolvedValueOnce(); // ROLLBACK

        await expect(
            orderModule.createOrder(5, {
                items: [{ id: 1, quantity: 2 }],
                deliveryAddress: 'Chennai'
            })
        ).rejects.toThrow('DB Error');

        expect(mockClient.release).toHaveBeenCalled();
    });

    // ────────────────────────────────
    // GET MY ORDERS (Buyer)
    // ────────────────────────────────

    test('getMyOrders → returns buyer orders', async () => {

        const fakeRows = [{
            id: 1,
            buyer_id: 5,
            total_amount: 200,
            status: 'placed',
            delivery_address: 'Chennai',
            payment_method: 'cod',
            items: [],
            farmer_name: 'Farmer A',
            created_at: new Date(),
            updated_at: new Date()
        }];

        db.query.mockResolvedValueOnce({ rows: fakeRows });

        const result = await orderModule.getMyOrders(5, 'buyer');

        expect(result.length).toBe(1);
        expect(result[0].buyerId).toBe(5);
    });

    // ────────────────────────────────
    // GET ORDER BY ID
    // ────────────────────────────────

    test('getOrderById → returns null if not found', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await orderModule.getOrderById(999);

        expect(result).toBeNull();
    });

    // ────────────────────────────────
    // UPDATE ORDER STATUS
    // ────────────────────────────────

    test('updateOrderStatus → updates successfully', async () => {

        const fakeRow = {
            id: 1,
            buyer_id: 5,
            total_amount: 100,
            status: 'shipped',
            delivery_address: '',
            payment_method: 'cod',
            created_at: new Date(),
            updated_at: new Date()
        };

        db.query.mockResolvedValueOnce({ rows: [fakeRow] });

        const result = await orderModule.updateOrderStatus(1, 'shipped');

        expect(result.status).toBe('shipped');
    });

    // ────────────────────────────────
    // CREATE COMPLAINT
    // ────────────────────────────────

    test('createComplaint → inserts complaint', async () => {

        const fakeComplaint = {
            id: 1,
            order_id: 1,
            raised_by: 5,
            issue_type: 'Late Delivery',
            description: 'Order delayed'
        };

        db.query.mockResolvedValueOnce({ rows: [fakeComplaint] });

        const result = await orderModule.createComplaint(
            1,
            5,
            'Late Delivery',
            'Order delayed'
        );

        expect(result.id).toBe(1);
        expect(result.issue_type).toBe('Late Delivery');
    });

});