'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Palette, Code, Smartphone, Search, Settings, Megaphone } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface SplashScreenProps {
  finishLoading: () => void;
}

export default function SplashScreen({ finishLoading }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const t = useTranslations('SplashScreen')
  
  // Set viewport size on client side
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateViewportSize()
    window.addEventListener('resize', updateViewportSize)
    
    return () => window.removeEventListener('resize', updateViewportSize)
  }, [])

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    
    setIsFadingOut(true)
    setTimeout(finishLoading, 1000) // Increased delay to match slide animation
  }

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFadingOut(true)
        setTimeout(finishLoading, 1000) // Increased delay to match slide animation
      }
    })
    
    timelineRef.current = tl

    // Extended animation sequence with longer durations
    tl.to('.logo-container', { opacity: 1, duration: 1, ease: "power2.out" })
      .to('.logo-text', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5")
      .to('.tagline', { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3")
      .to('.loading-bar-fill', { width: '100%', duration: 3, ease: "power1.inOut" }, "-=0.2")
      // Staggered service icons with longer delays
      .to(['.service-icon-1', '.service-icon-2'], { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=2.5")
      .to(['.service-icon-3', '.service-icon-4'], { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=2")
      .to(['.service-icon-5', '.service-icon-6'], { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=1.5")
      // Add a pause to appreciate the icons
      .to({}, { duration: 1 })
      .to('.est-badge', { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }, "-=0.5")
      // Another pause before showing skip hint
      .to({}, { duration: 1.5 })
      .to('.skip-hint', { opacity: 1, duration: 0.5 })
      // Final pause before auto-completion
      .to({}, { duration: 2 })
      
    // Floating animation for service icons with longer intervals
    const servicesTl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    
    servicesTl.to('.floating-icon', { 
      y: -15,
      rotation: 3,
      duration: 3, 
      ease: "sine.inOut",
      stagger: 0.3
    })
    .to('.floating-icon', { 
      y: 0,
      rotation: -3,
      duration: 3, 
      ease: "sine.inOut",
      stagger: 0.3
    })

    // Pulse animation for digital elements with longer cycles
    const digitalTl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
    
    digitalTl.fromTo('.digital-element', 
      { scale: 1, opacity: 0.7 },
      { scale: 1.1, opacity: 1, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: 0.4 }
    )

    // Additional background elements animation
    const backgroundTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
    
    backgroundTl.to('.grid-pattern', {
      opacity: 0.15,
      duration: 2,
      ease: "sine.inOut"
    })
    .to('.grid-pattern', {
      opacity: 0.05,
      duration: 2,
      ease: "sine.inOut"
    })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      servicesTl.kill()
      digitalTl.kill()
      backgroundTl.kill()
    }
  }, [finishLoading])

  if (!isVisible && !isFadingOut) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center bg-[#2A2A2A] cursor-pointer pointer-events-auto"
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: isFadingOut ? 1 : 1,
        y: isFadingOut ? "-100%" : 0
      }}
      transition={{ 
        duration: isFadingOut ? 1 : 0.7, 
        ease: isFadingOut ? [0.4, 0, 0.2, 1] : "easeInOut"
      }}
      onClick={handleSkip}
      onAnimationComplete={() => {
        if (isFadingOut) {
          setIsVisible(false)
        }
      }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern w-full h-full"></div>
      </div>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0, 0.8, 0.6],
            scale: [0.8, 1, 0.9],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 8, repeatType: "reverse" }}
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0) 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        <motion.div 
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.8, 1, 0.9],
            rotate: [0, -10, 0]
          }}
          transition={{ repeat: Infinity, duration: 10, repeatType: "reverse", delay: 1 }}
          className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, rgba(168,85,247,0) 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Decorative lines */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.3, width: "25%" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-1/4 left-5 h-[2px] bg-red-500"
        />
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.3, width: "20%" }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-1/4 right-5 h-[2px] bg-purple-500"
        />
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 0.3, height: "15%" }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute top-1/2 left-1/4 w-[2px] bg-blue-500"
        />
        
        {/* Digital elements floating in background */}
        <div className="absolute bottom-[25%] left-[10%] right-[10%] flex justify-center space-x-16 opacity-5">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="digital-element relative">
              <div className="w-16 h-20 border-2 border-red-500/30 rounded-lg relative">
                <div className="absolute top-2 left-2 right-2 h-2 bg-red-500/20 rounded"></div>
                <div className="absolute top-6 left-2 right-2 h-1 bg-red-500/15 rounded"></div>
                <div className="absolute top-8 left-2 right-2 h-1 bg-red-500/15 rounded"></div>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Code size={16} className="text-red-500/50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        className="flex flex-col items-center justify-center relative z-10 bg-transparent"
        animate={{ 
          opacity: isFadingOut ? 0.8 : 1, 
          y: isFadingOut ? -20 : 0,
          scale: isFadingOut ? 0.95 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="logo-container opacity-0 mb-6 relative">
          <motion.div 
            className="relative flex items-center"
            animate={{
              x: isFadingOut ? -viewportSize.width / 2 + 100 : 0,
              y: isFadingOut ? -viewportSize.height / 2 + 80 : 0,
              scale: isFadingOut ? 0.6 : 1,
            }}
            transition={{ 
              duration: 1, 
              ease: [0.4, 0, 0.2, 1],
              delay: isFadingOut ? 0 : 0
            }}
          >
            <Image 
              src="/logo.png" 
              alt="NED Swiss" 
              width={120} 
              height={120}
              className="object-contain"
            />
          </motion.div>
        </div>
        
        <h1 
          className="logo-text text-4xl font-bold text-white opacity-0 transform translate-y-4 text-center"
          style={{ textShadow: '0 2px 10px rgba(239,68,68,0.3)' }}
        >
          <motion.span
            animate={{
              opacity: isFadingOut ? 0 : 1,
              y: isFadingOut ? -20 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            NED SWISS
          </motion.span>
        </h1>
        
        <p className="tagline text-red-500 text-lg mt-2 mb-6 opacity-0 text-center">
          <motion.span
            animate={{
              opacity: isFadingOut ? 0 : 1,
              y: isFadingOut ? -10 : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
          >
            {t('tagline')}
          </motion.span>
        </p>
        
        <div className="w-60 h-1 bg-gray-700 rounded-full overflow-hidden mb-8">
          <div className="loading-bar-fill h-full w-0 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
        </div>
        
        {/* Services Icons Grid */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <motion.div 
            className="service-icon-1 floating-icon opacity-0 transform translate-y-4 flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Palette size={24} className="text-red-500 mb-2" />
            <span className="text-white text-xs text-center">Design</span>
          </motion.div>
          
          <motion.div 
            className="service-icon-2 floating-icon opacity-0 transform translate-y-4 flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Code size={24} className="text-red-500 mb-2" />
            <span className="text-white text-xs text-center">Development</span>
          </motion.div>
          
          <motion.div 
            className="service-icon-3 floating-icon opacity-0 transform translate-y-4 flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Smartphone size={24} className="text-red-500 mb-2" />
            <span className="text-white text-xs text-center">Social Media</span>
          </motion.div>
          
          <motion.div 
            className="service-icon-4 floating-icon opacity-0 transform translate-y-4 flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Search size={24} className="text-red-500 mb-2" />
            <span className="text-white text-xs text-center">SEO</span>
          </motion.div>
          
          <motion.div 
            className="service-icon-5 floating-icon opacity-0 transform translate-y-4 flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Settings size={24} className="text-red-500 mb-2" />
            <span className="text-white text-xs text-center">Software</span>
          </motion.div>
          
          <motion.div 
            className="service-icon-6 floating-icon opacity-0 transform translate-y-4 flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Megaphone size={24} className="text-red-500 mb-2" />
            <span className="text-white text-xs text-center">Advertising</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="est-badge opacity-0 transform scale-0 px-4 py-2 bg-black/50 border border-red-500 rounded-full backdrop-blur-sm"
          whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }}
        >
          <span className="text-red-500 text-xs font-semibold">SWISS PRECISION SINCE 2020</span>
        </motion.div>
        
        <div className="skip-hint absolute bottom-10 left-0 right-0 text-center opacity-0">
          <p className="text-gray-400 text-xs">Click anywhere to skip</p>
        </div>
      </motion.div>

      {/* Custom CSS for grid pattern */}
      <style jsx>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: 0 0, 0 0;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </motion.div>
  )
} 