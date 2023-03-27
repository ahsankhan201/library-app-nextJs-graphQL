import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../public/locale/en.json';
import fr from '../public/locale/fr.json';


const detectionOptions = {
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  caches: ['cookie'],
  lookupQuerystring: 'lng',
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: detectionOptions,
    supportedLngs: ['en', 'fr', 'de'],
    interpolation: {
      escapeValue: false,
    },
  });

i18n.addResourceBundle('en', 'translation', en, true);
i18n.addResourceBundle('fr', 'translation', fr, true);


export default i18n;
