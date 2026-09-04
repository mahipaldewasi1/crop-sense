const mongoose = require("mongoose");

const followUpScanSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },

    classKey: {
      type: String,
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

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

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

    // ==========================================
    // EXPERT REVIEW
    // ==========================================

expertReview: {
  status: {
    type: String,
    enum: ["not_requested", "pending", "reviewed"],
    default: "not_requested",
  },

  requestedAt: {
    type: Date,
    default: null,
  },

  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  advice: {
    type: String,
    default: "",
  },

  reviewedAt: {
    type: Date,
    default: null,
  },
},

    // ==========================================
    // FOLLOW UP
    // ==========================================

    followUp: {
      enabled: {
        type: Boolean,
        default: false,
      },

      dueDate: {
        type: Date,
        default: null,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      scans: {
        type: [followUpScanSchema],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Scan",
  scanSchema
);