import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './locale/ruLocale.js';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: translation,
    },
  });

export default i18n;
