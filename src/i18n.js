import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';
import translationFA from './locales/fa/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  },
  fa: {
    translation: translationFA
  }
};

// Kaydedilmiş dil tercihini al
const savedLanguage = localStorage.getItem('preferredLanguage');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    lng: savedLanguage || 'tr', // Kaydedilmiş dil varsa onu kullan, yoksa tr
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n; 