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

// Tarayıcının dilini al
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  // Dil kodunu 2 karaktere indir (örn: 'tr-TR' -> 'tr')
  const shortLang = browserLang.split('-')[0];
  
  // Desteklenen dilleri kontrol et
  if (['fa', 'tr', 'en'].includes(shortLang)) {
    return shortLang;
  }
  // Desteklenmeyen dil varsa varsayılan olarak Farsça döndür
  return 'fa';
};

// Kaydedilmiş dil tercihini veya tarayıcı dilini al
const initialLanguage = localStorage.getItem('preferredLanguage') || getBrowserLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: ['fa', 'tr', 'en'],
    lng: initialLanguage,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage'
    },
    supportedLngs: ['fa', 'tr', 'en'],
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
    react: {
      useSuspense: false // Suspense'i devre dışı bırak
    }
  });

export default i18n; 