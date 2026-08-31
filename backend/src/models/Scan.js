const mongoose = require("mongoose");

// One record per photo the farmer scans.

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    // Language-neutral disease identifier.
    // Used to regenerate translated content later.
    classKey: {
      type: String,
    },

    crop: {
      type: String,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    severityPercent: {
      type: Number,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    recommendation: {
      type: String,
      required: true,
    },
    ipm: {
  monitoring: { type: [String], default: [] },
  cultural: { type: [String], default: [] },
  biological: { type: [String], default: [] },
  chemical: { type: [String], default: [] },
  safety: { type: [String], default: [] },
},

    // Integrated Pest Management recommendations
    ipm: {
      monitoring: {
        type: [String],
        default: [],
      },

      cultural: {
        type: [String],
        default: [],
      },

      biological: {
        type: [String],
        default: [],
      },

      chemical: {
        type: [String],
        default: [],
      },

      safety: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scan", scanSchema);