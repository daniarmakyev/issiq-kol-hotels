'use client';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "ru",
        debug: false,
        backend: {
            loadPath: "/locales/{{lng}}/translation.json",
        },
        supportedLngs: ["kg", "ru", "en", "kz"],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["cookie"],
            caches: ["cookie"],
        },
    });

export default i18n;
