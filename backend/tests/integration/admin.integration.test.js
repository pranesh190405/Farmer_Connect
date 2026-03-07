const request = require('supertest');
const app = require('../../server');

describe('Admin Integration Tests', () => {

    test('GET /api/admin/users → unauthorized access', async () => {

        const res = await request(app)
            .get('/api/admin/users');

        expect([401,403]).toContain(res.statusCode);

    });

});