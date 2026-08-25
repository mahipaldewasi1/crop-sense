import React from "react";
import { COLORS } from "../styles/theme";

export default function LeafGauge({ percent, color }) {
  const r = 52, c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#E7E4D6" strokeWidth="12" />
      <circle
        cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="65" textAnchor="middle" fontFamily="'Fraunces', serif" fontWeight="700" fontSize="30" fill={COLORS.ink}>
        {percent}%
      </text>
      <text x="70" y="85" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill={COLORS.inkSoft} letterSpacing="1">
        SEVERITY
      </text>
    </svg>
  );
}
