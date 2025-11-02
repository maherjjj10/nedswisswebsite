// Main Services Tab Component
export { default as ServicesTab } from './ServicesTab';

// Individual Service Components
export { default as GraphicDesignTab } from './Design/GraphicDesignTab';
export { default as WebDevelopmentTab } from './Web/WebDevelopmentTab';
export { default as SocialMediaTab } from './Social/SocialMediaTab';
export { default as DigitalMarketingTab } from './Marketing/DigitalMarketingTab';

// Service Types
export interface ServiceTab {
  id: string;
  name: string;
  icon: string;
}

export interface ServiceContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  ctaText: string;
} 