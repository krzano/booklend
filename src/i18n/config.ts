import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend from "i18next-http-backend"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpBackend)
  .init({
    // TO ASK TO CHECK: loading all namespaces
    ns: ["common", "forms", "dashboard", "settings"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "navigator", "path"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
