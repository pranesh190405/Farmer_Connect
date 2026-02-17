const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { requireAuth, requireFarmer, isApproved } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { check } = require('express-validator');

// Validation rules
const createListingValidation = [
    check('cropName').notEmpty().withMessage('Crop name is required'),
    check('quantity').isFloat({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    check('unit').notEmpty().withMessage('Unit is required'),
    check('expectedPrice').isFloat({ gt: 0 }).withMessage('Expected price must be greater than 0'),
];

const updateListingValidation = [
    check('quantity').optional().isFloat({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    check('expectedPrice').optional().isFloat({ gt: 0 }).withMessage('Expected price must be greater than 0'),
];

// GET all listings (any authenticated user)
router.get('/', requireAuth, listingController.getListings);

// GET farmer's own listings
router.get('/my', requireAuth, requireFarmer, listingController.getMyListings);

// GET single listing
router.get('/:id', requireAuth, listingController.getListingById);

// POST create listing (farmers only)
router.post('/', requireAuth, requireFarmer, validate(createListingValidation), listingController.createListing);

// PUT update listing (farmers only, owner check in module)
router.put('/:id', requireAuth, requireFarmer, validate(updateListingValidation), listingController.updateListing);

// PUT update listing status (farmers only)
router.put('/:id/status', requireAuth, requireFarmer, listingController.updateStatus);

// DELETE listing (farmers only)
router.delete('/:id', requireAuth, requireFarmer, listingController.deleteListing);

module.exports = router;
