const userModule = require('../modules/userModule');

/**
 * GET /api/users/profile
 */
async function getProfile(req, res) {
    try {
        const profile = await userModule.getProfile(req.user.id);

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
 */
async function updateProfile(req, res) {
    try {
        const result = await userModule.updateProfile(req.user.id, req.body);

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
 */
async function updateLocation(req, res) {
    try {
        const result = await userModule.updateLocation(req.user.id, req.body);
        res.json({ message: 'Location updated successfully', location: result });
    } catch (err) {
        console.error('updateLocation error:', err);
        res.status(500).json({ error: 'Failed to update location' });
    }
}

/**
 * PUT /api/users/preferences
 */
async function updatePreferences(req, res) {
    try {
        const result = await userModule.updatePreferences(req.user.id, req.body);
        res.json({ message: 'Preferences updated successfully', preferences: result });
    } catch (err) {
        console.error('updatePreferences error:', err);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    updateLocation,
    updatePreferences,
};
