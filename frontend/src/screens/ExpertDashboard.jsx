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

import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";


export default function ExpertDashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* ---------------------------------------------
     LOAD CASES
  --------------------------------------------- */

  useEffect(() => {
    async function loadCases() {
      try {
        setLoading(true);
        setError("");

        const data = await getExpertCases();

        setCases(data?.cases || []);
      } catch (err) {
        console.error(
          "Expert cases loading error:",
          err
        );

        setError(
          err?.message ||
            "Could not load farmer cases."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);


  /* ---------------------------------------------
     FILTER CASES
  --------------------------------------------- */

  const filteredCases = useMemo(() => {
    const query = search.toLowerCase().trim();

    return cases.filter((item) => {
      const farmer =
        item?.farmer || "";

      const crop =
        item?.crop || "";

      const disease =
        item?.disease || "";

      const matchesSearch =
        farmer
          .toLowerCase()
          .includes(query) ||
        crop
          .toLowerCase()
          .includes(query) ||
        disease
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "all" ||
        item?.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [cases, search, filter]);


  /* ---------------------------------------------
     STATS
  --------------------------------------------- */

  const pendingCount =
    cases.filter(
      (item) =>
        item?.status === "pending"
    ).length;

  const highPriorityCount =
    cases.filter(
      (item) =>
        item?.severity === "High"
    ).length;

  const reviewedCount =
    cases.length - pendingCount;


  /* ---------------------------------------------
     LOGOUT
  --------------------------------------------- */

  function handleLogout() {
    logout();
  }


  /* ---------------------------------------------
     USER INITIAL
  --------------------------------------------- */

  const userInitial =
    (user?.name || "E")
      .charAt(0)
      .toUpperCase();


  return (
    <div className="expert-dashboard">

      {/* ==================================================
          RESPONSIVE CSS
      ================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          overflow-x: hidden;
        }

        .expert-dashboard {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }


        /* -----------------------------------------------
           HEADER
        ----------------------------------------------- */

        .expert-header {
          width: 100%;
          height: 72px;
          padding: 0 34px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: ${COLORS.cream};
          border-bottom: 1px solid ${COLORS.line};

          position: sticky;
          top: 0;
          z-index: 50;
        }


        .expert-logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex-shrink: 1;
        }


        .expert-logo-box {
          width: 42px;
          height: 42px;
          min-width: 42px;

          border-radius: 12px;

          background: ${COLORS.forest};

          display: flex;
          align-items: center;
          justify-content: center;
        }


        .expert-logo-text {
          min-width: 0;
          white-space: nowrap;
        }


        .expert-brand {
          font-family: 'Fraunces', serif;
          font-size: 21px;
          font-weight: 600;
          line-height: 1;
          color: ${COLORS.forest};
        }


        .expert-brand-subtitle {
          font-size: 10px;
          color: ${COLORS.inkSoft};
          margin-top: 3px;
        }


        .expert-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }


        .expert-header-divider {
          height: 30px;
          width: 1px;
          background: ${COLORS.line};
        }


        .expert-avatar {
          width: 38px;
          height: 38px;
          min-width: 38px;

          border-radius: 50%;

          background: #DDE8DC;
          color: ${COLORS.forest};

          display: flex;
          align-items: center;
          justify-content: center;

          font-weight: 700;
          font-size: 14px;
        }


        .expert-logout {
          border: none;
          background: transparent;

          cursor: pointer;

          color: ${COLORS.inkSoft};

          display: flex;
          align-items: center;
          gap: 6px;

          font-size: 12px;
          font-weight: 600;

          padding: 7px;
        }


        /* -----------------------------------------------
           MAIN
        ----------------------------------------------- */

        .expert-main {
          width: 100%;
          max-width: 1250px;

          margin: 0 auto;

          padding: 34px 28px 60px;
        }


        /* -----------------------------------------------
           WELCOME
        ----------------------------------------------- */

        .welcome-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          gap: 20px;

          margin-bottom: 28px;
        }


        .welcome-copy {
          min-width: 0;
        }


        .welcome-label {
          margin: 0;

          color: ${COLORS.leaf};

          font-size: 12px;
          font-weight: 700;

          text-transform: uppercase;
          letter-spacing: 0.8px;
        }


        .welcome-title {
          margin: 6px 0 6px;

          font-family: 'Fraunces', serif;

          font-size: 34px;
          line-height: 1.12;

          color: ${COLORS.forest};

          font-weight: 600;

          word-break: break-word;
        }


        .welcome-description {
          margin: 0;

          color: ${COLORS.inkSoft};

          font-size: 14px;
          line-height: 1.5;

          max-width: 560px;
        }


        .verified-badge {
          background: #E4EEDF;

          border-radius: 12px;

          padding: 10px 14px;

          display: flex;
          align-items: center;

          gap: 8px;

          color: #2E6B3E;

          font-size: 12px;
          font-weight: 600;

          flex-shrink: 0;
        }


        /* -----------------------------------------------
           STAT GRID
        ----------------------------------------------- */

        .stat-grid {
          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 16px;

          margin-bottom: 30px;
        }


        /* -----------------------------------------------
           MAIN CONTENT
        ----------------------------------------------- */

        .dashboard-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr) 300px;

          gap: 22px;

          align-items: start;
        }


        /* -----------------------------------------------
           CASE SECTION
        ----------------------------------------------- */

        .cases-section {
          min-width: 0;

          background: ${COLORS.cream};

          border: 1px solid ${COLORS.line};

          border-radius: 18px;

          padding: 22px;

          box-shadow:
            0 12px 30px -22px
            rgba(21,40,31,0.18);
        }


        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 16px;

          margin-bottom: 18px;
        }


        .section-title {
          margin: 0;

          font-family: 'Fraunces', serif;

          color: ${COLORS.forest};

          font-size: 22px;
        }


        .section-description {
          margin: 4px 0 0;

          color: ${COLORS.inkSoft};

          font-size: 12px;
        }


        /* -----------------------------------------------
           SEARCH
        ----------------------------------------------- */

        .search-filter-row {
          display: flex;

          gap: 10px;

          margin-bottom: 18px;
        }


        .search-box {
          flex: 1;
          min-width: 0;

          display: flex;
          align-items: center;

          gap: 8px;

          border: 1px solid ${COLORS.line};

          background: #fff;

          border-radius: 10px;

          padding: 10px 12px;
        }


        .search-input {
          border: none;
          outline: none;

          background: transparent;

          width: 100%;
          min-width: 0;

          font-size: 13px;

          color: ${COLORS.ink};
        }


        .filter-select {
          border: 1px solid ${COLORS.line};

          border-radius: 10px;

          background: #fff;

          padding: 0 12px;

          color: ${COLORS.inkSoft};

          font-size: 12px;

          outline: none;

          min-width: 130px;

          height: 39px;
        }


        /* -----------------------------------------------
           CASE LIST
        ----------------------------------------------- */

        .case-list {
          display: flex;

          flex-direction: column;

          gap: 12px;

          min-width: 0;
        }


        .case-card {
          width: 100%;
          min-width: 0;

          border: 1px solid ${COLORS.line};

          border-radius: 14px;

          padding: 16px;

          background: #fff;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 16px;
        }


        .case-main {
          display: flex;

          align-items: flex-start;

          gap: 13px;

          min-width: 0;

          flex: 1;
        }


        .case-icon {
          width: 42px;
          height: 42px;

          min-width: 42px;

          border-radius: 11px;

          background: #E4EEDF;

          display: flex;

          align-items: center;
          justify-content: center;

          color: ${COLORS.leaf};
        }


        .case-content {
          min-width: 0;
          flex: 1;
        }


        .case-top {
          display: flex;

          align-items: center;

          gap: 8px;

          flex-wrap: wrap;
        }


        .case-farmer {
          color: ${COLORS.forest};

          font-size: 14px;

          overflow-wrap: anywhere;
        }


        .case-diagnosis {
          margin-top: 5px;

          font-size: 13px;

          color: ${COLORS.ink};

          font-weight: 600;

          overflow-wrap: anywhere;
        }


        .case-meta {
          display: flex;

          gap: 12px;

          flex-wrap: wrap;

          margin-top: 7px;

          color: ${COLORS.inkSoft};

          font-size: 10.5px;
        }


        .case-meta-item {
          display: flex;

          align-items: center;

          gap: 3px;

          min-width: 0;

          overflow-wrap: anywhere;
        }


        .case-review-button {
          flex-shrink: 0;

          border: 1px solid ${COLORS.forest};

          border-radius: 9px;

          padding: 9px 12px;

          font-size: 11px;

          font-weight: 700;

          cursor: pointer;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

          min-width: 105px;
        }


        /* -----------------------------------------------
           SIDEBAR
        ----------------------------------------------- */

        .sidebar {
          display: flex;

          flex-direction: column;

          gap: 16px;

          min-width: 0;
        }


        .profile-card {
          background: ${COLORS.forest};

          border-radius: 18px;

          padding: 22px;

          color: #fff;
        }


        .profile-top {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 18px;
        }


        .profile-avatar {
          width: 48px;
          height: 48px;

          min-width: 48px;

          border-radius: 50%;

          background: #DDE8DC;

          color: ${COLORS.forest};

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 18px;

          font-weight: 700;
        }


        .profile-name {
          font-weight: 700;
          font-size: 15px;

          overflow-wrap: anywhere;
        }


        .profile-role {
          font-size: 11px;

          opacity: 0.75;

          margin-top: 3px;
        }


        .profile-specialization {
          border-top:
            1px solid rgba(255,255,255,0.16);

          padding-top: 15px;
        }


        .quick-stats-card {
          background: ${COLORS.cream};

          border: 1px solid ${COLORS.line};

          border-radius: 18px;

          padding: 20px;
        }


        .workflow-card {
          background: #F0EEE4;

          border-radius: 18px;

          padding: 20px;
        }


        /* -----------------------------------------------
           EMPTY / LOADING
        ----------------------------------------------- */

        .empty-state {
          padding: 45px 20px;

          text-align: center;

          color: ${COLORS.inkSoft};
        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 900px) {

          .expert-header {
            padding: 0 20px;
          }


          .expert-main {
            padding:
              28px 20px 50px;
          }


          .stat-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }


          .dashboard-grid {
            grid-template-columns: 1fr;
          }


          .sidebar {
            display: grid;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            align-items: start;
          }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 600px) {

          .expert-header {
            height: 62px;

            padding: 0 10px;

            gap: 6px;
          }


          .expert-logo-area {
            gap: 0;

            flex: 1;

            min-width: 42px;
          }


          .expert-logo-text {
            display: none;
          }


          .expert-logo-box {
            width: 40px;
            height: 40px;
            min-width: 40px;

            border-radius: 11px;
          }


          .expert-header-right {
            gap: 5px;
          }


          .expert-header-divider {
            display: none;
          }


          .expert-header-right
          > button {
            flex-shrink: 0;
          }


          .expert-avatar {
            width: 34px;
            height: 34px;
            min-width: 34px;

            font-size: 13px;
          }


          .expert-logout {
            padding: 7px;

            width: 34px;
            height: 34px;

            justify-content: center;
          }


          .expert-logout span {
            display: none;
          }


          .expert-main {
            width: 100%;

            padding:
              22px 12px 45px;
          }


          .welcome-section {
            flex-direction: column;

            gap: 12px;

            margin-bottom: 20px;
          }


          .welcome-label {
            font-size: 10px;
          }


          .welcome-title {
            font-size: 29px;

            line-height: 1.08;

            margin-top: 5px;
          }


          .welcome-description {
            font-size: 12.5px;

            max-width: 100%;
          }


          .verified-badge {
            align-self: flex-start;

            padding: 8px 11px;

            font-size: 11px;
          }


          .stat-grid {
            grid-template-columns: 1fr;

            gap: 10px;

            margin-bottom: 20px;
          }


          .dashboard-grid {
            display: flex;

            flex-direction: column;

            gap: 16px;
          }


          .cases-section {
            width: 100%;

            padding: 15px;

            border-radius: 15px;
          }


          .section-header {
            margin-bottom: 14px;
          }


          .section-title {
            font-size: 20px;
          }


          .section-description {
            font-size: 11px;

            line-height: 1.4;
          }


          .search-filter-row {
            flex-direction: column;

            gap: 8px;
          }


          .search-box {
            width: 100%;

            min-height: 40px;
          }


          .filter-select {
            width: 100%;

            min-width: 0;

            height: 40px;
          }


          .case-card {
            flex-direction: column;

            align-items: stretch;

            padding: 13px;

            gap: 12px;
          }


          .case-main {
            width: 100%;

            gap: 10px;
          }


          .case-icon {
            width: 38px;
            height: 38px;

            min-width: 38px;
          }


          .case-farmer {
            font-size: 13px;
          }


          .case-diagnosis {
            font-size: 12px;

            line-height: 1.4;
          }


          .case-meta {
            flex-direction: column;

            gap: 5px;

            font-size: 10px;
          }


          .case-review-button {
            width: 100%;

            min-width: 0;

            min-height: 39px;
          }


          .sidebar {
            display: flex;

            flex-direction: column;

            width: 100%;
          }


          .profile-card,
          .quick-stats-card,
          .workflow-card {
            width: 100%;

            border-radius: 15px;
          }

        }


        /* =================================================
           VERY SMALL PHONES — 320px
        ================================================= */

        @media (max-width: 360px) {

          .expert-header {
            padding: 0 8px;
          }


          .expert-header-right {
            gap: 3px;
          }


          .expert-main {
            padding-left: 10px;
            padding-right: 10px;
          }


          .welcome-title {
            font-size: 27px;
          }


          .cases-section {
            padding: 13px;
          }


          .case-card {
            padding: 12px;
          }

        }

      `}</style>


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="expert-header">

        {/* LOGO */}

        <div className="expert-logo-area">

          <div className="expert-logo-box">
            <Leaf
              size={21}
              color={COLORS.amber}
            />
          </div>


          <div className="expert-logo-text">

            <div className="expert-brand">
              FasalSaathi
            </div>

            <div className="expert-brand-subtitle">
              Expert Portal
            </div>

          </div>

        </div>


        {/* HEADER ACTIONS */}

        <div className="expert-header-right">

          <LanguageSwitcher />


          <button
            type="button"
            aria-label="Notifications"
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border:
                `1px solid ${COLORS.line}`,
              background:
                COLORS.cream,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.inkSoft,
              flexShrink: 0,
            }}
          >
            <Bell size={17} />
          </button>


          <div className="expert-header-divider" />


          <div className="expert-avatar">
            {userInitial}
          </div>


          <button
            type="button"
            onClick={handleLogout}
            className="expert-logout"
            aria-label="Logout"
          >
            <LogOut size={15} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </header>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="expert-main">

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="welcome-section">

          <div className="welcome-copy">

            <p className="welcome-label">
              Agricultural Expert Portal
            </p>


            <h1 className="welcome-title">
              Welcome,{" "}
              {user?.name || "Expert"}
            </h1>


            <p className="welcome-description">
              Review farmer cases and provide
              trusted crop-health guidance.
            </p>

          </div>


          <div className="verified-badge">

            <CheckCircle2 size={16} />

            Verified Expert

          </div>

        </section>


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="stat-grid">

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
            value={reviewedCount}
            subtitle="Cases completed"
          />

        </div>


        {/* =================================================
            DASHBOARD GRID
        ================================================= */}

        <div className="dashboard-grid">


          {/* =================================================
              CASES
          ================================================= */}

          <section className="cases-section">

            <div className="section-header">

              <div>

                <h2 className="section-title">
                  Farmer Cases
                </h2>

                <p className="section-description">
                  Review AI-detected crop health cases.
                </p>

              </div>

            </div>


            {/* SEARCH + FILTER */}

            <div className="search-filter-row">

              <div className="search-box">

                <Search
                  size={16}
                  color={COLORS.inkSoft}
                />

                <input
                  className="search-input"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search farmer, crop or disease..."
                />

              </div>


              <select
                className="filter-select"
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
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


            {/* CASES */}

            {loading ? (

              <div className="empty-state">
                Loading farmer cases...
              </div>

            ) : error ? (

              <div
                style={{
                  padding: 14,
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

              <div className="empty-state">

                <FileText
                  size={34}
                  style={{
                    opacity: 0.4,
                  }}
                />

                <p
                  style={{
                    fontSize: 13,
                    marginBottom: 0,
                  }}
                >
                  No cases match your search.
                </p>

              </div>

            ) : (

              <div className="case-list">

                {filteredCases.map(
                  (item) => (

                    <CaseCard
                      key={item.id}
                      item={item}
                      onReview={() =>
                        navigate(
                          `/expert/cases/${item.id}`
                        )
                      }
                    />

                  )
                )}

              </div>

            )}

          </section>


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="sidebar">


            {/* PROFILE */}

            <div className="profile-card">

              <div className="profile-top">

                <div className="profile-avatar">
                  {userInitial}
                </div>


                <div>

                  <div className="profile-name">
                    {user?.name || "Expert"}
                  </div>

                  <div className="profile-role">
                    Agricultural Expert
                  </div>

                </div>

              </div>


              <div className="profile-specialization">

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


            {/* CASE OVERVIEW */}

            <div className="quick-stats-card">

              <h3
                style={{
                  margin: "0 0 16px",
                  color: COLORS.forest,
                  fontFamily:
                    "'Fraunces', serif",
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
                    cases.map(
                      (item) =>
                        item?.farmer
                    )
                  ).size
                }
              />


              <MiniStat
                icon={Sprout}
                label="Crops"
                value={
                  new Set(
                    cases.map(
                      (item) =>
                        item?.crop
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


            {/* WORKFLOW */}

            <div className="workflow-card">

              <h3
                style={{
                  margin: "0 0 10px",
                  color: COLORS.forest,
                  fontFamily:
                    "'Fraunces', serif",
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


/* =========================================================
   STAT CARD
========================================================= */

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

        border:
          `1px solid ${COLORS.line}`,

        borderRadius: 16,

        padding: 18,

        display: "flex",

        alignItems: "center",

        gap: 14,

        minWidth: 0,
      }}
    >

      <div
        style={{
          width: 42,
          height: 42,

          minWidth: 42,

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
        }}
      >
        <Icon size={19} />
      </div>


      <div
        style={{
          minWidth: 0,
        }}
      >

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


/* =========================================================
   CASE CARD
========================================================= */

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


  const severity =
    item?.severity || "Low";


  return (

    <div className="case-card">


      <div className="case-main">


        <div className="case-icon">
          <Sprout size={20} />
        </div>


        <div className="case-content">


          <div className="case-top">

            <strong className="case-farmer">
              {item?.farmer ||
                "Unknown Farmer"}
            </strong>


            <span
              style={{
                fontSize: 10,
                padding: "4px 7px",
                borderRadius: 20,
                fontWeight: 700,

                ...(severityStyle[
                  severity
                ] ||
                  severityStyle.Low),
              }}
            >
              {severity} severity
            </span>

          </div>


          <div className="case-diagnosis">

            {item?.crop ||
              "Unknown crop"}

            {" · "}

            {item?.disease ||
              "Unknown disease"}

          </div>


          <div className="case-meta">


            <span className="case-meta-item">
              Severity:{" "}
              {item?.severityPercent ??
                0}
              %
            </span>


            <span className="case-meta-item">
              Confidence:{" "}
              {item?.confidence ??
                0}
              %
            </span>


            <span className="case-meta-item">

              <MapPin size={11} />

              {item?.location ||
                "Location unavailable"}

            </span>


            <span className="case-meta-item">

              <Clock3 size={11} />

              {item?.time
                ? new Date(
                    item.time
                  ).toLocaleString()
                : "Unknown time"}

            </span>

          </div>

        </div>

      </div>


      <button
        type="button"
        onClick={onReview}
        className="case-review-button"

        style={{
          background:
            item?.status === "pending"
              ? COLORS.forest
              : "transparent",

          color:
            item?.status === "pending"
              ? "#fff"
              : COLORS.forest,
        }}
      >

        {item?.status === "pending"
          ? "Review Case"
          : "View Case"}

        <ChevronRight size={14} />

      </button>

    </div>

  );
}


/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div
      style={{
        display: "flex",

        alignItems: "center",

        justifyContent:
          "space-between",

        padding: "10px 0",

        borderBottom:
          `1px solid ${COLORS.line}`,
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


/* =========================================================
   WORKFLOW STEP
========================================================= */

function WorkflowStep({
  number,
  text,
}) {

  return (

    <div
      style={{
        display: "flex",

        gap: 10,

        alignItems:
          "flex-start",

        marginTop: 12,
      }}
    >

      <div
        style={{
          width: 22,
          height: 22,

          minWidth: 22,

          borderRadius: "50%",

          background:
            COLORS.forest,

          color: "#fff",

          display: "flex",

          alignItems: "center",
          justifyContent: "center",

          fontSize: 10,

          fontWeight: 700,
        }}
      >
        {number}
      </div>


      <div
        style={{
          fontSize: 11.5,

          color:
            COLORS.inkSoft,

          lineHeight: 1.45,
        }}
      >
        {text}
      </div>

    </div>

  );
}