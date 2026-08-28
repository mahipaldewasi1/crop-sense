const mongoose = require("mongoose");

// Farmer account. Keeping this intentionally simple for MVP:
// name + phone + password + location. No extra fields yet.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // stored as bcrypt hash
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      label: { type: String, default: "" }, // e.g. "Kishangarh, Rajasthan"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
