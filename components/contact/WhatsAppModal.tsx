'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppModal = ({ isOpen, onClose }: WhatsAppModalProps) => {
  const t = useTranslations('WhatsApp');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Longer delay to ensure DOM is ready and create more dramatic entrance
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for exit animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close modal on escape key press and handle positioning
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      
      // Disable Lenis and all scroll behavior
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Stop any smooth scroll animations
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '41782601498'; 
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!shouldRender) return null;

  const modalContent = (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 z-[9999] transition-all duration-500 ease-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        minHeight: '100vh'
      }}
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 backdrop-blur-sm z-[9998] transition-all duration-600 ease-out ${
          isAnimating ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 my-auto z-[9999] transition-all duration-500 transform ${
          isAnimating 
            ? 'scale-100 translate-y-0 opacity-100 rotate-0' 
            : 'scale-50 translate-y-16 opacity-0 -rotate-6'
        }`}
        style={{
          transitionTimingFunction: isAnimating 
            ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
                {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 hover:rotate-90 transform"
          aria-label={t('modal.close')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Logo/Icon */}
          <div className="mb-6">
            <div 
              className={`w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg transition-all duration-800 transform ${
                isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-360'
              }`}
              style={{
                transitionDelay: isAnimating ? '200ms' : '0ms',
                transitionTimingFunction: isAnimating 
                  ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
                  : 'ease-out'
              }}
            >
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="white" 
                className={`drop-shadow-sm transition-all duration-600 transform ${
                  isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}
                style={{ transitionDelay: isAnimating ? '400ms' : '0ms' }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 
              className={`text-2xl font-bold text-gray-900 mb-2 transition-all duration-700 transform ${
                isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isAnimating ? '600ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {t('modal.title')}
            </h2>
          </div>

          {/* Welcome message */}
          <div className="mb-8">
            <p 
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 transform ${
                isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isAnimating ? '800ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {t('modal.subtitle')}
            </p>
            <p 
              className={`text-gray-500 mt-3 transition-all duration-700 transform ${
                isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isAnimating ? '1000ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {t('modal.description')}
            </p>
          </div>

          {/* Actions */}
          <div 
            className={`space-y-3 transition-all duration-700 transform ${
              isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'
            }`}
            style={{
              transitionDelay: isAnimating ? '1200ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* WhatsApp button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 shadow-lg group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.585"/>
              </svg>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {t('modal.whatsappButton')}
              </span>
            </button>

            {/* Maybe later button */}
            <button
              onClick={handleClose}
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50 transform hover:scale-105"
            >
              {t('modal.maybeLater')}
            </button>
          </div>

          {/* Footer */}
          <div 
            className={`mt-6 pt-4 border-t border-gray-100 transition-all duration-700 transform ${
              isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: isAnimating ? '1400ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <p className="text-xs text-gray-400 animate-pulse">
              {t('modal.footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Ensure we render to document.body for proper z-index layering
  if (typeof document === 'undefined') return null;
  
  return createPortal(modalContent, document.body);
};

export default WhatsAppModal; 