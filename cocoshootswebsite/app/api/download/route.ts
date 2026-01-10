import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  const response = await fetch(imageUrl);
  const blob = await response.blob();
  
  const headers = new Headers();
  headers.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
  headers.set('Content-Disposition', 'attachment; filename="downloaded-image.jpg"');

  return new NextResponse(blob, { status: 200, headers });
}
