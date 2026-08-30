import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Store, MapPin, Clock, Phone } from "lucide-react";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getNearbyStores } from "../api/client";

export default function StoreScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const lat = user?.location?.lat || 26.6;
  const lng = user?.location?.lng || 74.86;

  useEffect(() => {
    getNearbyStores(lat, lng)
      .then((data) => setStores(data.stores || []))
      .catch(() => setStores([]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <>
      <style>{`
        .cs-store-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 700px) {
          .cs-store-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .cs-store-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .cs-store-card {
          transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
        }
        .cs-store-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -16px rgba(21,40,31,0.28);
          border-color: ${COLORS.leaf} !important;
        }
        .cs-call-btn { transition: transform 0.16s ease, filter 0.16s ease; }
        .cs-call-btn:hover { transform: scale(1.08); filter: brightness(1.08); }
        .cs-store-skeleton {
          border-radius: 14px; height: 84px; background: linear-gradient(90deg, #EFEDE0 25%, #E4E1D3 37%, #EFEDE0 63%);
          background-size: 400% 100%; animation: cs-shimmer 1.4s ease infinite;
        }
        @keyframes cs-shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
      `}</style>
      <div className="cs-animate-in" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 40px" }}>
        <TopBar title={t("nearbyStores")} onBack={() => navigate("/result")} />

        <div style={{
          borderRadius: 14, height: 220, marginBottom: 18, overflow: "hidden",
          border: `1px solid ${COLORS.line}`,
        }}>
          <MapContainer center={[lat, lng]} zoom={12} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CircleMarker center={[lat, lng]} radius={8} pathOptions={{ color: COLORS.forest, fillColor: COLORS.amber, fillOpacity: 1 }}>
              <Popup>Your location</Popup>
            </CircleMarker>
            {stores.map((s, i) => (
              s.lat && s.lng ? (
                <CircleMarker
                  key={i}
                  center={[s.lat, s.lng]}
                  radius={hoveredIdx === i ? 11 : 8}
                  pathOptions={{ color: COLORS.forestDeep, fillColor: COLORS.leaf, fillOpacity: 0.85, weight: 2 }}
                >
                  <Popup>
                    <strong>{s.name}</strong><br />{s.addr}
                  </Popup>
                </CircleMarker>
              ) : null
            ))}
          </MapContainer>
        </div>

        {loading && (
          <div className="cs-store-grid">
            {[0, 1, 2].map((i) => <div key={i} className="cs-store-skeleton" />)}
          </div>
        )}

        <div className="cs-store-grid">
          {!loading && stores.map((s, i) => (
            <div
              key={i}
              className="cs-store-card"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ background: COLORS.cream, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "center" }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "#EFEDE0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Store size={19} color={COLORS.forest} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: COLORS.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: COLORS.inkSoft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.addr}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: COLORS.leaf, fontWeight: 600 }}>
                    <MapPin size={11} /> {s.distanceKm} km
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: COLORS.inkSoft }}>
                    <Clock size={11} /> ~{Math.max(3, Math.round(s.distanceKm * 4))} {t("min")}
                  </span>
                </div>
              </div>
              <a href={`tel:${s.phone}`} aria-label={t("call")} className="cs-call-btn" style={{
                width: 36, height: 36, borderRadius: 10, background: COLORS.forest,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, textDecoration: "none",
              }}>
                <Phone size={15} color={COLORS.amber} />
              </a>
            </div>
          ))}
          {!loading && stores.length === 0 && (
            <p style={{ fontSize: 13, color: COLORS.inkSoft, gridColumn: "1 / -1" }}>No nearby stores found.</p>
          )}
        </div>
      </div>
    </>
  );
}