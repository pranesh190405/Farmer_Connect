// Import listing business logic module
const listingModule = require('../modules/listingModule');

/**
 * POST /api/listings
 * Create a new listing (authenticated user)
 */
async function createListing(req, res) {
    try {
        // req.user.id comes from authentication middleware (JWT)
        const listing = await listingModule.createListing(req.user.id, req.body);

        res.status(201).json({ listing }); // Created
    } catch (err) {
        console.error('createListing error:', err);
        res.status(500).json({ error: 'Failed to create listing' });
    }
}

/**
 * GET /api/listings
 * Query params: search, category, region, status, limit, offset
 */
async function getListings(req, res) {
    try {
        // Pass query filters directly to module
        const listings = await listingModule.getListings(req.query);

        res.json({ listings });
    } catch (err) {
        console.error('getListings error:', err);
        res.status(500).json({ error: 'Failed to get listings' });
    }
}

/**
 * GET /api/listings/my
 * Get listings created by logged-in user
 */
async function getMyListings(req, res) {
    try {
        const listings = await listingModule.getMyListings(req.user.id);

        res.json({ listings });
    } catch (err) {
        console.error('getMyListings error:', err);
        res.status(500).json({ error: 'Failed to get listings' });
    }
}

/**
 * GET /api/listings/:id
 * Get single listing by ID
 */
async function getListingById(req, res) {
    try {
        const listing = await listingModule.getListingById(req.params.id);

        // If listing doesn't exist
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        res.json({ listing });
    } catch (err) {
        console.error('getListingById error:', err);
        res.status(500).json({ error: 'Failed to get listing' });
    }
}

/**
 * PUT /api/listings/:id
 * Update listing (only owner allowed)
 */
async function updateListing(req, res) {
    try {
        // Module should verify ownership using userId
        const listing = await listingModule.updateListing(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found or not authorized' });
        }

        res.json({ listing });
    } catch (err) {
        console.error('updateListing error:', err);
        res.status(500).json({ error: 'Failed to update listing' });
    }
}

/**
 * PUT /api/listings/:id/status
 * Update listing status (e.g., active, sold, closed)
 */
async function updateStatus(req, res) {
    try {
        const { status } = req.body;

        // Status must be provided
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const listing = await listingModule.updateStatus(
            req.params.id,
            req.user.id,
            status
        );

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found or not authorized' });
        }

        res.json({ listing });
    } catch (err) {
        console.error('updateStatus error:', err);
        res.status(500).json({ error: 'Failed to update listing status' });
    }
}

/**
 * DELETE /api/listings/:id
 * Delete listing (only owner allowed)
 */
async function deleteListing(req, res) {
    try {
        const deleted = await listingModule.deleteListing(
            req.params.id,
            req.user.id
        );

        if (!deleted) {
            return res.status(404).json({ error: 'Listing not found or not authorized' });
        }

        res.json({ message: 'Listing deleted successfully' });
    } catch (err) {
        console.error('deleteListing error:', err);
        res.status(500).json({ error: 'Failed to delete listing' });
    }
}

// Export controller functions
module.exports = {
    createListing,
    getListings,
    getMyListings,
    getListingById,
    updateListing,
    updateStatus,
    deleteListing,
};
