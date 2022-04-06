import i18n from 'i18next';
import translation from './en/translation.json';
import translationEs from './es/translation.json';
import translationFr from './fr/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  ['en']: {
    translation,
  },
  ['es']: {
    translation: translationEs,
  },
  ['fr']: {
    translation: translationFr,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});
