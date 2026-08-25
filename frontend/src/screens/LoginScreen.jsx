import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, User, Lock, ArrowRight, MapPin } from "lucide-react";
import { COLORS } from "../styles/theme";
import PrimaryButton from "../components/PrimaryButton";
import { loginUser, registerUser } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
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
      () => setLocation({ lat: 26.6, lng: 74.86, label: "Kishangarh, Rajasthan" }) // fallback for demo
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
    <div style={{ padding: "36px 26px", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: COLORS.forest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Leaf size={28} color={COLORS.amber} />
      </div>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: COLORS.forest, margin: "0 0 4px" }}>
        CropSense
      </h1>
      <p style={{ color: COLORS.inkSoft, fontSize: 14, margin: "0 0 24px" }}>
        Fasal ki bimari turant pehchano, sahi ilaaj paayein.
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
            {m === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        {mode === "register" && (
          <>
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>NAME</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ramesh Kumar" style={inputStyle} />
          </>
        )}

        <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>MOBILE NUMBER</label>
        <div style={{ ...inputRow }}>
          <User size={16} color={COLORS.inkSoft} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" style={inputBare} />
        </div>

        <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 6 }}>PASSWORD</label>
        <div style={{ ...inputRow, marginBottom: 16 }}>
          <Lock size={16} color={COLORS.inkSoft} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputBare} />
        </div>

        {error && <p style={{ color: COLORS.danger, fontSize: 12.5, margin: "0 0 12px" }}>{error}</p>}

        <PrimaryButton type="submit" icon={ArrowRight} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </PrimaryButton>
      </form>

      <button onClick={detectLocation} type="button" style={{
        marginTop: "auto", display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
        padding: "12px 14px", background: location ? "#E4EEDF" : "#EFEDE0", borderRadius: 12,
        border: "none", textAlign: "left",
      }}>
        <MapPin size={16} color={COLORS.leaf} />
        <span style={{ fontSize: 12.5, color: COLORS.inkSoft }}>
          {location ? `📍 ${location.label}` : "Tap to detect location"}
        </span>
      </button>
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
const inputBare = { border: "none", outline: "none", background: "transparent", fontSize: 14, flex: 1, fontFamily: "'Inter', sans-serif" };
