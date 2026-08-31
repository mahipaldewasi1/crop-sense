const express = require("express");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createScan,
  getHistory,
  startFollowUp,
  getFollowUps,
  getFollowUp,
} = require("../controllers/scanController");

const router = express.Router();

// Create a new crop scan
router.post(
  "/",
  protect,
  upload.single("image"),
  createScan
);

// Scan history
router.get(
  "/history",
  protect,
  getHistory
);

// Start follow-up monitoring
router.post(
  "/:scanId/follow-up",
  protect,
  startFollowUp
);

// Get all follow-ups
router.get(
  "/follow-ups",
  protect,
  getFollowUps
);

// Get one follow-up
router.get(
  "/follow-ups/:id",
  protect,
  getFollowUp
);

module.exports = router;