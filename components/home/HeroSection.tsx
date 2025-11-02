"use client";

import { useTranslations } from "next-intl";
import React from "react";
import CounterCards from "./CounterCards";
import Link from "next/link";
import { useLocale } from "next-intl";
import CustomBtn from "../ui/customBtn";
import RotatingText from "@/comps/TextAnimations/RotatingText/RotatingText";

const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const tSocialProof = useTranslations("HomePage.socialProof");
  const locale = useLocale();

  return (
    <div className="relative min-h-screen w-full bg-[#2A2A2A] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-pattern w-full h-full"></div>
      </div>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0">
        {/* Blob 1 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Blob 2 */}
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Blob 3 */}
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-600/25 to-cyan-600/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Blob 4 - Moving blob */}
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-pink-900/10 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-6xl">
          {/* Main Content */}
          <div className="mb-16">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold leading-tight text-white">
              {t("mainText")}{" "}
              <RotatingText
                texts={[
                  t("services.graphicDesign"),
                  t("services.printing"),
                  t("services.webDevelopment"),
                  t("services.socialMedia"),
                  t("services.3dInstallations"),
                  t("services.paidAds"),
                  t("services.seo"),
                ]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-slate-200 text-red-600 overflow-hidden mt-2 justify-center inline-block"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 700 }}
                rotationInterval={4000}
              />
            </h1>
            
            {/* Subtitle */}
            <div className="mb-8">
              <span className="text-red-500 text-lg md:text-xl font-semibold tracking-wider uppercase">
                {t('subtitle')}
              </span>
            </div>
            
            {/* CTA Button */}
            <div className="mb-6 relative ml-10 md:ml-8" >
              <CustomBtn />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 md:mt-16">
            {/* Card 1 - Crazy Morphing Card */}
            <div className="animate-slide-up-1 group crazy-morph-card hover:animate-crazy-shake active:scale-95 transition-all duration-700 ease-out bg-gradient-to-br from-white/5 via-red-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-gradient-to-tr hover:from-red-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/30 cursor-pointer overflow-hidden relative animate-float-crazy">
              {/* Crazy Background Effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-pink-500/20 animate-crazy-gradient"></div>
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-500/30 rounded-full animate-crazy-orbit"></div>
                <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-purple-500/30 rounded-full animate-crazy-orbit-reverse"></div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-500 mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 animate-counter-up crazy-number-bounce">
                  50+
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1 group-hover:text-red-100 transition-colors duration-300 animate-text-wave">
                  {tSocialProof('deliveringResults')}
                </div>
                <div className="text-gray-300 text-xs lg:text-sm group-hover:text-gray-200 transition-colors duration-300 animate-text-wave-delay">
                  {tSocialProof('deliveringResultsSubtitle')}
                </div>
              </div>
            </div>

            {/* Card 2 - Spinning Vortex Card */}
            <div className="animate-slide-up-2 group crazy-spin-card hover:animate-crazy-wiggle active:scale-95 transition-all duration-700 ease-out bg-gradient-to-br from-white/5 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-gradient-to-tr hover:from-blue-500/20 hover:via-cyan-500/20 hover:to-green-500/20 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer overflow-hidden relative animate-bounce-crazy">
              {/* Spinning Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border-4 border-blue-500/20 border-t-blue-500/60 rounded-full animate-crazy-spin"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-500/20 border-r-cyan-500/60 rounded-full animate-crazy-spin-reverse"></div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-500 mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-500 animate-counter-up delay-200 crazy-number-spin">
                  100+
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1 group-hover:text-blue-100 transition-colors duration-300 animate-text-wave">
                  {tSocialProof('projectsCompleted')}
                </div>
                <div className="text-gray-300 text-xs lg:text-sm group-hover:text-gray-200 transition-colors duration-300 animate-text-wave-delay">
                  {tSocialProof('projectsSubtitle')}
                </div>
              </div>
            </div>

            {/* Card 3 - Simple Star Card */}
            <div className="animate-slide-up-3 group hover:scale-105 active:scale-95 transition-all duration-500 ease-out bg-gradient-to-br from-white/5 via-yellow-500/5 to-orange-500/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-gradient-to-tr hover:from-yellow-500/10 hover:via-orange-500/10 hover:to-red-500/10 hover:border-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/20 cursor-pointer sm:col-span-2 md:col-span-1 overflow-hidden relative">
              {/* Simple Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-yellow-400/20 rounded-full blur-xl"></div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-500 mb-1 sm:mb-2 flex items-center justify-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-orange-400 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-500 animate-counter-up delay-400">
                  5<span className="text-yellow-400 ml-1 group-hover:scale-110 transition-transform duration-300">★</span>
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1 group-hover:text-yellow-100 transition-colors duration-300">
                  {tSocialProof('clientsRating')}
                </div>
                <div className="text-gray-300 text-xs lg:text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {tSocialProof('clientsSubtitle')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations and grid pattern */}
      <style jsx>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
          background-size: 300px 300px;
          background-position: 0 0, 0 0;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        
        @keyframes colorShift {
          0%, 100% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
        }
        
        @keyframes slideUp {
          0% { 
            opacity: 0; 
            transform: translateY(60px) scale(0.9);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes counterUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.8);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-color-shift {
          animation: colorShift 8s ease-in-out infinite;
        }
        
        .animate-slide-up-1 {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-2 {
          animation: slideUp 0.8s ease-out 0.4s both;
        }
        
        .animate-slide-up-3 {
          animation: slideUp 0.8s ease-out 0.6s both;
        }
        
        .animate-counter-up {
          animation: counterUp 0.6s ease-out 0.8s both;
        }
        
        .animate-counter-up.delay-200 {
          animation: counterUp 0.6s ease-out 1.0s both;
        }
        
        .animate-counter-up.delay-400 {
          animation: counterUp 0.6s ease-out 1.2s both;
        }
        
        /* CRAZY ANIMATIONS START HERE! 🔥 */
        
        @keyframes crazyShake {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          10% { transform: translate(-2px, -2px) rotate(-2deg) scale(1.02); }
          20% { transform: translate(2px, -2px) rotate(2deg) scale(0.98); }
          30% { transform: translate(-2px, 2px) rotate(-1deg) scale(1.03); }
          40% { transform: translate(2px, 2px) rotate(1deg) scale(0.97); }
          50% { transform: translate(-1px, -1px) rotate(-3deg) scale(1.01); }
          60% { transform: translate(1px, -1px) rotate(3deg) scale(0.99); }
          70% { transform: translate(-1px, 1px) rotate(-2deg) scale(1.02); }
          80% { transform: translate(1px, 1px) rotate(2deg) scale(0.98); }
          90% { transform: translate(-1px, 0) rotate(-1deg) scale(1.01); }
        }
        
        @keyframes crazyWiggle {
          0%, 100% { transform: skew(0deg) scale(1); }
          25% { transform: skew(5deg) scale(1.05); }
          50% { transform: skew(-5deg) scale(0.95); }
          75% { transform: skew(3deg) scale(1.02); }
        }
        
        @keyframes crazyExplode {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        
        @keyframes floatCrazy {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(5px) rotate(2deg); }
          50% { transform: translateY(-25px) translateX(-3px) rotate(-1deg); }
          75% { transform: translateY(-10px) translateX(7px) rotate(3deg); }
        }
        
        @keyframes bounceCrazy {
          0%, 100% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-20px) scale(1.1); }
          50% { transform: translateY(-35px) scale(0.9); }
          75% { transform: translateY(-15px) scale(1.05); }
        }
        
        @keyframes pulseCrazy {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          25% { transform: scale(1.15) rotate(90deg); opacity: 0.8; }
          50% { transform: scale(0.85) rotate(180deg); opacity: 1; }
          75% { transform: scale(1.25) rotate(270deg); opacity: 0.9; }
        }
        
        @keyframes crazyGradient {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes crazyOrbit {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        
        @keyframes crazyOrbitReverse {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(25px) rotate(360deg); }
        }
        
        @keyframes crazySpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes crazySpinReverse {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-180deg) scale(0.8); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        
        @keyframes crazyStarSpin {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.5); }
          50% { transform: rotate(180deg) scale(0.5); }
          75% { transform: rotate(270deg) scale(1.8); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes starTwinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        
        @keyframes textWave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes numberBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(5deg); }
        }
        
        @keyframes numberSpin {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.2); }
          100% { transform: rotateY(360deg) scale(1); }
        }
        
        @keyframes numberExplode {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.4) rotate(10deg); }
          50% { transform: scale(0.8) rotate(-10deg); }
          75% { transform: scale(1.2) rotate(5deg); }
        }
        
        /* Explosion particles */
        @keyframes explode1 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-200px, -200px) scale(1); opacity: 0; }
        }
        
        @keyframes explode2 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(200px, -200px) scale(1); opacity: 0; }
        }
        
        @keyframes explode3 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-200px, 200px) scale(1); opacity: 0; }
        }
        
        @keyframes explode4 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(200px, 200px) scale(1); opacity: 0; }
        }
        
        @keyframes explode5 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-150px, 0px) scale(1); opacity: 0; }
        }
        
        @keyframes explode6 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(150px, 0px) scale(1); opacity: 0; }
        }
        
        /* Apply crazy animations */
        .animate-crazy-shake:hover {
          animation: crazyShake 0.5s ease-in-out infinite;
        }
        
        .animate-crazy-wiggle:hover {
          animation: crazyWiggle 0.6s ease-in-out infinite;
        }
        
        .animate-crazy-explode:hover {
          animation: crazyExplode 0.8s ease-in-out infinite;
        }
        
        .animate-float-crazy {
          animation: floatCrazy 4s ease-in-out infinite;
        }
        
        .animate-bounce-crazy {
          animation: bounceCrazy 3s ease-in-out infinite;
        }
        
        .animate-pulse-crazy {
          animation: pulseCrazy 2s ease-in-out infinite;
        }
        
        .animate-crazy-gradient {
          animation: crazyGradient 2s linear infinite;
        }
        
        .animate-crazy-orbit {
          animation: crazyOrbit 3s linear infinite;
        }
        
        .animate-crazy-orbit-reverse {
          animation: crazyOrbitReverse 4s linear infinite;
        }
        
        .animate-crazy-spin {
          animation: crazySpin 2s linear infinite;
        }
        
        .animate-crazy-spin-reverse {
          animation: crazySpinReverse 3s linear infinite;
        }
        
        .animate-crazy-star-spin {
          animation: crazyStarSpin 1s ease-in-out infinite;
        }
        
        .animate-star-twinkle {
          animation: starTwinkle 1.5s ease-in-out infinite;
        }
        
        .animate-text-wave {
          animation: textWave 2s ease-in-out infinite;
        }
        
        .animate-text-wave-delay {
          animation: textWave 2s ease-in-out infinite 0.3s;
        }
        
        .crazy-number-bounce {
          animation: numberBounce 3s ease-in-out infinite;
        }
        
        .crazy-number-spin {
          animation: numberSpin 4s ease-in-out infinite;
        }
        
        .crazy-number-explode {
          animation: numberExplode 2s ease-in-out infinite;
        }
        
        .animate-explode-1 {
          animation: explode1 1s ease-out infinite;
        }
        
        .animate-explode-2 {
          animation: explode2 1s ease-out infinite 0.1s;
        }
        
        .animate-explode-3 {
          animation: explode3 1s ease-out infinite 0.2s;
        }
        
        .animate-explode-4 {
          animation: explode4 1s ease-out infinite 0.3s;
        }
        
        .animate-explode-5 {
          animation: explode5 1s ease-out infinite 0.4s;
        }
        
        .animate-explode-6 {
          animation: explode6 1s ease-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
