import { createContext, useContext, useState, ReactNode } from "react";
import { translations, type LanguageCode, type Translations } from "@/i18n/translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  speechLang: string; // BCP 47 tag for Web Speech API
}

const speechLangMap: Record<LanguageCode, string> = {
  en: "en-US", hi: "hi-IN", ta: "ta-IN", es: "es-ES",
  fr: "fr-FR", de: "de-DE", ja: "ja-JP", zh: "zh-CN",
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
  speechLang: "en-US",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        speechLang: speechLangMap[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
