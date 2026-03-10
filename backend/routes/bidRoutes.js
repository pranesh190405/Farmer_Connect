const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const { requireAuth, requireBuyer } = require('../middleware/auth');

// GET bids for a listing (any authenticated user can view)
router.get('/listing/:listingId', requireAuth, bidController.getBidsForListing);

// POST place a bid (buyers only)
router.post('/listing/:listingId', requireAuth, requireBuyer, bidController.placeBid);

// GET my bids (buyers only)
router.get('/my', requireAuth, requireBuyer, bidController.getMyBids);

module.exports = router;
