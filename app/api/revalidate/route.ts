import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { tag, path, secret } = await request.json();

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate by tag (preferred method for granular control)
    if (tag) {
      await revalidateTag(tag);
      return NextResponse.json({ 
        message: `Revalidated tag: ${tag}`,
        timestamp: new Date().toISOString()
      });
    }

    // Revalidate by path (fallback method)
    if (path) {
      await revalidatePath(path);
      return NextResponse.json({ 
        message: `Revalidated path: ${path}`,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { message: 'No tag or path provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}

// GET endpoint for manual cache clearing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const action = searchParams.get('action');

    // Verify the secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    switch (action) {
      case 'blogs':
        // Revalidate all blog-related content
        await revalidateTag('blog-list');
        await revalidateTag('blog-detail');
        await revalidateTag('blogs-api');
        return NextResponse.json({ 
          message: 'Revalidated all blog content',
          timestamp: new Date().toISOString()
        });

      case 'all':
        // Revalidate entire blog section
        await revalidatePath('/[locale]/blogs', 'page');
        await revalidatePath('/api/blogs');
        return NextResponse.json({ 
          message: 'Revalidated all blog paths',
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { message: 'Invalid action. Use: blogs, all' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in revalidation:', error);
    return NextResponse.json(
      { message: 'Error processing revalidation' },
      { status: 500 }
    );
  }
} 