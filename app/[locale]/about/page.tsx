/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useRef, useEffect } from 'react'
import DiscoverVision from '@/components/about/DiscoverVision'
import Cards from '@/components/about/Cards'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { useTranslations } from 'next-intl';
import BlogInsights from '@/components/home/BlogInsights';
import SocialProof from '@/components/home/SocialProof';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatsAppButton from '@/components/contact/WhatsAppButton';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const t = useTranslations('HomePage.partnersHeaders');
  const t2 = useTranslations('AboutPage');
  
  // Refs for GSAP animations
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    const ctaButton = ctaButtonRef.current;
    
    if (ctaSection && ctaButton) {
      // Set initial states
      gsap.set([ctaSection, ctaButton], { 
        opacity: 0, 
        y: 50 
      });
      
      // Split text into characters for letter animation
      const buttonText = ctaButton.querySelector('.button-text');
      if (buttonText) {
        const text = buttonText.textContent || '';
        const chars = text.split('').map(char => 
          char === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${char}</span>`
        ).join('');
        buttonText.innerHTML = chars;
      }
      
      // Entrance animation triggered by scroll
      gsap.to(ctaSection, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Button entrance animation with slight delay
      gsap.to(ctaButton, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Hover animations
      const handleMouseEnter = () => {
        const buttonText = ctaButton.querySelector('.button-text');
        const buttonArrow = ctaButton.querySelector('.button-arrow');
        const shineEffect = ctaButton.querySelector('.shine-effect');
        
        // Button container animations
        gsap.to(ctaButton, {
          scale: 1.05,
          rotation: 2,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Enhanced glow effect
        gsap.to(ctaButton, {
          boxShadow: "0 20px 40px rgba(255, 255, 255, 0.4)",
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Text animation - character stagger effect
        if (buttonText) {
          const chars = buttonText.querySelectorAll('.char');
          
          gsap.to(buttonText, {
            y: -2,
            scale: 1.02,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
          
          // Staggered character animation
          gsap.fromTo(chars, 
            { y: 0, scale: 1 },
            {
              y: -3,
              scale: 1.1,
              duration: 0.2,
              ease: "power2.out",
              stagger: {
                amount: 0.1,
                from: "start"
              }
            }
          );
        }
        
        // Arrow animation - slide and rotate
        if (buttonArrow) {
          gsap.to(buttonArrow, {
            x: 10,
            rotation: 0,
            scale: 1.6,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        }
        
        // Shine effect activation
        if (shineEffect) {
          gsap.fromTo(shineEffect, 
            { x: '-100%', opacity: 0 },
            { 
              x: '100%', 
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut"
            }
          );
        }
        
        // Add continuous subtle pulsing effect
        gsap.to(ctaButton, {
          boxShadow: "0 25px 50px rgba(255, 255, 255, 0.6)",
          duration: 0.8,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
      };
      
      const handleMouseLeave = () => {
        const buttonText = ctaButton.querySelector('.button-text');
        const buttonArrow = ctaButton.querySelector('.button-arrow');
        
        // Button container reset
        gsap.to(ctaButton, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(ctaButton, {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Kill the pulsing animation
        gsap.killTweensOf(ctaButton, "boxShadow");
        
        // Text reset with character animation
        if (buttonText) {
          const chars = buttonText.querySelectorAll('.char');
          
          gsap.to(buttonText, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Reset character animations
          gsap.to(chars, {
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            stagger: {
              amount: 0.1,
              from: "end"
            }
          });
        }
        
        // Arrow reset
        if (buttonArrow) {
          gsap.to(buttonArrow, {
            x: 1,
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Magnetic effect - button follows cursor slightly
        gsap.to(ctaButton, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const handleClick = () => {
        // Click animation
        gsap.to(ctaButton, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      };
      
      // Add event listeners
      ctaButton.addEventListener('mouseenter', handleMouseEnter);
      ctaButton.addEventListener('mouseleave', handleMouseLeave);
      ctaButton.addEventListener('mousemove', handleMouseMove);
      ctaButton.addEventListener('click', handleClick);
      
      // Cleanup
      return () => {
        ctaButton.removeEventListener('mouseenter', handleMouseEnter);
        ctaButton.removeEventListener('mouseleave', handleMouseLeave);
        ctaButton.removeEventListener('mousemove', handleMouseMove);
        ctaButton.removeEventListener('click', handleClick);
        
        // Kill ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  return (
    
    <main className='bg-gray-50'>
      <DiscoverVision />
      <Cards />
      
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center p-5 ">{t('title')} <span className="text-red-500">{t('titleHighlight')}</span></h1>
      <div className=' overflow-hidden'>
      <InfiniteMovingCards
        direction="right"
        speed="normal"
        pauseOnHover
        items={[
          {
            src: "/clients/partner1.png",
            alt: "Partner 1",
            name: "Partner 1",
          },
          {
            src: "/clients/partner2.png",
            alt: "Partner 2",
            name: "Partner 2",
          },
          {
            src: "/clients/partner3.png",
            alt: "Partner 1",
            name: "Partner 3",
          },
          {
            src: "/clients/partner4.png",
            alt: "Partner 2",
            name: "Partner 4",
          },
          {
            src: "/clients/partner5.png",
            alt: "Partner 1",
            name: "Partner 5",
          },
          {
            src: "/clients/partner1.png",
            alt: "Partner 2",
            name: "Partner 6",
          },
          {
            src: "/clients/partner2.png",
            alt: "Partner 1",
            name: "Partner 7",
          },
          {
            src: "/clients/partner3.png",
            alt: "Partner 2",
            name: "Partner 8",
          },
          {
            src: "/clients/partner4.png",
            alt: "Partner 1",
            name: "Partner 9",
          },
          {
            src: "/clients/partner5.png",
            alt: "Partner 2",
            name: "Partner 10",
          },
          {
            src: "/clients/partner1.png",
            alt: "Partner 1",
            name: "Partner 11",
          },
          {
            src: "/clients/partner2.png",
            alt: "Partner 2",
            name: "Partner 12",
          },
        ]}
      />
        
 
      <div className='h-10'/>
    </div>
    <div className='h-10'/>
    <BlogInsights />
    <SocialProof />
    {/* CTA Section with GSAP Animations */}
    <div 
      ref={ctaSectionRef}
      className="w-[80%] mx-auto bg-gradient-to-b from-red-900 via-red-800 to-red-900 rounded-3xl overflow-hidden shadow-2xl my-16 relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="relative mx-auto px-6 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {t2('readyToWorkTogether')}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t2('letsCreateSomethingAmazing')}
        </p>
        <Link 
          ref={ctaButtonRef}
          href="/contact" 
          className="inline-block bg-white text-red-600 font-bold px-10 py-5 rounded-full text-lg shadow-lg relative overflow-hidden group cursor-pointer"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Enhanced shine effect */}
          <span className="shine-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0"></span>
          
          {/* Button content container */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {/* Animated text */}
            <span className="button-text inline-block font-bold tracking-wide">
              {t2('startYourProject')}
            </span>
            
            {/* Animated arrow with container */}
            <span className="button-arrow inline-block">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </span>
          
          {/* Animated border effect */}
          <span className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </Link>
      </div>
    </div>
    
    {/* WhatsApp Button */}
    <WhatsAppButton />
    </main>
  )
}

export default AboutPage