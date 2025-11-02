'use client';

import { Target, Crosshair, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Cards = () => {
  const t = useTranslations('AboutPage.cards');

  return (
    <div className='flex flex-col  lg:flex-row items-stretch justify-between gap-6 max-w-7xl mx-auto px-4 py-10'>
      {/* Vision Card */}
      <div className='flex flex-col items-center justify-start gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 min-h-[300px]'>
        <div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center'>
          <Target className='w-8 h-8 text-red-600' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 text-center'>{t('vision.title')}</h2>
        <p className='text-sm text-gray-600 text-center leading-relaxed'>
          {t('vision.description')}
        </p>
      </div>

      {/* Mission Card */}
      <div className='flex flex-col items-center justify-start gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 min-h-[300px]'>
        <div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center'>
          <Crosshair className='w-8 h-8 text-red-600' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 text-center'>{t('mission.title')}</h2>
        <p className='text-sm text-gray-600 text-center leading-relaxed'>
          {t('mission.description')}
        </p>
      </div>

      {/* Values Card */}
      <div className='flex flex-col items-center justify-start gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 min-h-[300px]'>
        <div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center'>
          <Star className='w-8 h-8 text-red-600' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 text-center'>{t('values.title')}</h2>
        <p className='text-sm text-gray-600 text-center leading-relaxed'>
          {t('values.description')}
        </p>
      </div>
    </div>
  );
};

export default Cards;