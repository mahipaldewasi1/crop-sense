import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Camera, MapPin, ScanLine, User } from "lucide-react";
import { COLORS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import { getScanHistory } from "../api/client";

const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };

export default function HomeScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScanHistory()
      .then((data) => setRecent(data.scans || []))
      .catch(() => setRecent([])) // MVP: fail silently, empty state handles it
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>Namaste,</p>
          <h1 style={{ margin: "2px 0 0", fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, color: COLORS.forest }}>
            {user?.name || "Farmer"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            <MapPin size={13} color={COLORS.leaf} />
            <span style={{ fontSize: 12.5, color: COLORS.inkSoft }}>{user?.location?.label || "Location not set"}</span>
          </div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: COLORS.forest, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={19} color={COLORS.amber} />
        </div>
      </div>

      <button onClick={() => navigate("/scan")} style={{
        background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestDeep})`,
        borderRadius: 22, padding: "26px 22px", border: "none", cursor: "pointer",
        textAlign: "left", marginBottom: 24, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -10, top: -10, opacity: 0.15 }}><Leaf size={110} color="#fff" /></div>
        <ScanLine size={26} color={COLORS.amber} />
        <p style={{ color: "#fff", fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, margin: "12px 0 4px" }}>
          Scan Your Crop
        </p>
        <p style={{ color: "#D8DECB", fontSize: 12.5, margin: "0 0 14px", maxWidth: 220 }}>
          Photo lein aur turant disease, severity aur ilaaj jaanein
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.amber, padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, color: COLORS.forestDeep }}>
          <Camera size={15} /> Start Scan
        </div>
      </button>

      <p style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.inkSoft, letterSpacing: 0.5, margin: "0 0 10px" }}>
        RECENT SCANS
      </p>

      {loading && <p style={{ fontSize: 13, color: COLORS.inkSoft }}>Loading...</p>}

      {!loading && recent.length === 0 && (
        <div style={{ background: COLORS.cream, border: `1px dashed ${COLORS.line}`, borderRadius: 14, padding: 18, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 13, color: COLORS.inkSoft }}>Abhi koi scan nahi hua. Pehla scan karke shuru karein.</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {recent.map((r) => (
          <div key={r._id} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EFEDE0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={18} color={COLORS.leaf} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: COLORS.ink }}>{r.crop} — {r.disease}</p>
              <p style={{ margin: 0, fontSize: 11.5, color: COLORS.inkSoft }}>{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 20, color: "#fff", background: SEVERITY_COLOR[r.severity] }}>
              {r.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
