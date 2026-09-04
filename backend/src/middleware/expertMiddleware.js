const User = require("../models/User");

async function expertOnly(req, res, next) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.role !== "expert") {
      return res.status(403).json({
        message: "Expert access required",
      });
    }

    if (user.verificationStatus !== "verified") {
      return res.status(403).json({
        message: "Expert account is not verified",
        verificationStatus: user.verificationStatus,
      });
    }

    req.expert = user;

    next();
  } catch (err) {
    console.error("EXPERT AUTH ERROR:", err);

    return res.status(500).json({
      message: "Could not verify expert access",
    });
  }
}

module.exports = expertOnly;