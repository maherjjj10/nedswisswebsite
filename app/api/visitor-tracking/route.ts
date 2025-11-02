import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Add server-side data
    const trackingData = {
      ...body,
      timestamp: new Date().toISOString(),
      serverTimestamp: new Date().toISOString(),
      forwardedFor: request.headers.get('x-forwarded-for') || 'unknown',
      realIp: request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      origin: request.headers.get('origin') || 'unknown',
      referer: request.headers.get('referer') || 'unknown',
      source: 'nedswiss-website-proxy'
    };

    console.log('Visitor tracking proxy: Forwarding request to external API');
    console.log('Tracking data:', trackingData);

    // Forward to the external API
    const response = await fetch('https://nedsite.runasp.net/api/VisitorLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NedSwiss-Website/1.0',
      },
      body: JSON.stringify(trackingData),
    });

    console.log('External API response status:', response.status);

    if (response.ok) {
      // Try to get response body
      let responseData;
      try {
        const responseText = await response.text();
        responseData = responseText ? JSON.parse(responseText) : { success: true };
      } catch (e) {
        responseData = { success: true, message: 'Tracked successfully' };
      }

      console.log('Visitor tracking successful');
      return NextResponse.json({ 
        success: true, 
        message: 'Visitor tracked successfully',
        data: responseData 
      });
    } else {
      console.warn('External API returned error:', response.status, response.statusText);
      
      // Try to get error details
      let errorData;
      try {
        const errorText = await response.text();
        errorData = errorText ? JSON.parse(errorText) : { error: 'Unknown error' };
      } catch (e) {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to track visitor',
          details: errorData,
          status: response.status
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Visitor tracking proxy error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    },
  });
} 