import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, User, Lock, ArrowRight, MapPin } from "lucide-react";
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
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocation({ lat: 26.6, lng: 74.86, label: "Kishangarh, Rajasthan" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "Current location" }),
      () => setLocation({ lat: 26.6, lng: 74.86, label: "Kishangarh, Rajasthan" })
    );
  }

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
      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 18 }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => changeLang(l.code)} style={{
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
              <button key={m} type="button" onClick={() => { setMode(m); setError(""); }} style={{
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
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ramesh Kumar" style={inputStyle} />
              </>
            )}

            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>{t("mobileNumber")}</label>
            <div style={inputRow}>
              <User size={16} color={COLORS.inkSoft} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" style={inputBare} />
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>{t("password")}</label>
            <div style={{ ...inputRow, marginBottom: 16 }}>
              <Lock size={16} color={COLORS.inkSoft} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputBare} />
            </div>

            {error && <p style={{ color: COLORS.danger, fontSize: 12.5, margin: "0 0 12px" }}>{error}</p>}

            <PrimaryButton type="submit" icon={ArrowRight} disabled={loading}>
              {loading ? t("pleaseWait") : mode === "login" ? t("login") : t("createAccount")}
            </PrimaryButton>
          </form>

          <button onClick={detectLocation} type="button" style={{
            marginTop: 20, display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
            padding: "12px 14px", background: location ? "#E4EEDF" : "#EFEDE0", borderRadius: 12,
            border: "none", textAlign: "left", width: "100%",
          }}>
            <MapPin size={16} color={COLORS.leaf} />
            <span style={{ fontSize: 12.5, color: COLORS.inkSoft }}>
              {location ? `📍 ${location.label}` : t("detectLocation")}
            </span>
          </button>
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
