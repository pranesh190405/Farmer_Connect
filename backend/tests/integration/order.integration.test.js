process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'testsecret';
jest.mock('../../modules/orderModule');
const orderModule = require('../../modules/orderModule');

const request = require('supertest');
const app = require('../../server');
const jwt = require('jsonwebtoken');

describe('Order Integration Tests', () => {

    const buyerToken = jwt.sign(
        { id: 5, type: 'buyer' },
        'testsecret'
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/orders → success', async () => {

        orderModule.createOrder.mockResolvedValue({
            id: 1,
            totalAmount: 100
        });

        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', [`auth_token=${buyerToken}`])
            .send({
                items: [{ id: 1, quantity: 2 }],
                deliveryAddress: 'Chennai'
            });

        expect(res.status).toBe(201);
        expect(res.body.order.id).toBe(1);
    });

});