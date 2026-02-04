const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.location = req.body.location || user.location;
            user.cropInterests = req.body.cropInterests || user.cropInterests;
            user.buyingPreferences = req.body.buyingPreferences || user.buyingPreferences;

            if (req.body.role) {
                user.role = req.body.role;
            }

            await user.save();

            res.json({
                success: true,
                user: {
                    id: user.id,
                    phone: user.phone,
                    name: user.name,
                    role: user.role,
                    location: user.location,
                    cropInterests: user.cropInterests,
                    buyingPreferences: user.buyingPreferences,
                    documents: user.documents,
                    isVerified: user.isVerified
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/users/upload-documents
// @desc    Upload documents for verification
// @access  Private
router.post('/upload-documents', protect, async (req, res) => {
    try {
        const { documents } = req.body;

        if (!documents || !Array.isArray(documents)) {
            return res.status(400).json({ message: 'Documents array is required' });
        }

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Append new documents to existing ones
        const existingDocs = user.documents || [];
        user.documents = [...existingDocs, ...documents];

        // Keep isVerified = false - admin will verify later
        // user.isVerified remains unchanged (false for new users)

        await user.save();

        res.json({
            success: true,
            message: 'Documents uploaded successfully',
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                role: user.role,
                documents: user.documents,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('Upload Documents Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
