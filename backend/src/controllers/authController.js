const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
}


// =========================
// FARMER REGISTER
// =========================

async function register(req, res) {
  try {
    const { name, phone, password, location } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        message: "name, phone and password are required",
      });
    }

    const existing = await User.findOne({ phone });

    if (existing) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      location: location || {},
      role: "farmer",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
}


// =========================
// FARMER LOGIN
// =========================

// =========================
// FARMER LOGIN
// =========================

async function login(req, res) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "phone and password are required",
      });
    }

    // Find user by phone first.
    // This also supports older farmer accounts
    // created before the role field was added.
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({
        message: "Invalid phone or password",
      });
    }

    // Do not allow experts to use the farmer login.
    if (user.role === "expert") {
      return res.status(403).json({
        message: "Please use the Expert Portal to login.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid phone or password",
      });
    }

    // If this is an older farmer account without a role,
    // treat it as a farmer.
    if (!user.role) {
      user.role = "farmer";
      await user.save();
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        location: user.location,
      },
    });
  } catch (err) {
    console.error("Farmer login error:", err);

    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
}


// =========================
// EXPERT REGISTER
// =========================

async function expertRegister(req, res) {
  try {
    const {
      name,
      phone,
      password,
      qualification,
      specialization,
      organization,
    } = req.body;

    if (
      !name ||
      !phone ||
      !password ||
      !qualification ||
      !specialization ||
      !organization
    ) {
      return res.status(400).json({
        message:
          "name, phone, password, qualification, specialization and organization are required",
      });
    }

    const existing = await User.findOne({ phone });

    if (existing) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,

      role: "expert",

      qualification,
      specialization,
      organization,

      verificationStatus: "pending",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message:
        "Expert registration submitted. Your account is awaiting verification.",

      token,

      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        qualification: user.qualification,
        specialization: user.specialization,
        organization: user.organization,
        verificationStatus: user.verificationStatus,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Expert registration failed",
      error: err.message,
    });
  }
}


// =========================
// EXPERT LOGIN
// =========================

async function expertLogin(req, res) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "phone and password are required",
      });
    }

    const user = await User.findOne({
      phone,
      role: "expert",
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid phone or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid phone or password",
      });
    }

    if (user.verificationStatus !== "verified") {
      return res.status(403).json({
        message:
          user.verificationStatus === "pending"
            ? "Your expert account is awaiting verification."
            : "Your expert account has been rejected.",
        verificationStatus: user.verificationStatus,
      });
    }

    const token = generateToken(user._id);

    res.json({
      token,

      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        qualification: user.qualification,
        specialization: user.specialization,
        organization: user.organization,
        verificationStatus: user.verificationStatus,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Expert login failed",
      error: err.message,
    });
  }
}


module.exports = {
  register,
  login,
  expertRegister,
  expertLogin,
};