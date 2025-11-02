'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const WhyUs = () => {
  const t = useTranslations('HomePage.whyUs');

  return (
    <section className="py-16 px-4 overflow-x-hidden ">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center flex-col justify-center ">
          {/* Bouncing Circle Container */}
          <div className="relative">
            {/* Animated Circle */}
            <div className="w-[380px] h-[380px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-black relative overflow-hidden animate-bounce-slow shadow-2xl border-4 border-red-500">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-red-600 p-1">
                <div className="w-full h-full rounded-full bg-black flex flex-col items-center justify-center text-white px-6 sm:px-8 lg:px-12">
                  {/* Content */}
                  <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                      {t('title')}
                    </h2>
                    
                    {/* Main Points */}
                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                      <p className="max-w-xs sm:max-w-sm lg:max-w-md">
                        {t('quickDelivery')}
                      </p>
                      
                      <p className="max-w-xs sm:max-w-sm lg:max-w-md">
                        {t('internationalTeam')}
                      </p>
                      
                      <p className="max-w-xs sm:max-w-sm lg:max-w-md">
                        {t('flexiblePricing')}
                      </p>
                   
                    </div>
                    
                    {/* CTA Button */}
                    <div className="pt-4 sm:pt-6">
                      <Link href="/contact">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                        {t('cta')}
                      </button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Circle Shadow */}
          {/* <div className="absolute -bottom-8 w-[280px] h-[40px] sm:w-[360px] sm:h-[50px] md:w-[460px] md:h-[60px] lg:w-[560px] lg:h-[70px] bg-black/20 rounded-full blur-md transform translate-y-4 z-[-1]"></div> */}
           
           {/* <Image src="/shadow.png" alt="Why Us" width={500} height={500} className='absolute bottom-0 left-1/2 -translate-x-1/2 ' /> */}
        
        </div>
      </div>
    </section>
  );
};

export default WhyUs;