jest.mock('../../config/db');
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authModule = require('../../modules/authModule');

describe('Auth Module Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'testsecret';
    });

    // ────────────────────────────────
    // REGISTER
    // ────────────────────────────────

    test('registerUser → returns error if user already exists', async () => {
        db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        const result = await authModule.registerUser({
            mobile: '9999999999',
            type: 'farmer',
            name: 'Test',
            pin: '1234'
        });

        expect(result.error).toBe('User already exists with this mobile and type');
    });

    test('registerUser → creates new user successfully', async () => {
        db.query
            .mockResolvedValueOnce({ rows: [] }) // no existing user
            .mockResolvedValueOnce({
                rows: [{
                    id: 1,
                    mobile: '9999999999',
                    name: 'Test',
                    type: 'farmer',
                    status: 'APPROVED',
                    trust_score: 20
                }]
            })
            .mockResolvedValue({ rows: [] }); // for location + preferences inserts

        const result = await authModule.registerUser({
            mobile: '9999999999',
            type: 'farmer',
            name: 'Test',
            pin: '1234'
        });

        expect(result.user.mobile).toBe('9999999999');
        expect(result.user.type).toBe('farmer');
    });

    // ────────────────────────────────
    // LOGIN
    // ────────────────────────────────

    test('loginUser → error if user not found', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await authModule.loginUser('9999999999', '1234', 'farmer');

        expect(result.error).toBe('No account found. Please register first.');
    });

    test('loginUser → error if incorrect PIN', async () => {
        const fakeUser = {
            id: 1,
            mobile: '9999999999',
            type: 'farmer',
            pin_hash: await bcrypt.hash('1111', 10),
            failed_login_attempts: 0
        };

        db.query
            .mockResolvedValueOnce({ rows: [fakeUser] }) // user found
            .mockResolvedValueOnce({}); // update failed attempts

        const result = await authModule.loginUser('9999999999', '1234', 'farmer');

        expect(result.error).toContain('Incorrect PIN');
    });

    test('loginUser → successful login returns token', async () => {
        const fakeUser = {
            id: 1,
            mobile: '9999999999',
            type: 'farmer',
            status: 'APPROVED',
            pin_hash: await bcrypt.hash('1234', 10),
            failed_login_attempts: 0
        };

        db.query
            .mockResolvedValueOnce({ rows: [fakeUser] }) // find user
            .mockResolvedValueOnce({}); // reset attempts

        const result = await authModule.loginUser('9999999999', '1234', 'farmer');

        expect(result.token).toBeDefined();

        const decoded = jwt.verify(result.token, process.env.JWT_SECRET);
        expect(decoded.id).toBe(1);
    });

    // ────────────────────────────────
    // RESET PIN
    // ────────────────────────────────

    test('resetPin → error if aadhaar mismatch', async () => {
        db.query.mockResolvedValueOnce({
            rows: [{
                id: 1,
                aadhar_number: '123456789012'
            }]
        });

        const result = await authModule.resetPin('9999999999', '9999', '1234', 'farmer');

        expect(result.error).toContain('Aadhaar verification failed');
    });

    // ────────────────────────────────
    // ADMIN LOGIN
    // ────────────────────────────────

    test('adminLogin → error if admin not found', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await authModule.adminLogin('admin@test.com', 'password');

        expect(result.error).toBe('Admin account not found');
    });

});