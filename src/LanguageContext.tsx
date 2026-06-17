/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "./locales/translations";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load saved preference if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nam_portfolio_lang");
      if (saved === "vi" || saved === "en") {
        setLanguageState(saved);
      } else {
        // Detect browser default
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("vi")) {
          setLanguageState("vi");
        }
      }
    } catch (e) {
      // standard silent safeguard
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("nam_portfolio_lang", lang);
    } catch (e) {
      // safe fallback
    }
  };

  // Translation helper function
  const t = (key: string): string => {
    const dict = translations[language];
    if (dict && key in dict) {
      return (dict as any)[key];
    }
    // Fallback to English dictionary
    const engDict = translations.en;
    if (engDict && key in engDict) {
      return (engDict as any)[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
