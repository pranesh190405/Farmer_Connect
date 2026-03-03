const jwt = require('jsonwebtoken');
const { requireAuth, requireAdmin, requireFarmer } = require('../../middleware/auth');

describe('Auth Middleware Tests', () => {

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'testsecret';
    });

    test('requireAuth → 401 if no token', () => {
        const req = { cookies: {} };
        const res = mockResponse();

        requireAuth(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Authentication required. Please login.'
        });
    });

    test('requireAuth → 401 if invalid token', () => {
        const req = { cookies: { auth_token: 'invalidtoken' } };
        const res = mockResponse();

        requireAuth(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid or expired token. Please login again.'
        });
    });

    test('requireAuth → attaches user if valid token', () => {
        const token = jwt.sign(
            { id: 1, type: 'farmer', mobile: '9999999999' },
            process.env.JWT_SECRET
        );

        const req = { cookies: { auth_token: token } };
        const res = mockResponse();

        requireAuth(req, res, mockNext);

        expect(req.user.id).toBe(1);
        expect(req.user.type).toBe('farmer');
        expect(mockNext).toHaveBeenCalled();
    });

    test('requireAdmin → 403 if not admin', () => {
        const req = { user: { type: 'farmer' } };
        const res = mockResponse();

        requireAdmin(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Admin access required.'
        });
    });

    test('requireAdmin → calls next if admin', () => {
        const req = { user: { type: 'admin' } };
        const res = mockResponse();

        requireAdmin(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test('requireFarmer → 403 if not farmer', () => {
        const req = { user: { type: 'buyer' } };
        const res = mockResponse();

        requireFarmer(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Farmer access required.'
        });
    });

    test('requireFarmer → calls next if farmer', () => {
        const req = { user: { type: 'farmer' } };
        const res = mockResponse();

        requireFarmer(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

});