'use client';

import CountUp from "@/comps/TextAnimations/CountUp/CountUp";
import { useTranslations } from 'next-intl';
import React from "react";

interface StatCardProps {
  value: number;
  title: string;
  subtitle: string;
  suffix?: string;
}

const StatCard = ({ value, title, subtitle, suffix = "+" }: StatCardProps) => {
  return (
    <div className="bg-gray-900/10 border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="mb-3 sm:mb-4">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-500 mb-2 flex items-center justify-center">
          <CountUp
            from={0}
            to={value}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text"
          />
          <span className="text-red-500">{suffix}</span>
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm">
        {subtitle}
      </p>
    </div>
  );
};

const CounterCards = () => {
  const t = useTranslations('HomePage.socialProof');

  const stats = [
    {
      value: 50,
      title: t('deliveringResults'),
      subtitle: t('deliveringResultsSubtitle')
    },
    {
      value: 100,
      title: t('projectsCompleted'),
      subtitle: t('projectsSubtitle')
    },
    {
      value: 5,
      title: t('clientsRating'),
      subtitle: t('clientsSubtitle')
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterCards;
