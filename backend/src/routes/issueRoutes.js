const express = require('express');
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssue,
  updateIssueStatus,
  deleteIssue,
  getNearbyIssues,
  getIssueStats
} = require('../controllers/issueController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Admin only routes (must be before /:id to avoid conflicts)
router.get('/admin/stats', protect, admin, asyncHandler(getIssueStats));
router.get('/nearby/:longitude/:latitude/:distance', protect, asyncHandler(getNearbyIssues));
router.put('/:id/status', protect, admin, asyncHandler(updateIssueStatus));

// Public routes (require authentication)
router.post('/', protect, upload.single('image'), asyncHandler(createIssue));
router.get('/', protect, asyncHandler(getIssues));

// Dynamic routes (must be last)
router.get('/:id', protect, asyncHandler(getIssue));
router.delete('/:id', protect, asyncHandler(deleteIssue));

module.exports = router;
