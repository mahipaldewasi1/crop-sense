import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { COLORS } from "../styles/theme";

export default function LanguageSwitcher({ dark = false }) {
  const { lang, changeLang } = useLanguage();

  const buttonStyle = (active) => ({
    minWidth: 44,
    height: 34,
    padding: "0 10px",
    borderRadius: 9,
    border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : COLORS.line}`,
    background: active
      ? COLORS.amber
      : dark
      ? "rgba(255,255,255,0.06)"
      : COLORS.cream,
    color: active
      ? COLORS.forestDeep
      : dark
      ? "#fff"
      : COLORS.forest,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
  });

  return (
    <div
      aria-label="Language"
      style={{ display: "flex", alignItems: "center", gap: 5 }}
    >
      {[
        ["en", "EN"],
        ["hi", "हि"],
        ["mr", "मर"],
      ].map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => changeLang(code)}
          aria-pressed={lang === code}
          style={buttonStyle(lang === code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
