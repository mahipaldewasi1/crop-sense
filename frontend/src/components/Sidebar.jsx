import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ScanLine, Store, Map, LogOut, Leaf, X } from "lucide-react";
import { COLORS } from "../styles/theme";
import { useLanguage } from "../i18n/LanguageContext";
import { useAuth } from "../context/AuthContext";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "mr", label: "मर" },
];

export default function Sidebar({ isOpen, onClose }) {
  const { t, lang, changeLang } = useLanguage();
  const { logout, user } = useAuth();

  const navItems = [
    { to: "/home", label: t("home"), icon: Home },
    { to: "/scan", label: t("scan"), icon: ScanLine },
    { to: "/disease-map", label: "Disease Map", icon: Map },
    { to: "/store", label: t("stores"), icon: Store },
  ];

  return (
    <>
      <style>{`
        .cs-sidebar-overlay {
          position: fixed; inset: 0; background: rgba(21,40,31,0.5); z-index: 90;
          opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
        }
        .cs-sidebar-overlay.show { opacity: 1; pointer-events: auto; }

        .cs-sidebar {
          position: fixed; top: 0; left: 0; height: 100vh; width: 264px;
          background: ${COLORS.forest}; z-index: 95;
          display: flex; flex-direction: column; padding: 20px 16px;
          transform: translateX(-100%);
          transition: transform 0.22s ease;
          box-shadow: 4px 0 20px rgba(0,0,0,0.15);
        }
        .cs-sidebar.open { transform: translateX(0); }
        .cs-sidebar-close { display: none; }

        .cs-nav-item {
          display: flex; align-items: center; gap: 12px; padding: 11px 14px;
          border-radius: 10px; color: #C9D2BC; text-decoration: none;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
          margin-bottom: 4px; transition: background 0.15s ease; cursor: pointer;
          border: none; background: transparent; width: 100%; text-align: left;
        }
        .cs-nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .cs-nav-item.active { background: ${COLORS.amber}; color: ${COLORS.forestDeep}; }

        @media (min-width: 900px) {
          .cs-sidebar {
            position: sticky; top: 0; transform: translateX(0);
            box-shadow: none; flex-shrink: 0;
          }
          .cs-sidebar-overlay { display: none !important; }
          .cs-sidebar-close { display: block !important; }
        }
      `}</style>

      <div className={`cs-sidebar-overlay ${isOpen ? "show" : ""}`} onClick={onClose} />

      <aside className={`cs-sidebar ${isOpen ? "open" : ""}`} aria-label="Main navigation">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingLeft: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: COLORS.amber,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Leaf size={18} color={COLORS.forestDeep} />
            </div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, color: "#fff" }}>
              {t("appName")}
            </span>
          </div>
          <button onClick={onClose} className="cs-sidebar-close" aria-label="Close menu" style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
          }}>
            <X size={18} color="#C9D2BC" />
          </button>
        </div>

        {user?.name && (
          <p style={{ color: "#9CAA8C", fontSize: 12.5, margin: "0 0 18px", paddingLeft: 6 }}>
            {t("greeting")} <b style={{ color: "#fff" }}>{user.name}</b>
          </p>
        )}

        <nav style={{ flex: 1 }} aria-label="Screens">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={onClose}
              className={({ isActive }) => `cs-nav-item ${isActive ? "active" : ""}`}>
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div role="group" aria-label="Language" style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => changeLang(l.code)}
              aria-pressed={lang === l.code} style={{
                flex: 1, padding: "7px 4px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 12.5, fontWeight: 700, fontFamily: "'Inter', sans-serif",
                background: lang === l.code ? COLORS.amber : "rgba(255,255,255,0.08)",
                color: lang === l.code ? COLORS.forestDeep : "#C9D2BC",
              }}>
              {l.label}
            </button>
          ))}
        </div>

        <button onClick={logout} className="cs-nav-item" style={{ background: "rgba(255,255,255,0.06)" }}>
          <LogOut size={18} /> {t("logout")}
        </button>
      </aside>
    </>
  );
}
