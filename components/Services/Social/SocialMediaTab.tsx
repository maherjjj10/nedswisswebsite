'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const SocialMediaTab = () => {
  const t = useTranslations('Services.socialMedia');

  const socialServices = [
    {
      icon: '📱',
      platform: 'Instagram',
      description: 'Visual storytelling and brand engagement',
      features: ['Stories & Reels', 'IGTV Content', 'User-Generated Content', 'Influencer Collaborations']
    },
    {
      icon: '💼',
      platform: 'LinkedIn',
      description: 'Professional networking and B2B engagement',
      features: ['Company Updates', 'Industry Insights', 'Thought Leadership', 'Employee Advocacy']
    },
    {
      icon: '🐦',
      platform: 'Twitter/X',
      description: 'Real-time engagement and community building',
      features: ['Live Updates', 'Hashtag Campaigns', 'Community Management', 'Crisis Management']
    },
    {
      icon: '📘',
      platform: 'Facebook',
      description: 'Community building and targeted advertising',
      features: ['Page Management', 'Community Groups', 'Event Promotion', 'Customer Support']
    }
  ];

  const contentTypes = [
    { type: 'Educational', icon: '📚', description: 'Inform and educate your audience' },
    { type: 'Promotional', icon: '📢', description: 'Showcase products and services' },
    { type: 'Entertainment', icon: '🎭', description: 'Engage with fun and creative content' },
    { type: 'Inspirational', icon: '✨', description: 'Motivate and inspire your community' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Platform Services */}
      <div>
        <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Platform Management
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 text-center">{service.icon}</div>
              <h5 className="text-lg font-bold text-gray-900 mb-2 text-center">
                {service.platform}
              </h5>
              <p className="text-sm text-gray-600 mb-4 text-center">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-xs text-gray-700">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Strategy */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8">
        <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Content Strategy
        </h4>
        <div className="grid md:grid-cols-4 gap-6">
          {contentTypes.map((content, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-3xl mb-3">{content.icon}</div>
              <h5 className="font-bold text-gray-900 mb-2">{content.type}</h5>
              <p className="text-sm text-gray-600">{content.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics & Reporting */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            📊 Analytics & Reporting
          </h4>
          <ul className="space-y-3">
            {[
              'Monthly Performance Reports',
              'Engagement Rate Analysis',
              'Audience Growth Tracking',
              'Content Performance Metrics',
              'ROI Measurement',
              'Competitor Analysis'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-gray-700"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            🎯 Community Management
          </h4>
          <ul className="space-y-3">
            {[
              '24/7 Community Monitoring',
              'Customer Service Support',
              'Crisis Communication',
              'User-Generated Content Curation',
              'Influencer Relationship Management',
              'Brand Reputation Management'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-gray-700"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gray-900 text-white rounded-2xl p-8">
        <h4 className="text-2xl font-bold mb-4">Ready to Boost Your Social Presence?</h4>
        <p className="text-gray-300 mb-6">Let&apos;s create a social media strategy that drives real results for your business.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-red-600 transition-colors duration-300"
        >
          Get Started Today
        </motion.button>
      </div>
    </div>
  );
};

export default SocialMediaTab; 