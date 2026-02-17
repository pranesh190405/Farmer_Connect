const db = require('../config/db');

/**
 * Get full user profile including location and preferences
 */
async function getProfile(userId) {
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) return null;

    const user = userResult.rows[0];

    // Get location
    const locResult = await db.query('SELECT * FROM user_locations WHERE user_id = $1', [userId]);
    const location = locResult.rows[0] || {};

    // Get preferences
    const prefResult = await db.query('SELECT * FROM user_preferences WHERE user_id = $1', [userId]);
    const preferences = prefResult.rows[0] || {};

    return {
        id: user.id,
        mobile: user.mobile,
        name: user.name,
        type: user.type,
        status: user.status,
        aadharNumber: user.aadhar_number,
        aadharVerified: user.aadhar_verified,
        dateOfBirth: user.date_of_birth,
        address: user.address,
        location: {
            state: location.state || '',
            district: location.district || '',
            lat: location.lat || null,
            lng: location.lng || null,
        },
        preferences: {
            cropInterests: preferences.crop_interests || [],
            smsAlerts: preferences.sms_alerts !== undefined ? preferences.sms_alerts : true,
            priceAlerts: preferences.price_alerts !== undefined ? preferences.price_alerts : true,
            profilePublic: preferences.profile_public !== undefined ? preferences.profile_public : true,
            showLocation: preferences.show_location !== undefined ? preferences.show_location : true,
            showContact: preferences.show_contact !== undefined ? preferences.show_contact : false,
        },
        createdAt: user.created_at,
    };
}

/**
 * Update user profile (name, address, etc.)
 */
async function updateProfile(userId, data) {
    const { name, address } = data;

    const result = await db.query(
        `UPDATE users SET 
            name = COALESCE($1, name),
            address = COALESCE($2, address),
            updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
        [name, address, userId]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0];
}

/**
 * Update user location
 */
async function updateLocation(userId, { state, district, lat, lng }) {
    const result = await db.query(
        `INSERT INTO user_locations (user_id, state, district, lat, lng, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
            state = COALESCE($2, user_locations.state),
            district = COALESCE($3, user_locations.district),
            lat = COALESCE($4, user_locations.lat),
            lng = COALESCE($5, user_locations.lng),
            updated_at = NOW()
         RETURNING *`,
        [userId, state || '', district || '', lat || null, lng || null]
    );

    return result.rows[0];
}

/**
 * Update user preferences
 */
async function updatePreferences(userId, { cropInterests, smsAlerts, priceAlerts, profilePublic, showLocation, showContact }) {
    const result = await db.query(
        `INSERT INTO user_preferences (user_id, crop_interests, sms_alerts, price_alerts, profile_public, show_location, show_contact, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
            crop_interests = COALESCE($2, user_preferences.crop_interests),
            sms_alerts = COALESCE($3, user_preferences.sms_alerts),
            price_alerts = COALESCE($4, user_preferences.price_alerts),
            profile_public = COALESCE($5, user_preferences.profile_public),
            show_location = COALESCE($6, user_preferences.show_location),
            show_contact = COALESCE($7, user_preferences.show_contact),
            updated_at = NOW()
         RETURNING *`,
        [userId, cropInterests || [], smsAlerts, priceAlerts, profilePublic, showLocation, showContact]
    );

    return result.rows[0];
}

module.exports = {
    getProfile,
    updateProfile,
    updateLocation,
    updatePreferences,
};
