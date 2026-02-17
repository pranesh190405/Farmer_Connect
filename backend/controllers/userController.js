// Import user business logic module
const userModule = require('../modules/userModule');

/**
 * GET /api/users/profile
 * Get logged-in user's profile
 */
async function getProfile(req, res) {
    try {
        // req.user.id comes from JWT authentication middleware
        const profile = await userModule.getProfile(req.user.id);

        // If profile does not exist
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json({ profile });

    } catch (err) {
        console.error('getProfile error:', err);
        res.status(500).json({ error: 'Failed to get profile' });
    }
}

/**
 * PUT /api/users/profile
 * Update logged-in user's profile details
 */
async function updateProfile(req, res) {
    try {
        // Update profile using user ID and request body
        const result = await userModule.updateProfile(
            req.user.id,
            req.body
        );

        // If user does not exist
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully' });

    } catch (err) {
        console.error('updateProfile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}

/**
 * PUT /api/users/location
 * Update user's location details
 */
async function updateLocation(req, res) {
    try {
        // Update location (latitude, longitude, region, etc.)
        const result = await userModule.updateLocation(
            req.user.id,
            req.body
        );

        res.json({
            message: 'Location updated successfully',
            location: result
        });

    } catch (err) {
        console.error('updateLocation error:', err);
        res.status(500).json({ error: 'Failed to update location' });
    }
}

/**
 * PUT /api/users/preferences
 * Update user preferences (filters, categories, etc.)
 */
async function updatePreferences(req, res) {
    try {
        const result = await userModule.updatePreferences(
            req.user.id,
            req.body
        );

        res.json({
            message: 'Preferences updated successfully',
            preferences: result
        });

    } catch (err) {
        console.error('updatePreferences error:', err);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
}

// Export controller functions
module.exports = {
    getProfile,
    updateProfile,
    updateLocation,
    updatePreferences,
};
