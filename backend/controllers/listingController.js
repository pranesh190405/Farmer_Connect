const listingModule = require('../modules/listingModule');

/**
 * POST /api/listings
 */
async function createListing(req, res) {
    try {
        const listing = await listingModule.createListing(req.user.id, req.body);
        res.status(201).json({ listing });
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
        const listings = await listingModule.getListings(req.query);
        res.json({ listings });
    } catch (err) {
        console.error('getListings error:', err);
        res.status(500).json({ error: 'Failed to get listings' });
    }
}

/**
 * GET /api/listings/my
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
 */
async function getListingById(req, res) {
    try {
        const listing = await listingModule.getListingById(req.params.id);

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
 */
async function updateListing(req, res) {
    try {
        const listing = await listingModule.updateListing(req.params.id, req.user.id, req.body);

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
 */
async function updateStatus(req, res) {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const listing = await listingModule.updateStatus(req.params.id, req.user.id, status);

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
 */
async function deleteListing(req, res) {
    try {
        const deleted = await listingModule.deleteListing(req.params.id, req.user.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Listing not found or not authorized' });
        }

        res.json({ message: 'Listing deleted successfully' });
    } catch (err) {
        console.error('deleteListing error:', err);
        res.status(500).json({ error: 'Failed to delete listing' });
    }
}

module.exports = {
    createListing,
    getListings,
    getMyListings,
    getListingById,
    updateListing,
    updateStatus,
    deleteListing,
};
