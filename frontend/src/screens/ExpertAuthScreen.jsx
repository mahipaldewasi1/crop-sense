import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  User,
  Lock,
  ArrowRight,
  GraduationCap,
  Building2,
  Award,
  Eye,
  EyeOff,
} from "lucide-react";

import { COLORS } from "../styles/theme";
import PrimaryButton from "../components/PrimaryButton";
import { loginExpert, registerExpert } from "../api/client";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";

export default function ExpertAuthScreen() {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [organization, setOrganization] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!phone || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (
      mode === "register" &&
      (!name ||
        !qualification ||
        !specialization ||
        !organization)
    ) {
      setError("Please fill all expert details.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const data = await loginExpert({
          phone,
          password,
        });

        setAuthUser(data.user, data.token);

        navigate("/expert/dashboard");
      } else {
        const data = await registerExpert({
          name,
          phone,
          password,
          qualification,
          specialization,
          organization,
        });

        /*
         * We intentionally do NOT log the expert in here.
         * Expert accounts need verification first.
         */

        setSuccess(
          data.message ||
            "Registration submitted successfully. Your account is awaiting verification."
        );

        setMode("login");

        setName("");
        setPhone("");
        setPassword("");
        setQualification("");
        setSpecialization("");
        setOrganization("");
      }
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.bg,
        padding: "24px 16px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .expert-input-row {
          transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }

        .expert-input-row:focus-within {
          border-color: ${COLORS.forest} !important;
          box-shadow: 0 0 0 3px rgba(31,58,46,0.12);
        }

        .expert-tab:hover:not([data-active="true"]) {
          color: ${COLORS.forest};
        }

        .expert-back:hover {
          color: ${COLORS.forest} !important;
        }

        .expert-link:hover {
          color: ${COLORS.forest} !important;
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 460,
        }}
        className="cs-animate-in"
      >
        {/* Main Card */}
        <div
          style={{
            background: COLORS.cream,
            borderRadius: 24,
            padding: "36px 28px",
            border: `1px solid ${COLORS.line}`,
            boxShadow:
              "0 20px 50px -20px rgba(21,40,31,0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <LanguageSwitcher />
          </div>

          {/* Logo */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: COLORS.forest,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <Leaf
              size={28}
              color={COLORS.amber}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 30,
              fontWeight: 600,
              color: COLORS.forest,
              margin: "0 0 4px",
            }}
          >
            CropSense
          </h1>

          <p
            style={{
              color: COLORS.inkSoft,
              fontSize: 14,
              margin: "0 0 6px",
            }}
          >
            Agricultural Expert Portal
          </p>

          <p
            style={{
              color: COLORS.inkSoft,
              fontSize: 12,
              margin: "0 0 24px",
              lineHeight: 1.5,
            }}
          >
            Help farmers make better crop health
            decisions through expert guidance.
          </p>

          {/* Login / Register Tabs */}
          <div
            style={{
              display: "flex",
              background: "#EAE7D9",
              borderRadius: 12,
              padding: 4,
              marginBottom: 22,
            }}
          >
            {["login", "register"].map((m) => (
              <button
                key={m}
                type="button"
                data-active={mode === m}
                className="expert-tab"
                onClick={() => {
                  setMode(m);
                  setError("");
                  setSuccess("");
                }}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  background:
                    mode === m
                      ? COLORS.cream
                      : "transparent",
                  color:
                    mode === m
                      ? COLORS.forest
                      : COLORS.inkSoft,
                  fontWeight: 600,
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  boxShadow:
                    mode === m
                      ? "0 1px 3px rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                {m === "login"
                  ? "Expert Login"
                  : "Register as Expert"}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Registration-only fields */}
            {mode === "register" && (
              <>
                <label style={labelStyle}>
                  Full Name
                </label>

                <div
                  className="expert-input-row"
                  style={inputRow}
                >
                  <User
                    size={16}
                    color={COLORS.inkSoft}
                  />

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Dr. / Expert Name"
                    style={inputBare}
                  />
                </div>

                <label style={labelStyle}>
                  Qualification
                </label>

                <div
                  className="expert-input-row"
                  style={inputRow}
                >
                  <GraduationCap
                    size={16}
                    color={COLORS.inkSoft}
                  />

                  <input
                    value={qualification}
                    onChange={(e) =>
                      setQualification(e.target.value)
                    }
                    placeholder="e.g. M.Sc. Agriculture"
                    style={inputBare}
                  />
                </div>

                <label style={labelStyle}>
                  Specialization
                </label>

                <div
                  className="expert-input-row"
                  style={inputRow}
                >
                  <Award
                    size={16}
                    color={COLORS.inkSoft}
                  />

                  <input
                    value={specialization}
                    onChange={(e) =>
                      setSpecialization(e.target.value)
                    }
                    placeholder="e.g. Plant Pathology"
                    style={inputBare}
                  />
                </div>

                <label style={labelStyle}>
                  Organization / Institution
                </label>

                <div
                  className="expert-input-row"
                  style={inputRow}
                >
                  <Building2
                    size={16}
                    color={COLORS.inkSoft}
                  />

                  <input
                    value={organization}
                    onChange={(e) =>
                      setOrganization(e.target.value)
                    }
                    placeholder="University / KVK / Organization"
                    style={inputBare}
                  />
                </div>
              </>
            )}

            {/* Phone */}
            <label style={labelStyle}>
              Mobile Number
            </label>

            <div
              className="expert-input-row"
              style={inputRow}
            >
              <User
                size={16}
                color={COLORS.inkSoft}
              />

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Mobile Number"
                style={inputBare}
              />
            </div>

            {/* Password */}
            <label style={labelStyle}>
              Password
            </label>

            <div
              className="expert-input-row"
              style={{
                ...inputRow,
                marginBottom: 16,
              }}
            >
              <Lock
                size={16}
                color={COLORS.inkSoft}
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                style={inputBare}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                style={passwordToggleStyle}
              >
                {showPassword ? (
                  <EyeOff size={17} color={COLORS.inkSoft} />
                ) : (
                  <Eye size={17} color={COLORS.inkSoft} />
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  color: COLORS.danger,
                  fontSize: 12.5,
                  margin: "0 0 12px",
                  padding: "10px 12px",
                  background: "#FDECEC",
                  borderRadius: 9,
                }}
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                style={{
                  color: "#2E6B3E",
                  fontSize: 12.5,
                  margin: "0 0 12px",
                  padding: "10px 12px",
                  background: "#E4EEDF",
                  borderRadius: 9,
                  lineHeight: 1.5,
                }}
              >
                {success}
              </div>
            )}

            <PrimaryButton
              type="submit"
              icon={ArrowRight}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Expert Login"
                : "Submit Registration"}
            </PrimaryButton>
          </form>

          {/* Back to Farmer Login */}
          <button
            type="button"
            className="expert-back"
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              marginTop: 18,
              padding: 0,
              border: "none",
              background: "transparent",
              color: COLORS.inkSoft,
              cursor: "pointer",
              fontSize: 12.5,
            }}
          >
            ← Back to Farmer Login
          </button>
        </div>

        {/* Verification note */}
        {mode === "register" && (
          <p
            style={{
              textAlign: "center",
              marginTop: 14,
              color: COLORS.inkSoft,
              fontSize: 11.5,
              lineHeight: 1.5,
            }}
          >
            Expert accounts are verified before
            they can respond to farmer cases.
          </p>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: COLORS.inkSoft,
  marginBottom: 6,
};

const inputRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: COLORS.cream,
  border: `1px solid ${COLORS.line}`,
  borderRadius: 12,
  padding: "13px 14px",
  marginBottom: 14,
};

const inputBare = {
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  flex: 1,
  fontFamily: "'Inter', sans-serif",
  width: "100%",
  color: COLORS.ink,
};

const passwordToggleStyle = {
  border: "none",
  background: "transparent",
  padding: 2,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
};
