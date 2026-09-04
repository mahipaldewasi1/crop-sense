import React from "react";
import { ChevronLeft, Leaf } from "lucide-react";
import { COLORS } from "../styles/theme";

export default function TopBar({ title, onBack }) {
  return (
    <div
      style={{
        position: "sticky",
        top: "calc(env(safe-area-inset-top, 0px) + 10px)",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        marginTop: "calc(env(safe-area-inset-top, 0px) + 10px)",
        marginBottom: 18,
        borderRadius: 16,
        background: `linear-gradient(180deg, ${COLORS.forest}, ${COLORS.forestDeep})`,
        boxShadow: "0 8px 22px rgba(21,40,31,0.22)",
      }}
    >
      <style>{`
        .cs-topbar-back {
          transition: background-color 0.16s ease, transform 0.16s ease;
        }
        .cs-topbar-back:hover { background: rgba(255,255,255,0.14) !important; transform: translateX(-1px); }
        .cs-topbar-back:active { transform: translateX(-1px) scale(0.94); }
      `}</style>

      {onBack ? (
        <button onClick={onBack} className="cs-topbar-back" style={{
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12,
          width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0,
        }}>
          <ChevronLeft size={18} color="#fff" />
        </button>
      ) : (
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: COLORS.amber,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Leaf size={17} color={COLORS.forestDeep} />
        </div>
      )}

      <h1 style={{
        fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 19, color: "#fff", margin: 0,
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h1>
    </div>
  );
} 