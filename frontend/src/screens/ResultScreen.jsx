import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Store,
  Camera,
  UserCheck,
  ClipboardCheck,
  Leaf,
} from "lucide-react";
import {
  startFollowUp,
  getScanHistory,
  requestExpertReview,
} from "../api/client";
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
function formatCropName(crop = "") {
  if (!crop) return "";

  return crop
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
  const { t, lang } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();
   
  const scan = state?.scan;
  console.log("CURRENT SCAN:", scan);
  const [followUpLoading, setFollowUpLoading] = React.useState(false);


  const uncertain = state?.uncertain || false;
  const cropMismatch = state?.cropMismatch || false;
  const [latestScan, setLatestScan] = React.useState(scan || null);
const [expertLoading, setExpertLoading] = React.useState(false);
const [expertRequesting, setExpertRequesting] = React.useState(false);
  
  const [followUpStarting, setFollowUpStarting] = React.useState(false);
const [followUpStarted, setFollowUpStarted] = React.useState(false);
React.useEffect(() => {
  async function loadLatestScan() {
    if (!scan?._id) {
      return;
    }

    try {
      setExpertLoading(true);

      const data = await getScanHistory(lang);

      const scans = data.scans || [];

      const currentScan = scans.find(
        (item) => item._id === scan._id
      );

      if (currentScan) {
        console.log(
          "LATEST SCAN FROM DATABASE:",
          currentScan
        );

        setLatestScan(currentScan);
      }
    } catch (err) {
      console.error(
        "Could not refresh scan data:",
        err
      );
    } finally {
      setExpertLoading(false);
    }
  }

  loadLatestScan();
}, [scan?._id, lang]);
async function handleRequestExpertReview() {
  if (!scan?._id) {
    alert("This scan cannot be submitted for expert review.");
    return;
  }

  try {
    setExpertRequesting(true);

    const result = await requestExpertReview(scan._id);

    console.log("Expert review request response:", result);

    // Refresh scan from MongoDB
    const data = await getScanHistory(lang);

    const scans = data.scans || [];

    const updatedScan = scans.find(
      (item) => item._id === scan._id
    );

    if (updatedScan) {
      setLatestScan(updatedScan);
    }
  } catch (err) {
    console.error(
      "Request expert review error:",
      err
    );

    alert(
      err.message ||
      "Could not request expert review."
    );
  } finally {
    setExpertRequesting(false);
  }
}
async function handleStartFollowUp() {
  if (!scan?._id) {
    console.error("No scan ID available:", scan);
    alert("This scan cannot be added to follow-up monitoring.");
    return;
  }

  try {
    setFollowUpStarting(true);

    console.log("Starting follow-up for scan:", scan._id);

    const result = await startFollowUp(scan._id);

    console.log("Follow-up API response:", result);

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
 * CROP MISMATCH RESULT
 * ------------------------------------------------------ */
if (cropMismatch) {
  const selectedCrop = formatCropName(
    state?.selectedCrop || state?.crop || ""
  );

  const detectedCrop = formatCropName(
    state?.detectedCrop || ""
  );

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "0 20px 40px",
      }}
    >
      <TopBar
        title={t("result")}
        onBack={() => navigate("/scan")}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Crop mismatch warning */}
        <Card accentColor={COLORS.amberDeep}>
          <SectionLabel
            icon={
              <AlertTriangle
                size={16}
                color={COLORS.amberDeep}
              />
            }
            color={COLORS.amberDeep}
          >
            AI ASSESSMENT
          </SectionLabel>

          <h2
            style={{
              margin: "0 0 10px",
              fontFamily: "'Fraunces', serif",
              fontSize: 24,
              fontWeight: 600,
              color: COLORS.forest,
            }}
          >
            Crop mismatch detected
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: COLORS.inkSoft,
              lineHeight: 1.6,
            }}
          >
            You selected{" "}
            <b style={{ color: COLORS.ink }}>
              {selectedCrop}
            </b>
            , but the AI analysis suggests that the image
            may be a{" "}
            <b style={{ color: COLORS.ink }}>
              {detectedCrop}
            </b>{" "}
            image.
          </p>
        </Card>

        {/* No diagnosis */}
        <Card>
          <SectionLabel
            icon={
              <AlertTriangle
                size={16}
                color={COLORS.amberDeep}
              />
            }
            color={COLORS.amberDeep}
          >
            No diagnosis made
          </SectionLabel>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: COLORS.ink,
              lineHeight: 1.6,
            }}
          >
            We don't want to give you a disease diagnosis
            for the wrong crop. Please select the correct
            crop or upload a clear image of the selected crop.
          </p>
        </Card>

        {/* Better image tips */}
        <Card>
          <SectionLabel color={COLORS.forest}>
            {t("forBetterResult")}
          </SectionLabel>

          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: COLORS.inkSoft,
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            <li>{t("tipOneLeaf")}</li>
            <li>{t("tipDaylight")}</li>
            <li>{t("tipAvoidDistant")}</li>
          </ul>
        </Card>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <PrimaryButton
            onClick={() => navigate("/scan")}
            icon={Camera}
            style={{ flex: "1 1 220px" }}
          >
            Retake Photo
          </PrimaryButton>

          <PrimaryButton
            onClick={() => navigate("/scan")}
            style={{
              flex: "1 1 220px",
              background: "transparent",
              color: COLORS.forest,
              border: `1.5px solid ${COLORS.forest}`,
            }}
          >
            Select Another Crop   
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
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

            {/* Nearby crop precaution */}
            <Card accentColor={COLORS.leaf}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 11,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(77,135,89,0.1)",
                    flexShrink: 0,
                  }}
                >
                  <Leaf size={18} color={COLORS.leaf} />
                </div>

                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12.5,
                      fontWeight: 800,
                      color: COLORS.forest,
                      letterSpacing: 0.3,
                    }}
                  >
                    {t("nearbyCropPrecaution")}
                  </p>

                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: COLORS.inkSoft,
                    }}
                  >
                    {t("nearbyCropPrecautionDesc")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/scan", {
                    state: {
                      nearbyScan: true,
                      nearbyCrop:
                        scan.crop ||
                        state?.crop ||
                        "tomato",
                      sourceDisease: scan.disease || "",
                    },
                  })
                }
                style={{
                  width: "100%",
                  border: "none",
                  background: COLORS.forest,
                  color: "#fff",
                  padding: "11px 15px",
                  borderRadius: 10,
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <Camera size={15} />
                {t("scanNearbyCrops")}
              </button>
            </Card>

{/* Expert Review */}
<Card accentColor={COLORS.forest}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 12,
    }}
  >
    <UserCheck
      size={18}
      color={COLORS.forest}
    />

    <div>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 800,
          color: COLORS.forest,
          letterSpacing: 0.4,
        }}
      >
        Expert Review
      </p>

      <p
        style={{
          margin: "3px 0 0",
          fontSize: 11.5,
          color: COLORS.inkSoft,
        }}
      >
        Professional agricultural guidance
        from an expert.
      </p>
    </div>
  </div>

 {expertLoading ? (
  <div
    style={{
      padding: "11px 12px",
      background: "#F0EEE4",
      borderRadius: 11,
      fontSize: 12,
      color: COLORS.inkSoft,
    }}
  >
    Checking for expert review...
  </div>
) : latestScan?.expertReview?.status === "reviewed" ? (
  <div>
    {/* Reviewed status */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        background: "rgba(62,125,83,0.1)",
        borderRadius: 11,
        marginBottom: 12,
      }}
    >
      <CheckCircle2
        size={16}
        color={COLORS.ok}
      />

      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.forest,
          }}
        >
          Reviewed by Agricultural Expert
        </div>

        {latestScan.expertReview.reviewedAt && (
          <div
            style={{
              marginTop: 2,
              fontSize: 10.5,
              color: COLORS.inkSoft,
            }}
          >
            Reviewed on{" "}
            {new Date(
              latestScan.expertReview.reviewedAt
            ).toLocaleString()}
          </div>
        )}
      </div>
    </div>

    {/* Expert advice */}
    <div
      style={{
        background: "#F0EEE4",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: COLORS.inkSoft,
          marginBottom: 7,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Expert Advice
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 13,
          lineHeight: 1.65,
          color: COLORS.ink,
          whiteSpace: "pre-wrap",
        }}
      >
        {latestScan.expertReview.advice}
      </p>
    </div>
  </div>
) : latestScan?.expertReview?.status === "pending" ? (
  /* Review requested, waiting for expert */
  <div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        background: "rgba(198,150,55,0.12)",
        borderRadius: 11,
        marginBottom: 12,
      }}
    >
      <UserCheck
        size={16}
        color={COLORS.amberDeep}
      />

      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.forest,
          }}
        >
          Expert Review Requested
        </div>

        {latestScan.expertReview.requestedAt && (
          <div
            style={{
              marginTop: 2,
              fontSize: 10.5,
              color: COLORS.inkSoft,
            }}
          >
            Requested on{" "}
            {new Date(
              latestScan.expertReview.requestedAt
            ).toLocaleString()}
          </div>
        )}
      </div>
    </div>

    <p
      style={{
        margin: 0,
        fontSize: 13,
        color: COLORS.inkSoft,
        lineHeight: 1.6,
      }}
    >
      Your case has been sent to an agricultural expert.
      Expert guidance will appear here once the review is
      completed.
    </p>
  </div>
) : (
  /* Not requested yet */
  <div>
    <div
      style={{
        padding: "12px 13px",
        background: "#F0EEE4",
        borderRadius: 11,
        fontSize: 12.5,
        color: COLORS.inkSoft,
        lineHeight: 1.55,
        marginBottom: 12,
      }}
    >
      Need additional guidance? Send this crop case to an
      agricultural expert for professional review.
    </div>

    <button
      type="button"
      onClick={handleRequestExpertReview}
      disabled={expertRequesting}
      style={{
        border: "none",
        background: COLORS.forest,
        color: "#fff",
        padding: "11px 15px",
        borderRadius: 10,
        fontSize: 12.5,
        fontWeight: 700,
        cursor: expertRequesting
          ? "wait"
          : "pointer",
        opacity: expertRequesting ? 0.7 : 1,
      }}
    >
      {expertRequesting
        ? "Requesting expert review..."
        : "Request Expert Review"}
    </button>
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
            {latestScan?.ipm && (
              <Card>
                <SectionLabel color={COLORS.forest}>{t("ipmRecommendations")}</SectionLabel>
                {IPM_META.map(({ icon, key, field }) => {
                  const items = latestScan.ipm[field];
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