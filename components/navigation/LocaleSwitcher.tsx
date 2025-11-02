'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getLocaleDisplayName, locales } from '@/i18n';
import { type Locale } from '@/i18n';
import { useTranslations } from 'next-intl';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  
  const switchLocale = (newLocale: string) => {
    // Replace the current locale in the path with the new one
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };
  
  return (
    <select 
      value={locale} 
      onChange={(e) => switchLocale(e.target.value)}
      className="px-2 py-1 border rounded bg-white text-gray-800"
      aria-label="Select language"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {getLocaleDisplayName(loc)}
        </option>
      ))}
    </select>
  );
};

export default LocaleSwitcher; 