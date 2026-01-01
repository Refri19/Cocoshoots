import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Your NextAuth config
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetching user posts and their attachments (images)
  const url = `https://graph.facebook.com/me/posts?fields=id,message,created_time,full_picture,attachments{media}&access_token=${session.accessToken}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json({ posts: data.data });
}