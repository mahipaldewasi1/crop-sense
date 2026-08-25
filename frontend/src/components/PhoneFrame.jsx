import React from "react";
import { COLORS } from "../styles/theme";

export default function PhoneFrame({ children }) {
  return (
    <>
      <style>{`
        .phone-outer {
          min-height: 100vh; width: 100%; display: flex;
          align-items: center; justify-content: center; padding: 30px;
          font-family: 'Inter', sans-serif;
        }
        .phone-shell {
          width: 390px; height: 780px; border-radius: 44px;
          background: ${COLORS.forestDeep}; padding: 12px;
          box-shadow: 0 30px 60px -20px rgba(21,40,31,0.45);
        }
        .phone-inner {
          width: 100%; height: 100%; border-radius: 34px;
          background: ${COLORS.bg}; overflow: hidden;
          display: flex; flex-direction: column;
        }
        @media (max-width: 500px) {
          .phone-outer { padding: 0; }
          .phone-shell { width: 100vw; height: 100vh; height: 100dvh; border-radius: 0; padding: 0; box-shadow: none; }
          .phone-inner { border-radius: 0; }
        }
      `}</style>
      <div className="phone-outer">
        <div className="phone-shell">
          <div className="phone-inner">
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}