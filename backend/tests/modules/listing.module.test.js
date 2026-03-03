process.env.NODE_ENV = 'test';

jest.mock('../../config/db');
const db = require('../../config/db');

const listingModule = require('../../modules/listingModule');

describe('Listing Module Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ────────────────────────────────
    // CREATE LISTING
    // ────────────────────────────────

    test('createListing → creates listing successfully', async () => {

        const fakeRow = {
            id: 1,
            farmer_id: 10,
            crop_name: 'Tomato',
            category: 'vegetables',
            variety: '',
            quantity: 100,
            unit: 'kg',
            expected_price: 20,
            quality_grade: 'A',
            description: '',
            image_url: '',
            location_address: '',
            location_lat: null,
            location_lng: null,
            is_organic: false,
            harvest_date: null,
            min_qty: 1,
            rating: 0,
            created_at: new Date(),
            updated_at: new Date()
        };

        db.query.mockResolvedValueOnce({ rows: [fakeRow] });

        const result = await listingModule.createListing(10, {
            cropName: 'Tomato',
            quantity: 100,
            expectedPrice: 20
        });

        expect(result.cropName).toBe('Tomato');
        expect(result.farmerId).toBe(10);
    });

    // ────────────────────────────────
    // GET LISTINGS
    // ────────────────────────────────

    test('getListings → returns formatted listings', async () => {

        const fakeRows = [{
            id: 1,
            farmer_id: 10,
            crop_name: 'Tomato',
            category: 'vegetables',
            variety: '',
            quantity: 50,
            unit: 'kg',
            expected_price: 30,
            quality_grade: 'B',
            description: '',
            image_url: '',
            location_address: 'Chennai',
            location_lat: null,
            location_lng: null,
            status: 'active',
            is_organic: false,
            harvest_date: null,
            min_qty: 1,
            rating: 0,
            farmer_name: 'Farmer A',
            farmer_mobile: '9999999999',
            created_at: new Date(),
            updated_at: new Date()
        }];

        db.query.mockResolvedValueOnce({ rows: fakeRows });

        const result = await listingModule.getListings();

        expect(result.length).toBe(1);
        expect(result[0].cropName).toBe('Tomato');
        expect(result[0].farmer).toBe('Farmer A');
    });

    // ────────────────────────────────
    // GET BY ID
    // ────────────────────────────────

    test('getListingById → returns null if not found', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await listingModule.getListingById(999);

        expect(result).toBeNull();
    });

    // ────────────────────────────────
    // UPDATE LISTING
    // ────────────────────────────────

    test('updateListing → returns updated listing', async () => {

        const fakeRow = {
            id: 1,
            farmer_id: 10,
            crop_name: 'Updated Crop',
            category: 'vegetables',
            variety: '',
            quantity: 100,
            unit: 'kg',
            expected_price: 25,
            quality_grade: 'A',
            description: '',
            image_url: '',
            location_address: '',
            location_lat: null,
            location_lng: null,
            status: 'active',
            is_organic: false,
            harvest_date: null,
            min_qty: 1,
            rating: 0,
            created_at: new Date(),
            updated_at: new Date()
        };

        db.query.mockResolvedValueOnce({ rows: [fakeRow] });

        const result = await listingModule.updateListing(1, 10, {
            cropName: 'Updated Crop'
        });

        expect(result.cropName).toBe('Updated Crop');
    });

    test('updateListing → returns null if not owner', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await listingModule.updateListing(1, 99, {});

        expect(result).toBeNull();
    });

    // ────────────────────────────────
    // DELETE LISTING
    // ────────────────────────────────

    test('deleteListing → returns true if deleted', async () => {
        db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        const result = await listingModule.deleteListing(1, 10);

        expect(result).toBe(true);
    });

    test('deleteListing → returns false if not found', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await listingModule.deleteListing(1, 10);

        expect(result).toBe(false);
    });

});