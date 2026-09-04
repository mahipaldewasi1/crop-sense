import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Leaf,
  LogOut,
  Search,
  Bell,
  MapPin,
  Clock3,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Users,
  FileText,
  Activity,
  Sprout,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import { getExpertCases } from "../api/client";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function ExpertDashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

 const [cases, setCases] = useState([]);    
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
  async function loadCases() {
    try {
      setLoading(true);
      setError("");

      const data = await getExpertCases();

      setCases(data.cases || []);
    } catch (err) {
      console.error(
        "Expert cases loading error:",
        err
      );

      setError(
        err.message ||
          "Could not load farmer cases."
      );
    } finally {
      setLoading(false);
    }
  }

  loadCases();
}, []);
  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesSearch =
        item.farmer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.crop
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.disease
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
}, [cases, search, filter]);

  const pendingCount = cases.filter(
    (item) => item.status === "pending"
  ).length;

  const highPriorityCount = cases.filter(
    (item) => item.severity === "High"
  ).length;

  function handleLogout() {
    logout();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "'Inter', sans-serif",
        color: COLORS.ink,
      }}
    >
      {/* TOP BAR */}
      <header
        style={{
          height: 72,
          background: COLORS.cream,
          borderBottom: `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 34px",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: COLORS.forest,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={22} color={COLORS.amber} />
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 21,
                fontWeight: 600,
                color: COLORS.forest,
              }}
            >
              FasalSaathi
            </div>

            <div
              style={{
                fontSize: 10,
                color: COLORS.inkSoft,
                marginTop: -2,
              }}
            >
              Expert Portal
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <LanguageSwitcher />
          <button
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: `1px solid ${COLORS.line}`,
              background: COLORS.cream,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.inkSoft,
            }}
          >
            <Bell size={17} />
          </button>

          <div
            style={{
              height: 32,
              width: 1,
              background: COLORS.line,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#DDE8DC",
                color: COLORS.forest,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {(user?.name || "E")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div style={{ display: "none" }}>
              <div>{user?.name}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: COLORS.inkSoft,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding: "34px 28px 60px",
        }}
      >
        {/* Welcome */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: COLORS.leaf,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Agricultural Expert Portal
            </p>

            <h1
              style={{
                margin: "6px 0 6px",
                fontFamily: "'Fraunces', serif",
                fontSize: 34,
                color: COLORS.forest,
                fontWeight: 600,
              }}
            >
              Welcome, {user?.name || "Expert"}
            </h1>

            <p
              style={{
                margin: 0,
                color: COLORS.inkSoft,
                fontSize: 14,
              }}
            >
              Review farmer cases and provide trusted crop-health
              guidance.
            </p>
          </div>

          <div
            style={{
              background: "#E4EEDF",
              borderRadius: 12,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#2E6B3E",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={16} />
            Verified Expert
          </div>
        </div>

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 16,
            marginBottom: 30,
          }}
        >
          <StatCard
            icon={FileText}
            title="Total Cases"
            value={cases.length}
            subtitle="Cases received"
          />

          <StatCard
            icon={Clock3}
            title="Awaiting Review"
            value={pendingCount}
            subtitle="Need your attention"
            alert
          />

          <StatCard
            icon={AlertTriangle}
            title="High Priority"
            value={highPriorityCount}
            subtitle="Severe crop conditions"
          />

          <StatCard
            icon={CheckCircle2}
            title="Reviewed"
            value={
              cases.length - pendingCount
            }
            subtitle="Cases completed"
          />
        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 300px",
            gap: 22,
            alignItems: "start",
          }}
        >
          {/* CASES */}
          <section
            style={{
              background: COLORS.cream,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 18,
              padding: 22,
              boxShadow:
                "0 12px 30px -22px rgba(21,40,31,0.18)",
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Fraunces', serif",
                    color: COLORS.forest,
                    fontSize: 22,
                  }}
                >
                  Farmer Cases
                </h2>

                <p
                  style={{
                    margin: "4px 0 0",
                    color: COLORS.inkSoft,
                    fontSize: 12,
                  }}
                >
                  Review AI-detected crop health cases.
                </p>
              </div>
            </div>

            {/* Search + filter */}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 220,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: `1px solid ${COLORS.line}`,
                  background: "#fff",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <Search
                  size={16}
                  color={COLORS.inkSoft}
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search farmer, crop or disease..."
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    flex: 1,
                    fontSize: 13,
                    color: COLORS.ink,
                  }}
                />
              </div>

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                style={{
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 10,
                  background: "#fff",
                  padding: "0 12px",
                  color: COLORS.inkSoft,
                  fontSize: 12,
                  outline: "none",
                  minWidth: 130,
                }}
              >
                <option value="all">
                  All Cases
                </option>
                <option value="pending">
                  Awaiting Review
                </option>
                <option value="reviewed">
                  Reviewed
                </option>
              </select>
            </div>

{/* Cases */}

{loading ? (
  <div
    style={{
      padding: "45px 20px",
      textAlign: "center",
      color: COLORS.inkSoft,
      fontSize: 13,
    }}
  >
    Loading farmer cases...
  </div>
) : error ? (
  <div
    style={{
      padding: "14px",
      borderRadius: 10,
      background: "#FDECEC",
      color: COLORS.danger,
      fontSize: 12,
      lineHeight: 1.5,
    }}
  >
    {error}
  </div>
) : filteredCases.length === 0 ? (
              <div
                style={{
                  padding: "45px 20px",
                  textAlign: "center",
                  color: COLORS.inkSoft,
                }}
              >
                <FileText
                  size={34}
                  style={{ opacity: 0.4 }}
                />

                <p style={{ fontSize: 13 }}>
                  No cases match your search.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {filteredCases.map((item) => (
<CaseCard
  key={item.id}
  item={item}
  onReview={() =>
    navigate(
      `/expert/cases/${item.id}`
    )
  }
/>
                ))}
              </div>
            )}
          </section>

          {/* SIDE PANEL */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Profile */}
            <div
              style={{
                background: COLORS.forest,
                borderRadius: 18,
                padding: 22,
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#DDE8DC",
                    color: COLORS.forest,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {(user?.name || "E")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {user?.name || "Expert"}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      opacity: 0.75,
                      marginTop: 3,
                    }}
                  >
                    Agricultural Expert
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop:
                    "1px solid rgba(255,255,255,0.16)",
                  paddingTop: 15,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.7,
                    marginBottom: 5,
                  }}
                >
                  Specialization
                </div>

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {user?.specialization ||
                    "Plant Disease"}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div
              style={{
                background: COLORS.cream,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 18,
                padding: 20,
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px",
                  color: COLORS.forest,
                  fontFamily: "'Fraunces', serif",
                  fontSize: 18,
                }}
              >
                Case Overview
              </h3>

<MiniStat
  icon={Users}
  label="Farmers"
  value={
    new Set(
      cases.map((item) => item.farmer)
    ).size
  }
/>

              <MiniStat
                icon={Sprout}
                label="Crops"
                value={
                  new Set(
                    cases.map(
                      (item) => item.crop
                    )
                  ).size
                }
              />

              <MiniStat
                icon={Activity}
                label="Active Reviews"
                value={pendingCount}
              />
            </div>

            {/* How it works */}
            <div
              style={{
                background: "#F0EEE4",
                borderRadius: 18,
                padding: 20,
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px",
                  color: COLORS.forest,
                  fontFamily: "'Fraunces', serif",
                  fontSize: 18,
                }}
              >
                Expert Workflow
              </h3>

              <WorkflowStep
                number="1"
                text="Review the farmer's AI diagnosis."
              />

              <WorkflowStep
                number="2"
                text="Assess severity and crop condition."
              />

              <WorkflowStep
                number="3"
                text="Provide practical guidance."
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ---------------------------------------------
   STAT CARD
--------------------------------------------- */

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  alert,
}) {
  return (
    <div
      style={{
        background: COLORS.cream,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 16,
        padding: 18,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: alert
            ? "#FBE8E5"
            : "#E4EEDF",
          color: alert
            ? COLORS.danger
            : COLORS.forest,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={19} />
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            color: COLORS.inkSoft,
            marginBottom: 3,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 23,
            fontWeight: 700,
            color: COLORS.forest,
            lineHeight: 1,
          }}
        >
          {value}
        </div>

        <div
          style={{
            fontSize: 10,
            color: COLORS.inkSoft,
            marginTop: 4,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   CASE CARD
--------------------------------------------- */

function CaseCard({
  item,
  onReview,
}) {
  const severityStyle = {
    High: {
      background: "#FBE8E5",
      color: "#B42318",
    },
    Medium: {
      background: "#FFF2D6",
      color: "#946200",
    },
    Low: {
      background: "#E4EEDF",
      color: "#2E6B3E",
    },
  };

  return (
    <div
      style={{
        border: `1px solid ${COLORS.line}`,
        borderRadius: 14,
        padding: 16,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 13,
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: "#E4EEDF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.leaf,
            flexShrink: 0,
          }}
        >
          <Sprout size={20} />
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <strong
              style={{
                color: COLORS.forest,
                fontSize: 14,
              }}
            >
              {item.farmer}
            </strong>

            <span
              style={{
                fontSize: 10,
                padding: "4px 7px",
                borderRadius: 20,
                fontWeight: 700,
                ...severityStyle[item.severity],
              }}
            >
              {item.severity} severity
            </span>
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 13,
              color: COLORS.ink,
              fontWeight: 600,
            }}
          >
            {item.crop} · {item.disease}
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 7,
              color: COLORS.inkSoft,
              fontSize: 10.5,
            }}
          >
            <span>
              Severity: {item.severityPercent}%
            </span>

            <span>
              Confidence: {item.confidence}%
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <MapPin size={11} />
              {item.location}
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Clock3 size={11} />
              {item.time
  ? new Date(item.time).toLocaleString()
  : "Unknown time"}
            </span>
          </div>
        </div>
      </div>

      <button
onClick={onReview}
        style={{
          flexShrink: 0,
          border: `1px solid ${COLORS.forest}`,
          background:
            item.status === "pending"
              ? COLORS.forest
              : "transparent",
          color:
            item.status === "pending"
              ? "#fff"
              : COLORS.forest,
          borderRadius: 9,
          padding: "9px 12px",
          fontSize: 11,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {item.status === "pending"
          ? "Review Case"
          : "View Case"}
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

/* ---------------------------------------------
   MINI STAT
--------------------------------------------- */

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: `1px solid ${COLORS.line}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: COLORS.inkSoft,
          fontSize: 12,
        }}
      >
        <Icon size={15} />
        {label}
      </div>

      <strong
        style={{
          color: COLORS.forest,
          fontSize: 14,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* ---------------------------------------------
   WORKFLOW
--------------------------------------------- */

function WorkflowStep({ number, text }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        marginTop: 12,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: COLORS.forest,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {number}
      </div>

      <div
        style={{
          fontSize: 11.5,
          color: COLORS.inkSoft,
          lineHeight: 1.45,
        }}
      >
        {text}
      </div>
    </div>
  );
}