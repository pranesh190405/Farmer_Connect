const userModule = require('../modules/userModule');
const path = require('path');

/**
 * GET /api/users/profile
 * Get logged-in user's profile
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
 * Update logged-in user's profile details
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
 * POST /api/users/upload-document
 * Upload Aadhar photo (farmer) or GST certificate (buyer)
 */
async function uploadDocument(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const documentUrl = `/uploads/${req.file.filename}`;
        const documentType = req.body.documentType || 'aadhar_photo';

        const result = await userModule.uploadDocument(req.user.id, documentUrl, documentType);

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Document uploaded successfully',
            documentUrl: result.document_url,
            trustScore: result.trust_score,
        });
    } catch (err) {
        console.error('uploadDocument error:', err);
        res.status(500).json({ error: 'Failed to upload document' });
    }
}

/**
 * POST /api/users/upload-photo
 * Upload profile photo
 */
async function uploadProfilePhoto(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const photoUrl = `/uploads/${req.file.filename}`;
        const result = await userModule.uploadProfilePhoto(req.user.id, photoUrl);

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Photo uploaded successfully',
            profilePhotoUrl: result.profile_photo_url,
            trustScore: result.trust_score,
        });
    } catch (err) {
        console.error('uploadProfilePhoto error:', err);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
}

/**
 * PUT /api/users/location
 * Update user's location details
 */
async function updateLocation(req, res) {
    try {
        const result = await userModule.updateLocation(req.user.id, req.body);

        res.json({
            message: 'Location updated successfully',
            location: result,
        });
    } catch (err) {
        console.error('updateLocation error:', err);
        res.status(500).json({ error: 'Failed to update location' });
    }
}

/**
 * PUT /api/users/preferences
 * Update user preferences
 */
async function updatePreferences(req, res) {
    try {
        const result = await userModule.updatePreferences(req.user.id, req.body);

        res.json({
            message: 'Preferences updated successfully',
            preferences: result,
        });
    } catch (err) {
        console.error('updatePreferences error:', err);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    uploadDocument,
    uploadProfilePhoto,
    updateLocation,
    updatePreferences,
};
