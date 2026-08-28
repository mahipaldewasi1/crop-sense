const mongoose = require("mongoose");

// One record per photo the farmer scans.
// Kept flat on purpose - easy to query for "recent scans" on Home screen.
const scanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true }, // path/URL of uploaded image
    classKey: { type: String }, // language-neutral id (e.g. "Tomato_Early_Blight") — used to re-translate crop/disease/recommendation on every read, so history stays correct after a language switch
    crop: { type: String, required: true }, // English fallback, only used if classKey is missing (legacy scans from before this field existed)
    disease: { type: String, required: true },
    severity: { type: String, enum: ["Low", "Medium", "High"], required: true },
    severityPercent: { type: Number, required: true }, // 0-100, drives the gauge on frontend
    confidence: { type: Number, required: true }, // 0-100
    recommendation: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scan", scanSchema);
