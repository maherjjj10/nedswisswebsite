'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GraphicDesignTab, WebDevelopmentTab, SocialMediaTab, DigitalMarketingTab } from '.';
import IlluminatedSignsTab from './Design/IlluminatedSignsTab';

interface ServiceTab {
  id: string;
  name: string;
  icon: string;
}

interface ServiceContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  ctaText: string;
}

const ServicesTab = () => {
  const t = useTranslations('Services');
  const [activeTab, setActiveTab] = useState('design');

  const tabs: ServiceTab[] = [
    { id: 'design', name: t('tabs.design'), icon: '🎨' },
    { id: 'webDevelopment', name: t('tabs.webDevelopment'), icon: '💻' },
    { id: 'socialMedia', name: t('tabs.socialMedia'), icon: '📱' },
    { id: 'digitalMarketing', name: t('tabs.digitalMarketing'), icon: '📈' },
  ];

  const serviceContent: Record<string, ServiceContent> = {
    design: {
      id: 'design',
      title: t('design.title'),
      subtitle: t('design.subtitle'),
      description: t('design.description'),
      features: [
        t('design.features.ecommerce'),
        t('design.features.restaurant'),
        t('design.features.landing'),
        t('design.features.corporate'),
      ],
      image: '/laptop-graphic-design.png',
      ctaText: t('design.cta'),
    },
    webDevelopment: {
      id: 'webDevelopment',
      title: t('webDevelopment.title'),
      subtitle: t('webDevelopment.subtitle'),
      description: t('webDevelopment.description'),
      features: [
        t('webDevelopment.features.crm'),
        t('webDevelopment.features.hr'),
        t('webDevelopment.features.inventory'),
        t('webDevelopment.features.booking'),
      ],
      image: '/laptop-web-development.png',
      ctaText: t('webDevelopment.cta'),
    },
    socialMedia: {
      id: 'socialMedia',
      title: t('socialMedia.title'),
      subtitle: t('socialMedia.subtitle'),
      description: t('socialMedia.description'),
      features: [
        t('socialMedia.features.contentCreation'),
        t('socialMedia.features.communityManagement'),
        t('socialMedia.features.analytics'),
        t('socialMedia.features.strategy'),
      ],
      image: '/laptop-advertising.png',
      ctaText: t('socialMedia.cta'),
    },
    digitalMarketing: {
      id: 'digitalMarketing',
      title: t('digitalMarketing.title'),
      subtitle: t('digitalMarketing.subtitle'),
      description: t('digitalMarketing.description'),
      features: [
        t('digitalMarketing.features.seo'),
        t('digitalMarketing.features.ppc'),
        t('digitalMarketing.features.emailMarketing'),
        t('digitalMarketing.features.contentMarketing'),
      ],
      image: '/laptop-seo-services.png',
      ctaText: t('digitalMarketing.cta'),
    },
  };

  const currentContent = serviceContent[activeTab];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')} <span className="text-red-500">{t('highlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className=""
            >
              {activeTab === 'design' &&   <GraphicDesignTab />}
              {activeTab === 'webDevelopment' && <WebDevelopmentTab />}
              {activeTab === 'socialMedia' && <IlluminatedSignsTab />}
              {activeTab === 'digitalMarketing' && <DigitalMarketingTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesTab; 