const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// All admin routes require auth + admin role
router.get('/users', requireAuth, requireAdmin, adminController.getAllUsers);
router.get('/users/:id/verification', requireAuth, requireAdmin, adminController.getUserVerification);
router.put('/users/:id/approve', requireAuth, requireAdmin, adminController.approveUser);
router.put('/users/:id/reject', requireAuth, requireAdmin, adminController.rejectUser);
router.get('/stats', requireAuth, requireAdmin, adminController.getStats);

module.exports = router;
