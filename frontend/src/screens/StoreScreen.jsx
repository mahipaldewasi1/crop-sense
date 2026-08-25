import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Store, MapPin, Clock, Phone } from "lucide-react";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import { useAuth } from "../context/AuthContext";
import { getNearbyStores } from "../api/client";

export default function StoreScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lat = user?.location?.lat || 26.6;
    const lng = user?.location?.lng || 74.86;
    getNearbyStores(lat, lng)
      .then((data) => setStores(data.stores || []))
      .catch(() => setStores([]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar title="Nearby Stores" onBack={() => navigate("/result")} />
      <div style={{
        margin: "0 20px 14px", borderRadius: 14, height: 110,
        background: "repeating-linear-gradient(45deg, #E4E1D3, #E4E1D3 10px, #DAD7C8 10px, #DAD7C8 20px)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <Navigation size={22} color={COLORS.forest} style={{ position: "absolute", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }} />
        <span style={{ position: "absolute", bottom: 8, right: 10, fontSize: 10, color: COLORS.inkSoft, background: "rgba(255,255,255,0.8)", padding: "2px 6px", borderRadius: 6 }}>
          map preview
        </span>
      </div>

      <div style={{ flex: 1, padding: "0 20px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {loading && <p style={{ fontSize: 13, color: COLORS.inkSoft }}>Loading nearby stores...</p>}

        {!loading && stores.map((s, i) => (
          <div key={i} style={{ background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: "#EFEDE0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Store size={19} color={COLORS.forest} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{s.name}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: COLORS.inkSoft }}>{s.addr}</p>
              <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: COLORS.leaf, fontWeight: 600 }}>
                  <MapPin size={11} /> {s.distanceKm} km
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: COLORS.inkSoft }}>
                  <Clock size={11} /> ~{Math.max(3, Math.round(s.distanceKm * 4))} min
                </span>
              </div>
            </div>
            <a href={`tel:${s.phone}`} style={{
              width: 36, height: 36, borderRadius: 10, background: COLORS.forest,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, textDecoration: "none",
            }}>
              <Phone size={15} color={COLORS.amber} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
