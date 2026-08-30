import React, { useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
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
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "24px 20px 40px",
      }}
    >
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
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 14,
  }}
>
  <select
    value={cropFilter}
    onChange={(e) => setCropFilter(e.target.value)}
    style={{
      padding: "9px 12px",
      borderRadius: 10,
      border: `1px solid ${COLORS.line}`,
      background: COLORS.cream,
      color: COLORS.forest,
      fontSize: 12,
      cursor: "pointer",
    }}
  >
    <option value="All">All Crops</option>
    <option value="Tomato">Tomato</option>
    <option value="Potato">Potato</option>
  </select>

  <select
    value={diseaseFilter}
    onChange={(e) => setDiseaseFilter(e.target.value)}
    style={{
      padding: "9px 12px",
      borderRadius: 10,
      border: `1px solid ${COLORS.line}`,
      background: COLORS.cream,
      color: COLORS.forest,
      fontSize: 12,
      cursor: "pointer",
    }}
  >
    <option value="All">All Diseases</option>
    <option value="Late Blight">Late Blight</option>
    <option value="Early Blight">Early Blight</option>
  </select>

  <select
    value={riskFilter}
    onChange={(e) => setRiskFilter(e.target.value)}
    style={{
      padding: "9px 12px",
      borderRadius: 10,
      border: `1px solid ${COLORS.line}`,
      background: COLORS.cream,
      color: COLORS.forest,
      fontSize: 12,
      cursor: "pointer",
    }}
  >
    <option value="All">All Risk Levels</option>
    <option value="High">High Risk</option>
    <option value="Moderate">Moderate Risk</option>
  </select>
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