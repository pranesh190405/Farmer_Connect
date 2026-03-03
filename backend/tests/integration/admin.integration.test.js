process.env.NODE_ENV = 'test';

jest.mock('../../modules/adminModule');
const adminModule = require('../../modules/adminModule');

const request = require('supertest');
const app = require('../../server');
const jwt = require('jsonwebtoken');

describe('Admin Integration Tests', () => {

    const adminToken = jwt.sign(
        { id: 99, type: 'admin' },
        'testsecret'
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/admin/users → requires admin', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Cookie', [`auth_token=${adminToken}`]);

        expect(res.status).not.toBe(403);
    });

});