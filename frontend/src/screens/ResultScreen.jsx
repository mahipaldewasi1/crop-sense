import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Store } from "lucide-react";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import LeafGauge from "../components/LeafGauge";

const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };

export default function ResultScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scan = state?.scan;

  // Agar direct URL se aaya (page refresh) to scan data nahi milega - home bhej do
  if (!scan) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TopBar title="Result" onBack={() => navigate("/home")} />
        <div style={{ padding: 20, textAlign: "center" }}>
          <p style={{ color: COLORS.inkSoft, fontSize: 13 }}>No scan data found. Please scan again.</p>
          <PrimaryButton onClick={() => navigate("/scan")} style={{ marginTop: 14 }}>Scan Crop</PrimaryButton>
        </div>
      </div>
    );
  }

  const color = SEVERITY_COLOR[scan.severity] || COLORS.amberDeep;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar title="Detection Result" onBack={() => navigate("/scan")} />
      <div style={{ flex: 1, padding: "0 20px 20px", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 18, padding: "18px 0", marginBottom: 16 }}>
          <LeafGauge percent={scan.severityPercent} color={color} />
        </div>

        <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <AlertTriangle size={16} color={color} />
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.inkSoft, letterSpacing: 0.5 }}>DETECTED</span>
          </div>
          <h2 style={{ margin: "0 0 4px", fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 600, color: COLORS.forest }}>
            {scan.crop} — {scan.disease}
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>
            Severity: <b style={{ color }}>{scan.severity}</b> · Confidence: {scan.confidence}%
          </p>
        </div>

        <div style={{ background: "#EFF4EE", border: "1px solid #D3E3CC", borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <CheckCircle2 size={16} color={COLORS.ok} />
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.ok, letterSpacing: 0.5 }}>RECOMMENDED ACTION</span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: COLORS.ink, lineHeight: 1.6 }}>{scan.recommendation}</p>
        </div>

        <PrimaryButton onClick={() => navigate("/store")} icon={Store}>Find Nearby Store</PrimaryButton>
      </div>
    </div>
  );
}
