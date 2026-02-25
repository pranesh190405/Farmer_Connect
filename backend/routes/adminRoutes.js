const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// All admin routes require auth + admin role
router.get('/users', requireAuth, requireAdmin, adminController.getAllUsers);
router.get('/users/:id/verification', requireAuth, requireAdmin, adminController.getUserVerification);
router.put('/users/:id/approve', requireAuth, requireAdmin, adminController.approveUser);
router.put('/users/:id/reject', requireAuth, requireAdmin, adminController.rejectUser);
// Stats and Complaints
router.get('/stats', requireAuth, requireAdmin, adminController.getStats);
router.get('/complaints', requireAuth, requireAdmin, adminController.getComplaints);
router.put('/complaints/:id/resolve', requireAuth, requireAdmin, adminController.resolveComplaint);

module.exports = router;
