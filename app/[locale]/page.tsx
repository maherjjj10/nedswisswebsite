import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { locales, type Locale } from "@/app/i18n";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import HeroSection from "@/components/home/HeroSection";

import CallToAction from "@/components/home/CallToAction";
import SocialProof from "@/components/home/SocialProof";
import ServicesScrollStack from "@/components/home/ServicesScrollStack";
import ScrollVelocity from "@/comps/TextAnimations/ScrollVelocity/ScrollVelocity";
import Partners from "@/components/home/Partners";
import Process from "@/components/home/Process";
import WhyUs from "@/components/home/WhyUs";
import Projects from "@/components/home/Projects";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return generateHomeMetadata('en');
  }

  return generateHomeMetadata(locale);
}

export default async function HomePage({ params }: HomePageProps) {

  return (
    <>
    <div className=" " >

   
      <HeroSection />
      <div className="h-15"/>
      <div className="  border-red-500 border-b-2 border-t-2 py-10  ">
      <ScrollVelocity
        texts={["NedSwiss"]}
        velocity={200}
        className=""
      />
      </div>
      <ServicesScrollStack />
      <div className="  border-red-500 border-b-2 border-t-2 -mt-10">
      <ScrollVelocity
        texts={["NedSwiss"]}
        velocity={200}
        className=""
      />
      </div>
      <div className="overflow-hidden w-full">

      <Partners />
      </div>
      <Process />
      {/* !TODO Our Projects */}
      <Projects />
      <WhyUs />
      {/* <ProcessPrecision /> */}
      <SocialProof />
      <div className="  border-red-500 border-b-2 border-t-2 py-10  ">
      <ScrollVelocity
        texts={["NedSwiss"]}
        velocity={200}
        className=""
      />
      </div>
      <CallToAction />
      <div className="  border-red-500 border-b-2 border-t-2 py-10  ">
      <ScrollVelocity
        texts={["NedSwiss"]}
        velocity={200}
        className=""
      />
      </div>
      <div className="h-15"/>
      </div>
    </>
  );
}
