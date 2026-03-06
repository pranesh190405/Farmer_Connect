const request = require('supertest');
const app = require('../../server');

describe('Order Integration Tests', () => {

    test('POST /api/orders → missing order data', async () => {

        const res = await request(app)
            .post('/api/orders')
            .send({});

        expect([400,401]).toContain(res.statusCode);

    });

});