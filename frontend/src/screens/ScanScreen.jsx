import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Camera, Image as ImageIcon, RotateCcw } from "lucide-react";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import { uploadScan } from "../api/client";
import { useLanguage } from "../i18n/LanguageContext";

// Add new crops here — id is what's sent to the backend, key looks up the
// display name in translations.js. Chips wrap to a new row automatically,
// so this list can grow without touching the layout again.
const CROPS = [
  { id: "tomato", key: "cropTomato" },
  { id: "potato", key: "cropPotato" },
  { id: "maize", key: "cropMaize" },
];

export default function ScanScreen() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("tomato");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setError("");
    setLoading(true);

    try {
      const data = await uploadScan(file, lang, selectedCrop);
      navigate("/result", {
        state: {
          scan: data.scan,
          uncertain: data.uncertain || false,
          message: data.message || "",
          crop: data.crop || selectedCrop,
          disease: data.disease || "",
          confidence: data.confidence ?? null,
          topPredictions: data.topPredictions || [],
        },
      });
    } catch (err) {
      setError(err.message || "Scan failed, try again");
    } finally {
      setLoading(false);
    }
  }

  function retake() {
    setPreview(null);
    setError("");
  }

  return (
    <div className="cs-animate-in" style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 40px" }}>
      <TopBar title={t("scan")} onBack={() => navigate("/home")} />

      {/* Crop selector — chip toggle, matching the login/register tab pattern already used in LoginScreen */}
      <div style={{ marginBottom: 18 }}>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.6,
            color: COLORS.inkSoft,
          }}
        >
          {t("selectCrop").toUpperCase()}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CROPS.map((crop) => {
            const active = selectedCrop === crop.id;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => setSelectedCrop(crop.id)}
                disabled={loading}
                style={{
                  flex: "0 1 auto",
                  minWidth: 96,
                  padding: "11px 18px",
                  borderRadius: 12,
                  border: `1.5px solid ${active ? COLORS.forest : COLORS.line}`,
                  background: active ? COLORS.forest : COLORS.cream,
                  color: active ? "#fff" : COLORS.inkSoft,
                  fontWeight: 600,
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "background 150ms ease, border-color 150ms ease",
                }}
              >
                {t(crop.key)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image preview */}
      <div
        style={{
          borderRadius: 22,
          background: preview
            ? `url(${preview}) center/cover`
            : `linear-gradient(160deg, ${COLORS.forestDeep}, ${COLORS.forest})`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: 16,
          minHeight: 340,
        }}
      >
        {!preview && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 24,
                border: `2px dashed rgba(224,148,44,0.5)`,
                borderRadius: 16,
              }}
            />
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <Leaf size={64} color="rgba(255,255,255,0.35)" />
              <p style={{ color: "#D8DECB", fontSize: 12.5, marginTop: 10 }}>{t("frameHint")}</p>
            </div>
          </>
        )}

        {preview && !loading && (
          <button
            onClick={retake}
            type="button"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 13px",
              borderRadius: 10,
              border: "none",
              background: "rgba(21,40,31,0.65)",
              backdropFilter: "blur(4px)",
              color: "#fff",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} /> {t("retake")}
          </button>
        )}

        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(21,40,31,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>🔎 {t("detecting")}</p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            color: COLORS.danger,
            fontSize: 12.5,
            marginBottom: 14,
            background: "#FBEAE4",
            border: "1px solid #F0C7B7",
            borderRadius: 10,
            padding: "9px 12px",
          }}
        >
          {error}
        </p>
      )}

      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      {/* Scan buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <PrimaryButton
          onClick={() => cameraInputRef.current?.click()}
          icon={Camera}
          style={{ flex: "1 1 200px" }}
          disabled={loading}
        >
          {t("takePhoto")}
        </PrimaryButton>

        <button
          onClick={() => galleryInputRef.current?.click()}
          disabled={loading}
          style={{
            flex: "1 1 200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "15px 10px",
            borderRadius: 16,
            border: `1.5px solid ${COLORS.forest}`,
            background: "transparent",
            color: COLORS.forest,
            fontWeight: 600,
            fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          <ImageIcon size={17} />
          {t("gallery")}
        </button>
      </div>

      {/* Hint */}
      <p style={{ textAlign: "center", fontSize: 11.5, color: COLORS.inkSoft }}>💡 {t("lightHint")}</p>
    </div>
  );
}