jest.mock('../../../modules/adminModule', () => ({
    getAllUsers: jest.fn(),
    getUserVerificationData: jest.fn(),
    approveUser: jest.fn(),
    rejectUser: jest.fn(),
    getStats: jest.fn(),
    getComplaints: jest.fn(),
    resolveComplaint: jest.fn()
}));

const adminController = require('../../../controllers/adminController');
const adminModule = require('../../../modules/adminModule');

describe('Admin Controller Unit Tests', () => {

    let req;
    let res;

    beforeEach(() => {

        req = {
            params: {},
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('getAllUsers → success', async () => {

        adminModule.getAllUsers.mockResolvedValue([
            { id: 1, name: 'Test User' }
        ]);

        await adminController.getAllUsers(req, res);

        expect(adminModule.getAllUsers).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();

    });


    test('getUserVerification → user found', async () => {

        req.params.id = 1;

        adminModule.getUserVerificationData.mockResolvedValue({
            id: 1,
            name: 'Test User'
        });

        await adminController.getUserVerification(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getUserVerification → user not found', async () => {

        req.params.id = 99;

        adminModule.getUserVerificationData.mockResolvedValue(null);

        await adminController.getUserVerification(req, res);

        expect(res.status).toHaveBeenCalledWith(404);

    });


    test('approveUser → success', async () => {

        req.params.id = 1;
        req.body = { notes: "Approved" };

        adminModule.approveUser.mockResolvedValue({
            id: 1,
            status: 'APPROVED'
        });

        await adminController.approveUser(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('rejectUser → missing notes', async () => {

        req.params.id = 1;
        req.body = {};

        await adminController.rejectUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });


    test('getStats → success', async () => {

        adminModule.getStats.mockResolvedValue({
            farmers: 10,
            buyers: 5
        });

        await adminController.getStats(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getComplaints → success', async () => {

        adminModule.getComplaints.mockResolvedValue([]);

        await adminController.getComplaints(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('resolveComplaint → success', async () => {

        req.params.id = 1;
        req.body = { adminResponse: "Resolved", status: "RESOLVED" };

        adminModule.resolveComplaint.mockResolvedValue({
            id: 1
        });

        await adminController.resolveComplaint(req, res);

        expect(res.json).toHaveBeenCalled();

    });

});