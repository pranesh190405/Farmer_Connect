const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// Validation rules
const updateProfileValidation = [
    check('name').optional().notEmpty().withMessage('Name cannot be empty'),
    check('email').optional().isEmail().withMessage('Invalid email format'),
];

// GET user profile
router.get('/profile', requireAuth, userController.getProfile);

// PUT update user profile
router.put('/profile', requireAuth, validate(updateProfileValidation), userController.updateProfile);

// PUT update user location
router.put('/location', requireAuth, userController.updateLocation);

// PUT update user preferences
router.put('/preferences', requireAuth, userController.updatePreferences);

// GET user stats (dashboard) - TODO: Implement in controller
// router.get('/stats', requireAuth, userController.getStats);

module.exports = router;
