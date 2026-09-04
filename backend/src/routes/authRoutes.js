const express = require("express");

const {
  register,
  login,
  expertRegister,
  expertLogin,
} = require("../controllers/authController");

const router = express.Router();

// =========================
// FARMER AUTH
// =========================

router.post("/register", register);

router.post("/login", login);


// =========================
// EXPERT AUTH
// =========================

router.post("/expert/register", expertRegister);

router.post("/expert/login", expertLogin);


module.exports = router;