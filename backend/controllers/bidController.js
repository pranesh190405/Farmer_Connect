const bidModule = require('../modules/bidModule');

/**
 * GET /api/bids/listing/:listingId
 * Get bid session + all bids for a listing
 */
async function getBidsForListing(req, res) {
    try {
        const { listingId } = req.params;
        const data = await bidModule.getBidsForListing(parseInt(listingId));
        res.json(data);
    } catch (err) {
        console.error('getBidsForListing error:', err.message);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

/**
 * POST /api/bids/listing/:listingId
 * Place a bid on a listing
 */
async function placeBid(req, res) {
    try {
        const { listingId } = req.params;
        const { amount } = req.body;
        const buyerId = req.user.id;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'A valid bid amount is required' });
        }

        const bid = await bidModule.placeBid(parseInt(listingId), buyerId, parseFloat(amount));
        res.status(201).json({ bid, message: 'Bid placed successfully' });
    } catch (err) {
        console.error('placeBid error:', err.message);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

/**
 * GET /api/bids/my
 * Get all bids placed by the logged-in buyer
 */
async function getMyBids(req, res) {
    try {
        const bids = await bidModule.getMyBids(req.user.id);
        res.json({ bids });
    } catch (err) {
        console.error('getMyBids error:', err.message);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

module.exports = {
    getBidsForListing,
    placeBid,
    getMyBids,
};
