import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';

const detectBrowserLanguage = () => {
  const language = navigator.language || navigator.userLanguage;
  return language.split('-')[0];
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    tr: {
      translation: trTranslation,
    },
  },
  lng: detectBrowserLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
