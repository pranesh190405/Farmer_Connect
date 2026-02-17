const db = require('../config/db');

/**
 * Create a new listing
 */
async function createListing(farmerId, data) {
    const {
        cropName, category, variety, quantity, unit,
        expectedPrice, qualityGrade, description, imageUrl,
        locationAddress, locationLat, locationLng,
        isOrganic, harvestDate, minQty
    } = data;

    const result = await db.query(
        `INSERT INTO listings (
            farmer_id, crop_name, category, variety, quantity, unit,
            expected_price, quality_grade, description, image_url,
            location_address, location_lat, location_lng,
            is_organic, harvest_date, min_qty, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'active')
        RETURNING *`,
        [
            farmerId, cropName, category || 'vegetables', variety || '',
            quantity, unit || 'kg', expectedPrice, qualityGrade || 'B',
            description || '', imageUrl || '',
            locationAddress || '', locationLat || null, locationLng || null,
            isOrganic || false, harvestDate || null, minQty || 1
        ]
    );

    return formatListing(result.rows[0]);
}

/**
 * Get all listings with optional filters
 */
async function getListings(filters = {}) {
    const { search, category, region, status, limit, offset } = filters;

    let query = `
        SELECT l.*, u.name AS farmer_name, u.mobile AS farmer_mobile
        FROM listings l
        JOIN users u ON l.farmer_id = u.id
        WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (status) {
        query += ` AND l.status = $${paramIndex++}`;
        params.push(status);
    } else {
        // Default: show active listings for market
        query += ` AND l.status = 'active'`;
    }

    if (search) {
        query += ` AND (l.crop_name ILIKE $${paramIndex} OR u.name ILIKE $${paramIndex})`;
        params.push(`%${search}%`);
        paramIndex++;
    }

    if (category && category !== 'all') {
        query += ` AND l.category = $${paramIndex++}`;
        params.push(category);
    }

    if (region && region !== 'all') {
        query += ` AND l.location_address ILIKE $${paramIndex++}`;
        params.push(`%${region}%`);
    }

    query += ' ORDER BY l.created_at DESC';

    if (limit) {
        query += ` LIMIT $${paramIndex++}`;
        params.push(parseInt(limit));
    }

    if (offset) {
        query += ` OFFSET $${paramIndex++}`;
        params.push(parseInt(offset));
    }

    const result = await db.query(query, params);
    return result.rows.map(row => formatListingWithFarmer(row));
}

/**
 * Get farmer's own listings
 */
async function getMyListings(farmerId) {
    const result = await db.query(
        `SELECT l.*, u.name AS farmer_name
         FROM listings l
         JOIN users u ON l.farmer_id = u.id
         WHERE l.farmer_id = $1
         ORDER BY l.created_at DESC`,
        [farmerId]
    );

    return result.rows.map(row => formatListingWithFarmer(row));
}

/**
 * Get single listing by ID
 */
async function getListingById(id) {
    const result = await db.query(
        `SELECT l.*, u.name AS farmer_name, u.mobile AS farmer_mobile
         FROM listings l
         JOIN users u ON l.farmer_id = u.id
         WHERE l.id = $1`,
        [id]
    );

    if (result.rows.length === 0) return null;
    return formatListingWithFarmer(result.rows[0]);
}

/**
 * Update listing (only by owner)
 */
async function updateListing(id, farmerId, data) {
    const {
        cropName, category, variety, quantity, unit,
        expectedPrice, qualityGrade, description, imageUrl,
        locationAddress, locationLat, locationLng,
        isOrganic, harvestDate, minQty
    } = data;

    const result = await db.query(
        `UPDATE listings SET
            crop_name = COALESCE($1, crop_name),
            category = COALESCE($2, category),
            variety = COALESCE($3, variety),
            quantity = COALESCE($4, quantity),
            unit = COALESCE($5, unit),
            expected_price = COALESCE($6, expected_price),
            quality_grade = COALESCE($7, quality_grade),
            description = COALESCE($8, description),
            image_url = COALESCE($9, image_url),
            location_address = COALESCE($10, location_address),
            location_lat = COALESCE($11, location_lat),
            location_lng = COALESCE($12, location_lng),
            is_organic = COALESCE($13, is_organic),
            harvest_date = COALESCE($14, harvest_date),
            min_qty = COALESCE($15, min_qty),
            updated_at = NOW()
         WHERE id = $16 AND farmer_id = $17
         RETURNING *`,
        [
            cropName, category, variety, quantity, unit,
            expectedPrice, qualityGrade, description, imageUrl,
            locationAddress, locationLat, locationLng,
            isOrganic, harvestDate, minQty,
            id, farmerId
        ]
    );

    if (result.rows.length === 0) return null;
    return formatListing(result.rows[0]);
}

/**
 * Update listing status
 */
async function updateStatus(id, farmerId, status) {
    const result = await db.query(
        `UPDATE listings SET status = $1, updated_at = NOW()
         WHERE id = $2 AND farmer_id = $3
         RETURNING *`,
        [status, id, farmerId]
    );

    if (result.rows.length === 0) return null;
    return formatListing(result.rows[0]);
}

/**
 * Delete listing (only by owner)
 */
async function deleteListing(id, farmerId) {
    const result = await db.query(
        'DELETE FROM listings WHERE id = $1 AND farmer_id = $2 RETURNING id',
        [id, farmerId]
    );

    return result.rows.length > 0;
}

/**
 * Format listing for API response
 */
function formatListing(row) {
    return {
        id: row.id,
        farmerId: row.farmer_id,
        cropName: row.crop_name,
        name: row.crop_name, // alias for frontend compatibility
        crop: row.crop_name, // alias for frontend compatibility
        category: row.category,
        variety: row.variety,
        quantity: `${row.quantity} ${row.unit}`,
        quantityValue: parseFloat(row.quantity),
        unit: row.unit,
        price: `₹${row.expected_price}/${row.unit}`,
        priceValue: parseFloat(row.expected_price),
        expectedPrice: parseFloat(row.expected_price),
        qualityGrade: row.quality_grade,
        description: row.description,
        image: row.image_url,
        imageUrl: row.image_url,
        location: row.location_address,
        locationAddress: row.location_address,
        locationLat: row.location_lat,
        locationLng: row.location_lng,
        status: row.status,
        isOrganic: row.is_organic,
        harvestDate: row.harvest_date,
        minQty: `${row.min_qty} ${row.unit}`,
        minQtyValue: parseFloat(row.min_qty),
        rating: parseFloat(row.rating),
        date: new Date(row.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

/**
 * Format listing with farmer info
 */
function formatListingWithFarmer(row) {
    const listing = formatListing(row);
    listing.farmer = row.farmer_name || '';
    listing.farmerMobile = row.farmer_mobile || '';
    return listing;
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
