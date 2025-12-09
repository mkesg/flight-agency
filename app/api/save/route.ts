import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json(
      { error: 'Missing text parameter' },
      { status: 400 }
    );
  }

  // Log the received text
  console.log('Received text:', text);

  // You can add your save logic here (e.g., save to database, file, etc.)
  
  return NextResponse.json({
    success: true,
    message: 'Text received successfully',
    textLength: text.length,
  });
}

