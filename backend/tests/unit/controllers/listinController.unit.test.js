jest.mock('../../../modules/listingModule', () => ({
    createListing: jest.fn(),
    getListings: jest.fn(),
    getMyListings: jest.fn(),
    getListingById: jest.fn(),
    updateListing: jest.fn(),
    updateStatus: jest.fn(),
    deleteListing: jest.fn()
}));

const listingController = require('../../../controllers/listingController');
const listingModule = require('../../../modules/listingModule');

describe('Listing Controller Unit Tests', () => {

    let req;
    let res;

    beforeEach(() => {

        req = {
            params: {},
            body: {},
            query: {},
            user: { id: 1 }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('createListing → success', async () => {

        listingModule.createListing.mockResolvedValue({ id: 1 });

        await listingController.createListing(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();

    });


    test('getListings → success', async () => {

        listingModule.getListings.mockResolvedValue([]);

        await listingController.getListings(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getMyListings → success', async () => {

        listingModule.getMyListings.mockResolvedValue([]);

        await listingController.getMyListings(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getListingById → found', async () => {

        req.params.id = 1;

        listingModule.getListingById.mockResolvedValue({ id: 1 });

        await listingController.getListingById(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getListingById → not found', async () => {

        req.params.id = 2;

        listingModule.getListingById.mockResolvedValue(null);

        await listingController.getListingById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);

    });


    test('updateListing → success', async () => {

        req.params.id = 1;

        listingModule.updateListing.mockResolvedValue({ id: 1 });

        await listingController.updateListing(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('updateStatus → missing status', async () => {

        req.params.id = 1;
        req.body = {};

        await listingController.updateStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });


    test('deleteListing → success', async () => {

        req.params.id = 1;

        listingModule.deleteListing.mockResolvedValue(true);

        await listingController.deleteListing(req, res);

        expect(res.json).toHaveBeenCalled();

    });

});