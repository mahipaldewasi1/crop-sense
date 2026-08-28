require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const scanRoutes = require("./src/routes/scanRoutes");
const storeRoutes = require("./src/routes/storeRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Uploaded images publicly accessible (MVP only - fine for demo)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.json({ status: "CropSense API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/stores", storeRoutes);

// basic error handler (catches multer errors etc.)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CropSense backend running on port ${PORT}`));
