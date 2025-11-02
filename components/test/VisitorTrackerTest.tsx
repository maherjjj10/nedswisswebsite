'use client';

import { useState, useEffect } from 'react';

const VisitorTrackerTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testProxyAPICall = async () => {
    addTestResult('Testing proxy API call...');
    
    try {
      const response = await fetch('/api/visitor-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: 'manual-test-proxy',
          userAgent: navigator.userAgent,
          url: window.location.href,
          referrer: document.referrer || 'direct'
        })
      });

      if (response.ok) {
        addTestResult('✅ Proxy API call successful');
        const responseData = await response.json();
        addTestResult(`Response: ${JSON.stringify(responseData, null, 2)}`);
      } else {
        addTestResult(`❌ Proxy API call failed: ${response.status} ${response.statusText}`);
        try {
          const errorData = await response.json();
          addTestResult(`Error details: ${JSON.stringify(errorData, null, 2)}`);
        } catch (e) {
          addTestResult('Could not parse error response');
        }
      }
    } catch (error) {
      addTestResult(`❌ Proxy API call error: ${error}`);
    }
  };

  const testDirectAPICall = async () => {
    addTestResult('Testing direct API call (will likely fail due to CORS)...');
    
    try {
      const response = await fetch('https://nedsite.runasp.net/api/VisitorLog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: 'manual-test-direct'
        })
      });

      if (response.ok) {
        addTestResult('✅ Direct API call successful (unexpected!)');
        const responseText = await response.text();
        if (responseText) {
          addTestResult(`Response: ${responseText}`);
        }
      } else {
        addTestResult(`❌ Direct API call failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      addTestResult(`❌ Direct API call error (expected): ${error}`);
    }
  };

  const checkTrackerStatus = () => {
    if (typeof window !== 'undefined') {
      const tracked = sessionStorage.getItem('ned_visitor_tracked');
      const trackedAt = sessionStorage.getItem('ned_visitor_tracked_at');
      
      addTestResult(`Tracker status - Tracked: ${tracked}, At: ${trackedAt}`);
      
      // Try to call debug function if available
      const debugFn = (window as any).debugVisitorTracker;
      if (debugFn && typeof debugFn === 'function') {
        addTestResult('Calling debugVisitorTracker()...');
        debugFn();
      } else {
        addTestResult('Debug function not available');
      }
    }
  };

  const resetTracker = () => {
    if (typeof window !== 'undefined') {
      const resetFn = (window as any).resetVisitorTracker;
      if (resetFn && typeof resetFn === 'function') {
        resetFn();
        addTestResult('✅ Tracker reset successful');
      } else {
        // Manual reset
        sessionStorage.removeItem('ned_visitor_tracked');
        sessionStorage.removeItem('ned_visitor_tracked_at');
        addTestResult('✅ Manual tracker reset');
      }
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white p-4 rounded-lg max-w-md max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Visitor Tracker Test</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 mb-3">
        <button 
          onClick={testProxyAPICall}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm w-full"
        >
          Test Proxy API Call
        </button>
        
        <button 
          onClick={testDirectAPICall}
          className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-sm w-full"
        >
          Test Direct API Call
        </button>
        
        <button 
          onClick={checkTrackerStatus}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm w-full"
        >
          Check Tracker Status
        </button>
        
        <button 
          onClick={resetTracker}
          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm w-full"
        >
          Reset Tracker
        </button>
        
        <button 
          onClick={clearResults}
          className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm w-full"
        >
          Clear Results
        </button>
      </div>

      <div className="bg-gray-800 p-2 rounded text-xs max-h-48 overflow-y-auto">
        {testResults.length === 0 ? (
          <p className="text-gray-400">No test results yet...</p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} className="mb-1 font-mono break-words">
              {result}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Button to show the test panel
export const VisitorTrackerTestButton = () => {
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Add keyboard shortcut: Ctrl+Shift+V
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'V') {
          setShowTest(prev => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setShowTest(!showTest)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
        title="Toggle Visitor Tracker Test (Ctrl+Shift+V)"
      >
        🔍
      </button>
      {showTest && <VisitorTrackerTest />}
    </>
  );
};

export default VisitorTrackerTest; 