"use client"
import { useRef } from "react";
import AnimatedHeaderSection from "../AnimatedHeaderSection";
import { useMediaQuery } from "react-responsive";   
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ProcessStep, useProcessSteps, type DetailedService } from "@/data";
import { useTranslations } from "next-intl";

const Services = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); 
  const t = useTranslations('HomePage.processHeader');
  const servicesDataa = useProcessSteps();

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
     
     
    });
  }, [servicesDataa]); 

  useGSAP(() => {
    gsap.set("#services", {
      scale: 0.7,
      
    });
    gsap.to("#services", {
      scale: 1,
      scrollTrigger: {
        trigger: "#services",
        start: "top 90%",
        end: "top 40%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });
  }, []);

  
  return (
    <section id="services" className="min-h-screen rounded-t-4xl tracking-wide bg-[#252525]">
     <div className="px-6 pt-10 pb-4 lg:p-10 bg-[#252525] rounded-t-4xl">
          <h1 className="text-4xl pt-10 text-center lg:text-5xl font-bold text-white">{t('title')} <span className="text-red-500">{t('titleHighlight')}</span></h1>
     
     </div>
      {servicesDataa.map((service: ProcessStep, index: number) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el as never)}
          key={index}
          className="sticky-safe px-6 pt-4 pb-8 lg:px-10 lg:pt-6 lg:pb-12 text-red-500 border-t-2 border-gray-500 bg-[#252525] z-sticky"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 4}rem)`,
                  marginBottom: `${(servicesDataa.length - index - 1) * 4}rem`,
                  minHeight: '280px', // Consistent minimum height
                }
              : { 
                  top: 0,
                  minHeight: '250px' // Consistent height on mobile too
                }
          }
        >
          <div className="flex items-start justify-start gap-4 font-light h-full">
            <div className="flex justify-center gap-4 font-light h-full">
           
                <h1 className="text-4xl lg:text-5xl font-bold border-r-2 border-gray-200 pr-4 flex-shrink-0">
                  0{index + 1}
                </h1>
      
            <div className="flex flex-col gap-6 flex-1 max-w-4xl">
              <h2 className="text-3xl lg:text-4xl font-bold">{service.title}</h2>
              <div className="text-lg leading-relaxed tracking-wide lg:text-xl text-white">
                <p className="line-clamp-4 lg:line-clamp-none">
                  {service.description}
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
