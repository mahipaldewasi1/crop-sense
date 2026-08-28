/**
 * aiService.js
 * ------------
 * Har disease profile ab teeno languages mein hai (en/hi/mr).
 * detectDisease() ab `lang` parameter leta hai, aur usi language mein
 * result deta hai. Jab real AI model aayega, sirf FUTURE section wala
 * hissa badlega — ye translation TABLE reuse hogi, kyunki disease classes
 * fixed/finite hoti hain (model training ke time hi decide ho jaati hain).
 */

const DISEASE_PROFILES = [
  {
    crop: { en: "Tomato", hi: "टमाटर", mr: "टोमॅटो" },
    disease: { en: "Early Blight", hi: "अगेती झुलसा", mr: "लवकर करपा" },
    severity: "Medium",
    severityPercent: 62,
    confidence: 91,
    recommendation: {
      en: "Spray copper-based fungicide within 7 days. Remove affected leaves and avoid overwatering.",
      hi: "7 दिन के अंदर कॉपर-आधारित फफूंदनाशक स्प्रे करें। प्रभावित पत्तियां हटा दें और ज्यादा पानी देने से बचें।",
      mr: "7 दिवसांच्या आत कॉपर-आधारित बुरशीनाशक फवारणी करा. प्रभावित पाने काढून टाका आणि जास्त पाणी देणे टाळा.",
    },
  },
  {
    crop: { en: "Tomato", hi: "टमाटर", mr: "टोमॅटो" },
    disease: { en: "Leaf Curl Virus", hi: "पत्ती मरोड़ वायरस", mr: "पान कुरळी विषाणू" },
    severity: "High",
    severityPercent: 84,
    confidence: 88,
    recommendation: {
      en: "Isolate affected plants immediately, spray neem oil to control whitefly. Contact your local Krishi Vigyan Kendra for severe cases.",
      hi: "प्रभावित पौधों को तुरंत अलग करें, सफेद मक्खी नियंत्रण के लिए नीम तेल स्प्रे करें। गंभीर मामलों में कृषि विज्ञान केंद्र से संपर्क करें।",
      mr: "प्रभावित रोपे लगेच वेगळी करा, पांढरी माशी नियंत्रणासाठी निंबोळी तेल फवारणी करा. गंभीर प्रकरणांमध्ये कृषी विज्ञान केंद्राशी संपर्क साधा.",
    },
  },
  {
    crop: { en: "Wheat", hi: "गेहूं", mr: "गहू" },
    disease: { en: "Healthy", hi: "स्वस्थ", mr: "निरोगी" },
    severity: "Low",
    severityPercent: 8,
    confidence: 95,
    recommendation: {
      en: "Crop is healthy. Continue regular monitoring and follow a balanced fertilizer schedule.",
      hi: "फसल स्वस्थ है। नियमित निगरानी जारी रखें और संतुलित उर्वरक कार्यक्रम का पालन करें।",
      mr: "पीक निरोगी आहे. नियमित निरीक्षण सुरू ठेवा आणि संतुलित खत वेळापत्रक पाळा.",
    },
  },
  {
    crop: { en: "Potato", hi: "आलू", mr: "बटाटा" },
    disease: { en: "Late Blight", hi: "पछेती झुलसा", mr: "उशिरा करपा" },
    severity: "High",
    severityPercent: 78,
    confidence: 89,
    recommendation: {
      en: "Spray Mancozeb or Chlorothalonil based fungicide immediately. Prevent water from stagnating in the field.",
      hi: "मैंकोज़ेब या क्लोरोथैलोनिल आधारित फफूंदनाशक तुरंत स्प्रे करें। खेत में पानी जमा न होने दें।",
      mr: "मॅन्कोझेब किंवा क्लोरोथॅलोनिल आधारित बुरशीनाशक लगेच फवारणी करा. शेतात पाणी साचू देऊ नका.",
    },
  },
  {
    crop: { en: "Cotton", hi: "कपास", mr: "कापूस" },
    disease: { en: "Bacterial Blight", hi: "जीवाणु झुलसा", mr: "जिवाणू करपा" },
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation: {
      en: "Spray copper oxychloride. Choose a disease-resistant seed variety for the next sowing.",
      hi: "कॉपर ऑक्सीक्लोराइड स्प्रे करें। अगली बुवाई के लिए रोग-प्रतिरोधी बीज किस्म चुनें।",
      mr: "कॉपर ऑक्सिक्लोराईड फवारणी करा. पुढील पेरणीसाठी रोगप्रतिकारक बियाणे वाण निवडा.",
    },
  },
];

/**
 * lang: "en" | "hi" | "mr" — default "en" agar kuch na bheja jaye
 */
function detectDisease(imageBuffer, lang = "en") {
  const seed = imageBuffer && imageBuffer.length ? imageBuffer.length : Date.now();
  const index = seed % DISEASE_PROFILES.length;
  const profile = DISEASE_PROFILES[index];

  return {
    crop: profile.crop[lang] || profile.crop.en,
    disease: profile.disease[lang] || profile.disease.en,
    severity: profile.severity, // "Low"/"Medium"/"High" hamesha English mein — frontend isko already translate karta hai badge ke liye
    severityPercent: profile.severityPercent,
    confidence: profile.confidence,
    recommendation: profile.recommendation[lang] || profile.recommendation.en,
  };
}

/*
FUTURE REAL AI VERSION:
Real model se sirf ek FIXED class name milega (jaise "Tomato_Early_Blight").
Us class name ko upar wali DISEASE_PROFILES table mein match karke
translated version nikaal lena — poora translation kaam already ho chuka
hoga, sirf lookup karna hoga:

async function detectDisease(imageBuffer, lang = "en") {
  const response = await axios.post(process.env.AI_SERVICE_URL, imageBuffer, {...});
  const predictedClass = response.data.class; // e.g. "Tomato_Early_Blight"
  const profile = DISEASE_PROFILES.find(p => p.classKey === predictedClass);
  return { ...profile translated as above... };
}
*/

module.exports = { detectDisease };