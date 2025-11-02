import 'server-only';
import { Locale } from './i18n';

const dictionaries = {
  en: () => import('../i18n/en.json').then((module) => module.default),
  de: () => import('../i18n/de.json').then((module) => module.default),
  fr: () => import('../i18n/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();