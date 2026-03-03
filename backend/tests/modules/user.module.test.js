process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'testsecret';
jest.mock('../../config/db');
const db = require('../../config/db');

const userModule = require('../../modules/userModule');

describe('User Module Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getProfile → returns formatted user profile', async () => {

        db.query
            // 1️⃣ user query
            .mockResolvedValueOnce({
                rows: [{
                    id: 1,
                    mobile: '9999999999',
                    name: 'Test User',
                    type: 'farmer',
                    trust_score: 20,
                    profile_photo_url: '',
                    document_url: '',
                    document_type: '',
                    admin_notes: ''
                }]
            })
            // 2️⃣ location query
            .mockResolvedValueOnce({
                rows: []
            })
            // 3️⃣ preferences query
            .mockResolvedValueOnce({
                rows: []
            });

        const result = await userModule.getProfile(1);

        expect(result.id).toBe(1);
        expect(result.name).toBe('Test User');
        expect(result.trustScore).toBe(20);
        expect(result.location).toBeDefined();
        expect(result.preferences).toBeDefined();
    });

    test('getProfile → returns null if not found', async () => {

        db.query.mockResolvedValueOnce({ rows: [] });

        const result = await userModule.getProfile(999);

        expect(result).toBeNull();
    });

});