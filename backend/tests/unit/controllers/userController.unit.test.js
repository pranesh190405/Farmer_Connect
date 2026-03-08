jest.mock('../../../modules/userModule', () => ({
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    uploadDocument: jest.fn(),
    uploadProfilePhoto: jest.fn(),
    updateLocation: jest.fn(),
    updatePreferences: jest.fn()
}));

const userController = require('../../../controllers/userController');
const userModule = require('../../../modules/userModule');

describe('User Controller Unit Tests', () => {

    let req;
    let res;

    beforeEach(() => {

        req = {
            params: {},
            body: {},
            user: { id: 1 },
            file: { filename: "test.jpg" }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('getProfile → success', async () => {

        userModule.getProfile.mockResolvedValue({ id: 1 });

        await userController.getProfile(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getProfile → not found', async () => {

        userModule.getProfile.mockResolvedValue(null);

        await userController.getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);

    });


    test('updateProfile → success', async () => {

        userModule.updateProfile.mockResolvedValue({ id: 1 });

        await userController.updateProfile(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('uploadDocument → success', async () => {

        userModule.uploadDocument.mockResolvedValue({
            document_url: "/uploads/test.jpg",
            trust_score: 10
        });

        await userController.uploadDocument(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('uploadProfilePhoto → success', async () => {

        userModule.uploadProfilePhoto.mockResolvedValue({
            profile_photo_url: "/uploads/test.jpg",
            trust_score: 20
        });

        await userController.uploadProfilePhoto(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('updateLocation → success', async () => {

        userModule.updateLocation.mockResolvedValue({ state: "Tamil Nadu" });

        await userController.updateLocation(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('updatePreferences → success', async () => {

        userModule.updatePreferences.mockResolvedValue({});

        await userController.updatePreferences(req, res);

        expect(res.json).toHaveBeenCalled();

    });

});