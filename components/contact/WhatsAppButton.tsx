"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import WhatsAppModal from "./WhatsAppModal";

const WhatsAppButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("WhatsApp");

  useEffect(() => {
    setMounted(true);

    // Create a dedicated container for WhatsApp components that's immune to scroll effects
    let whatsappContainer = document.getElementById("whatsapp-portal");
    if (!whatsappContainer) {
      whatsappContainer = document.createElement("div");
      whatsappContainer.id = "whatsapp-portal";
      whatsappContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: var(--z-whatsapp-portal);
        transform: translate3d(0, 0, 0);
        will-change: transform;
        isolation: isolate;
      `;
      document.body.appendChild(whatsappContainer);
    }
  }, []);

  if (!mounted) return null;

  const buttonContent = (
    <>
      {/* Sticky WhatsApp Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="group"
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          pointerEvents: "auto",
        }}
        aria-label={t("button.ariaLabel")}
      >
        <div className="relative">
          {/* Green circle background */}
          <div className="size-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            {/* WhatsApp icon */}

            <svg
              width="40"
              height="40"
              viewBox="0 0 54 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9977 18.35H35.9977M17.9977 30.55H28.4977M50.9977 27.5C50.9977 31.0075 50.2698 34.3423 48.959 37.3564L51.0023 51.8977L38.745 48.7823C35.2726 50.7676 31.2652 51.9 26.9977 51.9C13.7429 51.9 2.99774 40.9757 2.99774 27.5C2.99774 14.0242 13.7429 3.09998 26.9977 3.09998C40.2526 3.09998 50.9977 14.0242 50.9977 27.5Z"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          {/* Red notification dot */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </button>

      {/* WhatsApp Welcome Modal */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );

  const portalContainer = document.getElementById("whatsapp-portal");
  return portalContainer ? createPortal(buttonContent, portalContainer) : null;
};

export default WhatsAppButton;
