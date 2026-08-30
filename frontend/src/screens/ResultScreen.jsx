import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Store,
  Camera,
  UserCheck,
} from "lucide-react";

import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import LeafGauge from "../components/LeafGauge";
import { useLanguage } from "../i18n/LanguageContext";

const SEVERITY_COLOR = {
  Low: COLORS.ok,
  Medium: COLORS.amberDeep,
  High: COLORS.danger,
};

const SEVERITY_KEY = {
  Low: "severityLow",
  Medium: "severityMedium",
  High: "severityHigh",
};

function formatModelLabel(label = "") {
  if (!label) return "";

  return label
    .replace(/___/g, " — ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ResultScreen() {
  const { t } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();

  const scan = state?.scan;
  const uncertain = state?.uncertain || false;
  const [expertStatus, setExpertStatus] = React.useState("not_requested");

  /*
   * ------------------------------------------------------
   * UNCERTAIN AI RESULT
   * ------------------------------------------------------
   */

  if (uncertain) {
    const crop = state?.crop || "tomato";
    const disease = formatModelLabel(state?.disease || "");
    const confidence = state?.confidence ?? null;
    const message =
      state?.message ||
      "The AI could not confidently identify the disease.";

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
            background: COLORS.cream,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 20,
            padding: 24,
            marginTop: 10,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <AlertTriangle
              size={22}
              color={COLORS.amberDeep}
            />

            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: COLORS.amberDeep,
                letterSpacing: 0.5,
              }}
            >
              AI ASSESSMENT
            </span>
          </div>

          <h2
            style={{
              margin: "0 0 8px",
              fontFamily: "'Fraunces', serif",
              fontSize: 26,
              fontWeight: 600,
              color: COLORS.forest,
            }}
          >
            {disease || "Low-confidence result"}
          </h2>

          <p
            style={{
              margin: "0 0 18px",
              fontSize: 14,
              color: COLORS.inkSoft,
            }}
          >
            Crop: <b>{crop}</b>
          </p>

          {/* Confidence */}
          <div
            style={{
              background: "#FFF7E8",
              border: "1px solid #F1D69D",
              borderRadius: 16,
              padding: 18,
              marginBottom: 18,
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.inkSoft,
              }}
            >
              AI confidence
            </p>

            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: COLORS.amberDeep,
              }}
            >
              {confidence !== null
                ? `${confidence}%`
                : "Low"}
            </div>
          </div>

          {/* Message */}
          <div
            style={{
              background: "#EFF4EE",
              border: "1px solid #D3E3CC",
              borderRadius: 16,
              padding: 18,
              marginBottom: 20,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: COLORS.ink,
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          </div>

          {/* Guidance */}
          <div style={{ marginBottom: 22 }}>
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.forest,
              }}
            >
              For a better result
            </p>

            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                color: COLORS.inkSoft,
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              <li>Capture one affected leaf clearly.</li>
              <li>Use good daylight.</li>
              <li>Avoid distant whole-plant photos.</li>
            </ul>
          </div>

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
              onClick={() => navigate("/store")}
              icon={Store}
              style={{
                flex: "1 1 220px",
                background: "transparent",
                color: COLORS.forest,
                border: `1.5px solid ${COLORS.forest}`,
              }}
            >
              Find Expert
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ------------------------------------------------------
   * NORMAL / CONFIDENT RESULT
   * ------------------------------------------------------
   */

  if (!scan) {
    return (
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 20px 40px",
        }}
      >
        <TopBar
          title={t("result")}
          onBack={() => navigate("/home")}
        />

        <div
          style={{
            padding: 20,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: COLORS.inkSoft,
              fontSize: 13,
            }}
          >
            {t("noScanData")}
          </p>

          <PrimaryButton
            onClick={() => navigate("/scan")}
            style={{
              marginTop: 14,
              maxWidth: 260,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {t("scanAgain")}
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const color =
    SEVERITY_COLOR[scan.severity] ||
    COLORS.amberDeep;

  return (
    <>
      <style>{`
        .cs-result-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 800px) {
          .cs-result-grid {
            flex-direction: row;
            align-items: flex-start;
          }

          .cs-result-gauge {
            flex: 0 0 260px;
          }

          .cs-result-details {
            flex: 1;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 20px 40px",
        }}
      >
        <TopBar
          title={t("result")}
          onBack={() => navigate("/scan")}
        />

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
            <LeafGauge
              percent={scan.severityPercent}
              color={color}
            />
          </div>

          <div className="cs-result-details">
            {/* Diagnosis */}
            <div
              style={{
                background: COLORS.cream,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 16,
                padding: 18,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <AlertTriangle
                  size={16}
                  color={color}
                />

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.inkSoft,
                    letterSpacing: 0.5,
                  }}
                >
                  {t("detected")}
                </span>
              </div>

              <h2
                style={{
                  margin: "0 0 4px",
                  fontFamily: "'Fraunces', serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: COLORS.forest,
                }}
              >
                {scan.crop} — {scan.disease}
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: COLORS.inkSoft,
                }}
              >
                {t("severity")}:{" "}
                <b style={{ color }}>
                  {t(SEVERITY_KEY[scan.severity])}
                </b>{" "}
                · {t("confidence")}:{" "}
                {scan.confidence}%
              </p>
            </div>
{/* Expert Validation */}
<div
  style={{
    background: "#F7F4E9",
    border: `1px solid ${COLORS.line}`,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
    }}
  >
    <UserCheck size={18} color={COLORS.forest} />

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
        EXPERT VALIDATION
      </p>

      <p
        style={{
          margin: "3px 0 0",
          fontSize: 11.5,
          color: COLORS.inkSoft,
        }}
      >
        Independent review of the AI diagnosis
      </p>
    </div>
  </div>

  {expertStatus === "not_requested" ? (
    <>
      <p
        style={{
          margin: "13px 0 0",
          fontSize: 12.5,
          lineHeight: 1.55,
          color: COLORS.inkSoft,
        }}
      >
        Request an agricultural expert to review this diagnosis
        before taking treatment action.
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
        Request expert review
      </button>
    </>
  ) : (
    <div
      style={{
        marginTop: 13,
        padding: "11px 12px",
        background: "#E8EFDF",
        borderRadius: 12,
        fontSize: 12.5,
        color: COLORS.forest,
      }}
    >
      ✓ Review requested. Your diagnosis is awaiting expert validation.
    </div>
  )}
</div>
            {/* Recommendation */}
            <div
              style={{
                background: "#EFF4EE",
                border: "1px solid #D3E3CC",
                borderRadius: 16,
                padding: 18,
                marginBottom: 18,
              }}
            >
              {scan.ipm && (
  <div
    style={{
      background: COLORS.cream,
      border: `1px solid ${COLORS.line}`,
      borderRadius: 16,
      padding: 18,
      marginBottom: 18,
    }}
  >
    <p
      style={{
        margin: "0 0 14px",
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: 0.6,
        color: COLORS.forest,
      }}
    >
      IPM RECOMMENDATIONS
    </p>

    {[
      ["🔍", "Monitor", scan.ipm.monitoring],
      ["🌱", "Prevent / Cultural", scan.ipm.cultural],
      ["🦠", "Biological", scan.ipm.biological],
      ["🧪", "Chemical", scan.ipm.chemical],
      ["🛡️", "Safe Use", scan.ipm.safety],
    ].map(([icon, title, items]) => {
      if (!items?.length) return null;

      return (
        <div
          key={title}
          style={{
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: `1px solid ${COLORS.line}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 15 }}>{icon}</span>

            <span
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: COLORS.forest,
              }}
            >
              {title}
            </span>
          </div>

          <ul
            style={{
              margin: 0,
              paddingLeft: 28,
              color: COLORS.inkSoft,
              fontSize: 12.5,
              lineHeight: 1.6,
            }}
          >
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul> 
        </div>
      );
    })}
  </div>
)}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <CheckCircle2
                  size={16}
                  color={COLORS.ok}
                />

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.ok,
                    letterSpacing: 0.5,
                  }}
                >
                  {t("recommendedAction")}
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: COLORS.ink,
                  lineHeight: 1.6,
                }}
              >
                {scan.recommendation}
              </p>
            </div>

            {/* Expert */}
            <PrimaryButton
              onClick={() => navigate("/store")}
              icon={Store}
              style={{ maxWidth: 320 }}
            >
              {t("findStore")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}