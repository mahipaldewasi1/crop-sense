import React from "react";
import { COLORS } from "../styles/theme";

export default function PrimaryButton({ children, onClick, icon: Icon, style, disabled, type = "button" }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      width: "100%", padding: "15px 18px", borderRadius: 16, border: "none",
      background: disabled ? COLORS.inkSoft : COLORS.forest, color: "#F4F3EC",
      fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1, ...style,
    }}>
      {Icon && <Icon size={18} />} {children}
    </button>
  );
}
