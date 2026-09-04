import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import { translations } from "./translations";

const LanguageContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Legacy / hard-coded English translations
|--------------------------------------------------------------------------
| These allow existing components that still contain English text to use:
|
|     t("Home")
|     t("Loading...")
|     t("Find Expert")
|
| without immediately having to convert every component.
|--------------------------------------------------------------------------
*/

const AUTO_TRANSLATIONS = {
  hi: {
    // Navigation
    "Home": "होम",
    "Scan": "स्कैन",
    "Result": "परिणाम",
    "Stores": "दुकानें",
    "Disease Map": "रोग मानचित्र",
    "Follow-up Monitoring": "फॉलो-अप निगरानी",
    "Disease Guide": "रोग मार्गदर्शिका",
    "Logout": "लॉगआउट",
    "Back": "वापस",
    "Close menu": "मेनू बंद करें",
    "Open menu": "मेनू खोलें",
    "Language": "भाषा",
    "Screens": "स्क्रीन",

    // Common
    "Loading...": "लोड हो रहा है...",
    "Please wait...": "कृपया प्रतीक्षा करें...",
    "Unknown": "अज्ञात",
    "Unavailable": "उपलब्ध नहीं",
    "Current location": "वर्तमान स्थान",
    "Your location": "आपका स्थान",
    "Current area": "वर्तमान क्षेत्र",
    "Call": "कॉल करें",
    "Phone": "फोन",
    "Location": "स्थान",
    "Submitted": "जमा किया गया",
    "Today": "आज",
    "today": "आज",
    "High": "अधिक",
    "Moderate": "मध्यम",
    "Medium": "मध्यम",
    "Low": "कम",
    "Stable": "स्थिर",
    "Improving": "सुधार हो रहा है",
    "Worsening": "स्थिति बिगड़ रही है",
    "pending": "लंबित",
    "reviewed": "समीक्षित",

    // Login
    "Full Name": "पूरा नाम",
    "Mobile Number": "मोबाइल नंबर",
    "Password": "पासवर्ड",
    "Please fill all fields": "कृपया सभी फ़ील्ड भरें",
    "Create Account": "खाता बनाएं",
    "Expert Login": "विशेषज्ञ लॉगिन",
    "Register as Expert": "विशेषज्ञ के रूप में पंजीकरण करें",
    "Submit Registration": "पंजीकरण जमा करें",
    "Please fill all required fields.":
      "कृपया सभी आवश्यक फ़ील्ड भरें।",
    "Please fill all expert details.":
      "कृपया सभी विशेषज्ञ विवरण भरें।",
    "Registration submitted successfully. Your account is awaiting verification.":
      "पंजीकरण सफलतापूर्वक जमा किया गया। आपका खाता सत्यापन की प्रतीक्षा में है।",
    "Something went wrong. Please try again.":
      "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",

    // Scan
    "Scan Crop": "फसल स्कैन करें",
    "Scan Your Crop": "अपनी फसल स्कैन करें",
    "Select crop": "फसल चुनें",
    "Take Photo": "फोटो लें",
    "Gallery": "गैलरी",
    "Retake": "फिर से लें",
    "Retake Photo": "फिर से फोटो लें",
    "Keep the leaf inside the frame":
      "पत्ती को फ्रेम के अंदर रखें",
    "Clear photo in daylight gives better results":
      "दिन की रोशनी में साफ फोटो बेहतर परिणाम देती है",
    "Detecting disease...":
      "बीमारी की जांच हो रही है...",
    "Scan failed, try again":
      "स्कैन विफल हुआ, फिर से प्रयास करें",
    "Start Scan": "स्कैन शुरू करें",

    // Results
    "DETECTED": "पहचान हुई",
    "Confidence": "विश्वास स्तर",
    "AI ASSESSMENT": "एआई आकलन",
    "AI confidence": "एआई विश्वास स्तर",
    "Crop": "फसल",
    "SEVERITY": "गंभीरता",
    "Severity": "गंभीरता",
    "Low-confidence result":
      "कम-विश्वसनीय परिणाम",
    "The AI could not confidently identify the disease.":
      "एआई बीमारी की पहचान भरोसे के साथ नहीं कर सका।",
    "For a better result":
      "बेहतर परिणाम के लिए",
    "Capture one affected leaf clearly.":
      "एक प्रभावित पत्ती को स्पष्ट रूप से कैद करें।",
    "Use good daylight.":
      "अच्छी दिन की रोशनी का उपयोग करें।",
    "Avoid distant whole-plant photos.":
      "दूर से पूरे पौधे की फोटो लेने से बचें।",

    // Expert
    "Find Expert": "विशेषज्ञ खोजें",
    "EXPERT VALIDATION": "विशेषज्ञ सत्यापन",
    "Expert Validation": "विशेषज्ञ सत्यापन",
    "Independent review of the AI diagnosis":
      "एआई निदान की स्वतंत्र समीक्षा",
    "Request expert review":
      "विशेषज्ञ समीक्षा का अनुरोध करें",
    "Request Expert Review":
      "विशेषज्ञ समीक्षा का अनुरोध करें",
    "Review requested. Your diagnosis is awaiting expert validation.":
      "समीक्षा का अनुरोध किया गया। आपका निदान विशेषज्ञ सत्यापन की प्रतीक्षा में है।",
    "Requesting expert review...":
      "विशेषज्ञ समीक्षा का अनुरोध किया जा रहा है...",
    "Review Case":
      "केस की समीक्षा करें",
    "View Case":
      "केस देखें",
    "Expert":
      "विशेषज्ञ",
    "Expert Advice":
      "विशेषज्ञ की सलाह",
    "Update Expert Advice":
      "विशेषज्ञ की सलाह अपडेट करें",
    "Submit Expert Advice":
      "विशेषज्ञ की सलाह जमा करें",
    "Submitting...":
      "जमा किया जा रहा है...",

    // IPM
    "IPM RECOMMENDATIONS":
      "आईपीएम सिफारिशें",
    "Monitor":
      "निगरानी",
    "Prevent / Cultural":
      "रोकथाम / कृषि पद्धति",
    "Biological":
      "जैविक",
    "Chemical":
      "रासायनिक",
    "Safe Use":
      "सुरक्षित उपयोग",
    "Safety":
      "सुरक्षा",
    "RECOMMENDED ACTION":
      "सुझाई गई कार्रवाई",
    "No recommendation available.":
      "कोई सिफारिश उपलब्ध नहीं है।",

    // Stores
    "Nearby Stores":
      "नज़दीकी दुकानें",
    "Find Nearby Store":
      "नज़दीकी दुकान खोजें",
    "No nearby stores found.":
      "कोई नज़दीकी दुकान नहीं मिली।",
    "Location access needed for nearby stores":
      "नज़दीकी दुकानों के लिए स्थान की अनुमति चाहिए",
    "away":
      "दूर",
    "min":
      "मिनट",

    // Follow-up
    "No active follow-ups":
      "कोई सक्रिय फॉलो-अप नहीं है",
    "What to monitor":
      "क्या निगरानी करें",
    "Initial severity:":
      "प्रारंभिक गंभीरता:",
    "Started:":
      "शुरू किया गया:",
    "Analyzing...":
      "विश्लेषण किया जा रहा है...",
    "Scan Crop Again":
      "फसल फिर से स्कैन करें",
    "Good news! The crop appears to be improving.":
      "अच्छी खबर! फसल की स्थिति में सुधार दिखाई दे रहा है।",
    "The crop appears to be worsening. Consider expert guidance.":
      "फसल की स्थिति बिगड़ती हुई दिखाई दे रही है। विशेषज्ञ की सलाह लेने पर विचार करें।",
    "The crop condition appears stable.":
      "फसल की स्थिति स्थिर दिखाई दे रही है।",

    // Weather
    "Clear sky": "साफ आसमान",
    "Mostly sunny": "अधिकतर धूप",
    "Partly cloudy": "आंशिक रूप से बादल",
    "Cloudy": "बादल छाए हुए",
    "Foggy": "कोहरा",
    "Light drizzle": "हल्की बूंदाबांदी",
    "Drizzle": "बूंदाबांदी",
    "Heavy drizzle": "तेज़ बूंदाबांदी",
    "Light rain": "हल्की बारिश",
    "Rain expected": "बारिश की संभावना",
    "Heavy rain": "भारी बारिश",
    "Light snowfall": "हल्की बर्फबारी",
    "Snow expected": "बर्फबारी की संभावना",
    "Heavy snow": "भारी बर्फबारी",
    "Rain showers possible": "बारिश की बौछारें संभव हैं",
    "Rain showers expected": "बारिश की बौछारों की संभावना",
    "Heavy rain showers": "भारी बारिश की बौछारें",
    "Thunderstorms possible":
      "आंधी-तूफान संभव है",
    "Thunderstorms with hail possible":
      "ओलावृष्टि के साथ आंधी-तूफान संभव है",
    "Severe thunderstorms possible":
      "तेज़ आंधी-तूफान संभव है",
    "Weather conditions":
      "मौसम की स्थिति",
    "humidity":
      "नमी",
    "rain chance":
      "बारिश की संभावना",
    "Unknown location":
      "अज्ञात स्थान",
    "Detecting location...":
      "स्थान खोजा जा रहा है...",
    "Fetching weather…":
      "मौसम की जानकारी प्राप्त की जा रही है…",
    "Location services are not supported by this browser.":
      "इस ब्राउज़र में स्थान सेवा उपलब्ध नहीं है।",
    "Unable to access your location. Showing Jaipur as fallback.":
      "आपका स्थान प्राप्त नहीं किया जा सका। विकल्प के रूप में जयपुर दिखाया जा रहा है।",

    // Risk
    "Rain is expected and":
      "बारिश की संभावना है और",
    "Weather conditions and":
      "मौसम की स्थिति और",

    // Map
    "Risk": "जोखिम",
    "All": "सभी",
    "Disease": "रोग",
    "Cases": "मामले",
    "Search": "खोजें",

    // Disease Guide
    "Early Blight": "अर्ली ब्लाइट",
    "Late Blight": "लेट ब्लाइट",
    "Bacterial Spot": "बैक्टीरियल स्पॉट",
    "Leaf Mold": "लीफ मोल्ड",
    "Septoria Leaf Spot":
      "सेप्टोरिया लीफ स्पॉट",
    "Spider Mites":
      "स्पाइडर माइट्स",
    "Target Spot":
      "टार्गेट स्पॉट",
    "Tomato Yellow Leaf Curl Virus":
      "टमाटर येलो लीफ कर्ल वायरस",
    "Tomato Mosaic Virus":
      "टमाटर मोज़ेक वायरस",
    "Apple Scab":
      "एप्पल स्कैब",
    "Black Rot":
      "ब्लैक रॉट",
    "Cedar Apple Rust":
      "सीडर एप्पल रस्ट",
    "Powdery Mildew":
      "पाउडरी मिल्ड्यू",
    "Common Rust":
      "कॉमन रस्ट",
    "Northern Leaf Blight":
      "नॉर्दर्न लीफ ब्लाइट",
    "Cercospora Gray Leaf Spot":
      "सर्कोस्पोरा ग्रे लीफ स्पॉट",
    "Leaf Scorch":
      "लीफ स्कॉर्च",
  },

  mr: {
    // Navigation
    "Home": "मुख्यपृष्ठ",
    "Scan": "स्कॅन",
    "Result": "निकाल",
    "Stores": "दुकाने",
    "Disease Map": "रोग नकाशा",
    "Follow-up Monitoring": "फॉलो-अप निरीक्षण",
    "Disease Guide": "रोग मार्गदर्शक",
    "Logout": "लॉगआउट",
    "Back": "मागे",
    "Close menu": "मेनू बंद करा",
    "Open menu": "मेनू उघडा",
    "Language": "भाषा",
    "Screens": "स्क्रीन",

    // Common
    "Loading...": "लोड होत आहे...",
    "Please wait...": "कृपया प्रतीक्षा करा...",
    "Unknown": "अज्ञात",
    "Unavailable": "उपलब्ध नाही",
    "Current location": "सध्याचे स्थान",
    "Your location": "तुमचे स्थान",
    "Current area": "सध्याचा परिसर",
    "Call": "कॉल करा",
    "Phone": "फोन",
    "Location": "स्थान",
    "Submitted": "सबमिट केले",
    "Today": "आज",
    "today": "आज",
    "High": "जास्त",
    "Moderate": "मध्यम",
    "Medium": "मध्यम",
    "Low": "कमी",
    "Stable": "स्थिर",
    "Improving": "सुधारणा होत आहे",
    "Worsening": "स्थिती बिघडत आहे",
    "pending": "प्रलंबित",
    "reviewed": "पुनरावलोकन केले",

    // Login
    "Full Name": "पूर्ण नाव",
    "Mobile Number": "मोबाईल नंबर",
    "Password": "पासवर्ड",
    "Please fill all fields":
      "कृपया सर्व फील्ड भरा",
    "Create Account":
      "खाते तयार करा",
    "Expert Login":
      "तज्ञ लॉगिन",
    "Register as Expert":
      "तज्ञ म्हणून नोंदणी करा",
    "Submit Registration":
      "नोंदणी सबमिट करा",
    "Please fill all required fields.":
      "कृपया सर्व आवश्यक फील्ड भरा.",
    "Please fill all expert details.":
      "कृपया सर्व तज्ञांची माहिती भरा.",
    "Registration submitted successfully. Your account is awaiting verification.":
      "नोंदणी यशस्वीरित्या सबमिट झाली. तुमचे खाते पडताळणीच्या प्रतीक्षेत आहे.",
    "Something went wrong. Please try again.":
      "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",

    // Scan
    "Scan Crop": "पीक स्कॅन करा",
    "Scan Your Crop": "तुमचे पीक स्कॅन करा",
    "Select crop": "पीक निवडा",
    "Take Photo": "फोटो घ्या",
    "Gallery": "गॅलरी",
    "Retake": "पुन्हा घ्या",
    "Retake Photo": "पुन्हा फोटो घ्या",
    "Keep the leaf inside the frame":
      "पान फ्रेममध्ये ठेवा",
    "Clear photo in daylight gives better results":
      "दिवसाच्या उजेडात स्पष्ट फोटो चांगले परिणाम देतो",
    "Detecting disease...":
      "आजार तपासला जात आहे...",
    "Scan failed, try again":
      "स्कॅन अयशस्वी झाला, पुन्हा प्रयत्न करा",
    "Start Scan": "स्कॅन सुरू करा",

    // Results
    "DETECTED": "आढळले",
    "Confidence": "विश्वासार्हता",
    "AI ASSESSMENT": "एआय मूल्यांकन",
    "AI confidence": "एआय विश्वासार्हता",
    "Crop": "पीक",
    "SEVERITY": "तीव्रता",
    "Severity": "तीव्रता",
    "Low-confidence result":
      "कमी-विश्वासार्ह निकाल",
    "The AI could not confidently identify the disease.":
      "एआयला आजार खात्रीने ओळखता आला नाही.",
    "For a better result":
      "चांगल्या निकालासाठी",
    "Capture one affected leaf clearly.":
      "एक बाधित पान स्पष्टपणे टिपा.",
    "Use good daylight.":
      "चांगल्या दिवसाच्या उजेडाचा वापर करा.",
    "Avoid distant whole-plant photos.":
      "लांबून संपूर्ण झाडाचे फोटो टाळा.",

    // Expert
    "Find Expert": "तज्ञ शोधा",
    "EXPERT VALIDATION": "तज्ञ पडताळणी",
    "Expert Validation": "तज्ञ पडताळणी",
    "Independent review of the AI diagnosis":
      "एआय निदानाचे स्वतंत्र पुनरावलोकन",
    "Request expert review":
      "तज्ञ पुनरावलोकनाची विनंती करा",
    "Request Expert Review":
      "तज्ञ पुनरावलोकनाची विनंती करा",
    "Review requested. Your diagnosis is awaiting expert validation.":
      "पुनरावलोकनाची विनंती केली. तुमचे निदान तज्ञ पडताळणीच्या प्रतीक्षेत आहे.",
    "Requesting expert review...":
      "तज्ञ पुनरावलोकनाची विनंती केली जात आहे...",
    "Review Case":
      "केसचे पुनरावलोकन करा",
    "View Case":
      "केस पहा",
    "Expert":
      "तज्ञ",
    "Expert Advice":
      "तज्ञांचा सल्ला",
    "Update Expert Advice":
      "तज्ञांचा सल्ला अपडेट करा",
    "Submit Expert Advice":
      "तज्ञांचा सल्ला सबमिट करा",
    "Submitting...":
      "सबमिट होत आहे...",

    // IPM
    "IPM RECOMMENDATIONS":
      "आयपीएम शिफारसी",
    "Monitor":
      "निरीक्षण",
    "Prevent / Cultural":
      "प्रतिबंध / कृषी पद्धत",
    "Biological":
      "जैविक",
    "Chemical":
      "रासायनिक",
    "Safe Use":
      "सुरक्षित वापर",
    "Safety":
      "सुरक्षितता",
    "RECOMMENDED ACTION":
      "शिफारस केलेली कृती",
    "No recommendation available.":
      "कोणतीही शिफारस उपलब्ध नाही.",

    // Stores
    "Nearby Stores":
      "जवळची दुकाने",
    "Find Nearby Store":
      "जवळचे दुकान शोधा",
    "No nearby stores found.":
      "जवळचे कोणतेही दुकान सापडले नाही.",
    "Location access needed for nearby stores":
      "जवळच्या दुकानांसाठी स्थानाची परवानगी आवश्यक आहे",
    "away":
      "अंतरावर",
    "min":
      "मिनिटे",

    // Follow-up
    "No active follow-ups":
      "कोणतेही सक्रिय फॉलो-अप नाहीत",
    "What to monitor":
      "कशाचे निरीक्षण करावे",
    "Initial severity:":
      "प्रारंभिक तीव्रता:",
    "Started:":
      "सुरू केले:",
    "Analyzing...":
      "विश्लेषण केले जात आहे...",
    "Scan Crop Again":
      "पीक पुन्हा स्कॅन करा",
    "Good news! The crop appears to be improving.":
      "चांगली बातमी! पिकाच्या स्थितीत सुधारणा होत आहे.",
    "The crop appears to be worsening. Consider expert guidance.":
      "पिकाची स्थिती बिघडत असल्याचे दिसते. तज्ञांचा सल्ला घेण्याचा विचार करा.",
    "The crop condition appears stable.":
      "पिकाची स्थिती स्थिर दिसत आहे.",

    // Weather
    "Clear sky": "स्वच्छ आकाश",
    "Mostly sunny": "बहुतेक वेळा सूर्यप्रकाश",
    "Partly cloudy": "अंशतः ढगाळ",
    "Cloudy": "ढगाळ",
    "Foggy": "धुके",
    "Light drizzle": "हलकी रिमझिम",
    "Drizzle": "रिमझिम",
    "Heavy drizzle": "जोरदार रिमझिम",
    "Light rain": "हलका पाऊस",
    "Rain expected": "पावसाची शक्यता",
    "Heavy rain": "मुसळधार पाऊस",
    "Light snowfall": "हलकी बर्फवृष्टी",
    "Snow expected": "बर्फवृष्टीची शक्यता",
    "Heavy snow": "जोरदार बर्फवृष्टी",
    "Rain showers possible":
      "पावसाच्या सरी शक्य आहेत",
    "Rain showers expected":
      "पावसाच्या सरींची शक्यता",
    "Heavy rain showers":
      "जोरदार पावसाच्या सरी",
    "Thunderstorms possible":
      "वादळी वारे शक्य आहेत",
    "Thunderstorms with hail possible":
      "गारांसह वादळी वारे शक्य आहेत",
    "Severe thunderstorms possible":
      "तीव्र वादळी वारे शक्य आहेत",
    "Weather conditions":
      "हवामानाची स्थिती",
    "humidity":
      "आर्द्रता",
    "rain chance":
      "पावसाची शक्यता",
    "Unknown location":
      "अज्ञात स्थान",
    "Detecting location...":
      "स्थान शोधले जात आहे...",
    "Fetching weather…":
      "हवामानाची माहिती मिळवत आहे…",
    "Location services are not supported by this browser.":
      "या ब्राउझरमध्ये स्थान सेवा उपलब्ध नाही.",
    "Unable to access your location. Showing Jaipur as fallback.":
      "तुमचे स्थान मिळवता आले नाही. पर्याय म्हणून जयपूर दाखवत आहे.",

    // Risk
    "Rain is expected and":
      "पावसाची शक्यता आहे आणि",
    "Weather conditions and":
      "हवामानाची स्थिती आणि",

    // Map
    "Risk": "जोखीम",
    "All": "सर्व",
    "Disease": "रोग",
    "Cases": "प्रकरणे",
    "Search": "शोधा",

    // Disease Guide
    "Early Blight": "अर्ली ब्लाइट",
    "Late Blight": "लेट ब्लाइट",
    "Bacterial Spot": "बॅक्टेरियल स्पॉट",
    "Leaf Mold": "लीफ मोल्ड",
    "Septoria Leaf Spot":
      "सेप्टोरिया लीफ स्पॉट",
    "Spider Mites":
      "स्पायडर माइट्स",
    "Target Spot":
      "टार्गेट स्पॉट",
    "Tomato Yellow Leaf Curl Virus":
      "टोमॅटो यलो लीफ कर्ल व्हायरस",
    "Tomato Mosaic Virus":
      "टोमॅटो मोझेक व्हायरस",
    "Apple Scab":
      "अॅपल स्कॅब",
    "Black Rot":
      "ब्लॅक रॉट",
    "Cedar Apple Rust":
      "सीडर अॅपल रस्ट",
    "Powdery Mildew":
      "पावडरी मिल्ड्यू",
    "Common Rust":
      "कॉमन रस्ट",
    "Northern Leaf Blight":
      "नॉर्दर्न लीफ ब्लाइट",
    "Cercospora Gray Leaf Spot":
      "सर्कोस्पोरा ग्रे लीफ स्पॉट",
    "Leaf Scorch":
      "लीफ स्कॉर्च",
  },
};


/*
|--------------------------------------------------------------------------
| Additional translations used by the remaining screens/components.
|--------------------------------------------------------------------------
| Keep English keys here because a few legacy components still render
| literal English strings directly in JSX.
|--------------------------------------------------------------------------
*/

const EXTRA_TRANSLATIONS = {
  hi: {
    "All Crops": "सभी फसलें",
    "All Diseases": "सभी रोग",
    "Plant Disease": "पौधों की बीमारी",
    "Farmers": "किसान",
    "Crops": "फसलें",
    "Active Reviews": "सक्रिय समीक्षाएँ",
    "Total Cases": "कुल मामले",
    "Cases received": "प्राप्त मामले",
    "Awaiting Review": "समीक्षा की प्रतीक्षा",
    "Need your attention": "आपके ध्यान की आवश्यकता",
    "High Priority": "उच्च प्राथमिकता",
    "Severe crop conditions": "फसल की गंभीर स्थिति",
    "Cases completed": "पूरे किए गए मामले",
    "Reviewed": "समीक्षा की गई",
    "Review the farmer's AI diagnosis.": "किसान के एआई निदान की समीक्षा करें।",
    "Assess severity and crop condition.": "गंभीरता और फसल की स्थिति का आकलन करें।",
    "Provide practical guidance.": "व्यावहारिक मार्गदर्शन दें।",
    "Search farmer, crop or disease...": "किसान, फसल या रोग खोजें...",
    "Review Case": "केस की समीक्षा करें",
    "View Case": "केस देखें",
    "Could not load this case.": "यह केस लोड नहीं हो सका।",
    "Please enter expert advice before submitting.": "जमा करने से पहले विशेषज्ञ की सलाह दर्ज करें।",
    "Expert review submitted successfully.": "विशेषज्ञ समीक्षा सफलतापूर्वक जमा की गई।",
    "Could not submit the review.": "समीक्षा जमा नहीं की जा सकी।",
    "Farmer crop": "किसान की फसल",
    "Write your expert advice...": "अपनी विशेषज्ञ सलाह लिखें...",
    "Update Expert Advice": "विशेषज्ञ की सलाह अपडेट करें",
    "Submit Expert Advice": "विशेषज्ञ की सलाह जमा करें",
    "Expert cases loading error:": "विशेषज्ञ मामलों को लोड करने में त्रुटि:",
    "Could not load farmer cases.": "किसान के मामले लोड नहीं हो सके।",
    "M.Sc. Agriculture": "एम.एससी. कृषि",
    "Plant Pathology": "पादप रोगविज्ञान",
    "Your current location": "आपका वर्तमान स्थान",
    "Current area": "वर्तमान क्षेत्र",
    "Geolocation error:": "स्थान पता करने में त्रुटि:",
    "Disease Guide": "रोग मार्गदर्शिका",
    "Not sure what a diseased leaf looks like? See examples before scanning.": "पता नहीं रोगग्रस्त पत्ती कैसी दिखती है? स्कैन करने से पहले उदाहरण देखें।",
    "Previous image": "पिछली तस्वीर",
    "Next image": "अगली तस्वीर",
    "Unknown time": "समय अज्ञात",
    "Reviewed by an expert": "विशेषज्ञ द्वारा समीक्षा की गई",
    "Reviewed on": "समीक्षा की तारीख",
    "Sent to an expert": "विशेषज्ञ को भेजा गया",
    "Check back here once they've reviewed your case.": "जब वे आपके मामले की समीक्षा कर लें, तब यहाँ दोबारा देखें।",
    "Requested on": "अनुरोध की तारीख",
    "Latest diagnosis:": "नवीनतम निदान:",
    "Latest diagnosis": "नवीनतम निदान",
    "Needs attention": "ध्यान देने की आवश्यकता",
    "Holding steady": "स्थिति स्थिर है",
    "Analysing your scan…": "आपके स्कैन का विश्लेषण किया जा रहा है…",
    "Scan this crop again": "इस फसल को फिर से स्कैन करें",
    "SCAN HISTORY": "स्कैन इतिहास",
    "Start a follow-up after scanning a crop to monitor it over time.": "समय के साथ फसल की निगरानी के लिए स्कैन के बाद फॉलो-अप शुरू करें।",
    "Keep track of crops you've already scanned, and see how they're responding over time.": "जिन फसलों को आपने पहले स्कैन किया है उनका रिकॉर्ड रखें और समय के साथ उनकी स्थिति देखें।",
    "Could not load follow-up monitoring.": "फॉलो-अप निगरानी लोड नहीं की जा सकी।",
    "Could not process follow-up scan.": "फॉलो-अप स्कैन संसाधित नहीं किया जा सका।",
    "Crop mismatch detected": "चयनित फसल और पहचानी गई फसल अलग हैं",
    "You selected": "आपने चुना",
    "No diagnosis made": "कोई निदान नहीं किया गया",
    "Select Another Crop": "दूसरी फसल चुनें",
    "Expert Review": "विशेषज्ञ समीक्षा",
    "Checking for expert review...": "विशेषज्ञ समीक्षा की जाँच की जा रही है...",
    "Reviewed by Agricultural Expert": "कृषि विशेषज्ञ द्वारा समीक्षा की गई",
    "Expert Review Requested": "विशेषज्ञ समीक्षा का अनुरोध किया गया",
    "✓ Follow-up monitoring started": "✓ फॉलो-अप निगरानी शुरू हो गई",
    "View Monitoring": "निगरानी देखें",
    "Starting monitoring...": "निगरानी शुरू की जा रही है...",
    "Start Follow-up Monitoring": "फॉलो-अप निगरानी शुरू करें",
    "Track this crop after treatment and check whether the disease is improving, stable, or getting worse.": "उपचार के बाद इस फसल की निगरानी करें और देखें कि रोग में सुधार हो रहा है, स्थिति स्थिर है या बिगड़ रही है।",
    "CURRENT SCAN:": "वर्तमान स्कैन:",
    "LATEST SCAN FROM DATABASE:": "डेटाबेस से नवीनतम स्कैन:",
    "No recommendation available.": "कोई सिफारिश उपलब्ध नहीं है।",
    "Cultural Practices": "कृषि पद्धतियाँ",
    "Monitoring": "निगरानी",
    "Safety": "सुरक्षा",
    "No active follow-ups": "कोई सक्रिय फॉलो-अप नहीं है",
    "Start Scan": "स्कैन शुरू करें",
    "English": "अंग्रेज़ी",
    "Tomato": "टमाटर",
    "Potato": "आलू",
    "Maize": "मक्का",
    "Apple": "सेब",
    "Cherry": "चेरी",
    "Grape": "अंगूर",
    "Peach": "आड़ू",
    "Bell Pepper": "शिमला मिर्च",
    "Strawberry": "स्ट्रॉबेरी",
    "tomato": "टमाटर",
    "potato": "आलू",
    "maize": "मक्का",
    "apple": "सेब",
    "cherry": "चेरी",
    "grape": "अंगूर",
    "peach": "आड़ू",
    "bell_pepper": "शिमला मिर्च",
    "strawberry": "स्ट्रॉबेरी",
    "Leaf Spot": "पत्ती धब्बा रोग",

    // Disease-guide crop/condition titles
    "Apple with Black Rot": "ब्लैक रॉट से प्रभावित सेब",
    "Cedar Apple Rust": "सीडर एप्पल रस्ट",
    "Healthy Apple": "स्वस्थ सेब",
    "Cherry with Powdery Mildew": "पाउडरी मिल्ड्यू से प्रभावित चेरी",
    "Healthy Cherry Plant": "स्वस्थ चेरी पौधा",
    "Corn (Maize) with Cercospora and Gray Leaf Spot": "सर्कोस्पोरा और ग्रे लीफ स्पॉट से प्रभावित मक्का",
    "Corn (Maize) with Common Rust": "कॉमन रस्ट से प्रभावित मक्का",
    "Corn (Maize) with Northern Leaf Blight": "नॉर्दर्न लीफ ब्लाइट से प्रभावित मक्का",
    "Healthy Corn (Maize) Plant": "स्वस्थ मक्का पौधा",
    "Grape with Black Rot": "ब्लैक रॉट से प्रभावित अंगूर",
    "Grape with Esca (Black Measles)": "एस्का (ब्लैक मीसल्स) से प्रभावित अंगूर",
    "Grape with Isariopsis Leaf Spot": "इसारियोप्सिस लीफ स्पॉट से प्रभावित अंगूर",
    "Healthy Grape Plant": "स्वस्थ अंगूर पौधा",
    "Peach with Bacterial Spot": "बैक्टीरियल स्पॉट से प्रभावित आड़ू",
    "Healthy Peach Plant": "स्वस्थ आड़ू पौधा",
    "Bell Pepper with Bacterial Spot": "बैक्टीरियल स्पॉट से प्रभावित शिमला मिर्च",
    "Healthy Bell Pepper Plant": "स्वस्थ शिमला मिर्च पौधा",
    "Potato with Early Blight": "अर्ली ब्लाइट से प्रभावित आलू",
    "Potato with Late Blight": "लेट ब्लाइट से प्रभावित आलू",
    "Healthy Potato Plant": "स्वस्थ आलू पौधा",
    "Tomato with Bacterial Spot": "बैक्टीरियल स्पॉट से प्रभावित टमाटर",
    "Tomato with Early Blight": "अर्ली ब्लाइट से प्रभावित टमाटर",
    "Tomato with Late Blight": "लेट ब्लाइट से प्रभावित टमाटर",
    "Tomato with Leaf Mold": "लीफ मोल्ड से प्रभावित टमाटर",
    "Tomato with Septoria Leaf Spot": "सेप्टोरिया लीफ स्पॉट से प्रभावित टमाटर",
    "Tomato with Spider Mites or Two-spotted Spider Mite": "स्पाइडर माइट्स से प्रभावित टमाटर",
    "Tomato with Target Spot": "टार्गेट स्पॉट से प्रभावित टमाटर",
    "Tomato Yellow Leaf Curl Virus": "टमाटर येलो लीफ कर्ल वायरस",
    "Tomato Mosaic Virus": "टमाटर मोज़ेक वायरस",
    "Healthy Tomato Plant": "स्वस्थ टमाटर पौधा",
    "Strawberry with Leaf Scorch": "लीफ स्कॉर्च से प्रभावित स्ट्रॉबेरी",
    "Healthy Strawberry Plant": "स्वस्थ स्ट्रॉबेरी पौधा",

    // Disease-guide descriptions
    "Dark spots with concentric rings usually appear on older, lower leaves. Affected leaves may gradually turn yellow and fall.": "पुरानी निचली पत्तियों पर आमतौर पर गोलाकार छल्लों वाले गहरे धब्बे दिखाई देते हैं। प्रभावित पत्तियाँ धीरे-धीरे पीली होकर गिर सकती हैं।",
    "Small dark spots can appear on leaves and other plant parts. Severe infection may cause yellowing and leaf loss.": "पत्तियों और पौधे के अन्य भागों पर छोटे गहरे धब्बे दिखाई दे सकते हैं। गंभीर संक्रमण से पत्तियाँ पीली होकर गिर सकती हैं।",
    "Dark, water-soaked lesions can develop on leaves and stems, especially during cool and wet conditions.": "पत्तियों और तनों पर गहरे, पानी से भीगे हुए घाव बन सकते हैं, विशेषकर ठंडे और नम मौसम में।",
    "Small circular leaf spots with darker borders can appear, often beginning on older lower leaves.": "गहरे किनारों वाले छोटे गोलाकार पत्ती-धब्बे दिखाई दे सकते हैं, जो अक्सर पुरानी निचली पत्तियों से शुरू होते हैं।",
    "Leaves may develop fine speckling, yellowing, or bronzing. Fine webbing may sometimes be visible underneath leaves.": "पत्तियों पर बारीक धब्बे, पीलापन या कांस्य रंग दिखाई दे सकता है। कभी-कभी पत्तियों के नीचे महीन जाल भी दिखाई दे सकता है।",
    "Dark, water-soaked lesions may develop on leaves and spread rapidly during wet conditions.": "पत्तियों पर गहरे, पानी से भीगे घाव बन सकते हैं और नम परिस्थितियों में तेजी से फैल सकते हैं।",
    "Olive-green to dark lesions may appear on leaves and fruit and can become darker as they develop.": "पत्तियों और फलों पर जैतूनी हरे से गहरे रंग के घाव दिखाई दे सकते हैं और बढ़ने के साथ अधिक गहरे हो सकते हैं।",
    "Yellow-orange spots can develop on leaves, sometimes producing small raised structures on the underside.": "पत्तियों पर पीले-नारंगी धब्बे बन सकते हैं और कभी-कभी पत्तियों की निचली सतह पर छोटे उभरे हुए ढाँचे दिखाई दे सकते हैं।",
    "Leaves may develop characteristic striping or spotting between veins, with affected tissue becoming discolored.": "पत्तियों की नसों के बीच विशिष्ट धारियाँ या धब्बे दिखाई दे सकते हैं और प्रभावित ऊतक का रंग बदल सकता है।",
    "Dark leaf spots can develop and enlarge, causing infected portions of leaves to deteriorate.": "पत्तियों पर गहरे धब्बे बनकर फैल सकते हैं, जिससे संक्रमित भाग खराब होने लगते हैं।",
    "Small dark spots may appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पत्तियों और फलों पर छोटे गहरे धब्बे दिखाई दे सकते हैं, जिनके आसपास कभी-कभी पीला ऊतक होता है।",
    "Small dark lesions can appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पत्तियों और फलों पर छोटे गहरे घाव दिखाई दे सकते हैं, जिनके आसपास कभी-कभी पीला ऊतक होता है।",
    "Dark purple to reddish spots can develop on leaves and may cause affected areas to appear scorched.": "पत्तियों पर गहरे बैंगनी से लाल धब्बे बन सकते हैं और प्रभावित भाग झुलसा हुआ दिखाई दे सकता है।",

    // Weather / risk
    "Rain expected with very high humidity.": "बहुत अधिक नमी के साथ बारिश की संभावना है।",
    "Rain expected in the next 24 hours.": "अगले 24 घंटों में बारिश की संभावना है।",
    "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.": "अधिक नमी और बारिश से फफूंदजनित रोग का जोखिम बढ़ सकता है। अपनी फसल की बारीकी से निगरानी करें और अनावश्यक सिंचाई से बचें।",
    "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.": "गीली परिस्थितियाँ कुछ फसल रोगों का जोखिम बढ़ा सकती हैं। अपनी फसल की बारीकी से निगरानी करें और बारिश से पहले अनावश्यक सिंचाई से बचें।",
    "High humidity is expected.": "अधिक नमी की संभावना है।",
    "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.": "अधिक नमी फफूंदजनित रोगों के विकास के लिए अनुकूल परिस्थितियाँ बना सकती है। पत्तियों की जाँच करें और फसल की बारीकी से निगरानी करें।",
    "Hot conditions are expected today.": "आज गर्म परिस्थितियाँ रहने की संभावना है।",
    "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.": "अधिक तापमान से गर्मी का तनाव हो सकता है और फसल की पानी की आवश्यकता बढ़ सकती है। मिट्टी की नमी की निगरानी करें और उसी अनुसार सिंचाई करें।",
    "Cool and humid conditions are expected.": "ठंडी और नम परिस्थितियों की संभावना है।",
    "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.": "ठंडा और नम मौसम कुछ फफूंदजनित और जीवाणुजनित रोगों के लिए अनुकूल हो सकता है। शुरुआती लक्षणों के लिए पत्तियों की नियमित जाँच करें।",
    "Weather conditions look favorable.": "मौसम की स्थिति अनुकूल दिखाई दे रही है।",
    "No significant weather-related disease risk detected. Continue normal crop monitoring.": "मौसम से संबंधित कोई महत्वपूर्ण रोग जोखिम नहीं पाया गया। सामान्य फसल निगरानी जारी रखें।",
    "today's weather": "आज का मौसम",
    "Detecting location...": "स्थान खोजा जा रहा है...",
    "Fetching weather…": "मौसम की जानकारी प्राप्त की जा रही है…",

    // Map / popup
    "Risk level:": "जोखिम स्तर:",
    "Reported cases:": "रिपोर्ट किए गए मामले:",
    "Monitor nearby crops for early symptoms.": "शुरुआती लक्षणों के लिए आसपास की फसलों की निगरानी करें।",
    "Your location": "आपका स्थान",

    // Errors
    "Something went wrong": "कुछ गलत हो गया",
    "Scan failed, try again": "स्कैन विफल हुआ, फिर से प्रयास करें",
    "Unable to get weather": "मौसम की जानकारी प्राप्त नहीं हो सकी",
    "Could not refresh scan data:": "स्कैन डेटा रीफ्रेश नहीं किया जा सका:",
    "This scan cannot be submitted for expert review.": "यह स्कैन विशेषज्ञ समीक्षा के लिए जमा नहीं किया जा सकता।",
    "Could not request expert review.": "विशेषज्ञ समीक्षा का अनुरोध नहीं किया जा सका।",
    "No scan ID available:": "स्कैन आईडी उपलब्ध नहीं है:",
    "This scan cannot be added to follow-up monitoring.": "इस स्कैन को फॉलो-अप निगरानी में नहीं जोड़ा जा सकता।",
    "Could not start follow-up monitoring.": "फॉलो-अप निगरानी शुरू नहीं की जा सकी।",
  },

  mr: {
    "All Crops": "सर्व पिके",
    "All Diseases": "सर्व रोग",
    "Plant Disease": "वनस्पती रोग",
    "Farmers": "शेतकरी",
    "Crops": "पिके",
    "Active Reviews": "सक्रिय पुनरावलोकने",
    "Total Cases": "एकूण प्रकरणे",
    "Cases received": "प्राप्त प्रकरणे",
    "Awaiting Review": "पुनरावलोकनाच्या प्रतीक्षेत",
    "Need your attention": "तुमच्या लक्षाची गरज",
    "High Priority": "उच्च प्राधान्य",
    "Severe crop conditions": "पिकाची गंभीर स्थिती",
    "Cases completed": "पूर्ण केलेली प्रकरणे",
    "Reviewed": "पुनरावलोकन केले",
    "Review the farmer's AI diagnosis.": "शेतकऱ्याच्या एआय निदानाचे पुनरावलोकन करा.",
    "Assess severity and crop condition.": "तीव्रता आणि पिकाच्या स्थितीचे मूल्यांकन करा.",
    "Provide practical guidance.": "व्यावहारिक मार्गदर्शन द्या.",
    "Search farmer, crop or disease...": "शेतकरी, पीक किंवा रोग शोधा...",
    "Review Case": "प्रकरणाचे पुनरावलोकन करा",
    "View Case": "प्रकरण पहा",
    "Could not load this case.": "हे प्रकरण लोड करता आले नाही.",
    "Please enter expert advice before submitting.": "सबमिट करण्यापूर्वी तज्ञांचा सल्ला लिहा.",
    "Expert review submitted successfully.": "तज्ञ पुनरावलोकन यशस्वीरित्या सबमिट झाले.",
    "Could not submit the review.": "पुनरावलोकन सबमिट करता आले नाही.",
    "Farmer crop": "शेतकऱ्याचे पीक",
    "Write your expert advice...": "तुमचा तज्ञांचा सल्ला लिहा...",
    "Expert cases loading error:": "तज्ञ प्रकरणे लोड करताना त्रुटी:",
    "Could not load farmer cases.": "शेतकऱ्यांची प्रकरणे लोड करता आली नाहीत.",
    "M.Sc. Agriculture": "एम.एससी. कृषी",
    "Plant Pathology": "वनस्पती रोगशास्त्र",
    "Your current location": "तुमचे सध्याचे स्थान",
    "Geolocation error:": "स्थान शोधताना त्रुटी:",
    "Not sure what a diseased leaf looks like? See examples before scanning.": "रोगग्रस्त पान कसे दिसते हे माहीत नाही? स्कॅन करण्यापूर्वी उदाहरणे पहा.",
    "Previous image": "मागील प्रतिमा",
    "Next image": "पुढील प्रतिमा",
    "Unknown time": "वेळ अज्ञात",
    "Reviewed by an expert": "तज्ञांनी पुनरावलोकन केले",
    "Reviewed on": "पुनरावलोकनाची तारीख",
    "Sent to an expert": "तज्ञांकडे पाठवले",
    "Check back here once they've reviewed your case.": "तुमच्या प्रकरणाचे पुनरावलोकन झाल्यानंतर येथे पुन्हा पहा.",
    "Requested on": "विनंतीची तारीख",
    "Latest diagnosis:": "नवीनतम निदान:",
    "Latest diagnosis": "नवीनतम निदान",
    "Needs attention": "लक्ष देणे आवश्यक",
    "Holding steady": "स्थिती स्थिर आहे",
    "Analysing your scan…": "तुमच्या स्कॅनचे विश्लेषण केले जात आहे…",
    "Scan this crop again": "हे पीक पुन्हा स्कॅन करा",
    "SCAN HISTORY": "स्कॅन इतिहास",
    "Start a follow-up after scanning a crop to monitor it over time.": "कालांतराने पिकावर लक्ष ठेवण्यासाठी स्कॅन केल्यानंतर फॉलो-अप सुरू करा.",
    "Keep track of crops you've already scanned, and see how they're responding over time.": "आधी स्कॅन केलेल्या पिकांची नोंद ठेवा आणि कालांतराने त्यांची स्थिती कशी बदलते ते पहा.",
    "Could not load follow-up monitoring.": "फॉलो-अप निरीक्षण लोड करता आले नाही.",
    "Could not process follow-up scan.": "फॉलो-अप स्कॅन प्रक्रिया करता आली नाही.",
    "Crop mismatch detected": "निवडलेले पीक आणि ओळखलेले पीक वेगळे आहे",
    "You selected": "तुम्ही निवडले",
    "No diagnosis made": "निदान केले गेले नाही",
    "Select Another Crop": "दुसरे पीक निवडा",
    "Expert Review": "तज्ञ पुनरावलोकन",
    "Checking for expert review...": "तज्ञ पुनरावलोकन तपासले जात आहे...",
    "Reviewed by Agricultural Expert": "कृषी तज्ञांनी पुनरावलोकन केले",
    "Expert Review Requested": "तज्ञ पुनरावलोकनाची विनंती केली",
    "✓ Follow-up monitoring started": "✓ फॉलो-अप निरीक्षण सुरू झाले",
    "View Monitoring": "निरीक्षण पहा",
    "Starting monitoring...": "निरीक्षण सुरू केले जात आहे...",
    "Start Follow-up Monitoring": "फॉलो-अप निरीक्षण सुरू करा",
    "Track this crop after treatment and check whether the disease is improving, stable, or getting worse.": "उपचारानंतर या पिकाचे निरीक्षण करा आणि रोगाची स्थिती सुधारत आहे, स्थिर आहे की बिघडत आहे ते पहा.",
    "CURRENT SCAN:": "सध्याचा स्कॅन:",
    "LATEST SCAN FROM DATABASE:": "डेटाबेसमधील नवीनतम स्कॅन:",
    "No recommendation available.": "कोणतीही शिफारस उपलब्ध नाही.",
    "Cultural Practices": "कृषी पद्धती",
    "Monitoring": "निरीक्षण",
    "Safety": "सुरक्षितता",
    "English": "इंग्रजी",
    "Tomato": "टोमॅटो",
    "Potato": "बटाटा",
    "Maize": "मका",
    "Apple": "सफरचंद",
    "Cherry": "चेरी",
    "Grape": "द्राक्षे",
    "Peach": "पीच",
    "Bell Pepper": "ढोबळी मिरची",
    "Strawberry": "स्ट्रॉबेरी",
    "tomato": "टोमॅटो",
    "potato": "बटाटा",
    "maize": "मका",
    "apple": "सफरचंद",
    "cherry": "चेरी",
    "grape": "द्राक्षे",
    "peach": "पीच",
    "bell_pepper": "ढोबळी मिरची",
    "strawberry": "स्ट्रॉबेरी",
    "Leaf Spot": "पानांवरील डाग रोग",

    "Apple with Black Rot": "ब्लॅक रॉट झालेला सफरचंद",
    "Cedar Apple Rust": "सीडर अॅपल रस्ट",
    "Healthy Apple": "निरोगी सफरचंद",
    "Cherry with Powdery Mildew": "पावडरी मिल्ड्यू झालेली चेरी",
    "Healthy Cherry Plant": "निरोगी चेरीचे झाड",
    "Corn (Maize) with Cercospora and Gray Leaf Spot": "सर्कोस्पोरा आणि ग्रे लीफ स्पॉट झालेला मका",
    "Corn (Maize) with Common Rust": "कॉमन रस्ट झालेला मका",
    "Corn (Maize) with Northern Leaf Blight": "नॉर्दर्न लीफ ब्लाइट झालेला मका",
    "Healthy Corn (Maize) Plant": "निरोगी मका",
    "Grape with Black Rot": "ब्लॅक रॉट झालेली द्राक्षे",
    "Grape with Esca (Black Measles)": "एस्का (ब्लॅक मीसल्स) झालेली द्राक्षे",
    "Grape with Isariopsis Leaf Spot": "इसारियोप्सिस लीफ स्पॉट झालेली द्राक्षे",
    "Healthy Grape Plant": "निरोगी द्राक्षाचे झाड",
    "Peach with Bacterial Spot": "बॅक्टेरियल स्पॉट झालेला पीच",
    "Healthy Peach Plant": "निरोगी पीचचे झाड",
    "Bell Pepper with Bacterial Spot": "बॅक्टेरियल स्पॉट झालेली ढोबळी मिरची",
    "Healthy Bell Pepper Plant": "निरोगी ढोबळी मिरचीचे झाड",
    "Potato with Early Blight": "अर्ली ब्लाइट झालेला बटाटा",
    "Potato with Late Blight": "लेट ब्लाइट झालेला बटाटा",
    "Healthy Potato Plant": "निरोगी बटाट्याचे झाड",
    "Tomato with Bacterial Spot": "बॅक्टेरियल स्पॉट झालेला टोमॅटो",
    "Tomato with Early Blight": "अर्ली ब्लाइट झालेला टोमॅटो",
    "Tomato with Late Blight": "लेट ब्लाइट झालेला टोमॅटो",
    "Tomato with Leaf Mold": "लीफ मोल्ड झालेला टोमॅटो",
    "Tomato with Septoria Leaf Spot": "सेप्टोरिया लीफ स्पॉट झालेला टोमॅटो",
    "Tomato with Spider Mites or Two-spotted Spider Mite": "स्पायडर माइट्स झालेला टोमॅटो",
    "Tomato with Target Spot": "टार्गेट स्पॉट झालेला टोमॅटो",
    "Tomato Yellow Leaf Curl Virus": "टोमॅटो यलो लीफ कर्ल व्हायरस",
    "Tomato Mosaic Virus": "टोमॅटो मोझेक व्हायरस",
    "Healthy Tomato Plant": "निरोगी टोमॅटोचे झाड",
    "Strawberry with Leaf Scorch": "लीफ स्कॉर्च झालेली स्ट्रॉबेरी",
    "Healthy Strawberry Plant": "निरोगी स्ट्रॉबेरीचे झाड",

    "Dark spots with concentric rings usually appear on older, lower leaves. Affected leaves may gradually turn yellow and fall.": "जुन्या खालच्या पानांवर सहसा गोलाकार वलयांसह गडद डाग दिसतात. बाधित पाने हळूहळू पिवळी पडून गळू शकतात.",
    "Small dark spots can appear on leaves and other plant parts. Severe infection may cause yellowing and leaf loss.": "पानांवर आणि झाडाच्या इतर भागांवर लहान गडद डाग दिसू शकतात. गंभीर संसर्गामुळे पाने पिवळी पडून गळू शकतात.",
    "Dark, water-soaked lesions can develop on leaves and stems, especially during cool and wet conditions.": "पानांवर आणि खोडांवर गडद, पाण्याने भिजल्यासारखे घाव तयार होऊ शकतात, विशेषतः थंड आणि ओलसर हवामानात.",
    "Small circular leaf spots with darker borders can appear, often beginning on older lower leaves.": "गडद कडांसह लहान गोलाकार पानांवरील डाग दिसू शकतात, जे बहुतेकदा जुन्या खालच्या पानांपासून सुरू होतात.",
    "Leaves may develop fine speckling, yellowing, or bronzing. Fine webbing may sometimes be visible underneath leaves.": "पानांवर बारीक ठिपके, पिवळेपणा किंवा कांस्य रंग दिसू शकतो. कधी कधी पानांच्या खालच्या बाजूला बारीक जाळे दिसू शकते.",
    "Dark, water-soaked lesions may develop on leaves and spread rapidly during wet conditions.": "पानांवर गडद, पाण्याने भिजल्यासारखे घाव तयार होऊ शकतात आणि ओलसर परिस्थितीत ते झपाट्याने पसरू शकतात.",
    "Olive-green to dark lesions may appear on leaves and fruit and can become darker as they develop.": "पानांवर आणि फळांवर ऑलिव्ह-हिरव्या ते गडद रंगाचे घाव दिसू शकतात आणि वाढताना ते अधिक गडद होऊ शकतात.",
    "Yellow-orange spots can develop on leaves, sometimes producing small raised structures on the underside.": "पानांवर पिवळे-नारिंगी डाग तयार होऊ शकतात आणि कधी कधी खालच्या बाजूला लहान उंचवटे दिसू शकतात.",
    "Leaves may develop characteristic striping or spotting between veins, with affected tissue becoming discolored.": "पानांच्या शिरांमधील भागात वैशिष्ट्यपूर्ण पट्टे किंवा डाग दिसू शकतात आणि बाधित ऊतींचा रंग बदलू शकतो.",
    "Dark leaf spots can develop and enlarge, causing infected portions of leaves to deteriorate.": "पानांवर गडद डाग तयार होऊन वाढू शकतात, ज्यामुळे संक्रमित भाग खराब होऊ लागतो.",
    "Small dark spots may appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पानांवर आणि फळांवर लहान गडद डाग दिसू शकतात आणि कधी कधी त्यांच्या भोवती पिवळ्या रंगाची ऊती असते.",
    "Small dark lesions can appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पानांवर आणि फळांवर लहान गडद घाव दिसू शकतात आणि कधी कधी त्यांच्या भोवती पिवळ्या रंगाची ऊती असते.",
    "Dark purple to reddish spots can develop on leaves and may cause affected areas to appear scorched.": "पानांवर गडद जांभळे ते लालसर डाग तयार होऊ शकतात आणि बाधित भाग करपल्यासारखा दिसू शकतो.",

    "Rain expected with very high humidity.": "खूप जास्त आर्द्रतेसह पावसाची शक्यता आहे.",
    "Rain expected in the next 24 hours.": "पुढील २४ तासांत पावसाची शक्यता आहे.",
    "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.": "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगाचा धोका वाढू शकतो. पिकाचे बारकाईने निरीक्षण करा आणि अनावश्यक सिंचन टाळा.",
    "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.": "ओलसर परिस्थितीमुळे काही पिकांच्या रोगांचा धोका वाढू शकतो. पिकाचे बारकाईने निरीक्षण करा आणि पावसापूर्वी अनावश्यक सिंचन टाळा.",
    "High humidity is expected.": "जास्त आर्द्रता अपेक्षित आहे.",
    "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.": "जास्त आर्द्रतेमुळे बुरशीजन्य रोगांच्या वाढीसाठी अनुकूल परिस्थिती निर्माण होऊ शकते. पाने तपासा आणि पिकाचे बारकाईने निरीक्षण करा.",
    "Hot conditions are expected today.": "आज उष्ण परिस्थिती अपेक्षित आहे.",
    "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.": "जास्त तापमानामुळे उष्णतेचा ताण येऊ शकतो आणि पिकाची पाण्याची गरज वाढू शकते. मातीतील ओलावा तपासा आणि त्यानुसार सिंचन करा.",
    "Cool and humid conditions are expected.": "थंड आणि दमट परिस्थिती अपेक्षित आहे.",
    "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.": "थंड आणि दमट हवामान काही बुरशीजन्य आणि जिवाणूजन्य रोगांसाठी अनुकूल ठरू शकते. सुरुवातीची लक्षणे पाहण्यासाठी पाने नियमित तपासा.",
    "Weather conditions look favorable.": "हवामानाची परिस्थिती अनुकूल दिसत आहे.",
    "No significant weather-related disease risk detected. Continue normal crop monitoring.": "हवामानाशी संबंधित कोणताही महत्त्वाचा रोगाचा धोका आढळला नाही. सामान्य पिकाचे निरीक्षण सुरू ठेवा.",
    "today's weather": "आजचे हवामान",
    "Detecting location...": "स्थान शोधले जात आहे...",
    "Fetching weather…": "हवामानाची माहिती मिळवत आहे…",

    "Reported cases:": "नोंदवलेली प्रकरणे:",
    "Risk level:": "जोखीम पातळी:",
    "Monitor nearby crops for early symptoms.": "सुरुवातीची लक्षणे दिसण्यासाठी आसपासच्या पिकांचे निरीक्षण करा.",
    "Your location": "तुमचे स्थान",

    "Something went wrong": "काहीतरी चूक झाली",
    "Scan failed, try again": "स्कॅन अयशस्वी झाला, पुन्हा प्रयत्न करा",
    "Unable to get weather": "हवामानाची माहिती मिळवता आली नाही",
    "Could not refresh scan data:": "स्कॅन डेटा रिफ्रेश करता आला नाही:",
    "This scan cannot be submitted for expert review.": "हा स्कॅन तज्ञ पुनरावलोकनासाठी सबमिट करता येणार नाही.",
    "Could not request expert review.": "तज्ञ पुनरावलोकनाची विनंती करता आली नाही.",
    "No scan ID available:": "स्कॅन आयडी उपलब्ध नाही:",
    "This scan cannot be added to follow-up monitoring.": "हा स्कॅन फॉलो-अप निरीक्षणात जोडता येणार नाही.",
    "Could not start follow-up monitoring.": "फॉलो-अप निरीक्षण सुरू करता आले नाही.",
  }
};



/*
|--------------------------------------------------------------------------
| FINAL APP-WIDE TRANSLATIONS
|--------------------------------------------------------------------------
| These cover the remaining hard-coded strings found across the app,
| including weather/risk content, expert screens, follow-up, map popups,
| disease-guide descriptions, and dynamic values.
|--------------------------------------------------------------------------
*/

const FINAL_TRANSLATIONS = {
  hi: {
    "Kartik Jain": "कार्तिक जैन",
    "Jaipur, Rajasthan": "जयपुर, राजस्थान",
    "Your current location": "आपका वर्तमान स्थान",
    "Main navigation": "मुख्य नेविगेशन",
    "All Crops": "सभी फसलें",
    "All Diseases": "सभी रोग",
    "All Risk Levels": "सभी जोखिम स्तर",
    "High Risk": "उच्च जोखिम",
    "Moderate Risk": "मध्यम जोखिम",
    "Clear filters": "फ़िल्टर साफ़ करें",
    "Active hotspots": "सक्रिय हॉटस्पॉट",
    "High-risk hotspots": "उच्च-जोखिम हॉटस्पॉट",
    "Reported cases in demo area": "डेमो क्षेत्र में रिपोर्ट किए गए मामले",
    "DISEASE SURVEILLANCE": "रोग निगरानी",
    "Crop disease hotspots": "फसल रोग हॉटस्पॉट",
    "Aggregated disease reports help identify areas that may need closer monitoring and preventive intervention.": "एकत्रित रोग रिपोर्ट उन क्षेत्रों की पहचान करने में मदद करती हैं जहाँ अधिक निगरानी और रोकथाम की आवश्यकता हो सकती है।",
    "Showing disease hotspots around your current location": "आपके वर्तमान स्थान के आसपास फसल रोग हॉटस्पॉट दिखाए जा रहे हैं",
    "Nearby crop disease hotspots": "आसपास के फसल रोग हॉटस्पॉट",
    "Reported disease activity around your location": "आपके स्थान के आसपास रिपोर्ट की गई रोग गतिविधि",
    "Detect your location to view the risk map": "जोखिम मानचित्र देखने के लिए अपना स्थान पता करें",
    "The map will show nearby crop-disease hotspots.": "मानचित्र आसपास के फसल-रोग हॉटस्पॉट दिखाएगा।",
    "Risk level:": "जोखिम स्तर:",
    "Reported cases:": "रिपोर्ट किए गए मामले:",
    "Monitor nearby crops for early symptoms.": "शुरुआती लक्षणों के लिए आसपास की फसलों की निगरानी करें।",
    "Your location": "आपका स्थान",

    "Disease Guide": "रोग मार्गदर्शिका",
    "Not sure what a diseased leaf looks like? See examples before scanning.": "पता नहीं रोगग्रस्त पत्ती कैसी दिखती है? स्कैन करने से पहले उदाहरण देखें।",
    "Previous image": "पिछली तस्वीर",
    "Next image": "अगली तस्वीर",
    "Image unavailable": "तस्वीर उपलब्ध नहीं है",
    "View symptoms": "लक्षण देखें",
    "What to look for": "क्या देखें",

    "Plant Disease": "पौधों की बीमारी",
    "Integrated Pest Management": "एकीकृत कीट प्रबंधन",
    "AI Diagnosis": "एआई निदान",
    "AI Recommendation": "एआई सिफारिश",
    "Crop Image": "फसल की तस्वीर",
    "Assess severity and crop condition.": "गंभीरता और फसल की स्थिति का आकलन करें।",
    "Provide practical guidance.": "व्यावहारिक मार्गदर्शन दें।",
    "FIELD ALERT": "खेत चेतावनी",
    "Expert Guidance": "विशेषज्ञ मार्गदर्शन",
    "Verified Expert": "सत्यापित विशेषज्ञ",
    "Expert Workflow": "विशेषज्ञ प्रक्रिया",
    "Agricultural Expert": "कृषि विशेषज्ञ",
    "Agricultural Expert Portal": "कृषि विशेषज्ञ पोर्टल",
    "Expert Portal": "विशेषज्ञ पोर्टल",
    "Farmer Case Review": "किसान केस समीक्षा",
    "Farmer Cases": "किसान के मामले",
    "Farmer Information": "किसान की जानकारी",
    "Expert Review": "विशेषज्ञ समीक्षा",
    "Expert Review Requested": "विशेषज्ञ समीक्षा का अनुरोध किया गया",
    "Checking for expert review...": "विशेषज्ञ समीक्षा की जाँच की जा रही है...",
    "Reviewed by Agricultural Expert": "कृषि विशेषज्ञ द्वारा समीक्षा की गई",
    "Review the farmer's AI diagnosis.": "किसान के एआई निदान की समीक्षा करें।",
    "Write your expert advice...": "अपनी विशेषज्ञ सलाह लिखें...",
    "Total Cases": "कुल मामले",
    "Awaiting Review": "समीक्षा की प्रतीक्षा",
    "High Priority": "उच्च प्राथमिकता",
    "Cases completed": "पूरे किए गए मामले",
    "Cases received": "प्राप्त मामले",
    "Active Reviews": "सक्रिय समीक्षाएँ",
    "Search farmer, crop or disease...": "किसान, फसल या रोग खोजें...",
    "No cases match your search.": "आपकी खोज से कोई मामला मेल नहीं खाता।",
    "Loading farmer cases...": "किसान के मामले लोड हो रहे हैं...",
    "Could not load farmer cases.": "किसान के मामले लोड नहीं हो सके।",
    "Could not load this case.": "यह केस लोड नहीं हो सका।",
    "Please enter expert advice before submitting.": "जमा करने से पहले विशेषज्ञ की सलाह दर्ज करें।",
    "Expert review submitted successfully.": "विशेषज्ञ समीक्षा सफलतापूर्वक जमा की गई।",
    "Could not submit the review.": "समीक्षा जमा नहीं की जा सकी।",
    "No recommendation available.": "कोई सिफारिश उपलब्ध नहीं है।",
    "Monitoring": "निगरानी",
    "Cultural Practices": "कृषि पद्धतियाँ",
    "Safety": "सुरक्षा",
    "Phone": "फोन",
    "Location": "स्थान",
    "Submitted": "जमा किया गया",
    "Qualification": "योग्यता",
    "Specialization": "विशेषज्ञता",
    "Organization / Institution": "संगठन / संस्था",
    "e.g. M.Sc. Agriculture": "जैसे: एम.एससी. कृषि",
    "e.g. Plant Pathology": "जैसे: पादप रोगविज्ञान",
    "Dr. / Expert Name": "डॉ. / विशेषज्ञ का नाम",
    "Could not start follow-up monitoring.": "फॉलो-अप निगरानी शुरू नहीं की जा सकी।",

    "Follow-up Monitoring": "फॉलो-अप निगरानी",
    "Keep track of crops you've already scanned, and see how they're responding over time.": "जिन फसलों को आपने पहले स्कैन किया है उनका रिकॉर्ड रखें और समय के साथ उनकी स्थिति देखें।",
    "No active follow-ups": "कोई सक्रिय फॉलो-अप नहीं है",
    "Start a follow-up after scanning a crop to monitor it over time.": "समय के साथ फसल की निगरानी के लिए स्कैन के बाद फॉलो-अप शुरू करें।",
    "WHAT TO WATCH FOR": "क्या देखें",
    "SCAN HISTORY": "स्कैन इतिहास",
    "Scan this crop again": "इस फसल को फिर से स्कैन करें",
    "Analysing your scan…": "आपके स्कैन का विश्लेषण किया जा रहा है…",
    "First seen at": "पहली बार देखा गया",
    "Latest diagnosis:": "नवीनतम निदान:",
    "Review requested": "समीक्षा का अनुरोध किया गया",
    "Reviewed on": "समीक्षा की तारीख",
    "Sent to an expert": "विशेषज्ञ को भेजा गया",
    "Check back here once they've reviewed your case.": "जब वे आपके मामले की समीक्षा कर लें, तब यहाँ दोबारा देखें।",
    "Requested on": "अनुरोध की तारीख",
    "Needs attention": "ध्यान देने की आवश्यकता",
    "Holding steady": "स्थिति स्थिर है",
    "Scan": "स्कैन",

    "Unable to get weather": "मौसम की जानकारी प्राप्त नहीं हो सकी",
    "Weather Risk Alert": "मौसम जोखिम चेतावनी",
    "Crop conditions look favorable": "फसल की स्थिति अनुकूल दिख रही है",
    "No immediate weather-related crop risk detected.": "मौसम से संबंधित किसी तत्काल फसल जोखिम का पता नहीं चला।",
    "Fungal disease risk may increase": "फफूंदजनित रोगों का जोखिम बढ़ सकता है",
    "Rain expected with very high humidity.": "बहुत अधिक नमी के साथ बारिश की संभावना है।",
    "High humidity + rainfall may significantly increase fungal disease risk.": "अधिक नमी और बारिश से फफूंदजनित रोग का जोखिम काफी बढ़ सकता है।",
    "Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.": "अपनी फसल की बारीकी से जांच करें, जहाँ संभव हो खेत में हवा का संचार बेहतर करें और अनावश्यक सिंचाई से बचें।",
    "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.": "अधिक नमी और बारिश से फफूंदजनित रोग का जोखिम बढ़ सकता है। अपनी फसल की बारीकी से निगरानी करें और अनावश्यक सिंचाई से बचें।",
    "High humidity + rainfall may increase fungal disease risk.": "अधिक नमी और बारिश से फफूंदजनित रोग का जोखिम बढ़ सकता है।",
    "Rain expected in the next 24 hours.": "अगले 24 घंटों में बारिश की संभावना है।",
    "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.": "गीली परिस्थितियाँ कुछ फसल रोगों का जोखिम बढ़ा सकती हैं। अपनी फसल की बारीकी से निगरानी करें और बारिश से पहले अनावश्यक सिंचाई से बचें।",
    "High humidity is expected.": "अधिक नमी की संभावना है।",
    "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.": "अधिक नमी फफूंदजनित रोगों के विकास के लिए अनुकूल परिस्थितियाँ बना सकती है। पत्तियों की जाँच करें और फसल की बारीकी से निगरानी करें।",
    "Hot conditions are expected today.": "आज गर्म मौसम की संभावना है।",
    "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.": "अधिक तापमान से गर्मी का तनाव हो सकता है और फसल की पानी की आवश्यकता बढ़ सकती है। मिट्टी की नमी की निगरानी करें और उसी अनुसार सिंचाई करें।",
    "Cool and humid conditions are expected.": "ठंडे और नम मौसम की संभावना है।",
    "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.": "ठंडा और नम मौसम कुछ फफूंदजनित और जीवाणुजनित रोगों के लिए अनुकूल हो सकता है। शुरुआती लक्षणों के लिए पत्तियों की नियमित जाँच करें।",
    "Weather conditions look favorable.": "मौसम की स्थिति अनुकूल दिखाई दे रही है।",
    "No significant weather-related disease risk detected. Continue normal crop monitoring.": "मौसम से संबंधित कोई महत्वपूर्ण रोग जोखिम नहीं पाया गया। सामान्य फसल निगरानी जारी रखें।",

    "Tomato — Septoria Leaf Spot": "टमाटर — सेप्टोरिया लीफ स्पॉट",
    "Tomato — Early Blight": "टमाटर — अर्ली ब्लाइट",
    "Potato — Healthy": "आलू — स्वस्थ",

    "Brown circular lesions with target-like rings may appear on leaves and can expand under favorable conditions.": "पत्तियों पर लक्ष्य जैसे छल्लों वाले भूरे गोल घाव दिखाई दे सकते हैं और अनुकूल परिस्थितियों में फैल सकते हैं।",
    "Brown lesions with concentric rings commonly develop on older leaves.": "पुरानी पत्तियों पर आमतौर पर संकेंद्रित छल्लों वाले भूरे घाव विकसित होते हैं।",
    "Long, cigar-shaped gray-green or brown lesions can develop across maize leaves.": "मक्का की पत्तियों पर लंबे, सिगार के आकार के धूसर-हरे या भूरे घाव बन सकते हैं।",
    "Long, narrow gray to brown lesions develop on leaves and may become more noticeable as infection progresses.": "पत्तियों पर लंबे, संकरे धूसर से भूरे घाव बनते हैं और संक्रमण बढ़ने के साथ अधिक स्पष्ट हो सकते हैं।",
    "Small dark lesions can appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पत्तियों और फलों पर छोटे गहरे घाव दिखाई दे सकते हैं, जिनके आसपास कभी-कभी पीला ऊतक होता है।",
    "Small dark spots can appear on leaves and other plant parts. Severe infection may cause yellowing and leaf loss.": "पत्तियों और पौधे के अन्य भागों पर छोटे गहरे धब्बे दिखाई दे सकते हैं। गंभीर संक्रमण से पत्तियाँ पीली होकर गिर सकती हैं।",
    "Dark, water-soaked lesions can develop on leaves and stems, especially during cool and wet conditions.": "पत्तियों और तनों पर गहरे, पानी से भीगे हुए घाव बन सकते हैं, विशेषकर ठंडे और नम मौसम में।",
    "Dark, water-soaked lesions may develop on leaves and spread rapidly during wet conditions.": "पत्तियों पर गहरे, पानी से भीगे घाव बन सकते हैं और नम परिस्थितियों में तेजी से फैल सकते हैं।",
    "Dark leaf spots can develop and enlarge, causing infected portions of leaves to deteriorate.": "पत्तियों पर गहरे धब्बे बनकर फैल सकते हैं, जिससे संक्रमित भाग खराब होने लगते हैं।",
    "Dark purple to reddish spots can develop on leaves and may cause affected areas to appear scorched.": "पत्तियों पर गहरे बैंगनी से लाल धब्बे बन सकते हैं और प्रभावित भाग झुलसा हुआ दिखाई दे सकता है।",
    "Leaves may curl upward, become yellow, and show reduced growth. Plants can become noticeably stunted.": "पत्तियाँ ऊपर की ओर मुड़ सकती हैं, पीली पड़ सकती हैं और वृद्धि कम हो सकती है। पौधे स्पष्ट रूप से बौने रह सकते हैं।",
    "Leaves may develop fine speckling, yellowing, or bronzing. Fine webbing may sometimes be visible underneath leaves.": "पत्तियों पर बारीक धब्बे, पीलापन या कांस्य रंग दिखाई दे सकता है। कभी-कभी पत्तियों के नीचे महीन जाल भी दिखाई दे सकता है।",
    "Leaves may develop characteristic striping or spotting between veins, with affected tissue becoming discolored.": "पत्तियों की नसों के बीच विशिष्ट धारियाँ या धब्बे दिखाई दे सकते हैं और प्रभावित ऊतक का रंग बदल सकता है।",
    "Olive-green to dark lesions may appear on leaves and fruit and can become darker as they develop.": "पत्तियों और फलों पर जैतूनी हरे से गहरे घाव दिखाई दे सकते हैं और बढ़ने के साथ अधिक गहरे हो सकते हैं।",
    "Purple or brown leaf spots may develop and gradually enlarge, sometimes forming concentric rings.": "बैंगनी या भूरे पत्ती-धब्बे बन सकते हैं और धीरे-धीरे फैल सकते हैं, कभी-कभी संकेंद्रित छल्ले बनाते हैं।",
    "Small dark spots may appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पत्तियों और फलों पर छोटे गहरे धब्बे दिखाई दे सकते हैं, जिनके आसपास कभी-कभी पीला ऊतक होता है।",
    "White, powder-like fungal growth may appear on leaves and young plant tissue.": "पत्तियों और पौधे के कोमल ऊतकों पर सफेद, पाउडर जैसी फफूंद वृद्धि दिखाई दे सकती है।",
    "Yellow patches may develop on the upper leaf surface while olive-green or brown fungal growth can appear underneath.": "पत्ती की ऊपरी सतह पर पीले धब्बे बन सकते हैं, जबकि नीचे जैतूनी हरे या भूरे रंग की फफूंद वृद्धि दिखाई दे सकती है।",
    "Yellow-orange spots can develop on leaves, sometimes producing small raised structures on the underside.": "पत्तियों पर पीले-नारंगी धब्बे बन सकते हैं और कभी-कभी नीचे की सतह पर छोटे उभरे हुए ढाँचे दिखाई दे सकते हैं।",
  },

  mr: {
    "Kartik Jain": "कार्तिक जैन",
    "Jaipur, Rajasthan": "जयपूर, राजस्थान",
    "Your current location": "तुमचे सध्याचे स्थान",
    "Main navigation": "मुख्य नेव्हिगेशन",
    "All Crops": "सर्व पिके",
    "All Diseases": "सर्व रोग",
    "All Risk Levels": "सर्व जोखीम पातळी",
    "High Risk": "जास्त जोखीम",
    "Moderate Risk": "मध्यम जोखीम",
    "Clear filters": "फिल्टर साफ करा",
    "Active hotspots": "सक्रिय हॉटस्पॉट",
    "High-risk hotspots": "जास्त जोखीम असलेले हॉटस्पॉट",
    "Reported cases in demo area": "डेमो क्षेत्रातील नोंदवलेली प्रकरणे",
    "DISEASE SURVEILLANCE": "रोग निरीक्षण",
    "Crop disease hotspots": "पिकांच्या रोगांचे हॉटस्पॉट",
    "Aggregated disease reports help identify areas that may need closer monitoring and preventive intervention.": "एकत्रित रोग अहवालांमुळे अधिक निरीक्षण आणि प्रतिबंधात्मक उपायांची गरज असलेले भाग ओळखण्यास मदत होते.",
    "Showing disease hotspots around your current location": "तुमच्या सध्याच्या स्थानाच्या आसपास पिकांच्या रोगांचे हॉटस्पॉट दाखवत आहे",
    "Nearby crop disease hotspots": "आसपासच्या पिकांच्या रोगांचे हॉटस्पॉट",
    "Reported disease activity around your location": "तुमच्या स्थानाभोवती नोंदवलेली रोगाची सक्रियता",
    "Detect your location to view the risk map": "जोखीम नकाशा पाहण्यासाठी तुमचे स्थान शोधा",
    "The map will show nearby crop-disease hotspots.": "नकाशावर आसपासच्या पिकांच्या रोगांचे हॉटस्पॉट दिसतील.",
    "Risk level:": "जोखीम पातळी:",
    "Reported cases:": "नोंदवलेली प्रकरणे:",
    "Monitor nearby crops for early symptoms.": "सुरुवातीची लक्षणे दिसण्यासाठी आसपासच्या पिकांचे निरीक्षण करा.",
    "Your location": "तुमचे स्थान",

    "Disease Guide": "रोग मार्गदर्शक",
    "Not sure what a diseased leaf looks like? See examples before scanning.": "रोगग्रस्त पान कसे दिसते हे माहीत नाही? स्कॅन करण्यापूर्वी उदाहरणे पहा.",
    "Previous image": "मागील प्रतिमा",
    "Next image": "पुढील प्रतिमा",
    "Image unavailable": "प्रतिमा उपलब्ध नाही",
    "View symptoms": "लक्षणे पहा",
    "What to look for": "काय पाहावे",

    "Plant Disease": "वनस्पती रोग",
    "Integrated Pest Management": "एकात्मिक कीड व्यवस्थापन",
    "AI Diagnosis": "एआय निदान",
    "AI Recommendation": "एआय शिफारस",
    "Crop Image": "पिकाची प्रतिमा",
    "Assess severity and crop condition.": "तीव्रता आणि पिकाच्या स्थितीचे मूल्यांकन करा.",
    "Provide practical guidance.": "व्यावहारिक मार्गदर्शन द्या.",
    "FIELD ALERT": "शेत चेतावणी",
    "Expert Guidance": "तज्ञ मार्गदर्शन",
    "Verified Expert": "सत्यापित तज्ञ",
    "Expert Workflow": "तज्ञ प्रक्रिया",
    "Agricultural Expert": "कृषी तज्ञ",
    "Agricultural Expert Portal": "कृषी तज्ञ पोर्टल",
    "Expert Portal": "तज्ञ पोर्टल",
    "Farmer Case Review": "शेतकरी प्रकरण पुनरावलोकन",
    "Farmer Cases": "शेतकऱ्यांची प्रकरणे",
    "Farmer Information": "शेतकऱ्याची माहिती",
    "Expert Review": "तज्ञ पुनरावलोकन",
    "Expert Review Requested": "तज्ञ पुनरावलोकनाची विनंती केली",
    "Checking for expert review...": "तज्ञ पुनरावलोकन तपासले जात आहे...",
    "Reviewed by Agricultural Expert": "कृषी तज्ञांनी पुनरावलोकन केले",
    "Review the farmer's AI diagnosis.": "शेतकऱ्याच्या एआय निदानाचे पुनरावलोकन करा.",
    "Write your expert advice...": "तुमचा तज्ञांचा सल्ला लिहा...",
    "Total Cases": "एकूण प्रकरणे",
    "Awaiting Review": "पुनरावलोकनाच्या प्रतीक्षेत",
    "High Priority": "उच्च प्राधान्य",
    "Cases completed": "पूर्ण केलेली प्रकरणे",
    "Cases received": "प्राप्त प्रकरणे",
    "Active Reviews": "सक्रिय पुनरावलोकने",
    "Search farmer, crop or disease...": "शेतकरी, पीक किंवा रोग शोधा...",
    "No cases match your search.": "तुमच्या शोधाशी जुळणारी प्रकरणे नाहीत.",
    "Loading farmer cases...": "शेतकऱ्यांची प्रकरणे लोड होत आहेत...",
    "Could not load farmer cases.": "शेतकऱ्यांची प्रकरणे लोड करता आली नाहीत.",
    "Could not load this case.": "हे प्रकरण लोड करता आले नाही.",
    "Please enter expert advice before submitting.": "सबमिट करण्यापूर्वी तज्ञांचा सल्ला लिहा.",
    "Expert review submitted successfully.": "तज्ञ पुनरावलोकन यशस्वीरित्या सबमिट झाले.",
    "Could not submit the review.": "पुनरावलोकन सबमिट करता आले नाही.",
    "No recommendation available.": "कोणतीही शिफारस उपलब्ध नाही.",
    "Monitoring": "निरीक्षण",
    "Cultural Practices": "कृषी पद्धती",
    "Safety": "सुरक्षितता",
    "Phone": "फोन",
    "Location": "स्थान",
    "Submitted": "सबमिट केले",
    "Qualification": "पात्रता",
    "Specialization": "विशेषज्ञता",
    "Organization / Institution": "संस्था / संघटना",
    "e.g. M.Sc. Agriculture": "उदा. एम.एससी. कृषी",
    "e.g. Plant Pathology": "उदा. वनस्पती रोगशास्त्र",
    "Dr. / Expert Name": "डॉ. / तज्ञांचे नाव",

    "Follow-up Monitoring": "फॉलो-अप निरीक्षण",
    "Keep track of crops you've already scanned, and see how they're responding over time.": "आधी स्कॅन केलेल्या पिकांची नोंद ठेवा आणि कालांतराने त्यांची स्थिती कशी बदलते ते पहा.",
    "No active follow-ups": "कोणतेही सक्रिय फॉलो-अप नाहीत",
    "Start a follow-up after scanning a crop to monitor it over time.": "कालांतराने पिकावर लक्ष ठेवण्यासाठी स्कॅन केल्यानंतर फॉलो-अप सुरू करा.",
    "WHAT TO WATCH FOR": "काय पाहावे",
    "SCAN HISTORY": "स्कॅन इतिहास",
    "Scan this crop again": "हे पीक पुन्हा स्कॅन करा",
    "Analysing your scan…": "तुमच्या स्कॅनचे विश्लेषण केले जात आहे…",
    "First seen at": "प्रथम आढळले",
    "Latest diagnosis:": "नवीनतम निदान:",
    "Reviewed on": "पुनरावलोकनाची तारीख",
    "Sent to an expert": "तज्ञांकडे पाठवले",
    "Check back here once they've reviewed your case.": "तुमच्या प्रकरणाचे पुनरावलोकन झाल्यानंतर येथे पुन्हा पहा.",
    "Requested on": "विनंतीची तारीख",
    "Needs attention": "लक्ष देणे आवश्यक",
    "Holding steady": "स्थिती स्थिर आहे",
    "Scan": "स्कॅन",

    "Unable to get weather": "हवामानाची माहिती मिळवता आली नाही",
    "Weather Risk Alert": "हवामान जोखीम इशारा",
    "Crop conditions look favorable": "पिकाची स्थिती अनुकूल दिसत आहे",
    "No immediate weather-related crop risk detected.": "हवामानाशी संबंधित तातडीचा पिकाचा धोका आढळला नाही.",
    "Fungal disease risk may increase": "बुरशीजन्य रोगांचा धोका वाढू शकतो",
    "Rain expected with very high humidity.": "अतिशय जास्त आर्द्रतेसह पावसाची शक्यता आहे.",
    "High humidity + rainfall may significantly increase fungal disease risk.": "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगांचा धोका मोठ्या प्रमाणात वाढू शकतो.",
    "Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.": "पिकाची बारकाईने तपासणी करा, शक्य असल्यास शेतातील हवा खेळती ठेवा आणि अनावश्यक सिंचन टाळा.",
    "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.": "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगांचा धोका वाढू शकतो. पिकाचे बारकाईने निरीक्षण करा आणि अनावश्यक सिंचन टाळा.",
    "High humidity + rainfall may increase fungal disease risk.": "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगांचा धोका वाढू शकतो.",
    "Rain expected in the next 24 hours.": "पुढील २४ तासांत पावसाची शक्यता आहे.",
    "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.": "ओलसर परिस्थितीमुळे काही पिकांच्या रोगांचा धोका वाढू शकतो. पिकाचे बारकाईने निरीक्षण करा आणि पावसापूर्वी अनावश्यक सिंचन टाळा.",
    "High humidity is expected.": "जास्त आर्द्रतेची शक्यता आहे.",
    "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.": "जास्त आर्द्रतेमुळे बुरशीजन्य रोगांच्या वाढीसाठी अनुकूल परिस्थिती निर्माण होऊ शकते. पाने तपासा आणि पिकाचे बारकाईने निरीक्षण करा.",
    "Hot conditions are expected today.": "आज उष्ण हवामानाची शक्यता आहे.",
    "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.": "जास्त तापमानामुळे उष्णतेचा ताण येऊ शकतो आणि पिकाची पाण्याची गरज वाढू शकते. मातीतील ओलावा तपासा आणि त्यानुसार सिंचन करा.",
    "Cool and humid conditions are expected.": "थंड आणि दमट हवामानाची शक्यता आहे.",
    "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.": "थंड आणि दमट हवामान काही बुरशीजन्य आणि जिवाणूजन्य रोगांसाठी अनुकूल ठरू शकते. सुरुवातीची लक्षणे दिसण्यासाठी पाने नियमित तपासा.",
    "Weather conditions look favorable.": "हवामानाची स्थिती अनुकूल दिसत आहे.",
    "No significant weather-related disease risk detected. Continue normal crop monitoring.": "हवामानाशी संबंधित कोणताही महत्त्वाचा रोगाचा धोका आढळला नाही. सामान्य पिकाचे निरीक्षण सुरू ठेवा.",

    "Tomato — Septoria Leaf Spot": "टोमॅटो — सेप्टोरिया लीफ स्पॉट",
    "Tomato — Early Blight": "टोमॅटो — अर्ली ब्लाइट",
    "Potato — Healthy": "बटाटा — निरोगी",

    "Brown circular lesions with target-like rings may appear on leaves and can expand under favorable conditions.": "पानांवर लक्ष्याप्रमाणे वलय असलेले तपकिरी गोल घाव दिसू शकतात आणि अनुकूल परिस्थितीत ते वाढू शकतात.",
    "Brown lesions with concentric rings commonly develop on older leaves.": "जुन्या पानांवर सहसा संकेंद्रित वलय असलेले तपकिरी घाव तयार होतात.",
    "Long, cigar-shaped gray-green or brown lesions can develop across maize leaves.": "मक्याच्या पानांवर लांब, सिगारच्या आकाराचे राखाडी-हिरवे किंवा तपकिरी घाव तयार होऊ शकतात.",
    "Long, narrow gray to brown lesions develop on leaves and may become more noticeable as infection progresses.": "पानांवर लांब, अरुंद राखाडी ते तपकिरी घाव तयार होतात आणि संसर्ग वाढल्यावर अधिक स्पष्ट दिसू शकतात.",
    "Small dark lesions can appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पानांवर आणि फळांवर लहान गडद घाव दिसू शकतात आणि कधी कधी त्यांच्या भोवती पिवळ्या रंगाची ऊती असते.",
    "Small dark spots can appear on leaves and other plant parts. Severe infection may cause yellowing and leaf loss.": "पानांवर आणि झाडाच्या इतर भागांवर लहान गडद डाग दिसू शकतात. गंभीर संसर्गामुळे पाने पिवळी पडून गळू शकतात.",
    "Dark, water-soaked lesions can develop on leaves and stems, especially during cool and wet conditions.": "पानांवर आणि खोडांवर गडद, पाण्याने भिजल्यासारखे घाव तयार होऊ शकतात, विशेषतः थंड आणि ओलसर हवामानात.",
    "Dark, water-soaked lesions may develop on leaves and spread rapidly during wet conditions.": "पानांवर गडद, पाण्याने भिजल्यासारखे घाव तयार होऊ शकतात आणि ओलसर परिस्थितीत ते झपाट्याने पसरू शकतात.",
    "Dark leaf spots can develop and enlarge, causing infected portions of leaves to deteriorate.": "पानांवर गडद डाग तयार होऊन वाढू शकतात, ज्यामुळे संक्रमित भाग खराब होऊ लागतो.",
    "Dark purple to reddish spots can develop on leaves and may cause affected areas to appear scorched.": "पानांवर गडद जांभळे ते लालसर डाग तयार होऊ शकतात आणि बाधित भाग करपल्यासारखा दिसू शकतो.",
    "Leaves may curl upward, become yellow, and show reduced growth. Plants can become noticeably stunted.": "पाने वरच्या दिशेने वाकू शकतात, पिवळी पडू शकतात आणि वाढ कमी होऊ शकते. झाडे स्पष्टपणे खुंटलेली दिसू शकतात.",
    "Leaves may develop fine speckling, yellowing, or bronzing. Fine webbing may sometimes be visible underneath leaves.": "पानांवर बारीक ठिपके, पिवळेपणा किंवा कांस्य रंग दिसू शकतो. कधी कधी पानांच्या खालच्या बाजूला बारीक जाळे दिसू शकते.",
    "Leaves may develop characteristic striping or spotting between veins, with affected tissue becoming discolored.": "पानांच्या शिरांमधील भागात वैशिष्ट्यपूर्ण पट्टे किंवा डाग दिसू शकतात आणि बाधित ऊतींचा रंग बदलू शकतो.",
    "Olive-green to dark lesions may appear on leaves and fruit and can become darker as they develop.": "पानांवर आणि फळांवर ऑलिव्ह-हिरव्या ते गडद रंगाचे घाव दिसू शकतात आणि वाढताना ते अधिक गडद होऊ शकतात.",
    "Purple or brown leaf spots may develop and gradually enlarge, sometimes forming concentric rings.": "जांभळे किंवा तपकिरी पानांवरील डाग तयार होऊन हळूहळू वाढू शकतात आणि कधी कधी संकेंद्रित वलये तयार होतात.",
    "Small dark spots may appear on leaves and fruit, sometimes surrounded by yellow tissue.": "पानांवर आणि फळांवर लहान गडद डाग दिसू शकतात आणि कधी कधी त्यांच्या भोवती पिवळ्या रंगाची ऊती असते.",
    "White, powder-like fungal growth may appear on leaves and young plant tissue.": "पानांवर आणि कोवळ्या ऊतींवर पांढऱ्या पावडरीसारखी बुरशीची वाढ दिसू शकते.",
    "Yellow patches may develop on the upper leaf surface while olive-green or brown fungal growth can appear underneath.": "पानांच्या वरच्या पृष्ठभागावर पिवळे डाग तयार होऊ शकतात तर खालच्या बाजूला ऑलिव्ह-हिरवी किंवा तपकिरी बुरशीची वाढ दिसू शकते.",
    "Yellow-orange spots can develop on leaves, sometimes producing small raised structures on the underside.": "पानांवर पिवळे-नारिंगी डाग तयार होऊ शकतात आणि कधी कधी खालच्या बाजूला लहान उंचवटे दिसू शकतात.",
  },
};

Object.assign(AUTO_TRANSLATIONS.hi, FINAL_TRANSLATIONS.hi);
Object.assign(AUTO_TRANSLATIONS.mr, FINAL_TRANSLATIONS.mr);

Object.assign(AUTO_TRANSLATIONS.hi, EXTRA_TRANSLATIONS.hi);
Object.assign(AUTO_TRANSLATIONS.mr, EXTRA_TRANSLATIONS.mr);

/*
|--------------------------------------------------------------------------
| React-safe legacy DOM translation
|--------------------------------------------------------------------------
| A small compatibility layer for components that still render literal
| English strings. Unlike the old implementation, it remembers the original
| text so switching hi <-> mr <-> en works correctly.
|--------------------------------------------------------------------------
*/


// Also index every English display value from translations.js as a legacy key.
// This lets literal JSX such as <span>Loading...</span> use the same dictionary.
for (const language of ["hi", "mr"]) {
  const englishEntries = translations?.en || {};
  const translatedEntries = translations?.[language] || {};
  for (const [key, englishValue] of Object.entries(englishEntries)) {
    if (typeof englishValue !== "string" || !englishValue.trim()) continue;
    const translatedValue = translatedEntries[key];
    if (typeof translatedValue === "string" && translatedValue.trim()) {
      AUTO_TRANSLATIONS[language][englishValue] = translatedValue;
    }
  }
}

const originalTextByNode = new WeakMap();
const originalAttrByElement = new WeakMap();

function translateDOM(lang) {
  if (typeof document === "undefined") return;

  const dictionary = AUTO_TRANSLATIONS[lang] || {};

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    let original = originalTextByNode.get(node);

    if (original === undefined) {
      original = node.nodeValue || "";
      originalTextByNode.set(node, original);
    }

    const trimmed = original.replace(/\s+/g, " ").trim();

    if (!trimmed) return;

    const translated = lang === "en"
      ? original
      : translateString(trimmed, dictionary);

    if (translated !== undefined) {
      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";

      node.nodeValue =
        leading + translated + trailing;
    } else if (lang === "en") {
      node.nodeValue = original;
    }
  });

  document
    .querySelectorAll(
      "input[placeholder], textarea[placeholder], input[aria-label], textarea[aria-label], button[aria-label], [title]"
    )
    .forEach((element) => {
      let attrs = originalAttrByElement.get(element);

      if (!attrs) {
        attrs = {};
        originalAttrByElement.set(element, attrs);
      }

      ["placeholder", "aria-label", "title"].forEach((attribute) => {
        const current = element.getAttribute(attribute);

        if (attrs[attribute] === undefined && current != null) {
          attrs[attribute] = current;
        }

        const original = attrs[attribute];

        if (original == null) return;

        if (lang === "en") {
          element.setAttribute(attribute, original);
        } else {
          const translated = translateString(original, dictionary);

          if (translated !== undefined) {
            element.setAttribute(attribute, translated);
          }
        }
      });
    });
}

/*
|--------------------------------------------------------------------------
| Exact + common dynamic-string translation
|--------------------------------------------------------------------------
*/

function translateString(value, dictionary) {
  if (!value) return value;

  if (dictionary[value]) {
    return dictionary[value];
  }

  // Do not try to translate already-localized text.
  if (/^[\s\d\W]*[\u0900-\u097F]/.test(value)) {
    return undefined;
  }

  let result = value;

  const replacements = Object.entries(dictionary)
    .filter(([key]) => key && key.length >= 3)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [english, translated] of replacements) {
    if (result.includes(english) && english !== value) {
      result = result.split(english).join(translated);
    }
  }

  return result === value ? undefined : result;
}


export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("cropsense_lang") || "en";
  });

  function changeLang(newLang) {
    const nextLang = ["en", "hi", "mr"].includes(newLang)
      ? newLang
      : "en";

    localStorage.setItem("cropsense_lang", nextLang);
    setLang(nextLang);
  }

  function t(key) {
    if (!key) return "";

    // Preferred translation.js key.
    const directTranslation =
      translations?.[lang]?.[key];

    if (directTranslation) {
      return directTranslation;
    }

    // Legacy hard-coded English string.
    const autoTranslation =
      AUTO_TRANSLATIONS?.[lang]?.[key];

    if (autoTranslation) {
      return autoTranslation;
    }

    // English fallback.
    return translations?.en?.[key] || key;
  }

  useEffect(() => {
    if (typeof document === "undefined") return;

    /*
      React-rendered strings using t() are already translated.
      The DOM layer below is only a compatibility bridge for legacy
      components that still contain literal English.
    */

    const runTranslation = () => {
      translateDOM(lang);
    };

    // Initial pass.
    const initialTimer = setTimeout(runTranslation, 0);

    const observer = new MutationObserver(() => {
      // Avoid doing several full DOM scans in one render burst.
      window.clearTimeout(
        observer.__translationTimer
      );

      observer.__translationTimer = window.setTimeout(
        runTranslation,
        0
      );
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [
        "placeholder",
        "aria-label",
        "title",
      ],
    });

    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(
        observer.__translationTimer
      );
      observer.disconnect();
    };
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        changeLang,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
