const express = require("express");
const protect = require("../middleware/authMiddleware");
const expertOnly = require("../middleware/expertMiddleware");

const {
  getExpertCases,
  getExpertCase,
  submitExpertReview,
  requestExpertReview,
} = require("../controllers/expertController");

const router = express.Router();

// Expert dashboard
router.get(
  "/cases",
  protect,
  expertOnly,
  getExpertCases
);

// Expert views a single case
router.get(
  "/cases/:scanId",
  protect,
  expertOnly,
  getExpertCase
);

// Farmer requests an expert review
router.post(
  "/cases/:scanId/request-review",
  protect,
  requestExpertReview
);

// Expert submits review
router.post(
  "/cases/:scanId/review",
  protect,
  expertOnly,
  submitExpertReview
);

module.exports = router;