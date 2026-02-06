import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en/common.json";
import ruTranslations from "./locales/ru/common.json";

export const createI18nInstance = async () => {
  const instance = i18next.createInstance();

  await instance.use(initReactI18next).init({
    fallbackLng: "ru",
    defaultNS: "common",
    resources: {
      en: { common: enTranslations },
      ru: { common: ruTranslations },
    },
  });

  return instance;
};
