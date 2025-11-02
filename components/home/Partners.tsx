"use client"
import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { useTranslations } from "next-intl";

const Partners = () => {
  const t = useTranslations('HomePage.partnersHeaders');
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-10">
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 ">{t('title')} <span className="text-red-500">{t('titleHighlight')}</span></h1>
      
      <div className="w-full h-10 " />
      <InfiniteMovingCards
        direction="left"
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
            name: "Partner 1",
          },
          {
            src: "/clients/partner4.png",
            alt: "Partner 2",
            name: "Partner 2",
          },
          {
            src: "/clients/partner5.png",
            alt: "Partner 1",
            name: "Partner 1",
          },
          {
            src: "/clients/partner1.png",
            alt: "Partner 2",
            name: "Partner 2",
          },
          {
            src: "/clients/partner2.png",
            alt: "Partner 1",
            name: "Partner 1",
          },
          {
            src: "/clients/partner3.png",
            alt: "Partner 2",
            name: "Partner 2",
          },
          {
            src: "/clients/partner4.png",
            alt: "Partner 1",
            name: "Partner 1",
          },
          {
            src: "/clients/partner5.png",
            alt: "Partner 2",
            name: "Partner 2",
          },
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
        ]}
      />
    </div>
  );
};

export default Partners;
