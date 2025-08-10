import { loadSavedLanguage, saveLanguage } from "@/locales/i18n";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  isRTL: boolean;
  availableLanguages: Array<{ code: string; name: string; nativeName: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("fr");
  const [isRTL, setIsRTL] = useState(false);

  const availableLanguages = [
    { code: "fr", name: "Français", nativeName: "Français" },
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "العربية", nativeName: "العربية" },
  ];

  useEffect(() => {
    // Charger la langue sauvegardée au démarrage
    loadSavedLanguage().then((language) => {
      setCurrentLanguage(language);
      setIsRTL(language === "ar");
      i18n.changeLanguage(language);

      // Configurer RTL si nécessaire
      if (language === "ar") {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
    });
  }, [i18n]);

  const changeLanguage = async (language: string) => {
    try {
      await saveLanguage(language);
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);

      const newIsRTL = language === "ar";
      setIsRTL(newIsRTL);

      // Configurer RTL
      if (newIsRTL) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }

      // Note: L'app devra redémarrer pour que RTL prenne effet complètement
    } catch (error) {
      console.error("Erreur lors du changement de langue:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        isRTL,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
