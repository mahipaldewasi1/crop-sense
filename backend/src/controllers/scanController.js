const fs = require("fs");
const Scan = require("../models/Scan");
const { detectDiseaseClass, translateProfile } = require("../services/aiService");

// POST /api/scan  (protected, multipart/form-data with field "image")
async function createScan(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required (field name: image)" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const classKey = detectDiseaseClass(imageBuffer);
    const lang = req.body.lang || "en";
    const translated = translateProfile(classKey, lang); // { crop, disease, severity, severityPercent, confidence, recommendation }
    const englishFallback = translateProfile(classKey, "en"); // stored as crop/disease/recommendation for legacy/schema purposes only

    const scan = await Scan.create({
      user: req.userId,
      imageUrl: `/uploads/${req.file.filename}`,
      classKey,
      crop: englishFallback.crop,
      disease: englishFallback.disease,
      recommendation: englishFallback.recommendation,
      severity: translated.severity,
      severityPercent: translated.severityPercent,
      confidence: translated.confidence,
    });

    // Respond with the requested-language version, not the English fallback we saved
    const scanObj = scan.toObject();
    res.status(201).json({
      scan: { ...scanObj, crop: translated.crop, disease: translated.disease, recommendation: translated.recommendation },
    });
  } catch (err) {
    res.status(500).json({ message: "Scan failed", error: err.message });
  }
}

// GET /api/scan/history?lang=en|hi|mr  (protected) - Home screen ke "recent scans" ke liye
async function getHistory(req, res) {
  try {
    const lang = req.query.lang || "en";
    const scans = await Scan.find({ user: req.userId }).sort({ createdAt: -1 }).limit(10);

    // Re-translate every scan from its classKey, so switching language on the
    // frontend also updates OLD scans in history — not just new ones.
    const localized = scans.map((s) => {
      const scanObj = s.toObject();
      if (!s.classKey) return scanObj; // legacy scan saved before classKey existed — show as originally saved
      const translated = translateProfile(s.classKey, lang);
      if (!translated) return scanObj;
      return { ...scanObj, crop: translated.crop, disease: translated.disease, recommendation: translated.recommendation };
    });

    res.json({ scans: localized });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch history", error: err.message });
  }
}

module.exports = { createScan, getHistory };
