'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export interface ServiceItem {
  title: string;
  subtitle: string;
  services: string[];
  buttonText: string;
  backgroundColor: string;
  gradientColors?: string[];
  gradientDirection?: string;
  laptopImage: string;
  backgroundMask: string;
  link: string;
  icon: React.ReactNode;
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
}

export interface DetailedServiceItem {
  title: string;
  description: string;
}

export interface DetailedService {
  title: string;
  description: string;
  items: DetailedServiceItem[];
}

// Hook to get translated services data
export const useServicesData = (): ServiceItem[] => {
  const t = useTranslations('ServicesData.services');
  
  return [
    {
      title: t('graphicDesignPrinting.title'),
      subtitle: t('graphicDesignPrinting.subtitle'),
      services: [
        t('graphicDesignPrinting.services.0'),
        t('graphicDesignPrinting.services.1'),
        t('graphicDesignPrinting.services.2')
      ],
      buttonText: t('graphicDesignPrinting.buttonText'),
      backgroundColor: "#51218F",
      gradientColors: ["#51218F", "#8A38F5"],
      gradientDirection: "to bottom",
      laptopImage: "/laptop-graphic-design.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/graphic-design",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="white" strokeWidth="2" fill="white"/>
          <path d="M9 12L11 14L15 10" stroke="#BBACAF" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: t('webDevelopment.title'),
      subtitle: t('webDevelopment.subtitle'),
      services: [
        t('webDevelopment.services.0'),
        t('webDevelopment.services.1'),
        t('webDevelopment.services.2'),
        t('webDevelopment.services.3'),
        t('webDevelopment.services.4')
      ],
      buttonText: t('webDevelopment.buttonText'),
      backgroundColor: "#5C00D3",
      gradientColors: ["#353689", "#5D5FEF"],
      gradientDirection: "to bottom",
      laptopImage: "/laptop-web-development.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/web-development",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="white" strokeWidth="2" fill="white"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke="white" strokeWidth="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2"/>
          <path d="M6 7H10V11H6Z" fill="#977F6D"/>
          <line x1="12" y1="8" x2="18" y2="8" stroke="#977F6D" strokeWidth="2"/>
          <line x1="12" y1="10" x2="16" y2="10" stroke="#977F6D" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: t('socialMediaMarketing.title'),
      subtitle: t('socialMediaMarketing.subtitle'),
      services: [
        t('socialMediaMarketing.services.0'),
        t('socialMediaMarketing.services.1'),
        t('socialMediaMarketing.services.2')
      ],
      buttonText: t('socialMediaMarketing.buttonText'),
      backgroundColor: "#E71B30",
      gradientColors: ["#810F1B", "#E71B30"],
      gradientDirection: "to bottom",
      laptopImage: "/rocket.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/social-media-management",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="white"/>
          <path d="M8.56 2.75C12.93 2.75 16.44 6.26 16.44 10.63C16.44 12.15 15.97 13.54 15.17 14.66L17.25 16.74C17.66 17.15 17.66 17.82 17.25 18.23C16.84 18.64 16.17 18.64 15.76 18.23L13.68 16.15C12.56 16.95 11.17 17.42 9.65 17.42C5.28 17.42 1.77 13.91 1.77 9.54C1.77 5.17 5.28 1.66 9.65 1.66" fill="#C2491D"/>
          <circle cx="9" cy="9" r="2" fill="white"/>
        </svg>
      )
    },
    {
      title: t('digitalOffsetPrinting.title'),
      subtitle: t('digitalOffsetPrinting.subtitle'),
      services: [
        t('digitalOffsetPrinting.services.0'),
        t('digitalOffsetPrinting.services.1'),
        t('digitalOffsetPrinting.services.2')
      ],
      buttonText: t('digitalOffsetPrinting.buttonText'),
      backgroundColor: "#26A297",
      gradientColors: ["#1A6660", "#26A297"],
      gradientDirection: "to bottom",
      laptopImage: "/laptop-seo-services.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/seo-services",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" fill="white"/>
          <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2"/>
          <path d="M11 8V14M8 11H14" stroke="#B62429" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: t('illuminatedSigns3d.title'),
      subtitle: t('illuminatedSigns3d.subtitle'),
      services: [
        t('illuminatedSigns3d.services.0'),
        t('illuminatedSigns3d.services.1'),
        t('illuminatedSigns3d.services.2')
      ],
      buttonText: t('illuminatedSigns3d.buttonText'),
      backgroundColor: "#84259C",
      gradientColors: ["#84259C", "#8B00D3"],
      gradientDirection: "to right",
      laptopImage: "/laptop-advertising.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/advertising-solutions",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" fill="white"/>
          <circle cx="12" cy="12" r="3" fill="#6A5B8C"/>
        </svg>
      )
    },
    {
      title: t('paidAds.title'),
      subtitle: t('paidAds.subtitle'),
      services: [
        t('paidAds.services.0'),
        t('paidAds.services.1'),
        t('paidAds.services.2')
      ],
      buttonText: t('paidAds.buttonText'),
      backgroundColor: "#45B6E1",
      gradientColors: ["#26647B", "#45B6E1"],
      gradientDirection: "to bottom",
      laptopImage: "/idea.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/advertising-solutions",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" fill="white"/>
          <circle cx="12" cy="12" r="3" fill="#6A5B8C"/>
        </svg>
      )
    },
    {
      title: t('seo.title'),
      subtitle: t('seo.subtitle'),
      services: [
        t('seo.services.0'),
        t('seo.services.1'),
        t('seo.services.2')
      ],
      buttonText: t('seo.buttonText'),
      backgroundColor: "#88A28D",
      gradientColors: ["#A58C10", "#E0BC07"],
      gradientDirection: "to bottom",
      laptopImage: "/laptop-software-solution.png",
      backgroundMask: "/mask-groupa.png",
      link: "/services/software-solutions",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" stroke="white" strokeWidth="2" fill="white"/>
          <line x1="7" y1="8" x2="17" y2="8" stroke="#88A28D" strokeWidth="2"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="#88A28D" strokeWidth="2"/>
          <line x1="7" y1="16" x2="13" y2="16" stroke="#88A28D" strokeWidth="2"/>
        </svg>
      )
    }
  ];
};

// Hook to get translated process steps
export const useProcessSteps = (): ProcessStep[] => {
  const t = useTranslations('ServicesData.processSteps');
  
  return [
    {
      id: 1,
      number: t('consultation.number'),
      title: t('consultation.title'),
      description: t('consultation.description')
    },
    {
      id: 2,
      number: t('strategyPlanning.number'),
      title: t('strategyPlanning.title'),
      description: t('strategyPlanning.description')
    },
    {
      id: 3,
      number: t('designDevelopment.number'),
      title: t('designDevelopment.title'),
      description: t('designDevelopment.description')
    },
    {
      id: 4,
      number: t('testingOptimization.number'),
      title: t('testingOptimization.title'),
      description: t('testingOptimization.description')
    },
  
  ];
};

// Hook to get detailed services data
export const useDetailedServicesData = (): DetailedService[] => {
  const t = useTranslations('ServicesData.detailedServices');
  
  return [
    {
      title: t('consultation.title'),
      description: t('consultation.description'),
      items: [
        {
          title: t('consultation.items.0.title'),
          description: t('consultation.items.0.description')
        },
        {
          title: t('consultation.items.1.title'),
          description: t('consultation.items.1.description')
        },
        {
          title: t('consultation.items.2.title'),
          description: t('consultation.items.2.description')
        }
      ]
    },
    {
      title: t('strategy.title'),
      description: t('strategy.description'),
      items: [
        {
          title: t('strategy.items.0.title'),
          description: t('strategy.items.0.description')
        },
        {
          title: t('strategy.items.1.title'),
          description: t('strategy.items.1.description')
        },
        {
          title: t('strategy.items.2.title'),
          description: t('strategy.items.2.description')
        }
      ]
    },
    {
      title: t('execution.title'),
      description: t('execution.description'),
      items: [
        {
          title: t('execution.items.0.title'),
          description: t('execution.items.0.description')
        },
        {
          title: t('execution.items.1.title'),
          description: t('execution.items.1.description')
        },
        {
          title: t('execution.items.2.title'),
          description: t('execution.items.2.description')
        }
      ]
    },
    {
      title: t('success.title'),
      description: t('success.description'),
      items: [
        {
          title: t('success.items.0.title'),
          description: t('success.items.0.description')
        },
        {
          title: t('success.items.1.title'),
          description: t('success.items.1.description')
        },
        {
          title: t('success.items.2.title'),
          description: t('success.items.2.description')
        }
      ]
    }
  ];
};

// Export the old arrays for backward compatibility (deprecated - use hooks instead)
// These are fallback exports that return empty arrays - components should use the hooks above
export const services: ServiceItem[] = [];
export const processSteps: ProcessStep[] = [];
export const servicesData: DetailedService[] = []; 