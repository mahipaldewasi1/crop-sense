import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Camera, Image as ImageIcon } from "lucide-react";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import { uploadScan } from "../api/client";
import { useLanguage } from "../i18n/LanguageContext";

export default function ScanScreen() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setError("");
    setLoading(true);

    try {
      const data = await uploadScan(file, lang);
      navigate("/result", { state: { scan: data.scan } });
    } catch (err) {
      setError(err.message || "Scan failed, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 40px" }}>
      <TopBar title={t("scan")} onBack={() => navigate("/home")} />

      <div style={{
        borderRadius: 22,
        background: preview ? `url(${preview}) center/cover` : `linear-gradient(160deg, ${COLORS.forestDeep}, ${COLORS.forest})`,
        position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", marginBottom: 20, minHeight: 340,
      }}>
        {!preview && (
          <>
            <div style={{ position: "absolute", inset: 24, border: "2px dashed rgba(224,148,44,0.5)", borderRadius: 16 }} />
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <Leaf size={64} color="rgba(255,255,255,0.35)" />
              <p style={{ color: "#D8DECB", fontSize: 12.5, marginTop: 10 }}>{t("frameHint")}</p>
            </div>
          </>
        )}
        {loading && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(21,40,31,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>🔎 {t("detecting")}</p>
          </div>
        )}
      </div>

      {error && <p style={{ color: COLORS.danger, fontSize: 12.5, marginBottom: 10 }}>{error}</p>}

      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: "none" }} />
      <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <PrimaryButton onClick={() => cameraInputRef.current?.click()} icon={Camera} style={{ flex: "1 1 200px" }} disabled={loading}>
          {t("takePhoto")}
        </PrimaryButton>
        <button onClick={() => galleryInputRef.current?.click()} disabled={loading} style={{
          flex: "1 1 200px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "15px 10px", borderRadius: 16, border: `1.5px solid ${COLORS.forest}`,
          background: "transparent", color: COLORS.forest, fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>
          <ImageIcon size={17} /> {t("gallery")}
        </button>
      </div>
      <p style={{ textAlign: "center", fontSize: 11.5, color: COLORS.inkSoft }}>
        💡 {t("lightHint")}
      </p>
    </div>
  );
}
