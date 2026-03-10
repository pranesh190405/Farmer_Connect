const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Farmer Connect API',
            version: '1.0.0',
            description:
                'RESTful API for Farmer Connect — a digital agricultural marketplace connecting farmers directly with buyers. ' +
                'Features include user registration with trust-score verification, crop listings with bidding, ' +
                'order management, admin dashboard, and multilingual voice navigation.',
            contact: {
                name: 'Farmer Connect Team',
            },
            license: {
                name: 'MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:5001',
                description: 'Local development server',
            },
            {
                url: 'https://farmer-connect-omega.vercel.app',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'auth_token',
                    description: 'JWT token set as an HTTP-only cookie after login',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Something went wrong' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        mobile: { type: 'string', example: '9876543210' },
                        name: { type: 'string', example: 'Ravi Kumar' },
                        type: { type: 'string', enum: ['farmer', 'buyer'], example: 'farmer' },
                        status: { type: 'string', enum: ['pending', 'approved', 'rejected'], example: 'approved' },
                        trust_score: { type: 'integer', example: 75 },
                        profile_photo_url: { type: 'string', nullable: true },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Listing: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        farmer_id: { type: 'integer', example: 1 },
                        crop_name: { type: 'string', example: 'Tomato' },
                        quantity: { type: 'number', example: 100 },
                        unit: { type: 'string', example: 'kg' },
                        expected_price: { type: 'number', example: 25.5 },
                        status: { type: 'string', enum: ['active', 'sold', 'closed'], example: 'active' },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Order: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        buyer_id: { type: 'integer', example: 2 },
                        status: { type: 'string', enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'] },
                        delivery_address: { type: 'string', example: '123 Farm Road, Karnataka' },
                        total_amount: { type: 'number', example: 2500 },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Bid: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        listing_id: { type: 'integer', example: 5 },
                        buyer_id: { type: 'integer', example: 3 },
                        amount: { type: 'number', example: 30.0 },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Complaint: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        order_id: { type: 'integer', example: 10 },
                        user_id: { type: 'integer', example: 2 },
                        issue_type: { type: 'string', example: 'quality' },
                        description: { type: 'string', example: 'Produce was damaged on arrival' },
                        status: { type: 'string', enum: ['OPEN', 'RESOLVED'], example: 'OPEN' },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        tags: [
            { name: 'Auth', description: 'Authentication & registration endpoints' },
            { name: 'Users', description: 'User profile & preferences management' },
            { name: 'Listings', description: 'Crop listing CRUD operations' },
            { name: 'Orders', description: 'Order placement & tracking' },
            { name: 'Bids', description: 'Bidding on crop listings' },
            { name: 'Admin', description: 'Admin dashboard & user management' },
            { name: 'Voice', description: 'Multilingual voice command processing' },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
