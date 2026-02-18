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
 * Crop-specific image fallbacks (Unsplash)
 */
const CROP_IMAGES = {
    wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400&h=400',
    rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=400',
    tomato: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?auto=format&fit=crop&q=80&w=400&h=400',
    onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400&h=400',
    potato: 'https://images.unsplash.com/photo-1518977676601-b53f82ber633?auto=format&fit=crop&q=80&w=400&h=400',
    maize: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400&h=400',
    corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400&h=400',
    sugarcane: 'https://images.unsplash.com/photo-1599592182395-74a0e8f11100?auto=format&fit=crop&q=80&w=400&h=400',
    cotton: 'https://images.unsplash.com/photo-1616431101997-8375d38e3e4a?auto=format&fit=crop&q=80&w=400&h=400',
    soybean: 'https://images.unsplash.com/photo-1599709877852-a0c6e09b9942?auto=format&fit=crop&q=80&w=400&h=400',
    mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400&h=400',
    apple: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=400&h=400',
    banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400&h=400',
    grapes: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=400&h=400',
    chili: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=400&h=400',
    pepper: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=400&h=400',
    garlic: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2c4e?auto=format&fit=crop&q=80&w=400&h=400',
    ginger: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400',
    turmeric: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400',
    tea: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400&h=400',
    flower: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&q=80&w=400&h=400',
    cauliflower: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=400&h=400',
    cabbage: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=400&h=400',
    carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400&h=400',
    spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400&h=400',
    default: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400&h=400',
};

function getCropImage(cropName) {
    if (!cropName) return CROP_IMAGES.default;
    const name = cropName.toLowerCase();
    for (const [key, url] of Object.entries(CROP_IMAGES)) {
        if (key !== 'default' && name.includes(key)) return url;
    }
    return CROP_IMAGES.default;
}

/**
 * Format listing for API response
 */
function formatListing(row) {
    const imageUrl = row.image_url || getCropImage(row.crop_name);
    return {
        id: row.id,
        farmerId: row.farmer_id,
        cropName: row.crop_name,
        name: row.crop_name,
        crop: row.crop_name,
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
        image: imageUrl,
        imageUrl: imageUrl,
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
