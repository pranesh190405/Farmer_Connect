const db = require('../config/db');

/**
 * Place a bid on a listing
 * Validates: bidding is enabled, within time window, amount meets minimum increment
 */
async function placeBid(listingId, buyerId, amount) {
    // 1. Get the listing
    const listingResult = await db.query(
        `SELECT id, farmer_id, expected_price, bidding_enabled, bidding_end_time, unit, status
         FROM listings WHERE id = $1`,
        [listingId]
    );

    if (listingResult.rows.length === 0) {
        throw Object.assign(new Error('Listing not found'), { statusCode: 404 });
    }

    const listing = listingResult.rows[0];

    // 2. Validate bidding is enabled
    if (!listing.bidding_enabled) {
        throw Object.assign(new Error('Bidding is not enabled for this listing'), { statusCode: 400 });
    }

    // 3. Validate listing is active
    if (listing.status !== 'active') {
        throw Object.assign(new Error('This listing is no longer active'), { statusCode: 400 });
    }

    // 4. Validate within bidding window
    const now = new Date();
    const endTime = new Date(listing.bidding_end_time);
    if (now >= endTime) {
        throw Object.assign(new Error('Bidding has ended for this listing'), { statusCode: 400 });
    }

    // 5. Prevent farmer from bidding on their own listing
    if (listing.farmer_id === buyerId) {
        throw Object.assign(new Error('You cannot bid on your own listing'), { statusCode: 400 });
    }

    // 6. Get current highest bid
    const highestBidResult = await db.query(
        `SELECT MAX(amount) AS highest FROM bids WHERE listing_id = $1`,
        [listingId]
    );

    const expectedPrice = parseFloat(listing.expected_price);
    const minIncrement = expectedPrice * 0.05; // 5% of expected price per unit
    const currentHighest = highestBidResult.rows[0].highest
        ? parseFloat(highestBidResult.rows[0].highest)
        : null;

    // 7. Validate bid amount
    if (currentHighest === null) {
        // First bid — must be >= expected price
        if (amount < expectedPrice) {
            throw Object.assign(
                new Error(`First bid must be at least ₹${expectedPrice.toFixed(2)} (the listing price)`),
                { statusCode: 400 }
            );
        }
    } else {
        // Subsequent bid — must be >= currentHighest + 5% of expected_price
        const minimumBid = currentHighest + minIncrement;
        if (amount < minimumBid) {
            throw Object.assign(
                new Error(`Bid must be at least ₹${minimumBid.toFixed(2)} (current highest ₹${currentHighest.toFixed(2)} + 5% increment of ₹${minIncrement.toFixed(2)})`),
                { statusCode: 400 }
            );
        }
    }

    // 8. Insert the bid
    const bidResult = await db.query(
        `INSERT INTO bids (listing_id, buyer_id, amount)
         VALUES ($1, $2, $3) RETURNING *`,
        [listingId, buyerId, amount]
    );

    return formatBid(bidResult.rows[0]);
}

/**
 * Get all bids for a listing with listing details and bidding status
 */
async function getBidsForListing(listingId) {
    // Get listing info
    const listingResult = await db.query(
        `SELECT l.*, u.name AS farmer_name
         FROM listings l
         JOIN users u ON l.farmer_id = u.id
         WHERE l.id = $1`,
        [listingId]
    );

    if (listingResult.rows.length === 0) {
        throw Object.assign(new Error('Listing not found'), { statusCode: 404 });
    }

    const listing = listingResult.rows[0];

    // Get all bids, most recent first
    const bidsResult = await db.query(
        `SELECT b.*, u.name AS buyer_name
         FROM bids b
         JOIN users u ON b.buyer_id = u.id
         WHERE b.listing_id = $1
         ORDER BY b.amount DESC, b.created_at ASC`,
        [listingId]
    );

    const now = new Date();
    const endTime = listing.bidding_end_time ? new Date(listing.bidding_end_time) : null;
    const isActive = listing.bidding_enabled && endTime && now < endTime && listing.status === 'active';
    const isEnded = listing.bidding_enabled && endTime && now >= endTime;

    // Determine winner if bidding has ended
    let winner = null;
    if (isEnded && bidsResult.rows.length > 0) {
        const topBid = bidsResult.rows[0]; // Already sorted by amount DESC
        winner = {
            buyerId: topBid.buyer_id,
            buyerName: topBid.buyer_name,
            amount: parseFloat(topBid.amount),
        };
    }

    return {
        listing: {
            id: listing.id,
            cropName: listing.crop_name,
            category: listing.category,
            variety: listing.variety,
            quantity: parseFloat(listing.quantity),
            unit: listing.unit,
            expectedPrice: parseFloat(listing.expected_price),
            qualityGrade: listing.quality_grade,
            description: listing.description,
            imageUrl: listing.image_url,
            location: listing.location_address,
            farmerName: listing.farmer_name,
            isOrganic: listing.is_organic,
            harvestDate: listing.harvest_date,
            status: listing.status,
        },
        bidding: {
            enabled: listing.bidding_enabled,
            endTime: listing.bidding_end_time,
            isActive,
            isEnded,
            timeRemainingMs: isActive ? endTime - now : 0,
            totalBids: bidsResult.rows.length,
            highestBid: bidsResult.rows.length > 0 ? parseFloat(bidsResult.rows[0].amount) : null,
            minIncrement: parseFloat(listing.expected_price) * 0.05,
            winner,
        },
        bids: bidsResult.rows.map(formatBidWithBuyer),
    };
}

/**
 * Get all bids placed by a buyer
 */
async function getMyBids(buyerId) {
    const result = await db.query(
        `SELECT b.*, l.crop_name, l.expected_price, l.unit, l.bidding_end_time,
                l.image_url, l.status AS listing_status, l.bidding_enabled,
                u.name AS farmer_name
         FROM bids b
         JOIN listings l ON b.listing_id = l.id
         JOIN users u ON l.farmer_id = u.id
         WHERE b.buyer_id = $1
         ORDER BY b.created_at DESC`,
        [buyerId]
    );

    return result.rows.map(row => ({
        id: row.id,
        listingId: row.listing_id,
        amount: parseFloat(row.amount),
        cropName: row.crop_name,
        expectedPrice: parseFloat(row.expected_price),
        unit: row.unit,
        imageUrl: row.image_url,
        farmerName: row.farmer_name,
        biddingEndTime: row.bidding_end_time,
        listingStatus: row.listing_status,
        createdAt: row.created_at,
    }));
}

// ─── Formatters ──────────────────────────────────────────────

function formatBid(row) {
    return {
        id: row.id,
        listingId: row.listing_id,
        buyerId: row.buyer_id,
        amount: parseFloat(row.amount),
        createdAt: row.created_at,
    };
}

function formatBidWithBuyer(row) {
    return {
        ...formatBid(row),
        buyerName: row.buyer_name,
    };
}

module.exports = {
    placeBid,
    getBidsForListing,
    getMyBids,
};
