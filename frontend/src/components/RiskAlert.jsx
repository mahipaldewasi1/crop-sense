import React from "react";
import { AlertTriangle, CloudRain, ShieldCheck } from "lucide-react";
import { COLORS } from "../styles/theme";

export default function RiskAlert({ weather, recentScans = [] }) {
  if (!weather) return null;

  const humidity = weather.humidity ?? 0;
  const rainChance = weather.rainChance ?? weather.precipitationProbability ?? 0;
  const condition = (weather.condition || "").toLowerCase();

  const fungalConditions =
    humidity >= 75 ||
    rainChance >= 50 ||
    condition.includes("rain") ||
    condition.includes("drizzle");

  const recentDisease = recentScans.find(
    (scan) =>
      scan.disease &&
      scan.disease.toLowerCase() !== "healthy"
  );

  if (!fungalConditions && !recentDisease) {
    return (
      <div
        style={{
          background: "#EEF5E8",
          border: `1px solid ${COLORS.line}`,
          borderRadius: 16,
          padding: "14px 16px",
          marginBottom: 24,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <ShieldCheck size={20} color={COLORS.leaf} />

        <div>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              fontWeight: 700,
              color: COLORS.forest,
            }}
          >
            Crop conditions look favorable
          </p>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: 12,
              color: COLORS.inkSoft,
            }}
          >
            No immediate weather-related crop risk detected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#FFF7E8",
        border: "1px solid #E9D9B2",
        borderRadius: 16,
        padding: "16px",
        marginBottom: 24,
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
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "#F5E4B9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {fungalConditions ? (
            <CloudRain size={20} color={COLORS.amberDeep} />
          ) : (
            <AlertTriangle size={20} color={COLORS.amberDeep} />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: COLORS.amberDeep,
            }}
          >
            FIELD ALERT
          </p>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.forest,
            }}
          >
            Fungal disease risk may increase
          </p>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: 12.5,
              lineHeight: 1.5,
              color: COLORS.inkSoft,
            }}
          >
            {rainChance >= 50
              ? "Rain is expected and"
              : "Weather conditions and"}{" "}
            humidity are favorable for fungal disease development.
            Inspect your crop and avoid unnecessary irrigation.
          </p>
        </div>
      </div>

      {recentDisease && (
        <div
          style={{
            marginTop: 13,
            paddingTop: 12,
            borderTop: "1px solid #E9D9B2",
            fontSize: 12,
            color: COLORS.inkSoft,
          }}
        >
          Recent scan:{" "}
          <strong style={{ color: COLORS.forest }}>
            {recentDisease.crop} — {recentDisease.disease}
          </strong>
        </div>
      )}
    </div>
  );
}