const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const orderRoutes = require('./orderRoutes');
const adminRoutes = require('./adminRoutes');
const voiceRoutes = require('./voiceRoutes');

// Wire all sub-routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);
router.use('/voice', voiceRoutes);

module.exports = router;
