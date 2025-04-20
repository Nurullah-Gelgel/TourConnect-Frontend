import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';
import translationFA from './locales/fa/translation.json';

const resources = {
  fa: {
    translation: translationFA
  },
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  }
};

// Get saved language preference
const savedLanguage = localStorage.getItem('preferredLanguage');

// If saved language is English, reset it to Persian
if (savedLanguage === 'en') {
  localStorage.setItem('preferredLanguage', 'fa');
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: ['fa', 'tr', 'en'], // First try Persian, then Turkish, then English
    lng: savedLanguage || 'fa', // Use Persian as default if no saved preference
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage'
    },
    supportedLngs: ['fa', 'tr', 'en'], // Support all three languages
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development'
  });

export default i18n; 