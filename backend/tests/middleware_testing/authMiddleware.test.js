const { requireAuth } = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth Middleware Tests', () => {

    let req;
    let res;
    let next;

    beforeEach(() => {

        req = {
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('should return 401 if token missing', () => {

        requireAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Authentication required. Please login.'
        });

    });


    test('should call next if token valid', () => {

        req.cookies.auth_token = "token123";

        jwt.verify.mockReturnValue({
            id: 1,
            type: "admin",
            mobile: "9876543210"
        });

        requireAuth(req, res, next);

        expect(req.user).toEqual({
            id: 1,
            type: "admin",
            mobile: "9876543210"
        });

        expect(next).toHaveBeenCalled();

    });


    test('should return 401 if token invalid', () => {

        req.cookies.auth_token = "invalidtoken";

        jwt.verify.mockImplementation(() => {
            throw new Error("Invalid token");
        });

        requireAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid or expired token. Please login again.'
        });

    });

});