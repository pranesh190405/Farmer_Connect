jest.mock('../../../config/db', () => ({
    query: jest.fn(),
    pool: {
        connect: jest.fn()
    }
}));

const authController = require('../../../controllers/authController');
const authModule = require('../../../modules/authModule');

jest.mock('../../../modules/authModule');

describe('Auth Controller Unit Tests', () => {

    let req;
    let res;

    beforeEach(() => {

        req = {
            body: {},
            user: { id: 1 }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('register → success', async () => {

        req.body = {
            mobile: '9876543210',
            type: 'farmer',
            pin: '1234',
            name: 'Test User'
        };

        authModule.registerUser.mockResolvedValue({
            user: { id: 1, mobile: '9876543210' }
        });

        await authController.register(req, res);

        expect(authModule.registerUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();

    });


    test('register → missing fields', async () => {

        req.body = {};

        await authController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });


    test('login → success', async () => {

        req.body = {
            mobile: '9876543210',
            pin: '1234',
            userType: 'farmer'
        };

        authModule.loginUser.mockResolvedValue({
            token: 'fake-token',
            user: { id: 1 }
        });

        await authController.login(req, res);

        expect(res.cookie).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();

    });


    test('login → invalid credentials', async () => {

        req.body = {
            mobile: '9876543210',
            pin: '0000',
            userType: 'farmer'
        };

        authModule.loginUser.mockResolvedValue({
            error: 'Invalid credentials'
        });

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalled();

    });


    test('logout → success', async () => {

        await authController.logout(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith('auth_token');
        expect(res.json).toHaveBeenCalled();

    });

});