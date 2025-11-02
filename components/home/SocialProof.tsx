'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestimonialsSimple } from '@/components/ui/testimonials-apple';

gsap.registerPlugin(ScrollTrigger);

const SocialProof = () => {
  const t = useTranslations('HomePage.socialProof');
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = t.raw('testimonials.items') as Array<{
    quote: string;
    author: string;
    position: string;
  }>;


  const formattedTestimonials = testimonials.map((testimonial) => ({
    quote: testimonial.quote,
    name: testimonial.author,
    role: testimonial.position,
  }));
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(testimonialsRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out"
      }, "-=0.3");
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-black">{t('title').split(' ')[0]} </span>
            <span className="text-red-600">{t('title').split(' ')[1]}</span>
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div ref={testimonialsRef} className="relative">
          <TestimonialsSimple 
            testimonials={formattedTestimonials}
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;