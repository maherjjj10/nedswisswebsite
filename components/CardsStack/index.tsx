'use client'
import Image from 'next/image';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

interface CardProps {
  i: number;
  title?: string;
  subtitle?: string;
  services?: string[];
  buttonText?: string;
  backgroundColor?: string;
  gradientColors?: string[];
  gradientDirection?: string;
  progress: import('framer-motion').MotionValue<number>;
  range: number[];
  targetScale: number;
  illustration?: string;
  translationKey?: string;
  laptopImage?: string;
  backgroundMask?: string;
}

const Card = ({
  i, 
  title, 
  subtitle, 
  services = [], 
  buttonText, 
  backgroundColor = "#dc2626", 
  gradientColors,
  gradientDirection = "135deg",
  progress, 
  range, 
  targetScale,
  illustration,
  translationKey,
  laptopImage,
  backgroundMask = "/mask-group.png"
}: CardProps) => {
  const t = useTranslations(translationKey || 'Services');
  
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Add skew based on even/odd index
  const skewY = i % 2 === 0 ? -1 : 1;

  // Use translations if translationKey is provided, otherwise use props
  const cardTitle = translationKey ? t('title') : title;
  const cardSubtitle = translationKey ? t('subtitle') : subtitle;
  const cardButtonText = translationKey ? t('buttonText') : (buttonText || 'Learn More');
  const cardServices = translationKey && t.has('services') 
    ? t.raw('services') as string[]
    : services;

  // Create gradient background style
  const getBackgroundStyle = () => {
    if (gradientColors && gradientColors.length >= 2) {
      return {
        background: `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`,
        scale,
        top: `calc(-5vh + ${i * 25}px)`,
      };
    }
    return {
      backgroundColor: backgroundColor,
      scale,
      top: `calc(-5vh + ${i * 25}px)`,
    };
  };

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky-safe top-0 z-sticky">
      <motion.div 
        style={getBackgroundStyle()}
        className="flex relative h-[500px] w-[370px] sm:h-[500px] sm:w-[500px] md:w-[1300px] md:h-[600px] rounded-[25px] overflow-hidden origin-top"
      >
        {/* Mobile Background Image - Only visible on mobile/tablet */}
        {(laptopImage || illustration) && (
          <div className="absolute inset-0 md:hidden">
            <Image 
              src={laptopImage || illustration || ''} 
              alt="Service background"
              fill
              className="object-cover object-center opacity-20"
              sizes="(max-width: 768px) 100vw, 0px"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}

        {/* Content Section - Full width on mobile, left side on desktop */}
        <div className="w-full md:flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative z-10">
          {/* Title */}
          <h2 className="text-white text-xl sm:text-2xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            {cardTitle}
          </h2>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-lg">
            {cardSubtitle}
          </p>

          {/* Services List */}
          {cardServices.length > 0 && (
            <div className="flex flex-col space-y-2 sm:space-y-4 mb-6 sm:mb-8">
              {cardServices.map((service, index) => (
                <div key={index} className="flex items-center text-white">
                  {/* Custom Checkmark */}
                  <div className="w-4 h-4 sm:w-6 sm:h-6 mr-3 sm:mr-4 flex-shrink-0 relative">
                    <svg 
                      width="100%" 
                      height="100%" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-white"
                    >
                      <path 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-lg md:text-xl font-medium">{service}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white group hover:bg-red-600 backdrop-blur-sm text-red-600 hover:text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/30 flex items-center space-x-2 w-fit"
          >
            <span className="text-red-500 group-hover:text-white text-lg sm:text-xl">✦</span>
            <span>{cardButtonText}</span>
          </motion.button>
        </div>

        {/* Desktop Illustration Section - Only visible on desktop */}
        <div className="hidden md:flex flex-1 relative items-center justify-center p-8">
          {/* Custom Illustration */}
          {illustration && (
            <div className="relative">
              <Image 
                src={illustration} 
                alt="Service illustration"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          )}

          {/* Laptop Image */}
          {laptopImage && (
            <div className="relative">
              <Image 
                src={laptopImage} 
                alt="Laptop illustration"
                width={500}
                height={350}
                className="object-contain transform perspective-1000"
                priority
              />
            </div>
          )}

          {/* Default placeholder if no images provided */}
          {!illustration && !laptopImage && (
            <div className="w-80 h-52 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white/60 text-lg">Image placeholder</span>
            </div>
          )}
        </div>

        {/* Background Pattern using mask-group.png */}
        
      </motion.div>
    </div>
  )
}

export default Card
export type { CardProps } 