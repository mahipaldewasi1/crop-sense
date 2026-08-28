const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { createScan, getHistory } = require("../controllers/scanController");

const router = express.Router();

router.post("/", protect, upload.single("image"), createScan);
router.get("/history", protect, getHistory);

module.exports = router;
