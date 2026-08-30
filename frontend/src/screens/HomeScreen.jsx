import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Camera, MapPin, ScanLine } from "lucide-react";
import { COLORS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getScanHistory, getWeather } from "../api/client";
import RiskAlert from "../components/RiskAlert";


const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };
const SEVERITY_KEY = { Low: "severityLow", Medium: "severityMedium", High: "severityHigh" };
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
function getWeatherMessage(weather) {
  if (!weather?.daily) return "";

  const rainChance =
    weather.daily.precipitation_probability_max?.[0] || 0;

  const code = weather.daily.weather_code?.[0];

  if (rainChance >= 70) {
    return "🌧️ High chance of rain today";
  }

  if (rainChance >= 40) {
    return "🌦️ Rain expected today";
  }

  if (code >= 95) {
    return "⛈️ Thunderstorms possible today";
  }

  if (code === 0 || code === 1) {
    return "☀️ Mostly sunny today";
  }

  if (code === 2) {
    return "⛅ Partly cloudy today";
  }

  if (code === 3) {
    return "☁️ Mostly cloudy today";
  }

  return "🌤️ Mild weather expected today";
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

function getRainMessage(probability) {
  if (probability >= 70) return "Rain expected";
  if (probability >= 40) return "Rain possible";
  if (probability >= 20) return "Low chance of rain";
  return "No rain expected";
}
function getWeatherRisk(weather) {
  if (!weather?.current || !weather?.daily) return null;

  const humidity = weather.current.relative_humidity_2m ?? 0;
  const rainChance =
    weather.daily.precipitation_probability_max?.[0] ?? 0;

  const code = weather.current.weather_code;

  const maxTemp =
    weather.daily.temperature_2m_max?.[0] ?? 0;

  const minTemp =
    weather.daily.temperature_2m_min?.[0] ?? 0;

  // Rain / drizzle / showers
  const rainExpected =
    rainChance >= 40 ||
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code);

  // High humidity + rain = stronger fungal risk
  const fungalRisk =
    humidity >= 75 && rainExpected;

  // Very high humidity + significant rain
  const severeFungalRisk =
    humidity >= 85 && rainChance >= 60;

  // Hot weather
  const heatRisk =
    maxTemp >= 38;

  // Cool + humid conditions
  const coolHumidRisk =
    minTemp <= 18 && humidity >= 80;

  // --------------------------------
  // HIGH FUNGAL RISK
  // --------------------------------

  if (severeFungalRisk) {
    return {
      level: "High",
      title: "Weather Risk Alert",
      message: "Rain expected with very high humidity.",
      risk:
        "High humidity + rainfall may significantly increase fungal disease risk.",
      action:
        "Inspect your crop closely, improve field ventilation where possible, and avoid unnecessary irrigation.",
      icon: "🌧️",
    };
  }

  // --------------------------------
  // FUNGAL RISK
  // --------------------------------

  if (fungalRisk) {
    return {
      level: "High",
      title: "Weather Risk Alert",
      message: "Rain expected in the next 24 hours.",
      risk:
        "High humidity + rainfall may increase fungal disease risk.",
      action:
        "Consider monitoring your crop closely and avoid unnecessary irrigation.",
      icon: "🌦️",
    };
  }

  // --------------------------------
  // RAIN
  // --------------------------------

  if (rainExpected) {
    return {
      level: "Moderate",
      title: "Weather Risk Alert",
      message: "Rain expected in the next 24 hours.",
      risk:
        "Wet conditions may increase the risk of some crop diseases.",
      action:
        "Monitor your crop closely and avoid unnecessary irrigation before rainfall.",
      icon: "🌧️",
    };
  }

  // --------------------------------
  // HIGH HUMIDITY
  // --------------------------------

  if (humidity >= 75) {
    return {
      level: "Moderate",
      title: "Weather Risk Alert",
      message: "High humidity is expected.",
      risk:
        "High humidity can create favorable conditions for fungal disease development.",
      action:
        "Inspect leaves and monitor your crop closely for early symptoms.",
      icon: "💧",
    };
  }

  // --------------------------------
  // HEAT
  // --------------------------------

  if (heatRisk) {
    return {
      level: "Moderate",
      title: "Weather Risk Alert",
      message: "Hot conditions are expected today.",
      risk:
        "High temperatures may cause heat stress and increase crop water demand.",
      action:
        "Monitor soil moisture and provide irrigation according to crop requirements.",
      icon: "🌡️",
    };
  }

  // --------------------------------
  // COOL + HUMID
  // --------------------------------

  if (coolHumidRisk) {
    return {
      level: "Moderate",
      title: "Weather Risk Alert",
      message: "Cool and humid conditions are expected.",
      risk:
        "Cool, humid weather can favor certain fungal and bacterial diseases.",
      action:
        "Inspect leaves regularly and monitor the crop for early disease symptoms.",
      icon: "🌫️",
    };
  }

  // --------------------------------
  // NORMAL WEATHER
  // --------------------------------

  return {
    level: "Low",
    title: "Weather Risk Alert",
    message: "Weather conditions look favorable.",
    risk:
      "No significant weather-related disease risk detected.",
    action:
      "Continue normal crop monitoring.",
    icon: "☀️",
  };
}
export default function HomeScreen() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
const [weatherLoading, setWeatherLoading] = useState(false);



  useEffect(() => {
    setLoading(true);
    getScanHistory(lang)
      .then((data) => setRecent(data.scans || []))
      .catch(() => setRecent([]))
      .finally(() => setLoading(false));
  }, [lang]); // re-fetch (re-translate) whenever the user switches language, so old scans update too
   async function detectLocation() {
  if (!navigator.geolocation) {
    setLocation(null);
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
    "Unknown location";

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
        setLocation({
          lat,
          lng,
          label: "Current location",
        });
      }
    },
    () => setLocation(null)
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
  return (
    <>
      <style>{`
        .cs-recent-grid {
          display: grid; grid-template-columns: 1fr; gap: 12px;
        }
        @media (min-width: 700px) {
          .cs-recent-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .cs-recent-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>{t("greeting")}</p>
            <h1
              style={{
                margin: "2px 0 0",
                fontFamily: "'Fraunces', serif",
                fontSize: 28,
                fontWeight: 600,
                color: COLORS.forest,
              }}
            >
              {user?.name || t("farmer")}
            </h1>
            <button
              onClick={detectLocation}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 6,
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <MapPin size={13} color={COLORS.leaf} />

<span style={{ fontSize: 12.5, color: COLORS.inkSoft }}>
  {location?.label || "Detecting location..."}
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
        </div>

        {weather && (
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
           <div
  style={{
    background: COLORS.cream,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 20,
    padding: "18px 22px",
    marginBottom: 12,
  }}
>
  {/* Location */}
  <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.inkSoft,
    paddingBottom: 14,
    marginBottom: 16,
    borderBottom: `1px solid ${COLORS.line}`,
  }}
>
  <MapPin size={14} color={COLORS.leaf} />
  {location?.label || "Current location"}
</div>

  {/* Main weather */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    alignItems: "center",
    gap: 30,
  }}
>

    {/* Temperature */}
   <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 16,
  }}
>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: "#EFEDE0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 38,
          flexShrink: 0,
        }}
      >
        {getWeatherIcon(weather.current?.weather_code ?? 0)}
      </div>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.forest,
              lineHeight: 1,
            }}
          >
            {Math.round(weather.current?.temperature_2m ?? 0)}
          </span>

          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 20,
              color: COLORS.forest,
            }}
          >
            °C
          </span>
        </div>

        <div
          style={{
            fontSize: 13,
            color: COLORS.inkSoft,
            marginTop: 6,
          }}
        >
          {getWeatherDescription(
            weather.current?.weather_code ?? 0
          )}
        </div>
      </div>
    </div>

    {/* Weather stats */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  }}
>
  <div
    style={{
      background: "#EFEDE0",
      borderRadius: 14,
      padding: "12px 14px",
    }}
  >
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.6,
        color: COLORS.inkSoft,
        marginBottom: 7,
      }}
    >
      HUMIDITY
    </div>

    <div
      style={{
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.forest,
      }}
    >
      💧 {weather.current?.relative_humidity_2m ?? 0}%
    </div>
  </div>

  <div
    style={{
      background: "#EFEDE0",
      borderRadius: 14,
      padding: "12px 14px",
    }}
  >
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.6,
        color: COLORS.inkSoft,
        marginBottom: 7,
      }}
    >
      RAIN
    </div>

    <div
      style={{
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.forest,
      }}
    >
      🌧️ {weather.daily?.precipitation_probability_max?.[0] || 0}%
    </div>
  </div>
</div>
  </div>

  {/* Today's forecast message */}
 <div
  style={{
    marginTop: 18,
    paddingTop: 13,
    borderTop: `1px solid ${COLORS.line}`,
    fontSize: 12.5,
    color: COLORS.inkSoft,
    display: "flex",
    alignItems: "center",
    gap: 6,
  }}
>
    {getWeatherMessage(weather)}
  </div>
</div>
              
            {(() => {
              const risk = getWeatherRisk(weather);

              if (!risk) return null;

              return (
                <div
                  style={{
                    background:
                      risk.level === "High"
                        ? "#FFF4E5"
                        : risk.level === "Moderate"
                        ? "#FFF8EA"
                        : "#EEF5E8",
                    border:
                      risk.level === "High"
                        ? "1px solid #E8C98A"
                        : `1px solid ${COLORS.line}`,
                    borderRadius: 18,
                    padding: "16px 18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background:
                          risk.level === "High"
                            ? "#F5DEB3"
                            : "#E5EEDC",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 21,
                        flexShrink: 0,
                      }}
                    >
                      {risk.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 0.7,
                          color:
                            risk.level === "High"
                              ? COLORS.amberDeep
                              : COLORS.leaf,
                        }}
                      >
                        WEATHER RISK ALERT
                      </p>

                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: 15,
                          fontWeight: 700,
                          color: COLORS.forest,
                        }}
                      >
                        {risk.message}
                      </p>

                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: 12.5,
                          lineHeight: 1.5,
                          color: COLORS.inkSoft,
                        }}
                      >
                        <strong>{risk.risk}</strong>
                      </p>

                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: 12.5,
                          lineHeight: 1.5,
                          color: COLORS.inkSoft,
                        }}
                      >
                        {risk.action}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
        
        <button
          onClick={() => navigate("/scan")}
          style={{
            background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestDeep})`,
            borderRadius: 22,
            padding: "30px 28px",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            width: "100%",
            maxWidth: 520,
          }}
        >
          <div style={{ position: "absolute", right: -10, top: -10, opacity: 0.15 }}>
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
          <p style={{ color: "#D8DECB", fontSize: 12.5, margin: "0 0 14px", maxWidth: 280 }}>
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
            <Camera size={15} /> {t("startScan")}
          </div>
        </button>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.inkSoft, letterSpacing: 0.5, margin: "0 0 12px" }}>
          {t("recentScans")}
        </p>

        {loading && <p style={{ fontSize: 13, color: COLORS.inkSoft }}>{t("loading")}</p>}

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
            <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>{t("noScans")}</p>
          </div>
        )}

        <div className="cs-recent-grid">
          {recent.map((r) => (
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
              <div style={{ flex: 1, minWidth: 0 }}>
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
                  {r.crop} — {r.disease}
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: COLORS.inkSoft }}>
                  {new Date(r.createdAt).toLocaleDateString()}
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
          ))}
        </div>
      </div>
    </>
  );
}