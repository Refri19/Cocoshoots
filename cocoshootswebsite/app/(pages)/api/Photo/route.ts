import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Gallery from '@/models/Photo';

export async function POST(req: Request) {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Parse the incoming data
    const body = await req.json();
    const { username, photos } = body;

    if (!username || !photos) {
      return NextResponse.json(
        { error: 'Username and photos are required' },
        { status: 400 }
      );
    }

    // 3. Find the user and update their photos, or create if they don't exist
    const updatedGallery = await Gallery.findOneAndUpdate(
      { username: username },      // Find by this field
      { 
        $set: { 
          photos: photos,
          lastUpdated: new Date()
        } 
      },                           // Update these fields
      { upsert: true, new: true }  // Options: Create if missing, return new doc
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Gallery synced successfully',
      data: updatedGallery 
    }, { status: 200 });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to sync gallery' },
      { status: 500 }
    );
  }
}