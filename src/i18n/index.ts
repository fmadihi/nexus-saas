import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './locales/fa.json';
import en from './locales/en.json';
import de from './locales/de.json';

const saved = localStorage.getItem('lang') ?? 'fa';

i18n.use(initReactI18next).init({
  resources: { fa: { translation: fa }, en: { translation: en }, de: { translation: de } },
  lng: saved,
  fallbackLng: 'fa',
  interpolation: { escapeValue: false },
});

export default i18n;
