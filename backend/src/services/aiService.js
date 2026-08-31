

const DISEASE_PROFILES = [
  {
    classKey: "Tomato_Early_Blight",
    crop: { en: "Tomato", hi: "टमाटर", mr: "टोमॅटो" },
    disease: {
      en: "Early Blight",
      hi: "अगेती झुलसा",
      mr: "लवकर करपा",
    },
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
    classKey: "Tomato_Leaf_Curl_Virus",
    crop: { en: "Tomato", hi: "टमाटर", mr: "टोमॅटो" },
    disease: {
      en: "Leaf Curl Virus",
      hi: "पत्ती मरोड़ वायरस",
      mr: "पान कुरळी विषाणू",
    },
    severity: "High",
    severityPercent: 84,
    confidence: 88,
    recommendation: {
      en: "Isolate affected plants immediately, spray neem oil to control whitefly. Contact your local Krishi Vigyan Kendra for severe cases.",
      hi: "प्रभावित पौधों को तुरंत अलग करें, सफेद मक्खी नियंत्रण के लिए नीम तेल स्प्रे करें। गंभीर मामलों में कृषि विज्ञान केंद्र से संपर्क करें।",
      mr: "प्रभावित रोपे लगेच वेगळी करा, पांढरी माशी नियंत्रणासाठी निंबोळी तेल फवारणी करा. गंभीर प्रकरणांमध्ये कृषि विज्ञान केंद्राशी संपर्क साधा.",
    },
  },

  {
    classKey: "Wheat_Healthy",
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
    classKey: "Potato_Late_Blight",
    crop: { en: "Potato", hi: "आलू", mr: "बटाटा" },
    disease: { en: "Late Blight", hi: "पछेती झुलसा", mr: "उशिरा करपा" },
    severity: "High",
    severityPercent: 78,
    confidence: 89,
    recommendation: {
  en: "Follow the IPM recommendations below, monitor disease spread closely, and use only locally approved treatment options when intervention is justified.",

  hi: "नीचे दी गई IPM सलाह का पालन करें, रोग के फैलाव की नियमित निगरानी करें और उपचार आवश्यक होने पर केवल स्थानीय रूप से स्वीकृत विकल्पों का उपयोग करें।",

  mr: "खालील IPM शिफारसींचे पालन करा, रोगाचा प्रसार नियमितपणे तपासा आणि उपचाराची गरज असल्यास केवळ स्थानिक मान्य पर्यायांचा वापर करा.",
},
  },

  {
    classKey: "Cotton_Bacterial_Blight",
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
  {
  classKey: "Potato_Early_Blight",

  crop: {
    en: "Potato",
    hi: "आलू",
    mr: "बटाटा",
  },

  disease: {
    en: "Early Blight",
    hi: "अगेती झुलसा",
    mr: "लवकर करपा",
  },

  severity: "Medium",
  severityPercent: 58,
  confidence: 89,

  recommendation: {
    en: "Remove severely affected leaves, avoid overhead irrigation, and maintain good field sanitation. Follow locally approved disease-management guidance if treatment is required.",

    hi: "बहुत अधिक प्रभावित पत्तियों को हटाएं, ऊपर से पानी देने से बचें और खेत की स्वच्छता बनाए रखें। आवश्यकता होने पर स्थानीय रूप से स्वीकृत रोग-प्रबंधन सलाह का पालन करें।",

    mr: "जास्त बाधित पाने काढून टाका, पानांवरून पाणी देणे टाळा आणि शेताची स्वच्छता राखा. उपचाराची गरज असल्यास स्थानिक मान्य रोग व्यवस्थापन सल्ल्याचे पालन करा.",
  },
},

{
  classKey: "Potato_Healthy",

  crop: {
    en: "Potato",
    hi: "आलू",
    mr: "बटाटा",
  },

  disease: {
    en: "Healthy",
    hi: "स्वस्थ",
    mr: "निरोगी",
  },

  severity: "Low",
  severityPercent: 8,
  confidence: 95,

  recommendation: {
    en: "No major disease signs detected. Continue regular scouting, maintain field sanitation, and monitor the crop regularly.",

    hi: "रोग के कोई प्रमुख लक्षण नहीं पाए गए। नियमित निरीक्षण जारी रखें, खेत की स्वच्छता बनाए रखें और फसल की निगरानी करते रहें।",

    mr: "रोगाची ठळक लक्षणे आढळली नाहीत. नियमित पाहणी सुरू ठेवा, शेताची स्वच्छता राखा आणि पिकाचे नियमित निरीक्षण करा.",
  },
},
];

const ADDITIONAL_PROFILES = [
    
  // =====================================================
  // TOMATO
  // =====================================================

  {
    classKey: "Tomato_Bacterial_Spot",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Bacterial Spot",
      hi: "जीवाणु धब्बा",
      mr: "जिवाणू ठिपका",
    },
    severity: "Medium",
    severityPercent: 55,
    recommendation: {
      en: "Remove severely affected leaves, maintain field sanitation, avoid prolonged leaf wetness, and follow locally approved disease-management guidance.",
      hi: "अधिक प्रभावित पत्तियां हटाएं, खेत की स्वच्छता बनाए रखें, पत्तियों को लंबे समय तक गीला रहने से बचाएं और स्थानीय रूप से स्वीकृत रोग प्रबंधन सलाह का पालन करें।",
      mr: "जास्त बाधित पाने काढून टाका, शेताची स्वच्छता राखा, पाने जास्त वेळ ओलसर राहू देऊ नका आणि स्थानिक मान्य रोग व्यवस्थापन सल्ल्याचे पालन करा.",
    },
  },

  {
    classKey: "Tomato_Late_Blight",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Late Blight",
      hi: "पछेती झुलसा",
      mr: "उशिरा करपा",
    },
    severity: "High",
    severityPercent: 80,
    recommendation: {
      en: "Inspect plants frequently, remove severely affected material where practical, reduce prolonged leaf wetness, and use locally approved disease-management options when treatment is justified.",
      hi: "पौधों की नियमित जांच करें, जहां संभव हो गंभीर रूप से प्रभावित हिस्से हटाएं, पत्तियों के लंबे समय तक गीले रहने को कम करें और उपचार आवश्यक होने पर स्थानीय रूप से स्वीकृत विकल्पों का उपयोग करें।",
      mr: "पिकाची नियमित पाहणी करा, शक्य असल्यास जास्त बाधित भाग काढून टाका, पाने जास्त वेळ ओलसर राहणे कमी करा आणि उपचार आवश्यक असल्यास स्थानिक मान्य पर्याय वापरा.",
    },
  },

  {
    classKey: "Tomato_Leaf_Mold",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Leaf Mold",
      hi: "पत्ती फफूंदी",
      mr: "पानांवरील बुरशी",
    },
    severity: "Medium",
    severityPercent: 50,
    recommendation: {
      en: "Improve ventilation, reduce prolonged leaf wetness, remove severely affected leaves where practical, and follow locally approved disease-management guidance.",
      hi: "वेंटिलेशन बेहतर करें, पत्तियों के लंबे समय तक गीले रहने को कम करें, जहां संभव हो प्रभावित पत्तियां हटाएं और स्थानीय रोग प्रबंधन सलाह का पालन करें।",
      mr: "वायुवीजन सुधारित करा, पाने जास्त वेळ ओलसर राहू देऊ नका, शक्य असल्यास बाधित पाने काढून टाका आणि स्थानिक रोग व्यवस्थापन सल्ल्याचे पालन करा.",
    },
  },

  {
    classKey: "Tomato_Septoria_Leaf_Spot",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Septoria Leaf Spot",
      hi: "सेप्टोरिया पत्ती धब्बा",
      mr: "सेप्टोरिया पानावरील ठिपका",
    },
    severity: "Medium",
    severityPercent: 55,
    recommendation: {
      en: "Remove severely affected lower leaves where practical, maintain field sanitation, avoid overhead irrigation, and follow locally approved disease-management guidance.",
      hi: "जहां संभव हो गंभीर रूप से प्रभावित निचली पत्तियां हटाएं, खेत की स्वच्छता बनाए रखें, ऊपर से सिंचाई से बचें और स्थानीय रोग प्रबंधन सलाह का पालन करें।",
      mr: "शक्य असल्यास जास्त बाधित खालची पाने काढून टाका, शेताची स्वच्छता राखा, वरून सिंचन टाळा आणि स्थानिक रोग व्यवस्थापन सल्ल्याचे पालन करा.",
    },
  },

  {
    classKey: "Tomato_Spider_Mites",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Spider Mites",
      hi: "स्पाइडर माइट्स",
      mr: "कोळी कीड",
    },
    severity: "Medium",
    severityPercent: 55,
    recommendation: {
      en: "Inspect the undersides of leaves for mite activity and webbing, reduce plant stress, and use locally approved pest-management options when treatment is justified.",
      hi: "पत्तियों की निचली सतह पर माइट्स और जाले देखें, पौधों का तनाव कम करें और उपचार आवश्यक होने पर स्थानीय रूप से स्वीकृत कीट प्रबंधन विकल्पों का उपयोग करें।",
      mr: "पानांच्या खालच्या बाजूस कोळी किडीची हालचाल व जाळी तपासा, झाडावरील ताण कमी करा आणि उपचार आवश्यक असल्यास स्थानिक मान्य कीड व्यवस्थापन पर्याय वापरा.",
    },
  },

  {
    classKey: "Tomato_Target_Spot",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Target Spot",
      hi: "टारगेट स्पॉट",
      mr: "टार्गेट स्पॉट",
    },
    severity: "Medium",
    severityPercent: 55,
    recommendation: {
      en: "Scout regularly for expanding leaf lesions, remove severely affected material where practical, maintain sanitation, and use locally approved disease-management options when justified.",
      hi: "फैलते हुए पत्ती धब्बों के लिए नियमित निगरानी करें, जहां संभव हो गंभीर रूप से प्रभावित हिस्से हटाएं, स्वच्छता बनाए रखें और आवश्यकता होने पर स्थानीय रूप से स्वीकृत विकल्पों का उपयोग करें।",
      mr: "पानांवरील वाढणाऱ्या डागांसाठी नियमित पाहणी करा, शक्य असल्यास जास्त बाधित भाग काढून टाका, स्वच्छता राखा आणि गरज असल्यास स्थानिक मान्य पर्याय वापरा.",
    },
  },

  {
    classKey: "Tomato_Mosaic_Virus",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Mosaic Virus",
      hi: "मोज़ेक वायरस",
      mr: "मोझॅक विषाणू",
    },
    severity: "High",
    severityPercent: 75,
    recommendation: {
      en: "Remove severely affected plants where practical, use healthy planting material, control potential vectors, and avoid spreading plant sap between plants.",
      hi: "जहां संभव हो गंभीर रूप से प्रभावित पौधों को हटाएं, स्वस्थ रोपण सामग्री का उपयोग करें, संभावित वाहकों को नियंत्रित करें और पौधों के बीच संक्रमित रस के प्रसार से बचें।",
      mr: "शक्य असल्यास जास्त बाधित झाडे काढून टाका, निरोगी लागवड साहित्य वापरा, संभाव्य वाहक कीटकांचे नियंत्रण करा आणि झाडांमध्ये संक्रमित रसाचा प्रसार टाळा.",
    },
  },

  {
    classKey: "Tomato_Healthy",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो",
    },
    disease: {
      en: "Healthy",
      hi: "स्वस्थ",
      mr: "निरोगी",
    },
    severity: "Low",
    severityPercent: 5,
    recommendation: {
      en: "No major disease signs detected. Continue regular scouting, maintain field sanitation and monitor the crop regularly.",
      hi: "रोग के कोई प्रमुख लक्षण नहीं पाए गए। नियमित निरीक्षण जारी रखें, खेत की स्वच्छता बनाए रखें और फसल की निगरानी करते रहें।",
      mr: "रोगाची ठळक लक्षणे आढळली नाहीत. नियमित पाहणी सुरू ठेवा, शेताची स्वच्छता राखा आणि पिकाचे नियमित निरीक्षण करा.",
    },
  },

  // =====================================================
  // MAIZE
  // =====================================================

  {
    classKey: "Maize_Cercospora_Gray_Leaf_Spot",
    crop: {
      en: "Maize",
      hi: "मक्का",
      mr: "मका",
    },
    disease: {
      en: "Cercospora and Gray Leaf Spot",
      hi: "सर्कोस्पोरा और ग्रे लीफ स्पॉट",
      mr: "सर्कोस्पोरा व ग्रे लीफ स्पॉट",
    },
    severity: "Medium",
    severityPercent: 60,
    recommendation: {
      en: "Scout leaves regularly, maintain field sanitation, use appropriate crop rotation where practical, and follow locally approved disease-management guidance.",
      hi: "पत्तियों की नियमित जांच करें, खेत की स्वच्छता बनाए रखें, जहां संभव हो उचित फसल चक्र अपनाएं और स्थानीय रोग प्रबंधन सलाह का पालन करें।",
      mr: "पानांची नियमित पाहणी करा, शेताची स्वच्छता राखा, शक्य असल्यास योग्य पीक फेरपालट करा आणि स्थानिक रोग व्यवस्थापन सल्ल्याचे पालन करा.",
    },
  },

  {
    classKey: "Maize_Common_Rust",
    crop: {
      en: "Maize",
      hi: "मक्का",
      mr: "मका",
    },
    disease: {
      en: "Common Rust",
      hi: "कॉमन रस्ट",
      mr: "सामान्य तांबेरा",
    },
    severity: "Medium",
    severityPercent: 50,
    recommendation: {
      en: "Monitor leaves for rust pustules, use healthy seed, maintain good crop management, and follow locally approved disease-management guidance when intervention is justified.",
      hi: "पत्तियों पर रतुआ के लक्षणों की निगरानी करें, स्वस्थ बीज का उपयोग करें और आवश्यकता होने पर स्थानीय रोग प्रबंधन सलाह का पालन करें।",
      mr: "पानांवरील तांबेरा रोगाची लक्षणे तपासा, निरोगी बियाणे वापरा आणि गरज असल्यास स्थानिक रोग व्यवस्थापन सल्ल्याचे पालन करा.",
    },
  },

  {
    classKey: "Maize_Northern_Leaf_Blight",
    crop: {
      en: "Maize",
      hi: "मक्का",
      mr: "मका",
    },
    disease: {
      en: "Northern Leaf Blight",
      hi: "नॉर्दर्न लीफ ब्लाइट",
      mr: "नॉर्दर्न लीफ ब्लाइट",
    },
    severity: "High",
    severityPercent: 70,
    recommendation: {
      en: "Inspect leaves regularly for elongated lesions, maintain field sanitation, consider appropriate crop rotation, and use locally approved disease-management options when justified.",
      hi: "लंबे धब्बों के लिए पत्तियों की नियमित जांच करें, खेत की स्वच्छता बनाए रखें, उचित फसल चक्र अपनाएं और आवश्यकता होने पर स्थानीय रूप से स्वीकृत विकल्पों का उपयोग करें।",
      mr: "लांबट डागांसाठी पानांची नियमित पाहणी करा, शेताची स्वच्छता राखा, योग्य पीक फेरपालट करा आणि गरज असल्यास स्थानिक मान्य पर्याय वापरा.",
    },
  },

  {
    classKey: "Maize_Healthy",
    crop: {
      en: "Maize",
      hi: "मक्का",
      mr: "मका",
    },
    disease: {
      en: "Healthy",
      hi: "स्वस्थ",
      mr: "निरोगी",
    },
    severity: "Low",
    severityPercent: 5,
    recommendation: {
      en: "No major disease signs detected. Continue regular scouting, maintain field sanitation and monitor crop growth.",
      hi: "रोग के कोई प्रमुख लक्षण नहीं पाए गए। नियमित निरीक्षण जारी रखें, खेत की स्वच्छता बनाए रखें और फसल की वृद्धि की निगरानी करें।",
      mr: "रोगाची ठळक लक्षणे आढळली नाहीत. नियमित पाहणी सुरू ठेवा, शेताची स्वच्छता राखा आणि पिकाच्या वाढीवर लक्ष ठेवा.",
    },
  },
]
  DISEASE_PROFILES.push(...ADDITIONAL_PROFILES);
  
const IPM_PROFILES = {
  Tomato_Early_Blight: {
    en: {
      monitoring: [
        "Scout lower leaves regularly for dark spots and yellowing.",
        "Pay closer attention after warm, humid or wet weather."
      ],
      cultural: [
        "Remove severely affected leaves where practical.",
        "Avoid prolonged leaf wetness and keep the field well ventilated.",
        "Maintain good field sanitation."
      ],
      biological: [
        "Prefer locally recommended biological disease-management options where available."
      ],
      chemical: [
        "Use a fungicide only when disease pressure justifies treatment and choose a locally approved product for the crop and disease."
      ],
      safety: [
        "Follow the product label, approved dose, waiting period and required protective equipment."
      ]
    },

    hi: {
      monitoring: [
        "निचली पत्तियों पर नियमित रूप से काले धब्बे और पीलापन देखें।",
        "गर्म, नम या बारिश वाले मौसम के बाद विशेष निगरानी करें।"
      ],
      cultural: [
        "जहां संभव हो, अधिक प्रभावित पत्तियों को हटाएं।",
        "पत्तियों के लंबे समय तक गीले रहने से बचें और खेत में अच्छा वेंटिलेशन रखें।",
        "खेत की स्वच्छता बनाए रखें।"
      ],
      biological: [
        "जहां उपलब्ध हो, स्थानीय रूप से अनुशंसित जैविक रोग प्रबंधन विकल्पों को प्राथमिकता दें।"
      ],
      chemical: [
        "उपचार की आवश्यकता होने पर ही फफूंदनाशक का उपयोग करें और फसल व रोग के लिए स्थानीय रूप से स्वीकृत उत्पाद चुनें।"
      ],
      safety: [
        "लेबल, स्वीकृत मात्रा, प्रतीक्षा अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },

    mr: {
      monitoring: [
        "खालच्या पानांवर काळे डाग आणि पिवळेपणा नियमितपणे तपासा.",
        "उष्ण, दमट किंवा पावसाळी हवामानानंतर अधिक काळजीपूर्वक पाहणी करा."
      ],
      cultural: [
        "शक्य असल्यास जास्त बाधित पाने काढून टाका.",
        "पानांवर दीर्घकाळ ओलावा राहू देऊ नका आणि शेतात चांगले वायुवीजन ठेवा.",
        "शेताची स्वच्छता राखा."
      ],
      biological: [
        "उपलब्ध असल्यास स्थानिक शिफारसीनुसार जैविक रोग व्यवस्थापन पर्यायांना प्राधान्य द्या."
      ],
      chemical: [
        "उपचाराची गरज असल्यासच बुरशीनाशक वापरा आणि पिकासाठी व रोगासाठी स्थानिक मान्य उत्पादन निवडा."
      ],
      safety: [
        "लेबल, मान्य मात्रा, प्रतीक्षा कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },

  Potato_Late_Blight: {
    en: {
      monitoring: [
        "Inspect leaves and stems frequently for dark lesions and rapid disease spread.",
        "Increase scouting after rainy, cool or humid conditions."
      ],
      cultural: [
        "Remove badly affected plant material where practical.",
        "Reduce prolonged leaf wetness and maintain field sanitation.",
        "Avoid unnecessary irrigation during wet conditions."
      ],
      biological: [
        "Use locally recommended biological or preventive disease-management options where suitable."
      ],
      chemical: [
        "When treatment is justified, use only a locally approved fungicide strategy appropriate for potato late blight."
      ],
      safety: [
        "Follow the product label, approved dose, pre-harvest interval and protective-equipment requirements."
      ]
    },

    hi: {
      monitoring: [
        "पत्तियों और तनों पर गहरे धब्बों तथा तेजी से फैलते रोग के लक्षणों की नियमित जांच करें।",
        "बारिश, ठंडे या नम मौसम के बाद अधिक निगरानी करें।"
      ],
      cultural: [
        "जहां संभव हो, बहुत अधिक प्रभावित पौधों के हिस्से हटा दें।",
        "पत्तियों के लंबे समय तक गीले रहने को कम करें और खेत की स्वच्छता बनाए रखें।",
        "गीली परिस्थितियों में अनावश्यक सिंचाई से बचें।"
      ],
      biological: [
        "जहां उपयुक्त हो, स्थानीय रूप से अनुशंसित जैविक या निवारक रोग-प्रबंधन विकल्पों का उपयोग करें।"
      ],
      chemical: [
        "जब उपचार आवश्यक हो, तभी आलू के पछेती झुलसा के लिए स्थानीय रूप से स्वीकृत फफूंदनाशक रणनीति अपनाएं।"
      ],
      safety: [
        "लेबल, स्वीकृत मात्रा, कटाई से पहले की प्रतीक्षा अवधि और सुरक्षा उपकरणों की आवश्यकताओं का पालन करें।"
      ]
    },

    mr: {
      monitoring: [
        "पाने आणि खोडांवर काळे डाग व रोगाचा जलद प्रसार यासाठी नियमित पाहणी करा.",
        "पाऊस, थंड किंवा दमट हवामानानंतर अधिक काळजीपूर्वक पाहणी करा."
      ],
      cultural: [
        "शक्य असल्यास जास्त बाधित वनस्पती भाग काढून टाका.",
        "पाने जास्त वेळ ओलसर राहू देऊ नका आणि शेताची स्वच्छता राखा.",
        "ओलसर परिस्थितीत अनावश्यक सिंचन टाळा."
      ],
      biological: [
        "योग्य असल्यास स्थानिक शिफारसीनुसार जैविक किंवा प्रतिबंधात्मक रोग व्यवस्थापन पर्याय वापरा."
      ],
      chemical: [
        "उपचार आवश्यक असल्यासच बटाट्याच्या उशिरा करप्यासाठी स्थानिक मान्य बुरशीनाशक व्यवस्थापन पद्धत वापरा."
      ],
      safety: [
        "लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },

  Tomato_Leaf_Curl_Virus: {
    en: {
      monitoring: [
        "Scout young leaves regularly for curling, yellowing and stunted growth.",
        "Check plants for whitefly activity."
      ],
      cultural: [
        "Remove severely affected plants where practical to reduce spread.",
        "Keep the field free from weeds that can support insect populations.",
        "Use healthy planting material."
      ],
      biological: [
        "Prefer locally recommended biological whitefly-management options where available."
      ],
      chemical: [
        "Use insect-control products only when justified and only those locally approved for the crop and target pest."
      ],
      safety: [
        "Follow the label, approved dose, re-entry requirements and protective-equipment instructions."
      ]
    },

    hi: {
      monitoring: [
        "नई पत्तियों में मरोड़, पीलापन और कमजोर वृद्धि की नियमित जांच करें।",
        "पौधों पर सफेद मक्खी की गतिविधि देखें।"
      ],
      cultural: [
        "जहां संभव हो, गंभीर रूप से प्रभावित पौधों को हटा दें।",
        "ऐसी खरपतवारों को नियंत्रित रखें जो कीटों को आश्रय दे सकती हैं।",
        "स्वस्थ रोपण सामग्री का उपयोग करें।"
      ],
      biological: [
        "जहां उपलब्ध हो, सफेद मक्खी नियंत्रण के स्थानीय अनुशंसित जैविक विकल्पों को प्राथमिकता दें।"
      ],
      chemical: [
        "कीट नियंत्रण उत्पाद का उपयोग तभी करें जब आवश्यक हो और फसल तथा लक्षित कीट के लिए स्थानीय रूप से स्वीकृत उत्पाद ही चुनें।"
      ],
      safety: [
        "लेबल, स्वीकृत मात्रा, पुनःप्रवेश अवधि और सुरक्षा उपकरण संबंधी निर्देशों का पालन करें।"
      ]
    },

    mr: {
      monitoring: [
        "नवीन पानांमध्ये कुरळेपणा, पिवळेपणा आणि खुंटलेली वाढ यासाठी नियमित पाहणी करा.",
        "पांढऱ्या माशीची हालचाल तपासा."
      ],
      cultural: [
        "शक्य असल्यास जास्त बाधित झाडे काढून टाका.",
        "कीटकांना आश्रय देणाऱ्या तणांचे नियंत्रण ठेवा.",
        "निरोगी लागवड साहित्य वापरा."
      ],
      biological: [
        "उपलब्ध असल्यास पांढऱ्या माशीच्या नियंत्रणासाठी स्थानिक शिफारसीनुसार जैविक पर्यायांना प्राधान्य द्या."
      ],
      chemical: [
        "कीटक नियंत्रणासाठी उपचाराची गरज असल्यासच स्थानिक मान्य आणि लक्ष्यित कीटकासाठी योग्य उत्पादन वापरा."
      ],
      safety: [
        "लेबल, मान्य मात्रा, पुन्हा प्रवेश कालावधी आणि सुरक्षा साधनांच्या सूचनांचे पालन करा."
      ]
    }
  },
    Potato_Early_Blight: {
    en: {
      monitoring: [
        "Inspect lower and older leaves regularly for dark brown spots and yellowing.",
        "Increase scouting during warm, humid or wet weather."
      ],
      cultural: [
        "Remove severely affected leaves where practical.",
        "Maintain good field sanitation and remove crop debris.",
        "Avoid prolonged leaf wetness and unnecessary overhead irrigation."
      ],
      biological: [
        "Prefer locally recommended biological disease-management options where available."
      ],
      chemical: [
        "When treatment is justified, use only a locally approved fungicide strategy appropriate for potato early blight."
      ],
      safety: [
        "Follow the product label, approved dose, pre-harvest interval and required protective equipment."
      ]
    },

    hi: {
      monitoring: [
        "पुरानी और निचली पत्तियों पर गहरे भूरे धब्बों और पीलापन की नियमित जांच करें।",
        "गर्म, नम या बारिश वाले मौसम में अधिक निगरानी करें।"
      ],
      cultural: [
        "जहां संभव हो, अधिक प्रभावित पत्तियों को हटा दें।",
        "खेत की स्वच्छता बनाए रखें और फसल के अवशेष हटाएं।",
        "पत्तियों के लंबे समय तक गीले रहने और अनावश्यक ऊपर से सिंचाई से बचें।"
      ],
      biological: [
        "जहां उपलब्ध हो, स्थानीय रूप से अनुशंसित जैविक रोग-प्रबंधन विकल्पों को प्राथमिकता दें।"
      ],
      chemical: [
        "जब उपचार आवश्यक हो, तभी आलू के अगेती झुलसा के लिए स्थानीय रूप से स्वीकृत फफूंदनाशक रणनीति अपनाएं।"
      ],
      safety: [
        "लेबल, स्वीकृत मात्रा, कटाई से पहले की प्रतीक्षा अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },

    mr: {
      monitoring: [
        "जुन्या आणि खालच्या पानांवर काळसर तपकिरी डाग व पिवळेपणा यासाठी नियमित पाहणी करा.",
        "उष्ण, दमट किंवा पावसाळी हवामानात अधिक काळजीपूर्वक पाहणी करा."
      ],
      cultural: [
        "शक्य असल्यास जास्त बाधित पाने काढून टाका.",
        "शेताची स्वच्छता राखा आणि पिकांचे अवशेष काढून टाका.",
        "पाने जास्त वेळ ओलसर राहणे आणि अनावश्यक वरून सिंचन करणे टाळा."
      ],
      biological: [
        "उपलब्ध असल्यास स्थानिक शिफारसीनुसार जैविक रोग व्यवस्थापन पर्यायांना प्राधान्य द्या."
      ],
      chemical: [
        "उपचार आवश्यक असल्यासच बटाट्याच्या लवकर करप्यासाठी स्थानिक मान्य बुरशीनाशक व्यवस्थापन पद्धत वापरा."
      ],
      safety: [
        "लेबल, मान्य मात्रा, काढणीपूर्व प्रतीक्षा कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },

  Potato_Healthy: {
    en: {
      monitoring: [
        "Continue regular scouting for leaf spots, discoloration, wilting or unusual plant growth.",
        "Monitor the crop more closely after prolonged wet or stressful weather."
      ],
      cultural: [
        "Maintain good field sanitation.",
        "Use healthy planting material and maintain appropriate irrigation.",
        "Remove unusual or severely damaged plant material where practical."
      ],
      biological: [],
      chemical: [],
      safety: [
        "Do not apply disease-control products unless a disease or pest problem is identified and treatment is justified."
      ]
    },

    hi: {
      monitoring: [
        "पत्तियों पर धब्बे, रंग में बदलाव, मुरझाना या असामान्य वृद्धि के लिए नियमित निरीक्षण जारी रखें।",
        "लंबे समय तक गीले या तनावपूर्ण मौसम के बाद फसल की अधिक निगरानी करें।"
      ],
      cultural: [
        "खेत की स्वच्छता बनाए रखें।",
        "स्वस्थ रोपण सामग्री का उपयोग करें और उचित सिंचाई बनाए रखें।",
        "जहां संभव हो, असामान्य या गंभीर रूप से क्षतिग्रस्त पौधों के हिस्सों को हटा दें।"
      ],
      biological: [],
      chemical: [],
      safety: [
        "जब तक किसी रोग या कीट की पहचान न हो और उपचार आवश्यक न हो, रोग-नियंत्रण उत्पादों का उपयोग न करें।"
      ]
    },

    mr: {
      monitoring: [
        "पानांवरील डाग, रंगातील बदल, कोमेजणे किंवा असामान्य वाढ यासाठी नियमित पाहणी सुरू ठेवा.",
        "दीर्घकाळ ओलसर किंवा प्रतिकूल हवामानानंतर पिकाची अधिक काळजीपूर्वक पाहणी करा."
      ],
      cultural: [
        "शेताची स्वच्छता राखा.",
        "निरोगी लागवड साहित्य वापरा आणि योग्य सिंचन ठेवा.",
        "शक्य असल्यास असामान्य किंवा जास्त नुकसान झालेल्या वनस्पतींचे भाग काढून टाका."
      ],
      biological: [],
      chemical: [],
      safety: [
        "रोग किंवा कीड ओळखली गेली नसेल आणि उपचाराची गरज नसेल तर रोगनियंत्रणासाठी उत्पादने वापरू नका."
      ]
    }
  },

  Wheat_Healthy: {
    en: {
      monitoring: [
        "Inspect the crop regularly for leaf spots, rust symptoms, discoloration and unusual growth.",
        "Increase scouting when weather conditions become favorable for disease development."
      ],
      cultural: [
        "Maintain good field sanitation.",
        "Use healthy seed and follow appropriate crop-management practices.",
        "Avoid unnecessary irrigation that keeps foliage wet for long periods."
      ],
      biological: [],
      chemical: [],
      safety: [
        "Use crop-protection products only when a problem is identified and treatment is justified."
      ]
    },

    hi: {
      monitoring: [
        "पत्तियों पर धब्बे, रतुआ के लक्षण, रंग में बदलाव और असामान्य वृद्धि की नियमित जांच करें।",
        "रोग के लिए अनुकूल मौसम होने पर अधिक निगरानी करें।"
      ],
      cultural: [
        "खेत की स्वच्छता बनाए रखें।",
        "स्वस्थ बीज का उपयोग करें और उचित फसल प्रबंधन अपनाएं।",
        "ऐसी अनावश्यक सिंचाई से बचें जिससे पत्तियां लंबे समय तक गीली रहें।"
      ],
      biological: [],
      chemical: [],
      safety: [
        "फसल-सुरक्षा उत्पादों का उपयोग तभी करें जब समस्या की पहचान हो और उपचार आवश्यक हो।"
      ]
    },

    mr: {
      monitoring: [
        "पानांवरील डाग, तांबेरा रोगाची लक्षणे, रंगातील बदल आणि असामान्य वाढ यासाठी नियमित पाहणी करा.",
        "रोगासाठी अनुकूल हवामान असल्यास अधिक काळजीपूर्वक पाहणी करा."
      ],
      cultural: [
        "शेताची स्वच्छता राखा.",
        "निरोगी बियाणे वापरा आणि योग्य पीक व्यवस्थापन पद्धती पाळा.",
        "पाने जास्त वेळ ओलसर ठेवणारे अनावश्यक सिंचन टाळा."
      ],
      biological: [],
      chemical: [],
      safety: [
        "समस्या ओळखली गेली असेल आणि उपचाराची गरज असेल तेव्हाच पीक संरक्षण उत्पादने वापरा."
      ]
    }
  },

  Cotton_Bacterial_Blight: {
    en: {
      monitoring: [
        "Inspect leaves regularly for water-soaked spots, dark lesions and spreading symptoms.",
        "Increase scouting after rainy, warm or humid conditions."
      ],
      cultural: [
        "Remove severely affected plant material where practical.",
        "Maintain good field sanitation and manage crop residues appropriately.",
        "Avoid unnecessary irrigation and prolonged leaf wetness."
      ],
      biological: [
        "Prefer locally recommended biological or preventive disease-management options where available."
      ],
      chemical: [
        "When treatment is justified, use only a locally approved disease-management product appropriate for cotton."
      ],
      safety: [
        "Follow the product label, approved dose, waiting period and required protective equipment."
      ]
    },

    hi: {
      monitoring: [
        "पत्तियों पर पानी जैसे धब्बे, गहरे घाव और फैलते हुए लक्षणों की नियमित जांच करें।",
        "बारिश, गर्म या नम मौसम के बाद अधिक निगरानी करें।"
      ],
      cultural: [
        "जहां संभव हो, गंभीर रूप से प्रभावित पौधों के हिस्सों को हटा दें।",
        "खेत की स्वच्छता बनाए रखें और फसल अवशेषों का उचित प्रबंधन करें।",
        "अनावश्यक सिंचाई और पत्तियों के लंबे समय तक गीले रहने से बचें।"
      ],
      biological: [
        "जहां उपलब्ध हो, स्थानीय रूप से अनुशंसित जैविक या निवारक रोग-प्रबंधन विकल्पों को प्राथमिकता दें।"
      ],
      chemical: [
        "जब उपचार आवश्यक हो, तभी कपास के लिए स्थानीय रूप से स्वीकृत और रोग के लिए उपयुक्त उत्पाद का उपयोग करें।"
      ],
      safety: [
        "लेबल, स्वीकृत मात्रा, प्रतीक्षा अवधि और आवश्यक सुरक्षा उपकरणों का पालन करें।"
      ]
    },

    mr: {
      monitoring: [
        "पानांवर पाण्यासारखे डाग, काळे घाव आणि रोगाचा प्रसार यासाठी नियमित पाहणी करा.",
        "पाऊस, उष्ण किंवा दमट हवामानानंतर अधिक काळजीपूर्वक पाहणी करा."
      ],
      cultural: [
        "शक्य असल्यास जास्त बाधित वनस्पतींचे भाग काढून टाका.",
        "शेताची स्वच्छता राखा आणि पिकांच्या अवशेषांचे योग्य व्यवस्थापन करा.",
        "अनावश्यक सिंचन आणि पाने जास्त वेळ ओलसर राहणे टाळा."
      ],
      biological: [
        "उपलब्ध असल्यास स्थानिक शिफारसीनुसार जैविक किंवा प्रतिबंधात्मक रोग व्यवस्थापन पर्यायांना प्राधान्य द्या."
      ],
      chemical: [
        "उपचार आवश्यक असल्यासच कापसासाठी स्थानिक मान्य आणि रोगासाठी योग्य उत्पादन वापरा."
      ],
      safety: [
        "लेबल, मान्य मात्रा, प्रतीक्षा कालावधी आणि आवश्यक सुरक्षा साधनांचे पालन करा."
      ]
    }
  },
};


/*
 * The ML model uses PlantVillage-style labels.
 * Our application uses its own classKey names.
 *
 * So we translate the model's label into the key
 * that our existing recommendation/translation system understands.
 */
const MODEL_LABEL_MAP = {
  // =========================
  // TOMATO
  // =========================

  "Tomato with Bacterial Spot": "Tomato_Bacterial_Spot",
  "Tomato with Early Blight": "Tomato_Early_Blight",
  "Tomato with Late Blight": "Tomato_Late_Blight",
  "Tomato with Leaf Mold": "Tomato_Leaf_Mold",
  "Tomato with Septoria Leaf Spot": "Tomato_Septoria_Leaf_Spot",
  "Tomato with Spider Mites or Two-spotted Spider Mite":
    "Tomato_Spider_Mites",
  "Tomato with Target Spot": "Tomato_Target_Spot",
  "Tomato Yellow Leaf Curl Virus": "Tomato_Leaf_Curl_Virus",
  "Tomato Mosaic Virus": "Tomato_Mosaic_Virus",
  "Healthy Tomato Plant": "Tomato_Healthy",

  // =========================
  // POTATO
  // =========================

  "Potato with Early Blight": "Potato_Early_Blight",
  "Potato with Late Blight": "Potato_Late_Blight",
  "Healthy Potato Plant": "Potato_Healthy",

  // =========================
  // MAIZE / CORN
  // =========================

  "Corn (Maize) with Cercospora and Gray Leaf Spot":
    "Maize_Cercospora_Gray_Leaf_Spot",

  "Corn (Maize) with Common Rust":
    "Maize_Common_Rust",

  "Corn (Maize) with Northern Leaf Blight":
    "Maize_Northern_Leaf_Blight",

  "Healthy Corn (Maize) Plant":
    "Maize_Healthy",
};


/*
 * REAL ML DETECTION
 *
 * Camera image
 *     ↓
 * Hugging Face
 *     ↓
 * ResNet50
 *     ↓
 * model label + confidence
 */
async function detectDiseaseClass(
  imageBuffer,
  contentType = "image/jpeg",
  crop = "tomato"
) {
  if (!imageBuffer || !imageBuffer.length) {
    throw new Error("No image provided");
  }

  const aiServiceUrl = process.env.AI_SERVICE_URL;

  if (!aiServiceUrl) {
    throw new Error("AI_SERVICE_URL is missing from backend .env");
  }

  const form = new FormData();

  form.append(
    "file",
    new Blob([imageBuffer], { type: contentType }),
    "crop-image.jpg"
  );

  form.append("crop", crop);

  const response = await fetch(aiServiceUrl, {
    method: "POST",
    body: form,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "ML service prediction failed"
    );
  }

  if (!data.disease) {
    throw new Error("ML service returned no disease");
  }

  return {
    classKey: MODEL_LABEL_MAP[data.disease] || null,
    modelLabel: data.disease,
    confidence: data.confidence,
    crop: data.crop,
    topPredictions: data.top_predictions || [],
  };
}

function translateIPM(classKey, lang = "en") {
  const profile = IPM_PROFILES[classKey];

  if (!profile) return null;

  return profile[lang] || profile.en;
}
function translateProfile(
  classKey,
  lang = "en",
  modelConfidence = null
) {
  const profile = DISEASE_PROFILES.find(
    (p) => p.classKey === classKey
  );

  // ----------------------------------
  // Known detailed profile
  // ----------------------------------
  if (profile) {
    return {
      classKey,

      crop:
        profile.crop[lang] ||
        profile.crop.en,

      disease:
        profile.disease[lang] ||
        profile.disease.en,

      severity: profile.severity,

      severityPercent:
        profile.severityPercent,

      confidence:
        modelConfidence !== null
          ? modelConfidence
          : profile.confidence,

      recommendation:
        profile.recommendation[lang] ||
        profile.recommendation.en,

      ipm: translateIPM(classKey, lang),
    };
  }

  // ----------------------------------
  // Generic fallback for supported ML
  // diseases that don't have a custom
  // profile yet
  // ----------------------------------

  const fallbackNames = {
    Tomato_Bacterial_Spot: {
      en: ["Tomato", "Bacterial Spot"],
      hi: ["टमाटर", "जीवाणु धब्बा"],
      mr: ["टोमॅटो", "जिवाणू ठिपका"],
    },

    Tomato_Late_Blight: {
      en: ["Tomato", "Late Blight"],
      hi: ["टमाटर", "पछेती झुलसा"],
      mr: ["टोमॅटो", "उशिरा करपा"],
    },

    Tomato_Leaf_Mold: {
      en: ["Tomato", "Leaf Mold"],
      hi: ["टमाटर", "पत्ती फफूंद"],
      mr: ["टोमॅटो", "पानावरील बुरशी"],
    },

    Tomato_Septoria_Leaf_Spot: {
      en: ["Tomato", "Septoria Leaf Spot"],
      hi: ["टमाटर", "सेप्टोरिया पत्ती धब्बा"],
      mr: ["टोमॅटो", "सेप्टोरिया पानावरील ठिपका"],
    },

    Tomato_Spider_Mites: {
      en: ["Tomato", "Spider Mites"],
      hi: ["टमाटर", "स्पाइडर माइट"],
      mr: ["टोमॅटो", "कोळी माइट"],
    },

    Tomato_Target_Spot: {
      en: ["Tomato", "Target Spot"],
      hi: ["टमाटर", "टार्गेट स्पॉट"],
      mr: ["टोमॅटो", "टार्गेट स्पॉट"],
    },

    Tomato_Mosaic_Virus: {
      en: ["Tomato", "Mosaic Virus"],
      hi: ["टमाटर", "मोज़ेक वायरस"],
      mr: ["टोमॅटो", "मोझॅक विषाणू"],
    },

    Tomato_Healthy: {
      en: ["Tomato", "Healthy"],
      hi: ["टमाटर", "स्वस्थ"],
      mr: ["टोमॅटो", "निरोगी"],
    },

    Maize_Cercospora_Gray_Leaf_Spot: {
      en: ["Maize", "Cercospora and Gray Leaf Spot"],
      hi: ["मक्का", "सर्कोस्पोरा और ग्रे लीफ स्पॉट"],
      mr: ["मका", "सर्कोस्पोरा आणि ग्रे लीफ स्पॉट"],
    },

    Maize_Common_Rust: {
      en: ["Maize", "Common Rust"],
      hi: ["मक्का", "कॉमन रस्ट"],
      mr: ["मका", "कॉमन रस्ट"],
    },

    Maize_Northern_Leaf_Blight: {
      en: ["Maize", "Northern Leaf Blight"],
      hi: ["मक्का", "नॉर्दर्न लीफ ब्लाइट"],
      mr: ["मका", "नॉर्दर्न लीफ ब्लाइट"],
    },

    Maize_Healthy: {
      en: ["Maize", "Healthy"],
      hi: ["मक्का", "स्वस्थ"],
      mr: ["मका", "निरोगी"],
    },

    Potato_Early_Blight: {
      en: ["Potato", "Early Blight"],
      hi: ["आलू", "अगेती झुलसा"],
      mr: ["बटाटा", "लवकर करपा"],
    },

    Potato_Late_Blight: {
      en: ["Potato", "Late Blight"],
      hi: ["आलू", "पछेती झुलसा"],
      mr: ["बटाटा", "उशिरा करपा"],
    },

    Potato_Healthy: {
      en: ["Potato", "Healthy"],
      hi: ["आलू", "स्वस्थ"],
      mr: ["बटाटा", "निरोगी"],
    },
  };

  const names = fallbackNames[classKey];

  // Completely unknown class
  if (!names) {
    return null;
  }

  const [crop, disease] =
    names[lang] || names.en;

  const isHealthy =
    classKey.endsWith("_Healthy");

  return {
    classKey,

    crop,

    disease,

    severity: isHealthy ? "Low" : "Medium",

    severityPercent: isHealthy ? 8 : 50,

    confidence:
      modelConfidence !== null
        ? modelConfidence
        : 0,

    recommendation:
      isHealthy
        ? (
            {
              en: "No major disease signs detected. Continue regular crop monitoring and maintain good field sanitation.",
              hi: "रोग के कोई प्रमुख लक्षण नहीं पाए गए। नियमित फसल निगरानी जारी रखें और खेत की स्वच्छता बनाए रखें।",
              mr: "रोगाची ठळक लक्षणे आढळली नाहीत. नियमित पिकाची पाहणी सुरू ठेवा आणि शेताची स्वच्छता राखा.",
            }[lang] ||
            "No major disease signs detected. Continue regular crop monitoring and maintain good field sanitation."
          )
        : (
            {
              en: "Disease symptoms detected. Inspect the crop closely, remove severely affected plant material where practical, maintain field sanitation, and follow locally approved disease-management guidance if treatment is required.",
              hi: "रोग के लक्षण पाए गए हैं। फसल की सावधानीपूर्वक जांच करें, जहां संभव हो गंभीर रूप से प्रभावित पौधों के हिस्से हटाएं, खेत की स्वच्छता बनाए रखें और उपचार आवश्यक होने पर स्थानीय रूप से स्वीकृत रोग-प्रबंधन सलाह का पालन करें।",
              mr: "रोगाची लक्षणे आढळली आहेत. पिकाची काळजीपूर्वक पाहणी करा, शक्य असल्यास जास्त बाधित भाग काढून टाका, शेताची स्वच्छता राखा आणि उपचाराची गरज असल्यास स्थानिक मान्य रोग व्यवस्थापन सल्ल्याचे पालन करा.",
            }[lang] ||
            "Disease symptoms detected. Inspect the crop closely, maintain field sanitation, and follow locally approved disease-management guidance."
          ),

    ipm: null,
  };
}


module.exports = {
  detectDiseaseClass,
  translateProfile,
  DISEASE_PROFILES,
};