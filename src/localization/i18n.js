import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from '../store';

// Localization
import en from './en';
import ru from './ru';
import kz from './kz';

const resources = {
  en,
  ru,
  kz
};

const languageDetector = {
  type: 'languageDetector',
  async: false, // flags below detection to be async
  detect: () => {
    return store.getState().app.language;
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    interpolation: {
      escapeValue: false
    }
  });
