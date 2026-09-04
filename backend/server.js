require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const scanRoutes = require("./src/routes/scanRoutes");
const expertRoutes = require("./src/routes/expertRoutes");
const storeRoutes = require("./src/routes/storeRoutes");

const app = express();

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

// =========================
// UPLOADED IMAGES
// =========================
// Allows frontend to access images saved in:
// backend/uploads/

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {
  res.json({
    status: "CropSense API running",
  });
});

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/scan", scanRoutes);

app.use("/api/stores", storeRoutes);

app.use("/api/expert", expertRoutes);

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message:
      err.message || "Something went wrong",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `CropSense backend running on port ${PORT}`
  );
});