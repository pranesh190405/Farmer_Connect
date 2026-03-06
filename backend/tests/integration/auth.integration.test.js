const request = require('supertest');
const app = require('../../server');

describe('Auth Integration Tests', () => {

    test('POST /api/auth/register → missing fields', async () => {

        const res = await request(app)
            .post('/api/auth/register')
            .send({});

        expect(res.statusCode).toBe(400);

    });

    test('POST /api/auth/login → missing credentials', async () => {

        const res = await request(app)
            .post('/api/auth/login')
            .send({});

        expect(res.statusCode).toBe(400);

    });

});