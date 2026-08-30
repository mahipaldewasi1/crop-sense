import React, { useState } from "react";
import { MapPin, AlertTriangle, ChevronDown, X } from "lucide-react";
import DiseaseHotspotMap from "../components/DiseaseHotspotMap";
import { COLORS } from "../styles/theme";

export default function DiseaseMapScreen() {
  const [location] = useState({
    lat: 26.9124,
    lng: 75.7873,
    label: "Jaipur, Rajasthan",
  });
const [cropFilter, setCropFilter] = useState("All");
const [diseaseFilter, setDiseaseFilter] = useState("All");
const [riskFilter, setRiskFilter] = useState("All");
  const [hotspots] = useState([
    {
      id: 1,
      lat: 26.9157,
      lng: 75.8245,
      disease: "Late Blight",
      crop: "Potato",
      cases: 18,
      risk: "High",
    },
    {
      id: 2,
      lat: 26.9025,
      lng: 75.7873,
      disease: "Early Blight",
      crop: "Tomato",
      cases: 11,
      risk: "Moderate",
    },
    {
      id: 3,
      lat: 26.9360,
      lng: 75.8030,
      disease: "Late Blight",
      crop: "Potato",
      cases: 23,
      risk: "High",
    },
  ]);
  const filteredHotspots = hotspots.filter((spot) => {
  const cropMatch =
    cropFilter === "All" || spot.crop === cropFilter;

  const diseaseMatch =
    diseaseFilter === "All" || spot.disease === diseaseFilter;

  const riskMatch =
    riskFilter === "All" || spot.risk === riskFilter;

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
          appearance: none; -webkit-appearance: none;
          transition: border-color 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease;
        }
        .cs-filter-wrap:hover .cs-filter-select {
          border-color: ${COLORS.leaf} !important;
        }
        .cs-filter-select:focus {
          outline: none;
          border-color: ${COLORS.forest} !important;
          box-shadow: 0 0 0 3px rgba(31,58,46,0.12);
        }
        .cs-filter-wrap { position: relative; }
        .cs-filter-chevron {
          position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
          pointer-events: none;
        }
        .cs-clear-filters {
          transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease;
        }
        .cs-clear-filters:hover {
          border-color: ${COLORS.danger}; color: ${COLORS.danger};
        }
        .cs-stat-card {
          transition: transform 0.16s ease, box-shadow 0.16s ease;
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
          DISEASE SURVEILLANCE
        </p>

        <h1
          style={{
            margin: "5px 0 4px",
            fontFamily: "'Fraunces', serif",
            fontSize: 28,
            color: COLORS.forest,
          }}
        >
          Crop disease hotspots
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: COLORS.inkSoft,
            maxWidth: 650,
          }}
        >
          Aggregated disease reports help identify areas that may
          need closer monitoring and preventive intervention.
        </p>
      </div>
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 14,
  }}
>
  <div className="cs-filter-wrap">
    <select
      value={cropFilter}
      onChange={(e) => setCropFilter(e.target.value)}
      className="cs-filter-select"
      style={{
        padding: "9px 32px 9px 12px",
        borderRadius: 10,
        border: `1.5px solid ${cropFilter !== "All" ? COLORS.forest : COLORS.line}`,
        background: cropFilter !== "All" ? "#EAF1E6" : COLORS.cream,
        color: COLORS.forest,
        fontSize: 12,
        fontWeight: cropFilter !== "All" ? 700 : 500,
        cursor: "pointer",
      }}
    >
      <option value="All">All Crops</option>
      <option value="Tomato">Tomato</option>
      <option value="Potato">Potato</option>
    </select>
    <ChevronDown size={14} color={COLORS.inkSoft} className="cs-filter-chevron" />
  </div>

  <div className="cs-filter-wrap">
    <select
      value={diseaseFilter}
      onChange={(e) => setDiseaseFilter(e.target.value)}
      className="cs-filter-select"
      style={{
        padding: "9px 32px 9px 12px",
        borderRadius: 10,
        border: `1.5px solid ${diseaseFilter !== "All" ? COLORS.forest : COLORS.line}`,
        background: diseaseFilter !== "All" ? "#EAF1E6" : COLORS.cream,
        color: COLORS.forest,
        fontSize: 12,
        fontWeight: diseaseFilter !== "All" ? 700 : 500,
        cursor: "pointer",
      }}
    >
      <option value="All">All Diseases</option>
      <option value="Late Blight">Late Blight</option>
      <option value="Early Blight">Early Blight</option>
    </select>
    <ChevronDown size={14} color={COLORS.inkSoft} className="cs-filter-chevron" />
  </div>

  <div className="cs-filter-wrap">
    <select
      value={riskFilter}
      onChange={(e) => setRiskFilter(e.target.value)}
      className="cs-filter-select"
      style={{
        padding: "9px 32px 9px 12px",
        borderRadius: 10,
        border: `1.5px solid ${riskFilter !== "All" ? COLORS.forest : COLORS.line}`,
        background: riskFilter !== "All" ? "#EAF1E6" : COLORS.cream,
        color: COLORS.forest,
        fontSize: 12,
        fontWeight: riskFilter !== "All" ? 700 : 500,
        cursor: "pointer",
      }}
    >
      <option value="All">All Risk Levels</option>
      <option value="High">High Risk</option>
      <option value="Moderate">Moderate Risk</option>
    </select>
    <ChevronDown size={14} color={COLORS.inkSoft} className="cs-filter-chevron" />
  </div>

  {(cropFilter !== "All" || diseaseFilter !== "All" || riskFilter !== "All") && (
    <button
      onClick={() => { setCropFilter("All"); setDiseaseFilter("All"); setRiskFilter("All"); }}
      className="cs-clear-filters"
      style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "8px 12px", borderRadius: 10, border: `1px solid ${COLORS.line}`,
        background: "transparent", color: COLORS.inkSoft, fontSize: 12, fontWeight: 600,
        cursor: "pointer",
      }}
    >
      <X size={13} /> Clear filters
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

          <div
            style={{
              fontSize: 11.5,
              color: COLORS.inkSoft,
            }}
          >
            Active hotspots
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

          <div
            style={{
              fontSize: 11.5,
              color: COLORS.inkSoft,
            }}
          >
            High-risk hotspots
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
            Reported cases in demo area
          </div>
        </div>
      </div>
    </div>
  );
}