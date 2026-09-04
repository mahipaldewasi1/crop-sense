import React, { useEffect, useState } from "react";
import { MapPin, AlertTriangle, ChevronDown, X } from "lucide-react";
import DiseaseHotspotMap from "../components/DiseaseHotspotMap";
import { COLORS } from "../styles/theme";
import { useLanguage } from "../i18n/LanguageContext";

/*
  IMPORTANT:
  Keep all internal filter/data values in English.
  Only the visible labels are translated.
*/

const CROP_LABELS = {
  apple: [
    "Apple Scab",
    "Apple with Black Rot",
    "Cedar Apple Rust",
    "Healthy Apple",
  ],
  cherry: [
    "Cherry with Powdery Mildew",
    "Healthy Cherry Plant",
  ],
  maize: [
    "Corn (Maize) with Cercospora and Gray Leaf Spot",
    "Corn (Maize) with Common Rust",
    "Corn (Maize) with Northern Leaf Blight",
    "Healthy Corn (Maize) Plant",
  ],
  grape: [
    "Grape with Black Rot",
    "Grape with Esca (Black Measles)",
    "Grape with Isariopsis Leaf Spot",
    "Healthy Grape Plant",
  ],
  peach: [
    "Peach with Bacterial Spot",
    "Healthy Peach Plant",
  ],
  bell_pepper: [
    "Bell Pepper with Bacterial Spot",
    "Healthy Bell Pepper Plant",
  ],
  potato: [
    "Potato with Early Blight",
    "Potato with Late Blight",
    "Healthy Potato Plant",
  ],
  tomato: [
    "Tomato with Bacterial Spot",
    "Tomato with Early Blight",
    "Tomato with Late Blight",
    "Tomato with Leaf Mold",
    "Tomato with Septoria Leaf Spot",
    "Tomato with Spider Mites or Two-spotted Spider Mite",
    "Tomato with Target Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Mosaic Virus",
    "Healthy Tomato Plant",
  ],
  strawberry: [
    "Strawberry with Leaf Scorch",
    "Healthy Strawberry Plant",
  ],
};

const CROP_NAMES = [
  { value: "apple", label: "Apple" },
  { value: "cherry", label: "Cherry" },
  { value: "maize", label: "Maize" },
  { value: "grape", label: "Grape" },
  { value: "peach", label: "Peach" },
  { value: "bell_pepper", label: "Bell Pepper" },
  { value: "potato", label: "Potato" },
  { value: "tomato", label: "Tomato" },
  { value: "strawberry", label: "Strawberry" },
];

const PAGE_TRANSLATIONS = {
  hi: {
    "DISEASE SURVEILLANCE": "रोग निगरानी",
    "Crop disease hotspots": "फसल रोग हॉटस्पॉट",
    "Aggregated disease reports help identify areas that may need closer monitoring and preventive intervention.":
      "एकत्रित रोग रिपोर्ट उन क्षेत्रों की पहचान करने में मदद करती हैं जहाँ अधिक निगरानी और रोकथाम की आवश्यकता हो सकती है।",
    "Detecting your location...": "आपका स्थान खोजा जा रहा है...",
    "Showing disease hotspots around your current location":
      "आपके वर्तमान स्थान के आसपास फसल रोग हॉटस्पॉट दिखाए जा रहे हैं",
    "All Crops": "सभी फसलें",
    "All Diseases": "सभी रोग",
    "All Risk Levels": "सभी जोखिम स्तर",
    "High Risk": "उच्च जोखिम",
    "Moderate Risk": "मध्यम जोखिम",
    "Clear filters": "फ़िल्टर साफ़ करें",
    "Active hotspots": "सक्रिय हॉटस्पॉट",
    "High-risk hotspots": "उच्च-जोखिम हॉटस्पॉट",
    "Reported cases in demo area": "डेमो क्षेत्र में रिपोर्ट किए गए मामले",
    "Location services are not supported by this browser.":
      "इस ब्राउज़र में स्थान सेवा उपलब्ध नहीं है।",
    "Unable to access your location. Showing Jaipur as fallback.":
      "आपका स्थान प्राप्त नहीं किया जा सका। विकल्प के रूप में जयपुर दिखाया जा रहा है।",

    "Apple": "सेब",
    "Cherry": "चेरी",
    "Maize": "मक्का",
    "Grape": "अंगूर",
    "Peach": "आड़ू",
    "Bell Pepper": "शिमला मिर्च",
    "Potato": "आलू",
    "Tomato": "टमाटर",
    "Strawberry": "स्ट्रॉबेरी",

    "Apple Scab": "एप्पल स्कैब",
    "Apple with Black Rot": "सेब में ब्लैक रॉट",
    "Cedar Apple Rust": "सीडर एप्पल रस्ट",
    "Cherry with Powdery Mildew": "चेरी में पाउडरी मिल्ड्यू",
    "Corn (Maize) with Cercospora and Gray Leaf Spot":
      "मक्का में सर्कोस्पोरा ग्रे लीफ स्पॉट",
    "Corn (Maize) with Common Rust": "मक्का में कॉमन रस्ट",
    "Corn (Maize) with Northern Leaf Blight":
      "मक्का में नॉर्दर्न लीफ ब्लाइट",
    "Grape with Black Rot": "अंगूर में ब्लैक रॉट",
    "Grape with Esca (Black Measles)": "अंगूर में एस्का (ब्लैक मीज़ल्स)",
    "Grape with Isariopsis Leaf Spot": "अंगूर में इसारियोप्सिस लीफ स्पॉट",
    "Peach with Bacterial Spot": "आड़ू में बैक्टीरियल स्पॉट",
    "Bell Pepper with Bacterial Spot": "शिमला मिर्च में बैक्टीरियल स्पॉट",
    "Potato with Early Blight": "आलू में अर्ली ब्लाइट",
    "Potato with Late Blight": "आलू में लेट ब्लाइट",
    "Tomato with Bacterial Spot": "टमाटर में बैक्टीरियल स्पॉट",
    "Tomato with Early Blight": "टमाटर में अर्ली ब्लाइट",
    "Tomato with Late Blight": "टमाटर में लेट ब्लाइट",
    "Tomato with Leaf Mold": "टमाटर में लीफ मोल्ड",
    "Tomato with Septoria Leaf Spot": "टमाटर में सेप्टोरिया लीफ स्पॉट",
    "Tomato with Spider Mites or Two-spotted Spider Mite": "टमाटर में स्पाइडर माइट्स",
    "Tomato with Target Spot": "टमाटर में टार्गेट स्पॉट",
    "Tomato Yellow Leaf Curl Virus": "टमाटर येलो लीफ कर्ल वायरस",
    "Tomato Mosaic Virus": "टमाटर मोज़ेक वायरस",
    "Strawberry with Leaf Scorch": "स्ट्रॉबेरी में लीफ स्कॉर्च",
  },

  mr: {
    "DISEASE SURVEILLANCE": "रोग निरीक्षण",
    "Crop disease hotspots": "पिकांच्या रोगांचे हॉटस्पॉट",
    "Aggregated disease reports help identify areas that may need closer monitoring and preventive intervention.":
      "एकत्रित रोग अहवालांमुळे अधिक निरीक्षण आणि प्रतिबंधात्मक उपायांची गरज असलेले भाग ओळखण्यास मदत होते.",
    "Detecting your location...": "तुमचे स्थान शोधले जात आहे...",
    "Showing disease hotspots around your current location":
      "तुमच्या सध्याच्या स्थानाच्या आसपास पिकांच्या रोगांचे हॉटस्पॉट दाखवत आहे",
    "All Crops": "सर्व पिके",
    "All Diseases": "सर्व रोग",
    "All Risk Levels": "सर्व जोखीम पातळी",
    "High Risk": "जास्त जोखीम",
    "Moderate Risk": "मध्यम जोखीम",
    "Clear filters": "फिल्टर साफ करा",
    "Active hotspots": "सक्रिय हॉटस्पॉट",
    "High-risk hotspots": "जास्त जोखीम असलेले हॉटस्पॉट",
    "Reported cases in demo area": "डेमो क्षेत्रातील नोंदवलेली प्रकरणे",
    "Location services are not supported by this browser.":
      "या ब्राउझरमध्ये स्थान सेवा उपलब्ध नाही.",
    "Unable to access your location. Showing Jaipur as fallback.":
      "तुमचे स्थान मिळवता आले नाही. पर्याय म्हणून जयपूर दाखवत आहे.",

    "Apple": "सफरचंद",
    "Cherry": "चेरी",
    "Maize": "मका",
    "Grape": "द्राक्ष",
    "Peach": "पीच",
    "Bell Pepper": "ढोबळी मिरची",
    "Potato": "बटाटा",
    "Tomato": "टोमॅटो",
    "Strawberry": "स्ट्रॉबेरी",

    "Apple Scab": "अॅपल स्कॅब",
    "Apple with Black Rot": "सफरचंदावर ब्लॅक रॉट",
    "Cedar Apple Rust": "सीडर अॅपल रस्ट",
    "Cherry with Powdery Mildew": "चेरीवर पावडरी मिल्ड्यू",
    "Corn (Maize) with Cercospora and Gray Leaf Spot":
      "मक्यावर सर्कोस्पोरा ग्रे लीफ स्पॉट",
    "Corn (Maize) with Common Rust": "मक्यावर कॉमन रस्ट",
    "Corn (Maize) with Northern Leaf Blight":
      "मक्यावर नॉर्दर्न लीफ ब्लाइट",
    "Grape with Black Rot": "द्राक्षावर ब्लॅक रॉट",
    "Grape with Esca (Black Measles)": "द्राक्षावर एस्का (ब्लॅक मीजल्स)",
    "Grape with Isariopsis Leaf Spot": "द्राक्षावर इसारियोप्सिस लीफ स्पॉट",
    "Peach with Bacterial Spot": "पीचवर बॅक्टेरियल स्पॉट",
    "Bell Pepper with Bacterial Spot": "ढोबळी मिरचीवर बॅक्टेरियल स्पॉट",
    "Potato with Early Blight": "बटाट्यावर अर्ली ब्लाइट",
    "Potato with Late Blight": "बटाट्यावर लेट ब्लाइट",
    "Tomato with Bacterial Spot": "टोमॅटोवर बॅक्टेरियल स्पॉट",
    "Tomato with Early Blight": "टोमॅटोवर अर्ली ब्लाइट",
    "Tomato with Late Blight": "टोमॅटोवर लेट ब्लाइट",
    "Tomato with Leaf Mold": "टोमॅटोवर लीफ मोल्ड",
    "Tomato with Septoria Leaf Spot": "टोमॅटोवर सेप्टोरिया लीफ स्पॉट",
    "Tomato with Spider Mites or Two-spotted Spider Mite": "टोमॅटोवर स्पायडर माइट्स",
    "Tomato with Target Spot": "टोमॅटोवर टार्गेट स्पॉट",
    "Tomato Yellow Leaf Curl Virus": "टोमॅटो यलो लीफ कर्ल व्हायरस",
    "Tomato Mosaic Virus": "टोमॅटो मोझेक व्हायरस",
    "Strawberry with Leaf Scorch": "स्ट्रॉबेरीवर लीफ स्कॉर्च",
  },
};

function getDiseasesForCrop(crop) {
  if (crop === "All") {
    return Object.values(CROP_LABELS)
      .flat()
      .filter((label) => !label.toLowerCase().includes("healthy"));
  }

  const cropKey = CROP_NAMES.find((item) => item.label === crop)?.value;
  if (!cropKey) return [];

  return CROP_LABELS[cropKey].filter(
    (label) => !label.toLowerCase().includes("healthy")
  );
}

const DEFAULT_LOCATION = {
  lat: 26.9124,
  lng: 75.7873,
  label: "Jaipur, Rajasthan",
};

const HOTSPOTS = [
  ["Potato with Late Blight", "Potato", 18, "High", 0.0033, 0.0372],
  ["Tomato with Early Blight", "Tomato", 11, "Moderate", -0.0099, 0],
  ["Potato with Early Blight", "Potato", 23, "High", 0.0236, 0.0157],
  ["Tomato with Leaf Mold", "Tomato", 9, "Moderate", -0.018, 0.021],
  ["Apple Scab", "Apple", 15, "High", 0.014, -0.027],
  ["Grape with Black Rot", "Grape", 7, "Moderate", -0.025, -0.014],
  ["Corn (Maize) with Common Rust", "Maize", 13, "High", 0.031, -0.009],
  ["Strawberry with Leaf Scorch", "Strawberry", 6, "Moderate", -0.031, 0.032],
  ["Peach with Bacterial Spot", "Peach", 8, "Moderate", 0.011, 0.045],
  ["Bell Pepper with Bacterial Spot", "Bell Pepper", 10, "High", -0.014, -0.035],
  ["Cherry with Powdery Mildew", "Cherry", 5, "Moderate", 0.037, 0.008],
];

export default function DiseaseMapScreen() {
  const { lang, t } = useLanguage();

  const pageT = (key) =>
    PAGE_TRANSLATIONS[lang]?.[key] ||
    t(key) ||
    key;

  const translateCrop = (crop) => pageT(crop);
  const translateDisease = (disease) => pageT(disease);
  const translateRisk = (risk) => pageT(risk);

  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [cropFilter, setCropFilter] = useState("All");
  const [diseaseFilter, setDiseaseFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "Location services are not supported by this browser."
      );
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: "Your current location",
        });
        setLocationLoading(false);
        setLocationError("");
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError(
          "Unable to access your location. Showing Jaipur as fallback."
        );
        setLocation(DEFAULT_LOCATION);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  const hotspots = HOTSPOTS.map(
    ([disease, crop, cases, risk, latOffset, lngOffset], index) => ({
      id: index + 1,
      lat: location.lat + latOffset,
      lng: location.lng + lngOffset,
      disease,
      crop,
      cases,
      risk,
    })
  );

  const availableDiseases = getDiseasesForCrop(cropFilter);

  const filteredHotspots = hotspots.filter((spot) => {
    const cropMatch = cropFilter === "All" || spot.crop === cropFilter;
    const diseaseMatch =
      diseaseFilter === "All" || spot.disease === diseaseFilter;
    const riskMatch = riskFilter === "All" || spot.risk === riskFilter;
    return cropMatch && diseaseMatch && riskMatch;
  });

  return (
    <div
      className="cs-animate-in"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "24px 20px 40px",
      }}
    >
      <style>{`
        .cs-filter-select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          transition:
            border-color 0.16s ease,
            box-shadow 0.16s ease,
            background-color 0.16s ease;
        }

        .cs-filter-wrap:hover .cs-filter-select {
          border-color: ${COLORS.leaf} !important;
        }

        .cs-filter-select:focus {
          outline: none;
          border-color: ${COLORS.forest} !important;
          box-shadow: 0 0 0 3px rgba(31,58,46,0.12);
        }

        .cs-filter-wrap {
          position: relative;
          width: 100%;
        }

        .cs-filter-chevron {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .cs-clear-filters:hover {
          border-color: ${COLORS.danger};
          color: ${COLORS.danger};
        }

        .cs-stat-card {
          transition:
            transform 0.16s ease,
            box-shadow 0.16s ease;
        }

        .cs-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -18px rgba(21,40,31,0.3);
        }
      `}</style>

      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.8,
            color: COLORS.leaf,
          }}
        >
          {pageT("DISEASE SURVEILLANCE")}
        </p>

        <h1
          style={{
            margin: "5px 0 4px",
            fontFamily: "'Fraunces', serif",
            fontSize: 28,
            color: COLORS.forest,
          }}
        >
          {pageT("Crop disease hotspots")}
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: COLORS.inkSoft,
            maxWidth: 650,
          }}
        >
          {pageT(
            "Aggregated disease reports help identify areas that may need closer monitoring and preventive intervention."
          )}
        </p>
      </div>

      {locationLoading && (
        <div
          style={{
            marginBottom: 14,
            padding: "10px 13px",
            borderRadius: 10,
            background: "#EAF1E6",
            color: COLORS.forest,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          📍 {pageT("Detecting your location...")}
        </div>
      )}

      {!locationLoading && location.label === "Your current location" && (
        <div
          style={{
            marginBottom: 14,
            padding: "10px 13px",
            borderRadius: 10,
            background: "#EAF1E6",
            color: COLORS.forest,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          📍 {pageT("Showing disease hotspots around your current location")}
        </div>
      )}

      {!locationLoading && locationError && (
        <div
          style={{
            marginBottom: 14,
            padding: "10px 13px",
            borderRadius: 10,
            background: "#FFF4E5",
            color: COLORS.amberDeep,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {pageT(locationError)}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div className="cs-filter-wrap">
          <select
            value={cropFilter}
            onChange={(e) => {
              setCropFilter(e.target.value);
              setDiseaseFilter("All");
            }}
            className="cs-filter-select"
            style={{
              padding: "9px 32px 9px 12px",
              borderRadius: 10,
              border: `1.5px solid ${
                cropFilter !== "All" ? COLORS.forest : COLORS.line
              }`,
              background: cropFilter !== "All" ? "#EAF1E6" : COLORS.cream,
              color: COLORS.forest,
              fontSize: 12,
              fontWeight: cropFilter !== "All" ? 700 : 500,
              cursor: "pointer",
            }}
          >
            <option value="All">{pageT("All Crops")}</option>

            {CROP_NAMES.map((crop) => (
              <option key={crop.value} value={crop.label}>
                {translateCrop(crop.label)}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            color={COLORS.inkSoft}
            className="cs-filter-chevron"
          />
        </div>

        <div className="cs-filter-wrap">
          <select
            value={diseaseFilter}
            onChange={(e) => setDiseaseFilter(e.target.value)}
            className="cs-filter-select"
            style={{
              padding: "9px 32px 9px 12px",
              borderRadius: 10,
              border: `1.5px solid ${
                diseaseFilter !== "All" ? COLORS.forest : COLORS.line
              }`,
              background: diseaseFilter !== "All" ? "#EAF1E6" : COLORS.cream,
              color: COLORS.forest,
              fontSize: 12,
              fontWeight: diseaseFilter !== "All" ? 700 : 500,
              cursor: "pointer",
            }}
          >
            <option value="All">{pageT("All Diseases")}</option>

            {availableDiseases.map((disease) => (
              <option key={disease} value={disease}>
                {translateDisease(disease)}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            color={COLORS.inkSoft}
            className="cs-filter-chevron"
          />
        </div>

        <div className="cs-filter-wrap">
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="cs-filter-select"
            style={{
              padding: "9px 32px 9px 12px",
              borderRadius: 10,
              border: `1.5px solid ${
                riskFilter !== "All" ? COLORS.forest : COLORS.line
              }`,
              background: riskFilter !== "All" ? "#EAF1E6" : COLORS.cream,
              color: COLORS.forest,
              fontSize: 12,
              fontWeight: riskFilter !== "All" ? 700 : 500,
              cursor: "pointer",
            }}
          >
            <option value="All">{pageT("All Risk Levels")}</option>
            <option value="High">{pageT("High Risk")}</option>
            <option value="Moderate">{pageT("Moderate Risk")}</option>
          </select>

          <ChevronDown
            size={14}
            color={COLORS.inkSoft}
            className="cs-filter-chevron"
          />
        </div>

        {(cropFilter !== "All" ||
          diseaseFilter !== "All" ||
          riskFilter !== "All") && (
          <button
            onClick={() => {
              setCropFilter("All");
              setDiseaseFilter("All");
              setRiskFilter("All");
            }}
            className="cs-clear-filters"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: "8px 12px",
              borderRadius: 10,
              border: `1px solid ${COLORS.line}`,
              background: "transparent",
              color: COLORS.inkSoft,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <X size={13} />
            {pageT("Clear filters")}
          </button>
        )}
      </div>

      <DiseaseHotspotMap
        location={location}
        hotspots={filteredHotspots}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginTop: 16,
        }}
      >
        <div
          className="cs-stat-card"
          style={{
            background: COLORS.cream,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <MapPin size={18} color={COLORS.leaf} />

          <div
            style={{
              marginTop: 8,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.forest,
            }}
          >
            {filteredHotspots.length}
          </div>

          <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>
            {pageT("Active hotspots")}
          </div>
        </div>

        <div
          className="cs-stat-card"
          style={{
            background: COLORS.cream,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <AlertTriangle size={18} color={COLORS.amberDeep} />

          <div
            style={{
              marginTop: 8,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.forest,
            }}
          >
            {filteredHotspots.filter((h) => h.risk === "High").length}
          </div>

          <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>
            {pageT("High-risk hotspots")}
          </div>
        </div>

        <div
          className="cs-stat-card"
          style={{
            background: COLORS.cream,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.forest,
            }}
          >
            {filteredHotspots.reduce((sum, h) => sum + h.cases, 0)}
          </div>

          <div
            style={{
              marginTop: 7,
              fontSize: 11.5,
              color: COLORS.inkSoft,
            }}
          >
            {pageT("Reported cases in demo area")}
          </div>
        </div>
      </div>
    </div>
  );
}
