import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { COLORS } from "../styles/theme";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg }}>
      <style>{`
        .cs-layout-main { flex: 1; min-width: 0; }
        .cs-hamburger {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 10px;
          background: ${COLORS.cream}; border: 1px solid ${COLORS.line};
          margin: 14px 0 0 16px; cursor: pointer;
          transition: border-color 0.16s ease, transform 0.16s ease;
        }
        .cs-hamburger:hover { border-color: ${COLORS.forest}; transform: scale(1.05); }
        .cs-hamburger:active { transform: scale(0.95); }
        @media (min-width: 900px) {
          .cs-hamburger { display: none; }
        }
      `}</style>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="cs-layout-main">
        <button
          className="cs-hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} color={COLORS.forest} />
        </button>
        {children}
      </div>
    </div>
  );
}