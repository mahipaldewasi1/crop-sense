import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { COLORS } from "../styles/theme";

export default function RiskMap({ location }) {
  if (!location?.lat || !location?.lng) {
    return (
      <div
        style={{
          background: COLORS.cream,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 18,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: COLORS.forest,
            fontWeight: 700,
          }}
        >
          <MapPin size={18} color={COLORS.leaf} />
          Detect your location to view the risk map
        </div>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: 12,
            color: COLORS.inkSoft,
          }}
        >
          The map will show nearby crop-disease hotspots.
        </p>
      </div>
    );
  }

  /*
   * DEMO HOTSPOTS
   *
   * These are intentionally generated around the farmer's
   * current location for the MVP.
   *
   * Later these will come from real scan data + PostGIS.
   */
  const hotspots = [
    {
      id: 1,
      lat: location.lat + 0.025,
      lng: location.lng + 0.018,
      level: "High",
      disease: "Late Blight",
      crop: "Potato",
      reports: 12,
    },
    {
      id: 2,
      lat: location.lat - 0.018,
      lng: location.lng + 0.030,
      level: "Moderate",
      disease: "Early Blight",
      crop: "Tomato",
      reports: 7,
    },
    {
      id: 3,
      lat: location.lat + 0.010,
      lng: location.lng - 0.035,
      level: "Low",
      disease: "Leaf Spot",
      crop: "Tomato",
      reports: 3,
    },
  ];

  const riskColor = {
    High: "#C94A2F",
    Moderate: "#D88916",
    Low: "#5C8A57",
  };

  return (
    <div
      style={{
        background: COLORS.cream,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 24,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "16px 18px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.7,
              color: COLORS.leaf,
            }}
          >
            GEOSPATIAL RISK MAP
          </p>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.forest,
            }}
          >
            Nearby crop disease hotspots
          </p>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: 12,
              color: COLORS.inkSoft,
            }}
          >
            Reported disease activity around your location
          </p>
        </div>

        <div
          style={{
            fontSize: 11,
            color: COLORS.inkSoft,
            textAlign: "right",
            whiteSpace: "nowrap",
          }}
        >
          📍 {location.label || "Current area"}
        </div>
      </div>

      {/* MAP */}
      <div style={{ height: 360, width: "100%" }}>
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* FARMER LOCATION */}
          <CircleMarker
            center={[location.lat, location.lng]}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: COLORS.forest,
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>Your location</strong>
              <br />
              {location.label || "Current location"}
            </Popup>
          </CircleMarker>

          {/* DISEASE HOTSPOTS */}
          {hotspots.map((spot) => (
            <CircleMarker
              key={spot.id}
              center={[spot.lat, spot.lng]}
              radius={14}
              pathOptions={{
                color: riskColor[spot.level],
                fillColor: riskColor[spot.level],
                fillOpacity: 0.55,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{spot.disease}</strong>

                <br />

                Crop: {spot.crop}

                <br />

                Risk: {spot.level}

                <br />

                Reports: {spot.reports}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* LEGEND */}
      <div
        style={{
          padding: "12px 18px 15px",
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          fontSize: 11.5,
          color: COLORS.inkSoft,
        }}
      >
        {[
          ["High", "#C94A2F"],
          ["Moderate", "#D88916"],
          ["Low", "#5C8A57"],
        ].map(([label, color]) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: color,
              }}
            />

            {label} risk
          </div>
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: COLORS.forest,
              border: "2px solid white",
              boxSizing: "border-box",
            }}
          />

          Your location
        </div>
      </div>
    </div>
  );
}