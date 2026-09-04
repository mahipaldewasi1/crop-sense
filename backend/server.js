require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const scanRoutes = require("./src/routes/scanRoutes");
const expertRoutes = require("./src/routes/expertRoutes");
const storeRoutes = require("./src/routes/storeRoutes");

const app = express();

// ==========================================
// DATABASE
// ==========================================

connectDB();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadsPath = path.join(__dirname, "uploads");

// Make sure uploads folder exists
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

console.log("==========================================");
console.log("Uploads directory:");
console.log(uploadsPath);
console.log("==========================================");

// ==========================================
// SERVE UPLOADED IMAGES
// ==========================================

app.use(
  "/uploads",
  express.static(uploadsPath)
);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.json({
    status: "CropSense API running",
    uploadsDirectory: uploadsPath,
  });
});

// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/scan", scanRoutes);

app.use("/api/stores", storeRoutes);

app.use("/api/expert", expertRoutes);

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("========== SERVER ERROR ==========");
  console.error(err);
  console.error("==================================");

  res.status(500).json({
    message: err.message || "Something went wrong",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==========================================");
  console.log(`CropSense backend running on port ${PORT}`);
  console.log(`Images served from: ${uploadsPath}`);
  console.log("==========================================");
});