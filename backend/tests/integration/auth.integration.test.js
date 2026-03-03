process.env.NODE_ENV = 'test';

jest.mock('../../modules/authModule');
const authModule = require('../../modules/authModule');

const request = require('supertest');
const app = require('../../server');

describe('Auth Integration Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ────────────────────────────────
    // HEALTH CHECK
    // ────────────────────────────────

    test('GET /health → returns 200', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    // ────────────────────────────────
    // REGISTER
    // ────────────────────────────────

    test('POST /api/auth/register → validation fails (invalid mobile)', async () => {

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                mobile: '123',
                type: 'farmer',
                pin: '1234'
            });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Validation Error');
    });

    test('POST /api/auth/register → success', async () => {

        authModule.registerUser.mockResolvedValue({
            user: { id: 1, mobile: '9999999999', type: 'farmer' }
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                mobile: '9999999999',
                type: 'farmer',
                pin: '1234'
            });

        expect(res.status).toBe(201);
        expect(res.body.user.mobile).toBe('9999999999');
    });

    // ────────────────────────────────
    // LOGIN
    // ────────────────────────────────

    test('POST /api/auth/login → validation fails (missing fields)', async () => {

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                mobile: '9999999999'
            });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Validation Error');
    });

    test('POST /api/auth/login → success and sets cookie', async () => {

        authModule.loginUser.mockResolvedValue({
            user: { id: 1, mobile: '9999999999', type: 'farmer' },
            token: 'faketoken'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                mobile: '9999999999',
                pin: '1234',
                userType: 'farmer'
            });

        expect(res.status).toBe(200);
        expect(res.body.user.mobile).toBe('9999999999');
        expect(res.headers['set-cookie']).toBeDefined();
    });

    test('POST /api/auth/login → returns 401 if module returns error', async () => {

        authModule.loginUser.mockResolvedValue({
            error: 'Invalid credentials'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                mobile: '9999999999',
                pin: '1234',
                userType: 'farmer'
            });

        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Invalid credentials');
    });

});