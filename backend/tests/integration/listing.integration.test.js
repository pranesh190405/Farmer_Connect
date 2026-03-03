process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'testsecret';
jest.mock('../../modules/listingModule');
const listingModule = require('../../modules/listingModule');

const request = require('supertest');
const app = require('../../server');
const jwt = require('jsonwebtoken');

describe('Listing Integration Tests', () => {

    const farmerToken = jwt.sign(
        { id: 1, type: 'farmer' },
        'testsecret'
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/listings → requires auth', async () => {
        const res = await request(app).get('/api/listings');
        expect(res.status).toBe(401);
    });

    test('GET /api/listings → success', async () => {
        listingModule.getListings.mockResolvedValue([
            { id: 1, cropName: 'Tomato' }
        ]);

        const res = await request(app)
            .get('/api/listings')
            .set('Cookie', [`auth_token=${farmerToken}`]);

        expect(res.status).toBe(200);
        expect(res.body.listings.length).toBe(1);
    });

    test('POST /api/listings → farmer can create', async () => {
        listingModule.createListing.mockResolvedValue({
            id: 1,
            cropName: 'Tomato'
        });

        const res = await request(app)
            .post('/api/listings')
            .set('Cookie', [`auth_token=${farmerToken}`])
            .send({
                cropName: 'Tomato',
                quantity: 10,
                unit: 'kg',
                expectedPrice: 20
            });

        expect(res.status).toBe(201);
        expect(res.body.listing.cropName).toBe('Tomato');
    });

});