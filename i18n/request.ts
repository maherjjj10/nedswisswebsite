import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../i18n';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;

  try {
    const messages = (await import(`./${validLocale}.json`)).default;
    
    return {
      locale: validLocale,
      messages
    };
  } catch (error) {
    console.error('Error loading messages for locale:', validLocale, error);
    // Fallback to English messages
    const fallbackMessages = (await import('./en.json')).default;
    return {
      locale: defaultLocale,
      messages: fallbackMessages
    };
  }
});