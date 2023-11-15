import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpApi from "i18next-http-backend"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    // ns: ["test", "translation"],
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "navigator", "path"],
      caches: ["cookie", "localStorage"],
    },
    // backend: {
    //   loadPath: "/locales/{{lng}}/{{ns}}.json",
    // },
  })
