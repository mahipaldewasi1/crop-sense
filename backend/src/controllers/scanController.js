const fs = require("fs");
const Scan = require("../models/Scan");
const { detectDiseaseClass, translateProfile } = require("../services/aiService");


async function createScan(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required (field name: image)" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const crop = (req.body.crop || "tomato").trim().toLowerCase();
    console.log("========== SCAN DEBUG ==========");
console.log("req.body:", req.body);
console.log("Selected crop:", crop);
console.log("File:", req.file?.originalname);
console.log("================================");

const prediction = await detectDiseaseClass(
  imageBuffer,
  req.file.mimetype,
  crop
);
console.log("========== ML RESPONSE ==========");
console.log("ML returned crop:", prediction.crop);
console.log("ML returned label:", prediction.modelLabel);
console.log("ML confidence:", prediction.confidence);
console.log("Mapped classKey:", prediction.classKey);
console.log("================================");
if (prediction.confidence < 40) {
  return res.status(200).json({
    scan: null,
    uncertain: true,
    message:
      "The AI could not confidently identify the disease. Please capture a clear close-up of the affected leaf or consult an expert.",
    crop: prediction.crop,
    disease: prediction.modelLabel,
    confidence: prediction.confidence,
    topPredictions: prediction.topPredictions,
  });
}
if (!prediction.classKey) {
  return res.status(422).json({
    message: "The detected disease is not currently supported by CropSense.",
    modelLabel: prediction.modelLabel,
    confidence: prediction.confidence,
  });
}

const classKey = prediction.classKey;
const lang = req.body.lang || "en";

const translated = translateProfile(
  classKey,
  lang,
  prediction.confidence
);

const englishFallback = translateProfile(
  classKey,
  "en",
  prediction.confidence
);

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
  ipm: translated.ipm,
});

    // Respond with the requested-language version, not the English fallback we saved
    const scanObj = scan.toObject();
    res.status(201).json({
  scan: {
    ...scanObj,
    crop: translated.crop,
    disease: translated.disease,
    recommendation: translated.recommendation,
    ipm: translated.ipm,
  },
});
  } catch (err) {
  console.error("========== SCAN ERROR ==========");
  console.error(err);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("================================");

  res.status(500).json({
    message: "Scan failed",
    error: err.message,
  });
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
      return {
  ...scanObj,
  crop: translated.crop,
  disease: translated.disease,
  recommendation: translated.recommendation,
  ipm: translated.ipm,
};
    });

    res.json({ scans: localized });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch history", error: err.message });
  }
}

module.exports = { createScan, getHistory };
