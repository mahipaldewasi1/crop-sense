import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Leaf,
  MapPin,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Send,
  User,
} from "lucide-react";

import {
  getMediaUrl,
  getExpertCase,
  submitExpertReview,
} from "../api/client";

import { COLORS } from "../styles/theme";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function ExpertCaseScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { scanId } = useParams();

  const [caseData, setCaseData] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     LOAD CASE
  ========================================================= */

  useEffect(() => {
    async function loadCase() {
      try {
        setLoading(true);
        setError("");

        const data = await getExpertCase(scanId);

        setCaseData(data?.case || null);

        setAdvice(
          data?.case?.expertReview?.advice || ""
        );
      } catch (err) {
        console.error(err);

        setError(
          err?.message ||
            "Could not load this case."
        );
      } finally {
        setLoading(false);
      }
    }

    if (scanId) {
      loadCase();
    }
  }, [scanId]);

  /* =========================================================
     SUBMIT EXPERT REVIEW
  ========================================================= */

  async function handleSubmit(e) {
    e.preventDefault();

    if (!advice.trim()) {
      setError(
        "Please enter expert advice before submitting."
      );
      setSuccess("");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const data = await submitExpertReview(
        scanId,
        advice
      );

      setCaseData(data?.case || caseData);

      setSuccess(
        "Expert review submitted successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Could not submit the review."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <Page>
        <div style={centerStyle}>
          Loading case...
        </div>
      </Page>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error && !caseData) {
    return (
      <Page>
        <div style={centerStyle}>
          <div
            style={{
              color: COLORS.danger,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {error}
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/expert/dashboard")
            }
            style={backButton}
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </button>
        </div>
      </Page>
    );
  }

  /* =========================================================
     STYLES
  ========================================================= */

  const severityStyle = {
    High: {
      background: "#FBE8E5",
      color: "#B42318",
    },

    Medium: {
      background: "#FFF2D6",
      color: "#946200",
    },

    Low: {
      background: "#E4EEDF",
      color: "#2E6B3E",
    },
  };

  const currentSeverity =
    severityStyle[
      caseData?.severity
    ] || severityStyle.Low;

  const reviewed =
    caseData?.expertReview?.status ===
    "reviewed";

  return (
    <Page>

      {/* =====================================================
          RESPONSIVE CSS
      ===================================================== */}

      <style>{`

        .case-page {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* ================================================
           TOP ACTION BAR
        ================================================ */

        .case-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 26px;
          min-width: 0;
        }

        .case-topbar-left,
        .case-topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .case-topbar-right {
          flex-shrink: 0;
        }

        .case-back-button {
          border: 1px solid ${COLORS.line};
          background: ${COLORS.cream};
          color: ${COLORS.forest};
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .case-back-button:hover {
          background: #fff;
        }

        .reviewed-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #E4EEDF;
          color: #2E6B3E;
          padding: 9px 13px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* ================================================
           TITLE
        ================================================ */

        .case-title-block {
          margin-bottom: 24px;
          min-width: 0;
        }

        .case-eyebrow {
          color: ${COLORS.leaf};
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }

        .case-title {
          margin: 0;
          font-family: 'Fraunces', serif;
          color: ${COLORS.forest};
          font-size: 32px;
          line-height: 1.2;
          overflow-wrap: anywhere;
        }

        .case-description {
          margin: 7px 0 0;
          color: ${COLORS.inkSoft};
          font-size: 13px;
          line-height: 1.5;
        }

        /* ================================================
           MAIN GRID
        ================================================ */

        .case-main-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr) 340px;
          gap: 20px;
          align-items: start;
          min-width: 0;
        }

        .case-left-column,
        .case-right-column {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        /* ================================================
           CARD
        ================================================ */

        .case-card {
          width: 100%;
          min-width: 0;
          background: ${COLORS.cream};
          border: 1px solid ${COLORS.line};
          border-radius: 18px;
          padding: 20px;
          box-shadow:
            0 12px 30px -22px
            rgba(21, 40, 31, 0.18);
        }

        .case-card-title {
          margin: 0 0 14px;
          font-family: 'Fraunces', serif;
          color: ${COLORS.forest};
          font-size: 19px;
          line-height: 1.25;
        }

        /* ================================================
           CROP IMAGE
        ================================================ */

        .crop-image-container {
          width: 100%;
          height: 380px;
          border-radius: 14px;
          overflow: hidden;
          background: #F0EEE4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crop-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .image-unavailable {
          color: ${COLORS.inkSoft};
          font-size: 13px;
        }

        /* ================================================
           AI DIAGNOSIS
        ================================================ */

        .diagnosis-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .info-box {
          background: #F0EEE4;
          border-radius: 11px;
          padding: 12px;
          min-width: 0;
        }

        .info-box-label {
          font-size: 10px;
          color: ${COLORS.inkSoft};
          margin-bottom: 4px;
        }

        .info-box-value {
          font-size: 13px;
          font-weight: 700;
          color: ${COLORS.forest};
          overflow-wrap: anywhere;
        }

        .severity-badge-large {
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        /* ================================================
           RECOMMENDATION
        ================================================ */

        .recommendation-text {
          margin: 0;
          color: ${COLORS.ink};
          font-size: 13px;
          line-height: 1.65;
          overflow-wrap: anywhere;
        }

        /* ================================================
           IPM
        ================================================ */

        .ipm-section {
          margin-top: 14px;
        }

        .ipm-title {
          font-size: 11px;
          font-weight: 700;
          color: ${COLORS.forest};
          margin-bottom: 6px;
        }

        .ipm-list {
          margin: 0 0 0 18px;
          padding: 0;
          color: ${COLORS.inkSoft};
          font-size: 11.5px;
          line-height: 1.55;
        }

        /* ================================================
           FARMER
        ================================================ */

        .farmer-profile {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 15px;
        }

        .farmer-avatar {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 50%;
          background: #DDE8DC;
          color: ${COLORS.forest};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .farmer-name {
          display: block;
          color: ${COLORS.forest};
          font-size: 14px;
          overflow-wrap: anywhere;
        }

        .farmer-role {
          font-size: 11px;
          color: ${COLORS.inkSoft};
        }

        /* ================================================
           DETAIL ROW
        ================================================ */

        .detail-row {
          display: flex;
          gap: 9px;
          padding: 10px 0;
          border-top: 1px solid ${COLORS.line};
          min-width: 0;
        }

        .detail-row-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .detail-row-content {
          min-width: 0;
        }

        .detail-row-label {
          font-size: 9.5px;
          color: ${COLORS.inkSoft};
        }

        .detail-row-value {
          margin-top: 2px;
          font-size: 11.5px;
          color: ${COLORS.ink};
          word-break: break-word;
        }

        /* ================================================
           EXPERT GUIDANCE
        ================================================ */

        .expert-guidance-description {
          margin: 0 0 12px;
          color: ${COLORS.inkSoft};
          font-size: 11.5px;
          line-height: 1.5;
        }

        .expert-advice-textarea {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          resize: vertical;
          min-height: 160px;
          border: 1px solid ${COLORS.line};
          border-radius: 12px;
          padding: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          line-height: 1.5;
          outline: none;
          background: #fff;
          color: ${COLORS.ink};
        }

        .expert-advice-textarea:focus {
          border-color: ${COLORS.forest};
          box-shadow:
            0 0 0 3px
            rgba(24, 61, 48, 0.08);
        }

        .message-error {
          margin-top: 10px;
          padding: 10px;
          border-radius: 9px;
          background: #FDECEC;
          color: ${COLORS.danger};
          font-size: 11.5px;
          line-height: 1.45;
        }

        .message-success {
          margin-top: 10px;
          padding: 10px;
          border-radius: 9px;
          background: #E4EEDF;
          color: #2E6B3E;
          font-size: 11.5px;
          line-height: 1.45;
        }

        .submit-review-button {
          width: 100%;
          margin-top: 12px;
          border: none;
          border-radius: 10px;
          padding: 11px 14px;
          min-height: 44px;
          background: ${COLORS.forest};
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .submit-review-button:hover:not(:disabled) {
          opacity: 0.92;
        }

        .submit-review-button:disabled {
          cursor: default;
          opacity: 0.7;
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 1000px) {
          .case-main-grid {
            grid-template-columns: 1fr;
          }

          .case-right-column {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            align-items: start;
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 700px) {

          .case-topbar {
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
          }

          .case-topbar-left {
            width: 100%;
          }

          .case-topbar-right {
            width: 100%;
            justify-content: space-between;
          }

          .case-back-button {
            min-height: 42px;
            padding: 9px 11px;
          }

          .reviewed-badge {
            min-height: 38px;
            padding: 8px 11px;
          }

          .case-title-block {
            margin-bottom: 20px;
          }

          .case-eyebrow {
            font-size: 10px;
          }

          .case-title {
            font-size: 27px;
          }

          .case-description {
            font-size: 12px;
          }

          .case-main-grid {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .case-left-column,
          .case-right-column {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .case-card {
            padding: 15px;
            border-radius: 16px;
          }

          .case-card-title {
            font-size: 18px;
            margin-bottom: 12px;
          }

          /* IMAGE */

          .crop-image-container {
            height: 260px;
            min-height: 0;
            border-radius: 12px;
          }

          /* DIAGNOSIS */

          .diagnosis-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .info-box {
            padding: 11px;
          }

          .info-box-label {
            font-size: 9.5px;
          }

          .info-box-value {
            font-size: 13px;
          }

          .severity-badge-large {
            margin-top: 11px;
          }

          /* FARMER */

          .farmer-profile {
            margin-bottom: 12px;
          }

          /* TEXTAREA */

          .expert-advice-textarea {
            min-height: 150px;
          }

          /* BUTTON */

          .submit-review-button {
            min-height: 46px;
          }
        }

        /* ================================================
           SMALL PHONE
        ================================================ */

        @media (max-width: 390px) {

          .case-title {
            font-size: 25px;
          }

          .case-card {
            padding: 13px;
          }

          .crop-image-container {
            height: 230px;
          }

          .case-back-button {
            font-size: 11px;
          }

          .reviewed-badge {
            font-size: 11px;
          }
        }

      `}</style>

      <div className="case-page">

        {/* ===================================================
            TOP ACTION BAR
        =================================================== */}

        <div className="case-topbar">

          <div className="case-topbar-left">

            <button
              type="button"
              onClick={() =>
                navigate("/expert/dashboard")
              }
              className="case-back-button"
            >
              <ArrowLeft size={16} />
              Back to Cases
            </button>

          </div>

          <div className="case-topbar-right">

            <LanguageSwitcher />

            {reviewed && (
              <div className="reviewed-badge">
                <CheckCircle2 size={15} />
                Reviewed
              </div>
            )}

          </div>

        </div>

        {/* ===================================================
            TITLE
        =================================================== */}

        <div className="case-title-block">

          <div className="case-eyebrow">
            Farmer Case Review
          </div>

          <h1 className="case-title">
            {caseData?.crop || "Crop"} ·{" "}
            {caseData?.disease || "Disease"}
          </h1>

          <p className="case-description">
            Review the AI diagnosis and
            provide professional guidance
            to the farmer.
          </p>

        </div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="case-main-grid">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="case-left-column">

            {/* ===============================================
                CROP IMAGE
            =============================================== */}

            <Card>

              <h2 className="case-card-title">
                Crop Image
              </h2>

              <div className="crop-image-container">

                {caseData?.imageUrl ? (
<img
  src={getMediaUrl(caseData.imageUrl)}
  alt="Farmer crop"
  onError={(e) => {
    console.error(
      "Image failed to load:",
      getMediaUrl(caseData.imageUrl)
    );
  }}
  style={{
    width: "100%",
    height: "100%",
    minHeight: 300,
    objectFit: "contain",
    display: "block",
    borderRadius: 14,
  }}
/>
                ) : (
                  <div className="image-unavailable">
                    Image unavailable
                  </div>
                )}

              </div>

            </Card>

            {/* ===============================================
                AI DIAGNOSIS
            =============================================== */}

            <Card>

              <h2 className="case-card-title">
                AI Diagnosis
              </h2>

              <div className="diagnosis-grid">

                <InfoBox
                  label="Disease"
                  value={
                    caseData?.disease ||
                    "Unavailable"
                  }
                />

                <InfoBox
                  label="Severity"
                  value={`${caseData?.severityPercent ?? 0}%`}
                />

                <InfoBox
                  label="Confidence"
                  value={`${caseData?.confidence ?? 0}%`}
                />

              </div>

              <div
                className="severity-badge-large"
                style={currentSeverity}
              >
                <AlertTriangle size={13} />

                {caseData?.severity ||
                  "Low"}{" "}
                severity
              </div>

            </Card>

            {/* ===============================================
                AI RECOMMENDATION
            =============================================== */}

            <Card>

              <h2 className="case-card-title">
                AI Recommendation
              </h2>

              <p className="recommendation-text">
                {caseData?.recommendation ||
                  "No recommendation available."}
              </p>

            </Card>

            {/* ===============================================
                IPM
            =============================================== */}

            <Card>

              <h2 className="case-card-title">
                Integrated Pest Management
              </h2>

              <IPMSection
                title="Monitoring"
                items={
                  caseData?.ipm?.monitoring
                }
              />

              <IPMSection
                title="Cultural Practices"
                items={
                  caseData?.ipm?.cultural
                }
              />

              <IPMSection
                title="Biological"
                items={
                  caseData?.ipm?.biological
                }
              />

              <IPMSection
                title="Chemical"
                items={
                  caseData?.ipm?.chemical
                }
              />

              <IPMSection
                title="Safety"
                items={
                  caseData?.ipm?.safety
                }
              />

            </Card>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="case-right-column">

            {/* ===============================================
                FARMER INFORMATION
            =============================================== */}

            <Card>

              <h2 className="case-card-title">
                Farmer Information
              </h2>

              <div className="farmer-profile">

                <div className="farmer-avatar">
                  {(
                    caseData?.farmer?.name ||
                    "F"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <strong className="farmer-name">
                    {caseData?.farmer?.name ||
                      "Unknown Farmer"}
                  </strong>

                  <span className="farmer-role">
                    Farmer
                  </span>

                </div>

              </div>

              <DetailRow
                icon={User}
                label="Phone"
                value={
                  caseData?.farmer?.phone ||
                  "Unavailable"
                }
              />

              <DetailRow
                icon={MapPin}
                label="Location"
                value={
                  caseData?.farmer?.location
                    ?.label ||
                  "Unavailable"
                }
              />

              <DetailRow
                icon={Clock3}
                label="Submitted"
                value={
                  caseData?.createdAt
                    ? new Date(
                        caseData.createdAt
                      ).toLocaleString()
                    : "Unknown"
                }
              />

            </Card>

            {/* ===============================================
                EXPERT GUIDANCE
            =============================================== */}

            <Card>

              <h2 className="case-card-title">
                Expert Guidance
              </h2>

              <p className="expert-guidance-description">
                Add your professional
                assessment and practical
                guidance for the farmer.
              </p>

              <form onSubmit={handleSubmit}>

                <textarea
                  value={advice}
                  onChange={(e) =>
                    setAdvice(
                      e.target.value
                    )
                  }
                  placeholder="Write your expert advice..."
                  rows={8}
                  className="expert-advice-textarea"
                  aria-label="Expert advice"
                />

                {error && (
                  <div className="message-error">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="message-success">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="submit-review-button"
                >
                  <Send size={14} />

                  {submitting
                    ? "Submitting..."
                    : reviewed
                    ? "Update Expert Advice"
                    : "Submit Expert Advice"}
                </button>

              </form>

            </Card>

          </div>

        </div>

      </div>

    </Page>
  );
}


/* =============================================================
   PAGE
============================================================= */

function Page({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: COLORS.bg,
        fontFamily: "'Inter', sans-serif",
        color: COLORS.ink,
        overflowX: "hidden",
      }}
    >

      {/* ================================================
          HEADER
      ================================================ */}

      <header
        className="expert-case-header"
        style={{
          height: 72,
          background: COLORS.cream,
          borderBottom:
            `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems: "center",
          padding: "0 34px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >

          <div
            style={{
              width: 42,
              height: 42,
              minWidth: 42,
              borderRadius: 12,
              background: COLORS.forest,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf
              size={22}
              color={COLORS.amber}
            />
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >

            <div
              style={{
                fontFamily:
                  "'Fraunces', serif",
                fontSize: 21,
                fontWeight: 600,
                color: COLORS.forest,
                lineHeight: 1,
              }}
            >
              FasalSaathi
            </div>

            <div
              style={{
                fontSize: 10,
                color: COLORS.inkSoft,
                marginTop: 4,
              }}
            >
              Expert Portal
            </div>

          </div>

        </div>

      </header>

      {/* ================================================
          CONTENT
      ================================================ */}

      <main
        className="expert-case-main"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "30px 28px 60px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>

      {/* ================================================
          MOBILE PAGE STYLES
      ================================================ */}

      <style>{`

        .expert-case-header {
          position: relative;
        }

        @media (max-width: 700px) {

          .expert-case-header {
            height: 64px !important;
            padding: 0 14px !important;
          }

          .expert-case-header > div {
            gap: 9px !important;
          }

          .expert-case-header > div > div:first-child {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
            border-radius: 11px !important;
          }

          .expert-case-header > div > div:first-child svg {
            width: 20px;
            height: 20px;
          }

          .expert-case-header
            > div
            > div:last-child
            > div:first-child {
            font-size: 18px !important;
          }

          .expert-case-header
            > div
            > div:last-child
            > div:last-child {
            font-size: 9px !important;
          }

          .expert-case-main {
            padding:
              22px 14px 40px !important;
          }
        }

        @media (max-width: 390px) {

          .expert-case-header {
            padding: 0 10px !important;
          }

          .expert-case-header
            > div
            > div:last-child
            > div:first-child {
            font-size: 17px !important;
          }

          .expert-case-header
            > div
            > div:last-child
            > div:last-child {
            display: none !important;
          }

          .expert-case-main {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
        }

      `}</style>

    </div>
  );
}


/* =============================================================
   CARD
============================================================= */

function Card({ children }) {
  return (
    <section className="case-card">
      {children}
    </section>
  );
}


/* =============================================================
   INFO BOX
============================================================= */

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="info-box">

      <div className="info-box-label">
        {label}
      </div>

      <div className="info-box-value">
        {value}
      </div>

    </div>
  );
}


/* =============================================================
   DETAIL ROW
============================================================= */

function DetailRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="detail-row">

      <div className="detail-row-icon">
        <Icon
          size={14}
          color={COLORS.inkSoft}
        />
      </div>

      <div className="detail-row-content">

        <div className="detail-row-label">
          {label}
        </div>

        <div className="detail-row-value">
          {value}
        </div>

      </div>

    </div>
  );
}


/* =============================================================
   IPM SECTION
============================================================= */

function IPMSection({
  title,
  items,
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="ipm-section">

      <div className="ipm-title">
        {title}
      </div>

      <ul className="ipm-list">

        {items.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}

      </ul>

    </div>
  );
}


/* =============================================================
   CENTER
============================================================= */

const centerStyle = {
  minHeight: 400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: COLORS.inkSoft,
  fontSize: 13,
};


/* =============================================================
   BACK BUTTON
============================================================= */

const backButton = {
  border: `1px solid ${COLORS.line}`,
  background: COLORS.cream,
  color: COLORS.forest,
  borderRadius: 10,
  padding: "9px 12px",
  fontSize: 11.5,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
};