import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Camera,
  MapPin,
  ScanLine,
  Droplets,
  CloudRain,
} from "lucide-react";
import { COLORS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getScanHistory, getWeather } from "../api/client";

const SEVERITY_COLOR = {
  Low: COLORS.ok,
  Medium: COLORS.amberDeep,
  High: COLORS.danger,
};

const SEVERITY_KEY = {
  Low: "severityLow",
  Medium: "severityMedium",
  High: "severityHigh",
};

const HOME_TRANSLATIONS = {
  hi: {
    "Detecting location...": "स्थान खोजा जा रहा है...",
    "Current location": "वर्तमान स्थान",
    "Fetching weather…": "मौसम की जानकारी प्राप्त की जा रही है…",
    humidity: "नमी",
    "rain chance": "बारिश की संभावना",

    "Rain expected with very high humidity.":
      "बहुत अधिक नमी के साथ बारिश की संभावना है।",
    "High humidity + rainfall may significantly increase fungal disease risk. Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.":
      "अधिक नमी और बारिश से फंगल रोग का जोखिम काफी बढ़ सकता है। अपनी फसल की बारीकी से जांच करें, जहाँ संभव हो खेत में हवा का संचार बेहतर करें और अनावश्यक सिंचाई से बचें।",
    "High humidity + rainfall may significantly increase fungal disease risk.":
      "अधिक नमी और बारिश से फंगल रोग का जोखिम काफी बढ़ सकता है।",
    "Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.":
      "अपनी फसल की बारीकी से जांच करें, जहाँ संभव हो खेत में हवा का संचार बेहतर करें और अनावश्यक सिंचाई से बचें।",

    "Rain expected in the next 24 hours.":
      "अगले 24 घंटों में बारिश की संभावना है।",
    "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.":
      "अधिक नमी और बारिश से फंगल रोग का जोखिम बढ़ सकता है। फसल की बारीकी से निगरानी करें और अनावश्यक सिंचाई से बचें।",
    "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.":
      "गीली परिस्थितियाँ कुछ फसल रोगों का जोखिम बढ़ा सकती हैं। फसल की बारीकी से निगरानी करें और बारिश से पहले अनावश्यक सिंचाई से बचें।",
    "High humidity is expected.":
      "अधिक नमी की संभावना है।",
    "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.":
      "अधिक नमी फंगल रोगों के विकास के लिए अनुकूल परिस्थितियाँ बना सकती है। पत्तियों की जांच करें और फसल की बारीकी से निगरानी करें।",
    "Hot conditions are expected today.":
      "आज गर्म मौसम की संभावना है।",
    "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.":
      "अधिक तापमान से फसल में गर्मी का तनाव हो सकता है और पानी की आवश्यकता बढ़ सकती है। मिट्टी की नमी की निगरानी करें और उसी के अनुसार सिंचाई करें।",
    "Cool and humid conditions are expected.":
      "ठंडे और नम मौसम की संभावना है।",
    "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.":
      "ठंडा और नम मौसम कुछ फंगल और बैक्टीरियल रोगों के लिए अनुकूल हो सकता है। शुरुआती लक्षणों के लिए पत्तियों की नियमित जांच करें।",
    "Weather conditions look favorable.":
      "मौसम की स्थिति अनुकूल दिख रही है।",
    "No significant weather-related disease risk detected. Continue normal crop monitoring.":
      "मौसम से संबंधित किसी महत्वपूर्ण रोग जोखिम का पता नहीं चला। सामान्य रूप से फसल की निगरानी जारी रखें।",

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
    "Thunderstorms possible": "आंधी-तूफान संभव है",
    "Thunderstorms with hail possible": "ओलावृष्टि के साथ आंधी-तूफान संभव है",
    "Severe thunderstorms possible": "तेज़ आंधी-तूफान संभव है",
    "Weather conditions": "मौसम की स्थिति",

    "Tomato": "टमाटर",
    "Potato": "आलू",
    "Maize": "मक्का",
    "Apple": "सेब",
    "Cherry": "चेरी",
    "Grape": "अंगूर",
    "Peach": "आड़ू",
    "Bell Pepper": "शिमला मिर्च",
    "Strawberry": "स्ट्रॉबेरी",

    "Early Blight": "अर्ली ब्लाइट",
    "Late Blight": "लेट ब्लाइट",
    "Bacterial Spot": "बैक्टीरियल स्पॉट",
    "Leaf Mold": "लीफ मोल्ड",
    "Septoria Leaf Spot": "सेप्टोरिया लीफ स्पॉट",
    "Spider Mites": "स्पाइडर माइट्स",
    "Target Spot": "टार्गेट स्पॉट",
    "Tomato Yellow Leaf Curl Virus": "टमाटर येलो लीफ कर्ल वायरस",
    "Tomato Mosaic Virus": "टमाटर मोज़ेक वायरस",
    "Apple Scab": "एप्पल स्कैब",
    "Black Rot": "ब्लैक रॉट",
    "Cedar Apple Rust": "सीडर एप्पल रस्ट",
    "Powdery Mildew": "पाउडरी मिल्ड्यू",
    "Common Rust": "कॉमन रस्ट",
    "Northern Leaf Blight": "नॉर्दर्न लीफ ब्लाइट",
    "Leaf Scorch": "लीफ स्कॉर्च",
  },

  mr: {
    "Detecting location...": "स्थान शोधले जात आहे...",
    "Current location": "सध्याचे स्थान",
    "Fetching weather…": "हवामानाची माहिती मिळवत आहे…",
    humidity: "आर्द्रता",
    "rain chance": "पावसाची शक्यता",

    "Rain expected with very high humidity.":
      "अतिशय जास्त आर्द्रतेसह पावसाची शक्यता आहे.",
    "High humidity + rainfall may significantly increase fungal disease risk. Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.":
      "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगांचा धोका मोठ्या प्रमाणात वाढू शकतो. पिकाची बारकाईने तपासणी करा, शक्य असल्यास शेतातील हवा खेळती ठेवा आणि अनावश्यक सिंचन टाळा.",
    "High humidity + rainfall may significantly increase fungal disease risk.":
      "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगांचा धोका मोठ्या प्रमाणात वाढू शकतो.",
    "Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.":
      "पिकाची बारकाईने तपासणी करा, शक्य असल्यास शेतातील हवा खेळती ठेवा आणि अनावश्यक सिंचन टाळा.",
    "Rain expected in the next 24 hours.":
      "पुढील २४ तासांत पावसाची शक्यता आहे.",
    "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.":
      "जास्त आर्द्रता आणि पावसामुळे बुरशीजन्य रोगांचा धोका वाढू शकतो. पिकाचे बारकाईने निरीक्षण करा आणि अनावश्यक सिंचन टाळा.",
    "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.":
      "ओलसर परिस्थितीमुळे काही पिकांच्या रोगांचा धोका वाढू शकतो. पिकाचे बारकाईने निरीक्षण करा आणि पावसापूर्वी अनावश्यक सिंचन टाळा.",
    "High humidity is expected.":
      "जास्त आर्द्रतेची शक्यता आहे.",
    "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.":
      "जास्त आर्द्रतेमुळे बुरशीजन्य रोगांच्या वाढीस अनुकूल परिस्थिती निर्माण होऊ शकते. पानांची तपासणी करा आणि पिकाचे बारकाईने निरीक्षण करा.",
    "Hot conditions are expected today.":
      "आज उष्ण हवामानाची शक्यता आहे.",
    "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.":
      "जास्त तापमानामुळे पिकावर उष्णतेचा ताण येऊ शकतो आणि पाण्याची गरज वाढू शकते. मातीतील ओलावा तपासा आणि त्यानुसार सिंचन करा.",
    "Cool and humid conditions are expected.":
      "थंड आणि दमट हवामानाची शक्यता आहे.",
    "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.":
      "थंड आणि दमट हवामान काही बुरशीजन्य आणि जिवाणूजन्य रोगांसाठी अनुकूल ठरू शकते. सुरुवातीची लक्षणे पाहण्यासाठी पानांची नियमित तपासणी करा.",
    "Weather conditions look favorable.":
      "हवामानाची स्थिती अनुकूल दिसत आहे.",
    "No significant weather-related disease risk detected. Continue normal crop monitoring.":
      "हवामानाशी संबंधित कोणताही महत्त्वाचा रोगधोका आढळला नाही. पिकाचे नियमित निरीक्षण सुरू ठेवा.",

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
    "Rain showers possible": "पावसाच्या सरी शक्य आहेत",
    "Rain showers expected": "पावसाच्या सरींची शक्यता",
    "Heavy rain showers": "जोरदार पावसाच्या सरी",
    "Thunderstorms possible": "वादळी वारे शक्य आहेत",
    "Thunderstorms with hail possible": "गारांसह वादळी वारे शक्य आहेत",
    "Severe thunderstorms possible": "तीव्र वादळी वारे शक्य आहेत",
    "Weather conditions": "हवामानाची स्थिती",

    "Tomato": "टोमॅटो",
    "Potato": "बटाटा",
    "Maize": "मका",
    "Apple": "सफरचंद",
    "Cherry": "चेरी",
    "Grape": "द्राक्ष",
    "Peach": "पीच",
    "Bell Pepper": "ढोबळी मिरची",
    "Strawberry": "स्ट्रॉबेरी",

    "Early Blight": "अर्ली ब्लाइट",
    "Late Blight": "लेट ब्लाइट",
    "Bacterial Spot": "बॅक्टेरियल स्पॉट",
    "Leaf Mold": "लीफ मोल्ड",
    "Septoria Leaf Spot": "सेप्टोरिया लीफ स्पॉट",
    "Spider Mites": "स्पायडर माइट्स",
    "Target Spot": "टार्गेट स्पॉट",
    "Tomato Yellow Leaf Curl Virus": "टोमॅटो यलो लीफ कर्ल व्हायरस",
    "Tomato Mosaic Virus": "टोमॅटो मोझेक व्हायरस",
    "Apple Scab": "अॅपल स्कॅब",
    "Black Rot": "ब्लॅक रॉट",
    "Cedar Apple Rust": "सीडर अॅपल रस्ट",
    "Powdery Mildew": "पावडरी मिल्ड्यू",
    "Common Rust": "कॉमन रस्ट",
    "Northern Leaf Blight": "नॉर्दर्न लीफ ब्लाइट",
    "Leaf Scorch": "लीफ स्कॉर्च",
  },
};

function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mostly sunny",
    2: "Partly cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain expected",
    65: "Heavy rain",
    71: "Light snowfall",
    73: "Snow expected",
    75: "Heavy snow",
    80: "Rain showers possible",
    81: "Rain showers expected",
    82: "Heavy rain showers",
    95: "Thunderstorms possible",
    96: "Thunderstorms with hail possible",
    99: "Severe thunderstorms possible",
  };
  return descriptions[code] || "Weather conditions";
}

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "🌤️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55].includes(code)) return "🌦️";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

const SKY_GRADIENTS = {
  sunny: "linear-gradient(160deg, #FBE7BE 0%, #F3CE92 50%, #E9B96E 100%)",
  cloudy: "linear-gradient(160deg, #E7E4D6 0%, #D9D6C7 50%, #C9C6B6 100%)",
  fog: "linear-gradient(160deg, #E4E6E1 0%, #D2D5CE 50%, #C1C4BC 100%)",
  rain: "linear-gradient(160deg, #DBE3E8 0%, #C0CDD6 50%, #A4B6C1 100%)",
  storm: "linear-gradient(160deg, #C9CDD6 0%, #A9AEBB 50%, #8B909F 100%)",
  snow: "linear-gradient(160deg, #F2F4F7 0%, #E4E8ED 50%, #D6DCE3 100%)",
};

function getSkyGradient(code) {
  if ([0, 1, 2].includes(code)) return SKY_GRADIENTS.sunny;
  if (code === 3) return SKY_GRADIENTS.cloudy;
  if ([45, 48].includes(code)) return SKY_GRADIENTS.fog;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return SKY_GRADIENTS.rain;
  if ([95, 96, 99].includes(code)) return SKY_GRADIENTS.storm;
  if ([71, 73, 75].includes(code)) return SKY_GRADIENTS.snow;
  return SKY_GRADIENTS.cloudy;
}

function getWeatherRisk(weather) {
  if (!weather?.current || !weather?.daily) return null;

  const humidity = weather.current.relative_humidity_2m ?? 0;
  const rainChance =
    weather.daily.precipitation_probability_max?.[0] ?? 0;
  const code = weather.current.weather_code;
  const maxTemp = weather.daily.temperature_2m_max?.[0] ?? 0;
  const minTemp = weather.daily.temperature_2m_min?.[0] ?? 0;

  const rainExpected =
    rainChance >= 40 ||
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code);

  const fungalRisk = humidity >= 75 && rainExpected;
  const severeFungalRisk = humidity >= 85 && rainChance >= 60;
  const heatRisk = maxTemp >= 38;
  const coolHumidRisk = minTemp <= 18 && humidity >= 80;

  if (severeFungalRisk) {
    return {
      level: "High",
      message: "Rain expected with very high humidity.",
      detail:
        "High humidity + rainfall may significantly increase fungal disease risk. Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.",
    };
  }

  if (fungalRisk) {
    return {
      level: "High",
      message: "Rain expected in the next 24 hours.",
      detail:
        "High humidity + rainfall may increase fungal disease risk. Monitor your crop closely and avoid unnecessary irrigation.",
    };
  }

  if (rainExpected) {
    return {
      level: "Moderate",
      message: "Rain expected in the next 24 hours.",
      detail:
        "Wet conditions may increase the risk of some crop diseases. Monitor your crop closely and avoid unnecessary irrigation before rainfall.",
    };
  }

  if (humidity >= 75) {
    return {
      level: "Moderate",
      message: "High humidity is expected.",
      detail:
        "High humidity can create favorable conditions for fungal disease development. Inspect leaves and monitor your crop closely.",
    };
  }

  if (heatRisk) {
    return {
      level: "Moderate",
      message: "Hot conditions are expected today.",
      detail:
        "High temperatures may cause heat stress and increase crop water demand. Monitor soil moisture and irrigate accordingly.",
    };
  }

  if (coolHumidRisk) {
    return {
      level: "Moderate",
      message: "Cool and humid conditions are expected.",
      detail:
        "Cool, humid weather can favor certain fungal and bacterial diseases. Inspect leaves regularly for early symptoms.",
    };
  }

  return {
    level: "Low",
    message: "Weather conditions look favorable.",
    detail:
      "No significant weather-related disease risk detected. Continue normal crop monitoring.",
  };
}

const LEVEL_COLOR = {
  Low: COLORS.ok,
  Moderate: COLORS.amberDeep,
  High: COLORS.danger,
};

const DEFAULT_LOCATION = {
  lat: 26.9124,
  lng: 75.7873,
  label: "Jaipur, Rajasthan",
};

const NAME_TRANSLATIONS = {
  hi: {
    "Kartik Jain": "कार्तिक जैन",
  },
  mr: {
    "Kartik Jain": "कार्तिक जैन",
  },
};

const LOCATION_TRANSLATIONS = {
  hi: {
    "Jaipur, Rajasthan": "जयपुर, राजस्थान",
    "Current location": "वर्तमान स्थान",
  },
  mr: {
    "Jaipur, Rajasthan": "जयपूर, राजस्थान",
    "Current location": "सध्याचे स्थान",
  },
};

function HomeTranslator({ lang, t, children }) {
  return children;
}

function GlassStat({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 14px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.55)",
      }}
    >
      {icon}
      <span
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          color: COLORS.forestDeep,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 10.5,
          color: COLORS.forestDeep,
          opacity: 0.65,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const localT = (value) =>
    HOME_TRANSLATIONS[lang]?.[value] ||
    t(value) ||
    value;

  const translateName = (name) =>
    NAME_TRANSLATIONS[lang]?.[name] || name;

  const translateLocation = (label) =>
    LOCATION_TRANSLATIONS[lang]?.[label] || label;

  const translateModelText = (value) => {
    if (!value) return "";
    let result = value;

    const cropMap = HOME_TRANSLATIONS[lang] || {};
    for (const [english, translated] of Object.entries(cropMap)) {
      if (english.length >= 3 && result.includes(english)) {
        result = result.split(english).join(translated);
      }
    }

    return result;
  };

  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getScanHistory(lang)
      .then((data) => setRecent(data.scans || []))
      .catch(() => setRecent([]))
      .finally(() => setLoading(false));
  }, [lang]);

  async function detectLocation() {
    // Keep a usable default so weather never gets stuck on
    // "Detecting location..." when browser GPS is unavailable/denied.
    if (!navigator.geolocation) {
      setLocation(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
          );

          const data = await res.json();
          const address = data.address || {};

          const rawCity =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            "Current location";

          const city = rawCity
            .replace(/ Municipal Corporation/gi, "")
            .replace(/ Municipal Council/gi, "")
            .trim();

          const state = address.state || "";

          setLocation({
            lat,
            lng,
            label: state ? `${city}, ${state}` : city,
          });
        } catch {
          // GPS worked even if reverse-geocoding failed.
          setLocation({
            lat,
            lng,
            label: "Current location",
          });
        }
      },
      (error) => {
        console.warn("Geolocation unavailable:", error?.message || error);

        // Use Jaipur fallback so getWeather() still runs.
        setLocation(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    if (!location?.lat || !location?.lng) return;

    setWeatherLoading(true);

    getWeather(location.lat, location.lng)
      .then((data) => setWeather(data))
      .catch(() => setWeather(null))
      .finally(() => setWeatherLoading(false));
  }, [location]);

  const code = weather?.current?.weather_code ?? 0;
  const risk = weather ? getWeatherRisk(weather) : null;

  return (
    <>
      <style>{`
        .cs-recent-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 700px) {
          .cs-recent-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .cs-recent-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @keyframes cs-drift {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(-2deg);
          }
        }

        .cs-drift {
          animation: cs-drift 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-drift {
            animation: none !important;
          }
        }

        .cs-scan-btn {
          transition: transform 200ms ease;
        }

        .cs-scan-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: weather ? getSkyGradient(code) : COLORS.cream,
            borderBottom: weather ? "none" : `1px solid ${COLORS.line}`,
            padding: "24px 20px 52px",
            position: "relative",
            overflow: "hidden",
            transition: "background 600ms ease",
          }}
        >
          <Leaf
            size={180}
            color={COLORS.forestDeep}
            style={{
              position: "absolute",
              right: -30,
              top: -30,
              opacity: 0.06,
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: COLORS.inkSoft,
            }}
          >
            {t("greeting")}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h1
                style={{
                  margin: "2px 0 6px",
                  fontFamily: "'Fraunces', serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: COLORS.forest,
                }}
              >
                {user?.name ? translateName(user.name) : t("farmer")}
              </h1>

              <button
                onClick={detectLocation}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <MapPin size={13} color={COLORS.leaf} />

                <span
                  style={{
                    fontSize: 12.5,
                    color: COLORS.inkSoft,
                  }}
                >
                  {translateLocation(location?.label) || localT("Detecting location...")}
                </span>

                {location && (
                  <span
                    style={{
                      fontSize: 11,
                      color: COLORS.leaf,
                      marginLeft: 3,
                    }}
                  >
                    ↻
                  </span>
                )}
              </button>
            </div>

            {weather && (
              <div
                className="cs-drift"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 42 }}>
                  {getWeatherIcon(code)}
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 36,
                        fontWeight: 600,
                        color: COLORS.forestDeep,
                        lineHeight: 1,
                      }}
                    >
                      {Math.round(
                        weather.current?.temperature_2m ?? 0
                      )}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 18,
                        color: COLORS.forestDeep,
                      }}
                    >
                      °C
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.forestDeep,
                      opacity: 0.75,
                      marginTop: 2,
                    }}
                  >
                    {localT(getWeatherDescription(code))}
                  </div>
                </div>
              </div>
            )}

            {weatherLoading && !weather && (
              <span
                style={{
                  fontSize: 12.5,
                  color: COLORS.inkSoft,
                }}
              >
                {localT("Fetching weather…")}
              </span>
            )}
          </div>

          {weather && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 22,
                flexWrap: "wrap",
              }}
            >
              <GlassStat
                icon={
                  <Droplets size={13} color={COLORS.forestDeep} />
                }
                value={`${weather.current?.relative_humidity_2m ?? 0}%`}
                label={localT("humidity")}
              />

              <GlassStat
                icon={
                  <CloudRain size={13} color={COLORS.forestDeep} />
                }
                value={`${
                  weather.daily?.precipitation_probability_max?.[0] || 0
                }%`}
                label={localT("rain chance")}
              />
            </div>
          )}

          {risk && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                maxWidth: 480,
              }}
            >
              <div
                style={{
                  width: 3,
                  borderRadius: 3,
                  background: LEVEL_COLOR[risk.level],
                  flexShrink: 0,
                }}
              />

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: COLORS.forestDeep,
                  }}
                >
                  {localT(risk.message)}
                </p>

                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    color: COLORS.forestDeep,
                    opacity: 0.8,
                  }}
                >
                  {localT(risk.detail)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "0 20px 40px" }}>
          <button
            className="cs-scan-btn"
            onClick={() => navigate("/scan")}
            style={{
              marginTop: -32,
              background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestDeep})`,
              borderRadius: 22,
              padding: "26px 28px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: 28,
              position: "relative",
              overflow: "hidden",
              width: "100%",
              maxWidth: 520,
              boxShadow:
                "0 14px 28px -12px rgba(20,42,31,0.45)",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -10,
                top: -10,
                opacity: 0.15,
              }}
            >
              <Leaf size={120} color="#fff" />
            </div>

            <ScanLine size={26} color={COLORS.amber} />

            <p
              style={{
                color: "#fff",
                fontFamily: "'Fraunces', serif",
                fontSize: 20,
                fontWeight: 600,
                margin: "12px 0 4px",
              }}
            >
              {t("scanCrop")}
            </p>

            <p
              style={{
                color: "#D8DECB",
                fontSize: 12.5,
                margin: "0 0 14px",
                maxWidth: 280,
              }}
            >
              {t("scanSubtitle")}
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: COLORS.amber,
                padding: "8px 16px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.forestDeep,
              }}
            >
              <Camera size={15} />
              {t("startScan")}
            </div>
          </button>

          <p
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              color: COLORS.inkSoft,
              letterSpacing: 0.5,
              margin: "0 0 12px",
            }}
          >
            {t("recentScans")}
          </p>

          {loading && (
            <p
              style={{
                fontSize: 13,
                color: COLORS.inkSoft,
              }}
            >
              {t("loading")}
            </p>
          )}

          {!loading && recent.length === 0 && (
            <div
              style={{
                background: COLORS.cream,
                border: `1px dashed ${COLORS.line}`,
                borderRadius: 14,
                padding: 20,
                textAlign: "center",
                maxWidth: 520,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: COLORS.inkSoft,
                }}
              >
                {t("noScans")}
              </p>
            </div>
          )}

          <div className="cs-recent-grid">
            {recent.map((r) => {
              const translatedCrop = translateModelText(r.crop);
              const translatedDisease =
                translateModelText(r.disease);

              return (
                <div
                  key={r._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: COLORS.cream,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 14,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "#EFEDE0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Leaf size={18} color={COLORS.leaf} />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: COLORS.ink,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {translatedCrop} — {translatedDisease}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 11.5,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {new Date(
                        r.createdAt
                      ).toLocaleDateString(
                        lang === "hi"
                          ? "hi-IN"
                          : lang === "mr"
                          ? "mr-IN"
                          : "en-IN"
                      )}
                    </p>
                  </div>

                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      padding: "4px 9px",
                      borderRadius: 20,
                      color: "#fff",
                      background: SEVERITY_COLOR[r.severity],
                      flexShrink: 0,
                    }}
                  >
                    {t(SEVERITY_KEY[r.severity])}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
