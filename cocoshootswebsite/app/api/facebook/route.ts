// app/api/facebook/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const PAGE_ID = '61580797117569';
  const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
  
  // We request fields: full_picture (the image), message (the text), and created_time
  const url = `https://graph.facebook.com/v21.0/${PAGE_ID}/posts?fields=full_picture,message,created_time&limit=6&access_token=${ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Map Facebook data to your Photo interface format
    const formattedPosts = data.data.map((post: any) => ({
      id: post.id,
      title: post.message ? post.message.substring(0, 20) + "..." : "Facebook Post",
      color: "bg-blue-500", // Default brand color
      caption: post.message || "",
      url: post.full_picture // The high-res image URL
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FB posts" }, { status: 500 });
  }
}