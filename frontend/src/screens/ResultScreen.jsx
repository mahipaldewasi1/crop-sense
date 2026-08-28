import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Store } from "lucide-react";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import LeafGauge from "../components/LeafGauge";
import { useLanguage } from "../i18n/LanguageContext";

const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };
const SEVERITY_KEY = { Low: "severityLow", Medium: "severityMedium", High: "severityHigh" };

export default function ResultScreen() {
  const { t } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();
  const scan = state?.scan;

  if (!scan) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 40px" }}>
        <TopBar title={t("result")} onBack={() => navigate("/home")} />
        <div style={{ padding: 20, textAlign: "center" }}>
          <p style={{ color: COLORS.inkSoft, fontSize: 13 }}>{t("noScanData")}</p>
          <PrimaryButton onClick={() => navigate("/scan")} style={{ marginTop: 14, maxWidth: 260, marginLeft: "auto", marginRight: "auto" }}>
            {t("scanAgain")}
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const color = SEVERITY_COLOR[scan.severity] || COLORS.amberDeep;

  return (
    <>
      <style>{`
        .cs-result-grid { display: flex; flex-direction: column; gap: 16px; }
        @media (min-width: 800px) {
          .cs-result-grid { flex-direction: row; align-items: flex-start; }
          .cs-result-gauge { flex: 0 0 260px; }
          .cs-result-details { flex: 1; }
        }
      `}</style>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 40px" }}>
        <TopBar title={t("result")} onBack={() => navigate("/scan")} />

        <div className="cs-result-grid">
          <div className="cs-result-gauge" style={{
            display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.cream,
            border: `1px solid ${COLORS.line}`, borderRadius: 18, padding: "24px 0",
          }}>
            <LeafGauge percent={scan.severityPercent} color={color} />
          </div>

          <div className="cs-result-details">
            <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 16, padding: 18, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <AlertTriangle size={16} color={color} />
                <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.inkSoft, letterSpacing: 0.5 }}>{t("detected")}</span>
              </div>
              <h2 style={{ margin: "0 0 4px", fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: COLORS.forest }}>
                {scan.crop} — {scan.disease}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>
                {t("severity")}: <b style={{ color }}>{t(SEVERITY_KEY[scan.severity])}</b> · {t("confidence")}: {scan.confidence}%
              </p>
            </div>

            <div style={{ background: "#EFF4EE", border: "1px solid #D3E3CC", borderRadius: 16, padding: 18, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <CheckCircle2 size={16} color={COLORS.ok} />
                <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.ok, letterSpacing: 0.5 }}>{t("recommendedAction")}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: COLORS.ink, lineHeight: 1.6 }}>{scan.recommendation}</p>
            </div>

            <PrimaryButton onClick={() => navigate("/store")} icon={Store} style={{ maxWidth: 320 }}>
              {t("findStore")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
