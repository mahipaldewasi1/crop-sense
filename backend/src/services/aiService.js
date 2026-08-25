/**
 * aiService.js
 * ------------
 * MVP ke liye ye a MOCK AI service hai — real model abhi ready nahi hai,
 * isliye hum ek chhoti dataset se realistic-looking result pick kar rahe hain.
 *
 * FUTURE: Jab Python (FastAPI/Flask) model ready ho jaye, bas is file ke
 * andar ka logic replace kar dena — jaise neeche commented example hai.
 * Baaki poora app (controller, routes, frontend) bilkul waisa hi rahega,
 * kyunki wo sirf detectDisease() ka result use karte hain, uska internal
 * implementation nahi jaante. Isko "service layer" pattern kehte hain.
 */

const DISEASE_PROFILES = [
  {
    crop: "Tomato",
    disease: "Early Blight",
    severity: "Medium",
    severityPercent: 62,
    confidence: 91,
    recommendation:
      "Copper-based fungicide 7 din ke andar spray karein. Affected patton ko hata dein aur zyada paani dene se bachein.",
  },
  {
    crop: "Tomato",
    disease: "Leaf Curl Virus",
    severity: "High",
    severityPercent: 84,
    confidence: 88,
    recommendation:
      "Affected paudhe turant alag karein, whitefly control ke liye neem oil spray karein. Gambhir case mein krishi vigyan kendra se sampark karein.",
  },
  {
    crop: "Wheat",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 8,
    confidence: 95,
    recommendation:
      "Fasal swasth hai. Regular monitoring jari rakhein aur balanced fertilizer schedule follow karein.",
  },
  {
    crop: "Potato",
    disease: "Late Blight",
    severity: "High",
    severityPercent: 78,
    confidence: 89,
    recommendation:
      "Mancozeb ya Chlorothalonil based fungicide turant spray karein. Kheत mein paani jamne na dein.",
  },
  {
    crop: "Cotton",
    disease: "Bacterial Blight",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Copper oxychloride spray karein. Aage bijai ke liye disease-resistant beej variety choose karein.",
  },
];

/**
 * Mock detection - image ke buffer size se ek "consistent" pick karta hai,
 * taaki same image dobara upload karne pe roughly same result aaye
 * (pure random se demo mein judges confuse ho sakte hain agar wahi photo
 * baar baar different result de).
 */
function detectDisease(imageBuffer) {
  const seed = imageBuffer && imageBuffer.length ? imageBuffer.length : Date.now();
  const index = seed % DISEASE_PROFILES.length;
  return DISEASE_PROFILES[index];
}

/*
FUTURE REAL AI VERSION (jab Python model ready ho):

const axios = require("axios");

async function detectDisease(imageBuffer) {
  const response = await axios.post(process.env.AI_SERVICE_URL, imageBuffer, {
    headers: { "Content-Type": "application/octet-stream" },
  });
  return response.data; // { crop, disease, severity, severityPercent, confidence, recommendation }
}
*/

module.exports = { detectDisease };
