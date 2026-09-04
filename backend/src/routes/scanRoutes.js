const express = require("express");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createScan,
  getHistory,
  startFollowUp,
  getFollowUps,
  getFollowUp,
  uploadFollowUpScan,
} = require("../controllers/scanController");

const router = express.Router();

// --------------------------------------------------
// Create a new crop scan
// POST /api/scan
// --------------------------------------------------

router.post(
  "/",
  protect,
  upload.single("image"),
  createScan
);

// --------------------------------------------------
// Scan history
// GET /api/scan/history
// --------------------------------------------------

router.get(
  "/history",
  protect,
  getHistory
);

// --------------------------------------------------
// Start follow-up monitoring
// POST /api/scan/:scanId/follow-up
// --------------------------------------------------

router.post(
  "/:scanId/follow-up",
  protect,
  startFollowUp
);

// --------------------------------------------------
// Get all follow-ups
// GET /api/scan/follow-ups
// --------------------------------------------------

router.get(
  "/follow-ups",
  protect,
  getFollowUps
);

// --------------------------------------------------
// Get one follow-up
// GET /api/scan/follow-ups/:id
// --------------------------------------------------

router.get(
  "/follow-ups/:id",
  protect,
  getFollowUp
);

// --------------------------------------------------
// Upload a new follow-up scan
// POST /api/scan/:scanId/follow-up/scan
// --------------------------------------------------

router.post(
  "/:scanId/follow-up/scan",
  protect,
  upload.single("image"),
  uploadFollowUpScan
);

module.exports = router;