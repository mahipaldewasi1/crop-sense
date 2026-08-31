import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("cropsense_lang") || "en");

  function changeLang(newLang) {
    localStorage.setItem("cropsense_lang", newLang);
    setLang(newLang);
  }

  function t(key) {
    return translations[lang]?.[key] || translations.en[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
