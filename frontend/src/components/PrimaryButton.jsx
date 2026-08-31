import React, { useState } from "react";
import { COLORS } from "../styles/theme";

export default function PrimaryButton({ children, onClick, icon: Icon, style, disabled, type = "button" }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const isOutline = style?.background === "transparent";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        width: "100%", padding: "15px 18px", borderRadius: 16, border: "none",
        background: disabled ? COLORS.inkSoft : COLORS.forest, color: "#F4F3EC",
        fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1,
        boxShadow: !disabled && hover ? "0 10px 24px -10px rgba(21,40,31,0.45)" : "0 1px 2px rgba(21,40,31,0.06)",
        transform: !disabled && active ? "translateY(0) scale(0.98)" : !disabled && hover ? "translateY(-1px)" : "translateY(0)",
        ...style,
        ...(isOutline && !disabled && hover
          ? { background: "rgba(31,58,46,0.06)" }
          : {}),
      }}
    >
      {Icon && <Icon size={18} />} {children}
    </button>
  );
}