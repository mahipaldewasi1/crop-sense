const fs = require("fs");


// ============================================================
// DISEASE PROFILES
// ============================================================

const DISEASE_PROFILES = [
  // ----------------------------------------------------------
  // TOMATO
  // ----------------------------------------------------------
  {
    classKey: "Tomato_Early_Blight",
    crop: "Tomato",
    disease: "Early Blight",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove affected leaves, improve air circulation, avoid overhead watering, and apply an appropriate fungicide if the disease continues to spread.",
    ipm: {
      prevention:
        "Maintain proper spacing, remove infected leaves, and avoid wetting foliage.",
      monitoring:
        "Inspect lower leaves regularly for dark spots with concentric rings.",
      treatment:
        "Remove infected foliage and use a suitable fungicide according to the label."
    }
  },

  {
    classKey: "Tomato_Leaf_Curl_Virus",
    crop: "Tomato",
    disease: "Tomato Yellow Leaf Curl Virus",
    severity: "High",
    severityPercent: 80,
    confidence: 85,
    recommendation:
      "Remove severely infected plants, control whiteflies, remove weeds around the crop, and use resistant varieties when possible."
  },

  {
    classKey: "Tomato_Bacterial_Spot",
    crop: "Tomato",
    disease: "Bacterial Spot",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove infected leaves, avoid overhead irrigation, sanitize tools, and use an appropriate copper-based treatment when recommended."
  },

  {
    classKey: "Tomato_Late_Blight",
    crop: "Tomato",
    disease: "Late Blight",
    severity: "High",
    severityPercent: 80,
    confidence: 85,
    recommendation:
      "Remove infected plant material, improve air circulation, avoid prolonged leaf wetness, and apply a suitable fungicide promptly."
  },

  {
    classKey: "Tomato_Leaf_Mold",
    crop: "Tomato",
    disease: "Leaf Mold",
    severity: "Medium",
    severityPercent: 50,
    confidence: 85,
    recommendation:
      "Improve ventilation, reduce humidity, avoid overhead watering, and remove infected leaves."
  },

  {
    classKey: "Tomato_Septoria_Leaf_Spot",
    crop: "Tomato",
    disease: "Septoria Leaf Spot",
    severity: "Medium",
    severityPercent: 50,
    confidence: 85,
    recommendation:
      "Remove infected leaves, keep foliage dry, clear plant debris, and apply an appropriate fungicide if necessary."
  },

  {
    classKey: "Tomato_Spider_Mites",
    crop: "Tomato",
    disease: "Spider Mites",
    severity: "Medium",
    severityPercent: 50,
    confidence: 85,
    recommendation:
      "Inspect the undersides of leaves, remove heavily affected foliage, maintain adequate plant hydration, and use an appropriate miticide if necessary."
  },

  {
    classKey: "Tomato_Target_Spot",
    crop: "Tomato",
    disease: "Target Spot",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove infected leaves, improve air circulation, avoid overhead watering, and apply an appropriate fungicide if needed."
  },

  {
    classKey: "Tomato_Mosaic_Virus",
    crop: "Tomato",
    disease: "Tomato Mosaic Virus",
    severity: "High",
    severityPercent: 80,
    confidence: 85,
    recommendation:
      "Remove infected plants, disinfect tools, control weeds, and avoid handling healthy plants after touching infected plants."
  },

  {
    classKey: "Tomato_Healthy",
    crop: "Tomato",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The plant appears healthy. Continue regular monitoring, proper irrigation, balanced nutrition, and good field hygiene."
  },

  // ----------------------------------------------------------
  // POTATO
  // ----------------------------------------------------------
  {
    classKey: "Potato_Late_Blight",
    crop: "Potato",
    disease: "Late Blight",
    severity: "High",
    severityPercent: 85,
    confidence: 85,
    recommendation:
      "Remove infected foliage, improve field ventilation, avoid prolonged leaf wetness, and apply an appropriate fungicide promptly.",
    ipm: {
      prevention:
        "Use certified disease-free seed, maintain proper spacing, and avoid excessive irrigation.",
      monitoring:
        "Inspect foliage regularly for dark water-soaked lesions.",
      treatment:
        "Remove infected plant material and use an appropriate fungicide according to local recommendations."
    }
  },

  {
    classKey: "Potato_Early_Blight",
    crop: "Potato",
    disease: "Early Blight",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove infected leaves, maintain adequate plant nutrition, improve air circulation, and apply an appropriate fungicide if necessary."
  },

  {
    classKey: "Potato_Healthy",
    crop: "Potato",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The plant appears healthy. Continue regular monitoring, balanced nutrition, proper irrigation, and good field hygiene."
  },

  // ----------------------------------------------------------
  // MAIZE
  // ----------------------------------------------------------
  {
    classKey: "Maize_Cercospora_Gray_Leaf_Spot",
    crop: "Maize",
    disease: "Cercospora Gray Leaf Spot",
    severity: "Medium",
    severityPercent: 60,
    confidence: 85,
    recommendation:
      "Remove infected crop debris where practical, improve field airflow, rotate crops, and use an appropriate fungicide when necessary."
  },

  {
    classKey: "Maize_Common_Rust",
    crop: "Maize",
    disease: "Common Rust",
    severity: "Medium",
    severityPercent: 50,
    confidence: 85,
    recommendation:
      "Monitor rust development, maintain healthy crop nutrition, consider resistant varieties, and apply an appropriate fungicide if infection becomes severe."
  },

  {
    classKey: "Maize_Northern_Leaf_Blight",
    crop: "Maize",
    disease: "Northern Leaf Blight",
    severity: "High",
    severityPercent: 70,
    confidence: 85,
    recommendation:
      "Remove crop residue where practical, rotate crops, use resistant varieties, and apply a suitable fungicide when disease pressure is high."
  },

  {
    classKey: "Maize_Healthy",
    crop: "Maize",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The crop appears healthy. Continue regular monitoring, balanced fertilization, proper irrigation, and good field hygiene."
  },

  // ----------------------------------------------------------
  // APPLE
  // ----------------------------------------------------------
  {
    classKey: "Apple_Scab",
    crop: "Apple",
    disease: "Apple Scab",
    severity: "Medium",
    severityPercent: 60,
    confidence: 85,
    recommendation:
      "Remove infected leaves and fruit, clear fallen leaf debris, improve orchard sanitation, and use an appropriate fungicide when needed."
  },

  {
    classKey: "Apple_Black_Rot",
    crop: "Apple",
    disease: "Black Rot",
    severity: "High",
    severityPercent: 70,
    confidence: 85,
    recommendation:
      "Remove mummified fruit and infected branches, improve orchard sanitation, and prune affected plant material."
  },

  {
    classKey: "Apple_Cedar_Rust",
    crop: "Apple",
    disease: "Cedar Apple Rust",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove affected plant material where practical, improve orchard sanitation, and apply an appropriate fungicide during susceptible growth stages."
  },

  {
    classKey: "Apple_Healthy",
    crop: "Apple",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The apple plant appears healthy. Continue regular inspection, balanced nutrition, proper irrigation, and orchard sanitation."
  },

  // ----------------------------------------------------------
  // CHERRY
  // ----------------------------------------------------------
  {
    classKey: "Cherry_Powdery_Mildew",
    crop: "Cherry",
    disease: "Powdery Mildew",
    severity: "Medium",
    severityPercent: 50,
    confidence: 85,
    recommendation:
      "Improve air circulation, remove heavily affected foliage, avoid excessive humidity, and use an appropriate fungicide when necessary."
  },

  {
    classKey: "Cherry_Healthy",
    crop: "Cherry",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The cherry plant appears healthy. Continue regular monitoring, adequate irrigation, balanced nutrition, and good orchard hygiene."
  },

  // ----------------------------------------------------------
  // GRAPE
  // ----------------------------------------------------------
  {
    classKey: "Grape_Black_Rot",
    crop: "Grape",
    disease: "Black Rot",
    severity: "High",
    severityPercent: 70,
    confidence: 85,
    recommendation:
      "Remove infected berries and leaves, clear mummified fruit, improve canopy ventilation, and use an appropriate fungicide when required."
  },

  {
    classKey: "Grape_Esca",
    crop: "Grape",
    disease: "Esca (Black Measles)",
    severity: "High",
    severityPercent: 75,
    confidence: 85,
    recommendation:
      "Remove severely affected plant material, maintain good vineyard sanitation, and avoid spreading infection through contaminated pruning tools."
  },

  {
    classKey: "Grape_Isariopsis_Leaf_Spot",
    crop: "Grape",
    disease: "Isariopsis Leaf Spot",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove affected leaves, improve canopy airflow, reduce prolonged leaf wetness, and use an appropriate fungicide when needed."
  },

  {
    classKey: "Grape_Healthy",
    crop: "Grape",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The grape plant appears healthy. Continue regular monitoring, proper irrigation, balanced nutrition, and vineyard sanitation."
  },

  // ----------------------------------------------------------
  // PEACH
  // ----------------------------------------------------------
  {
    classKey: "Peach_Bacterial_Spot",
    crop: "Peach",
    disease: "Bacterial Spot",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove severely affected leaves and fruit, improve orchard sanitation, avoid overhead irrigation, and use an appropriate treatment when recommended."
  },

  {
    classKey: "Peach_Healthy",
    crop: "Peach",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The peach plant appears healthy. Continue regular monitoring, balanced nutrition, proper irrigation, and orchard hygiene."
  },

  // ----------------------------------------------------------
  // BELL PEPPER
  // ----------------------------------------------------------
  {
    classKey: "Bell_Pepper_Bacterial_Spot",
    crop: "Bell Pepper",
    disease: "Bacterial Spot",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove infected leaves, avoid overhead irrigation, sanitize tools, maintain good spacing, and use an appropriate treatment if necessary."
  },

  {
    classKey: "Bell_Pepper_Healthy",
    crop: "Bell Pepper",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The bell pepper plant appears healthy. Continue regular monitoring, proper irrigation, balanced nutrition, and good field hygiene."
  },

  // ----------------------------------------------------------
  // STRAWBERRY
  // ----------------------------------------------------------
  {
    classKey: "Strawberry_Leaf_Scorch",
    crop: "Strawberry",
    disease: "Leaf Scorch",
    severity: "Medium",
    severityPercent: 55,
    confidence: 85,
    recommendation:
      "Remove severely affected leaves, improve airflow, avoid prolonged leaf wetness, and maintain proper field sanitation."
  },

  {
    classKey: "Strawberry_Healthy",
    crop: "Strawberry",
    disease: "Healthy",
    severity: "Low",
    severityPercent: 10,
    confidence: 95,
    recommendation:
      "The strawberry plant appears healthy. Continue regular monitoring, proper irrigation, balanced nutrition, and good field hygiene."
  }
];


// ============================================================
// IPM PROFILES
// ============================================================

const IPM_PROFILES = {
  "Tomato_Early_Blight": {
    "en": {
      "monitoring": [
        "Scout lower leaves for dark concentric spots, especially after warm/wet weather."
      ],
      "cultural": [
        "Remove severely affected leaves, avoid prolonged leaf wetness and overhead irrigation, and keep the field clean."
      ],
      "biological": [
        "Prefer locally recommended biological disease-management options where available."
      ],
      "chemical": [
        "Verified: Copper oxychloride 50 WP 3 g/L water (ICAR Kharif Agro-Advisory 2025). TNAU also lists azoxystrobin 23% SC 200 ml/acre and mancozeb 35% SC 1 kg/acre. Use only currently registered/recommended products and follow the label."
      ],
      "safety": [
        "Follow the product label, approved dose, PHI and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "गहरे गोलाकार छल्लेदार धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस टमाटर में अगेती झुलसा के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित: Copper oxychloride 50 WP — 3 ग्राम/लीटर पानी (ICAR Kharif Agro-Advisory 2025)। TNAU में azoxystrobin 23% SC — 200 मिली/एकड़ और mancozeb 35% SC — 1 किग्रा/एकड़ भी सूचीबद्ध हैं। केवल वर्तमान में स्वीकृत लेबल के अनुसार उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "गडद गोलाकार वलय असलेले डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या टोमॅटोतील अर्ली ब्लाइट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित: Copper oxychloride 50 WP — 3 ग्रॅम/लिटर पाणी (ICAR Kharif Agro-Advisory 2025). TNAU मध्ये azoxystrobin 23% SC — 200 मिली/एकर आणि mancozeb 35% SC — 1 किलो/एकरही दिले आहेत. फक्त सध्याच्या मान्य लेबलनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Bacterial_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for small dark/water-soaked spots."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this bacterial disease where available."
      ],
      "chemical": [
        "Verified source to use cautiously: TNAU lists streptocycline guidance for tomato bacterial spot; because product registration/formulation can change, show the published rate only with a current label check."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "छोटे गहरे या पानी जैसे धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस जीवाणुजनित समस्या के लिए स्थानीय रूप से अनुशंसित जैविक/प्रतिरोधी प्रबंधन अपनाएं।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान स्वीकृत लेबल के अनुसार उपचार करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लहान गडद किंवा पाण्यासारखे डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या जिवाणूजन्य समस्येसाठी स्थानिक शिफारसीनुसार जैविक/प्रतिरोधक व्यवस्थापन वापरा."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्याच्या मान्य लेबलनुसार उपचार करा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Late_Blight": {
    "en": {
      "monitoring": [
        "Scout regularly for dark water-soaked lesions and rapid spread."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: cyazofamid 34.5% SC 80 ml/acre, azoxystrobin 23% SC 200 ml/acre, or mancozeb 35% SC 1,000 g/acre (TNAU). Use only current approved label directions."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "गहरे पानी जैसे धब्बे और तेजी से फैलाव की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस टमाटर में पछेती झुलसा के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU विकल्प: cyazofamid 34.5% SC — 80 मिली/एकड़, azoxystrobin 23% SC — 200 मिली/एकड़ या mancozeb 35% SC — 1,000 ग्राम/एकड़। केवल वर्तमान में स्वीकृत लेबल के अनुसार उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "गडद पाण्यासारखे डाग आणि जलद फैलाव साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या टोमॅटोतील उशिरा करपा साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU पर्याय: cyazofamid 34.5% SC — 80 मिली/एकर, azoxystrobin 23% SC — 200 मिली/एकर किंवा mancozeb 35% SC — 1,000 ग्रॅम/एकर. फक्त सध्याच्या मान्य लेबलनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Leaf_Mold": {
    "en": {
      "monitoring": [
        "Scout regularly for olive/gray mold under older leaves."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian dose added here; use only a currently approved tomato leaf-mold fungicide according to its label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पुरानी पत्तियों के नीचे जैतूनी/धूसर फफूंदी की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस टमाटर में पत्ती फफूंदी के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "जुन्या पानांच्या खालच्या बाजूस ऑलिव्ह/करड्या बुरशीची वाढ साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या टोमॅटोतील पानावरील बुरशी साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Septoria_Leaf_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for small circular spots with dark centers."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: fluxapyroxad 250 g/L + pyraclostrobin 250 g/L SC 200–250 ml/ha (TNAU). Check the current label before use."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "छोटे गोल धब्बे और गहरे केंद्र की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस टमाटर में सेप्टोरिया पत्ती धब्बा के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU विकल्प: fluxapyroxad 250 g/L + pyraclostrobin 250 g/L SC — 200–250 मिली/हेक्टेयर। उपयोग से पहले वर्तमान पंजीकृत लेबल जांचें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लहान गोल डाग आणि काळसर केंद्र साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या टोमॅटोतील सेप्टोरिया पानावरील डाग साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU पर्याय: fluxapyroxad 250 g/L + pyraclostrobin 250 g/L SC — 200–250 मिली/हेक्टर. वापरण्यापूर्वी सध्याचे नोंदणीकृत लेबल तपासा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Spider_Mites": {
    "en": {
      "monitoring": [
        "Scout regularly for fine webbing and bronzing on leaf undersides."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this mite pest where available."
      ],
      "chemical": [
        "Verified: wettable sulphur 50 WP 2 g/L water (TNAU). Use only when mites are present and follow the current label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्तियों के नीचे बारीक जाला और कांस्य रंग की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "पौधों में उचित नमी बनाए रखें, प्रभावित पत्तियां हटाएं और अनावश्यक व्यापक-स्पेक्ट्रम कीटनाशकों से बचें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस टमाटर में स्पाइडर माइट्स के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU विकल्प: wettable sulphur 50 WP — 2 ग्राम/लीटर पानी। केवल माइट्स मौजूद होने पर और वर्तमान लेबल के अनुसार उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांच्या खालच्या बाजूस बारीक जाळे आणि कांस्य रंग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "पिकात योग्य ओलावा राखा, जास्त बाधित पाने काढा आणि अनावश्यक व्यापक-स्पेक्ट्रम कीटकनाशके टाळा."
      ],
      "biological": [
        "उपलब्ध असल्यास या टोमॅटोतील कोळी कीड साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU पर्याय: wettable sulphur 50 WP — 2 ग्रॅम/लिटर पाणी. कोळी कीड उपस्थित असल्यासच आणि सध्याच्या लेबलनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Target_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for enlarging target-like leaf lesions."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian dose added here; use only an approved tomato target-spot fungicide according to the current label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "बढ़ते हुए लक्ष्य जैसे गोल धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस टमाटर में टार्गेट स्पॉट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "वाढणारे लक्ष्याकार गोल डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या टोमॅटोतील टार्गेट स्पॉट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Leaf_Curl_Virus": {
    "en": {
      "monitoring": [
        "Scout regularly for curling, yellowing and stunted young leaves."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this viral disease where available."
      ],
      "chemical": [
        "No curative pesticide for the virus. Manage the whitefly vector only when present using a currently approved product and label directions."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्तियों का मुड़ना, पीलापन और नई वृद्धि का रुकना की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, स्थानीय रूप से अनुशंसित जैविक व वाहक-प्रबंधन उपाय अपनाएं।"
      ],
      "chemical": [
        "इस वायरस का कोई उपचारात्मक रासायनिक उपचार नहीं है। केवल लक्षित कीट/वाहक मौजूद होने पर उसके लिए वर्तमान में स्वीकृत नियंत्रण विकल्प और लेबल निर्देश देखें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पाने कुरळे होणे, पिवळेपणा आणि नवीन वाढ खुंटणे साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास स्थानिक शिफारसीनुसार जैविक व वाहक-व्यवस्थापन उपायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या विषाणूवर उपचार करणारा प्रभावी रासायनिक उपचार नाही. लक्ष्यित कीड/वाहक उपस्थित असल्यासच त्यासाठी सध्याचे मान्य नियंत्रण पर्याय आणि लेबल सूचना वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Mosaic_Virus": {
    "en": {
      "monitoring": [
        "Scout regularly for mosaic pattern and distorted growth."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this viral disease where available."
      ],
      "chemical": [
        "No curative chemical treatment for established virus infection. Do not spray pesticide unless a target vector/pest is actually present."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "मोज़ेक पैटर्न और विकृत वृद्धि की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, स्थानीय रूप से अनुशंसित जैविक व वाहक-प्रबंधन उपाय अपनाएं।"
      ],
      "chemical": [
        "इस वायरस का कोई उपचारात्मक रासायनिक उपचार नहीं है। केवल लक्षित कीट/वाहक मौजूद होने पर उसके लिए वर्तमान में स्वीकृत नियंत्रण विकल्प और लेबल निर्देश देखें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "मोज़ेक नमुना आणि विकृत वाढ साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास स्थानिक शिफारसीनुसार जैविक व वाहक-व्यवस्थापन उपायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या विषाणूवर उपचार करणारा प्रभावी रासायनिक उपचार नाही. लक्ष्यित कीड/वाहक उपस्थित असल्यासच त्यासाठी सध्याचे मान्य नियंत्रण पर्याय आणि लेबल सूचना वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Tomato_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for unusual spots, pests or growth changes and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation. Apply crop-protection products only when a pest or disease is identified and treatment is justified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "असामान्य धब्बे, कीट या वृद्धि में बदलाव की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "असामान्य डाग, कीड किंवा वाढीतील बदल साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Potato_Early_Blight": {
    "en": {
      "monitoring": [
        "Scout regularly for brown spots with concentric rings on older leaves."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: mancozeb 75 WP 1.5–2.0 kg/ha is listed by TNAU for potato blight management. Verify the current product label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पुरानी पत्तियों पर छल्लेदार भूरे धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस आलू में अगेती झुलसा के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU मार्गदर्शन: mancozeb 75 WP — 1.5–2.0 किग्रा/हेक्टेयर। वर्तमान उत्पाद लेबल सत्यापित करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "जुन्या पानांवर वलय असलेले तपकिरी डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या बटाट्यातील अर्ली ब्लाइट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU मार्गदर्शन: mancozeb 75 WP — 1.5–2.0 किलो/हेक्टर. सध्याचे उत्पादन लेबल तपासा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Potato_Late_Blight": {
    "en": {
      "monitoring": [
        "Scout regularly for dark water-soaked lesions and rapid spread."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: TNAU lists mancozeb 75 WP 1.5–2.0 kg/ha and other blight-management options. Use current label directions."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "गहरे पानी जैसे धब्बे और तेजी से फैलाव की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस आलू में पछेती झुलसा के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU विकल्प: mancozeb 75 WP — 1.5–2.0 किग्रा/हेक्टेयर। केवल वर्तमान लेबल के अनुसार उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "गडद पाण्यासारखे डाग आणि जलद फैलाव साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या बटाट्यातील उशिरा करपा साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU पर्याय: mancozeb 75 WP — 1.5–2.0 किलो/हेक्टर. फक्त सध्याच्या लेबलनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Potato_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for leaf spots, discoloration, wilting or unusual growth and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्तियों पर धब्बे, रंग बदलना, मुरझाना या असामान्य वृद्धि की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांवरील डाग, रंग बदलणे, कोमेजणे किंवा असामान्य वाढ साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Maize_Cercospora_Gray_Leaf_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for gray/tan rectangular lesions."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian dose added here. Use only a locally approved maize fungicide according to the current label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "धूसर/भूरे आयताकार धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस मक्का में सर्कोस्पोरा/ग्रे लीफ स्पॉट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "करडे/तपकिरी आयताकार डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या मक्यातील सर्कोस्पोरा/ग्रे लीफ स्पॉट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Maize_Common_Rust": {
    "en": {
      "monitoring": [
        "Scout regularly for reddish-brown rust pustules."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: kresoxim-methyl 44.3% SC 1 ml/L or tebuconazole 1 ml/L (TNAU). Use current registered-label directions."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "लाल-भूरे रतुआ के उभार की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस मक्का में कॉमन रस्ट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU विकल्प: kresoxim-methyl 44.3% SC — 1 मिली/लीटर या tebuconazole — 1 मिली/लीटर। वर्तमान पंजीकृत लेबल के अनुसार उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लाल-तपकिरी तांबेरा उभार साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या मक्यातील कॉमन रस्ट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU पर्याय: kresoxim-methyl 44.3% SC — 1 मिली/लिटर किंवा tebuconazole — 1 मिली/लिटर. सध्याच्या नोंदणीकृत लेबलनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Maize_Northern_Leaf_Blight": {
    "en": {
      "monitoring": [
        "Scout regularly for long cigar-shaped gray-green/brown lesions."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: propiconazole 25% EC 1 ml/L or mancozeb/zineb 2–4 g/L are listed by TNAU. Check current label/registration."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "लंबे सिगार जैसे धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस मक्का में नॉर्दर्न लीफ ब्लाइट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU विकल्प: propiconazole 25% EC — 1 मिली/लीटर या mancozeb/zineb — 2–4 ग्राम/लीटर। वर्तमान लेबल/पंजीकरण जांचें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लांब सिगारसारखे डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या मक्यातील नॉर्दर्न लीफ ब्लाइट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU पर्याय: propiconazole 25% EC — 1 मिली/लिटर किंवा mancozeb/zineb — 2–4 ग्रॅम/लिटर. सध्याचे लेबल/नोंदणी तपासा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Maize_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for spots, rust, pests or unusual growth and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "धब्बे, रतुआ, कीट या असामान्य वृद्धि की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "डाग, तांबेरा, कीड किंवा असामान्य वाढ साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Apple_Scab": {
    "en": {
      "monitoring": [
        "Scout regularly for olive-brown velvety leaf/fruit lesions."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Verified: TNAU lists Captan 300 g/100 L or Mancozeb 400 g/100 L at silver-tip/green-tip stage; later stages have additional rates. Use current label and crop-stage guidance."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "जैतूनी-भूरे मखमली धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस सेब में स्कैब के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "सत्यापित TNAU चरण-आधारित विकल्प: silver-tip/green-tip चरण पर Captan — 300 ग्राम/100 लीटर या Mancozeb — 400 ग्राम/100 लीटर। वर्तमान लेबल और स्थानीय चरण-आधारित सलाह का पालन करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "ऑलिव्ह-तपकिरी मखमली डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या सफरचंदातील स्कॅब साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "सत्यापित TNAU टप्पानुसार पर्याय: silver-tip/green-tip टप्प्यावर Captan — 300 ग्रॅम/100 लिटर किंवा Mancozeb — 400 ग्रॅम/100 लिटर. सध्याचे लेबल व स्थानिक टप्पानुसार सल्ला पाळा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Apple_Black_Rot": {
    "en": {
      "monitoring": [
        "Scout regularly for purple/brown leaf spots and fruit rot."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Published TNAU guidance: Ziram 80 WP 0.02%, Ziram 27 WP 0.6%, or Captan 50 WP 0.2%. Verify current registration/label before use."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "बैंगनी/भूरे धब्बे, कैंकर और फल सड़ना की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस सेब में ब्लैक रॉट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "प्रकाशित TNAU मार्गदर्शन: Ziram 80 WP — 0.02%, Ziram 27 WP — 0.6% या Captan 50 WP — 0.2%। उपयोग से पहले वर्तमान पंजीकरण/लेबल सत्यापित करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "जांभळे/तपकिरी डाग, कॅंकर आणि फळांची सड साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या सफरचंदातील ब्लॅक रॉट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "प्रकाशित TNAU मार्गदर्शन: Ziram 80 WP — 0.02%, Ziram 27 WP — 0.6% किंवा Captan 50 WP — 0.2%. वापरण्यापूर्वी सध्याचे नोंदणी/लेबल तपासा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Apple_Cedar_Rust": {
    "en": {
      "monitoring": [
        "Scout regularly for yellow-orange rust lesions on leaves/fruit."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian pesticide rate located for this specific apple disease; rely on current local horticulture advisory and label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पीले-नारंगी रतुआ जैसे धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस सेब में सीडर एप्पल रस्ट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पिवळे-नारिंगी तांबेरासारखे डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या सफरचंदातील सीडर अॅपल रस्ट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Apple_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for spots, rust, cankers or fruit lesions and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "धब्बे, रतुआ, कैंकर या फल की असामान्यता की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "डाग, तांबेरा, कॅंकर किंवा फळातील असामान्यता साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Cherry_Powdery_Mildew": {
    "en": {
      "monitoring": [
        "Scout regularly for white powdery growth."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian cherry-specific dose located; do not copy peach rates into cherry. Use a currently approved cherry product if locally recommended."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्तियों/नई टहनियों पर सफेद चूर्ण जैसी वृद्धि की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस चेरी में पाउडरी मिल्ड्यू के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांवर/नवीन फांद्यांवर पांढरी पावडरी वाढ साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या चेरीतील भुरी रोग साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Cherry_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for leaf discoloration, mildew or fruit abnormalities and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "बुरशी, धब्बे, कीट या फल की असामान्यता की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "बुरशी, डाग, कीड किंवा फळातील असामान्यता साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Grape_Black_Rot": {
    "en": {
      "monitoring": [
        "Scout regularly for dark/sunken berry lesions and leaf spots."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian dose located specifically for grape black rot in the reviewed source set; use a locally approved grape fungicide only if recommended."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "गहरे धब्बे और फलों पर सड़न की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस अंगूर में ब्लैक रॉट के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "गडद डाग आणि फळांवर सड साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या द्राक्षातील ब्लॅक रॉट साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Grape_Esca": {
    "en": {
      "monitoring": [
        "Scout regularly for leaf striping, tiger-striping and wood symptoms."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal trunk disease where available."
      ],
      "chemical": [
        "No verified current curative pesticide rate added; sanitation, removal of affected wood and local vineyard guidance are preferred."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्तियों पर धारियां तथा तने/लकड़ी से जुड़े लक्षण की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस अंगूर में एस्का के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांवरील पट्टे आणि खोड/लाकडाशी संबंधित लक्षणे साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या द्राक्षातील एस्का साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Grape_Isariopsis_Leaf_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for dark leaf spots."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "Published TNAU guidance for black leaf spot/Isariopsis: carbendazim 1 g/L, chlorothalonil 2 g/L, or propiconazole/difenoconazole 1 g/L, twice 15 days apart. Verify current label/registration."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्तियों पर गहरे धब्बे की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस अंगूर में इसारिओप्सिस पत्ती धब्बा के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "प्रकाशित TNAU मार्गदर्शन: Carbendazim — 1 ग्राम/लीटर, Chlorothalonil — 2 ग्राम/लीटर या Propiconazole/Difenoconazole — 1 ग्राम/लीटर; लक्षण आने के 15 दिन के अंतर पर दो बार। वर्तमान पंजीकरण/लेबल सत्यापित करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांवरील गडद डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या द्राक्षातील इसारिओप्सिस पानावरील डाग साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "प्रकाशित TNAU मार्गदर्शन: Carbendazim — 1 ग्रॅम/लिटर, Chlorothalonil — 2 ग्रॅम/लिटर किंवा Propiconazole/Difenoconazole — 1 ग्रॅम/लिटर; लक्षणे दिसल्यापासून 15 दिवसांच्या अंतराने दोनदा. सध्याचे नोंदणी/लेबल तपासा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Grape_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for leaf spots, mildew, pests or fruit abnormalities and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्ती धब्बे, बुरशी, कीट या फल की असामान्यता की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांवरील डाग, बुरशी, कीड किंवा फळातील असामान्यता साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Peach_Bacterial_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for small angular lesions and possible fruit spotting."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this bacterial disease where available."
      ],
      "chemical": [
        "No verified current Indian peach-specific dose for bacterial spot located in the reviewed sources. Copper-based dormant protection is mentioned for related Prunus bacterial/canker management, but do not show it as a disease-specific dose for this diagnosis."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "छोटे कोणीय धब्बे और फलों पर दाग की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "प्रभावित पत्तियां/फल/लकड़ी जहां संभव हो हटाएं, बाग की स्वच्छता रखें और उचित वायु संचार बनाए रखें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस जीवाणुजनित समस्या के लिए स्थानीय रूप से अनुशंसित जैविक/प्रतिरोधी प्रबंधन अपनाएं।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान स्वीकृत लेबल के अनुसार उपचार करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लहान कोनीय डाग आणि फळांवरील डाग साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित पाने/फळे/लाकूड शक्य असल्यास काढा, बागेची स्वच्छता राखा आणि योग्य वायुवीजन ठेवा."
      ],
      "biological": [
        "उपलब्ध असल्यास या जिवाणूजन्य समस्येसाठी स्थानिक शिफारसीनुसार जैविक/प्रतिरोधक व्यवस्थापन वापरा."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्याच्या मान्य लेबलनुसार उपचार करा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Peach_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for leaf curl, spots or fruit abnormalities and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्ती धब्बे, कीट या फल की असामान्यता की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानांवरील डाग, कीड किंवा फळातील असामान्यता साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Bell_Pepper_Bacterial_Spot": {
    "en": {
      "monitoring": [
        "Scout regularly for small dark/water-soaked spots and yellowing."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this bacterial disease where available."
      ],
      "chemical": [
        "No verified current bell-pepper-specific dose added here. Use only a currently approved bacterial-disease product for capsicum/pepper according to its label."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "छोटे गहरे/पानी जैसे धब्बे और पीलापन की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस जीवाणुजनित समस्या के लिए स्थानीय रूप से अनुशंसित जैविक/प्रतिरोधी प्रबंधन अपनाएं।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान स्वीकृत लेबल के अनुसार उपचार करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लहान गडद/पाण्यासारखे डाग आणि पिवळेपणा साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या जिवाणूजन्य समस्येसाठी स्थानिक शिफारसीनुसार जैविक/प्रतिरोधक व्यवस्थापन वापरा."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्याच्या मान्य लेबलनुसार उपचार करा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Bell_Pepper_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for spots, pests, wilting or unusual growth and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "धब्बे, कीट, मुरझाना या असामान्य वृद्धि की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "डाग, कीड, कोमेजणे किंवा असामान्य वाढ साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  },
  "Strawberry_Leaf_Scorch": {
    "en": {
      "monitoring": [
        "Scout regularly for reddish-purple spots and scorched leaf tissue."
      ],
      "cultural": [
        "Remove severely affected material where practical; improve sanitation and avoid conditions that prolong leaf wetness when relevant."
      ],
      "biological": [
        "Use locally recommended biological options for this fungal disease where available."
      ],
      "chemical": [
        "No verified current Indian strawberry-specific dose located in the reviewed source set. Use local horticulture guidance and current product label if treatment is justified."
      ],
      "safety": [
        "Follow the current product label, approved dose, PHI/re-entry requirements and required PPE."
      ]
    },
    "hi": {
      "monitoring": [
        "लाल-बैंगनी धब्बे और जले हुए पत्ते जैसे लक्षण की नियमित जांच करें, खासकर अनुकूल मौसम में."
      ],
      "cultural": [
        "संक्रमित हिस्से हटाएं, स्वच्छता बनाए रखें और पत्तियों का लंबे समय तक गीला रहना कम करें।"
      ],
      "biological": [
        "जहां उपलब्ध हो, इस स्ट्रॉबेरी में लीफ स्कॉर्च के लिए स्थानीय रूप से अनुशंसित जैविक नियंत्रण विकल्पों को प्राथमिकता दें।"
      ],
      "chemical": [
        "इस रोग के लिए वर्तमान भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नहीं है। केवल वर्तमान में स्वीकृत उत्पाद और लेबल निर्देशों का उपयोग करें।"
      ],
      "safety": [
        "वर्तमान उत्पाद लेबल, स्वीकृत मात्रा, कटाई-पूर्व प्रतीक्षा अवधि/पुनःप्रवेश अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "लालसर-जांभळे डाग आणि जळल्यासारखी पाने साठी नियमित पाहणी करा, विशेषतः अनुकूल हवामानात."
      ],
      "cultural": [
        "बाधित भाग काढा, स्वच्छता राखा आणि पाने जास्त वेळ ओलसर राहणे कमी करा."
      ],
      "biological": [
        "उपलब्ध असल्यास या स्ट्रॉबेरीतील पान करपा साठी स्थानिक शिफारसीनुसार जैविक नियंत्रण पर्यायांना प्राधान्य द्या."
      ],
      "chemical": [
        "या रोगासाठी सध्याची भारत-विशिष्ट सत्यापित मात्रा उपलब्ध नाही. फक्त सध्या मान्य उत्पादन आणि लेबल सूचनांनुसार वापरा."
      ],
      "safety": [
        "सध्याचे उत्पादन लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी/पुन्हा प्रवेश कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
  "Strawberry_Healthy": {
    "en": {
      "monitoring": [
        "Inspect regularly for leaf scorch, spots, pests or abnormal growth and unexpected changes."
      ],
      "cultural": [
        "Maintain sanitation, balanced irrigation/nutrition, healthy planting material and good airflow where appropriate."
      ],
      "biological": [
        "No disease-specific biological control is needed while the crop is healthy."
      ],
      "chemical": [
        "No pesticide recommendation unless a pest or disease is identified."
      ],
      "safety": [
        "Do not spray crop-protection products unless a pest or disease is identified and treatment is justified."
      ]
    },
    "hi": {
      "monitoring": [
        "पत्ती करपा, धब्बे, कीट या असामान्य वृद्धि की नियमित जांच करें और असामान्य बदलाव दिखने पर ध्यान दें।"
      ],
      "cultural": [
        "स्वच्छता बनाए रखें, संतुलित सिंचाई व पोषण दें और स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      "biological": [
        "फसल स्वस्थ होने पर किसी रोग-विशिष्ट जैविक उपचार की आवश्यकता नहीं है।"
      ],
      "chemical": [
        "कोई रासायनिक उपचार अनुशंसित नहीं है। कीट या रोग की पहचान होने पर ही उपचार करें।"
      ],
      "safety": [
        "जब तक कीट या रोग की पुष्टि न हो, अनावश्यक फसल-सुरक्षा उत्पादों का छिड़काव न करें।"
      ]
    },
    "mr": {
      "monitoring": [
        "पानावरील करपा, डाग, कीड किंवा असामान्य वाढ साठी नियमित पाहणी करा आणि असामान्य बदल दिसल्यास लक्ष द्या."
      ],
      "cultural": [
        "शेत/बागेची स्वच्छता राखा, संतुलित सिंचन व पोषण द्या आणि निरोगी लागवड साहित्य वापरा."
      ],
      "biological": [
        "पीक निरोगी असल्यास रोग-विशिष्ट जैविक उपचाराची गरज नाही."
      ],
      "chemical": [
        "रासायनिक उपचाराची शिफारस नाही. कीड किंवा रोग ओळखल्यानंतरच उपचार करा."
      ],
      "safety": [
        "कीड किंवा रोगाची खात्री नसताना अनावश्यक पीक संरक्षण उत्पादनांची फवारणी करू नका."
      ]
    }
  }
};

function translateIPM(classKey, lang = "en") {
  const profile = IPM_PROFILES[classKey];

  if (!profile) {
    return null;
  }

  return profile[lang] || profile.en || null;
}


// ============================================================
// MODEL LABEL → INTERNAL CLASS KEY
// ============================================================

const MODEL_LABEL_MAP = {
  // APPLE
  "Apple Scab": "Apple_Scab",
  "Apple with Black Rot": "Apple_Black_Rot",
  "Cedar Apple Rust": "Apple_Cedar_Rust",
  "Healthy Apple": "Apple_Healthy",

  // CHERRY
  "Cherry with Powdery Mildew": "Cherry_Powdery_Mildew",
  "Healthy Cherry Plant": "Cherry_Healthy",

  // MAIZE
  "Corn (Maize) with Cercospora and Gray Leaf Spot":
    "Maize_Cercospora_Gray_Leaf_Spot",
  "Corn (Maize) with Common Rust": "Maize_Common_Rust",
  "Corn (Maize) with Northern Leaf Blight":
    "Maize_Northern_Leaf_Blight",
  "Healthy Corn (Maize) Plant": "Maize_Healthy",

  // GRAPE
  "Grape with Black Rot": "Grape_Black_Rot",
  "Grape with Esca (Black Measles)": "Grape_Esca",
  "Grape with Isariopsis Leaf Spot":
    "Grape_Isariopsis_Leaf_Spot",
  "Healthy Grape Plant": "Grape_Healthy",

  // PEACH
  "Peach with Bacterial Spot": "Peach_Bacterial_Spot",
  "Healthy Peach Plant": "Peach_Healthy",

  // BELL PEPPER
  "Bell Pepper with Bacterial Spot":
    "Bell_Pepper_Bacterial_Spot",
  "Healthy Bell Pepper Plant": "Bell_Pepper_Healthy",

  // POTATO
  "Potato with Early Blight": "Potato_Early_Blight",
  "Potato with Late Blight": "Potato_Late_Blight",
  "Healthy Potato Plant": "Potato_Healthy",

  // STRAWBERRY
  "Strawberry with Leaf Scorch": "Strawberry_Leaf_Scorch",
  "Healthy Strawberry Plant": "Strawberry_Healthy",

  // TOMATO
  "Tomato with Bacterial Spot": "Tomato_Bacterial_Spot",
  "Tomato with Early Blight": "Tomato_Early_Blight",
  "Tomato with Late Blight": "Tomato_Late_Blight",
  "Tomato with Leaf Mold": "Tomato_Leaf_Mold",
  "Tomato with Septoria Leaf Spot":
    "Tomato_Septoria_Leaf_Spot",
  "Tomato with Spider Mites or Two-spotted Spider Mite":
    "Tomato_Spider_Mites",
  "Tomato with Target Spot": "Tomato_Target_Spot",
  "Tomato Yellow Leaf Curl Virus":
    "Tomato_Leaf_Curl_Virus",
  "Tomato Mosaic Virus": "Tomato_Mosaic_Virus",
  "Healthy Tomato Plant": "Tomato_Healthy"
};


// ============================================================
// DETECT DISEASE
// ============================================================

async function detectDiseaseClass(
  imageBuffer,
  contentType = "image/jpeg",
  crop = "tomato"
) {
  if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
    throw new Error("Invalid image buffer");
  }

  const aiServiceUrl = process.env.AI_SERVICE_URL;

  if (!aiServiceUrl) {
    throw new Error("AI_SERVICE_URL is not configured");
  }

  const formData = new FormData();

  const blob = new Blob(
    [imageBuffer],
    {
      type: contentType,
    }
  );

  formData.append(
    "file",
    blob,
    "scan.jpg"
  );

  formData.append(
    "crop",
    crop
  );

  const response = await fetch(
    `${aiServiceUrl}/predict`,
    {
      method: "POST",
      body: formData,
    }
  );

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `AI service returned invalid response: ${text}`
    );
  }

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      `AI service error: ${response.status}`
    );
  }

return {
  classKey: MODEL_LABEL_MAP[data.disease] || null,
  modelLabel: data.disease,
  confidence: data.confidence,
  crop: data.crop,
  predictedCrop: data.predicted_crop,
  cropMatch: data.crop_match,
  topPredictions: data.top_predictions || [],
  overallPredictions: data.overall_predictions || [],
};
}




function translateProfile(
  classKey,
  lang = "en",
  modelConfidence = null
) {
  const profile = DISEASE_PROFILES.find(
    (item) => item.classKey === classKey
  );

  if (!profile) {
    console.warn(
      `No disease profile found for classKey: ${classKey}`
    );

    return null;
  }

const ipm =
  translateIPM(classKey, lang) ||
  profile.ipm ||
  null;

  return {
    crop: profile.crop,
    disease: profile.disease,
    severity: profile.severity,
    severityPercent: profile.severityPercent,

    confidence:
      modelConfidence !== null
        ? modelConfidence
        : profile.confidence,

    recommendation: profile.recommendation,

    ipm
  };
}


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  detectDiseaseClass,
  translateProfile,
  translateIPM,
  DISEASE_PROFILES,
  IPM_PROFILES,
  MODEL_LABEL_MAP
};