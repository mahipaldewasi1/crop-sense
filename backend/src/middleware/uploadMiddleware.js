const multer = require("multer");
const path = require("path");

// MVP: image disk pe save hoti hai /uploads folder mein.
// FUTURE: Cloudinary/Firebase Storage use karke isse cloud pe move karna
// - sirf storage engine change karna hoga, baaki controller code same rahega.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "..", "uploads")),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, png, webp)"));
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 8 * 1024 * 1024 } });

module.exports = upload;
