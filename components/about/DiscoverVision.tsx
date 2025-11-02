'use client';

import { useTranslations } from 'next-intl';

const DiscoverVision = () => {
  const t = useTranslations('AboutPage.discoverVision');

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t('title.part1')} <br />
            <span className="text-red-600 font-bold">NED</span>
            <span className="text-red-600 font-extralight">SWISS</span>
          </h1>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Our Story */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {t('story.title')}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t('story.paragraph1')}
                </p>
                
                <p>
                  {t('story.paragraph2')}
                </p>
                
                <p>
                  {t('story.paragraph3')}
                </p>
              </div>
            </div>

            {/* Right Column - Why Choose Us */}
            <div>
              <div className="bg-gradient-to-b from-[#C03846] to-[#B70D1E] rounded-2xl p-8 text-white">
                <h3 className="text-3xl font-bold mb-8">
                  {t('whyChoose.title')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-white mt-1 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-lg">
                      {t('whyChoose.item1')}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-white mt-1 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-lg">
                      {t('whyChoose.item2')}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-white mt-1 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-lg">
                      {t('whyChoose.item3')}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-white mt-1 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-lg">
                      {t('whyChoose.item4')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverVision; 