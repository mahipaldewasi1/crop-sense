import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Store,
  Camera,
  UserCheck,
  ClipboardCheck,
} from "lucide-react";
import { startFollowUp } from "../api/client";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import LeafGauge from "../components/LeafGauge";
import { useLanguage } from "../i18n/LanguageContext";

const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };
const SEVERITY_KEY = { Low: "severityLow", Medium: "severityMedium", High: "severityHigh" };

const IPM_META = [
  { icon: "🔍", key: "ipmMonitor", field: "monitoring" },
  { icon: "🌱", key: "ipmCultural", field: "cultural" },
  { icon: "🦠", key: "ipmBiological", field: "biological" },
  { icon: "🧪", key: "ipmChemical", field: "chemical" },
  { icon: "🛡️", key: "ipmSafety", field: "safety" },
];

function formatModelLabel(label = "") {
  if (!label) return "";
  return label
    .replace(/___/g, " — ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// One consistent card shell used everywhere on this screen — accentColor
// draws a thin left bar for semantic meaning instead of tinting the whole card.
function Card({ accentColor, children, style }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        background: COLORS.cream,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 16,
        padding: 18,
        ...style,
      }}
    >
      {accentColor && (
        <div style={{ width: 3, borderRadius: 3, background: accentColor, flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

function SectionLabel({ icon, children, color = COLORS.inkSoft }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, color }}>{children}</span>
    </div>
  );
}

export default function ResultScreen() {
  const { t } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();

  const scan = state?.scan;
  console.log("CURRENT SCAN:", scan);
  const [followUpLoading, setFollowUpLoading] = React.useState(false);

async function handleStartFollowUp() {
  try {
    if (!scan?._id) {
      console.error("No scan ID available:", scan);
      alert("This scan cannot be added to follow-up monitoring.");
      return;
    }

    setFollowUpLoading(true);

    console.log("Starting follow-up for scan:", scan._id);

    await startFollowUp(scan._id);

    navigate("/follow-up");
  } catch (err) {
    console.error("Follow-up error:", err);
    alert(err.message || "Could not start follow-up monitoring.");
  } finally {
    setFollowUpLoading(false);
  }
}
  const uncertain = state?.uncertain || false;
  const [expertStatus, setExpertStatus] = React.useState("not_requested");
  const [followUpStarting, setFollowUpStarting] = React.useState(false);
const [followUpStarted, setFollowUpStarted] = React.useState(false);

async function handleStartFollowUp() {
  if (!scan?._id) {
    console.error("No scan ID available:", scan);
    return;
  }

  try {
    setFollowUpStarting(true);

    const { startFollowUp } = await import("../api/client");

    await startFollowUp(scan._id);

   setFollowUpStarted(true);
navigate("/follow-up");

  } catch (err) {
    console.error("Start follow-up error:", err);
    alert(err.message || "Could not start follow-up monitoring.");
  } finally {
    setFollowUpStarting(false);
  }
}

  /* ------------------------------------------------------
   * UNCERTAIN AI RESULT
   * ------------------------------------------------------ */
  if (uncertain) {
    const crop = state?.crop || "tomato";
    const disease = formatModelLabel(state?.disease || "");
    const confidence = state?.confidence ?? null;
    const message = state?.message || t("lowConfidenceDefault");

    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
        <TopBar title={t("result")} onBack={() => navigate("/scan")} />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card accentColor={COLORS.amberDeep}>
            <SectionLabel icon={<AlertTriangle size={16} color={COLORS.amberDeep} />} color={COLORS.amberDeep}>
              {t("aiAssessment")}
            </SectionLabel>
            <h2 style={{ margin: "0 0 6px", fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, color: COLORS.forest }}>
              {disease || t("lowConfidenceResult")}
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.inkSoft }}>
              {t("cropLabel")}: <b style={{ color: COLORS.ink }}>{crop}</b>
            </p>
          </Card>

          <Card>
            <SectionLabel color={COLORS.inkSoft}>{t("aiConfidence")}</SectionLabel>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.amberDeep }}>
              {confidence !== null ? `${confidence}%` : t("lowConfidenceResult")}
            </div>
          </Card>

          <Card>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.ink, lineHeight: 1.6 }}>{message}</p>
          </Card>

          <Card>
            <SectionLabel color={COLORS.forest}>{t("forBetterResult")}</SectionLabel>
            <ul style={{ margin: 0, paddingLeft: 20, color: COLORS.inkSoft, fontSize: 13, lineHeight: 1.7 }}>
              <li>{t("tipOneLeaf")}</li>
              <li>{t("tipDaylight")}</li>
              <li>{t("tipAvoidDistant")}</li>
            </ul>
          </Card>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <PrimaryButton onClick={() => navigate("/scan")} icon={Camera} style={{ flex: "1 1 220px" }}>
              {t("retakePhoto")}
            </PrimaryButton>
            <PrimaryButton
              onClick={() => navigate("/store")}
              icon={Store}
              style={{ flex: "1 1 220px", background: "transparent", color: COLORS.forest, border: `1.5px solid ${COLORS.forest}` }}
            >
              {t("findExpert")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------
   * NO SCAN DATA
   * ------------------------------------------------------ */
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

  /* ------------------------------------------------------
   * CONFIDENT RESULT
   * ------------------------------------------------------ */
  const color = SEVERITY_COLOR[scan.severity] || COLORS.amberDeep;

  return (
    <>
      <style>{`
        .cs-result-grid { display: flex; flex-direction: column; gap: 14px; }
        @media (min-width: 800px) {
          .cs-result-grid { flex-direction: row; align-items: flex-start; }
          .cs-result-gauge { flex: 0 0 260px; }
          .cs-result-details { flex: 1; display: flex; flex-direction: column; gap: 14px; }
        }
      `}</style>

      <div className="cs-animate-in" style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 40px" }}>
        <TopBar title={t("result")} onBack={() => navigate("/scan")} />

        <div className="cs-result-grid">
          {/* Severity gauge */}
          <div
            className="cs-result-gauge"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: COLORS.cream,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 18,
              padding: "24px 0",
            }}
          >
            <LeafGauge percent={scan.severityPercent} color={color} />
          </div>

          <div className="cs-result-details">
            {/* Diagnosis */}
            <Card accentColor={color}>
              <SectionLabel icon={<AlertTriangle size={16} color={color} />}>{t("detected")}</SectionLabel>
              <h2 style={{ margin: "0 0 4px", fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: COLORS.forest }}>
                {scan.crop} — {scan.disease}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>
                {t("severity")}: <b style={{ color }}>{t(SEVERITY_KEY[scan.severity])}</b> · {t("confidence")}: {scan.confidence}%
              </p>
            </Card>

            {/* Expert Validation */}
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: expertStatus === "not_requested" ? 12 : 0 }}>
                <UserCheck size={18} color={COLORS.forest} />
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: COLORS.forest, letterSpacing: 0.4 }}>
                    {t("expertValidation")}
                  </p>
                  <p style={{ margin: "3px 0 0", fontSize: 11.5, color: COLORS.inkSoft }}>{t("expertValidationDesc")}</p>
                </div>
              </div>

              {expertStatus === "not_requested" ? (
                <>
                  <p style={{ margin: "12px 0 0", fontSize: 12.5, lineHeight: 1.55, color: COLORS.inkSoft }}>
                    {t("expertReviewRequestPrompt")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setExpertStatus("requested")}
                    style={{
                      marginTop: 12,
                      border: "none",
                      background: COLORS.forest,
                      color: "#fff",
                      padding: "9px 14px",
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {t("requestExpertReview")}
                  </button>
                </>
              ) : (
                <div
                  style={{
                    marginTop: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 12px",
                    background: "rgba(62,125,83,0.1)",
                    borderRadius: 12,
                    fontSize: 12.5,
                    color: COLORS.forest,
                  }}
                >
                  <CheckCircle2 size={15} color={COLORS.ok} />
                  {t("expertReviewRequested")}
                </div>
              )}
            </Card>

            {/* Recommended action */}
            <Card accentColor={COLORS.ok}>
              <SectionLabel icon={<CheckCircle2 size={16} color={COLORS.ok} />} color={COLORS.ok}>
                {t("recommendedAction")}
              </SectionLabel>
              <p style={{ margin: 0, fontSize: 13.5, color: COLORS.ink, lineHeight: 1.6 }}>{scan.recommendation}</p>
            </Card>
{/* Follow-up Monitoring */}
<Card accentColor={COLORS.forest}>
  <SectionLabel
    icon={<ClipboardCheck size={16} color={COLORS.forest} />}
    color={COLORS.forest}
  >
    Follow-up Monitoring
  </SectionLabel>

  <p
    style={{
      margin: "0 0 12px",
      fontSize: 13,
      color: COLORS.inkSoft,
      lineHeight: 1.6,
    }}
  >
    Track this crop after treatment and check whether the
    disease is improving, stable, or getting worse.
  </p>

  {followUpStarted ? (
    <div
    
  style={{
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      padding: "11px 13px",
      borderRadius: 10,
      background: "rgba(62,125,83,0.1)",  
      color: COLORS.forest,
      fontSize: 12.5,
      fontWeight: 700,
      flex: 1,
    }}
  >
    ✓ Follow-up monitoring started
  </div>

  <button
    type="button"
    onClick={() => navigate("/follow-up")}
    style={{
      border: `1px solid ${COLORS.forest}`,
      background: "transparent",
      color: COLORS.forest,
      padding: "10px 14px",
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    View Monitoring
  </button>
</div>
  ) : (
    <button
      type="button"
      onClick={handleStartFollowUp}
      disabled={followUpStarting}
      style={{
        border: "none",
        background: COLORS.forest,
        color: "#fff",
        padding: "10px 15px",
        borderRadius: 10,
        fontSize: 12.5,
        fontWeight: 700,
        cursor: followUpStarting ? "wait" : "pointer",
        opacity: followUpStarting ? 0.7 : 1,
      }}
    >
      {followUpStarting
        ? "Starting monitoring..."
        : "Start Follow-up Monitoring"}
    </button>
  )}
</Card>
            {/* IPM recommendations — flattened, no card-inside-a-card */}
            {scan.ipm && (
              <Card>
                <SectionLabel color={COLORS.forest}>{t("ipmRecommendations")}</SectionLabel>
                {IPM_META.map(({ icon, key, field }) => {
                  const items = scan.ipm[field];
                  if (!items?.length) return null;
                  return (
                    <div key={field} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${COLORS.line}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                        <span style={{ fontSize: 15 }}>{icon}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.forest }}>{t(key)}</span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 28, color: COLORS.inkSoft, fontSize: 12.5, lineHeight: 1.6 }}>
                        {items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </Card>
            )}

            <PrimaryButton onClick={() => navigate("/store")} icon={Store} style={{ maxWidth: 320 }}>
              {t("findStore")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}