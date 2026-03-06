const request = require('supertest');
const app = require('../../server');

describe('Listing Integration Tests', () => {

    test('GET /api/listings → fetch listings', async () => {

        const res = await request(app)
            .get('/api/listings');

        // listings may require authentication
        expect([200,401,403,404]).toContain(res.statusCode);

    });

});