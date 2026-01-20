// Example of an API route in Next.js (app/api/post-photo/actions.ts)
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, photoUrl, caption } = await request.json();

  // Facebook Graph API endpoint for photo uploads
  const fbUrl = `https://graph.facebook.com/v20.0/me/photos`;

  try {
    const response = await fetch(fbUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: photoUrl,
        caption: caption,
        access_token: accessToken,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post to Facebook' }, { status: 500 });
  }
}