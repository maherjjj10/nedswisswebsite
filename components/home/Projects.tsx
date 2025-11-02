'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Stack from '../../comps/Components/Stack/Stack';
import Link from 'next/link';

interface ProjectCategory {
  id: string;
  name: string;
  images: { id: number; img: string }[];
}

const getProjectCategories = (t: ReturnType<typeof useTranslations>): ProjectCategory[] => [
  {
    id: 'printing',
    name: t('categories.printing'),
    images: [
      { id: 1, img: '/projects/printing-1.jpg' },
      { id: 2, img: '/projects/printing-2.jpg' }, 
      { id: 3, img: '/projects/printing-3.jpg' }
    ]
  },
  {
    id: 'graphic',
    name: t('categories.graphic'),
    images: [
      { id: 1, img: '/projects/graphic-1.jpg' },
      { id: 2, img: '/projects/graphic-2.jpg' },
      { id: 3, img: '/projects/graphic-3.jpg' }
    ]
  },
  {
    id: 'web',
    name: t('categories.web'),
    images: [
      { id: 1, img: '/projects/web-1.jpg' },
      { id: 2, img: '/projects/web-2.jpg' },
      { id: 3, img: '/projects/web-3.jpg' }
    ]
  },
  {
    id: 'social',
    name: t('categories.social'),
    images: [
      { id: 1, img: '/projects/social-1.jpg' },
      { id: 2, img: '/projects/social-2.jpg' },
      { id: 3, img: '/projects/social-3.jpg' }
    ]
  },
  {
    id: 'digital',
    name: t('categories.digital'),
    images: [
      { id: 1, img: '/projects/digital-1.jpg' },
      { id: 2, img: '/projects/digital-2.jpg' },
      { id: 3, img: '/projects/graphic-2.jpg' }
    ]
  },
  {
    id: 'software',
    name: t('categories.software'),
    images: [
      { id: 1, img: '/projects/software-1.jpg' },
      { id: 2, img: '/projects/software-2.jpg' },
      { id: 3, img: '/projects/software-3.jpg' }
    ]
  }
];

const Projects = () => {
  const t = useTranslations('Projects');
  const [activeCategory, setActiveCategory] = useState('printing');

  const projectCategories = getProjectCategories(t);
  const currentCategory = projectCategories.find((cat: ProjectCategory) => cat.id === activeCategory);

  return (
    <section className="py-20 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-red-500">{t('titleHighlight')}</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:justify-between justify-center">
          {/* Left Side - Category Navigation */}
          <div className="space-y-6 w-full">
            <div className="md:hidden flex flex-wrap justify-center gap-2 pb-4">
              {projectCategories.map((category: ProjectCategory) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-2 rounded-full transition-all duration-300 min-w-fit text-center ${
                    activeCategory === category.id
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs sm:text-sm font-medium leading-tight">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="hidden md:flex md: flex-col space-y-3">
              {projectCategories.map((category: ProjectCategory) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-fit text-4xl p-4 lg:p-6 rounded-lg transition-all duration-300 ${
                    activeCategory === category.id
                      ? ' text-red-500 '
                      : ' text-gray-600 hover:text-red-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-base lg:text-4xl font-semibold w-fit">{category.name}</h3>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side - Stack Component */}
          <div className="flex flex-col items-center justify-center ml-0 md:mr-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mb-8"
              >
                <Stack
                  randomRotation={true}
                  
                  sensitivity={180}
                  sendToBackOnClick={true}
                  cardDimensions={{ width: 300, height: 300 }}
                  cardsData={currentCategory?.images || []}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Explore Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              <Link href="/services">
              <button className="bg-red-500 mt-5 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                {t('exploreNow')}
              </button></Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;