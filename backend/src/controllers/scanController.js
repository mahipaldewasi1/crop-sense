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
// --------------------------------------------------
// CROP MISMATCH CHECK
// --------------------------------------------------

if (!prediction.cropMatch) {
  return res.status(200).json({
    scan: null,
    uncertain: true,
    cropMismatch: true,

    message:
      `The uploaded image does not appear to be a ${crop} leaf. ` +
      `Please select the correct crop or upload a clear image of the selected crop.`,

    selectedCrop: crop,
    detectedCrop: prediction.predictedCrop,

    // Do NOT present the wrong-crop disease as a diagnosis
    disease: null,
    confidence: null,

    topPredictions: [],
    overallPredictions: prediction.overallPredictions || [],
  });
}

console.log("========== ML RESPONSE ==========");
console.log("ML returned crop:", prediction.crop);
console.log("ML returned label:", prediction.modelLabel);
console.log("ML confidence:", prediction.confidence);
console.log("Mapped classKey:", prediction.classKey);
console.log("Overall top predictions:");
console.table(prediction.overallPredictions);
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
// POST /api/scan/:scanId/follow-up
// Start follow-up monitoring for an existing scan.
async function startFollowUp(req, res) {
  try {
    const { scanId } = req.params;

    console.log("========== START FOLLOW-UP ==========");
    console.log("scanId received:", scanId);
    console.log("req.userId:", req.userId);
    console.log("Mongo database:", Scan.db.name);
    console.log("Mongo collection:", Scan.collection.name); 
    console.log("=====================================");

    const scan = await Scan.findById(scanId);

    console.log("Scan found by ID:", !!scan);

    if (!scan) {
      return res.status(404).json({
        message: "Scan not found",
      });
    }

    console.log("Scan user:", scan.user?.toString());
    console.log("Request user:", req.userId?.toString());

    // Make sure this scan belongs to the logged-in user
    if (scan.user.toString() !== req.userId.toString()) {
      console.error("USER MISMATCH");
      return res.status(403).json({
        message: "You are not allowed to start follow-up for this scan",
      });
    }

    // Don't allow multiple active follow-ups
    if (
      scan.followUp &&
      scan.followUp.enabled &&
      scan.followUp.status === "pending"
    ) {
      return res.status(400).json({
        message: "Follow-up monitoring is already active",
        followUp: scan.followUp,
      });
    }

    const days = Number(req.body?.days) || 7;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    scan.followUp = {
      enabled: true,
      dueDate,
      status: "pending",
      scans: [],
    };

    await scan.save();

    console.log("FOLLOW-UP SAVED:");
    console.log(scan.followUp);
    console.log("=====================================");

    return res.status(200).json({
      message: "Follow-up monitoring started",
      followUp: scan.followUp,
    });

  } catch (err) {
    console.error("========== FOLLOW-UP START ERROR ==========");
    console.error(err);
    console.error("===========================================");

    return res.status(500).json({
      message: "Could not start follow-up monitoring",
      error: err.message,
    });
  }
}



// GET /api/scan/follow-ups
// Get all follow-ups belonging to the logged-in farmer.
// GET /api/scan/follow-ups
// Get all follow-ups belonging to the logged-in farmer.
async function getFollowUps(req, res) {
  try {
    const scans = await Scan.find({
      user: req.userId,
      "followUp.enabled": true,
    })
      .populate(
        "expertReview.expert",
        "name qualification specialization organization"
      )
      .sort({
        "followUp.dueDate": 1,
      });

    const followUps = scans.map((scan) => {
      const scanObj = scan.toObject();

      return {
        ...scanObj,

        expertReview: {
          status:
            scanObj.expertReview?.status || "not_requested",

          requestedAt:
            scanObj.expertReview?.requestedAt || null,

          expert:
            scanObj.expertReview?.expert || null,

          advice:
            scanObj.expertReview?.advice || "",

          reviewedAt:
            scanObj.expertReview?.reviewedAt || null,
        },
      };
    });

    console.log("========== FOLLOW-UP DATA ==========");

    followUps.forEach((item) => {
      console.log("Scan:", item._id);

      console.log(
        "Expert Review Status:",
        item.expertReview?.status
      );

      console.log(
        "Expert:",
        item.expertReview?.expert
      );

      console.log(
        "Advice:",
        item.expertReview?.advice
      );

      console.log(
        "Requested At:",
        item.expertReview?.requestedAt
      );

      console.log(
        "Reviewed At:",
        item.expertReview?.reviewedAt
      );
    });

    console.log("=====================================");

    return res.json({
      followUps,
    });

  } catch (err) {
    console.error("FOLLOW-UP FETCH ERROR:", err);

    return res.status(500).json({
      message: "Could not fetch follow-ups",
      error: err.message,
    });
  }
}


// GET /api/scan/:scanId/follow-up
// Get one follow-up and calculate its current status.
async function getFollowUp(req, res) {
  try {
    const { scanId } = req.params;

const scan = await Scan.findOne({
  _id: scanId,
  user: req.userId,
}).populate(
  "expertReview.expert",
  "name qualification specialization organization"
);

    if (!scan) {
      return res.status(404).json({
        message: "Scan not found",
      });
    }

    if (!scan.followUp || !scan.followUp.enabled) {
      return res.status(404).json({
        message: "Follow-up monitoring has not been started",
      });
    }

    let comparison = null;

    if (
      scan.followUp.scans &&
      scan.followUp.scans.length > 0
    ) {
      const latest =
        scan.followUp.scans[
          scan.followUp.scans.length - 1
        ];

      const initialSeverity = scan.severityPercent;
      const currentSeverity = latest.severityPercent;

      const change =
        currentSeverity - initialSeverity;

      let status = "stable";

      if (change <= -10) {
        status = "improving";
      } else if (change >= 10) {
        status = "worsening";
      }

      comparison = {
        status,

        change,

        initial: {
          disease: scan.disease,
          classKey: scan.classKey,
          severity: scan.severity,
          severityPercent: initialSeverity,
          confidence: scan.confidence,
          date: scan.createdAt,
        },

        current: {
          disease: latest.disease,
          classKey: latest.classKey,
          severity: latest.severity,
          severityPercent: currentSeverity,
          confidence: latest.confidence,
          date: latest.date,
        },
      };
    }

    res.json({
      followUp: scan.followUp,
      comparison,
    });
  } catch (err) {
    console.error("FOLLOW-UP DETAIL ERROR:", err);

    res.status(500).json({
      message: "Could not fetch follow-up",
      error: err.message,
    });
  }
}
// POST /api/scan/:scanId/follow-up/scan
// Analyze a new photo and save it inside the existing follow-up.

// --------------------------------------------------
// POST /api/scan/:scanId/follow-up/scan
// Upload a new scan for an active follow-up.
// --------------------------------------------------
// --------------------------------------------------
// POST /api/scan/:scanId/follow-up/scan
// Upload a new scan for an active follow-up.
// --------------------------------------------------

async function uploadFollowUpScan(req, res) {
  try {
    const { scanId } = req.params;

    console.log("========== FOLLOW-UP SCAN ==========");
    console.log("scanId:", scanId);
    console.log("userId:", req.userId);
    console.log("====================================");

    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    // Find the original scan
    const scan = await Scan.findOne({
      _id: scanId,
      user: req.userId,
    });

    if (!scan) {
      return res.status(404).json({
        message: "Scan not found",
      });
    }

    // Make sure follow-up monitoring is active
    if (
      !scan.followUp ||
      !scan.followUp.enabled ||
      scan.followUp.status !== "pending"
    ) {
      return res.status(400).json({
        message: "Follow-up monitoring is not active",
      });
    }

    const imageBuffer = fs.readFileSync(req.file.path);

    // --------------------------------------------------
    // Use the SAME crop as the original scan
    // --------------------------------------------------

    const cropMap = {
      apple: "apple",
      cherry: "cherry",
      maize: "maize",
      corn: "maize",
      grape: "grape",
      peach: "peach",
      "bell pepper": "bell_pepper",
      bell_pepper: "bell_pepper",
      potato: "potato",
      tomato: "tomato",
      strawberry: "strawberry",
    };

    const cropName = scan.crop
      .trim()
      .toLowerCase();

    const crop =
      cropMap[cropName] || cropName;

    console.log("Follow-up crop:", crop);
    console.log(
      "File:",
      req.file.originalname
    );

    // --------------------------------------------------
    // Run ML model
    // --------------------------------------------------

    const prediction =
      await detectDiseaseClass(
        imageBuffer,
        req.file.mimetype,
        crop
      );

    console.log(
      "========== FOLLOW-UP ML =========="
    );

    console.log(
      "Crop:",
      prediction.crop
    );

    console.log(
      "Label:",
      prediction.modelLabel
    );

    console.log(
      "Confidence:",
      prediction.confidence
    );

    console.log(
      "Class key:",
      prediction.classKey
    );

    console.log(
      "==================================="
    );

    // --------------------------------------------------
    // Crop mismatch
    // --------------------------------------------------

    if (!prediction.cropMatch) {
      return res.status(200).json({
        uncertain: true,
        cropMismatch: true,

        message:
          `The uploaded image does not appear to be a ${scan.crop} leaf. ` +
          `Please upload a clear image of the same crop.`,

        selectedCrop: scan.crop,
        detectedCrop:
          prediction.predictedCrop,
      });
    }

    // --------------------------------------------------
    // Low confidence
    // --------------------------------------------------

    if (prediction.confidence < 40) {
      return res.status(200).json({
        uncertain: true,

        message:
          "The AI could not confidently identify the disease. " +
          "Please capture a clear close-up of the affected leaf.",

        crop: prediction.crop,
        disease: prediction.modelLabel,
        confidence: prediction.confidence,
      });
    }

    // --------------------------------------------------
    // Unsupported disease
    // --------------------------------------------------

    if (!prediction.classKey) {
      return res.status(422).json({
        message:
          "The detected disease is not currently supported by CropSense.",

        modelLabel:
          prediction.modelLabel,

        confidence:
          prediction.confidence,
      });
    }

    // --------------------------------------------------
    // Translate result
    // --------------------------------------------------

    const lang =
      req.body.lang || "en";

    const translated =
      translateProfile(
        prediction.classKey,
        lang,
        prediction.confidence
      );

    if (!translated) {
      return res.status(422).json({
        message:
          "Could not generate disease profile.",
      });
    }

    // --------------------------------------------------
    // Save follow-up scan
    // --------------------------------------------------

    const followUpScan = {
      imageUrl:
        `/uploads/${req.file.filename}`,

      disease:
        translated.disease,

      classKey:
        prediction.classKey,

      severity:
        translated.severity,

      severityPercent:
        translated.severityPercent,

      confidence:
        translated.confidence,

      date: new Date(),
    };

    scan.followUp.scans.push(
      followUpScan
    );

    await scan.save();

    console.log(
      "FOLLOW-UP SCAN SAVED"
    );

    console.log(
      followUpScan
    );

    // --------------------------------------------------
    // Compare with original scan
    // --------------------------------------------------

    const change =
      translated.severityPercent -
      scan.severityPercent;

    let status = "stable";

    if (change <= -10) {
      status = "improving";
    } else if (change >= 10) {
      status = "worsening";
    }

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(201).json({
      message:
        "Follow-up scan added successfully",

      scan: followUpScan,

      comparison: {
        status,
        change,

        initial: {
          disease: scan.disease,
          severity: scan.severity,
          severityPercent:
            scan.severityPercent,
          confidence:
            scan.confidence,
        },

        current: {
          disease:
            followUpScan.disease,

          severity:
            followUpScan.severity,

          severityPercent:
            followUpScan.severityPercent,

          confidence:
            followUpScan.confidence,

          date:
            followUpScan.date,
        },
      },
    });

  } catch (err) {
    console.error(
      "========== FOLLOW-UP SCAN ERROR =========="
    );

    console.error(err);
    console.error(
      "Message:",
      err.message
    );
    console.error(
      "Stack:",
      err.stack
    );

    console.error(
      "==========================================="
    );

    return res.status(500).json({
      message:
        "Could not process follow-up scan",

      error: err.message,
    });
  }
}
module.exports = {
  createScan,
  getHistory,
  startFollowUp,
  getFollowUps,
  getFollowUp,
  uploadFollowUpScan
};