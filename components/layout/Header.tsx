'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getLocaleDisplayName, locales } from '@/i18n';
import { type Locale } from '@/i18n';
import { MobileMenu } from '../navigation/MobileMenu';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Header = () => {
  const t = useTranslations('Navigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  // Check if current page is homepage
  const isHomePage = pathname === `/${currentLocale}` || pathname === '/' || pathname === `/${currentLocale}/`;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Switch locale function
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
      
      router.push(newPath);
      setIsMobileMenuOpen(false); // Close mobile menu on locale switch
    } catch (error) {
      console.error('Error switching locale:', error);
      // Simple fallback
      router.push(`/${newLocale}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed-safe  z-header transition-all duration-300 mx-auto  w-full py-5 ',
        isHomePage ? (
          scrolled
            ? 'bg-[#2a2a2a]/80 backdrop-blur-sm py-5   '
            : 'bg-[#2a2a2a] py-4'
        ) : (
          scrolled
            ? 'bg-white/95 backdrop-blur-sm py-3 shadow-md '
            : 'bg-transparent py-4'
        )
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${currentLocale}`} 
            className="flex items-center gap-2 select-none"
          >
            <Image 
              src="/logo.png" 
              alt="NEDSWISS" 
              width={40} 
              height={40} 
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <span className={cn(
              "text-lg lg:text-xl font-light tracking-wide transition-colors duration-300",
              isHomePage ? "text-white" : scrolled ? "text-gray-900" : "text-white"
            )}>
              <span className='font-bold text-red-500'>NED</span><span className='text-red-500 font-light'>SWISS</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className='flex items-center gap-8 xl:gap-12'>
              <li>
                <Link 
                  href={`/${currentLocale}`}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-2",
                    "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-red-500",
                    "after:transition-all after:duration-300 after:transform after:-translate-x-1/2",
                    "hover:after:w-full hover:text-red-600",
                    pathname === `/${currentLocale}` || pathname === '/' 
                      ? "text-red-600 after:w-full" 
                      : isHomePage 
                        ? "text-white" 
                        : scrolled 
                          ? "text-gray-900" 
                          : "text-text-gray-900"
                  )}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${currentLocale}/about`}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-2",
                    "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-red-500",
                    "after:transition-all after:duration-300 after:transform after:-translate-x-1/2",
                    "hover:after:w-full hover:text-red-600",
                    pathname.includes('/about') 
                      ? "text-red-600 after:w-full" 
                      : isHomePage 
                        ? "text-white" 
                        : scrolled 
                          ? "text-gray-900" 
                          : "text-text-gray-900"
                  )}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${currentLocale}/services`}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-2",
                    "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-red-500",
                    "after:transition-all after:duration-300 after:transform after:-translate-x-1/2",
                    "hover:after:w-full hover:text-red-600",
                    pathname.includes('/services') 
                      ? "text-red-600 after:w-full" 
                      : isHomePage 
                        ? "text-white" 
                        : scrolled 
                          ? "text-gray-900" 
                          : "text-text-gray-900"
                  )}
                >
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${currentLocale}/blogs`}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-2",
                    "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-red-500",
                    "after:transition-all after:duration-300 after:transform after:-translate-x-1/2",
                    "hover:after:w-full hover:text-red-600",
                    pathname.includes('/blogs') 
                      ? "text-red-600 after:w-full" 
                      : isHomePage 
                        ? "text-white" 
                        : scrolled 
                          ? "text-gray-900 " 
                          : "text-text-gray-900"
                  )}
                >
                  {t('blogs')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${currentLocale}/contact`}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 py-2",
                    "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-red-500",
                    "after:transition-all after:duration-300 after:transform after:-translate-x-1/2",
                    "hover:after:w-full hover:text-red-600",
                    pathname.includes('/contact') 
                      ? "text-red-600 after:w-full" 
                      : isHomePage 
                        ? "text-white" 
                        : scrolled 
                          ? "text-gray-900" 
                          : "text-text-gray-900"
                  )}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Language Switcher - Right side */}
          <div className="hidden lg:flex items-center gap-4">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  loc === currentLocale 
                    ? "text-red-600" 
                    : isHomePage 
                      ? "text-white/60 hover:text-white" 
                      : scrolled 
                        ? "text-gray-600 hover:text-gray-900" 
                        : "text-text-gray-900"
                )}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={cn(
              "lg:hidden hover:text-red-600 focus:outline-none p-1 transition-colors duration-300",
              isHomePage 
                ? "text-white" 
                : scrolled 
                  ? "text-gray-900" 
                  : "text-text-gray-900"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  animate={{
                    d: isMobileMenuOpen 
                      ? "M6 18L18 6M6 6l12 12" 
                      : "M4 6h16M4 12h16M4 18h16"
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;