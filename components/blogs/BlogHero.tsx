'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export const BlogHero = () => {
  const t = useTranslations('BlogHero');

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat bg-center" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('title.prefix', { default: 'Your journey starts' })}{' '}
            <span className="text-red-500 relative">
              {t('title.highlight', { default: 'here' })}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {t('subtitle', { 
              default: 'Discover insights, trends, and stories that inspire innovation and drive digital transformation.' 
            })}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <button className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
              {t('cta.explore', { default: 'Explore Articles' })}
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-full transition-all duration-300 hover:shadow-md">
              {t('cta.categories', { default: 'Browse Categories' })}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500 font-medium">
              {t('scrollIndicator', { default: 'Scroll to explore' })}
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-8 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-500" />
    </section>
  );
}; 