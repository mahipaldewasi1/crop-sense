  const Scan = require("../models/Scan");

  // ==========================================
  // GET FARMER CASES
  // ==========================================

  async function getExpertCases(req, res) {
    try {
      const scans = await Scan.find({
        "expertReview.status": {
          $in: ["pending", "reviewed"],
        },
      })
        .populate(
          "user",
          "name phone location"
        )
        .populate(
          "expertReview.expert",
          "name qualification specialization organization"
        )
        .sort({
          "expertReview.requestedAt": -1,
        });

      const cases = scans.map((scan) => ({
        id: scan._id,

        farmer:
          scan.user?.name ||
          "Unknown Farmer",

        crop: scan.crop,

        disease: scan.disease,

        severity: scan.severity,

        severityPercent:
          scan.severityPercent,

        confidence:
          scan.confidence,

        location:
          scan.user?.location?.label ||
          "Location unavailable",

        time: scan.createdAt,

        status:
          scan.expertReview?.status ||
          "not_requested",

        requestedAt:
          scan.expertReview?.requestedAt ||
          null,

        reviewedAt:
          scan.expertReview?.reviewedAt ||
          null,
      }));

      return res.status(200).json({
        cases,
      });
    } catch (err) {
      console.error(
        "EXPERT CASES ERROR:",
        err
      );

      return res.status(500).json({
        message:
          "Could not load farmer cases",
        error: err.message,
      });
    }
  }

  // ==========================================
  // GET SINGLE CASE
  // ==========================================

  async function getExpertCase(req, res) {
    try {
      const { scanId } = req.params;

      const scan = await Scan.findById(scanId)
        .populate(
          "user",
          "name phone location"
        )
        .populate(
          "expertReview.expert",
          "name qualification specialization organization"
        );

      if (!scan) {
        return res.status(404).json({
          message: "Case not found",
        });
      }

      return res.status(200).json({
        case: {
          id: scan._id,

          farmer: scan.user
            ? {
                id: scan.user._id,
                name: scan.user.name,
                phone: scan.user.phone,
                location:
                  scan.user.location,
              }
            : null,

          imageUrl:
            scan.imageUrl,

          crop:
            scan.crop,

          disease:
            scan.disease,

          classKey:
            scan.classKey,

          severity:
            scan.severity,

          severityPercent:
            scan.severityPercent,

          confidence:
            scan.confidence,

          recommendation:
            scan.recommendation,

          ipm:
            scan.ipm,

          createdAt:
            scan.createdAt,

          expertReview:
            scan.expertReview || {
              status: "not_requested",
              requestedAt: null,
              expert: null,
              advice: "",
              reviewedAt: null,
            },
        },
      });
    } catch (err) {
      console.error(
        "GET EXPERT CASE ERROR:",
        err
      );

      return res.status(500).json({
        message:
          "Could not load case",
        error: err.message,
      });
    }
  }

  // ==========================================
  // SUBMIT EXPERT REVIEW
  // ==========================================

async function submitExpertReview(req, res) {
  try {
    const { scanId } = req.params;
    const { advice } = req.body;

    console.log("========== SUBMIT EXPERT REVIEW ==========");
    console.log("Scan ID:", scanId);
    console.log("Expert ID:", req.userId);
    console.log("Advice:", advice);
    console.log("============================================");

    if (!advice || !advice.trim()) {
      return res.status(400).json({
        message: "Expert advice is required",
      });
    }

    const scan = await Scan.findById(scanId);

    if (!scan) {
      return res.status(404).json({
        message: "Case not found",
      });
    }

    console.log(
      "Expert review BEFORE:",
      scan.expertReview
    );

    scan.expertReview.status = "reviewed";
    scan.expertReview.expert = req.userId;
    scan.expertReview.advice = advice.trim();
    scan.expertReview.reviewedAt = new Date();

    await scan.save();

    console.log(
      "Expert review AFTER:",
      scan.expertReview
    );

    const updatedScan = await Scan.findById(scan._id)
      .populate(
        "user",
        "name phone location"
      )
      .populate(
        "expertReview.expert",
        "name qualification specialization organization"
      );

    console.log(
      "FINAL SAVED EXPERT REVIEW:",
      updatedScan.expertReview
    );

    console.log(
      "============================================"
    );

    return res.status(200).json({
      message:
        "Expert review submitted successfully",

      case: {
        id: updatedScan._id,
        farmer: updatedScan.user,
        imageUrl: updatedScan.imageUrl,
        crop: updatedScan.crop,
        disease: updatedScan.disease,
        severity: updatedScan.severity,
        severityPercent: updatedScan.severityPercent,
        confidence: updatedScan.confidence,
        recommendation: updatedScan.recommendation,
        ipm: updatedScan.ipm,
        createdAt: updatedScan.createdAt,
        expertReview: updatedScan.expertReview,
      },
    });

  } catch (err) {
    console.error(
      "SUBMIT EXPERT REVIEW ERROR:",
      err
    );

    return res.status(500).json({
      message:
        "Could not submit expert review",
      error: err.message,
    });
  }
}
  // ==========================================
  // FARMER REQUESTS EXPERT REVIEW
  // ==========================================

 async function requestExpertReview(req, res) {
  try {
    const { scanId } = req.params;

    console.log("========== REQUEST EXPERT REVIEW ==========");
    console.log("Scan ID:", scanId);
    console.log("Farmer ID:", req.userId);
    console.log("============================================");

    const scan = await Scan.findById(scanId);

    if (!scan) {
      return res.status(404).json({
        message: "Case not found",
      });
    }

    console.log("Found scan:", scan._id.toString());
    console.log("Scan owner:", scan.user.toString());
    console.log("Current expertReview:", scan.expertReview);

    if (
      scan.user.toString() !==
      req.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to request review for this case",
      });
    }

    if (
      scan.expertReview?.status ===
      "reviewed"
    ) {
      return res.status(400).json({
        message:
          "This case has already been reviewed by an expert",
      });
    }

    if (
      scan.expertReview?.status ===
      "pending"
    ) {
      return res.status(400).json({
        message:
          "Expert review has already been requested",
      });
    }

    scan.expertReview.status = "pending";
    scan.expertReview.requestedAt = new Date();

    await scan.save();

    console.log("AFTER REQUEST:");
    console.log("Scan ID:", scan._id.toString());
    console.log("Expert Review:", scan.expertReview);
    console.log("============================================");

    return res.status(200).json({
      message:
        "Expert review requested successfully",
      expertReview: scan.expertReview,
    });

  } catch (err) {
    console.error(
      "REQUEST EXPERT REVIEW ERROR:",
      err
    );

    return res.status(500).json({
      message:
        "Could not request expert review",
      error: err.message,
    });
  }
}
  // ==========================================
  // EXPORTS
  // ==========================================

  module.exports = {
    getExpertCases,
    getExpertCase,
    submitExpertReview,
    requestExpertReview,
  };