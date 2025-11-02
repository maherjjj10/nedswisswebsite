export const locales = ['de', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export function getDirection(locale: Locale) {
  return 'ltr';
}

export function getLocaleDisplayName(locale: Locale) {
  switch (locale) {
    case 'en':
      return 'English';
    case 'de':
      return 'Deutsch';
    case 'fr':
      return 'Français';
    default:
      return locale;
  }
}