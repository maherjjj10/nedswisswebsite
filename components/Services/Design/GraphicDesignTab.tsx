"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WebDevelopmentTab = () => {
  const t = useTranslations("Services.GraphicDesign");
  const [activeTab, setActiveTab] = useState("flyers");
  
  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const websiteDesignRef = useRef<HTMLDivElement>(null);
  const systemDevRef = useRef<HTMLDivElement>(null);
  const expertisesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Header text animation - Split text effect
    const headerTitle = headerRef.current?.querySelector('h1');
    if (headerTitle) {
      const text = headerTitle.textContent || '';
      headerTitle.innerHTML = text.split(' ').map(word => 
        `<span class="word">${word.split('').map(char => 
          `<span class="char" style="display: inline-block;">${char}</span>`
        ).join('')}</span>`
      ).join(' ');

      gsap.fromTo(
        headerTitle.querySelectorAll('.char'),
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
        }
      );
    }

    // Website Design section animation
    if (websiteDesignRef.current) {
      // Animate section titles with typewriter effect
      const sectionTitles = websiteDesignRef.current.querySelectorAll('h2, h3');
      sectionTitles.forEach((title) => {
        const text = title.textContent || '';
        title.innerHTML = text.split('').map(char => 
          `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        gsap.to(title.querySelectorAll('span'), {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Animate list items with slide-in effect
      const listItems = websiteDesignRef.current.querySelectorAll('li');
      gsap.fromTo(
        listItems,
        { opacity: 0, x: -30, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: websiteDesignRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate paragraphs with fade-in effect
      const paragraphs = websiteDesignRef.current.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: websiteDesignRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // System Development section animation
    if (systemDevRef.current) {
      // Animate section titles with glitch effect
      const sectionTitles = systemDevRef.current.querySelectorAll('h2, h3');
      sectionTitles.forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, scaleY: 0, skewX: 15 },
          {
            opacity: 1,
            scaleY: 1,
            skewX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate list items with bounce effect
      const listItems = systemDevRef.current.querySelectorAll('li');
      gsap.fromTo(
        listItems,
        { opacity: 0, x: 50, rotation: 5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: systemDevRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate paragraphs with slide-up effect
      const paragraphs = systemDevRef.current.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: systemDevRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Expertises section animation
    if (expertisesRef.current) {
      // Animate main title with simple slide-up and fade-in
      const mainTitle = expertisesRef.current.querySelector('h2');
      if (mainTitle) {
        gsap.fromTo(
          mainTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mainTitle,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate tab buttons with simple slide-up and fade-in
      const tabButtons = expertisesRef.current.querySelectorAll('button');
      gsap.fromTo(
        tabButtons,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: expertisesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Floating animation for images
    gsap.to(".floating-image", {
      y: "-20px",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Tab switch animation
    const tabContent = container.querySelectorAll(".tab-content");
    tabContent.forEach((content) => {
      gsap.set(content, { opacity: 0, y: 30 });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Animate tab content when switching with text animations
    const activeContent = containerRef.current?.querySelector('.tab-content.active');
    if (activeContent) {
      // Animate container
      gsap.fromTo(
        activeContent,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // Animate titles with split text
      const titles = activeContent.querySelectorAll('h3, h4, h5');
      titles.forEach((title, index) => {
        const text = title.textContent || '';
        title.innerHTML = text.split('').map(char => 
          `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        gsap.to(title.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          duration: 0.03,
          stagger: 0.02,
          delay: 0.3 + (index * 0.1),
          ease: "power2.out",
        });
      });

      // Animate list items with cascade effect
      const listItems = activeContent.querySelectorAll('li');
      gsap.fromTo(
        listItems,
        { opacity: 0, x: -20, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.5,
          ease: "back.out(1.7)",
        }
      );

      // Animate paragraphs with fade and blur
      const paragraphs = activeContent.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        { opacity: 0, filter: "blur(3px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.2,
          delay: 0.4,
          ease: "power2.out",
        }
      );

      // Animate technology items with random entrance
      const techItems = activeContent.querySelectorAll('.grid > div');
      gsap.fromTo(
        techItems,
        { 
          opacity: 0, 
          scale: 0.8,
          rotation: () => gsap.utils.random(-15, 15)
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.7,
          ease: "elastic.out(1, 0.8)",
        }
      );
    }
  }, [activeTab]);

  return (
    <div ref={containerRef} className="bg-[#424242] text-white min-h-screen">
      {/* Header Section */}
      <div ref={headerRef} className="text-center py-8 md:py-16 px-4 md:px-6">
        <p className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight text-center mx-auto break-words hyphens-auto overflow-wrap-anywhere whitespace-normal">
          {t('header.title')}
        </p>
      </div>

      {/* Website Design Section */}
      <div className="px-4 md:px-6 py-8 md:py-12">
        <div ref={websiteDesignRef} className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="text-left mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 break-words hyphens-auto overflow-wrap-anywhere whitespace-normal">
              {t('websiteDesign.title')}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl break-words hyphens-auto word-wrap overflow-wrap-anywhere">
              {t('websiteDesign.description')}
            </p>
          </div>

          {/* Two Column Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 break-words hyphens-auto">
                  {t('websiteDesign.workIncludes.title')}
                </h3>
                <ul className="space-y-2 md:space-y-3 text-gray-300 text-lg sm:text-xl md:text-2xl">
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('websiteDesign.workIncludes.items.ecommerce')}
                  </li>
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0 "></div>
                    {t('websiteDesign.workIncludes.items.restaurant')}
                  </li>
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('websiteDesign.workIncludes.items.landing')}
                  </li>
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('websiteDesign.workIncludes.items.corporate')}
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white group mt-6 md:mt-20 hover:bg-red-600 backdrop-blur-sm text-red-600 hover:text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/30 flex items-center space-x-2 w-fit"
              >
                <span className="text-red-500 group-hover:text-white text-lg sm:text-xl">
                  ✦
                </span>
                <span className="break-words hyphens-auto">{t('websiteDesign.cta.text')}</span>
              </motion.button>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <Image
                src="/gdp.jpg"
                alt="Website Design"
                width={400}
                height={500}
                className="floating-image w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Development Section */}
      <div className="px-4 md:px-6 py-8 md:py-12">
        <div ref={systemDevRef} className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="text-left mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 break-words hyphens-auto overflow-wrap-anywhere whitespace-normal">
              {t('systemDevelopment.title')}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl break-words hyphens-auto">
              {t('systemDevelopment.description')}
            </p>
          </div>

          {/* Two Column Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 break-words hyphens-auto">
                  {t('systemDevelopment.workIncludes.title')}
                </h3>
                <ul className="space-y-2 md:space-y-3 text-gray-300 text-lg sm:text-xl md:text-2xl">
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('systemDevelopment.workIncludes.items.crm')}
                  </li>
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('systemDevelopment.workIncludes.items.hr')}
                  </li>
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('systemDevelopment.workIncludes.items.inventory')}
                  </li>
                  <li className="flex items-center break-words hyphens-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {t('systemDevelopment.workIncludes.items.booking')}
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white group mt-6 md:mt-20 hover:bg-red-600 backdrop-blur-sm text-red-600 hover:text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/30 flex items-center space-x-2 w-fit"
              >
                <span className="text-red-500 group-hover:text-white text-lg sm:text-xl">
                  ✦
                </span>
                <span className="break-words hyphens-auto">{t('systemDevelopment.cta.text')}</span>
              </motion.button>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <Image
                src="/offset.jpg"
                alt="System Development"
                width={400}
                height={500}
                className="floating-image w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expertises Section */}
      <div className="px-4 md:px-6 py-8 md:py-16">
        <div ref={expertisesRef} className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-left break-words hyphens-auto overflow-wrap-anywhere whitespace-normal">
            {t('expertises.title')}
          </h2>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8 mb-8 md:mb-16">
            <button
              onClick={() => setActiveTab("businessCards")}
              className={`text-lg sm:text-xl md:text-2xl font-bold px-4 md:px-6 py-2 rounded-full transition-all duration-300 w-full sm:w-auto break-words hyphens-auto ${
                activeTab === "businessCards"
                  ? "text-red-500 bg-white/10"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {t('expertises.tabs.businessCards')}
            </button>
            <button
              onClick={() => setActiveTab("flyers")}
              className={`text-lg sm:text-xl md:text-2xl font-bold px-4 md:px-6 py-2 rounded-full transition-all duration-300 w-full sm:w-auto break-words hyphens-auto ${
                activeTab === "flyers"
                  ? "text-red-500 bg-white/10"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {t('expertises.tabs.flyers')}
            </button>
            <button
              onClick={() => setActiveTab("logo")}
              className={`text-lg sm:text-xl md:text-2xl font-bold px-4 md:px-6 py-2 rounded-full transition-all duration-300 w-full sm:w-auto break-words hyphens-auto ${
                activeTab === "logo"
                  ? "text-red-500 bg-white/10"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {t('expertises.tabs.logo')}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px] md:min-h-[600px]">
            {activeTab === "businessCards" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-4 md:p-8 tab-content active"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-left break-words hyphens-auto">
                  {t('expertises.businessCards.title')}
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 break-words hyphens-auto">
                  {t('expertises.businessCards.description')}
                </p>

                <div className="rounded-xl mb-6 md:mb-8 w-full flex justify-center items-center">
                  <Image
                    src="/buisnessCards.png"
                    alt="Business Cards"
                    width={600}
                    height={200}
                    className="rounded-lg w-full max-w-2xl h-auto"
                  />
                </div>

                <div className="text-left">
                  <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 break-words hyphens-auto">
                    {t('expertises.businessCards.subtitle')}
                  </h4>
                  <h5 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 max-w-4xl break-words hyphens-auto">
                    {t('expertises.businessCards.mainOffer.title')}
                  </h5>
                  <ul className="space-y-2 text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                    <li className="break-words hyphens-auto">{t('expertises.businessCards.mainOffer.items.0')}</li>
                    <li className="break-words hyphens-auto">{t('expertises.businessCards.mainOffer.items.1')}</li>
                  </ul>
                  
                  <h5 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 max-w-4xl break-words hyphens-auto">
                    {t('expertises.businessCards.offerConditions.title')}
                  </h5>
                  <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                    {t('expertises.businessCards.offerConditions.description')}
                  </p>
                  <h5 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 max-w-4xl break-words hyphens-auto">
                    {t('expertises.businessCards.contactDetails.title')}
                  </h5>
                  <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                    {t('expertises.businessCards.contactDetails.description')}
                  </p>
                  
                  <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                    {t('expertises.businessCards.footer.description')}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "flyers" && (
             <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="rounded-2xl p-4 md:p-8 tab-content active"
           >
             <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-left break-words hyphens-auto">
               {t('expertises.businessCards.title')}
             </h3>
             <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 break-words hyphens-auto">
               {t('expertises.businessCards.description')}
             </p>

             <div className="rounded-xl mb-6 md:mb-8 w-full flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8">
               <Image
                 src="/flyer1.jpg"
                 alt="Flyer Design 1"
                 width={400}
                 height={200}
                 className="rounded-lg w-full max-w-sm h-auto"
               />
               <Image
                 src="/flyer2.jpg"
                 alt="Flyer Design 2"
                 width={400}
                 height={200}
                 className="rounded-lg w-full max-w-sm h-auto"
               />
             </div>

             <div className="text-left">
               <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 break-words hyphens-auto">
                 {t('expertises.businessCards.subtitle')}
               </h4>
               <h5 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 max-w-4xl break-words hyphens-auto">
                 {t('expertises.businessCards.mainOffer.title')}
               </h5>
               <ul className="space-y-2 text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                 <li className="break-words hyphens-auto">{t('expertises.businessCards.mainOffer.items.0')}</li>
                 <li className="break-words hyphens-auto">{t('expertises.businessCards.mainOffer.items.1')}</li>
               </ul>
               
               <h5 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 max-w-4xl break-words hyphens-auto">
                 {t('expertises.businessCards.offerConditions.title')}
               </h5>
               <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                 {t('expertises.businessCards.offerConditions.description')}
               </p>
               <h5 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 max-w-4xl break-words hyphens-auto">
                 {t('expertises.businessCards.contactDetails.title')}
               </h5>
               <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                 {t('expertises.businessCards.contactDetails.description')}
               </p>
               
               <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                 {t('expertises.businessCards.footer.description')}
               </p>
             </div>
           </motion.div>
            )}
            {activeTab === "logo" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-4 md:p-8 tab-content active"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-left break-words hyphens-auto">
                  {t('expertises.logo.title')}
                </h3>
                <p className="text-gray-300 text-lg md:text-2xl mb-6 md:mb-8 break-words hyphens-auto">
                  {t('expertises.logo.description')}
                </p>
                <p className="text-gray-300 text-lg md:text-2xl max-w-4xl mb-6 break-words hyphens-auto">
                  {t('expertises.logo.subtitle')}
                </p>

                <div className="rounded-xl mb-6 md:-mb-24 w-full mx-auto">
                  <Image
                    src="/logoService.png"
                    alt="Logo Service"
                    width={800}
                    height={500}
                    className="rounded-lg w-full max-w-4xl h-auto mx-auto"
                  />
                </div>

                <div className="text-left md:-mt-20">
                  <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 break-words hyphens-auto">
                    {t('expertises.logo.subtitle2')}
                  </h4>
                  <ul className="space-y-2 text-gray-300 mb-4 md:mb-6 text-lg md:text-2xl">
                    <li className="break-words hyphens-auto">{t('expertises.logo.keyElements.items.0.title')}</li>
                    <li className="break-words hyphens-auto">{t('expertises.logo.keyElements.items.0.description')}</li>
                    <li className="break-words hyphens-auto">{t('expertises.logo.keyElements.items.1.title')}</li>
                    <li className="break-words hyphens-auto">{t('expertises.logo.keyElements.items.1.description')}</li>
                  </ul>
                  <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 break-words hyphens-auto">
                    {t('expertises.logo.footer.title')}
                  </h4>
                  <p className="text-gray-300 text-lg md:text-xl mb-6 md:mb-8 max-w-4xl break-words hyphens-auto">
                    {t('expertises.logo.footer.description')}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopmentTab;
