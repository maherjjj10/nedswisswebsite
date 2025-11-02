'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getLocaleDisplayName, locales } from '@/i18n';
import { type Locale } from '@/i18n';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export const MobileMenu = ({ onClose, isOpen }: MobileMenuProps) => {
  const t = useTranslations('Navigation');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  // Get current locale from URL pathname as backup
  const getCurrentLocaleFromPath = (): Locale => {
    const pathSegments = pathname.split('/');
    const potentialLocale = pathSegments[1];
    
    if (potentialLocale && locales.includes(potentialLocale as Locale)) {
      return potentialLocale as Locale;
    }
    
    return locale; // fallback to useLocale hook
  };

  const currentLocale = getCurrentLocaleFromPath();

  const switchLocale = (newLocale: string) => {
    try {
      const pathSegments = pathname.split('/');
      
      // Remove empty first segment and current locale if it exists
      const cleanSegments = pathSegments.slice(1); // Remove empty first segment
      
      // Check if first segment is a locale and remove it
      if (cleanSegments[0] && locales.includes(cleanSegments[0] as Locale)) {
        cleanSegments.shift(); // Remove the current locale
      }
      
      // Construct new path with new locale
      const pathWithoutLocale = cleanSegments.length > 0 ? `/${cleanSegments.join('/')}` : '';
      const newPath = `/${newLocale}${pathWithoutLocale}`;
      
      console.log('Mobile: Switching locale:', {
        currentLocale,
        newLocale,
        originalPath: pathname,
        pathSegments,
        cleanSegments,
        pathWithoutLocale,
        finalPath: newPath
      });
      
      router.push(newPath);
      onClose();
    } catch (error) {
      console.error('Error switching locale in mobile:', error);
      // Simple fallback
      router.push(`/${newLocale}`);
      onClose();
    }
  };

  const getFlagEmoji = (locale: Locale) => {
    switch (locale) {
      case 'en':
        return '🇺🇸';
      case 'de':
        return '🇩🇪';
      case 'fr':
        return '🇫🇷';
      default:
        return '🌍';
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
      }
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const, // Custom easing
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  const languageContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const languageItemVariants = {
    hidden: { opacity: 0, x: -15, scale: 0.9 },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut" as const
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
        delay: 0.3
      }
    }
  };

  // Navigation items data
  const navigationItems = [
    { href: `/${currentLocale}`, label: t('home'), key: 'home' },
    { href: `/${currentLocale}/about`, label: t('about'), key: 'about' },
    { href: `/${currentLocale}/services`, label: t('services'), key: 'services' },
    { href: `/${currentLocale}/blogs`, label: t('blogs'), key: 'blogs' },
    { href: `/${currentLocale}/contact`, label: t('contact'), key: 'contact' }
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Mobile Menu */}
          <motion.div 
            className="lg:hidden absolute top-full left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6">
              {/* Navigation Links */}
              <motion.div className="space-y-1">
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.key}
                    variants={itemVariants}
                    whileHover={{ 
                      x: 4,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={item.href} 
                      className="block px-4 py-3 rounded-lg text-zinc-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      onClick={onClose}
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Language Switcher */}
              <motion.div 
                className="pt-6 border-t border-white/10 mt-6"
                variants={languageContainerVariants}
              >
                <motion.div className="mb-3" variants={itemVariants}>
                  <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    {t('language') || 'Language'}
                  </span>
                </motion.div>
                <motion.div className="space-y-2">
                  {locales.map((loc) => (
                    <motion.button
                      key={loc}
                      variants={languageItemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        x: 2,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => switchLocale(loc)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        loc === currentLocale 
                          ? 'bg-red-600/20 text-red-400 ring-1 ring-red-600/30' 
                          : 'text-zinc-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <motion.span 
                        className="text-xl"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {getFlagEmoji(loc)}
                      </motion.span>
                      <div className="flex flex-col flex-1">
                        <span className="font-medium text-sm">{getLocaleDisplayName(loc)}</span>
                        <span className="text-xs text-gray-400 uppercase">{loc}</span>
                      </div>
                      {loc === currentLocale && (
                        <motion.svg 
                          className="w-4 h-4 text-red-400" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ 
                            scale: 1, 
                            rotate: 0,
                            transition: { 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 30,
                              delay: 0.2 
                            }
                          }}
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div 
                className="pt-6"
                variants={ctaVariants}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={`/${currentLocale}/contact`}
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-sm font-semibold text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                  >
                    <span>{t('letsTalk') || "Let's Talk"}</span>
                    <motion.svg 
                      className="w-4 h-4 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 