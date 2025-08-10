import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./ar.json";
import en from "./en.json";
import fr from "./fr.json";

const LANGUAGE_KEY = "app_language";

// Détection de la langue du système (simplifié)
const getSystemLanguage = () => {
  // Par défaut français, peut être étendu plus tard
  return "fr";
};

// Fonction pour sauvegarder la langue
export const saveLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la langue:", error);
  }
};

// Fonction pour charger la langue sauvegardée
export const loadSavedLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return savedLanguage || getSystemLanguage();
  } catch (error) {
    console.error("Erreur lors du chargement de la langue:", error);
    return getSystemLanguage();
  }
};

// Configuration i18next
const initI18n = async () => {
  const savedLanguage = await loadSavedLanguage();

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: savedLanguage,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

// Initialiser i18n
initI18n();

export default i18n;
