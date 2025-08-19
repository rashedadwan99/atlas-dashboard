import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
import ar from "./assets/translation/ar.json";
import en from "./assets/translation/en.json";
import fr from "./assets/translation/fr.json";

// Supported languages
const availableLanguages = ["en", "ar", "fr"];
const localStorageKey = "selectedLanguageAtlasD";

// Load saved language or fallback to 'en'
const savedLanguage = localStorage.getItem(localStorageKey) || "en";
// Make sure it's a valid language (optional safety check)
const initialLanguage = availableLanguages.includes(savedLanguage)
  ? savedLanguage
  : "en";

// Define resources
const resources = {
  ar: { translation: ar },
  en: { translation: en },
  fr: { translation: fr },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: initialLanguage, // ✅ This sets the starting language
  interpolation: {
    escapeValue: false,
  },
});

// Whenever the language changes, update localStorage
i18n.on("languageChanged", (lang) => {
  localStorage.setItem(localStorageKey, lang);
});

export default i18n;
