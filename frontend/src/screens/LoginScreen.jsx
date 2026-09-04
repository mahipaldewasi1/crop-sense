import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, User, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { COLORS } from "../styles/theme";
import PrimaryButton from "../components/PrimaryButton";
import { loginUser, registerUser } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

export default function LoginScreen() {
  const { t, lang, changeLang } = useLanguage();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!phone || !password || (mode === "register" && !name)) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await loginUser({ phone, password })
          : await registerUser({ name, phone, password, location });

      setAuthUser(data.user, data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", width: "100%", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: COLORS.bg, padding: "24px 16px", fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        .cs-input-row { transition: border-color 0.16s ease, box-shadow 0.16s ease; }
        .cs-input-row:focus-within {
          border-color: ${COLORS.forest} !important;
          box-shadow: 0 0 0 3px rgba(31,58,46,0.12);
        }
        .cs-lang-btn:hover { border-color: ${COLORS.forest}; }
        .cs-tab-btn:hover:not([data-active="true"]) { color: ${COLORS.forest}; }
        .cs-location-btn:hover { filter: brightness(0.97); }
        .cs-plain-input:focus {
          border-color: ${COLORS.forest} !important;
          box-shadow: 0 0 0 3px rgba(31,58,46,0.12);
        }
      `}</style>
      <div style={{ width: "100%", maxWidth: 420 }} className="cs-animate-in">

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 18 }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => changeLang(l.code)} className="cs-lang-btn" style={{
              padding: "5px 12px", borderRadius: 20, border: `1px solid ${COLORS.line}`, cursor: "pointer",
              fontSize: 12, fontWeight: 600,
              background: lang === l.code ? COLORS.forest : COLORS.cream,
              color: lang === l.code ? "#fff" : COLORS.inkSoft,
            }}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{
          background: COLORS.cream, borderRadius: 24, padding: "36px 28px",
          border: `1px solid ${COLORS.line}`, boxShadow: "0 20px 50px -20px rgba(21,40,31,0.15)",
        }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: COLORS.forest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
            <Leaf size={28} color={COLORS.amber} />
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: COLORS.forest, margin: "0 0 4px" }}>
            {t("appName")}
          </h1>
          <p style={{ color: COLORS.inkSoft, fontSize: 14, margin: "0 0 24px" }}>
            {t("tagline")}
          </p>

          <div style={{ display: "flex", background: "#EAE7D9", borderRadius: 12, padding: 4, marginBottom: 20 }}>
            {["login", "register"].map((m) => (
              <button key={m} type="button" data-active={mode === m} className="cs-tab-btn" onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer",
                background: mode === m ? COLORS.cream : "transparent",
                color: mode === m ? COLORS.forest : COLORS.inkSoft,
                fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif",
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}>
                {m === "login" ? t("login") : t("register")}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            {mode === "register" && (
              <>
                <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>{t("name")}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="cs-plain-input" style={inputStyle} />
              </>
            )}

            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>{t("mobileNumber")}</label>
            <div className="cs-input-row" style={inputRow}>
              <User size={16} color={COLORS.inkSoft} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile Number" style={inputBare} />
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>{t("password")}</label>
            <div className="cs-input-row" style={{ ...inputRow, marginBottom: 16 }}>
              <Lock size={16} color={COLORS.inkSoft} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {error && <p style={{ color: COLORS.danger, fontSize: 12.5, margin: "0 0 12px" }}>{error}</p>}

            <PrimaryButton type="submit" icon={ArrowRight} disabled={loading}>
              {loading ? t("pleaseWait") : mode === "login" ? t("login") : t("createAccount")}
            </PrimaryButton>
            <div
  style={{
    marginTop: 18,
    textAlign: "center",
  }}
>
  <button
    type="button"
    onClick={() => navigate("/expert")}
    style={{
      border: "none",
      background: "transparent",
      color: COLORS.forest,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
    }}
  >
    Expert Portal →
  </button>
</div>
          </form>


        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 12,
  padding: "13px 14px", marginBottom: 14, fontSize: 14, fontFamily: "'Inter', sans-serif", color: COLORS.ink,
};
const inputRow = {
  display: "flex", alignItems: "center", gap: 8, background: COLORS.cream,
  border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "13px 14px", marginBottom: 14,
};
const inputBare = { border: "none", outline: "none", background: "transparent", fontSize: 14, flex: 1, fontFamily: "'Inter', sans-serif", width: "100%" };
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