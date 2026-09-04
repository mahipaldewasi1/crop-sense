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
  Activity,
  ShieldCheck,
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

  const [caseData, setCaseData] =
    useState(null);

  const [advice, setAdvice] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    async function loadCase() {
      try {
        setLoading(true);

        const data =
          await getExpertCase(scanId);

        setCaseData(data.case);

        setAdvice(
          data.case?.expertReview?.advice ||
            ""
        );
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Could not load this case."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCase();
  }, [scanId]);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!advice.trim()) {
      setError(
        "Please enter expert advice before submitting."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const data =
        await submitExpertReview(
          scanId,
          advice
        );

      setCaseData(data.case);

      setSuccess(
        "Expert review submitted successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Could not submit the review."
      );
    } finally {
      setSubmitting(false);
    }
  }


  if (loading) {
    return (
      <Page>
        <div style={centerStyle}>
          Loading case...
        </div>
      </Page>
    );
  }


  if (error && !caseData) {
    return (
      <Page>
        <div style={centerStyle}>
          <div
            style={{
              color: COLORS.danger,
              marginBottom: 16,
            }}
          >
            {error}
          </div>

          <button
            onClick={() =>
              navigate(
                "/expert/dashboard"
              )
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


  const reviewed =
    caseData?.expertReview?.status ===
    "reviewed";


  return (
    <Page>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: 16,
          marginBottom: 26,
        }}
      >

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() =>
              navigate(
                "/expert/dashboard"
              )
            }
          style={backButton}
        >
          <ArrowLeft size={16} />
            Back to Cases
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LanguageSwitcher />

        {reviewed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "#E4EEDF",
              color: "#2E6B3E",
              padding:
                "9px 13px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <CheckCircle2 size={15} />
            Reviewed
          </div>
          )}
        </div>

      </div>


      {/* TITLE */}

      <div
        style={{
          marginBottom: 24,
        }}
      >

        <div
          style={{
            color: COLORS.leaf,
            fontSize: 11,
            fontWeight: 700,
            textTransform:
              "uppercase",
            letterSpacing: 0.8,
            marginBottom: 6,
          }}
        >
          Farmer Case Review
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily:
              "'Fraunces', serif",
            color: COLORS.forest,
            fontSize: 32,
          }}
        >
          {caseData?.crop} ·{" "}
          {caseData?.disease}
        </h1>

        <p
          style={{
            margin:
              "7px 0 0",
            color: COLORS.inkSoft,
            fontSize: 13,
          }}
        >
          Review the AI diagnosis and
          provide professional guidance
          to the farmer.
        </p>

      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) 340px",
          gap: 20,
          alignItems:
            "start",
        }}
      >

        {/* LEFT */}

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 18,
          }}
        >

          {/* IMAGE */}

          <Card>

            <h2 style={headingStyle}>
              Crop Image
            </h2>

            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                background:
                  "#F0EEE4",
                minHeight: 300,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              {caseData?.imageUrl ? (
<img
  src={getMediaUrl(caseData.imageUrl)}
  alt="Farmer crop"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 14,
  }}
/>
              ) : (
                <div
                  style={{
                    color:
                      COLORS.inkSoft,
                    fontSize: 13,
                  }}
                >
                  Image unavailable
                </div>
              )}
            </div>

          </Card>


          {/* AI DIAGNOSIS */}

          <Card>

            <h2 style={headingStyle}>
              AI Diagnosis
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: 12,
              }}
            >

              <InfoBox
                label="Disease"
                value={
                  caseData?.disease
                }
              />

              <InfoBox
                label="Severity"
                value={
                  `${caseData?.severityPercent}%`
                }
              />

              <InfoBox
                label="Confidence"
                value={
                  `${caseData?.confidence}%`
                }
              />

            </div>


            <div
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems:
                  "center",
                gap: 7,
                padding:
                  "7px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                ...severityStyle[
                  caseData?.severity
                ],
              }}
            >
              <AlertTriangle size={13} />
              {caseData?.severity} severity
            </div>

          </Card>


          {/* AI RECOMMENDATION */}

          <Card>

            <h2 style={headingStyle}>
              AI Recommendation
            </h2>

            <p
              style={{
                margin: 0,
                color: COLORS.ink,
                fontSize: 13,
                lineHeight: 1.65,
              }}
            >
              {caseData?.recommendation ||
                "No recommendation available."}
            </p>

          </Card>


          {/* IPM */}

          <Card>

            <h2 style={headingStyle}>
              Integrated Pest Management
            </h2>

            <IPMSection
              title="Monitoring"
              items={
                caseData?.ipm
                  ?.monitoring
              }
            />

            <IPMSection
              title="Cultural Practices"
              items={
                caseData?.ipm
                  ?.cultural
              }
            />

            <IPMSection
              title="Biological"
              items={
                caseData?.ipm
                  ?.biological
              }
            />

            <IPMSection
              title="Chemical"
              items={
                caseData?.ipm
                  ?.chemical
              }
            />

            <IPMSection
              title="Safety"
              items={
                caseData?.ipm
                  ?.safety
              }
            />

          </Card>

        </div>


        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 18,
          }}
        >

          {/* FARMER */}

          <Card>

            <h2 style={headingStyle}>
              Farmer Information
            </h2>

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 11,
                marginBottom: 15,
              }}
            >

              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius:
                    "50%",
                  background:
                    "#DDE8DC",
                  color:
                    COLORS.forest,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  fontWeight: 700,
                }}
              >
                {(
                  caseData?.farmer
                    ?.name ||
                  "F"
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong
                  style={{
                    display:
                      "block",
                    color:
                      COLORS.forest,
                    fontSize: 14,
                  }}
                >
                  {
                    caseData?.farmer
                      ?.name
                  }
                </strong>

                <span
                  style={{
                    fontSize: 11,
                    color:
                      COLORS.inkSoft,
                  }}
                >
                  Farmer
                </span>
              </div>

            </div>


            <DetailRow
              icon={User}
              label="Phone"
              value={
                caseData?.farmer
                  ?.phone ||
                "Unavailable"
              }
            />

            <DetailRow
              icon={MapPin}
              label="Location"
              value={
                caseData?.farmer
                  ?.location
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


          {/* EXPERT REVIEW */}

          <Card>

            <h2 style={headingStyle}>
              Expert Guidance
            </h2>

            <p
              style={{
                margin:
                  "0 0 12px",
                color:
                  COLORS.inkSoft,
                fontSize: 11.5,
                lineHeight: 1.5,
              }}
            >
              Add your professional
              assessment and practical
              guidance for the farmer.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <textarea
                value={advice}
                onChange={(e) =>
                  setAdvice(
                    e.target.value
                  )
                }
                placeholder="Write your expert advice..."
                rows={8}
                style={{
                  width: "100%",
                  boxSizing:
                    "border-box",
                  resize:
                    "vertical",
                  border:
                    `1px solid ${COLORS.line}`,
                  borderRadius: 12,
                  padding: 12,
                  fontFamily:
                    "'Inter', sans-serif",
                  fontSize: 13,
                  outline: "none",
                  background:
                    "#fff",
                  color:
                    COLORS.ink,
                }}
              />

              {error && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 9,
                    background:
                      "#FDECEC",
                    color:
                      COLORS.danger,
                    fontSize: 11.5,
                  }}
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 9,
                    background:
                      "#E4EEDF",
                    color:
                      "#2E6B3E",
                    fontSize: 11.5,
                  }}
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  submitting
                }
                style={{
                  width: "100%",
                  marginTop: 12,
                  border: "none",
                  borderRadius: 10,
                  padding:
                    "11px 14px",
                  background:
                    COLORS.forest,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor:
                    submitting
                      ? "default"
                      : "pointer",
                  opacity:
                    submitting
                      ? 0.7
                      : 1,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  gap: 7,
                }}
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

    </Page>
  );
}


// ==========================================
// PAGE
// ==========================================

function Page({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily:
          "'Inter', sans-serif",
        color: COLORS.ink,
      }}
    >

      <header
        style={{
          height: 72,
          background:
            COLORS.cream,
          borderBottom:
            `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems:
            "center",
          padding:
            "0 34px",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: 12,
          }}
        >

          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background:
                COLORS.forest,
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
            }}
          >
            <Leaf
              size={22}
              color={
                COLORS.amber
              }
            />
          </div>

          <div>
            <div
              style={{
                fontFamily:
                  "'Fraunces', serif",
                fontSize: 21,
                fontWeight: 600,
                color:
                  COLORS.forest,
              }}
            >
              FasalSaathi
            </div>

            <div
              style={{
                fontSize: 10,
                color:
                  COLORS.inkSoft,
                marginTop: -2,
              }}
            >
              Expert Portal
            </div>
          </div>

        </div>

      </header>


      <main
        style={{
          maxWidth: 1200,
          margin:
            "0 auto",
          padding:
            "30px 28px 60px",
        }}
      >
        {children}
      </main>

    </div>
  );
}


// ==========================================
// CARD
// ==========================================

function Card({ children }) {
  return (
    <section
      style={{
        background:
          COLORS.cream,
        border:
          `1px solid ${COLORS.line}`,
        borderRadius: 18,
        padding: 20,
        boxShadow:
          "0 12px 30px -22px rgba(21,40,31,0.18)",
      }}
    >
      {children}
    </section>
  );
}


// ==========================================
// INFO BOX
// ==========================================

function InfoBox({
  label,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#F0EEE4",
        borderRadius: 11,
        padding: 12,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color:
            COLORS.inkSoft,
          marginBottom: 4,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color:
            COLORS.forest,
        }}
      >
        {value}
      </div>
    </div>
  );
}


// ==========================================
// DETAIL ROW
// ==========================================

function DetailRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 9,
        padding:
          "10px 0",
        borderTop:
          `1px solid ${COLORS.line}`,
      }}
    >
      <Icon
        size={14}
        color={
          COLORS.inkSoft
        }
      />

      <div
        style={{
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: 9.5,
            color:
              COLORS.inkSoft,
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: 2,
            fontSize: 11.5,
            color:
              COLORS.ink,
            wordBreak:
              "break-word",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// IPM SECTION
// ==========================================

function IPMSection({
  title,
  items,
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 14,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color:
            COLORS.forest,
          marginBottom: 6,
        }}
      >
        {title}
      </div>

      <ul
        style={{
          margin:
            "0 0 0 18px",
          padding: 0,
          color:
            COLORS.inkSoft,
          fontSize: 11.5,
          lineHeight: 1.55,
        }}
      >
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


// ==========================================
// HEADING
// ==========================================

const headingStyle = {
  margin:
    "0 0 14px",
  fontFamily:
    "'Fraunces', serif",
  color:
    COLORS.forest,
  fontSize: 19,
};


// ==========================================
// BACK BUTTON
// ==========================================

const backButton = {
  border:
    `1px solid ${COLORS.line}`,
  background:
    COLORS.cream,
  color:
    COLORS.forest,
  borderRadius: 10,
  padding:
    "9px 12px",
  fontSize: 11.5,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems:
    "center",
  gap: 6,
};


// ==========================================
// CENTER
// ==========================================

const centerStyle = {
  minHeight: 400,
  display: "flex",
  alignItems:
    "center",
  justifyContent:
    "center",
  flexDirection:
    "column",
  color:
    COLORS.inkSoft,
  fontSize: 13,
};