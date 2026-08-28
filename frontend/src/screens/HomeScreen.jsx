import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Camera, MapPin, ScanLine } from "lucide-react";
import { COLORS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getScanHistory } from "../api/client";

const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };
const SEVERITY_KEY = { Low: "severityLow", Medium: "severityMedium", High: "severityHigh" };

export default function HomeScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScanHistory()
      .then((data) => setRecent(data.scans || []))
      .catch(() => setRecent([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .cs-recent-grid {
          display: grid; grid-template-columns: 1fr; gap: 12px;
        }
        @media (min-width: 700px) {
          .cs-recent-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .cs-recent-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>{t("greeting")}</p>
            <h1 style={{ margin: "2px 0 0", fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, color: COLORS.forest }}>
              {user?.name || t("farmer")}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              <MapPin size={13} color={COLORS.leaf} />
              <span style={{ fontSize: 12.5, color: COLORS.inkSoft }}>{user?.location?.label || t("locationNotSet")}</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/scan")} style={{
          background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestDeep})`,
          borderRadius: 22, padding: "30px 28px", border: "none", cursor: "pointer",
          textAlign: "left", marginBottom: 28, position: "relative", overflow: "hidden",
          width: "100%", maxWidth: 520,
        }}>
          <div style={{ position: "absolute", right: -10, top: -10, opacity: 0.15 }}><Leaf size={120} color="#fff" /></div>
          <ScanLine size={26} color={COLORS.amber} />
          <p style={{ color: "#fff", fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, margin: "12px 0 4px" }}>
            {t("scanCrop")}
          </p>
          <p style={{ color: "#D8DECB", fontSize: 12.5, margin: "0 0 14px", maxWidth: 280 }}>
            {t("scanSubtitle")}
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.amber, padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: COLORS.forestDeep }}>
            <Camera size={15} /> {t("startScan")}
          </div>
        </button>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.inkSoft, letterSpacing: 0.5, margin: "0 0 12px" }}>
          {t("recentScans")}
        </p>

        {loading && <p style={{ fontSize: 13, color: COLORS.inkSoft }}>{t("loading")}</p>}

        {!loading && recent.length === 0 && (
          <div style={{ background: COLORS.cream, border: `1px dashed ${COLORS.line}`, borderRadius: 14, padding: 20, textAlign: "center", maxWidth: 520 }}>
            <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>{t("noScans")}</p>
          </div>
        )}

        <div className="cs-recent-grid">
          {recent.map((r) => (
            <div key={r._id} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EFEDE0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Leaf size={18} color={COLORS.leaf} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: COLORS.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.crop} — {r.disease}
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: COLORS.inkSoft }}>{new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 20, color: "#fff", background: SEVERITY_COLOR[r.severity], flexShrink: 0 }}>
                {t(SEVERITY_KEY[r.severity])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
