import React, { useEffect, useRef, useState } from "react";
import {
  Leaf,
  Camera,
  Clock3,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Minus,
  Calendar,
  User,
  Award,
  Building2,
  Sprout,
  AlertTriangle,
} from "lucide-react";
import { getFollowUps, uploadFollowUpScan } from "../api/client";
import { COLORS } from "../styles/theme";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";

// Same Low/Medium/High mapping ResultScreen uses, so a case reads the same
// way here as it did right after the original scan.
const SEVERITY_COLOR = { Low: COLORS.ok, Medium: COLORS.amberDeep, High: COLORS.danger };

const TREND_COLOR = { improving: COLORS.ok, worsening: COLORS.danger, stable: COLORS.amberDeep };
const TREND_LABEL = { improving: "Improving", worsening: "Needs attention", stable: "Holding steady" };
const TREND_ICON = { improving: TrendingDown, worsening: TrendingUp, stable: Minus };

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function getComparison(item) {
  if (!item.followUp?.scans || item.followUp.scans.length === 0) return null;
  const latest = item.followUp.scans[item.followUp.scans.length - 1];
  const change = latest.severityPercent - item.severityPercent;
  let status = "stable";
  if (change <= -10) status = "improving";
  else if (change >= 10) status = "worsening";
  return { latest, change, status };
}

// Same card shell as ResultScreen: a thin left accent bar carries the
// semantic meaning instead of tinting the whole card.
function Card({ accentColor, children, style }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        background: COLORS.cream,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 16,
        padding: 18,
        ...style,
      }}
    >
      {accentColor && <div style={{ width: 3, borderRadius: 3, background: accentColor, flexShrink: 0 }} />}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

function SectionLabel({ icon, children, color = COLORS.inkSoft }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, color }}>{children}</span>
    </div>
  );
}

function SeverityTrack({ initial, latest, color }) {
  const left = Math.min(initial, latest);
  const width = Math.max(Math.abs(latest - initial), 1.5);
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ position: "relative", height: 6, borderRadius: 999, background: "#E9E5D6" }}>
        <div style={{ position: "absolute", height: 6, borderRadius: 999, left: `${left}%`, width: `${width}%`, background: color }} />
        <div style={{ position: "absolute", top: "50%", left: `${initial}%`, width: 11, height: 11, borderRadius: "50%", background: "#A8A296", border: `2px solid ${COLORS.cream}`, transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", top: "50%", left: `${latest}%`, width: 11, height: 11, borderRadius: "50%", background: color, border: `2px solid ${COLORS.cream}`, transform: "translate(-50%,-50%)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: COLORS.inkSoft }}>
        <span>{initial}% FIRST SCAN</span>
        <span>{latest}% NOW</span>
      </div>
    </div>
  );
}

function ExpertPanel({ review }) {
  if (!review?.status) return null;

  if (review.status === "reviewed") {
    return (
      <div style={{ marginTop: 16, background: "#EEF5E8", border: `1px solid ${COLORS.line}`, borderRadius: 16, padding: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#D9EAD0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle2 size={17} color={COLORS.leaf} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.forest }}>Reviewed by an expert</p>

            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, fontSize: 12.5, color: COLORS.ink }}>
              {review.expert?.name && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <User size={12} color={COLORS.inkSoft} />
                  <span>{review.expert.name}</span>
                  {review.expert?.qualification && <span style={{ color: COLORS.inkSoft }}>· {review.expert.qualification}</span>}
                </div>
              )}
              {review.expert?.specialization && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Award size={12} color={COLORS.inkSoft} />
                  <span>{review.expert.specialization}</span>
                </div>
              )}
              {review.expert?.organization && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Building2 size={12} color={COLORS.inkSoft} />
                  <span>{review.expert.organization}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {review.advice && (
          <div style={{ marginTop: 12, background: COLORS.cream, borderLeft: `3px solid ${COLORS.forest}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, lineHeight: 1.55, color: COLORS.ink }}>
            {review.advice}
          </div>
        )}

        {review.reviewedAt && (
          <p style={{ margin: "10px 0 0", fontSize: 11, color: COLORS.inkSoft }}>Reviewed on {formatDate(review.reviewedAt)}</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16, background: "#FFF7E8", border: "1px solid #E9D9B2", borderRadius: 16, padding: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "#F5E4B9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Clock3 size={17} color={COLORS.amberDeep} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.forest }}>Sent to an expert</p>
          <p style={{ margin: "4px 0 0", fontSize: 12.5, lineHeight: 1.5, color: COLORS.inkSoft }}>
            Check back here once they've reviewed your case.
          </p>
          {review.requestedAt && (
            <p style={{ margin: "8px 0 0", fontSize: 11, color: COLORS.inkSoft }}>Requested on {formatDate(review.requestedAt)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FollowUpCard({ item, isUploading, onScan }) {
  const comparison = getComparison(item);
  const trendColor = comparison ? TREND_COLOR[comparison.status] : COLORS.line;
  const TrendIcon = comparison ? TREND_ICON[comparison.status] : Minus;
  const fileInputRef = useRef(null);

  return (
    <Card accentColor={trendColor} style={{ flexDirection: "column", display: "block" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <Leaf size={18} color={COLORS.forest} style={{ marginTop: 3, flexShrink: 0 }} />
          <div>
            <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, color: COLORS.forest }}>
              {item.crop} — {item.disease}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: 12.5, color: COLORS.inkSoft }}>
              First seen at {item.severityPercent}%{" "}
              <span style={{ color: SEVERITY_COLOR[item.severity] || COLORS.inkSoft, fontWeight: 600 }}>
                ({item.severity})
              </span>
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: COLORS.inkSoft, whiteSpace: "nowrap", flexShrink: 0 }}>
          <Calendar size={12} />
          {formatDate(item.createdAt)}
        </div>
      </div>

      <ExpertPanel review={item.expertReview} />

      {comparison && (
        <div style={{ marginTop: 16, background: COLORS.bg, border: `1px solid ${COLORS.line}`, borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: COLORS.forest }}>
              <TrendIcon size={15} color={trendColor} />
              {TREND_LABEL[comparison.status]}
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: COLORS.inkSoft }}>
              {comparison.change > 0 ? "+" : ""}
              {comparison.change} PTS
            </span>
          </div>

          <SeverityTrack initial={item.severityPercent} latest={comparison.latest.severityPercent} color={trendColor} />

          <p style={{ margin: "12px 0 0", fontSize: 12.5, color: COLORS.inkSoft }}>
            Latest diagnosis: <span style={{ color: COLORS.forest, fontWeight: 600 }}>{comparison.latest.disease}</span>
          </p>
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={isUploading}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            onScan(item._id, file);
            e.target.value = "";
          }}
        />
        <PrimaryButton
          icon={Camera}
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          style={{ width: "auto", padding: "11px 18px", borderRadius: 999, fontSize: 13.5 }}
        >
          {isUploading ? "Analysing your scan…" : "Scan this crop again"}
        </PrimaryButton>
      </div>

      {item.ipm?.monitoring?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <SectionLabel icon={<span style={{ fontSize: 13 }}>🔍</span>} color={COLORS.forest}>
            WHAT TO WATCH FOR
          </SectionLabel>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
            {item.ipm.monitoring.map((point, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.5, color: COLORS.inkSoft }}>
                <Sprout size={13} color={COLORS.leaf} style={{ marginTop: 3, flexShrink: 0 }} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.followUp?.scans?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <SectionLabel color={COLORS.inkSoft}>SCAN HISTORY</SectionLabel>
          <div style={{ position: "relative", paddingLeft: 16 }}>
            <div style={{ position: "absolute", left: 3, top: 6, bottom: 6, width: 1, background: COLORS.line }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {item.followUp.scans.map((scan, i) => (
                <div key={scan._id || i} style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: -16, top: 5, width: 8, height: 8, borderRadius: "50%", background: COLORS.forest }} />
                  <div style={{ fontSize: 13, color: COLORS.ink }}>
                    <span style={{ fontWeight: 600 }}>Scan {i + 1}</span>
                    <span style={{ color: COLORS.inkSoft }}> · {formatDate(scan.date)}</span>
                  </div>
                  <div style={{ marginTop: 2, fontSize: 12.5, color: COLORS.inkSoft }}>
                    {scan.disease} — {scan.severityPercent}% severity, {scan.confidence}% confidence
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function FollowUpMonitoring() {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadingId, setUploadingId] = useState(null);

  async function loadFollowUps() {
    try {
      setLoading(true);
      setError("");
      const data = await getFollowUps();
      setFollowUps(data.followUps || []);
    } catch (err) {
      setError(err.message || "Could not load follow-up monitoring.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFollowUps();
  }, []);

  async function handleFollowUpScan(scanId, file) {
    if (!file) return;
    try {
      setUploadingId(scanId);
      setError("");
      await uploadFollowUpScan(scanId, file);
      await loadFollowUps();
    } catch (err) {
      setError(err.message || "Could not process follow-up scan.");
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <>
      <style>{`
        @keyframes cs-fu-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .cs-fu-loading-icon { animation: cs-fu-pulse 1.4s ease-in-out infinite; }
        .cs-fu-skeleton {
          border-radius: 16px; height: 160px;
          background: linear-gradient(90deg, #EFEDE0 25%, #E4E1D3 37%, #EFEDE0 63%);
          background-size: 400% 100%; animation: cs-fu-shimmer 1.4s ease infinite;
        }
        @keyframes cs-fu-shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
      `}</style>

      <div className="cs-animate-in" style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 40px" }}>
        <TopBar title="Follow-up Monitoring" />

        <p style={{ margin: "0 0 22px", fontSize: 13.5, lineHeight: 1.55, color: COLORS.inkSoft, maxWidth: 480 }}>
          Keep track of crops you've already scanned, and see how they're responding over time.
        </p>

        {error && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 20, padding: "12px 14px", borderRadius: 12, background: "#FBEAE6", border: "1px solid #EFC5B8", fontSize: 13, color: COLORS.ink }}>
            <AlertTriangle size={15} color={COLORS.danger} style={{ marginTop: 1, flexShrink: 0 }} />
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="cs-fu-skeleton" />
            <div className="cs-fu-skeleton" />
          </div>
        ) : followUps.length === 0 ? (
          <div style={{ padding: "34px 22px", borderRadius: 16, background: COLORS.cream, border: `1px dashed ${COLORS.line}`, textAlign: "center" }}>
            <Sprout size={22} color={COLORS.leaf} />
            <h3 style={{ margin: "10px 0 0", fontSize: 14.5, fontWeight: 700, color: COLORS.forest }}>No active follow-ups</h3>
            <p style={{ margin: "5px 0 0", fontSize: 13, color: COLORS.inkSoft }}>
              Start a follow-up after scanning a crop to monitor it over time.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {followUps.map((item) => (
              <FollowUpCard
                key={item._id}
                item={item}
                isUploading={uploadingId === item._id}
                onScan={handleFollowUpScan}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}