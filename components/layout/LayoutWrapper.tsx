'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);
  
  if (isSplashScreenVisible) {
    return <SplashScreen finishLoading={() => setIsSplashScreenVisible(false)} />;
  }

  return <>{children}</>;
} 