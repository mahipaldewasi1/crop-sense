import { useEffect, useState } from "react";
import {
  getFollowUps,
  startFollowUp,
} from "../api/client";

export default function FollowUpMonitoring() {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFollowUps() {
    try {
      setLoading(true);
      setError("");

      const data = await getFollowUps();

      setFollowUps(data.followUps || []);
    } catch (err) {
      console.error("Follow-up loading error:", err);
      setError(err.message || "Could not load follow-up monitoring.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFollowUps();
  }, []);

  async function handleStartFollowUp(scanId) {
    try {
      await startFollowUp(scanId);
      await loadFollowUps();
    } catch (err) {
      console.error("Start follow-up error:", err);
      setError(err.message || "Could not start follow-up.");
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Follow-up Monitoring</h2>
        <p>Loading your crop monitoring...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Follow-up Monitoring</h1>

      <p>
        Keep track of previously detected crop diseases
        and monitor their progress.
      </p>

      {error && (
        <div
          style={{
            padding: "12px",
            marginTop: "20px",
            borderRadius: "8px",
            background: "#ffe5e5",
            color: "#b42318",
          }}
        >
          {error}
        </div>
      )}

      {followUps.length === 0 ? (
        <div style={{ marginTop: "30px" }}>
          <h3>No active follow-ups</h3>
          <p>
            Start a follow-up after scanning a crop to
            monitor it over time.
          </p>
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {followUps.map((item) => (
            <div
              key={item._id || item.id}
              style={{
                padding: "20px",
                marginBottom: "16px",
                borderRadius: "14px",
                border: "1px solid #ddd",
              }}
            >
              <h2>
                {item.crop} — {item.disease}
              </h2>

              <p>
                Severity: {item.severity}
              </p>

              <p>
                Started:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "—"}
              </p>

              {item.monitoring?.length > 0 && (
                <>
                  <h3>What to monitor</h3>

                  <ul>
                    {item.monitoring.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}