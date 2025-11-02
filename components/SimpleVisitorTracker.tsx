'use client';

import { useEffect, useRef, useState } from 'react';

// Configuration
const VISITOR_API_URL = process.env.NEXT_PUBLIC_VISITOR_API_URL || '/api/visitor-tracking';
const VISITOR_TRACKING_ENABLED = process.env.NEXT_PUBLIC_VISITOR_TRACKING_ENABLED !== 'false';
const REQUEST_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_VISITOR_TIMEOUT || '10000');

const SimpleVisitorTracker = () => {
  const hasTracked = useRef(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<'idle' | 'tracking' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Skip tracking if disabled
    if (!VISITOR_TRACKING_ENABLED) {
      console.log('Visitor tracking: Disabled via environment variable');
      return;
    }

    const trackVisitor = async () => {
      // Only track once per session
      if (hasTracked.current || isTracking) {
        console.log('Visitor tracking: Already tracked or in progress');
        return;
      }

      // Check if already tracked in this session
      if (typeof window !== 'undefined' && sessionStorage.getItem('ned_visitor_tracked')) {
        console.log('Visitor tracking: Already tracked in this session');
        hasTracked.current = true;
        setTrackingStatus('success');
        return;
      }
      
      setIsTracking(true);
      setTrackingStatus('tracking');
      console.log('Visitor tracking: Starting to track visitor...');
      console.log('Visitor tracking: API URL:', VISITOR_API_URL);
      
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        // Prepare tracking data
        const trackingData = {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          referrer: document.referrer || 'direct',
          language: navigator.language || 'unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
          screenResolution: `${screen.width}x${screen.height}`,
          source: 'nedswiss-website'
        };

        console.log('Visitor tracking: Sending data:', trackingData);

        const response = await fetch(VISITOR_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': navigator.userAgent,
          },
          body: JSON.stringify(trackingData),
          signal: controller.signal,
          mode: 'cors',
        });

        clearTimeout(timeoutId);
        
        console.log('Visitor tracking: Response status:', response.status);
        console.log('Visitor tracking: Response statusText:', response.statusText);
        console.log('Visitor tracking: Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
          hasTracked.current = true;
          setTrackingStatus('success');
          // Mark as tracked in session storage
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('ned_visitor_tracked', 'true');
            sessionStorage.setItem('ned_visitor_tracked_at', new Date().toISOString());
          }
          console.log('Visitor tracking: Successfully logged visitor');
          
          // Log response body if available
          try {
            const responseData = await response.json();
            console.log('Visitor tracking: Response data:', responseData);
          } catch (e) {
            console.log('Visitor tracking: Could not parse response JSON');
          }
        } else {
          setTrackingStatus('error');
          console.warn('Visitor tracking: Failed to log visitor - Status:', response.status, response.statusText);
          
          // Try to get error details
          try {
            const errorData = await response.json();
            console.warn('Visitor tracking: Error details:', errorData);
          } catch (e) {
            console.warn('Visitor tracking: Could not parse error response');
          }
        }
      } catch (error) {
        setTrackingStatus('error');
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.error('Visitor tracking: Request timed out after', REQUEST_TIMEOUT, 'ms');
          } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('Visitor tracking: Network error - fetch failed:', error.message);
          } else {
            console.error('Visitor tracking: Error:', error.name, error.message);
          }
        } else {
          console.error('Visitor tracking: Unknown error:', error);
        }

        // Retry once after a delay for network errors (but not for CORS or other client errors)
        if (error instanceof Error && !error.message.includes('CORS')) {
          setTimeout(() => {
            if (!hasTracked.current) {
              console.log('Visitor tracking: Retrying once...');
              hasTracked.current = false; // Reset for retry
              setIsTracking(false);
              trackVisitor();
            }
          }, 5000);
        }
      } finally {
        setIsTracking(false);
      }
    };

    // Add a small delay to ensure the component is fully mounted and page is loaded
    const timer = setTimeout(() => {
      trackVisitor();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isTracking]);

  // Add development mode debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Visitor tracker mounted. Status:', trackingStatus);
      console.log('Visitor tracking config:', {
        enabled: VISITOR_TRACKING_ENABLED,
        apiUrl: VISITOR_API_URL,
        timeout: REQUEST_TIMEOUT
      });
      
      // Add global debug function
      (window as unknown as { debugVisitorTracker?: () => void }).debugVisitorTracker = () => {
        console.log('=== Visitor Tracker Debug Info ===');
        console.log('Configuration:');
        console.log('- Enabled:', VISITOR_TRACKING_ENABLED);
        console.log('- API URL:', VISITOR_API_URL);
        console.log('- Timeout:', REQUEST_TIMEOUT);
        console.log('State:');
        console.log('- Has tracked:', hasTracked.current);
        console.log('- Is tracking:', isTracking);
        console.log('- Status:', trackingStatus);
        console.log('Session Storage:');
        console.log('- Tracked:', sessionStorage.getItem('ned_visitor_tracked'));
        console.log('- Tracked at:', sessionStorage.getItem('ned_visitor_tracked_at'));
        console.log('Browser Info:');
        console.log('- User Agent:', navigator.userAgent);
        console.log('- Language:', navigator.language);
        console.log('- URL:', window.location.href);
        console.log('- Referrer:', document.referrer || 'direct');
      };

      // Add reset function for testing
      (window as unknown as { resetVisitorTracker?: () => void }).resetVisitorTracker = () => {
        hasTracked.current = false;
        setIsTracking(false);
        setTrackingStatus('idle');
        sessionStorage.removeItem('ned_visitor_tracked');
        sessionStorage.removeItem('ned_visitor_tracked_at');
        console.log('Visitor tracker reset. Refresh page to test again.');
      };
    }
  }, [trackingStatus, isTracking]);

  // This component doesn't render anything visible
  return null;
};

export default SimpleVisitorTracker; 