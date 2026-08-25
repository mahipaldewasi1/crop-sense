const fs = require("fs");
const Scan = require("../models/Scan");
const { detectDisease } = require("../services/aiService");

// POST /api/scan  (protected, multipart/form-data with field "image")
async function createScan(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required (field name: image)" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const result = detectDisease(imageBuffer); // { crop, disease, severity, severityPercent, confidence, recommendation }

    const scan = await Scan.create({
      user: req.userId,
      imageUrl: `/uploads/${req.file.filename}`,
      ...result,
    });

    res.status(201).json({ scan });
  } catch (err) {
    res.status(500).json({ message: "Scan failed", error: err.message });
  }
}

// GET /api/scan/history  (protected) - Home screen ke "recent scans" ke liye
async function getHistory(req, res) {
  try {
    const scans = await Scan.find({ user: req.userId }).sort({ createdAt: -1 }).limit(10);
    res.json({ scans });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch history", error: err.message });
  }
}

module.exports = { createScan, getHistory };
