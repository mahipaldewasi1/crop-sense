import React from "react";
import { COLORS } from "../styles/theme";

export default function PhoneFrame({ children }) {
  return (
    <div style={{
      minHeight: "100vh", width: "100%", display: "flex",
      alignItems: "center", justifyContent: "center", padding: 30,
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: 390, height: 780, borderRadius: 44, background: COLORS.forestDeep,
        padding: 12, boxShadow: "0 30px 60px -20px rgba(21,40,31,0.45)",
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 34, background: COLORS.bg,
          overflow: "hidden", display: "flex", flexDirection: "column",
        }}>
          <div style={{
            height: 30, display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 26px", fontSize: 12, fontWeight: 600, color: COLORS.ink, flexShrink: 0,
          }}>


          </div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
