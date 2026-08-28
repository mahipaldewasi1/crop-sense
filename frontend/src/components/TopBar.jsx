import React from "react";
import { ChevronLeft } from "lucide-react";
import { COLORS } from "../styles/theme";

export default function TopBar({ title, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 20px 14px 14px", flexShrink: 0 }}>
      {onBack ? (
        <button onClick={onBack} style={{
          background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 12,
          width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <ChevronLeft size={18} color={COLORS.forest} />
        </button>
      ) : <div style={{ width: 34 }} />}
      <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 19, color: COLORS.forest, margin: 0 }}>
        {title}
      </h1>
    </div>
  );
}
