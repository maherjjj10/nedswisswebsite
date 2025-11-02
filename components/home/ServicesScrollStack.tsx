'use client';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'

import { useServicesData, type ServiceItem } from '@/data';
import Card from '@/components/CardsStack';
import { useTranslations } from 'next-intl';

export default function ServicesScrollStack() {
  const container = useRef(null);
  const t = useTranslations('HomePage.servicesHeader');
  const services = useServicesData();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main ref={container} className="flex flex-col gap-10 items-center justify-center p-20" style={{ contain: 'layout' }}>
      <div className="flex flex-col gap-7 items-center justify-center max-w-7xl md:-mb-10 -mb-10 ">
        <h2 className="text-center text-3xl md:text-6xl sm:text-5xl font-bold tracking-wide ">{t('title')} <span className='text-red-600'> {t('titleHighlight')}</span> </h2>
      </div>
      {
        services.map( (service: ServiceItem, i: number) => {
          const targetScale = 1 - ( (services.length - i) * 0.05);
          return (
            <Card 
              key={`service_${i}`} 
              i={i} 
              title={service.title}
              subtitle={service.subtitle}
              services={service.services}
              buttonText={service.buttonText}
              backgroundColor={service.backgroundColor}
              gradientColors={service.gradientColors}
              gradientDirection={service.gradientDirection}
              laptopImage={service.laptopImage}
              backgroundMask={service.backgroundMask}
              progress={scrollYProgress} 
              range={[i * .025, 1]} 
              targetScale={targetScale}
            />
          );
        })
      }
    </main>
  )
}