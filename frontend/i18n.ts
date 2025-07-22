// src/i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './public/locales/en/common.json';
import hi from './public/locales/hi/common.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
